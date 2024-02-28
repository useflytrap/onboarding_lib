import type { OnboardingStepRenderProps } from "onboarding-lib"

import { Subtitle } from "@/components/subtitle"

import { CodeBlock } from "../code-block"
import { onboardingSchema } from "../demo"
import { OnboardingStepContainer } from "./onboarding-step"

const stepWithOnCompletedCode = `export function Onboarding() {
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
					// Track analytics etc.
				}}
			/>
		</Onboarding>
	)
}`

export function OnboardingStepCompletionStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer
      title="Run code after each step completes"
      {...props}
    >
      <div>
        <Subtitle>Define your step completion handler</Subtitle>
        <p className="text-gray-500">
          To create conversion funnels for your onboarding flows, you can use
          the `onStepCompleted` prop as shown below. If the step has
          `validateFormFields` values, those will be validated upon calling the
          `next` function, after which the callback will be called.
        </p>
      </div>
      <CodeBlock>{stepWithOnCompletedCode}</CodeBlock>
    </OnboardingStepContainer>
  )
}
