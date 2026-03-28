import ComingSoon from "@/components/ComingSoon";

export default async function ChapterPage({ params }) {
  const { books, chapters, reading } = await params;

  let data;

  try {
    data = await import(`@/data/${books}/${chapters}/${reading}.json`);
  } catch (error) {
    return <ComingSoon/>;
  }

  const chapterData = data.default;

  const getVersesInRange = (start, end) => {
    return chapterData.verses.filter(
      (v) => v.verse >= start && v.verse <= end
    );
  };

  return (
    <div className="mx-auto py-5 w-[90%] max-w-4xl flex flex-col gap-6">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-6 capitalize">
        {chapterData.book} - Chapter {chapterData.chapter}
      </h1>

      {/* Urdu */}
      <div>
        {chapterData.sections.map((section, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-xl urdu underline font-bold text-right mb-2">
              {section.title_urdu}
            </h3>

            <p className="urdu text-xl leading-snug text-justify">
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

      {/* English */}
      <div>
        {chapterData.sections.map((section, i) => (
          <div key={i} className="mb-6">
            <h3 className="text-xl english underline font-bold mb-2">
              {section.title_english}
            </h3>

            <p className="leading-snug text-lg text-justify">
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