"use client"

import React, { useCallback, useState } from "react"
import copy from "copy-to-clipboard"
import { AnimatePresence, MotionConfig, motion } from "framer-motion"
import { Highlight } from "prism-react-renderer"
import useMeasure from "react-use-measure"
import { twMerge } from "tailwind-merge"

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
}

const theme = {
  plain: {
    color: "var(--gray12)",
    fontSize: 12,
    fontFamily: "var(--font-mono)",
  },
  styles: [
    {
      types: ["comment"],
      style: {
        color: "var(--gray9)",
      },
    },
    {
      types: ["atrule", "keyword", "attr-name", "selector"],
      style: {
        color: "var(--gray10)",
      },
    },
    {
      types: ["punctuation", "operator"],
      style: {
        color: "var(--gray9)",
      },
    },
    {
      types: ["class-name", "function", "tag"],
      style: {
        color: "var(--gray12)",
      },
    },
  ],
}

export const CodeBlock = ({
  children,
  initialHeight = 0,
  copyFromAnywhere,
  copyContent,
}: {
  children: string
  initialHeight?: number
  copyFromAnywhere?: true
  copyContent?: string
}) => {
  const [ref, bounds] = useMeasure()
  const [copying, setCopying] = useState(false)

  const onCopy = useCallback(() => {
    copy(copyContent ?? children)
    setCopying(true)
    setTimeout(() => {
      setCopying(false)
    }, 2000)
  }, [copyContent, children])

  return (
    <div
      className={twMerge(
        "flex min-h-[38px] h-max p-2 relative items-center bg-gradient-to-b from-gray-50 to-gray-100 bg-gray-100 border-gray-200 border rounded-lg overflow-hidden",
        copyFromAnywhere && "cursor-copy"
      )}
      onClick={(e) => {
        if (copyFromAnywhere) {
          onCopy()
        }
      }}
    >
      <button
        className="absolute right-1 top-1 p-1.5 border border-gray-200 rounded-lg"
        onClick={onCopy}
        aria-label="Copy code"
      >
        <MotionConfig transition={{ duration: 0.15 }}>
          <AnimatePresence initial={false} mode="wait">
            {copying ? (
              <motion.div
                animate="visible"
                exit="hidden"
                initial="hidden"
                key="check"
                variants={variants}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  shapeRendering="geometricPrecision"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </motion.div>
            ) : (
              <motion.div
                animate="visible"
                exit="hidden"
                initial="hidden"
                key="copy"
                variants={variants}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  shapeRendering="geometricPrecision"
                >
                  <path d="M8 17.929H6c-1.105 0-2-.912-2-2.036V5.036C4 3.91 4.895 3 6 3h8c1.105 0 2 .911 2 2.036v1.866m-6 .17h8c1.105 0 2 .91 2 2.035v10.857C20 21.09 19.105 22 18 22h-8c-1.105 0-2-.911-2-2.036V9.107c0-1.124.895-2.036 2-2.036z"></path>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </button>

      <Highlight theme={theme} code={children} language="tsx">
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <motion.pre
            animate={{ height: bounds.height || initialHeight }}
            transition={{ type: "easeOut", duration: 0.2 }}
          >
            <div className={`${className}`} ref={ref}>
              <div />
              {tokens.map((line, i) => {
                const { key: lineKey, ...rest } = getLineProps({ line, key: i })
                return (
                  <div key={lineKey as any} {...rest}>
                    {line.map((token, key) => {
                      const { key: tokenKey, ...rest } = getTokenProps({
                        token,
                        key,
                      })
                      return <span key={tokenKey as any} {...rest} />
                    })}
                  </div>
                )
              })}
            </div>
          </motion.pre>
        )}
      </Highlight>
    </div>
  )
}
