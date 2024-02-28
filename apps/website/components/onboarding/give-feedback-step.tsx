import type { OnboardingStepRenderProps } from "onboarding_lib"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { onboardingSchema } from "@/components/demo"
import { OnboardingStepContainer } from "@/components/onboarding/onboarding-step"
import { Subtitle } from "@/components/subtitle"

export function GiveFeedbackStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer
      title="Help us improve ONBOARDING_LIB for you"
      {...props}
    >
      <div>
        <Subtitle>
          Please help us improve `ONBOARDING_LIB` by answering some questions.
        </Subtitle>
        <p className="text-gray-500">
          This will be used with `react-hook-form`.
        </p>
      </div>

      <FormField
        control={props.form.control}
        name="disappointment"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              How disappointed would you be if you could no longer use
              ONBOARDING_LIB?
            </FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Disappointment level" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="very-disappointed">
                  Very disappointed
                </SelectItem>
                <SelectItem value="somewhat-disappointed">
                  Somewhat disappointed
                </SelectItem>
                <SelectItem value="not-disappointed">
                  Not disappointed
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={props.form.control}
        name="improvements"
        render={({ field }) => (
          <FormItem>
            <FormLabel>How can we improve ONBOARDING_LIB for you?</FormLabel>
            <Input {...field} />
            <FormMessage />
          </FormItem>
        )}
      />
    </OnboardingStepContainer>
  )
}
