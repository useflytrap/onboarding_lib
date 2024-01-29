import Image from "next/image"

export function Footer() {
  return (
    <footer className="space-y-4 w-full h-24 flex items-center justify-center">
      <p className="text-sm text-gray-400 flex space-x-1 items-center">
        <span className="block select-none">Crafted by</span>
        <a
          className="rounded-full flex space-x-1 p-1 pr-1.5 transition-colors hover:bg-gray-200 text-gray-900"
          href="//useflytrap.com"
          target="_blank"
        >
          <Image
            width={20}
            height={20}
            className="rounded-full"
            src="https://www.useflytrap.com/favicons/android-chrome-256x256.png"
            alt="Flytrap logo"
          />
          <span className="block">Flytrap</span>
        </a>
      </p>
    </footer>
  )
}
