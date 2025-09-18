import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY!);

export async function createEmbedding(text: string) {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  return result.embedding;
}

export async function createManyEmbeddings(texts: string[]) {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const results = await Promise.all(
    texts.map((text) => model.embedContent(text))
  );
  return results.map((result) => result.embedding);
}

export async function chatWithAI(systemPrompt: string, userQuestion: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const chat = model.startChat();

  // First, send the system prompt
  await chat.sendMessage(systemPrompt);

  // Then send the user question and get response
  const result = await chat.sendMessage(userQuestion);
  const response = await result.response;

  return response.text() || "sorry, I could not generate a response.";
}
