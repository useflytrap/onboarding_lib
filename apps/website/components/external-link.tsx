import Link from "next/link"

export function ExternalLink(
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
) {
  return (
    <Link
      href={props.href as string}
      target="_blank"
      className="text-[#FFC53D] underline underline-offset-2"
    >
      {props.children}
    </Link>
  )
}
