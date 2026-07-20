import { readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { transform } from 'lightningcss';
import { execSync } from 'child_process';

const RAW = 'dist/mod.js';
const MIN_RAW = 'dist/mod.temp.js';
const MIN_OUT = 'dist/mod.min.js';

const CSS_RE = /`([^`]*?(?:--auy-|:host|display\s*:|@media|@keyframes|@supports|@starting-style|@container|@layer|@page|@property|grid-template|subgrid|place-items|align-items|justify-content|border-radius|flex-direction|font-family|contain\s*:)[^`]*?)`/gs;

function isCSS(str) {
  return /(?::host|display\s*:|@media|@keyframes|@supports|\.\w+\s*\{)/s.test(str);
}

function minifyCSS(css) {
  try {
    const result = transform({
      code: Buffer.from(css),
      minify: true,
    });
    return result.code.toString('utf8');
  } catch {
    return css;
  }
}

function minifyCSSStrings(code) {
  return code.replace(CSS_RE, (match, inner) => {
    if (!isCSS(inner)) return match;
    const minified = minifyCSS(inner);
    if (minified.length < inner.length) {
      return match.replace(inner, minified);
    }
    return match;
  });
}

const raw = readFileSync(RAW, 'utf8');
console.log(`Original: ${(raw.length / 1024).toFixed(1)} KB`);

const processed = minifyCSSStrings(raw);
const cssSavings = raw.length - processed.length;
console.log(`After CSS minify: ${(processed.length / 1024).toFixed(1)} KB (saved ${(cssSavings / 1024).toFixed(1)} KB)`);

writeFileSync(MIN_RAW, processed, 'utf8');

execSync(`terser ${MIN_RAW} --compress --mangle --output ${MIN_OUT}`, { stdio: 'inherit' });

const minified = readFileSync(MIN_OUT, 'utf8');
const totalSavings = raw.length - minified.length;
console.log(`Final ${MIN_OUT}: ${(minified.length / 1024).toFixed(1)} KB (saved ${(totalSavings / 1024).toFixed(1)} KB total)`);

execSync(`rm ${MIN_RAW}`, { stdio: 'ignore' });

// Copy CSS bundle for standalone CSS usage
try {
  copyFileSync('dist/mod.css', 'dist/auy-ui.css');
  const cssSize = readFileSync('dist/auy-ui.css', 'utf8').length;
  console.log(`CSS bundle: dist/auy-ui.css (${(cssSize / 1024).toFixed(1)} KB)`);
} catch {
  console.log('No CSS bundle found at dist/mod.css');
}
