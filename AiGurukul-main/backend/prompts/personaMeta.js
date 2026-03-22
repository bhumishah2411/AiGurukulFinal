/**
 * PROMPT: personaMeta
 *
 * Returns JSON metadata for rendering persona cards in the UI.
 * Used by Person 1 (Frontend) to dynamically populate persona selection.
 *
 * Returns: { emoji, name, tagline, style_adjectives[], accent_color_hex, bg_color_hex }
 */

// Static fallback — avoids an API call for known personas
const PERSONA_META_STATIC = {
  krishna: {
    emoji: "🧘",
    name: "Krishna",
    tagline: "Act without attachment to outcome",
    style_adjectives: ["calm", "philosophical", "compassionate", "profound"],
    accent_color_hex: "#7B68EE",
    bg_color_hex: "rgba(123, 104, 238, 0.08)",
    border_color_hex: "rgba(123, 104, 238, 0.35)",
    tradition: "Bhagavad Gita",
    opening_line: "Dear friend, let us look at this together...",
  },
  chanakya: {
    emoji: "👁️",
    name: "Chanakya",
    tagline: "Strategy is the sharpest form of wisdom",
    style_adjectives: ["strategic", "bold", "practical", "unsparing"],
    accent_color_hex: "#C46B3A",
    bg_color_hex: "rgba(196, 107, 58, 0.08)",
    border_color_hex: "rgba(196, 107, 58, 0.35)",
    tradition: "Arthashastra",
    opening_line: "Listen carefully. There is no time for comfort.",
  },
  guru: {
    emoji: "🧑‍🏫",
    name: "Guru",
    tagline: "The simplest truth is always the deepest",
    style_adjectives: ["warm", "simple", "nurturing", "patient"],
    accent_color_hex: "#3A9B8C",
    bg_color_hex: "rgba(58, 155, 140, 0.08)",
    border_color_hex: "rgba(58, 155, 140, 0.35)",
    tradition: "Panchatantra",
    opening_line: "Come, sit. Let me tell you something...",
  },
};

/**
 * Get persona metadata.
 * Uses static data to avoid unnecessary API calls.
 * Pass `persona = 'all'` to get all three.
 */
function getPersonaMeta(persona) {
  if (persona === "all") return PERSONA_META_STATIC;
  return PERSONA_META_STATIC[persona] || null;
}

/**
 * If you ever need AI-generated persona metadata (e.g. for custom personas),
 * use this prompt builder.
 */
function buildPersonaMetaPrompt(personaName) {
  const systemPrompt = `You are a configuration generator for the AI Gurukul application.

Your job is to return a JSON object describing a wise persona card for the UI.
Return ONLY valid JSON — no markdown fences, no explanation, no preamble.

Required fields:
{
  "emoji": "single emoji representing this figure",
  "name": "display name",
  "tagline": "their core philosophy in under 8 words",
  "style_adjectives": ["adj1", "adj2", "adj3", "adj4"],
  "accent_color_hex": "#RRGGBB (a color that feels true to this figure)",
  "bg_color_hex": "rgba version of accent at 8% opacity",
  "border_color_hex": "rgba version of accent at 35% opacity",
  "tradition": "which ancient text or tradition they represent",
  "opening_line": "how they would begin speaking to a troubled person"
}`;

  const userMessage = `Generate persona metadata for: ${personaName}`;
  return { systemPrompt, userMessage };
}

module.exports = { getPersonaMeta, buildPersonaMetaPrompt };
