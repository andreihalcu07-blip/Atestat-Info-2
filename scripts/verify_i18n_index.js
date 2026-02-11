const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

// Collect visible text nodes in common tags
const tags = ['h1','h2','h3','p','a','button','li','label','span','input','textarea'];
const found = [];

for (const tag of tags) {
  doc.querySelectorAll(tag).forEach(el => {
    // ignore empty
    const text = (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea')
      ? (el.getAttribute('placeholder') || el.value || '')
      : el.textContent || '';
    const trimmed = text.replace(/\s+/g,' ').trim();
    if (!trimmed) return;
    // skip small numeric/date labels
    if (/^[0-9\-–:\/\s]+$/.test(trimmed)) return;
    // skip if already annotated
    if (el.hasAttribute('data-i18n') || el.hasAttribute('data-translate')) return;
    // path for context
    const path = [];
    let cur = el;
    while (cur && cur.nodeName && cur.nodeName.toLowerCase() !== 'html') {
      path.unshift(cur.nodeName.toLowerCase() + (cur.id ? `#${cur.id}` : ''));
      cur = cur.parentElement;
    }
    found.push({ tag, text: trimmed.slice(0,200), path: path.join('>') });
  });
}

// Load i18n keys
let i18nKeys = [];
try {
  const i18n = fs.readFileSync('js/i18n.js','utf8');
  // crude parse: look for lines like "key: "value",
  const re = /\n\s*([a-z0-9_]+)\s*:\s*"/gi;
  let m;
  while ((m = re.exec(i18n))) {
    i18nKeys.push(m[1]);
  }
} catch (e) {
  // ignore
}

console.log('--- Missing data-i18n candidates on index.html ---');
if (found.length === 0) console.log('None found.');
found.forEach((f,i) => console.log(`${i+1}. <${f.tag}> "${f.text}"  -> ${f.path}`));

console.log('\n--- i18n.js keys sample (first 200) ---');
console.log(i18nKeys.slice(0,200).join(', '));

// Suggest keys for each found element
console.log('\n--- Suggestions (candidate keys) ---');
found.forEach((f,i) => {
  // create a simple slug key from text
  const key = f.text.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'').slice(0,40);
  console.log(`${i+1}. Suggest data-i18n="${key}"  (text: "${f.text}")`);
});
