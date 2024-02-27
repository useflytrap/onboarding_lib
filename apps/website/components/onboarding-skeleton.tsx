import { Skeleton } from "@/components/ui/skeleton"
import { CodeBlock } from "@/components/code-block"
import { Subtitle } from "@/components/subtitle"

export function OnboardingSkeleton() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <Subtitle>Onboarding Demo</Subtitle>

        <p>Yor currently saved onboarding data.</p>
        <CodeBlock>hello world</CodeBlock>

        <div className="space-y-2">
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    </section>
  )
}
