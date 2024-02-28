import * as React from "react"
import { type OnboardingStepRenderProps } from "onboarding-lib"

import { ExternalLink } from "@/components/external-link"
import { Subtitle } from "@/components/subtitle"

import { onboardingSchema } from "../demo"
import { OnboardingStepContainer } from "./onboarding-step"

export function ThankYouStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer title="Thank you & next steps" {...props}>
      <div>
        <Subtitle>Thank you for checking out ONBOARDING_LIB</Subtitle>
        <p className="text-gray-500">
          Thank you for checking us out, and giving feedback. We really hope to
          make this a really solid onboarding library, so people don&apos;t have
          to write this same flimsy code over and over again. Feel free to{" "}
          <ExternalLink href="/">open an issue</ExternalLink> on GitHub.
        </p>
      </div>

      <div>
        <Subtitle>PS. Got production bugs?</Subtitle>
        <p className="text-gray-500">
          Thank you for checking us out, and giving feedback. We really hope to
          make this a really solid onboarding library, so people don&apos;t have
          to write this same flimsy code over and over again. Feel free to{" "}
          <ExternalLink href="/">open an issue</ExternalLink> on GitHub.
        </p>
      </div>
    </OnboardingStepContainer>
  )
}
