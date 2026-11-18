
import { OfficeParser } from "officeparser";
import fs from "node:fs/promises";
import path from "node:path";

async function main(): Promise<void> {
  const filePath = "../files/twopartswithemojis/resume2colimg.pdf";

  // Create output folder in the project root.
  const outputDir = path.resolve(process.cwd(), "output");

  try {
    // Check that the input file exists.
    await fs.access(filePath);

    // Create output folder if it doesn't exist.
    await fs.mkdir(outputDir, { recursive: true });

    console.log("Starting resume extraction...");
    console.log("File:", filePath);

    const ast = await OfficeParser.parseOffice(filePath, {
      extractAttachments: true,
      ocr: true,
      ocrConfig: {
        language: "eng",
      },
    });

    // Extract regular document text.
    const result = await ast.to("text");
    const extractedText = result.value;

    const fileName = path.basename(filePath);

    // Save extracted text inside output folder.
    const outputPath = path.join(
      outputDir,
      `${fileName}_extracted.txt`
    );

    await fs.writeFile(outputPath, extractedText, "utf-8");

    console.log("\n========== EXTRACTED TEXT ==========\n");
    console.log(extractedText);
    console.log("\nText saved to:", outputPath);

    // Get image attachments.
    const imageAttachments =
      ast.attachments?.filter((attachment) =>
        attachment.mimeType?.startsWith("image/")
      ) ?? [];

    console.log("\n========== IMAGE OCR RESULTS ==========\n");

    const ocrResults = imageAttachments
      .map((attachment, index) => {
        const ocrText = attachment.ocrText?.trim() ?? "";

        console.log(`Image ${index + 1}: ${attachment.name}`);
        console.log(ocrText || "No OCR text found.");

        return ocrText
          ? `Image ${index + 1}: ${attachment.name}\n${ocrText}`
          : "";
      })
      .filter(Boolean);

    // Save OCR results inside output folder.
    const ocrOutputPath = path.join(
      outputDir,
      `${fileName}_ocr.txt`
    );

    await fs.writeFile(
      ocrOutputPath,
      ocrResults.join("\n\n"),
      "utf-8"
    );

    console.log("\nOCR results saved to:", ocrOutputPath);

    // Display parser warnings.
    if (ast.warnings?.length) {
      console.log("\n========== PARSER WARNINGS ==========\n");
      console.dir(ast.warnings, { depth: null });
    }

    console.log("\nExtraction completed.");

  } catch (error) {
    console.error("Resume extraction failed:");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }
  }
}

main();
