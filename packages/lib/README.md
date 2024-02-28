<p align="center">
	<img src="https://github.com/useflytrap/onboarding_lib/raw/main/docs/onboarding-lib-banner.png" />
</p>

# ONBOARDING_LIB

[![npm version][npm-version-src]][npm-href]
[![npm downloads][npm-downloads-src]][npm-href]
[![Github Actions][github-actions-src]][github-actions-href]

> 🪜 A tiny headless onboarding library with form validation, schema validation using Zod and persistance with unstorage.

A good onboarding flow is one of the best ways to guide a new user to see the value of any new product.

We built ONBOARDING_LIB to make building such onboarding flows dead simple. ONBOARDING_LIB takes care of persisting your onboarding state, handling form validation & side-effects in an intuitive way so that you can build your onboarding flow with ease.

## Features

- Headless
- Form validation using `react-hook-form`
- Persistance using [unstorage](https://unstorage.unjs.io/)

## 💻 Example Usage

```typescript
/**
 * Define your onboariding data schema
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
	// Create your Onboarding components
	const { Onboarding, Step } = createOnboarding({
    schema: onboardingSchema,
  })

	// Then simply define your onboarding steps
	return (
    <Onboarding
      id="onboarding-demo"
      storage={storage}
      schema={onboardingSchema}
      userId="user-id"
      onCompleted={() => {
        console.log("Completed")
      }}
    >
      <Step stepId="introduction" render={IntroductionStep} />
      <Step stepId="install-library" render={InstallLibraryStep} />
      <Step stepId="onboarding-setup" render={OnboardingSetupStep} />
      <Step stepId="creating-steps" render={CreatingStepsStep} />
      <Step stepId="on-complete" render={OnboardingStepCompletionStep} />
      <Step
        validateFormFields={["disappointment", "improvements"]}
        stepId="feedback"
        skippable={false}
        render={GiveFeedbackStep}
      />
      <Step stepId="onboarding-data" render={OnboardingDataStep} />
      <Step stepId="thank-you" render={ThankYouStep} />
    </Onboarding>
  )
}
```

## 💻 Development

- Clone this repository
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable` (use `npm i -g corepack` for Node.js < 16.10)
- Install dependencies using `pnpm install`
- Run the demo website using `pnpm dev`

## License

Made with ❤️ in Helsinki

Published under [MIT License](./LICENSE).

<!-- Links -->

[npm-href]: https://npmjs.com/package/onboarding_lib
[github-actions-href]: https://github.com/useflytrap/onboarding_-_lib/actions/workflows/ci.yml

<!-- Badges -->

[npm-version-src]: https://badgen.net/npm/v/onboarding_lib?color=black
[npm-downloads-src]: https://badgen.net/npm/dw/onboarding_lib?color=black
[prettier-src]: https://badgen.net/badge/style/prettier/black?icon=github
[github-actions-src]: https://github.com/useflytrap/onboarding_lib/actions/workflows/ci.yml/badge.svg
