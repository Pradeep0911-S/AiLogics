import textract from "textract";
import fs from "node:fs";
import path from "node:path";

const filePath = "./files/global_sample_resume.docx";

textract.fromFileWithPath(filePath, (error, text) => {
  if (error) {
    console.error("Document extraction failed:", error);
    return;
  }

  const output = {
    fileName: path.basename(filePath),
    documentType: path.extname(filePath).slice(1),
    extractedText: text,
    totalCharacters: text?.length ?? 0
  };

  const outputDir = "./output";

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(
    outputDir,
    "parsed-resume-docx.json"
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(output, null, 2),
    "utf-8"
  );

  console.log("Document extraction successful!");
  console.log("JSON saved at:", outputPath);
  console.log("Total characters:", output.totalCharacters);
});
