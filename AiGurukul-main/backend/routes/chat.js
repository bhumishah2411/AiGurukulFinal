const express = require("express");
const router = express.Router();
const { callGeminiChat } = require("../utils/gemini");
const { buildChatPrompt, buildChatMessages } = require("../prompts/chatContinuation");
const { validateChatRequest } = require("../middleware/validate");

/**
 * POST /api/chat
 * Body: {
 *   persona: 'krishna'|'chanakya'|'guru',
 *   message: string,
 *   history: [{ role: 'user'|'assistant', content: string }],
 *   previousResponseSummary: string   (1–2 sentence summary of wisdom delivered)
 * }
 * Returns: { reply: string }
 *
 * history should be the running conversation — frontend stores it and sends it each time.
 * Max history kept: last 10 messages (5 turns) to stay within context.
 */
router.post("/", validateChatRequest, async (req, res, next) => {
  try {
    const { persona, message, history, previousResponseSummary = "" } = req.body;

    // Keep last 10 messages max to avoid bloating context
    const trimmedHistory = history.slice(-10);

    const systemPrompt = buildChatPrompt(persona, previousResponseSummary);
    const messages = buildChatMessages(trimmedHistory, message);

    const reply = await callGeminiChat(systemPrompt, messages, 300);

    res.json({
      success: true,
      reply,
      persona,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
