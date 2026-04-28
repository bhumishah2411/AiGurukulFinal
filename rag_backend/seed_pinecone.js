require("dotenv").config();
const fs = require("fs");
const { Pinecone } = require("@pinecone-database/pinecone");
const { CohereClient } = require("cohere-ai");

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index("aigurukul-index");
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

async function generateEmbeddings(text) {
  const response = await cohere.embed({
    texts: [text],
    model: "embed-english-v3.0",
    inputType: "search_document"
  });
  
  // Cohere SDK sometimes returns it flat, sometimes nested depending on version. 
  // Let's elegantly catch whatever it throws at us!
  const embedding = Array.isArray(response.embeddings[0]) 
    ? response.embeddings[0] 
    : response.embeddings?.float?.[0];

  if (!embedding || embedding.length === 0) {
    throw new Error("Embedded vector is undefined or empty. Cohere response keys: " + Object.keys(response).join(","));
  }

  return embedding;
}

// A simple manual text splitter that splits by paragraphs
function splitTextIntoChunks(text, maxChars = 800) {
  const paragraphs = text.split('\n\n');
  const chunks = [];
  let currentChunk = '';
  
  for (const para of paragraphs) {
    if (currentChunk.length + para.length > maxChars) {
      if (currentChunk.trim().length > 0) chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk += '\n\n' + para;
    }
  }
  if (currentChunk.trim().length > 0) chunks.push(currentChunk.trim());
  return chunks;
}

async function uploadFileToNamespace(filename, namespace) {
  console.log(`\n📄 Processing ${filename} for ${namespace}...`);
  try {
    const rawText = fs.readFileSync(filename, "utf-8");
    const chunks = splitTextIntoChunks(rawText);
    console.log(`Created ${chunks.length} chunks. Generating Embeddings...`);

    const vectors = [];
    for (let i = 0; i < chunks.length; i++) {
      const textChunk = chunks[i];
      const embedding = await generateEmbeddings(textChunk);
      
      vectors.push({
        id: `${namespace}-vec-${i}`,
        values: embedding,
        metadata: { text: textChunk } // The LLM will read this!
      });
    }

    console.log(`☁️ Uploading ${vectors.length} vectors to Pinecone namespace: '${namespace}'...`);
    
    // Pinecone SDK requires passing an object with a 'records' array!
    await index.namespace(namespace).upsert({
      records: vectors
    });
    console.log(`✅ Successfully uploaded ${filename}!`);
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error.message);
  }
}

async function runSeeder() {
  console.log("🚀 Starting Pinecone RAG Database Seeding...");
  
  // 1. Upload Chanakya Data
  await uploadFileToNamespace("chanakya_data.txt", "chanakya_collection");
  
  // 2. Upload Krishna Data
  await uploadFileToNamespace("gita_data.txt", "krishna_collection");
  
  // 3. Upload Ramayana/Guru Data
  await uploadFileToNamespace("ramayana_data.txt", "guru_collection");
  
  console.log("\n🎉 All database seeding is complete! Your AI is ready.");
}

runSeeder();
