import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "About | Urdu & English Catholic Bible",
  description:
    "Learn about the mission behind the Urdu & English Catholic Bible platform.",
}

export default function AboutPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/40" />

      <main className="relative mx-auto w-[90%] max-w-6xl py-10 md:py-16">
        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md md:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            About This Ministry
          </p>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            Urdu & English Catholic Bible
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
            This platform is built to help believers read God&apos;s Word in both
            Urdu and English with clarity, beauty, and ease. Our aim is to make
            Scripture and prayer accessible for daily devotion, study, and
            reflection.
          </p>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">Our Vision</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              To provide a peaceful and focused space for bilingual Bible reading
              and spiritual growth.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">Our Commitment</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              We are committed to a clean experience, easy navigation, and
              meaningful content for all age groups.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <h2 className="text-lg font-semibold">Community Focus</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Rooted in church fellowship, this project encourages daily prayer,
              reading habits, and faith-centered living.
            </p>
          </article>
        </section>

        <section className="mt-6 rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm md:p-8">
          <h2 className="text-xl font-bold md:text-2xl">
            Saint Mary the Virgin Anglican Catholic Church
          </h2>
          <p className="mt-2 text-muted-foreground">
            Serving believers with resources for worship, reflection, and scriptural
            understanding.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Rev. Father Amir Bashir</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/bible" className="w-full sm:w-auto">
              <Button className="h-10 w-full px-6">Start Bible Reading</Button>
            </Link>
            <Link href="/prayers" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="h-10 w-full px-6"
              >
                Open Prayers
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}

