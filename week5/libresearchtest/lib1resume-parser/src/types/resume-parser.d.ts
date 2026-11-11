declare module "resume-parser" {
  interface ResumeParserAPI {
    parseResume(
      inputFile: string,
      outputDir: string
    ): Promise<string>;

    parseResumeUrl(url: string): Promise<string>;
  }

  const ResumeParser: ResumeParserAPI;

  export default ResumeParser;
}