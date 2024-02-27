import * as React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm, useWatch } from "react-hook-form"
import { ZodSchema, z } from "zod"

import { useDebounce } from "./hooks"
import {
  OnboardingContextValue,
  OnboardingProps,
  OnboardingStepProps,
} from "./types"

const OnboardingContext = createContext<OnboardingContextValue<any>>(
  {} as OnboardingContextValue<any>
)

function Onboarding<T extends ZodSchema>({
  schema,
  defaultValues,
  storage,
  userId,
  children,
  id,
  storageDebounceDelay = 500,
  onCompleted,
}: OnboardingProps<T>) {
  const STEPS = Array.isArray(children)
    ? children?.map((c) => c.props.stepId)
    : [(children as React.ReactElement)?.props?.stepId]

  if (STEPS === undefined || STEPS.length === 0 || STEPS.at(0) === undefined) {
    throw new Error(
      `<Onboarding> expects at least one <Step> component as a direct child.`
    )
  }

  const [currentStep, setCurrentStep] = useState(0)
  const [currentStepId, setStepId] = useState(STEPS[currentStep])
  const [hasLoaded, setHasLoaded] = useState(false)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  })

  useEffect(() => {
    setStepId(STEPS[currentStep])
  }, [currentStep])

  useEffect(() => {
    if (hasLoaded) {
      storage.setItem(`${userId}:step`, currentStep)
    }
  }, [currentStep, hasLoaded])

  useEffect(() => {
    async function fetchOnboardingState() {
      const formValues = await storage.getItem<string>(userId)
      const currentStep = await storage.getItem<number>(`${userId}:step`)
      if (formValues) {
        for (const [key, value] of Object.entries(formValues)) {
          // @ts-expect-error
          form.setValue(key, value)
        }
      }
      if (currentStep) {
        setCurrentStep(currentStep)
      }

      setHasLoaded(true)
    }

    fetchOnboardingState()
  }, [])

  const formValues = useWatch({
    control: form.control,
    defaultValue: defaultValues,
  })
  const debouncedFormValues = useDebounce(formValues, storageDebounceDelay)

  useEffect(() => {
    if (hasLoaded) {
      storage.setItem(userId, debouncedFormValues)
    }
  }, [debouncedFormValues, hasLoaded])

  function onSubmit(data: z.infer<typeof schema>) {
    onCompleted?.(data)
  }

  function onInvalid(x: any) {
    console.log("invalid")
  }

  const previous = useMemo(() => {
    if (currentStep <= 0) return undefined

    return () => setCurrentStep((step) => step - 1)
  }, [currentStep])

  const next = useMemo(() => {
    if (currentStep >= STEPS.length - 1) return undefined
    return () => setCurrentStep((step) => step + 1)
  }, [currentStep])

  const goto = (stepId: string) => {
    const stepIndex = STEPS.findIndex((step) => step === stepId)
    if (stepIndex === -1) {
      throw new Error(
        `Go to step "${stepId}" failed. Could not find a step with that ID from steps: ${STEPS.join(
          ", "
        )}`
      )
    }

    setCurrentStep(stepIndex)
  }

  return (
    <OnboardingContext.Provider
      value={{
        goto,
        next,
        previous,
        schema,
        skip: next,
        storage,
        userId,
        id,
        form,
        currentStepId,
        onCompleted,
      }}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, onInvalid)}>
          {children}
        </form>
      </FormProvider>
    </OnboardingContext.Provider>
  )
}

function OnboardingStep<T extends ZodSchema>({
  stepId,
  skippable = true,
  validateFormFields,
  onStepCompleted,
  render,
}: OnboardingStepProps<T>) {
  const context = useContext(OnboardingContext)

  // Skip is just `next` without the validation, or `onStepCompleted`
  const skip = useMemo(() => {
    if (skippable === false) return undefined

    return context.next
  }, [skippable, context.next])

  const next = useMemo(() => {
    if (context.next === undefined) return undefined

    return async () => {
      if (validateFormFields) {
        const isValid = await context.form.trigger(
          validateFormFields as string[]
        )
        if (isValid === false) return
      }

      onStepCompleted?.(context.form)
      context.next?.()
    }
  }, [context.next])

  return render({
    ...context,
    stepId,
    skip,
    next,
    isCurrentStep: context.currentStepId === stepId,
  })
}

export function createOnboarding<T extends ZodSchema>({
  schema,
}: Pick<OnboardingProps<T>, "schema">) {
  return {
    Onboarding: Onboarding<T>,
    Step: OnboardingStep<T>,
  }
}

export * from "./types"
