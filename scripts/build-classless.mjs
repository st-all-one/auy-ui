#!/usr/bin/env node
/**
 * build-classless.mjs
 * Generates a classless version of auy-ui — only pure HTML element styling,
 * no BEM classes (.alert, .card, .badge, .timeline, etc.).
 * 
 * Outputs:
 *   dist/auy-classless.min.css           — Classless with fonts
 *   dist/auy-classless-nofonts.min.css   — Classless with system-ui
 * 
 * Usage: node scripts/build-classless.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { bundleAsync } from 'lightningcss';
import postcss from 'postcss';
import { minify as csso } from 'csso';

const ROOT = resolve(import.meta.dirname, '..');
const ENTRY = resolve(ROOT, 'src/styling/auy-ui.css');
const DIST = resolve(ROOT, 'dist');

const BEM_CLASS_NAMES = [
  'alert', 'card', 'badge', 'timeline', 'spinner',
  'file-dropzone', 'input-group', 'form-group',
  'snippet-preview', 'char-counter', 'char-progress',
  'media-player', 'hover-zoom', 'figure-actions',
  'transparency-badge', 'table-empty',
];

const targets = {
  chrome: 111,
  firefox: 114,
  safari: 16,
  ios: 16,
  edge: 111,
};

function makeResolver(replaceFonts) {
  return {
    resolve(specifier, from) {
      const url = specifier.startsWith('./')
        ? new URL(specifier, new URL(from, `file://${ROOT}/`))
        : new URL(specifier, `file://${ROOT}/`);
      return url.pathname.endsWith('.css') ? url.pathname : url.pathname + '.css';
    },
    read(filePath) {
      let content = readFileSync(filePath, 'utf8');
      if (replaceFonts) {
        content = content
          .replace(/('Inter',\s*)?system-ui[^;]*/, `system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif`)
          .replace(/'JetBrains Mono'(?:[^;]*?monospace)?/, `'Fira Code', 'Cascadia Code', 'Source Code Pro', Consolas, monospace`);
      }
      return content;
    },
  };
}

function stripBEMClasses(css) {
  const root = postcss.parse(css);

  root.walk(node => {
    if (node.type === 'comment') {
      node.remove();
      return;
    }

    if (node.type === 'rule') {
      // Remove rules whose ALL selectors reference BEM classes
      if (node.selectors && node.selectors.length > 0) {
        const allBEM = node.selectors.every(sel => {
          return BEM_CLASS_NAMES.some(cls => {
            const re = new RegExp(`\\.${cls}(\\b|__|--|-)`);
            return re.test(sel);
          });
        });
        if (allBEM) {
          node.remove();
          return;
        }
      }
    }

    // Clean up empty at-rules after children removed
    if (node.type === 'atrule' && node.nodes && node.nodes.length === 0) {
      node.remove();
    }
  });

  // Remove empty rule nodes (after children removed)
  root.walk(node => {
    if (node.type === 'rule' && node.nodes && node.nodes.length === 0) {
      node.remove();
    }
  });

  return root.toString();
}

async function bundleClassless(options = {}) {
  const result = await bundleAsync({
    filename: ENTRY,
    minify: false,
    targets,
    drafts: {
      nesting: true,
      customMedia: true,
    },
    resolver: makeResolver(options.replaceFonts),
  });

  let css = result.code.toString();
  css = stripBEMClasses(css);
  css = csso(css).css;
  return Buffer.from(css);
}

async function main() {
  console.log('📦 Building auy-classless.min.css...');
  const css = await bundleClassless({ replaceFonts: false });
  writeFileSync(resolve(DIST, 'auy-classless.min.css'), css);
  console.log(`   → dist/auy-classless.min.css (${(css.length / 1024).toFixed(1)} KB)`);

  console.log('📦 Building auy-classless-nofonts.min.css...');
  const cssNF = await bundleClassless({ replaceFonts: true });
  writeFileSync(resolve(DIST, 'auy-classless-nofonts.min.css'), cssNF);
  console.log(`   → dist/auy-classless-nofonts.min.css (${(cssNF.length / 1024).toFixed(1)} KB)`);

  console.log('✅ Classless build complete.');
}

main().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
