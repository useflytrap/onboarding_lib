"use client"

import { useState } from "react"
import { createOnboarding } from "onboarding-lib"
import { toast } from "sonner"
import { createStorage } from "unstorage"
import localStorageDriver from "unstorage/drivers/localstorage"
import { z } from "zod"

import { CodeBlock } from "@/components/code-block"
import { InstallLibraryStep } from "@/components/onboarding/install-library"
import { OnboardingDataStep } from "@/components/onboarding/onboarding-data"
import { OnboardingSetupStep } from "@/components/onboarding/onboarding-setup"
import { SetupDemoStep } from "@/components/onboarding/setup-demo"
import { Subtitle } from "@/components/subtitle"

/**
 * Onboarding for taking the user through how the library works?
 */
export const onboardingSchema = z.object({
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

  const storage = createStorage({
    driver: localStorageDriver({
      base: "demo-onboarding",
      localStorage: window.localStorage,
    }),
  })

  /**
   * Build your own onboarding (onboarding):
   * - Form validation with Zod, Shadcn UI & react-hook-form
   * - Configurable controls
   * - Onboarding state for each user is persisted using `unstorage`. Unstorage is a KV-store with support for 20+ storage drivers (including local storage, Redis, etc). Learn more.
   *  - Updates to storage is debounced
   * - `onStepCompleted` -- track the conversion funnels of your onboarding flows to notice churn points using onStepCompleted
   */

  const { Onboarding, Step } = createOnboarding({
    schema: onboardingSchema,
  })

  const [isExploding, setIsExploding] = useState(false)

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
            validateFormFields={["companySize"]}
            stepId="setup-demo"
            render={SetupDemoStep}
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
