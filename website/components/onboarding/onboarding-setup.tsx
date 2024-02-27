import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  type OnboardingStepRenderProps,
} from "onboarding-lib"

import { Input } from "@/components/input"
import { Subtitle } from "@/components/subtitle"

import { CodeBlock } from "../code-block"
import { onboardingSchema } from "../demo"
import { OnboardingStepContainer } from "./onboarding-step"

const onboardingZodSchemaCode = `
/**
 * Onboarding for taking the user through how the library works?
 */
export const onboardingSchema = z.object({
})
`

const onboardingWithShadcnComponent = `
export function LibraryAnatomyStep({ form }: OnboardingStepRenderProps<typeof onboardingSchema>) {
	return (
		<FormField
			control={props.form.control}
			name="companySize"
			render={({ field }) => (
				<FormItem>
					<FormLabel>Company size</FormLabel>
					<FormControl>
						<Input placeholder="shadcn" {...field} />
					</FormControl>
					<FormDescription>
						How many employees are you?
					</FormDescription>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
`

export function OnboardingSetupStep(
  props: OnboardingStepRenderProps<typeof onboardingSchema>
) {
  return (
    <OnboardingStepContainer
      title="Form validation with Zod & react-hook-form"
      {...props}
    >
      <div>
        <Subtitle>Define your form data with Zod</Subtitle>
        <p className="text-gray-500">
          This will be used with `react-hook-form`.
        </p>
      </div>
      <CodeBlock>{onboardingZodSchemaCode}</CodeBlock>

      <div>
        <Subtitle>Gather onboarding data</Subtitle>
        <p className="text-gray-500">
          Next up, use the `react-hook-form` form control to bind to an input
          element to request details from our onboarding user. Here we&apos;re
          using shadcn UI Form components.
        </p>
      </div>

      <CodeBlock>{onboardingWithShadcnComponent}</CodeBlock>
    </OnboardingStepContainer>
  )
}
