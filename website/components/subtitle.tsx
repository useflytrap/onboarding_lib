import { ReactNode } from "react"

export function Subtitle({ children }: { children: ReactNode }) {
  return <h2 className="font-medium text-neutral-900">{children}</h2>
}
