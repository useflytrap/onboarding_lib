import { ReactNode } from "react"
import { DefaultValues, type UseFormReturn } from "react-hook-form"
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
  onCompleted: (data: z.infer<T>) => void
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
  next?: () => void
  skip?: () => void
  goto: (stepId: string) => void
  form: UseFormReturn<any, any, undefined>
  stepId: string
}

export type OnboardingStepRenderProps<T extends ZodSchema> =
  OnboardingContextValue<T> & {
    isCurrentStep: boolean
  }

export type OnboardingStepProps<T extends ZodSchema> = {
  id: string
  /**
   * Whether this step can be skipped.
   * @default true
   */
  skippable?: boolean
  /**
   * Enable the validation of the form fields provided, when `next` is called. If no form fields are provided, validation won't happen until the final submit.
   */
  validateFormFields?: (keyof z.infer<T>)[]
  // formFields?: string[];
  onStepCompleted?: (data: any) => void | Promise<void>
  render: (values: OnboardingStepRenderProps<T>) => ReactNode
}
