import ComingSoon from "@/components/ComingSoon";
import Link from "next/link";
import ChapterClient from "./ChapterClient";

export default async function ChapterPage({ params }) {
  const { books, chapters, reading } = await params;

  let data;

  try {
    data = await import(`@/data/bible/${books}/${chapters}/${reading}.json`);
  } catch {
    return <ComingSoon />;
  }

  const chapterData = data.default;

  return (
    <ChapterClient chapterData={chapterData} />
  );
}