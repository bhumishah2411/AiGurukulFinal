require("dotenv").config();

process.on('uncaughtException', (err) => {
  console.error("Uncaught Exception:", err);
});

process.on('unhandledRejection', (err) => {
  console.error("Unhandled Rejection:", err);
});

console.log("Loaded API Key:", process.env.ANTHROPIC_API_KEY);

const express = require('express');
const cors = require('cors');
const { ChromaClient } = require('chromadb');
const OpenAI = require("openai");

const app = express();
app.use(cors());
app.use(express.json());

const client = new ChromaClient();
const openai = new OpenAI({
  apiKey: process.env.ANTHROPIC_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

// Keywords for auto-detecting persona if not specified
const keywords = {
  krishna: ['karma', 'peace', 'arjuna', 'meditation', 'dharma', 'gita', 'detachment'],
  chanakya: ['strategy', 'success', 'money', 'power', 'enemy', 'king', 'policy', 'study'],
  guru: ['health', 'dosha', 'ayurveda', 'nature', 'yoga', 'study', 'balance', 'learn']
};

function detectPersona(message) {
  message = message.toLowerCase();
  for (const [persona, words] of Object.entries(keywords)) {
    if (words.some(word => message.includes(word))) {
      return persona;
    }
  }
  return 'guru'; // Default persona
}
// Common retrieval function
async function getContext(collectionName, query, nResults = 2) {
  try {
    const collection = await client.getCollection({ name: collectionName });
    const results = await collection.query({
      queryTexts: [query],
      nResults: nResults,
    });

    // Combine fetched documents into a single string
    if (results && results.documents && results.documents[0]) {
      return results.documents[0].join('\n');
    }
  } catch (error) {
    console.error(`Error querying ${collectionName}:`, error);
  }
  return '';
}

// Base agent to call LLM
async function runAgentPrompt(systemPrompt, context, query) {
  const combinedPrompt = `Context knowledge retrieved from database:
${context}

User Query: ${query}

Use the context to inform your answer. Act according to your system prompt.`;

  const response = await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: combinedPrompt }
    ]
  });

  return response.choices[0].message.content;
}
// 1. Krishna Agent
async function krishnaAgent(query, history = []) {
  const context = await getContext('krishna_collection', query);
  const systemPrompt = "You are Krishna. Your tone is calm, philosophical, and spiritual. You give wisdom, detachment, and life guidance based on the Bhagavad Gita and Mahabharata.";
  console.log("Retrieved Context:", context);
  return runAgentPrompt(systemPrompt, context, query);
}

// 2. Chanakya Agent
async function chanakyaAgent(query, history = []) {
  const context = await getContext('chanakya_collection', query);
  const systemPrompt = "You are Chanakya. Your tone is practical, strategic, and logical. You give actionable, real-world advice drawing from Chanakya Neeti and Arthashastra.";
  return runAgentPrompt(systemPrompt, context, query);
}

// 3. Guru Agent
async function guruAgent(query, history = []) {
  const context = await getContext('guru_collection', query);
  const systemPrompt = "You are a traditional Indian Guru. Your tone is simple, teacher-like, and you use easy explanations. You explain concepts from Ayurveda and the Indian Knowledge System in simple terms.";
  return runAgentPrompt(systemPrompt, context, query);
}

// Main Agent Executor
async function agentExecutor({ message, persona, history = [] }) {
  const selectedPersona = persona ? persona.toLowerCase() : detectPersona(message);

  let response;
  switch (selectedPersona) {
    case 'krishna':
      response = await krishnaAgent(message, history);
      break;
    case 'chanakya':
      response = await chanakyaAgent(message, history);
      break;
    case 'guru':
    default:
      response = await guruAgent(message, history);
      break;
  }

  return { personaUsed: selectedPersona, response };
}

app.post('/chat', async (req, res) => {
  console.log("🔥 RAG API HIT");
  try {
    const { message, persona } = req.body;

    console.log("Incoming:", req.body);

    const result = await agentExecutor(req.body);
    res.json({ success: true, reply: result.response });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({ success: false, error: error.message || 'Internal server error' });
  }
});

const PORT = 3005;
app.listen(PORT, () => {
  console.log(`RAG Backend running on http://localhost:${PORT}`);
});
