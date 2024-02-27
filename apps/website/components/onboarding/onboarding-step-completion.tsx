import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  type OnboardingStepRenderProps,
} from "onboarding-lib"

import { Input } from "@/components/input"
import { Subtitle } from "@/components/subtitle"

import { CodeBlock } from "../code-block"
import { onboardingSchema } from "../demo"
import { OnboardingStepContainer } from "./onboarding-step"

const onboardingZodSchemaCode = `/**
 * Onboarding for taking the user through how the library works?
 */
export const onboardingSchema = z.object({
})
`

const onboardingWithShadcnComponent = `export function Onboarding() {
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
			<Step
				validateFormFields={["stack", "language"]}
				stepId="setup-demo"
				render={SetupDemoStep}
				onStepCompleted={(data) => {
					// Track analytics
				}}
			/>
		</Onboarding>
	)
}
`

export function OnboardingStepCompletionStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer
      title="Run code after each step completes"
      {...props}
    >
      <div>
        <Subtitle>Define your form data with Zod</Subtitle>
        <p className="text-gray-500">
          To create conversion funnels for your onboarding flows, you can use
          the `onStepCompleted` prop as shown below. If the step has
          `validateFormFields` values, those will be validated upon calling the
          `next` function, after which the callback will be called.
          <br />
          <br />
        </p>
      </div>
      <CodeBlock>{onboardingZodSchemaCode}</CodeBlock>
    </OnboardingStepContainer>
  )
}
