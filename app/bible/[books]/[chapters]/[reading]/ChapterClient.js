"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const selectClass =
  "min-h-10 w-full min-w-0 rounded-md border border-border bg-background px- py-2 text-sm text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring";

export default function ChapterClient({ chapterData }) {
  const [language, setLanguage] = useState("urdu");

  const getVersesInRange = useMemo(() => {
    return (start, end) =>
      chapterData.verses.filter((v) => v.verse >= start && v.verse <= end);
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
        

        <div className="flex w-full rounded-sm items-end justify-between border-b-3 px-3 pb-3">
        
          <label className="flex w-44 shrink-0 items-center gap-2 text-sm font-medium text-foreground">
            Lang
            <div className="relative">
              <select
                aria-label="Bible language"
                className={`${selectClass} bg-secondary appearance-none pr-8 pl-3`}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="urdu">Urdu</option>
                <option value="english">English</option>
                <option value="both">Both</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                ▼
              </div>
            </div>
          </label>
          <h4 className="text-sm bg-background text-foreground md:text-xl font-semibold py-1 w-3/4 mx-auto rounded-md text-center mb-2 capitalize">
          {chapterData.book} - Chap # {chapterData.chapter}
        </h4>
        </div>
      </div>

      {(language === "urdu" || language === "both") && (
        <div>
          {chapterData.sections.urdu.map((section, i) => (
            <div key={i}>
              <h3 className="text-lg my-2 md:text-2xl urdu underline font-bold text-right mb-3">
                {section.title}
              </h3>

              {renderFormattedVerses({
                verses: getVersesInRange(section.start, section.end),
                field: "urdu",
                isUrdu: true,
              })}
            </div>
          ))}
        </div>
      )}

      {language === "both" && <div className="w-full h-1 bg-gray-500"></div>}

      {(language === "english" || language === "both") && (
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
    </div>
  );
}

