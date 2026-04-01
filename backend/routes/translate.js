const express = require("express");
const router = express.Router();
const { callClaudeJSON } = require("../utils/anthropic");
const { buildTranslationPrompt } = require("../prompts/translation");

/**
 * POST /api/translate
 * Body: {
 *   text: string,
 *   sourceLang: string,
 *   targetLang: string
 * }
 * Returns: { success: true, translation: { translatedText, explanation, keyTerms: [], modernRelevance } }
 */
router.post("/", async (req, res, next) => {
  try {
    const { text, sourceLang = "Sanskrit", targetLang = "English" } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ error: "No text provided for translation." });
    }

    const systemPrompt = buildTranslationPrompt(sourceLang, targetLang);
    const translation = await callClaudeJSON(systemPrompt, text, 1000);

    res.json({
      success: true,
      translation,
    });
  } catch (err) {
    console.error("[Translation Error]", err.message);
    next(err);
  }
});

module.exports = router;
