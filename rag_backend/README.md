# RAG-Based Multi-Persona Agent

This is a complete implementation of a RAG (Retrieval-Augmented Generation) based agent system with multiple personas (Krishna, Chanakya, Guru). It uses Express.js, ChromaDB, and Anthropic's Claude to act as a backend.

## 🛠️ Prerequisites

1. **Node.js**: Installed on your system.
2. **Python**: Required to run the local ChromaDB server. (Alternatively, you can run ChromaDB via Docker).
3. **Anthropic API Key**: Currently set in `.env` based on your main project. Ensure you have the `.env` file with `ANTHROPIC_API_KEY`.

## 🚀 How to Run It (Workflow)

Follow these steps exactly to get everything running and communicating.

### Step 1: Start the ChromaDB Server
ChromaDB requires a vector database server to be running before the Node.js client can connect to it.

Since you're on Windows and you have Python, you can easily run it locally:
1. Open a new terminal.
2. Install chromadb via python if you haven't already:
   ```bash
   pip install chromadb
   ```
3. Run the Chroma server:
   ```bash
   chroma run --path ./chroma_db
   ```
   *This starts the DB locally on `http://localhost:8000` and saves the data in the `chroma_db` folder so it persists across restarts.*

### Step 2: Data Ingestion (One-time setup)
Once the DB server is running, we need to ingest the dummy knowledge into the ChromaDB collections.
1. Open a separate terminal inside this `rag_backend` folder.
2. Install dependencies (if not done yet):
   ```bash
   npm install
   ```
3. Run the ingestion script:
   ```bash
   node ingest.js
   ```
   *Workflow*: This script checks for any existing collections, clears them to avoid duplicates, creates `krishna_collection`, `chanakya_collection`, and `guru_collection`, and populates them using vector embeddings (handled automatically by Xenova transformers).

### Step 3: Run the Agent Server
Now that the database is populated, start the Node server.
1. In the same terminal where you ran the ingestion script, run:
   ```bash
   node server.js
   ```
   *The server will start on `http://localhost:3005`.*

### Step 4: Test the Endpoint
You can test the RAG chatbot using Postman or cURL.

**Endpoint**: `POST http://localhost:3005/chat`
**Body (JSON)**:
```json
{
  "message": "What is the secret to peace?",
  "persona": "krishna"
}
```
*Note: If `persona` is omitted, the agent executor will try to automatically detect it based on keywords like "karma", "health", "strategy" etc. If it cannot decide, it defaults to the "guru" persona.*

## 🧠 Workflow Overview
1. **User asks a question** to the `/chat` API.
2. **Agent Executor** determines the target persona (from the request body or keyword detection).
3. **Retrieval**: The specific agent (e.g. `krishnaAgent`) queries its corresponding ChromaDB collection (`krishna_collection`) for the most similar text blocks in the dataset.
4. **Augmented Prompt Generation**: The retrieved context is packaged together with the user's question and a highly specified system prompt (the Persona).
5. **LLM Execution**: The Anthropic model evaluates the context and creates an answer directly linked to that Persona's specific knowledge base.
6. The answer is returned in the API response like so:
   ```json
   {
     "personaUsed": "krishna",
     "response": "According to the scriptures, peace depends on performing your prescribed duty without attachment..."
   }
   ```

## 🎁 How to Extend Later
- **Add More Personas**: Just add their strings to `data.js`, update `ingest.js` to create their chunk collection, and then add an agent function in `server.js`.
- **Use Real Documents**: In production, replace the dummy strings in `data.js` with parsed content from actual PDFs or Books. You can use a tool like `pdf-parse` to read large documents and ingest chunk by chunk.
- **Switch to OpenAI limit**: Swap out the Anthropic SDK with the OpenAI SDK in `server.js` if you prefer GPT-4 or want to use text-embedding-ada-002 directly.
