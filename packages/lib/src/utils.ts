import type { ReactElement, ReactNode } from "react"
import { z, type ZodSchema } from "zod"

import { OnboardingStepProps } from "./types"

export function childrenWithPropsArray<T extends Record<string, any>>(
  children: ReactNode
) {
  return Array.isArray(children)
    ? (children as ReactElement<T>[])
    : [children as ReactElement<T>]
}

export async function getComputedMarkAsCompleted<T extends ZodSchema>(
  markAsCompleted: Exclude<
    OnboardingStepProps<T>["markAsCompleted"],
    undefined
  >,
  formValues: z.infer<T>
) {
  let computedMarkAsCompleted = false
  if (markAsCompleted === true || markAsCompleted === false) {
    computedMarkAsCompleted = markAsCompleted
  } else {
    try {
      computedMarkAsCompleted = await markAsCompleted(formValues)
    } catch {}
  }
  return computedMarkAsCompleted
}
