import type { OnboardingStepRenderProps } from "onboarding-lib"

import { CodeBlock } from "../code-block"
import { onboardingSchema } from "../demo"
import { OnboardingStepContainer } from "./onboarding-step"

export function InstallLibraryStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer title="Install ONBOARDING_LIB" {...props}>
      <CodeBlock
        copyFromAnywhere={true}
        copyContent="npm install onboarding-lib"
      >
        $ npm install onboarding-lib
      </CodeBlock>
    </OnboardingStepContainer>
  )
}
