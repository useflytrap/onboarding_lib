import { type OnboardingStepRenderProps } from "onboarding_lib"

import { Subtitle } from "@/components/subtitle"

import { CodeBlock } from "../code-block"
import { onboardingSchema } from "../demo"
import { OnboardingStepContainer } from "./onboarding-step"

const onboardingStepPropDefinition = `export type OnboardingStepProps<T extends ZodSchema> = {
  /**
   * The ID of this step. Should be unique.
   */
  stepId: string
  /**
   * The \`markAsCompleted\` value can be used to simply mark the step as completed, but can also
   * be used to for instance run side-effects, and proceed only when those have succeeded. If you return
   * \`false\`, the \`onMarkAsCompletedFailed\` function will be called.
   */
  markAsCompleted?:
    | ((data: z.infer<T>) => Promise<boolean>)
    | ((data: z.infer<T>) => boolean)
    | boolean
  /**
   * This function will get called, when the user is trying to proceed to the next step (by calling the
   * \`next\` function), but the \`markAsCompleted\` returns false for this step.
   */
  onMarkAsCompletedFailed?: () => void
  /**
   * Whether this step can be skipped. If set to \`false\`, the value of the \`skip\` prop will be \`undefined\`.
   * @default true
   */
  skippable?: boolean
  /**
   * Whether this step should be marked as disabled. This value doesn't actually do anything at the moment.
   */
  disabled?: boolean
  /**
   * Enable the validation of the form fields provided, when \`next\` is called. If no form fields are provided, validation won't happen until the final submit.
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
`

// @todo: fetch this from the library code after i've added proper docs to them
const onboardingStepRenderPropDefinition = `export type OnboardingStepRenderProps<T extends ZodSchema> = {
	/**
   * Identifier for the onboarding. This will be used to separate the data from possible other onboarding flows.
   */
  id: string
  storage: Storage
  schema: T
  userId: string
  onCompleted?: (data: z.infer<T>) => void
  onInvalid?: SubmitErrorHandler<T>
  /**
   * Amount of milliseconds to debounce before saving the values to the provided \`Storage\`.
   * @default 500 ms
   */
  storageDebounceDelay?: number
	previous?: () => void
  next?: (skipped?: boolean) => void
  skip?: () => void
  goto: (stepId: string) => void
  form: UseFormReturn<any, any, any>
  currentStepId: string
  completedStepIds: string[]
  stepId: string
  isCurrentStep: boolean
  isMarkedAsCompleted: boolean
}
`

const validateFormFieldsExample = `<Step
  validateFormFields={["disappointment", "improvements"]}
  stepId="feedback"
  render={GiveFeedbackStep}
/>`

const markAsCompletedExample = `<Step
  validateFormFields={["disappointment", "improvements"]}
  stepId="feedback"
  render={GiveFeedbackStep}
  markAsCompleted={(data: z.infer<typeof onboardingSchema>) => {
    return data.disappointment === "very-disappointed"
  }}
/>
`

export function CreatingStepsStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer title="Creating steps" {...props}>
      <div>
        <Subtitle>Define your step options</Subtitle>
        <p className="text-gray-500">
          Each step can be defined with different options.
        </p>
      </div>
      <CodeBlock>{onboardingStepPropDefinition}</CodeBlock>

      <div>
        <Subtitle>The render prop</Subtitle>
        <p className="text-gray-500">
          We use a `render` prop to render the onboarding steps. Here&apos;s the
          props that get passed to the `render` function.
        </p>
      </div>
      <CodeBlock>{onboardingStepRenderPropDefinition}</CodeBlock>

      <div>
        <Subtitle>Enforcing form valudation</Subtitle>
        <p className="text-gray-500">
          By default, the form only gets submitted when a submit button is
          clicked, and not between step transitions. To validate certain form
          fields, you can pass in an array to `validateFormFields` prop, with
          the keys of the fields you want to validate.
        </p>
      </div>
      <CodeBlock>{validateFormFieldsExample}</CodeBlock>

      <div>
        <Subtitle>Running side-effects / marking a step as completed</Subtitle>
        <p className="text-gray-500">
          For marking a step as completed, or optionally running side-effects
          before letting the user continue, the `markAsCompleted` prop can be
          used. Your onboarding form data will get passed to the function, and
          you can use it to run async side-effects, or just validate the
          existance of form data.
          <br />
          In the below example, the step only gets marked as completed, once the
          user has said that they would be &quot;very-disappointed&quot; without
          ONBOARDING_LIB ;)
        </p>
      </div>
      <CodeBlock>{markAsCompletedExample}</CodeBlock>
    </OnboardingStepContainer>
  )
}
