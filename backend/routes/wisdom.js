const express = require("express");
const router = express.Router();
const { callClaude } = require("../utils/anthropic");
const { buildWisdomPrompt, parseWisdomResponse } = require("../prompts/wisdomEngine");
const { buildPersonaSwitchPrompt } = require("../prompts/personaSwitch");
const {
  validateWisdomRequest,
  validateSwitchRequest,
} = require("../middleware/validate");

/**
 * POST /api/wisdom
 * Body: { problem: string, persona: 'krishna'|'chanakya'|'guru' }
 * Returns: structured wisdom object with story, lesson, advice, science, actionPlan
 */
router.post("/", validateWisdomRequest, async (req, res, next) => {
  try {
    const { problem, persona } = req.body;
    const { systemPrompt, userMessage } = buildWisdomPrompt(problem, persona);
    const raw = await callClaude(systemPrompt, userMessage, 1200);
    const wisdom = parseWisdomResponse(raw);

    res.json({
      success: true,
      persona,
      problem,
      wisdom,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/wisdom/switch
 * Body: { problem, previousPersona, newPersona }
 * Returns: same wisdom structure but from the new persona's angle
 */
router.post("/switch", validateSwitchRequest, async (req, res, next) => {
  try {
    const { problem, previousPersona, newPersona } = req.body;
    const { systemPrompt, userMessage } = buildPersonaSwitchPrompt(
      problem,
      previousPersona,
      newPersona
    );
    const raw = await callClaude(systemPrompt, userMessage, 1200);
    const wisdom = parseWisdomResponse(raw);

    res.json({
      success: true,
      persona: newPersona,
      previousPersona,
      problem,
      wisdom,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
