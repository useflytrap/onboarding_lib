import Image from "next/image"
import Link from "next/link"

export function Hero() {
  return (
    <section className="space-y-6 py-36 flex flex-col items-center">
      <Image
        src="/onboarding-lib-logo.svg"
        width={300}
        height={35}
        alt="ONBOARDING_LIB logo"
      />
      <p className="text-lg max-w-lg mx-auto text-gray-600 text-center">
        A tiny headless onboarding library with form validation, schema
        validation using Zod and persistance with unstorage.
      </p>
      <div className="space-x-2 flex items-cente justify-center">
        <button className="h-11 text-xs font-semibold px-12 text-white rounded-xl bg-gradient-to-b from-gray-900 to-gray-800 cursor-pointer flex items-center justify-center">
          Show human friendly log
        </button>
        <Link target={"_blank"} href="https://github.com/skoshx/human-errors">
          <button className="h-11 text-xs font-semibold px-6 text-gray-800 rounded-xl bg-gradient-to-b from-gray-100 to-gray-300 cursor-pointer flex items-center justify-center border border-gray-200">
            GitHub
          </button>
        </Link>
      </div>
    </section>
  )
}
