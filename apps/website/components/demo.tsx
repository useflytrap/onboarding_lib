"use client"

import { useEffect, useState } from "react"
import { createOnboarding } from "onboarding-lib"
import { toast } from "sonner"
import { createStorage } from "unstorage"
import localStorageDriver from "unstorage/drivers/localstorage"
import { z } from "zod"

import { useIsMounted } from "@/lib/hooks"
import { CodeBlock } from "@/components/code-block"
import { InstallLibraryStep } from "@/components/onboarding/install-library"
import { OnboardingDataStep } from "@/components/onboarding/onboarding-data"
import { OnboardingSetupStep } from "@/components/onboarding/onboarding-setup"
import { SetupDemoStep } from "@/components/onboarding/setup-demo"
import { Subtitle } from "@/components/subtitle"

import { OnboardingSkeleton } from "./onboarding-skeleton"
import { GiveFeedbackStep } from "./onboarding/give-feedback-step"
import { OnboardingStepCompletionStep } from "./onboarding/onboarding-step-completion"

/**
 * Onboarding for taking the user through how the library works?
 */
export const onboardingSchema = z.object({
  disappointment: z.enum(
    ["very-disappointed", "somewhat-disappointed", "not-disappointed"],
    { required_error: "Please fill in your disappointment level :)" }
  ),
  improvements: z.string({
    required_error: "Please help us improve ONBOARDING_LIB for you :)",
  }),

  stack: z.string({
    required_error: "Please tell which software stack you are using :)",
  }),
  integratingFor: z.enum(["personal", "company"], {
    required_error:
      "Are you integrating for yourself or on behalf of your company?",
  }),
  language: z.enum(["js", "ts", "rust", "c", "python", "go"], {
    required_error: "Please select your favorit programming language :)",
  }),
})

export function Demo() {
  /**
   * Onboarding for taking the user through how the library works?
   */

  /**
   * First a quick introduction, what is ONBOARDING_LIB?
   *
   * Build your own onboarding (onboarding):
   * - Form validation with Zod, Shadcn UI & react-hook-form
   * - Configurable controls
   * - Onboarding state for each user is persisted using `unstorage`. Unstorage is a KV-store with support for 20+ storage drivers (including local storage, Redis, etc). Learn more.
   *  - Updates to storage is debounced
   * - `onStepCompleted` -- track the conversion funnels of your onboarding flows to notice churn points using onStepCompleted
   *
   * - IN the end; a `help us improve ONBOARDING_LIB for you` questionnaire with
   * "Your answers will help us build our roadmap"
   * - Does ONBOARDING_LIB fill all your requiremenets from an onboarding library? If not, what features do you need?
   */

  const [isExploding, setIsExploding] = useState(false)

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
    <section className="space-y-4">
      <div className="space-y-1">
        <Subtitle>Onboarding Demo</Subtitle>

        <h1 onClick={() => setIsExploding(true)}>EXPLODE</h1>

        <p>Yor currently saved onboarding data.</p>
        <CodeBlock>hello world</CodeBlock>

        <Onboarding
          id="onboarding-demo"
          storage={storage}
          schema={onboardingSchema}
          userId="user-id"
          onCompleted={() => {
            console.log("Completed")
          }}
        >
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

        <p className="text-gray-500">
          Click on the below buttons to see for yourself amazing your logs will
          be when using{" "}
          <code className="text-gray-800 text-sm p-[2px] bg-gradient-to-b from-gray-50 to-gray-100 bg-gray-100 border-gray-200 border rounded-lg">
            human-logs
          </code>
        </p>
      </div>
      <div className="flex space-x-2">buttons here?</div>
    </section>
  )
}
