"use client"

import { useEffect, useState } from "react"
import { createOnboarding } from "onboarding_lib"
import { createStorage } from "unstorage"
import localStorageDriver from "unstorage/drivers/localstorage"
import { z } from "zod"

import { trackEvent } from "@/lib/analytics"
import { OnboardingSkeleton } from "@/components/onboarding-skeleton"
import { CreatingStepsStep } from "@/components/onboarding/creating-steps"
import { GiveFeedbackStep } from "@/components/onboarding/give-feedback-step"
import { InstallLibraryStep } from "@/components/onboarding/install-library"
import { IntroductionStep } from "@/components/onboarding/introduction-step"
import { OnboardingDataStep } from "@/components/onboarding/onboarding-data"
import { OnboardingSetupStep } from "@/components/onboarding/onboarding-setup"
import { OnboardingStepCompletionStep } from "@/components/onboarding/onboarding-step-completion"
import { ThankYouStep } from "@/components/onboarding/thank-you"

/**
 * This is the schema that will be used by `react-hook-form`. You can use it to define error messages, etc.
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
})

export function Demo() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (isMounted === false) {
    return <OnboardingSkeleton />
  }

  const storage = createStorage({
    driver: localStorageDriver({
      base: "demo-onboarding",
    }),
  })

  const { Onboarding, Step } = createOnboarding({
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
      defaultValues={{
        improvements: "",
      }}
    >
      <Step
        stepId="introduction"
        render={IntroductionStep}
        onStepCompleted={() => {
          trackEvent("onboarding:complete_introduction")
        }}
      />
      <Step
        stepId="install-library"
        render={InstallLibraryStep}
        onStepCompleted={() => {
          trackEvent("onboarding:complete_installation")
        }}
      />
      <Step
        stepId="onboarding-setup"
        render={OnboardingSetupStep}
        onStepCompleted={() => {
          trackEvent("onboarding:complete_setup")
        }}
      />
      <Step
        stepId="creating-steps"
        render={CreatingStepsStep}
        onStepCompleted={() => {
          trackEvent("onboarding:complete_creating_steps")
        }}
      />
      <Step
        stepId="on-complete"
        render={OnboardingStepCompletionStep}
        onStepCompleted={() => {
          trackEvent("onboarding:complete_on_complete")
        }}
      />
      <Step
        validateFormFields={["disappointment", "improvements"]}
        stepId="feedback"
        skippable={false}
        render={GiveFeedbackStep}
        onStepCompleted={({ disappointment, improvements }) => {
          trackEvent("onboarding:complete_feedback")
          trackEvent("onboarding:submit_feedback", {
            $set: { disappointment, improvements },
            disappointment,
            improvements,
          })
        }}
      />
      <Step
        stepId="onboarding-data"
        render={OnboardingDataStep}
        onStepCompleted={() => {
          trackEvent("onboarding:complete_onboarding_data")
        }}
      />
      <Step stepId="thank-you" render={ThankYouStep} />
    </Onboarding>
  )
}
