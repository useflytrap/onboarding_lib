import type { OnboardingStepRenderProps } from "onboarding_lib"

import { CodeBlock } from "@/components/code-block"
import { Subtitle } from "@/components/subtitle"

import { onboardingSchema } from "../demo"
import { OnboardingStepContainer } from "./onboarding-step"

export function OnboardingDataStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer title="View your onboarding data" {...props}>
      <Subtitle>Here is your onboarding data</Subtitle>
      <CodeBlock>{JSON.stringify(props.form.getValues(), null, 2)}</CodeBlock>
    </OnboardingStepContainer>
  )
}
