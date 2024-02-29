import posthog from "posthog-js"

type EventMap = {
  "onboarding:complete_introduction": undefined
  "onboarding:complete_installation": undefined
  "onboarding:complete_setup": undefined
  "onboarding:complete_creating_steps": undefined
  "onboarding:complete_on_complete": undefined
  "onboarding:complete_feedback": undefined
  "onboarding:complete_onboarding_data": undefined
  "onboarding:submit_feedback": {
    disappointment: string
    improvements: string
    $set: {
      disappointment: string
      improvements: string
    }
  }
}

// Fully type-safe event capturing, NICE!
export function createTrackingFunction<
  EventMap extends Record<string, Record<string, any> | undefined>
>() {
  return {
    trackEvent: async <K extends keyof EventMap>(
      eventName: K,
      ...[properties]: EventMap[K] extends undefined ? [] : [EventMap[K]]
    ) => {
      posthog.capture(eventName as string, properties)
    },
  }
}

export const trackEvent = createTrackingFunction<EventMap>().trackEvent
