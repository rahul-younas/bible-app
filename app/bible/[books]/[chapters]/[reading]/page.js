import ComingSoon from "@/components/ComingSoon";
import Link from "next/link";

export default async function ChapterPage({ params }) {
  const { books, chapters, reading } = await params;

  let data;

  try {
    data = await import(`@/data/${books}/${chapters}/${reading}.json`);
  } catch {
    return <ComingSoon />;
  }

  const chapterData = data.default;

  const getVersesInRange = (start, end) =>
    chapterData.verses.filter(
      (v) => v.verse >= start && v.verse <= end
    );

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
                    style={{ width: numberWidth, marginRight: `-${numberWidth}` }}
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
      <h1 className="text-lg bg-background text-foreground md:text-2xl font-bold w-3/4 mx-auto rounded-md text-center mb-2 capitalize">
        {chapterData.book} - Chapter {chapterData.chapter}
      </h1>

      {/* Urdu */}
      <div>
        {chapterData.sections.urdu.map((section, i) => (
          <div key={i}>
            <h3 className="text-lg md:text-2xl urdu underline font-bold text-right mb-3">
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

      <div className="w-full h-1 bg-gray-500"></div>

      {/* English */}
      <div className="mt-2">
        <h3 className="text-[11px] md:text-lg font-bold text-center capitalize text-high-light">
          New Revised Standard Version Catholic Edition (NRSVCE)
        </h3>
        <h3 className="text-[11px] text-blue-500 md:text-lg text-center mb-2 ">👉 <Link href='https://www.biblegateway.com/versions/New-Revised-Standard-Version-Catholic-Edition-NRSVCE-Bible/#vinfo' className="underline">About CRSVCE</Link></h3>

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
    </div>
  );
}