/**
 * OKLCH → HSL conversion utility for regenerating fallback CSS files.
 *
 * Usage:
 *   node scripts/convert-oklch-to-hsl.mjs < input.css > output.css
 *   node scripts/convert-oklch-to-hsl.mjs --file src/styling/tokens/colors.css
 *
 * This script reads CSS, finds all `oklch()` values, converts them to HSL,
 * and outputs the equivalent CSS custom properties with HSL fallbacks.
 *
 * Conversion: OKLCH → OKLab → linear sRGB → sRGB → HSL
 *
 * Reference: https://bottosson.github.io/posts/oklab/
 *            https://www.w3.org/TR/css-color-4/#color-conversion-code
 */

import { readFileSync } from 'node:fs';

// ─── OKLab / OKLCH constants ───

// OKLab to linear sRGB matrix (Bottosson 2021)
const LMS_TO_LRGB = [
  [ 1.0,  0.3963377774,  0.2158037573],
  [ 1.0, -0.1055613458, -0.0638541728],
  [ 1.0, -0.0894841775, -1.2914855480],
];

const LRGB_TO_LMS = [
  [0.8189330101, 0.3618667424, -0.1288597137],
  [0.0329845436, 0.9293118715,  0.0361456387],
  [0.0482003018, 0.2643662691,  0.6338517070],
];

function oklabToLinearRGB(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return {
    r: LMS_TO_LRGB[0][0] * l + LMS_TO_LRGB[0][1] * m + LMS_TO_LRGB[0][2] * s,
    g: LMS_TO_LRGB[1][0] * l + LMS_TO_LRGB[1][1] * m + LMS_TO_LRGB[1][2] * s,
    b: LMS_TO_LRGB[2][0] * l + LMS_TO_LRGB[2][1] * m + LMS_TO_LRGB[2][2] * s,
  };
}

function linearToSRGB(c) {
  if (c < 0) return 0;
  if (c > 1) return 1;
  if (c <= 0.0031308) {
    return 12.92 * c;
  }
  return 1.055 * (c ** (1 / 2.4)) - 0.055;
}

function srgbToHSL(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return { h: 0, s: 0, l };
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h;
  switch (max) {
    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
    case g: h = (b - r) / d + 2; break;
    case b: h = (r - g) / d + 4; break;
  }
  h /= 6;

  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Parse an OKLCH color string and return HSL equivalent.
 *
 * Supports formats:
 *   oklch(L% C H)
 *   oklch(L% C H / alpha)
 *   oklch(L C H)
 *   oklch(L C H / alpha)
 *
 * @param {string} oklchStr The OKLCH color string
 * @returns {{ hsl: string, alpha: number|null }}
 */
export function oklchToHsl(oklchStr) {
  // Strip oklch() wrapper
  const inner = oklchStr
    .replace(/^oklch\(/i, '')
    .replace(/\)$/, '')
    .trim();

  // Split by whitespace (handling slash for alpha)
  const parts = inner.split(/\s+/);
  const L = parseFloat(parts[0]);
  const C = parseFloat(parts[1]);
  const H = parseFloat(parts[2]);
  const alpha = parts[3] === '/' ? (parts[4] !== undefined ? parseFloat(parts[4]) : null) : null;

  // Convert percentage lightness to 0-1 range
  const L01 = /%/.test(parts[0]) ? L / 100 : L;
  // C is absolute in OKLCH (0-0.4 typical range)
  // H is degrees (0-360)

  // OKLCH → OKLab
  const a = C * Math.cos(H * Math.PI / 180);
  const b = C * Math.sin(H * Math.PI / 180);

  // OKLab → linear sRGB
  const lrgb = oklabToLinearRGB(L01, a, b);

  // Linear sRGB → sRGB
  const r = linearToSRGB(lrgb.r);
  const g = linearToSRGB(lrgb.g);
  const b_ = linearToSRGB(lrgb.b);

  // sRGB → HSL
  const { h, s, l } = srgbToHSL(r, g, b_);

  const hRound = Math.round(h);
  const sRound = Math.round(s);
  const lRound = Math.round(l);

  if (alpha !== null && alpha !== 1) {
    return { hsl: `hsla(${hRound}, ${sRound}%, ${lRound}%, ${alpha})`, alpha };
  }
  return { hsl: `hsl(${hRound}, ${sRound}%, ${lRound}%)`, alpha: null };
}

/**
 * Replace all oklch() occurrences in a CSS string with their HSL equivalents.
 * @param {string} css
 * @returns {string}
 */
export function replaceOklchInCss(css) {
  const oklchRegex = /oklch\(([^)]*)\)/gi;
  return css.replace(oklchRegex, (match) => {
    try {
      const { hsl } = oklchToHsl(match);
      return hsl;
    } catch (e) {
      console.error(`Failed to convert: ${match}`, e.message);
      return match; // fallback to original
    }
  });
}

// ─── CLI ───

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // Read from stdin
    let input = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => { input += chunk; });
    process.stdin.on('end', () => {
      process.stdout.write(replaceOklchInCss(input));
    });
    return;
  }

  if (args[0] === '--file' && args[1]) {
    const css = readFileSync(args[1], 'utf8');
    console.log(replaceOklchInCss(css));
    return;
  }

  if (args[0] === '--help' || args[0] === '-h') {
    console.log(`
Usage:
  node scripts/convert-oklch-to-hsl.mjs < input.css > output.css
  node scripts/convert-oklch-to-hsl.mjs --file src/styling/tokens/colors.css

Converts all oklch() values in CSS to HSL equivalents.
    `.trim());
    return;
  }

  // Treat as file path
  try {
    const css = readFileSync(args[0], 'utf8');
    console.log(replaceOklchInCss(css));
  } catch (e) {
    console.error(`Error: ${e.message}`);
    process.exit(1);
  }
}

if (process.argv[1] && (process.argv[1].endsWith('convert-oklch-to-hsl.mjs'))) {
  main();
}
