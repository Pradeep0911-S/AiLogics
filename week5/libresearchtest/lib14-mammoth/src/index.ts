
import mammoth from "mammoth";
import { writeFile } from "node:fs/promises";

async function main() {
  const filePath = "./files/global_sample_resume.doc";

  // Extract plain text
  const textResult = await mammoth.extractRawText({
    path: filePath
  });

  // Convert document into HTML
  const htmlResult = await mammoth.convertToHtml({
    path: filePath
  });

  // Prepare JSON output
  const output = {
    fileName: "global_sample_resume.doc",
    extractedText: textResult.value,
    extractedHtml: htmlResult.value,
    textMessages: textResult.messages,
    htmlMessages: htmlResult.messages
  };

  await writeFile(
    "./output/global_sample_resume_doc.json",
    JSON.stringify(output, null, 2),
    "utf-8"
  );

  // Save HTML separately
  await writeFile(
    "./output/global_sample_resume_doc.html",
    htmlResult.value,
    "utf-8"
  );

  console.log("DOCX extraction successful!");
  console.log("Text characters:", textResult.value.length);
  console.log("HTML characters:", htmlResult.value.length);
  console.log("Text messages:", textResult.messages.length);
  console.log("HTML messages:", htmlResult.messages.length);
  console.log("Output files saved successfully.");
}

main().catch(console.error);
