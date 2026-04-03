import { ModeToggle } from "@/components/themeBtn";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="w-full">
        <div className="mx-auto w-[90%] max-w-6xl flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Saint Anglican Catholic Church Logo"
              width={35}
              height={35}
              priority
              className="rounded-md h-auto w-auto"
            />
            <div className="flex flex-col">
              <span className="text-xs tracking-widest uppercase text-muted-foreground">
                Anglican Catholic Church
              </span>
              <span className="text-sm font-medium">
                Urdu & English Bible Reading
              </span>
            </div>
          </div>
          <ModeToggle />
        </div>
      </header>

      <main className="mx-auto w-[90%] max-w-6xl">
        <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
          <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-cyan-200 via-transparent to-indigo-200 dark:from-cyan-900/40 dark:to-indigo-900/40" />
          <div className="relative px-6 py-12 md:px-12 md:py-16 flex flex-col items-center text-center gap-3">
            <Image
              src="/logo.png"
              alt="Church Logo"
              width={96}
              height={96}
              priority
              className="rounded-lg shadow-sm mb-5 w-auto h-auto"
            />
            <h3 className="text-xl font-bold leading-tight">
                Urdu & English
            </h3>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Catholic Bible
            </h1>
            <p className="text-xl text-muted-foreground">
              Saint Mary the Virgin Anglican Catholic Church
            </p>
            <p className="text-base md:text-lg text-muted-foreground">
              Rev. Father Amir Bashir
            </p>
            <div className="flex flex-col md:flex-row items-center gap-3 pt-2">
              <Link href="/bible">
                <Button className="text-base cursor-pointer md:text-lg px-6 py-6">
                  Start Reading
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Bilingual Experience</h3>
            <p className="text-sm text-muted-foreground">
              Read scripture in Urdu and English with clear, comfortable typography.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Simple Navigation</h3>
            <p className="text-sm text-muted-foreground">
              Browse by book and chapter to find your daily reading.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Beautiful Layout</h3>
            <p className="text-sm text-muted-foreground">
              Clean design with theme support for comfortable reading.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
