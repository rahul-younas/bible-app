import { pdfMap } from "@/lib/pdfMap";

export default async function ChapterPage({ params }) {
  const { books, chapters, reading } = await params;

  const pdfUrl =
    pdfMap?.[books]?.[chapters]?.[reading];

  if (!pdfUrl) {
    return <div>PDF not found</div>;
  }

  return (
    <div style={{ height: "100vh" }}>
      <iframe
        src={pdfUrl}
        width="100%"
        height="100%"
        style={{ border: "none" }}
      />
    </div>
  );
}