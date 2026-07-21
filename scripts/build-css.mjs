#!/usr/bin/env node
/**
 * build-css.mjs
 * Generates standalone minified CSS bundles from src/styling/auy-ui.css
 * 
 * Outputs:
 *   dist/auy-ui.min.css           — Full bundle with Inter/JetBrains Mono fonts
 *   dist/auy-ui-nofonts.min.css   — Bundle with system-ui font stack only
 * 
 * Usage: node scripts/build-css.mjs
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { bundleAsync, transform } from 'lightningcss';
import { browserslistToTargets } from 'lightningcss';

const ROOT = resolve(import.meta.dirname, '..');
const ENTRY = resolve(ROOT, 'src/styling/auy-ui.css');
const DIST = resolve(ROOT, 'dist');

const targets = {
  chrome: 111,
  firefox: 114,
  safari: 16,
  ios: 16,
  edge: 111,
};

async function bundleCSS(entryPoint, options = {}) {
  const result = await bundleAsync({
    filename: entryPoint,
    minify: true,
    targets,
    drafts: {
      nesting: true,
      customMedia: true,
    },
    resolver: {
      resolve(specifier, from) {
        const url = specifier.startsWith('./')
          ? new URL(specifier, new URL(from, `file://${ROOT}/`))
          : new URL(specifier, `file://${ROOT}/`);
        const filePath = url.pathname;
        if (!filePath.endsWith('.css')) return filePath + '.css';
        return filePath;
      },
      read(filePath) {
        let content = readFileSync(filePath, 'utf8');
        if (options.replaceFonts) {
          content = content
            .replace(/('Inter',\s*)?system-ui[^;]*/, `system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`)
            .replace(/'JetBrains Mono'(?:[^;]*?monospace)?/, `'Fira Code', 'Cascadia Code', 'Source Code Pro', Consolas, monospace`);
        }
        return content;
      },
    },
  });
  return result.code;
}

async function main() {
  console.log('📦 Building auy-ui.min.css (full, with fonts)...');
  const fullCSS = await bundleCSS(ENTRY, { replaceFonts: false });
  writeFileSync(resolve(DIST, 'auy-ui.min.css'), fullCSS);
  console.log(`   → dist/auy-ui.min.css (${(fullCSS.length / 1024).toFixed(1)} KB)`);

  console.log('📦 Building auy-ui-nofonts.min.css (system-ui)...');
  const nofontsCSS = await bundleCSS(ENTRY, { replaceFonts: true });
  writeFileSync(resolve(DIST, 'auy-ui-nofonts.min.css'), nofontsCSS);
  console.log(`   → dist/auy-ui-nofonts.min.css (${(nofontsCSS.length / 1024).toFixed(1)} KB)`);

  console.log('✅ CSS build complete.');
}

main().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
