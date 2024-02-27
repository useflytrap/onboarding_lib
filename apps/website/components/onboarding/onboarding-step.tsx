import { ReactNode, useCallback, useEffect, useState } from "react"
import { CheckCircleIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon as CheckCircleIconSolid } from "@heroicons/react/24/solid"
import { AnimatePresence, motion } from "framer-motion"
import type { OnboardingStepRenderProps } from "onboarding-lib"
import useMeasure from "react-use-measure"

import { Button } from "@/components/ui/button"
import { Subtitle } from "@/components/subtitle"

import { onboardingSchema } from "../demo"

const variants = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: 10, opacity: 0 },
}

const variantsOut = {
  visible: { y: 0, opacity: 1 },
  hidden: { y: -10, opacity: 0 },
}

export function OnboardingStepContainer({
  stepId,
  next,
  previous,
  skip,
  isCurrentStep,
  children,
  title,
  goto,
  isMarkedAsCompleted,
}: OnboardingStepRenderProps<typeof onboardingSchema> & {
  children: ReactNode
  title: string
}) {
  return (
    <div className="rounded-lg border border-gray-200 mt-2">
      <div
        className="flex items-center p-4 cursor-pointer"
        onClick={() => goto(stepId)}
      >
        <AnimatePresence mode="popLayout">
          {isMarkedAsCompleted && (
            <motion.div
              variants={variants}
              key={"is-current-step"}
              animate="visible"
              initial="hidden"
              exit="hidden"
              transition={{ type: "spring" }}
            >
              <CheckCircleIconSolid className="w-4 h-4 mr-2" />
            </motion.div>
          )}
          {isMarkedAsCompleted === false && (
            <motion.div
              variants={variantsOut}
              key={"not-current-step"}
              animate="visible"
              initial="hidden"
              exit="hidden"
              transition={{ type: "spring" }}
            >
              <CheckCircleIcon className="w-4 h-4 mr-2" />
            </motion.div>
          )}
        </AnimatePresence>
        <Subtitle>{title}</Subtitle>
      </div>

      <motion.div
        initial={{ opacity: 0, height: "16px" }}
        animate={{
          opacity: isCurrentStep ? 1 : 0,
          height: isCurrentStep ? "auto" : "16px",
        }}
        transition={{ type: "spring" }}
        className="overflow-hidden"
      >
        <div className="p-4 space-y-4">
          {children}
          <div className="flex items-center gap-2">
            {previous && (
              <Button type="button" onClick={previous}>
                Back
              </Button>
            )}
            {next && (
              <Button type="button" onClick={next}>
                Next
              </Button>
            )}
            {skip && (
              <Button type="button" variant={"secondary"} onClick={skip}>
                Skip
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
