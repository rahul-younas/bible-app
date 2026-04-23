"use client"

import { useEffect, useId, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, Menu, X } from "lucide-react"

import { ModeToggle } from "@/components/themeBtn"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
]

const handleAuth = () => {
  alert("This feature is in progress");
};

function NavLink({ href, label, onClick }) {
  const pathname = usePathname()
  const isActive =
    href === "/" ? pathname === "/" : pathname?.startsWith(href)

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-semibold transition-colors",
        "hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        isActive ? "bg-muted text-foreground" : "text-muted-foreground"
      )}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [homeExpanded, setHomeExpanded] = useState(false)
  const titleId = useId()

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false)
    }
    if (!open) return
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!open) setHomeExpanded(false)
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg english">
        <div className="mx-auto flex h-16 w-[90%] max-w-6xl items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={open}
              aria-controls="app-sidebar"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>

            <Link href="/" className="flex items-center gap-3 min-w-0">
              <Image
                src="/logo.png"
                alt="App Logo"
                width={24}
                height={24}
                priority
                className="hidden md:block rounded-md h-auto w-auto"
              />
              <span className="md:hidden truncate text-sm font-semibold text-foreground">
                Urdu & English Catholic Bible
              </span>
              <div className="hidden md:flex min-w-0 flex-col leading-tight">
                <span className="text-xs tracking-widest uppercase text-muted-foreground">
                  Urdu & English
                </span>
                <span className="truncate text-sm font-semibold text-foreground">
                  Catholic Bible
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1 english">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <div className="hidden md:flex items-center gap-2">
              <Link href="/">
                <Button variant="outline" onClick={handleAuth} size="lg" className="h-9 px-4">
                  Login
                </Button>
              </Link>
              <Link href="/">
                <Button size="lg" onClick={handleAuth} className="h-9 px-4">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile/Tablet sidebar */}
      <div
        className={cn(
          "fixed inset-0 z-[60] md:hidden english",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity",
            open ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setOpen(false)}
        />

        <aside
          id="app-sidebar"
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className={cn(
            "absolute left-0 top-0 h-full w-[84%] max-w-[340px] border-r border-border bg-background shadow-xl",
            "transition-transform duration-200 ease-out",
            open ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-border px-4 py-4">
              <div className="flex items-center gap-3 min-w-0">
                <Image
                  src="/logo.png"
                  alt="App Logo"
                  width={28}
                  height={28}
                  priority
                  className="rounded-md h-auto w-auto"
                />
                <div className="min-w-0">
                  <div
                    id={titleId}
                    className="truncate text-sm font-semibold text-foreground text-wrap"
                  >
                    Urdu & English Catholic Bible
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Menu
                  </div>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
              >
                <X />
              </Button>
            </div>

            <nav className="flex flex-col gap-1 p-3">
              {/* Home with dropdown (mobile/tablet sidebar only) */}
              <div className="flex flex-col">
                <div className="flex items-center">
                  <div className="min-w-0 flex-1">
                    <NavLink
                      href="/"
                      label="Home"
                      onClick={() => setOpen(false)}
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    className="ml-1 shrink-0"
                    aria-label={homeExpanded ? "Collapse Home links" : "Expand Home links"}
                    aria-expanded={homeExpanded}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setHomeExpanded((v) => !v)
                    }}
                  >
                    <ChevronDown
                      className={cn(
                        "transition-transform duration-200",
                        homeExpanded ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </Button>
                </div>

                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    homeExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}
                >
                  <div className="overflow-hidden pl-3">
                    <div className="mt-1 flex flex-col gap-1 border-l border-border/60 pl-3">
                      <NavLink
                        href="/bible"
                        label="Bible Reading"
                        onClick={() => setOpen(false)}
                      />
                      <NavLink
                        href="/prayers"
                        label="Catholic Prayers"
                        onClick={() => setOpen(false)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {NAV_ITEMS.filter((i) => i.href !== "/").map((item) => (
                <NavLink
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  onClick={() => setOpen(false)}
                />
              ))}
            </nav>

            <div className="mt-auto border-t border-border p-4">
              <div className="grid grid-cols-2 gap-2">
                <Link href="/" onClick={() => setOpen(false)}>
                  <Button variant="outline" onClick={handleAuth} className="w-full h-10">
                    Login
                  </Button>
                </Link>
                <Link href="/" onClick={() => setOpen(false)}>
                  <Button className="w-full h-10 onClick={handleAuth}">
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}

