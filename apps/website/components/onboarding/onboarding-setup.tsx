import { type OnboardingStepRenderProps } from "onboarding_lib"

import { Subtitle } from "@/components/subtitle"

import { CodeBlock } from "../code-block"
import { onboardingSchema } from "../demo"
import { OnboardingStepContainer } from "./onboarding-step"

const onboardingZodSchemaCode = `/**
* This is the schema that will be used by \`react-hook-form\`. You can use it to define error messages, etc.
* all very intuitively.
*/
export const onboardingSchema = z.object({
 disappointment: z.enum(
   ["very-disappointed", "somewhat-disappointed", "not-disappointed"],
   { required_error: "Please fill in your disappointment level :)" }
 ),
 improvements: z.string({
   required_error: "Please help us improve ONBOARDING_LIB for you :)",
 }),
})`

const createOnboardingCode = `const { Onboarding, Step } = createOnboarding({
  schema: onboardingSchema,
})

return (
  <Onboarding
    id="onboarding-demo"
    storage={storage}
    schema={onboardingSchema}
    userId="user-id"
    onCompleted={() => {
      console.log("Completed")
    }}
  >
    <Step stepId="introduction" render={IntroductionStep} />
    <Step stepId="install-library" render={InstallLibraryStep} />
    <Step stepId="onboarding-setup" render={OnboardingSetupStep} />
    <Step
      validateFormFields={["stack", "language"]}
      stepId="setup-demo"
      render={SetupDemoStep}
    />
    <Step stepId="step-complete" render={OnboardingStepCompletionStep} />
    <Step
      validateFormFields={["disappointment", "improvements"]}
      stepId="feedback"
      render={GiveFeedbackStep}
    />
    <Step stepId="onboarding-data" render={OnboardingDataStep} />
  </Onboarding>
)
`

export function OnboardingSetupStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer
      title="Form validation with Zod & react-hook-form"
      {...props}
    >
      <div>
        <Subtitle>Define your form data with Zod</Subtitle>
        <p className="text-gray-500">
          This will be used with `react-hook-form`.
        </p>
      </div>
      <CodeBlock>{onboardingZodSchemaCode}</CodeBlock>

      <div>
        <Subtitle>Create your onboarding instance</Subtitle>
        <p className="text-gray-500">
          This gives you the `Onboarding` wrapper component as well as a `Step`
          component with type-safety with `react-hook-form` forms, and the data
          in the onboarding. This will be used with `react-hook-form`.
        </p>
      </div>
      <CodeBlock>{createOnboardingCode}</CodeBlock>
      <p className="text-gray-500">
        As you can see, the above code is the code used by this very onboarding
        flow. Let&apos;s dive deeper into how to define steps.
      </p>
    </OnboardingStepContainer>
  )
}
