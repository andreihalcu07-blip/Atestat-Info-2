const fs = require('fs');
const path = require('path');

const root = path.resolve(process.cwd());
function walk(dir) {
  let files = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) files = files.concat(walk(p));
    else files.push(p);
  }
  return files;
}

function collectKeysFromHTML(files) {
  const keys = new Set();
  const re = /data-i18n\s*=\s*"([^"]+)"/g;
  for (const file of files) {
    if (!file.endsWith('.html')) continue;
    const s = fs.readFileSync(file, 'utf8');
    let m;
    while ((m = re.exec(s))) keys.add(m[1]);
  }
  return Array.from(keys).sort();
}

function loadJSON(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf8')); } catch (e) { return {}; }
}

function saveJSON(p, obj) {
  fs.writeFileSync(p, JSON.stringify(obj, null, 4) + '\n', 'utf8');
}

function findInI18nJs(key, langCode) {
  const js = fs.readFileSync(path.join(root, 'js', 'i18n.js'), 'utf8');
  const idx = js.indexOf(`${langCode}:`);
  if (idx === -1) return null;
  // search within 20000 chars after the lang label
  const slice = js.slice(idx, idx + 20000);
  const re = new RegExp(`\\b${key}\\s*:\\s*['\"]([\\s\\S]*?)['\"]`, 'm');
  const m = re.exec(slice);
  if (m) return m[1];
  return null;
}

(function main(){
  const allFiles = walk(root);
  const htmlKeys = collectKeysFromHTML(allFiles);
  console.log('Found', htmlKeys.length, 'unique i18n keys in HTML.');

  const langDir = path.join(root, 'lang');
  const enPath = path.join(langDir, 'en.json');
  const roPath = path.join(langDir, 'ro.json');
  const en = loadJSON(enPath);
  const ro = loadJSON(roPath);

  const added = { en: [], ro: [] };

  for (const key of htmlKeys) {
    if (!(key in en)) {
      // try to find in i18n.js english block
      let val = findInI18nJs(key, 'en');
      if (!val) val = key; // fallback placeholder
      en[key] = val;
      added.en.push(key);
    }
    if (!(key in ro)) {
      let val = findInI18nJs(key, 'ro');
      if (!val) val = key;
      ro[key] = val;
      added.ro.push(key);
    }
  }

  if (added.en.length) saveJSON(enPath, en);
  if (added.ro.length) saveJSON(roPath, ro);

  console.log('Added keys -> en:', added.en.length, 'ro:', added.ro.length);
  if (added.en.length) console.log(added.en.join(', '));
})();
