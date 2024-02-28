import { Skeleton } from "@/components/ui/skeleton"

export function OnboardingSkeleton() {
  return (
    <section className="space-y-2">
      <Skeleton className="h-16 w-full rounded-xl mt-2" />
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-full rounded-xl" />
      <Skeleton className="h-16 w-full rounded-xl" />
    </section>
  )
}
