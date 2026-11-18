import WordExtractor from "word-extractor";
import fs from "node:fs/promises";
import path from "node:path";

async function main() {
  const extractor = new WordExtractor();

  const formats = ["doc", "docx"];

  for (const format of formats) {
    const filePath = `../files/testdocument.${format}`;

    console.log(`Extracting ${format.toUpperCase()}...`);

    const doc = await extractor.extract(filePath);
    const extractedText = doc.getBody();

    // const output = {
    //   fileName: `global_sample_resume.${format}`,
    //   extractedText: doc.getBody(),
    //   headers: doc.getHeaders(),
    //   footers: doc.getFooters(),
    //   footnotes: doc.getFootnotes(),
    //   endnotes: doc.getEndnotes(),
    //   annotations: doc.getAnnotations(),
    //   textboxes: doc.getTextboxes()
    // };

    // await writeFile(
    //   `./output/global_sample_resume_${format}.json`,
    //   JSON.stringify(output, null, 2),
    //   "utf-8"
    // );
    // Create the output folder if it doesn't already exist.
const outputDir = path.resolve("output");

await fs.mkdir(outputDir, { recursive: true });

// Keep the original filename and extension.
const outputPath = path.join(
  outputDir,
  `${path.basename(filePath)}_extracted1.txt`
);

// Save extracted text.
await fs.writeFile(outputPath, extractedText, "utf-8");

console.log("Extracted text saved to:", outputPath);

    console.log(`${format.toUpperCase()} extraction successful!`);
    console.log("Characters:", extractedText.length);
  }
}

main().catch(console.error);




// import WordExtractor from "word-extractor";
// import fs from "node:fs/promises";
// import path from "node:path";

// async function main(): Promise<void> {
//   const filePath = path.resolve(
//     "../files/twopartswithemojis/Document 3.docx"
//   );

//   const outputDir = path.resolve("output");

//   console.log("Starting DOCX extraction...");
//   console.log("File path:", filePath);

//   try {
//     // Check whether the file exists.
//     await fs.access(filePath);
//     console.log("1. File exists.");

//     // Read the file as a Buffer.
//     const buffer = await fs.readFile(filePath);

//     console.log("2. File size:", buffer.length, "bytes");

//     // A DOCX file is normally a ZIP-based file.
//     console.log(
//       "3. File signature:",
//       buffer.subarray(0, 4).toString("hex")
//     );

//     if (buffer.subarray(0, 2).toString() !== "PK") {
//       throw new Error(
//         "This does not appear to be a valid DOCX ZIP file. Check the file extension and contents."
//       );
//     }

//     const extractor = new WordExtractor();

//     console.log("4. Starting WordExtractor...");

//     const doc = await Promise.race([
//       extractor.extract(buffer),
//       new Promise<never>((_, reject) =>
//         setTimeout(
//           () => reject(new Error("DOCX extraction timed out after 20 seconds")),
//           20000
//         )
//       ),
//     ]);

//     console.log("5. DOCX extraction successful!");

//     const extractedText = doc.getBody();

//     console.log("6. Extracted characters:", extractedText.length);

//     console.log("\n========== EXTRACTED TEXT ==========\n");
//     console.log(extractedText);

//     await fs.mkdir(outputDir, { recursive: true });

//     const outputPath = path.join(
//       outputDir,
//       `${path.basename(filePath)}_extracted.txt`
//     );

//     await fs.writeFile(outputPath, extractedText, "utf-8");

//     console.log("\nSaved to:", outputPath);
//     console.log("DOCX extraction completed!");

//   } catch (error) {
//     console.error("\nDOCX extraction failed:");

//     if (error instanceof Error) {
//       console.error(error.message);
//       console.error(error.stack);
//     } else {
//       console.error(error);
//     }
//   }
// }

// main();

