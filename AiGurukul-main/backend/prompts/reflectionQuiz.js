/**
 * PROMPT: reflectionQuiz
 *
 * Generates a single reflection question with 4 options and feedback.
 * Encourages the user to think deeper about their problem through
 * the lens of the selected persona's wisdom.
 */

const PERSONA_VOICE_RULES = {
  krishna: `Speak in the voice of Lord Krishna. Use metaphors of the soul and duty.`,
  chanakya: `Speak in the voice of Chanakya. Be direct, practical, and strategic.`,
  guru: `Speak as a warm village guru. Use simple analogies from daily life.`,
};

function buildReflectionQuizPrompt(problem, persona) {
  const voiceRules = PERSONA_VOICE_RULES[persona] || PERSONA_VOICE_RULES.guru;

  const systemPrompt = `You are ${persona.toUpperCase()} in the AI Gurukul system.
${voiceRules}

Your task is to generate ONE reflection question based on the user's problem.
The question should help them internalize the wisdom shared.

RESPONSE FORMAT: You MUST return a JSON object with this exact structure:
{
  "question": "The question to ask the user",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "feedback": [
    "Feedback if they choose A",
    "Feedback if they choose B",
    "Feedback if they choose C",
    "Feedback if they choose D"
  ],
  "tradition_reference": "A short 1-line reference to the source (e.g. 'Gita 2.47' or 'Panchatantra Tale')"
}

RULES:
1. One option should be 'correct' or most aligned with your wisdom, but others should be plausible reframes.
2. Keep the feedback supportive yet instructive in your persona voice.
3. Total JSON only. No extra text.`;

  const userMessage = `User's problem: "${problem}"`;

  return { systemPrompt, userMessage };
}

module.exports = { buildReflectionQuizPrompt };
