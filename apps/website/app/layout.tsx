import type { Metadata } from "next"
import { Inter } from "next/font/google"

import "./globals.css"
import { Toaster } from "sonner"

import { PosthogProvider } from "@/components/analytics"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ONBOARDING_LIB",
  description:
    "ONBOARDING_LIB is a tiny headless onboarding library with form validation, schema validation using Zod and persistance with unstorage.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <PosthogProvider>
        <body className={inter.className}>
          {children}
          <Footer />
          <Toaster />
        </body>
      </PosthogProvider>
    </html>
  )
}
