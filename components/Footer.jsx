import Link from "next/link"

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border bg-background">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/40" />
        <div className="absolute -top-24 left-1/2 h-48 w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-fuchsia-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto w-[90%] max-w-6xl py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <div className="text-base font-semibold tracking-tight">
              Urdu & English Catholic Bible
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              A clean, bilingual reading experience for Scripture and prayer—built
              for daily reflection.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div className="space-y-3">
              <div className="text-sm font-semibold">Pages</div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/contact">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-3 col-span-2 md:col-span-1">
              <div className="text-sm font-semibold">Quick actions</div>
              <div className="grid gap-2">
                <Link
                  href="/bible"
                  className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 text-sm transition-colors hover:bg-muted/40"
                >
                  <span>Start reading</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    →
                  </span>
                </Link>

                <Link
                  href="/prayers"
                  className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 text-sm transition-colors hover:bg-muted/40"
                >
                  <span>Open prayers</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    →
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="group flex items-center justify-between rounded-xl border border-border bg-card/40 px-4 py-3 text-sm transition-colors hover:bg-muted/40"
                >
                  <span>Contact</span>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border/70 pt-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-xs text-muted-foreground">
            Creator:{" "}
            <span className="font-semibold text-foreground">Rahul Jonas</span>
          </p>
          <p className="text-xs text-muted-foreground">
            © {year} Rahul Jonas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

