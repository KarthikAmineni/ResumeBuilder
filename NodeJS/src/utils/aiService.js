import OpenAI from 'openai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables with explicit path
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not set in environment variables');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const optimizeResume = async (resumeText, jobDescription) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume optimizer. Your task is to modify the provided resume to better match the job description while maintaining truthfulness and professional standards."
        },
        {
          role: "user",
          content: `Please optimize this resume:\n${resumeText}\n\nFor this job description:\n${jobDescription}`
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to optimize resume: ' + error.message);
  }
};

export const getAIFeedback = async (resumeText) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an expert resume reviewer. Provide constructive feedback on the resume."
        },
        {
          role: "user",
          content: `Please review this resume and provide feedback:\n${resumeText}`
        }
      ],
      temperature: 0.7,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    throw new Error('Failed to get AI feedback: ' + error.message);
  }
};