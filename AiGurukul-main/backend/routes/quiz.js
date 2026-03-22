const express = require("express");
const router = express.Router();
const { callGeminiJSON } = require("../utils/gemini");
const { buildReflectionQuizPrompt } = require("../prompts/reflectionQuiz");
const { validateQuizRequest } = require("../middleware/validate");

/**
 * POST /api/quiz
 * Body: { problem: string, persona: string }
 * Returns: {
 *   question: string,
 *   options: string[4],
 *   feedback: string[4],
 *   tradition_reference: string
 * }
 */
router.post("/", validateQuizRequest, async (req, res, next) => {
  try {
    const { problem, persona } = req.body;
    const { systemPrompt, userMessage } = buildReflectionQuizPrompt(problem, persona);
    const quiz = await callGeminiJSON(systemPrompt, userMessage, 800);

    // Validate shape
    if (
      !quiz.question ||
      !Array.isArray(quiz.options) ||
      quiz.options.length !== 4 ||
      !Array.isArray(quiz.feedback) ||
      quiz.feedback.length !== 4
    ) {
      throw new Error("Quiz response did not match expected shape.");
    }

    res.json({ success: true, quiz });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
