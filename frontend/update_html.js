const fs = require('fs');
let HTML = fs.readFileSync('index.html', 'utf8');
const newHtml = fs.readFileSync('new_learn_html.html', 'utf8');

const start = HTML.indexOf('<!-- ── Learn ─────────────────────────────────────────── -->');
const end = HTML.indexOf('  <script type="module">');

if(start > -1 && end > -1) {
  HTML = HTML.slice(0, start) + newHtml + '\n' + HTML.slice(end);
  fs.writeFileSync('index.html', HTML);
  console.log('HTML updated');
} else {
  console.log('Could not find HTML injection points');
}
