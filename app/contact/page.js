import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Contact Us | Urdu & English Catholic Bible",
  description:
    "Get in touch with the Urdu & English Catholic Bible ministry team.",
}

export default function ContactPage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/40" />

      <main className="relative mx-auto w-[90%] max-w-6xl py-10 md:py-16">
        <section className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur-md md:p-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Contact Us
          </p>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            We&apos;d Love to Hear From You
          </h1>
          <p className="mt-4 max-w-3xl text-muted-foreground md:text-lg">
            Have a question, suggestion, or prayer-related request? Share your
            message and we will respond as soon as possible.
          </p>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-5">
          <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm md:col-span-2">
            <h2 className="text-xl font-semibold">Church Contact</h2>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Church:</span>{" "}
                Saint Mary the Virgin Anglican Catholic Church
              </p>
              <p>
                <span className="font-medium text-foreground">Pastor:</span> Rev.
                Father Amir Bashir
              </p>
              <p>
                <span className="font-medium text-foreground">Email:</span>{" "}
                info@example.com
              </p>
              <p>
                <span className="font-medium text-foreground">Phone:</span> +92
                300 0000000
              </p>
              <p>
                <span className="font-medium text-foreground">Address:</span>{" "}
                Add church address here
              </p>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              You can replace these details anytime with your real church contact
              information.
            </p>
          </div>

          <form className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm md:col-span-3">
            <h2 className="text-xl font-semibold">Send a Message</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-muted-foreground">Full Name</span>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="text-muted-foreground">Email</span>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
                />
              </label>
            </div>

            <label className="mt-4 flex flex-col gap-1.5 text-sm">
              <span className="text-muted-foreground">Subject</span>
              <input
                type="text"
                placeholder="Message subject"
                className="h-10 rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
            </label>

            <label className="mt-4 flex flex-col gap-1.5 text-sm">
              <span className="text-muted-foreground">Message</span>
              <textarea
                rows={6}
                placeholder="Write your message here..."
                className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-ring"
              />
            </label>

            <div className="mt-5 flex items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Form action will be added later.
              </p>
              <Button type="button" className="h-10 px-6">
                Send Message
              </Button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

