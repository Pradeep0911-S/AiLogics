
import ResumeParser from "resume-parser";
import path from "path";
import fs from "fs";

const files = [
  "global_sample_resume.pdf",
  "global_sample_resume.doc",
  "global_sample_resume.docx",
  "global_sample_resume.odt",
  "global_sample_resume.rtf"
];

const outputDir = "./output";

async function testResumeFormats() {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const file of files) {
    const inputFile = path.join("./files", file);

    console.log("\n==================================");
    console.log("Testing:", file);
    console.log("==================================");

    if (!fs.existsSync(inputFile)) {
      console.log("FILE NOT FOUND:", inputFile);
      continue;
    }

    try {
      const result = await ResumeParser.parseResume(
        inputFile,
        outputDir
      );

      console.log("SUCCESS:", file);
      console.log("Parser result:", result);
    } catch (error) {
      console.error("FAILED:", file);
      console.error(error);
    }
  }
}

testResumeFormats();
