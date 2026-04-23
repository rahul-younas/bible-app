import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function Home() {

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-black text-zinc-50 pb-5">
      <main className="relative">
        <div className="pointer-events-none absolute inset-0">
          <Image
            src="/bg-image.jpg"
            alt=""
            fill
            priority
            className="object-cover object-top md:object-[center_30%] opacity-55"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/65 to-black/85" />
        </div>

        <div className="relative mx-auto w-[90%] max-w-6xl py-1">
          <section className="relative mt-0 md:mt-80 overflow-hidden rounded-2xl ">
            <div className="px-6 py-5 md:px-12 md:py-16 flex flex-col items-center text-center gap-50 lg:gap-4">
              <div className="text-muted-background">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs tracking-widest uppercase text-zinc-200">
                  Urdu & English
                </div>

                <h1 className="text-3xl md:text-6xl font-extrabold leading-tight">
                  Catholic Bible
                </h1>
                <p className="max-w-2xl text-base md:text-lg text-zinc-200">
                  Saint Mary the Virgin Anglican Catholic Church
                </p>
                <p className="text-sm md:text-base text-zinc-300">
                  Rev. Father Amir Bashir
                </p>
                <div className="text-center text-white px-4">
                  <p className="text-lg md:text-2xl font-medium italic text text-gray-500">
                    “Your word is a lamp to my feet and a light to my path.”
                  </p>
                  <span className="block mt-2 text-sm md:text-base opacity-80">
                    — Psalm 119:105
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
                <Link href="/bible" className="w-full sm:w-auto">
                  <Button className="text-base w-full sm:w-[170px] cursor-pointer md:text-lg px-6 py-6">
                    Start Reading
                  </Button>
                </Link>
                <Link href="/prayers" className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="text-base w-full sm:w-[170px] cursor-pointer md:text-lg px-6 py-6 border-white/20 bg-white/5 text-zinc-50 hover:bg-white/10"
                  >
                    Catholic Prayers
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-10">
            <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Bilingual Experience</h3>
              <p className="text-sm text-zinc-200">
                Read scripture in Urdu and English with clear, comfortable typography.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Simple Navigation</h3>
              <p className="text-sm text-zinc-200">
                Browse by book and chapter to find your daily reading.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/30 backdrop-blur-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Beautiful Layout</h3>
              <p className="text-sm text-zinc-200">
                Clean design with theme support for comfortable reading.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}