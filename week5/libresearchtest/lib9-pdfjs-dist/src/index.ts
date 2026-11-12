import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import fs from "node:fs";
import path from "node:path";

async function extractPdf() {
  const filePath = "./files/global_sample_resume.odt";

  try {
    const data = new Uint8Array(fs.readFileSync(filePath));
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    const pages = [];

    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const pageText = content.items
        .filter((item) => "str" in item)
        .map((item) => ("str" in item ? item.str : ""))
        .join(" ");

      pages.push({
        pageNumber,
        extractedText: pageText
      });
    }

    const fullText = pages
      .map((page) => page.extractedText)
      .join("\n");

    const output = {
      fileName: path.basename(filePath),
      documentType: "pdf",
      metadata: {
        totalPages: pdf.numPages
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
    console.log("Total pages:", pdf.numPages);
    console.log("Total characters:", fullText.length);
    console.log("JSON saved at: ./output/parsed-resume-pdf.json");
  } catch (error) {
    console.error("PDF extraction failed:", error);
  }
}

extractPdf();