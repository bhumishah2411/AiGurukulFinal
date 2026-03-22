require("dotenv").config({ path: ".env" });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { parseWisdomResponse } = require("./prompts/wisdomEngine");

async function diagnose() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const modelName = "gemini-2.5-flash"; // Our current active model
  
  console.log(`--- Testing ${modelName} ---`);
  const model = genAI.getGenerativeModel({ 
    model: modelName,
    systemInstruction: "You are a wise guide. Always include STORY:, LESSON:, ADVICE:, SCIENCE:, and ACTION_PLAN: headers."
  });
  
  try {
    const result = await model.generateContent("Give me some wisdom about procrastination.");
    const text = result.response.text();
    console.log("RAW RESPONSE:\n", text);
    
    const parsed = parseWisdomResponse(text);
    console.log("PARSED:\n", JSON.stringify(parsed, null, 2));

    let issues = [];
    if (!parsed.story) issues.push("Missing STORY");
    if (!parsed.lesson) issues.push("Missing LESSON");
    if (!parsed.advice.do) issues.push("Missing ADVICE DO");
    if (!parsed.actionPlan.length) issues.push("Missing ACTION_PLAN items");
    
    if (issues.length === 0) {
      console.log("\n✅ gemini-2.5-flash is WORKING and PARSING correctly.");
    } else {
      console.log("\n❌ Issues found:", issues.join(", "));
    }
  } catch (err) {
    console.error("FAILED:", err.message);
  }
}

diagnose();
