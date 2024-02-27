import { type OnboardingStepRenderProps } from "onboarding-lib"

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Subtitle } from "@/components/subtitle"

import { onboardingSchema } from "../demo"
import { OnboardingStepContainer } from "./onboarding-step"

export function SetupDemoStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer title="Onboarding questions" {...props}>
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
        name="stack"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your frontend stack</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue>Select your stack</SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="next.js">Next.js</SelectItem>
                <SelectItem value="svelte-kit">SvelteKit</SelectItem>
                <SelectItem value="remix">Remix</SelectItem>
                <SelectItem value="nuxt">Nuxt</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={props.form.control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Your favorite language</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue>Select your language</SelectValue>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem disabled value="js">
                  JavaScript
                </SelectItem>
                <SelectItem value="ts">TypeScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
                <SelectItem disabled value="c">
                  C
                </SelectItem>
                <SelectItem value="go">Go</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </OnboardingStepContainer>
  )
}
