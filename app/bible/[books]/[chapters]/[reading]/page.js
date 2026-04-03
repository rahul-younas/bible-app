import ComingSoon from "@/components/ComingSoon";

export default async function ChapterPage({ params }) {
  const { books, chapters, reading } = await params;

  let data;

  try {
    data = await import(`@/data/${books}/${chapters}/${reading}.json`);
  } catch (error) {
    return <ComingSoon />;
  }

  const chapterData = data.default;

  const getVersesInRange = (start, end) => {
    return chapterData.verses.filter(
      (v) => v.verse >= start && v.verse <= end
    );
  };

  return (
    <div className="mx-auto py-5 w-[90%] max-w-4xl flex flex-col gap-3">
      <h1 className="text-lg bg-white text-black md:text-2xl font-bold w-3/4 mx-auto rounded-md text-center mb-2 capitalize">
        {chapterData.book} - Chapter {chapterData.chapter}
      </h1>

      {/* Urdu */}
      <div>
        {chapterData.sections.urdu.map((section, i) => (
          <div key={i}>
            <h3 className="text-xl urdu underline font-bold text-right mb-3">
              {section.title}
            </h3>

            <p className="urdu text-lg md:text-xl whitespace-pre-wrap leading-snug text-justify">
              {getVersesInRange(section.start, section.end).map((v) => (
                <span key={v.verse}>
                  <strong className="text-cyan-500 ml-2">{v.verse}.</strong>
                  {v.urdu}{" "}
                </span>
              ))}
            </p>
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

            <p className="leading-snug text-md whitespace-pre-wrap md:text-lg text-justify">
              {getVersesInRange(section.start, section.end).map((v) => (
                <span key={v.verse}>
                  <strong className="text-cyan-500 mr-2">{v.verse}.</strong>
                  {v.english}{" "}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}