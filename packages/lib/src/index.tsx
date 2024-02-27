import * as React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  FormProvider,
  SubmitErrorHandler,
  useForm,
  useWatch,
} from "react-hook-form"
import { ZodSchema, z } from "zod"

import { useDebounce } from "./hooks"
import {
  OnboardingContextValue,
  OnboardingProps,
  OnboardingStepProps,
} from "./types"
import { childrenWithPropsArray, getComputedMarkAsCompleted } from "./utils"

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
  onInvalid,
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
  const [completedStepIds, setCompletedStepIds] = useState<string[]>([])
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
    if (hasLoaded) {
      storage.setItem(`${userId}:completed_marks`, completedStepIds)
    }
  }, [completedStepIds, hasLoaded])

  useEffect(() => {
    async function fetchOnboardingState() {
      const formValues = await storage.getItem<Record<string, any>>(userId)
      const currentStep = await storage.getItem<number>(`${userId}:step`)
      let completedMarks =
        (await storage.getItem<string[]>(`${userId}:completed_marks`)) ?? []
      if (formValues) {
        for (const [key, value] of Object.entries(formValues)) {
          // @ts-expect-error
          form.setValue(key, value)
        }
      }
      // Go through `markAsCompleted` functions for all steps
      const markAsCompletedFunctionMap = childrenWithPropsArray<
        OnboardingStepProps<T>
      >(children)
        .filter((c) => c.props.markAsCompleted !== undefined)
        .map((c) => ({
          stepId: c.props.stepId,
          markAsCompleted: c.props.markAsCompleted!,
        }))

      for (let i = 0; i < markAsCompletedFunctionMap.length; i++) {
        const { stepId, markAsCompleted } = markAsCompletedFunctionMap[i]
        const computedMarkAsCompleted = await getComputedMarkAsCompleted(
          markAsCompleted,
          formValues
        )

        // Reconcile the `computedMarkAsCompleted` and the saved `completedMarks`
        if (
          completedMarks.includes(stepId) &&
          computedMarkAsCompleted === false
        ) {
          // Remove the stepId from completed marks
          completedMarks = completedMarks.filter(
            (predicateStepId) => predicateStepId !== stepId
          )
        }

        if (
          !completedMarks.includes(stepId) &&
          computedMarkAsCompleted === true
        ) {
          completedMarks.push(stepId)
        }
      }

      // Save our completed steps
      setCompletedStepIds(completedMarks)

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

  const previous = useMemo(() => {
    if (currentStep <= 0) return undefined

    return () => setCurrentStep((step) => step - 1)
  }, [currentStep])

  const next = useMemo(() => {
    if (currentStep >= STEPS.length - 1) return undefined
    return (skipped?: boolean) => {
      if (skipped === undefined) {
        const currentStepId = STEPS[currentStep]
        setCompletedStepIds((completedStepIds) => {
          const completedStepIdsSet = new Set(completedStepIds)
          completedStepIdsSet.add(currentStepId)
          return Array.from(completedStepIdsSet)
        })
      }
      setCurrentStep((step) => step + 1)
    }
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
        completedStepIds,
      }}
    >
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onCompleted ?? (() => {}), onInvalid)}
        >
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
  markAsCompleted,
  onMarkAsCompletedFailed,
  onStepCompleted,
  render,
}: OnboardingStepProps<T>) {
  const context = useContext(OnboardingContext)

  // Skip is just `next` without the validation, or `onStepCompleted`
  const skip = useMemo(() => {
    if (skippable && context.next) {
      return () => context.next!(true)
    }
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

      if (markAsCompleted) {
        const computedMarkAsCompleted = await getComputedMarkAsCompleted(
          markAsCompleted,
          context.form.getValues()
        )
        if (computedMarkAsCompleted === false) {
          onMarkAsCompletedFailed?.()
          return
        }
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
    isMarkedAsCompleted: context.completedStepIds.includes(stepId),
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
