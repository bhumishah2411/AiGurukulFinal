const Anthropic = require("@anthropic-ai/sdk");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * Call Claude with a system prompt + user message.
 * Returns the raw text response.
 */
async function callClaude(systemPrompt, userMessage, maxTokens = 1200) {
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: maxTokens,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
  });
  return response.content[0].text;
}

/**
 * Call Claude and parse the response as JSON.
 * Strips markdown fences if present.
 */
async function callClaudeJSON(systemPrompt, userMessage, maxTokens = 1200) {
  const raw = await callClaude(systemPrompt, userMessage, maxTokens);
  const cleaned = raw.replace(/```json\s*/gi, "").replace(/```\s*/g, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("[Claude JSON parse error]", cleaned.slice(0, 200));
    throw new Error("Claude returned invalid JSON. Please retry.");
  }
}

/**
 * Call Claude with multi-turn conversation history.
 * messages = [{ role: 'user'|'assistant', content: string }]
 */
async function callClaudeChat(systemPrompt, messages, maxTokens = 400) {
  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: maxTokens,
    system: systemPrompt,
    messages,
  });
  return response.content[0].text;
}

module.exports = { callClaude, callClaudeJSON, callClaudeChat };
