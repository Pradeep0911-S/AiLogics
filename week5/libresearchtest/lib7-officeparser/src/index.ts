
import { OfficeParser } from "officeparser";
import fs from "node:fs";
import path from "node:path";

async function main() {
  try {
    const filePath = "./files/global_sample_resume.pdf";

    // Parse the document
    const ast = await OfficeParser.parseOffice(filePath);

    const result = await ast.to("chunks", {
  chunksConfig: {
    strategy: "fixed-size",
    chunkSize: 500,
    chunkOverlap: 100
  }
});
    console.log("Total chunks:", result.value.length);
    console.log("First chunk:", JSON.stringify(result.value[0], null, 2));
    const headingCounts: Record<string, number> = {};

for (const chunk of result.value) {
  const heading = chunk.metadata?.closestHeading ?? "Unknown";

  headingCounts[heading] = (headingCounts[heading] || 0) + 1;
}

console.log("Chunks by heading:");
console.log(JSON.stringify(headingCounts, null, 2));
const chunkLengths = result.value.map(
  chunk => chunk.text.length
);

const totalCharacters = chunkLengths.reduce(
  (sum, length) => sum + length,
  0
);

console.log("Minimum chunk size:", Math.min(...chunkLengths));
console.log("Maximum chunk size:", Math.max(...chunkLengths));
console.log(
  "Average chunk size:",
  Math.round(totalCharacters / chunkLengths.length)
);
const sortedChunks = [...result.value].sort(
  (a, b) => a.text.length - b.text.length
);

console.log("\nSmallest 5 chunks:");

for (const chunk of sortedChunks.slice(0, 5)) {
  console.log({
    length: chunk.text.length,
    heading: chunk.metadata?.closestHeading,
    text: chunk.text
  });
}

console.log("\nLargest 5 chunks:");

for (const chunk of sortedChunks.slice(-5).reverse()) {
  console.log({
    length: chunk.text.length,
    heading: chunk.metadata?.closestHeading,
    text: chunk.text
  });
}

    // Prepare JSON output
    const output = {
      fileName: path.basename(filePath),
      documentType: ast.type,
      metadata: ast.metadata,
      extractedText: result.value,
      warnings: ast.warnings
    };

    // Create output directory
    const outputDir = "./output";

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Save JSON file
    const outputPath = path.join(
      outputDir,
      "parsed-resume-fixed-size-chunks-pdf.json"
    );

    fs.writeFileSync(
      outputPath,
      JSON.stringify(output, null, 2),
      "utf-8"
    );

    console.log("Document extraction successful!");
    console.log("JSON saved at:", outputPath);

  } catch (error) {
    console.error("Document extraction failed:", error);
  }
}

main();
