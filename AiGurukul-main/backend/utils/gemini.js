const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const MODEL_NAME = "gemini-2.5-flash-lite";

/**
 * Call Gemini with a system prompt + user message.
 * Returns the raw text response.
 */
async function callGemini(systemPrompt, userMessage, maxTokens = 1200) {
  const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    systemInstruction: systemPrompt 
  });
  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: userMessage }] }],
    generationConfig: { maxOutputTokens: maxTokens },
  });
  return result.response.text();
}

/**
 * Call Gemini and parse the response as JSON.
 * Strips markdown fences if present.
 */
async function callGeminiJSON(systemPrompt, userMessage, maxTokens = 1200) {
  const raw = await callGemini(systemPrompt, userMessage, maxTokens);
  const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("[Gemini JSON parse error]", cleaned.slice(0, 200));
    throw new Error("Gemini returned invalid JSON. Please retry.");
  }
}

/**
 * Call Gemini with multi-turn conversation history.
 * messages = [{ role: 'user'|'assistant', content: string }]
 */
async function callGeminiChat(systemPrompt, messages, maxTokens = 400) {
  const model = genAI.getGenerativeModel({ 
    model: MODEL_NAME,
    systemInstruction: systemPrompt 
  });
  
  const chat = model.startChat({
    history: messages.slice(0, -1).map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    })),
    generationConfig: { maxOutputTokens: maxTokens },
  });

  const lastMessage = messages[messages.length - 1].content;
  const result = await chat.sendMessage(lastMessage);
  return result.response.text();
}

module.exports = { callGemini, callGeminiJSON, callGeminiChat };
