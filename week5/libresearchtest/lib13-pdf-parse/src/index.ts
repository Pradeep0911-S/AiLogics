import { readFile, writeFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";

async function main() {
  const filePath = "./files/global_sample_resume.pdf";

  const buffer = await readFile(filePath);
  const parser = new PDFParse({ data: buffer });

  try {
    const result = await parser.getText();

    const output = {
      fileName: "global_sample_resume.pdf",
      totalPages: result.total,
      extractedText: result.text
    };

    await writeFile(
      "./output/global_sample_resume.json",
      JSON.stringify(output, null, 2),
      "utf-8"
    );

    console.log("PDF extraction successful!");
    console.log("Total pages:", result.total);
    console.log("JSON saved in output folder.");
  } finally {
    await parser.destroy();
  }
}

main().catch(console.error);
