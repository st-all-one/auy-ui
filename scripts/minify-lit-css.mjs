import { transform } from 'lightningcss';

const cssMarker = /`([^`]*?(?::host|display:|@media|@keyframes|@supports|@starting-style|@container|@layer|@page|@property|grid-template|flex-direction|place-items|align-items|justify-content|border-radius|font-family|var\(--auy)[^`]*?)`/gs;

function isCSSContent(str) {
  return /(?::host|display\s*:|@media|@keyframes|@supports|\.(?:card|badge|spinner|button|toast|modal|tabs|breadcrumb|tooltip|table|accordion|pagination|skeleton|form))/s.test(str);
}

function minifyCSSBlock(css) {
  try {
    const result = transform({
      code: Buffer.from(css),
      minify: true,
      targets: {
        chrome: 111 << 0,
        firefox: 114 << 0,
        safari: (16 << 16) | (4 << 8),
      },
    });
    return result.code.toString('utf8');
  } catch {
    return css;
  }
}

function minifyCSSInCode(code) {
  return code.replace(cssMarker, (match, cssContent) => {
    if (!isCSSContent(cssContent)) return match;
    const minified = minifyCSSBlock(cssContent);
    if (minified === cssContent) return match;
    return match.replace(cssContent, minified);
  });
}

export function minifyLitCSSPlugin() {
  return {
    name: 'minify-lit-css',
    generateBundle(_, bundle) {
      for (const [key, chunk] of Object.entries(bundle)) {
        if (chunk.type === 'chunk' && key.endsWith('.js')) {
          chunk.code = minifyCSSInCode(chunk.code);
        }
      }
    },
  };
}
