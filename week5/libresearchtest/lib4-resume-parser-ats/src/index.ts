
import { parseResumeAsync } from "resume-parser-ats";
import fs from "node:fs";
import path from "node:path";

async function main() {
  const parsed = await parseResumeAsync({
    filePath: "./files/global_sample_resume.pdf"
  });

  const outputDir = "./output";

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(
    outputDir,
    "parsed-resume.json"
  );

  fs.writeFileSync(
    outputPath,
    JSON.stringify(parsed, null, 2),
    "utf-8"
  );

  console.log("Resume parsing completed!");
  console.log("Success:", parsed.success);
  console.log("JSON saved at:", outputPath);
}

main().catch((error) => {
  console.error("Resume parsing failed:", error);
});
