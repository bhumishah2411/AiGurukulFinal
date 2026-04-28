require("dotenv").config();
const { CohereClient } = require("cohere-ai");
const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

async function test() {
  const response = await cohere.embed({
    texts: ["hello world"],
    model: "embed-english-v3.0",
    inputType: "search_document"
  });
  console.log("Raw Response Keys:", Object.keys(response));
  console.log("Raw Response Embeddings:", typeof response.embeddings, Array.isArray(response.embeddings));
  if (Array.isArray(response.embeddings)) {
      console.log("First element:", typeof response.embeddings[0], Array.isArray(response.embeddings[0]), response.embeddings[0].length);
  } else {
      console.log("Keys of embeddings:", Object.keys(response.embeddings || {}));
      console.log("Float array length:", response.embeddings?.float?.[0]?.length);
  }
}
test();
