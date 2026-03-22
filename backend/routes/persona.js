const express = require("express");
const router = express.Router();
const { getPersonaMeta, buildPersonaMetaPrompt } = require("../prompts/personaMeta");
const { callClaudeJSON } = require("../utils/anthropic");

/**
 * GET /api/persona
 * Returns metadata for all 3 personas (static — no AI call needed)
 */
router.get("/", (req, res) => {
  const all = getPersonaMeta("all");
  res.json({ success: true, personas: all });
});

/**
 * GET /api/persona/:name
 * Returns metadata for a single persona
 */
router.get("/:name", (req, res) => {
  const { name } = req.params;
  const meta = getPersonaMeta(name);
  if (!meta) {
    return res.status(404).json({ error: `Persona "${name}" not found.` });
  }
  res.json({ success: true, persona: meta });
});

/**
 * POST /api/persona/custom
 * Body: { name: string }
 * Generates AI metadata for a custom persona name (experimental)
 */
router.post("/custom", async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name || name.length < 2) {
      return res.status(400).json({ error: "name is required." });
    }
    const { systemPrompt, userMessage } = buildPersonaMetaPrompt(name);
    const meta = await callClaudeJSON(systemPrompt, userMessage, 400);
    res.json({ success: true, persona: meta });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
