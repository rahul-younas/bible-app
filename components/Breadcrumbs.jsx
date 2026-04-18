"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { ModeToggle } from "./themeBtn"

function formatLabel(segment) {
  const map = {
    "bible": "Bible",
    "new-testament": "New Testament",
    "old-testament": "Old Testament",
  }
  if (map[segment]) return map[segment]
  const decoded = decodeURIComponent(segment)
  const spaced = decoded.replace(/-/g, " ")
  return spaced.replace(/\b\w/g, c => c.toUpperCase())
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  if (!pathname || !pathname.startsWith("/bible")) return null
  const segments = pathname.split("/").filter(Boolean)
  const items = []
  let href = ""
  for (let i = 0; i < segments.length; i++) {
    href += "/" + segments[i]
    items.push({ href, label: formatLabel(segments[i]) })
  }
  return (
    <div className="
flex items-center mx-auto w-full px-2 md:px-5 max-w-6xl py-2 justify-between
sticky top-0 z-50
bg-gradient-to-b from-[rgb(var(--background)/0.8)] via-[rgb(var(--background)/0.5)] to-transparent
backdrop-blur-md
shadow-md
">
      <nav aria-label="Breadcrumb" className="">
        <ol className="flex items-center gap-1 text-foreground text-[10px] md:text-base">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1
            return (
              <li key={item.href} className="flex items-center gap-1 font-semibold">
                {isLast ? (
                  <span className="font-medium text-[12px] md:text-base text-foreground">{item.label}</span>
                ) : (
                  <Link href={item.href} className="hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                )}
                {!isLast && <ChevronRight className="size-4" />}
              </li>
            )
          })}
        </ol>
        <p></p>
      </nav>
      <ModeToggle />
    </div>
  )
}
