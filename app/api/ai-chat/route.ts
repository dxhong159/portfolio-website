import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

// Initialize the Google Generative AI with API key
const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey as string);

// Simple in-memory cache for responses (in a production app, use Redis or similar)
const responseCache = new Map<
  string,
  { response: string; timestamp: number }
>();
const CACHE_TTL = 3600000; // 1 hour in milliseconds

// Configuration for the AI model - adjusted for more concise responses
const generationConfig = {
  temperature: 0.7, // Lower temperature for more focused answers
  topP: 0.8,
  topK: 40,
  maxOutputTokens: 800, // Reduced token count for shorter answers
};

// Use available model (Gemini 1.0 Pro is the most stable model for general use)
const MODEL_NAME = "gemini-2.0-flash-lite";

// Generate a cache key from the message and history
function generateCacheKey(
  message: string,
  history: any[],
  language: string
): string {
  // Create a simple hash of the message, recent history, and language
  const recentHistory = history.slice(-3);
  const historyStr = recentHistory
    .map((msg) => `${msg.role}:${msg.content}`)
    .join("|");
  return `${message}::${historyStr}::${language}`;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { message, history = [], language = "en" } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Check cache first, including language in the cache key
    const cacheKey = generateCacheKey(message, history, language);
    const cachedResponse = responseCache.get(cacheKey);

    if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_TTL) {
      console.log("Using cached response");
      return NextResponse.json(
        { response: cachedResponse.response },
        { status: 200 }
      );
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({
      model: MODEL_NAME,
      generationConfig,
    });

    // Extract key information from history for context
    const recentUserQueries = history
      .filter((msg) => msg.role === "user")
      .slice(-2)
      .map((msg) => msg.content);

    // Prepare language-specific instructions for concise responses
    const languageInstructions =
      language === "vi"
        ? "Trả lời bằng tiếng Việt, ngắn gọn và đi thẳng vào vấn đề. Tập trung vào những điểm chính, tránh lan man."
        : "Answer in English, be concise and to the point. Focus on key information, avoid tangents.";

    // Markdown formatting instructions
    const markdownInstructions =
      language === "vi"
        ? `Định dạng gọn gàng bằng Markdown. Tối đa 3-5 câu cho mỗi câu trả lời.`
        : `Format cleanly with Markdown. Maximum 3-5 sentences per answer.`;

    // Prepare a concise prompt focused on Hong's information
    const prompt = `Bạn là trợ lý thông tin về Hong Dinh - một full-stack developer. Hãy trả lời câu hỏi sau: "${message}"

Thông tin về Hong: 
- Chuyên môn: React, Next.js, Flutter, ASP.NET, Firebase
- Dự án: PinkAI Chatbot, Vinled Website, Phone Sales Management, IMEI Management, E-commerce
- Quan trọng: ${languageInstructions}

${markdownInstructions}

Chỉ trả lời ngắn gọn với thông tin liên quan trực tiếp đến câu hỏi. Nếu câu hỏi không liên quan đến Hong, trả lời là bạn chỉ có thông tin về Hong Dinh.`;

    // Use a simpler approach with a single API call
    let retries = 2;
    let result;

    while (retries >= 0) {
      try {
        // Try a simpler approach first with text-only generation
        result = await model.generateContent(prompt);
        break; // If successful, exit the loop
      } catch (error: any) {
        console.error("API error details:", error);

        if (retries === 0) {
          throw error; // If we're out of retries, rethrow
        }

        // For any error, retry after a delay
        console.log(
          `Error occurred. Retrying in 2 seconds... (${retries} retries left)`
        );
        // Wait before retrying
        await new Promise((resolve) => setTimeout(resolve, 2000));
        retries--;
      }
    }

    if (!result) {
      throw new Error("Failed to get a response after retries");
    }

    // Get the response text
    let response = result.response.text();

    // Further process the response to ensure it's not too long
    response = ensureConciseResponse(response, language);

    // Cache the successful response
    responseCache.set(cacheKey, {
      response,
      timestamp: Date.now(),
    });

    // Return the response
    return NextResponse.json({ response }, { status: 200 });
  } catch (error: any) {
    console.error("Error in AI chat API:", error);

    // Return a friendly error message to the user with markdown formatting in the appropriate language
    const errorMessage =
      language === "vi"
        ? `❌ **Lỗi kết nối.** Vui lòng thử lại sau.`
        : `❌ **Connection error.** Please try again later.`;

    return NextResponse.json(
      { response: errorMessage },
      { status: 200 } // Return 200 even on error to avoid breaking the UI
    );
  }
}

// Helper function to ensure concise responses
function ensureConciseResponse(text: string, language: string): string {
  // If response is already short, return it as is
  if (text.length < 500) return text;

  // Split into paragraphs
  const paragraphs = text.split("\n\n");

  // Keep only the most important paragraphs (first 2-3)
  const reducedText = paragraphs
    .slice(0, paragraphs.length > 3 ? 2 : 3)
    .join("\n\n");

  // Add a note that response was trimmed if we actually trimmed it
  if (reducedText.length < text.length) {
    return (
      reducedText +
      (language === "vi"
        ? "\n\n*(Trả lời được rút gọn để tập trung vào thông tin chính)*"
        : "\n\n*(Response trimmed to focus on key information)*")
    );
  }

  return reducedText;
}
