// AiModel.js - Move this to /configs or /lib directory
// Mark this file as server-only
// "use server"; // Uncomment if using App Router server components/actions

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// Don't use process.env.NEXT_PUBLIC_ for API keys - they'll be exposed in client
// Store this in a server-only environment variable like GEMINI_API_KEY
const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// Chat model configuration
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-pro-exp-03-25",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "text/plain",
};

const codeGenerationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 65536,
  responseModalities: [],
  responseMimeType: "application/json",
};

// Create and export the chat session
export const chatSession = model.startChat({
  generationConfig,
  history: [],
});

// Create and export the code generation session
// Fix the typo: startChart -> startChat
// export const chatSession = () => {
//   return model.startChat({
//     generationConfig: codeGenerationConfig,
//     history: [],
//   });
// };

// Helper for sending messages (for API routes)
export const sendChatMessage = async (message) => {
  const session = createChatSession();
  const result = await session.sendMessage(message);
  return result.response.text();
};

export const sendCodeMessage = async (message) => {
  const session = createCodeSession();
  const result = await session.sendMessage(message);
  return result.response;
};

export const GenAiCode = model.startChat({
  generationConfig: codeGenerationConfig,
  history: [],
});
// The file system operations should only be in API routes
// and never in client-side or shared code
