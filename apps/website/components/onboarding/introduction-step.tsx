import * as React from "react"
import { type OnboardingStepRenderProps } from "onboarding-lib"

import { ExternalLink } from "@/components/external-link"
import { Subtitle } from "@/components/subtitle"

import { onboardingSchema } from "../demo"
import { OnboardingStepContainer } from "./onboarding-step"

export function IntroductionStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer title="What is ONBOARDING_LIB?" {...props}>
      <div>
        <Subtitle>A small introduction to ONBOARDING_LIB</Subtitle>
        <p className="text-gray-500">
          ONBOARDING_LIB is a onboarding library for React apps, that makes it
          easy to implement fully accessible, customizable and persisted
          onboarding flows.
        </p>
      </div>

      <div>
        <Subtitle>Persistance using Unstorage</Subtitle>
        <p className="text-gray-500">
          We use the great{" "}
          <ExternalLink href="https://unstorage.unjs.io/">
            unstorage
          </ExternalLink>{" "}
          library from UnJS to handle persistance. This allows you to easily
          save your end-users&apos; onboarding data on any drivers such as
          LocalStorage, Redis, Netlify Blobs, Memory or the filesystem. See all
          of the supported drivers{" "}
          <ExternalLink href="https://unstorage.unjs.io/drivers">
            here.
          </ExternalLink>
        </p>
      </div>

      <div>
        <Subtitle>Forms using `react-hook-form`</Subtitle>
        <p className="text-gray-500">
          ONBOARDING_LIB is built on top of{" "}
          <ExternalLink href="https://react-hook-form.com/">
            react-hook-form
          </ExternalLink>{" "}
          to provide intuitive and accessible form handling in your onboarding
          flows. Using `react-hook-form`, we can define our onboarding schemas
          in Zod.
        </p>
      </div>

      <div>
        <Subtitle>Walkthrough of ONBOARDING_LIB</Subtitle>
        <p className="text-gray-500">
          What follows behind the &quot;Next&quot; button is an onboarding flow,
          that will walk you though the ONBOARDING_LIB library, and show how we
          built this very onboarding. Very meta, right?
        </p>
      </div>
    </OnboardingStepContainer>
  )
}
