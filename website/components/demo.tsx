"use client"

import { createOnboarding } from "onboarding-lib"
import { toast } from "sonner"
import { z } from "zod"

import { Subtitle } from "@/components/subtitle"

export function Demo() {
  /**
   * Onboarding for taking the user through how the library works?
   */

  const onboardingSchema = z.object({})

  /**
   * Build your own onboarding (onboarding):
   * - Form validation with Zod, Shadcn UI & react-hook-form
   * - Onboarding state for each user is persisted using `unstorage`. Unstorage is a KV-store with support for 20+ storage drivers (including local storage, Redis, etc). Learn more.
   * - `onStepCompleted` -- track the conversion funnels of your onboarding flows to notice churn points using onStepCompleted
   */

  const { Onboarding, Step } = createOnboarding({
    schema: onboardingSchema,
  })

  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <Subtitle>Onboarding Demo</Subtitle>
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
