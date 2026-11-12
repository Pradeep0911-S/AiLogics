
import { parseResumeFromPdf } from
  "./node_modules/@prolaxu/open-resume-pdf-parser/dist/index.mjs";
import fs from "node:fs";
import path from "node:path";

async function main() {
  try {
    const data = await parseResumeFromPdf(
      "./files/global_sample_resume.pdf"
    );

    const outputDir = "./output";

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(
      outputDir,
      "parsed-resume2.json"
    );

    fs.writeFileSync(
      outputPath,
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    console.log("Resume parsing successful!");
    console.log("JSON saved at:", outputPath);

  } catch (error) {
    console.error("Resume parsing failed:", error);
  }
}

main();
