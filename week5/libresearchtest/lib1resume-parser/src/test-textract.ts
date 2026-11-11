import textract from "textract";

const pdfPath = "./files/global_sample_resume.pdf";

textract.fromFileWithPath(pdfPath, (error, text) => {
  if (error) {
    console.error("PDF extraction failed:", error);
    return;
  }

  console.log("PDF text extraction successful!");
  console.log("Extracted text:\n");
  console.log(text);
});
