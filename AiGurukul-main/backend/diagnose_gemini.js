require("dotenv").config({ path: ".env" });
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { parseWisdomResponse } = require("./prompts/wisdomEngine");

async function diagnose() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const modelName = "gemini-flash-latest";
  
  // Test 1: Simple text
  console.log("--- Test 1: Simple Text ---");
  const text1 = "STORY: Story 1. LESSON: Lesson 1. ADVICE: DO: Do 1. AVOID: Avoid 1. THINK: Think 1. SCIENCE: Science 1. ACTION_PLAN: 1. Action 1.";
  const parsed1 = parseWisdomResponse(text1);
  console.log("Parsed 1:", JSON.stringify(parsed1, null, 2));

  // Test 2: Markdown headers
  console.log("\n--- Test 2: Markdown Headers ---");
  const text2 = "**STORY:**\nThis is a story.\n\n**LESSON:**\nThis is a lesson.\n\n**ADVICE:**\nDO: Do this.\nAVOID: Avoid that.\nTHINK: Think this.\n\n### SCIENCE:\nSome science.\n\n**ACTION_PLAN:**\n1. Step 1\n2. Step 2";
  const parsed2 = parseWisdomResponse(text2);
  console.log("Parsed 2:", JSON.stringify(parsed2, null, 2));

  if (parsed2.story && parsed2.lesson && parsed2.advice.do === "Do this.") {
    console.log("\n✅ Parsing is now ROBUST.");
  } else {
    console.log("\n❌ Parsing still FAILED.");
  }
}

diagnose();
