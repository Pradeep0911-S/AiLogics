import WordExtractor from "word-extractor";
import { writeFile } from "node:fs/promises";

async function main() {
  const extractor = new WordExtractor();

  const formats = ["doc", "docx"];

  for (const format of formats) {
    const filePath = `./files/global_sample_resume.${format}`;

    console.log(`Extracting ${format.toUpperCase()}...`);

    const doc = await extractor.extract(filePath);

    const output = {
      fileName: `global_sample_resume.${format}`,
      extractedText: doc.getBody(),
      headers: doc.getHeaders(),
      footers: doc.getFooters(),
      footnotes: doc.getFootnotes(),
      endnotes: doc.getEndnotes(),
      annotations: doc.getAnnotations(),
      textboxes: doc.getTextboxes()
    };

    await writeFile(
      `./output/global_sample_resume_${format}.json`,
      JSON.stringify(output, null, 2),
      "utf-8"
    );

    console.log(`${format.toUpperCase()} extraction successful!`);
    console.log("Characters:", output.extractedText.length);
  }
}

main().catch(console.error);
