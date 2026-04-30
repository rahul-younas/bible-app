"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const selectClass =
  "min-h-9 w-full min-w-0 rounded-md border border-border bg-background py-1.5 text-xs md:min-h-10 md:py-2 md:text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring";

export default function ChapterClient({
  chapterData,
  currentChapter,
  chapterOptions = [],
}) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "urdu";
    const savedLanguage = window.localStorage.getItem("bible-reading-language");
    return savedLanguage === "urdu" ||
      savedLanguage === "english" ||
      savedLanguage === "both"
      ? savedLanguage
      : "urdu";
  });
  const router = useRouter();
  const selectedChapterNumber = Number(currentChapter ?? chapterData.chapter);
  const currentChapterIndex = chapterOptions.findIndex(
    (option) => option.number === selectedChapterNumber
  );
  const previousChapter = currentChapterIndex > 0
    ? chapterOptions[currentChapterIndex - 1]
    : null;
  const nextChapter = currentChapterIndex >= 0 &&
    currentChapterIndex < chapterOptions.length - 1
    ? chapterOptions[currentChapterIndex + 1]
    : null;

  useEffect(() => {
    window.localStorage.setItem("bible-reading-language", language);
  }, [language]);

  const getVersesInRange = useMemo(() => {
    return (start, end) =>
      chapterData.verses.filter((v) => v.verse >= start && v.verse <= end);
  }, [chapterData.verses]);

  const versesByNumber = useMemo(() => {
    return chapterData.verses.reduce((acc, verse) => {
      acc[verse.verse] = verse;
      return acc;
    }, {});
  }, [chapterData.verses]);

  const urduSectionByStart = useMemo(() => {
    return chapterData.sections.urdu.reduce((acc, section) => {
      acc[section.start] = section;
      return acc;
    }, {});
  }, [chapterData.sections.urdu]);

  const englishSectionByStart = useMemo(() => {
    return chapterData.sections.english.reduce((acc, section) => {
      acc[section.start] = section;
      return acc;
    }, {});
  }, [chapterData.sections.english]);

  const orderedVerseNumbers = useMemo(() => {
    return chapterData.verses.map((v) => v.verse).sort((a, b) => a - b);
  }, [chapterData.verses]);

  const tokenizeSpEp = (raw = "") => {
    // Splits into: [{ kind: "normal"|"padded", text }...]
    // Supports SP...EP appearing anywhere in the verse.
    const out = [];
    let i = 0;

    while (i < raw.length) {
      const sp = raw.indexOf("SP", i);
      if (sp === -1) {
        out.push({ kind: "normal", text: raw.slice(i) });
        break;
      }

      if (sp > i) out.push({ kind: "normal", text: raw.slice(i, sp) });

      const afterSp = sp + 2;
      const ep = raw.indexOf("EP", afterSp);
      if (ep === -1) {
        out.push({ kind: "padded", text: raw.slice(afterSp) });
        break;
      }

      out.push({ kind: "padded", text: raw.slice(afterSp, ep) });
      i = ep + 2;
    }

    // Drop empty segments to avoid creating blank lines accidentally.
    return out.filter((s) => s.text !== "");
  };

  const renderFormattedVerses = ({ verses, field, isUrdu = false }) => {
    const baseTextClass = isUrdu
      ? "urdu text-lg md:text-xl text-right"
      : "english text-sm md:text-lg text-justify";

    const indentClass = isUrdu ? "pr-10" : "pl-5 md:pl-10";

    return (
      <div
        dir={isUrdu ? "rtl" : "ltr"}
        className={`leading-snug whitespace-pre-wrap ${baseTextClass}`}
      >
        {verses.map((v) => {
          const raw = v?.[field] ?? "";
          const hasMarkers = raw.includes("SP") || raw.includes("EP");
          const startsWithSP = raw.trimStart().startsWith("SP");

          // Keep the original rendering for verses WITHOUT markers.
          if (!hasMarkers) {
            if (isUrdu) {
              return (
                <span key={v.verse} dir="rtl">
                  <strong className="text-high-light mx-2 align-super text-sm md:text-lg">
                    {v.verse}
                  </strong>
                  {raw}
                </span>
              );
            }

            return (
              <span key={v.verse}>
                <strong className="text-high-light mr-2 align-super text-[12px] md:text-sm">
                  {v.verse}
                </strong>
                {raw}
              </span>
            );
          }

          // Special formatting ONLY for verses with SP/EP markers.
          const segments = tokenizeSpEp(raw);

          if (isUrdu) {
            // IMPORTANT: only for verses that START with "SP",
            // keep verse number pinned to the right of the first line while text wraps.
            if (startsWithSP) {
              const numberWidth = "2.4em";
              return (
                <span
                  key={v.verse}
                  dir="rtl"
                  className="align-baseline text-right"
                  style={{ paddingRight: numberWidth }}
                >
                  <strong
                    className="text-high-light mx-2 text-sm md:text-lg align-top inline-block"
                    style={{
                      width: numberWidth,
                      marginRight: `-${numberWidth}`,
                    }}
                  >
                    {v.verse}
                  </strong>

                  {segments.map((seg, idx) =>
                    seg.kind === "padded" ? (
                      <span
                        key={idx}
                        className={`inline-block ${indentClass} whitespace-pre-wrap text-right`}
                      >
                        {seg.text}
                      </span>
                    ) : (
                      <span key={idx}>{seg.text}</span>
                    )
                  )}
                </span>
              );
            }

            return (
              <span key={v.verse} dir="rtl">
                <strong className="text-high-light mx-2 align-super text-sm md:text-lg">
                  {v.verse}
                </strong>

                {segments.map((seg, idx) =>
                  seg.kind === "padded" ? (
                    <span
                      key={idx}
                      className={`inline-block ${indentClass} whitespace-pre-wrap text-right`}
                    >
                      {seg.text}
                    </span>
                  ) : (
                    <span key={idx}>{seg.text}</span>
                  )
                )}
              </span>
            );
          }

          // IMPORTANT: only for verses that START with "SP",
          // keep verse number pinned to the left of the first line while text wraps.
          if (startsWithSP) {
            const numberWidth = "2.4em";
            return (
              <span
                key={v.verse}
                className="align-baseline"
                style={{ paddingLeft: numberWidth }}
              >
                <strong
                  className="text-high-light mr-2 text-[12px] md:text-sm align-top inline-block"
                  style={{ width: numberWidth, marginLeft: `-${numberWidth}` }}
                >
                  {v.verse}
                </strong>

                {segments.map((seg, idx) =>
                  seg.kind === "padded" ? (
                    <span
                      key={idx}
                      className={`inline-block ${indentClass} whitespace-pre-wrap text-left`}
                    >
                      {seg.text}
                    </span>
                  ) : (
                    <span key={idx}>{seg.text}</span>
                  )
                )}
              </span>
            );
          }

          // Other marker verses keep the normal inline flow.
          return (
            <span key={v.verse}>
              <strong className="text-high-light mr-2 align-super text-[12px] md:text-sm">
                {v.verse}
              </strong>

              {segments.map((seg, idx) =>
                seg.kind === "padded" ? (
                  <span
                    key={idx}
                    className={`inline-block ${indentClass} whitespace-pre-wrap text-left`}
                  >
                    {seg.text}
                  </span>
                ) : (
                  <span key={idx}>{seg.text}</span>
                )
              )}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="mx-auto py-5 w-[92%] max-w-4xl flex flex-col gap-3">
      <div className="flex flex-col gap-3">


        <div className="flex w-full flex-nowrap items-center justify-between gap-2 rounded-sm border-b-3 px-2 pb-3 md:px-3">

          <label className="flex w-[125px] shrink-0 items-center gap-1 text-xs font-medium text-foreground md:w-44 md:gap-2 md:text-sm">
            Lang
            <div className="relative min-w-0 flex-1">
              <select
                aria-label="Bible language"
                className={`${selectClass} bg-secondary appearance-none pr-6 pl-2 md:pr-8 md:pl-3`}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="urdu">Urdu</option>
                <option value="english">English</option>
                <option value="both">Both</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[10px] md:right-3 md:text-xs">
                ▼
              </div>
            </div>
          </label>
          <div className="bg-background text-foreground font-semibold py-1 flex min-w-0 flex-1 items-center justify-end gap-1 md:gap-2 rounded-md text-xs md:text-xl capitalize">
            <span className="truncate">{chapterData.book}</span>
            <div className="relative min-w-[105px] md:min-w-[180px]">
              <select
                aria-label={`Select chapter for ${chapterData.book}`}
                className={`${selectClass} bg-secondary appearance-none pr-6 pl-2 md:pr-8 md:pl-3`}
                value={String(selectedChapterNumber)}
                onChange={(e) => {
                  const selectedHref = chapterOptions.find(
                    (option) => String(option.number) === e.target.value
                  )?.href;
                  if (selectedHref) router.push(selectedHref);
                }}
              >
                {chapterOptions.map((option) => (
                  <option key={option.number} value={String(option.number)}>
                    Chapter {option.number}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[10px] md:right-3 md:text-xs">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>

      {language === "urdu" && (
        <div>
          {chapterData.sections.urdu.map((section, i) => (
            <div key={i}>
              {section.title && (
                <div className="float-right w-full text-right">
                  <h3 className="text-lg my-2 md:text-2xl border-2 border-foreground py-2 px-2 urdu inline-block font-bold mb-3">
                    {section.title}
                  </h3>
                </div>
              )}

              {renderFormattedVerses({
                verses: getVersesInRange(section.start, section.end),
                field: "urdu",
                isUrdu: true,
              })}
            </div>
          ))}
        </div>
      )}

      {language === "both" && (
        <div>
          <h3 className="text-[11px] md:text-lg font-bold text-center capitalize text-high-light">
            New Revised Standard Version Catholic Edition (NRSVCE)
          </h3>
          <h3 className="text-[11px] text-blue-500 md:text-lg text-center mb-2 ">
            👉{" "}
            <Link
              href="https://www.biblegateway.com/versions/New-Revised-Standard-Version-Catholic-Edition-NRSVCE-Bible/#vinfo"
              className="underline"
            >
              About CRSVCE
            </Link>
          </h3>

          {orderedVerseNumbers.map((verseNumber) => {
            const verse = versesByNumber[verseNumber];
            if (!verse) return null;

            const urduSection = urduSectionByStart[verseNumber];
            const englishSection = englishSectionByStart[verseNumber];

            return (
              <div key={verseNumber}>
                {urduSection?.title && (
                  <div className="float-right w-full text-right">
                    <h3 className="text-lg my-2 md:text-2xl border-2 border-foreground py-2 px-2 urdu inline-block font-bold mb-3">
                      {urduSection.title}
                    </h3>
                  </div>
                )}

                {renderFormattedVerses({
                  verses: [verse],
                  field: "urdu",
                  isUrdu: true,
                })}

                {englishSection?.title && (
                  <h3 className="text-lg english font-bold mb-4 mt-2">
                    {englishSection.title}
                  </h3>
                )}

                {renderFormattedVerses({
                  verses: [verse],
                  field: "english",
                  isUrdu: false,
                })}
              </div>
            );
          })}
        </div>
      )}

      {language === "english" && (
        <div className="mt-2">
          <h3 className="text-[11px] md:text-lg font-bold text-center capitalize text-high-light">
            New Revised Standard Version Catholic Edition (NRSVCE)
          </h3>
          <h3 className="text-[11px] text-blue-500 md:text-lg text-center mb-2 ">
            👉{" "}
            <Link
              href="https://www.biblegateway.com/versions/New-Revised-Standard-Version-Catholic-Edition-NRSVCE-Bible/#vinfo"
              className="underline"
            >
              About CRSVCE
            </Link>
          </h3>

          {chapterData.sections.english.map((section, i) => (
            <div key={i}>
              <h3 className="text-lg english font-bold mb-4 mt-2">
                {section.title}
              </h3>

              {renderFormattedVerses({
                verses: getVersesInRange(section.start, section.end),
                field: "english",
                isUrdu: false,
              })}
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-4">
        <button
          type="button"
          onClick={() => previousChapter && router.push(previousChapter.href)}
          disabled={!previousChapter}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={() => nextChapter && router.push(nextChapter.href)}
          disabled={!nextChapter}
          className="rounded-md border border-border px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

