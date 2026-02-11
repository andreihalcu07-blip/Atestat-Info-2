const fs = require('fs');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html);
const doc = dom.window.document;

const tags = ['h1','h2','h3','p','a','button','li','label','span','input','textarea'];
const found = [];

for (const tag of tags) {
  doc.querySelectorAll(tag).forEach(el => {
    const text = (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea')
      ? (el.getAttribute('placeholder') || el.value || '')
      : el.textContent || '';
    const trimmed = text.replace(/\s+/g,' ').trim();
    if (!trimmed) return;
    if (/^[0-9\-–:\/\s]+$/.test(trimmed)) return;
    if (el.hasAttribute('data-i18n') || el.hasAttribute('data-translate')) return;
    const path = [];
    let cur = el;
    while (cur && cur.nodeName && cur.nodeName.toLowerCase() !== 'html') {
      path.unshift(cur.nodeName.toLowerCase() + (cur.id ? `#${cur.id}` : ''));
      cur = cur.parentElement;
    }
    found.push({ tag, text: trimmed.slice(0,200), path: path.join('>') });
  });
}

let i18nKeys = [];
try {
  const i18n = fs.readFileSync('js/i18n.js','utf8');
  const re = /\n\s*([a-z0-9_]+)\s*:\s*"/gi;
  let m;
  while ((m = re.exec(i18n))) {
    i18nKeys.push(m[1]);
  }
} catch (e) {
  // ignore
}

const out = { missingAnnotations: found, i18nKeysSample: i18nKeys.slice(0,500) };
fs.writeFileSync('scripts/verify_result.json', JSON.stringify(out, null, 2), 'utf8');
console.log('Saved results to scripts/verify_result.json');
