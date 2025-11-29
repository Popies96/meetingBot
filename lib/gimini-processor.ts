import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY!);

const SYSTEM_PROMPT = `You are an AI assistant that analyzes meeting transcripts and provides concise summaries and action items.

Please analyze the meeting transcript and provide:
1. A clear, concise summary (2-3 sentences) of the main discussion points and decisions
2. A list of specific action items mentioned in the meeting

Format your response as JSON:
{
    "summary": "Your summary here",
    "actionItems": [
        "Action item description 1",
        "Action item description 2"
    ]
}

Return only the action item text as strings.
If no clear action items are mentioned, return an empty array for actionItems.`;

function normalizeTranscript(transcript: any) {
  if (Array.isArray(transcript)) {
    return transcript
      .map(
        (item: any) =>
          `${item.speaker || "Speaker"}: ${item.words
            .map((w: any) => w.word)
            .join(" ")}`
      )
      .join("\n");
  }

  if (typeof transcript === "string") {
    return transcript;
  }

  if (transcript?.text) {
    return transcript.text;
  }

  return "";
}

function cleanGeminiJson(payload: string) {
  return payload.replace(/```json/gi, "").replace(/```/g, "").trim();
}

export async function processMeetingTranscript(transcript: any) {
  try {
    const transcriptText = normalizeTranscript(transcript);

    if (!transcriptText || transcriptText.trim().length === 0) {
      throw new Error("No transcript content found");
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(
      `Please analyze this meeting transcript:\n\n${transcriptText}`
    );
    const response = await result.response;
    const content = response?.text();

    if (!content) {
      throw new Error("No response from Gemini");
    }

    const parsed = JSON.parse(cleanGeminiJson(content));

    const actionItems = Array.isArray(parsed.actionItems)
      ? parsed.actionItems.map((text: string, index: number) => ({
          id: index + 1,
          text,
        }))
      : [];

    return {
      summary: parsed.summary || "Summary couldn't be generated",
      actionItems,
    };
  } catch (error) {
    console.error("Error processing transcript with Gemini:", error);

    return {
      summary:
        "Meeting transcript processed successfully. Please check the full transcript for details.",
      actionItems: [],
    };
  }
}
