import ComingSoon from "@/components/ComingSoon";

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

  const renderFormattedVerses = ({
  verses,
  field,
  isUrdu = false,
}) => {
  let inPaddingBlock = false;

  return (
    <div
      dir={isUrdu ? "rtl" : "ltr"}
      className={`leading-snug whitespace-pre-wrap ${
        isUrdu
          ? "urdu text-lg md:text-xl text-right"
          : "english text-sm md:text-lg text-justify"
      }`}
    >
      {verses.map((v) => {
        const text = v[field];

        // =========================
        // URDU: STARTS WITH SP (FIXED)
        // =========================
        if (text.startsWith("SP")) {
          const afterSP = text.slice(2);
          const epIndex = afterSP.indexOf("EP");

          const paddedPart =
            epIndex === -1
              ? afterSP
              : afterSP.slice(0, epIndex);

          const afterEP =
            epIndex === -1
              ? ""
              : afterSP.slice(epIndex + 2);

          inPaddingBlock = epIndex === -1;

          // 🔴 URDU FIXED LAYOUT
          if (isUrdu) {
            return (
              <div
                key={v.verse}
                className="flex items-start"
              >
                {/* Number at extreme right */}
                <strong className="text-cyan-500 shrink-0">
                  {v.verse}.
                </strong>

                {/* Space between number & text */}
                <div className="w-3 md:w-4" />

                {/* Padded text */}
                <div className="pr-5 md:pr-10 text-right flex-1 whitespace-pre-wrap">
                  {paddedPart}
                  {afterEP}
                  <span className="mr-2 inline">O̲</span>
                </div>
              </div>
            );
          }

          // 🟢 ENGLISH (UNCHANGED)
          return (
            <span key={v.verse}>
              <span className="flex items-start">
                <strong className="text-cyan-500 mr-3 shrink-0 text-sm align-super">
                  {v.verse}.
                </strong>

                <span className="block whitespace-pre-wrap pl-5 md:pl-10 text-left">
                  {paddedPart}
                </span>
              </span>

              {afterEP && <span>{afterEP}</span>}
            </span>
          );
        }

        // =========================
        // CONTINUING PADDING
        // =========================
        if (inPaddingBlock) {
          const epIndex = text.indexOf("EP");

          const paddedPart =
            epIndex === -1
              ? text
              : text.slice(0, epIndex);

          const afterEP =
            epIndex === -1
              ? ""
              : text.slice(epIndex + 2);

          inPaddingBlock = epIndex === -1;

          // 🔴 URDU FIX
          if (isUrdu) {
            return (
              <div
                key={v.verse}
                className="pr-5 md:pr-10 text-right whitespace-pre-wrap"
              >
                <strong className="text-cyan-500 ml-2">
                  {v.verse}.
                </strong>

                {paddedPart}
                {afterEP}

                <span className="mr-2 inline">O̲</span>
              </div>
            );
          }

          // 🟢 ENGLISH (UNCHANGED)
          return (
            <span key={v.verse}>
              <div className="pl-5 md:pl-10 text-left whitespace-pre-wrap">
                <strong className="text-cyan-500 mr-2">
                  {v.verse}.
                </strong>
                {paddedPart}
              </div>

              {afterEP && <span>{afterEP}</span>}
            </span>
          );
        }

        // =========================
        // NORMAL VERSE
        // =========================
        if (isUrdu) {
          return (
            <span key={v.verse} dir="rtl">
              <strong className="text-cyan-500 ml-2 align-super text-sm md:text-lg">
                {v.verse}.
              </strong>

              {text}

              <span className="mr-2 inline">O̲</span>
            </span>
          );
        }

        // 🟢 ENGLISH (UNCHANGED)
        return (
          <span key={v.verse}>
            <strong className="text-cyan-500 mr-2 align-super text-[12px] md:text-sm">
              {v.verse}.
            </strong>
            {text}
          </span>
        );
      })}
    </div>
  );
};

  return (
    <div className="mx-auto py-5 w-[92%] max-w-4xl flex flex-col gap-3">
      <h1 className="text-lg bg-white text-black md:text-2xl font-bold w-3/4 mx-auto rounded-md text-center mb-2 capitalize">
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
        <h5 className="text-[10px] md:text-lg font-bold text-center mb-2 capitalize text-cyan-500">
          New Revised Standard Version Catholic Edition (NRSVCE)
        </h5>

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