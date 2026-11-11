
const { ResumeParser } = require("pdf-resume-parser").ResumeParser;
const fs = require("fs");
const path = require("path");

const parser = new ResumeParser();

async function main() {
  try {
    const data = await parser.parseResume(
      "./files/global_sample_resume.pdf"
    );

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
      JSON.stringify(data, null, 2),
      "utf-8"
    );

    console.log("Resume parsing successful!");
    console.log("JSON file saved at:", outputPath);

  } catch (error) {
    console.error("Resume parsing failed:", error);
  }
}

main();
