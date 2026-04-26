import ComingSoon from "@/components/ComingSoon";
import Link from "next/link";
import ChapterClient from "./ChapterClient";
import { readdir } from "fs/promises";
import path from "path";

export default async function ChapterPage({ params }) {
  const { books, chapters, reading } = await params;

  let data;

  try {
    data = await import(`@/data/bible/${books}/${chapters}/${reading}.json`);
  } catch {
    return <ComingSoon />;
  }

  const chapterData = data.default;
  const currentChapter = Number(reading?.replace("chapter-", ""));
  let chapterOptions = [];

  try {
    const chapterDir = path.join(process.cwd(), "data", "bible", books, chapters);
    const files = await readdir(chapterDir);

    chapterOptions = files
      .map((file) => {
        const match = file.match(/^chapter-(\d+)\.json$/);
        if (!match) return null;
        const chapterNumber = Number(match[1]);
        return {
          number: chapterNumber,
          href: `/bible/${books}/${chapters}/chapter-${chapterNumber}`,
        };
      })
      .filter(Boolean)
      .sort((a, b) => a.number - b.number);
  } catch {
    chapterOptions = [];
  }

  return (
    <ChapterClient
      chapterData={chapterData}
      currentChapter={currentChapter}
      chapterOptions={chapterOptions}
    />
  );
}