
import fs from "node:fs";
import path from "node:path";
import mupdf from "mupdf";

function extractPdf() {
  const filePath = "./files/global_sample_resume.doc";

  let doc: ReturnType<typeof mupdf.Document.openDocument> | undefined;

  try {
    const buffer = fs.readFileSync(filePath);

    doc = mupdf.Document.openDocument(
      buffer,
      "application/pdf"
    );

    const totalPages = doc.countPages();
    const pages = [];

    for (let i = 0; i < totalPages; i++) {
      const page = doc.loadPage(i);

      try {
        const structuredText = page
          .toStructuredText("preserve-whitespace")
          .asJSON();

        const structuredData = JSON.parse(structuredText);

        const pageText = structuredData.blocks
          .filter((block: any) => block.type === "text")
          .flatMap((block: any) =>
            block.lines.map((line: any) => line.text)
          )
          .join("\n");

        pages.push({
          pageNumber: i + 1,
          extractedText: pageText,
          structuredText: structuredData
        });
      } finally {
        page.destroy();
      }
    }

    const fullText = pages
      .map(page => page.extractedText)
      .join("\n");

    const output = {
      fileName: path.basename(filePath),
      documentType: "pdf",
      metadata: {
        totalPages,
        format: doc.getMetaData("format")
      },
      pages,
      fullText,
      totalCharacters: fullText.length
    };

    fs.mkdirSync("./output", { recursive: true });

    fs.writeFileSync(
      "./output/parsed-resume-odt.json",
      JSON.stringify(output, null, 2),
      "utf-8"
    );

    console.log("PDF extraction successful!");
    console.log("Total pages:", totalPages);
    console.log("Total characters:", fullText.length);
    console.log("JSON saved at: ./output/parsed-resume-pdf.json");

  } catch (error) {
    console.error("PDF extraction failed:", error);
  } finally {
    doc?.destroy();
  }
}

extractPdf();
