
const ResumeParser = require("simple-resume-parser");

const resume = new ResumeParser(
  "./files/global_sample_resume.rtf"
);

// Save parsed resume as JSON in the output folder
resume.parseToFile("./output")
  .then(file => {
    console.log("Resume parsing successful!");
    console.log("JSON file saved at:", file);
  })
  .catch(error => {
    console.error("Resume parsing failed:", error);
  });
