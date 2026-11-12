
import { PdfReader } from "pdfreader";
import fs from "node:fs";
import path from "node:path";

const filePath = "./files/global_sample_resume.pdf";

const reader = new PdfReader();

const pages: {
  pageNumber: number;
  width: number | undefined;
  height: number | undefined;
  items: {
    text: string;
    x: number;
    y: number;
    width: number;
  }[];
}[] = [];

let currentPage: typeof pages[number] | null = null;

reader.parseFileItems(filePath, (error, item) => {
  if (error) {
    console.error("PDF extraction failed:", error);
    return;
  }

  if (!item) {
    const fullText = pages
      .map(page => page.items.map(entry => entry.text).join(" "))
      .join("\n");

    const output = {
      fileName: path.basename(filePath),
      documentType: "pdf",
      totalPages: pages.length,
      pages,
      fullText,
      totalCharacters: fullText.length
    };

    fs.writeFileSync(
      "./output/parsed-resume-pdf.json",
      JSON.stringify(output, null, 2),
      "utf-8"
    );

    console.log("PDF extraction successful!");
    console.log("JSON saved in output folder.");
    console.log("Total pages:", pages.length);
    console.log("Total characters:", fullText.length);

    return;
  }

  if (item.page) {
    currentPage = {
      pageNumber: item.page,
      width: item.width,
      height: item.height,
      items: []
    };

    pages.push(currentPage);
  }

  if ("text" in item && item.text && currentPage) {
    currentPage.items.push({
      text: item.text,
      x: item.x,
      y: item.y,
      width: item.w
    });
  }
});
