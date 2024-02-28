import * as React from "react"
import { type OnboardingStepRenderProps } from "onboarding_lib"

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
          to write this same flimsy code over and over again. Please{" "}
          <ExternalLink href="/">open an issue</ExternalLink> on GitHub if you
          find any problems.
        </p>
      </div>

      <div>
        <Subtitle>PS. Got production bugs?</Subtitle>
        <p className="text-gray-500">
          We&apos;re building Flytrap, a debugging tool that helps you find the
          root causes of your production bugs fast. You can{" "}
          <ExternalLink href="https://www.useflytrap.com/">
            get started for free.
          </ExternalLink>
        </p>
      </div>
    </OnboardingStepContainer>
  )
}
