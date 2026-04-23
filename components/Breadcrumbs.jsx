"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { ModeToggle } from "./themeBtn"

function formatLabel(segment) {
  const map = {
    bible: "Bible",
    "new-testament": "New Testament",
    "old-testament": "Old Testament",
    prayers: "Prayers",
  }
  if (map[segment]) return map[segment]
  const decoded = decodeURIComponent(segment)
  const spaced = decoded.replace(/-/g, " ")
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function Breadcrumbs() {
  const pathname = usePathname()
  if (!pathname) return null
  if (pathname === "/") return null
  const segments = pathname.split("/").filter(Boolean)
  const items = [{ href: "/", label: "Home" }]
  let href = ""
  for (let i = 0; i < segments.length; i++) {
    href += "/" + segments[i]
    items.push({ href, label: formatLabel(segments[i]) })
  }
  return (
    <div className="flex items-start gap-3 mx-auto w-full px-10 max-w-6xl py-2 justify-between sticky top-0 z-50 bg-gradient-to-b from-[rgb(var(--background)/0.8)] via-[rgb(var(--background)/0.5)] to-transparent backdrop-blur-md">
      <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1.5 text-foreground text-[12px] md:text-base">
          {items.map((item, idx) => {
            const isLast = idx === items.length - 1
            return (
              <li key={item.href} className="flex min-w-0 max-w-full items-center gap-1 font-semibold">
                {isLast ? (
                  <span className="font-medium text-[12px] md:text-base text-foreground break-words">{item.label}</span>
                ) : (
                  <Link href={item.href} className="break-words hover:text-foreground transition-colors">
                    {item.label}
                  </Link>
                )}
                {!isLast && <ChevronRight className="size-4 shrink-0" aria-hidden />}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
