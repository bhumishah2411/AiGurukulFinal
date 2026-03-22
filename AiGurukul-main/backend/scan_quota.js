require("dotenv").config({ path: ".env" });
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function scan() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const models = [
    'gemini-2.5-flash',
    'gemini-2.5-pro',
    'gemini-2.0-flash-lite',
    'gemini-2.5-flash-lite',
    'gemini-3-flash-lite',
    'gemini-pro-latest'
  ];
  
  for (const modelName of models) {
    try {
      console.log(`Testing ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("hi");
      console.log(`✅ ${modelName} WORKS! Response:`, result.response.text());
      return;
    } catch (err) {
      console.error(`❌ ${modelName} FAILED:`, err.message);
    }
  }
  console.log("No models have remaining quota.");
}

scan();
