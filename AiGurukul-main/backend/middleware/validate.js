const VALID_PERSONAS = ["krishna", "chanakya", "guru"];

function validateWisdomRequest(req, res, next) {
  const { problem, persona } = req.body;

  if (!problem || typeof problem !== "string") {
    return res.status(400).json({ error: "problem is required and must be a string." });
  }
  if (problem.trim().length < 5) {
    return res.status(400).json({ error: "problem must be at least 5 characters." });
  }
  if (problem.length > 500) {
    return res.status(400).json({ error: "problem must be under 500 characters." });
  }
  if (!persona || !VALID_PERSONAS.includes(persona)) {
    return res.status(400).json({
      error: `persona must be one of: ${VALID_PERSONAS.join(", ")}.`,
    });
  }

  req.body.problem = problem.trim();
  next();
}

function validatePersonaRequest(req, res, next) {
  const { persona } = req.body;
  if (!persona || !VALID_PERSONAS.includes(persona)) {
    return res.status(400).json({
      error: `persona must be one of: ${VALID_PERSONAS.join(", ")}.`,
    });
  }
  next();
}

function validateChatRequest(req, res, next) {
  const { persona, message, history, previousResponseSummary } = req.body;

  if (!persona || !VALID_PERSONAS.includes(persona)) {
    return res.status(400).json({ error: "Valid persona required." });
  }
  if (!message || typeof message !== "string" || message.trim().length < 1) {
    return res.status(400).json({ error: "message is required." });
  }
  if (message.length > 300) {
    return res.status(400).json({ error: "message must be under 300 characters." });
  }
  if (!Array.isArray(history)) {
    return res.status(400).json({ error: "history must be an array." });
  }

  req.body.message = message.trim();
  next();
}

function validateSwitchRequest(req, res, next) {
  const { problem, previousPersona, newPersona } = req.body;

  if (!problem || typeof problem !== "string") {
    return res.status(400).json({ error: "problem is required." });
  }
  if (!VALID_PERSONAS.includes(previousPersona)) {
    return res.status(400).json({ error: "previousPersona is invalid." });
  }
  if (!VALID_PERSONAS.includes(newPersona)) {
    return res.status(400).json({ error: "newPersona is invalid." });
  }
  if (previousPersona === newPersona) {
    return res.status(400).json({ error: "newPersona must differ from previousPersona." });
  }
  next();
}

function validateQuizRequest(req, res, next) {
  const { problem, persona } = req.body;
  if (!problem || typeof problem !== "string") {
    return res.status(400).json({ error: "problem is required." });
  }
  if (!VALID_PERSONAS.includes(persona)) {
    return res.status(400).json({ error: "Valid persona required." });
  }
  next();
}

module.exports = {
  validateWisdomRequest,
  validatePersonaRequest,
  validateChatRequest,
  validateSwitchRequest,
  validateQuizRequest,
};
