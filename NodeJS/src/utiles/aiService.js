const OpenAI = require("openai");
const dotenv = require("dotenv");

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const generateResumeFromJD = async (resumeText, jobDescription) => {
  try {
    const prompt = `Modify the following resume based on the given job description to make it a perfect fit:

    Resume:
    ${resumeText}

    Job Description:
    ${jobDescription}

    Optimized Resume:`;

    const response = await openai.completions.create({
      model: "text-davinci-003",
      prompt,
      max_tokens: 800
    });

    return response.choices[0].text.trim();
  } catch (error) {
    console.error("AI Error:", error);
    throw new Error("Failed to generate optimized resume");
  }
};

module.exports = { generateResumeFromJD };
