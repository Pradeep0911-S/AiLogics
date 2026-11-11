const ResumeParser = require('easy-resume-parser');

// From file
const resume = new ResumeParser("./files/global_sample_resume.pdf");


//Convert to JSON Object
  resume.parseToJSON()
  .then(data => {
    console.log('Yay! ', data);
  })
  .catch(error => {
    console.error(error);
  });

//Save to JSON File
resume.parseToFile('./output') //output subdirectory
  .then(file => {
    console.log('Yay! ', file);
  })
  .catch(error => {
    console.error(error);
  });