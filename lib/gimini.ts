import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY!);
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_AI_KEY!,
});

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRateLimit = error?.status === 429 || error?.message?.includes('429');
      const isLastAttempt = attempt === maxRetries - 1;
      
      if (!isRateLimit || isLastAttempt) {
        throw error;
      }
      
      // Exponential backoff: 1s, 2s, 4s
      const delay = baseDelay * Math.pow(2, attempt);
      console.log(`Rate limit hit, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
      await sleep(delay);
    }
  }
  throw new Error("Max retries exceeded");
}

export async function createEmbedding(text: string) {
  try {
    return await retryWithBackoff(async () => {
      const response = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: text,
        config: {
          outputDimensionality: 1536, // Match existing Pinecone index dimension
        },
      });
      
      // The response.embeddings is an array, we need the first embedding's values
      if (!response.embeddings || response.embeddings.length === 0) {
        throw new Error("No embedding returned from API");
      }
      
      const embedding = response.embeddings[0];
      let embeddingValues: number[];
      
      // The embedding should have a values property
      if (embedding.values && Array.isArray(embedding.values)) {
        embeddingValues = embedding.values;
      } else if (Array.isArray(embedding)) {
        embeddingValues = embedding;
      } else {
        throw new Error(`Unexpected embedding response structure: ${JSON.stringify(embedding).substring(0, 100)}`);
      }
      
      // Validate and truncate to 1536 dimensions if needed
      // Note: gemini-embedding-001 might not support outputDimensionality, so we truncate manually
      if (embeddingValues.length > 1536) {
        console.warn(`Embedding dimension is ${embeddingValues.length}, truncating to 1536`);
        embeddingValues = embeddingValues.slice(0, 1536);
      } else if (embeddingValues.length !== 1536) {
        console.warn(`Embedding dimension is ${embeddingValues.length}, expected 1536`);
      }
      
      return embeddingValues;
    });
  } catch (error: any) {
    console.error("Error creating embedding:", error);
    
    // Check if it's a quota error
    if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('429')) {
      const quotaError = new Error(
        "Embedding quota exceeded. The free tier has limited embedding requests. " +
        "Please upgrade your Google AI plan or check your billing details. " +
        "Visit https://ai.google.dev/gemini-api/docs/rate-limits for more information."
      );
      (quotaError as any).status = 429;
      (quotaError as any).isQuotaError = true;
      throw quotaError;
    }
    
    throw error;
  }
}

export async function createManyEmbeddings(texts: string[]) {
  try {
    // Process in smaller batches to avoid rate limits
    const batchSize = 5;
    const results: number[][] = [];
    
    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      
      const batchResults = await Promise.all(
        batch.map(async (text) => {
          return await retryWithBackoff(async () => {
            const response = await ai.models.embedContent({
              model: 'gemini-embedding-001',
              contents: text,
              config: {
                outputDimensionality: 1536, // Match existing Pinecone index dimension
              },
            });
            
            if (!response.embeddings || response.embeddings.length === 0) {
              throw new Error("No embedding returned from API");
            }
            
            const embedding = response.embeddings[0];
            let embeddingValues: number[];
            
            if (embedding.values && Array.isArray(embedding.values)) {
              embeddingValues = embedding.values;
            } else if (Array.isArray(embedding)) {
              embeddingValues = embedding;
            } else {
              throw new Error(`Unexpected embedding response structure: ${JSON.stringify(embedding).substring(0, 100)}`);
            }
            
            // Validate and truncate to 1536 dimensions if needed
            // Note: gemini-embedding-001 might not support outputDimensionality, so we truncate manually
            if (embeddingValues.length > 1536) {
              console.warn(`Embedding dimension is ${embeddingValues.length}, truncating to 1536`);
              embeddingValues = embeddingValues.slice(0, 1536);
            } else if (embeddingValues.length !== 1536) {
              console.warn(`Embedding dimension is ${embeddingValues.length}, expected 1536`);
            }
            
            return embeddingValues;
          });
        })
      );
      
      results.push(...batchResults);
      
      // Small delay between batches to avoid rate limits
      if (i + batchSize < texts.length) {
        await sleep(200);
      }
    }
    
    return results;
  } catch (error: any) {
    console.error("Error creating many embeddings:", error);
    
    // Check if it's a quota error
    if (error?.status === 429 || error?.message?.includes('quota') || error?.message?.includes('429')) {
      const quotaError = new Error(
        "Embedding quota exceeded. The free tier has limited embedding requests. " +
        "Please upgrade your Google AI plan or check your billing details. " +
        "Visit https://ai.google.dev/gemini-api/docs/rate-limits for more information."
      );
      (quotaError as any).status = 429;
      (quotaError as any).isQuotaError = true;
      throw quotaError;
    }
    
    throw error;
  }
}

export async function chatWithAI(systemPrompt: string, userQuestion: string) {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      systemInstruction: systemPrompt,
    });
    
    const result = await model.generateContent(userQuestion);
    const response = await result.response;

    return response.text() || "sorry, I could not generate a response.";
  } catch (error) {
    console.error("Error in chatWithAI:", error);
    throw error;
  }
}
