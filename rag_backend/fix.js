const fs = require('fs');
let code = fs.readFileSync('server.js', 'utf8');

const target = `const response = await cohere.chat({
      model: "command-r-plus-08-2024",
      message: prompt,
      preamble: "You are an expert quiz generator. You output ONLY valid JSON. No markdown, no code fences."
    });`;

const replacement = `const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 20000));
    const response = await Promise.race([
      cohere.chat({
        model: "command-r-plus-08-2024",
        message: prompt,
        preamble: "You are an expert quiz generator. You output ONLY valid JSON. No markdown, no code fences."
      }),
      timeout
    ]);`;

code = code.split(target).join(replacement);
fs.writeFileSync('server.js', code);
