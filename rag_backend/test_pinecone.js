require("dotenv").config();
const { Pinecone } = require("@pinecone-database/pinecone");

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pc.index("aigurukul-index");

async function testPinecone() {
  const dummyVec = Array(1024).fill(0.1);
  const vectors = [{
    id: "test-vec-1",
    values: dummyVec,
    metadata: { text: "hello" }
  }];
  
  try {
     console.log("Testing array upsert with records object...");
     await index.namespace("test_ns").upsert(vectors);
  } catch (err) {
     console.error("1. Failed with array:", err.message);
  }

  try {
     await index.upsert({
        namespace: "test_ns",
        records: vectors
     });
     console.log("2. SUCCESS! The new SDK requires an object { records: [] }");
  } catch (err) {
     console.error("2. Failed:", err.message);
  }
}
testPinecone();
