"use client"

import posthog from "posthog-js"
import { PostHogProvider as PHProvider } from "posthog-js/react"

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  })
}

export function PosthogProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PHProvider client={posthog}>{children}</PHProvider>
}
