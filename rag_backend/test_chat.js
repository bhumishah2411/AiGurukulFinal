require("dotenv").config();
const { CohereClient } = require("cohere-ai");

const cohere = new CohereClient({ token: process.env.COHERE_API_KEY });

async function testChat() {
  try {
    const response = await cohere.chat({
      model: "command-r-plus-08-2024",
      message: "hello"
    });
    console.log("Success:", response.text);
  } catch (error) {
    console.error("Cohere Chat Error:", error.message);
  }
}

testChat();
