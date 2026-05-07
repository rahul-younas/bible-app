"use client";

import { useState } from "react";
import prayersData from "@/data/catholic-prayers/prayers.json";

const selectClass =
  "min-h-10 w-full min-w-0 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring";

export default function PrayersPage() {
  const [language, setLanguage] = useState("urdu");
  const [jumpTo, setJumpTo] = useState("");

  const jumpTitlesAreUrdu = language === "urdu";

  const scrollToPrayer = (id) => {
    const el = document.getElementById(`prayer-${id}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div
        className="sticky top-8 z-40 -mx-4 mb-8 border-b border-border bg-background/95 px-4 py-2 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80"
      >
        <div className="mx-auto flex max-w-6xl flex-row flex-nowrap items-end gap-4 md:gap-6">
          <label className="flex w-36 shrink-0 flex-col gap-1.5 text-sm font-medium text-foreground md:w-44">
            Select Language
            <div className="relative">
              <select
                aria-label="Prayer language"
                className={`${selectClass} appearance-none pr-10 bg-secondary`}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="urdu">Urdu</option>
                <option value="english">English</option>
                <option value="both">Both</option>
              </select>

              {/* Custom arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                ▼
              </div>
            </div>

          </label>
          <label className="flex min-w-0 flex-1 flex-col gap-1.5 text-sm font-medium text-foreground">
            Jump to prayer

            <div className="relative">
              <select
                aria-label={
                  jumpTitlesAreUrdu
                    ? "Jump to prayer by Urdu title"
                    : "Jump to prayer by English title"
                }
                className={`${selectClass} bg-secondary appearance-none w-full ${jumpTitlesAreUrdu ? "pl-10 pr-3 text-right" : "pr-10 pl-3 text-left"
                  }`}
                dir={jumpTitlesAreUrdu ? "rtl" : "ltr"}
                value={jumpTo}
                onChange={(e) => {
                  const id = e.target.value;
                  if (id) {
                    scrollToPrayer(Number(id));
                    setJumpTo("");
                  }
                }}
              >
                <option value="">
                  {jumpTitlesAreUrdu ? "دُعا منتخب کریں…" : "Select a prayer…"}
                </option>

                {prayersData.prayers.map((prayer) => (
                  <option key={prayer.id} value={String(prayer.id)} className="urdu">
                    {jumpTitlesAreUrdu ? prayer.title.urdu : prayer.title.english}
                  </option>
                ))}
              </select>

              {/* Custom arrow */}
              <div
                className={`pointer-events-none absolute inset-y-0 flex items-center ${jumpTitlesAreUrdu ? "left-3" : "right-3"
                  }`}
              >
                ▼
              </div>
            </div>
          </label>
        </div>
      </div>

      {prayersData.prayers.map((prayer) => (
        <div
          key={prayer.id}
          id={`prayer-${prayer.id}`}
          className="mb-10 scroll-mt-32 border-b pb-6 last:border-none"
        >
          {language === "both" && (
            <div className="flex flex-col md:flex-row gap-6">
              <div
                className="md:w-1/2 order-1 md:order-2 text-right"
                dir="rtl"
              >
                <h2 className="text-xl font-semibold mb-3 urdu text-high-light">
                  {prayer.title.urdu}
                </h2>
                <p className="whitespace-pre-wrap leading-7 urdu">
                  {prayer.content.urdu}
                </p>
              </div>
              <div className="md:w-1/2 order-2 md:order-1 text-left">
                <h2 className="text-xl font-semibold mb-3 text-high-light">
                  {prayer.title.english}
                </h2>
                <p className="whitespace-pre-wrap leading-7">
                  {prayer.content.english}
                </p>
              </div>
            </div>
          )}

          {language === "urdu" && (
            <div className="max-w-3xl mx-auto w-full text-right" dir="rtl">
              <h2 className="text-xl font-semibold mb-3 urdu text-high-light">
                {prayer.title.urdu}
              </h2>
              <p className="whitespace-pre-wrap leading-7 urdu">
                {prayer.content.urdu}
              </p>
            </div>
          )}

          {language === "english" && (
            <div className="max-w-3xl mx-auto w-full text-left">
              <h2 className="text-xl font-semibold mb-3 text-high-light">
                {prayer.title.english}
              </h2>
              <p className="whitespace-pre-wrap leading-7">
                {prayer.content.english}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
