#!/usr/bin/env node
/**
 * Converts OKLCH colors to HSL for fallback CSS generation.
 * Usage: node scripts/convert-colors.mjs [input.css] [output.css]
 */
import fs from 'fs';
import { readFile, writeFile } from 'fs/promises';

// Simple OKLCH to sRGB to HSL conversion
// Reference: https://bottosson.github.io/posts/oklab/

function oklchToHsl(L, C, H) {
  // Convert to OKLab
  const a = C * Math.cos(H * Math.PI / 180);
  const b = C * Math.sin(H * Math.PI / 180);
  const l_ = L;

  // OKLab to linear sRGB
  const l = l_ + 0.3963377774 * a + 0.2158037573 * b;
  const m = l_ - 0.1055613458 * a - 0.0638541728 * b;
  const s = l_ - 0.0894841775 * a - 1.2914855480 * b;

  const l2 = l * l * l;
  const m2 = m * m * m;
  const s2 = s * s * s;

  let r =  4.0767416621 * l2 - 3.3077115913 * m2 + 0.2309699292 * s2;
  let g = -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193965 * s2;
  let b_ = -0.0041960863 * l2 - 0.7034186147 * m2 + 1.7076147010 * s2;

  r = Math.min(Math.max(r, 0), 1);
  g = Math.min(Math.max(g, 0), 1);
  b_ = Math.min(Math.max(b_, 0), 1);

  // linear sRGB to sRGB
  const gamma = (c) => c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1/2.4) - 0.055;
  const r8 = Math.round(gamma(r) * 255);
  const g8 = Math.round(gamma(g) * 255);
  const b8 = Math.round(gamma(b_) * 255);

  // sRGB to HSL
  const rN = r8 / 255, gN = g8 / 255, bN = b8 / 255;
  const max = Math.max(rN, gN, bN), min = Math.min(rN, gN, bN);
  const lHsl = (max + min) / 2;

  if (max === min) return { h: 0, s: 0, l: Math.round(lHsl * 100), hsl: `hsl(0, 0%, ${Math.round(lHsl * 100)}%)` };

  const d = max - min;
  const sHsl = lHsl > 0.5 ? d / (2 - max - min) : d / (max + min);
  let hHsl = 0;
  if (max === rN) hHsl = ((gN - bN) / d + (gN < bN ? 6 : 0)) * 60;
  else if (max === gN) hHsl = ((bN - rN) / d + 2) * 60;
  else hHsl = ((rN - gN) / d + 4) * 60;

  return {
    h: Math.round(hHsl),
    s: Math.round(sHsl * 100),
    l: Math.round(lHsl * 100),
    hsl: `hsl(${Math.round(hHsl)}, ${Math.round(sHsl * 100)}%, ${Math.round(lHsl * 100)}%)`
  };
}

// Parse oklch(L% C H) format
function parseOklch(input) {
  const match = input.match(/oklch\((\d+(?:\.\d+)?%)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)/);
  if (!match) return null;
  return {
    L: parseFloat(match[1]) / 100,
    C: parseFloat(match[2]),
    H: parseFloat(match[3])
  };
}

// Main
const inputFile = process.argv[2];
if (!inputFile) {
  console.log('Usage: node scripts/convert-colors.mjs <input.css>');
  console.log('Reads a CSS file, finds oklch() values, and prints HSL equivalents.');
  process.exit(0);
}

const css = fs.readFileSync(inputFile, 'utf8');
const oklchRegex = /oklch\(([^)]*)\)/g;
let match;
while ((match = oklchRegex.exec(css)) !== null) {
  const parsed = parseOklch(match[0]);
  if (parsed) {
    const hsl = oklchToHsl(parsed.L, parsed.C, parsed.H);
    console.log(`${match[0].padEnd(45)} \u2192 ${hsl.hsl}`);
  }
}
