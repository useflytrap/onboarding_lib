import { ReactNode } from "react"
import {
  DefaultValues,
  SubmitErrorHandler,
  type UseFormReturn,
} from "react-hook-form"
import { Storage } from "unstorage"
import { ZodSchema, z } from "zod"

export type OnboardingProps<T extends ZodSchema> = {
  /**
   * Identifier for the onboarding. This will be used to separate the data from possible other onboarding flows.
   */
  id: string
  storage: Storage
  schema: T
  defaultValues?: DefaultValues<z.infer<T>>
  children: ReactNode
  userId: string
  onCompleted?: (data: z.infer<T>) => void
  onInvalid?: SubmitErrorHandler<T>
  /**
   * Amount of milliseconds to debounce before saving the values to the provided `Storage`.
   * @default 500 ms
   */
  storageDebounceDelay?: number
}

export type OnboardingContextValue<T extends ZodSchema> = Omit<
  OnboardingProps<T>,
  "children" | "defaultValues"
> & {
  previous?: () => void
  next?: (skipped?: boolean) => void
  skip?: () => void
  goto: (stepId: string) => void
  form: UseFormReturn<z.infer<T>, any, z.infer<T>>
  currentStepId: string
  completedStepIds: string[]
}

export type OnboardingStepRenderProps<T extends ZodSchema> =
  OnboardingContextValue<T> & {
    stepId: string
    isCurrentStep: boolean
    isMarkedAsCompleted: boolean
  }

export type OnboardingStepProps<T extends ZodSchema> = {
  /**
   * The ID of this step. Should be unique.
   */
  stepId: string
  /**
   * The `markAsCompleted` value can be used to simply mark the step as completed, but can also
   * be used to for instance run side-effects, and proceed only when those have succeeded. If you return
   * `false`, the `onMarkAsCompletedFailed` function will be called.
   */
  markAsCompleted?:
    | ((data: z.infer<T>) => Promise<boolean>)
    | ((data: z.infer<T>) => boolean)
    | boolean
  /**
   * This function will get called, when the user is trying to proceed to the next step (by calling the
   * `next` function), but the `markAsCompleted` returns false for this step.
   */
  onMarkAsCompletedFailed?: (data: z.infer<T>) => void
  /**
   * Whether this step can be skipped. If set to `false`, the value of the `skip` prop will be `undefined`.
   * @default true
   */
  skippable?: boolean
  /**
   * Whether this step should be marked as disabled. This value doesn't actually do anything at the moment.
   */
  disabled?: boolean
  /**
   * Enable the validation of the form fields provided, when `next` is called. If no form fields are provided, validation won't happen until the final submit.
   */
  validateFormFields?: (keyof z.infer<T>)[]
  /**
   * Run code when this step has completed. Useful for tracking onboarding conversion rates using product analytics tools.
   */
  onStepCompleted?: (data: z.infer<T>) => void | Promise<void>
  /**
   * The function that will be called to render your onboarding step component.
   * @returns A React component
   */
  render: (values: OnboardingStepRenderProps<T>) => ReactNode
}
