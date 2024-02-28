import Image from "next/image"

import { Demo } from "@/components/demo"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { Subtitle } from "@/components/subtitle"

export default function Home() {
  return (
    <main className="w-[90%] max-w-2xl mx-auto">
      <Hero />
      <div className="space-y-16">
        <div>
          <Subtitle>Onboarding Demo</Subtitle>
          <Demo />
        </div>
      </div>
    </main>
  )
}
