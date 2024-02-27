import { ReactNode } from "react"

export function Subtitle({ children, ...props }: { children: ReactNode }) {
  return (
    <h2 className="font-medium text-neutral-900" {...props}>
      {children}
    </h2>
  )
}
