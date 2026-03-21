const fs = require('fs');
let HTML = fs.readFileSync('index.html', 'utf8');
const newJs = fs.readFileSync('new_learn_js.js', 'utf8');

const jsStartRegex = /\/\/ ── Learn screen wiring ────────────────────────────────────[\s\S]*?(?=\/\/ ── Init ───────────────────────────────────────────────────)/;

HTML = HTML.replace(jsStartRegex, newJs + '\n\n    ');

fs.writeFileSync('index.html', HTML);
console.log('JS updated correctly.');
