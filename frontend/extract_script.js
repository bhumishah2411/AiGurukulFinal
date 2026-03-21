const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const scriptMatch = html.match(/<script type="module">([\s\S]*?)<\/script>/);
if (scriptMatch) {
  fs.writeFileSync('test_module.js', scriptMatch[1]);
  console.log('test_module.js created');
} else {
  console.log('No script found');
}
