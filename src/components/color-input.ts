import { LitElement, html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { DataAwareMixin } from './_internal/data-aware.mixin.ts';
import { t } from './_internal/locale.ts';

/* ── Color math ── */

function hsvToSrgb(H: number, S: number, V: number): [number, number, number] {
  H = ((H % 360) + 360) % 360;
  S = Math.max(0, Math.min(1, S));
  V = Math.max(0, Math.min(1, V));
  if (S === 0) return [V, V, V];
  const c = V * S;
  const x = c * (1 - Math.abs(((H / 60) % 2) - 1));
  const m = V - c;
  const h = H / 60;
  if (h < 1) return [c + m, x + m, m];
  if (h < 2) return [x + m, c + m, m];
  if (h < 3) return [m, c + m, x + m];
  if (h < 4) return [m, x + m, c + m];
  if (h < 5) return [x + m, m, c + m];
  return [c + m, m, x + m];
}

function srgbToHsv(r: number, g: number, b: number): [number, number, number] {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const d = mx - mn;
  let H = 0;
  if (d !== 0) {
    if (mx === r) H = ((g - b) / d + 6) % 6;
    else if (mx === g) H = (b - r) / d + 2;
    else H = (r - g) / d + 4;
    H *= 60;
  }
  const S = mx === 0 ? 0 : d / mx;
  return [H, S, mx];
}

function hexToSrgb(hex: string): [number, number, number] {
  const m = hex.replace(/^#/, '').match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
  if (!m) return [0.23, 0.6, 0.96];
  return [parseInt(m[1], 16) / 255, parseInt(m[2], 16) / 255, parseInt(m[3], 16) / 255];
}

function hexToHsv(hex: string): [number, number, number] {
  return srgbToHsv(...hexToSrgb(hex));
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

function toHex(c: number) { return Math.round(clamp(c, 0, 1) * 255).toString(16).padStart(2, '0'); }

function formatHex(H: number, S: number, V: number): string {
  const [r, g, b] = hsvToSrgb(H, S, V);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function formatRgb(H: number, S: number, V: number): string {
  const [r, g, b] = hsvToSrgb(H, S, V);
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}

function formatHsl(H: number, S: number, V: number): string {
  const [r, g, b] = hsvToSrgb(H, S, V);
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
  const l = (mx + mn) / 2;
  if (mx === mn) return `hsl(0, 0%, ${Math.round(l * 100)}%)`;
  const d = mx - mn;
  const s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h = 0;
  if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
  else if (mx === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

function srgbInv(c: number): number {
  const a = Math.abs(c);
  return a > 0.04045 ? Math.sign(c) * Math.pow((a + 0.055) / 1.055, 2.4) : c / 12.92;
}

function srgbFwd(c: number): number {
  const a = Math.abs(c);
  return a > 0.0031308 ? Math.sign(c) * (1.055 * Math.pow(a, 1 / 2.4) - 0.055) : c * 12.92;
}

function formatOklch(H: number, S: number, V: number): string {
  const [r, g, b] = hsvToSrgb(H, S, V);
  const [rr, gg, bb] = [srgbInv(r), srgbInv(g), srgbInv(b)];
  const l = Math.cbrt(0.4122214708 * rr + 0.5363325363 * gg + 0.0514459929 * bb);
  const m = Math.cbrt(0.2119034982 * rr + 0.6806995451 * gg + 0.1073969566 * bb);
  const s = Math.cbrt(0.0883024619 * rr + 0.2817188376 * gg + 0.6299787005 * bb);
  const L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s;
  const cb = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s;
  const C = Math.sqrt(a * a + cb * cb);
  let hue = Math.atan2(cb, a) * (180 / Math.PI);
  if (hue < 0) hue += 360;
  return `oklch(${(L * 100).toFixed(1)}% ${(C * 100).toFixed(2)} ${hue.toFixed(0)})`;
}

function parseOklch(s: string): { L: number; C: number; H: number } | null {
  const m = s.match(/oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!m) return null;
  return { L: parseFloat(m[1]) / 100, C: parseFloat(m[2]) / 100, H: parseFloat(m[3]) };
}

function oklchToSrgb(L: number, C: number, H: number): [number, number, number] {
  const a = C * Math.cos(H * Math.PI / 180);
  const b = C * Math.sin(H * Math.PI / 180);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
  const ll = l_ * l_ * l_;
  const mm = m_ * m_ * m_;
  const ss = s_ * s_ * s_;
  const r = 4.0767416621 * ll - 3.3077115913 * mm + 0.2309699292 * ss;
  const g = -1.2684380046 * ll + 2.6097574011 * mm - 0.3413193965 * ss;
  const b_ = -0.0041960863 * ll - 0.7034186147 * mm + 1.7076147010 * ss;
  return [srgbFwd(r), srgbFwd(g), srgbFwd(b_)];
}

type Format = 'hex' | 'rgb' | 'hsl' | 'oklch';

/* ── Component ── */

/**
 * Color picker component with HSV ring/triangle, alpha, and recent colors.
 *
 * @element auy-comp-color-input
 *
 * @property {string} value - The current color value (hex or oklch).
 * @property {string} label - Optional label text.
 * @property {boolean} showEyedropper - Whether to show the eyedropper button (default true).
 * @property {boolean} showAlpha - Whether to show the alpha slider (default true).
 * @property {boolean} showRecent - Whether to show recent colors (default true).
 * @property {number} recentCount - Max number of recent colors to show (default 8).
 *
 * @state {number} _H - Hue (0-360).
 * @state {number} _S - Saturation (0-1).
 * @state {number} _V - Value (0-1).
 * @state {number} _alpha - Alpha channel (0-1).
 * @state {Format|null} _copiedFormat - Format currently shown as copied.
 * @state {string[]} _recent - Recently picked hex colors.
 *
 * @fires {CustomEvent} change - Dispatched when color changes. Detail includes hex, oklch, rgb, hsl, hsv, alpha.
 *
 * @csspart picker - The picker container.
 * @csspart label - The label element.
 */
@customElement('auy-comp-color-input')
export class AuyCompColorInput extends DataAwareMixin(LitElement) {
  override createRenderRoot() { return this; }

  static override get observedDataEvents(): string[] {
    return ['change']
  }

  @property({ type: String }) value = '#3B82F6';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) showEyedropper = true;
  @property({ type: Boolean }) showAlpha = true;
  @property({ type: Boolean }) showRecent = true;
  @property({ type: Number }) recentCount = 8;

  protected override _parseResponse(data: unknown): void {
    const d = data as Record<string, string>
    if (d.value) this.value = d.value
  }

  @state() private _H = hexToHsv('#3B82F6')[0];
  @state() private _S = hexToHsv('#3B82F6')[1];
  @state() private _V = hexToHsv('#3B82F6')[2];
  @state() private _alpha = 1;
  @state() private _copiedFormat: Format | null = null;
  @state() private _recent: string[] = [];

  @query('.hsv-wrap canvas') private _canvas!: HTMLCanvasElement;

  private _prevValue = '';
  private _dragTarget: 'ring' | 'tri' | null = null;
  private _pendingRecent: string | null = null;
  private _updatingValue = false;

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('value') && !this._updatingValue) {
      const parsed = this._parseValue(this.value);
      if (parsed) {
        this._H = parsed.H; this._S = parsed.S; this._V = parsed.V;
        this._prevValue = this._fmtHex();
        this._scheduleDraw();
      }
    }
  }

  private _parseValue(val: string): { H: number; S: number; V: number } | null {
    if (/^#[0-9a-f]{6}$/i.test(val)) {
      const [H, S, V] = hexToHsv(val);
      return { H, S, V };
    }
    const oklch = parseOklch(val);
    if (oklch) {
      const [r, g, b] = oklchToSrgb(oklch.L, oklch.C, oklch.H);
      const [H, S, V] = srgbToHsv(clamp(r, 0, 1), clamp(g, 0, 1), clamp(b, 0, 1));
      return { H, S, V };
    }
    return null;
  }

  override firstUpdated() {
    this._prevValue = this._fmtHex();
    this._draw();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('_H') || changed.has('_S') || changed.has('_V')) {
      this._draw();
      this._syncValue();
    }
  }

  private _syncValue() {
    if (this._updatingValue) return;
    const hex = this._fmtHex();
    if (this.value === hex) return;
    this._updatingValue = true;
    this.value = hex;
    this._updatingValue = false;

    this._prevValue = hex;
    this._pendingRecent = hex;

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        hex,
        oklch: this._fmtOklch(),
        rgb: this._fmtRgb(),
        hsl: this._fmtHsl(),
        hsv: { H: this._H, S: this._S, V: this._V },
        alpha: this._alpha,
      },
      bubbles: true, composed: true,
    }));
  }

  private _schedulePending = false;
  private _scheduleDraw() {
    if (this._schedulePending) return;
    this._schedulePending = true;
    requestAnimationFrame(() => {
      this._schedulePending = false;
      this._draw();
    });
  }

  /* ── Canvas drawing ── */

  private _draw() {
    const cvs = this._canvas;
    if (!cvs?.parentElement) return;
    const rect = cvs.parentElement.getBoundingClientRect();
    const dpr = devicePixelRatio || 1;
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);
    if (!w || !h) return;
    cvs.width = w;
    cvs.height = h;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const cx = w / 2, cy = h / 2;
    const half = Math.min(cx, cy);
    const rOuter = half * 0.88;

    const rInner = half * 0.64;
    const ri = rInner - 2;

    ctx.imageSmoothingEnabled = true;

    /* ── Ring: conic gradient (anti-aliased by canvas API) ── */
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
    ctx.arc(cx, cy, rInner, 0, Math.PI * 2, true);
    ctx.closePath();

    const cg = ctx.createConicGradient(0, cx, cy);
    for (let h = 0; h <= 360; h += 30) {
      const [r, g, b] = hsvToSrgb(h, 1, 1);
      cg.addColorStop(h / 360, `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`);
    }
    ctx.fillStyle = cg;
    ctx.fill();
    ctx.restore();

    /* ── Triangle: ImageData with edge anti-aliasing ── */
    const triTop: [number, number] = [cx, cy - ri * 0.82];
    const triLeft: [number, number] = [cx - ri * 0.72, cy + ri * 0.48];
    const triRight: [number, number] = [cx + ri * 0.72, cy + ri * 0.48];
    const triDenom =
      (triLeft[1] - triRight[1]) * (triTop[0] - triRight[0]) +
      (triRight[0] - triLeft[0]) * (triTop[1] - triRight[1]);

    const curH = this._H;
    const featherPx = 1.2 * dpr;
    const triHeight = ri * 1.30;

    const img = ctx.createImageData(w, h);
    const d = img.data;

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const dx = x - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let pr = 0, pg = 0, pb = 0, pa = 0;

        if (dist < rInner) {
          const w0 = ((triLeft[1] - triRight[1]) * (x - triRight[0]) + (triRight[0] - triLeft[0]) * (y - triRight[1])) / triDenom;
          const w1 = ((triRight[1] - triTop[1]) * (x - triRight[0]) + (triTop[0] - triRight[0]) * (y - triRight[1])) / triDenom;
          const w2 = 1 - w0 - w1;

          const minW = Math.min(w0, w1, w2);
          const edgeDist = minW * triHeight;

          if (edgeDist > -featherPx) {
            let alpha = 255;
            if (edgeDist < featherPx) {
              alpha = Math.round(clamp((edgeDist + featherPx) / (2 * featherPx), 0, 1) * 255);
            }
            if (alpha > 0) {
              const S = clamp(w1 + w2, 0, 1);
              const V = clamp(w0 + w2, 0, 1);
              [pr, pg, pb] = hsvToSrgb(curH, S, V);
              pa = alpha;
            }
          }
        }

        const i = (y * w + x) * 4;
        d[i] = clamp(pr * 255, 0, 255);
        d[i + 1] = clamp(pg * 255, 0, 255);
        d[i + 2] = clamp(pb * 255, 0, 255);
        d[i + 3] = pa;
      }
    }

    // Composite triangle over ring via source-over (transparent pixels pass through)
    const off = document.createElement('canvas');
    off.width = w;
    off.height = h;
    const offCtx = off.getContext('2d')!;
    offCtx.putImageData(img, 0, 0);
    ctx.drawImage(off, 0, 0);
  }

  /* ── Drag handling ── */

  private _pt(e: MouseEvent | TouchEvent) {
    return 'touches' in e ? e.touches[0] : e;
  }

  private _onDown(e: MouseEvent | TouchEvent) {
    const rect = this._canvas.parentElement!.getBoundingClientRect();
    const pt = this._pt(e);
    const cx = rect.width / 2, cy = rect.height / 2;
    const dx = (pt.clientX - rect.left) - cx, dy = (pt.clientY - rect.top) - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const half = Math.min(cx, cy);
    const rInner = half * 0.70;
    const rOuter = half * 0.96;

    if (dist >= rInner && dist <= rOuter) {
      this._dragTarget = 'ring';
      this._updateRing(e);
    } else if (dist < rInner) {
      this._dragTarget = 'tri';
      this._updateTri(e);
    } else {
      this._dragTarget = null;
    }
  }

  private _onMove(e: MouseEvent | TouchEvent) {
    if (this._dragTarget === 'ring') this._updateRing(e);
    else if (this._dragTarget === 'tri') this._updateTri(e);
  }

  private _onDragEnd() {
    this._dragTarget = null;
    if (this._pendingRecent) {
      const hex = this._fmtHex();
      if (this._prevValue && this._prevValue !== hex) {
        this._addRecent(this._prevValue);
      }
      this._prevValue = hex;
      this._pendingRecent = null;
    }
  }

  private _updateRing(e: MouseEvent | TouchEvent) {
    const rect = this._canvas.parentElement!.getBoundingClientRect();
    const pt = this._pt(e);
    const cx = rect.width / 2, cy = rect.height / 2;
    const dx = (pt.clientX - rect.left) - cx, dy = (pt.clientY - rect.top) - cy;
    this._H = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
  }

  private _updateTri(e: MouseEvent | TouchEvent) {
    const rect = this._canvas.parentElement!.getBoundingClientRect();
    const pt = this._pt(e);
    const x = pt.clientX - rect.left, y = pt.clientY - rect.top;
    const w = rect.width, h = rect.height;
    const cx = w / 2, cy = h / 2;
    const half = Math.min(cx, cy);
    const ri = half * 0.70 - 2;

    const triTop = [cx, cy - ri * 0.82];
    const triLeft = [cx - ri * 0.72, cy + ri * 0.48];
    const triRight = [cx + ri * 0.72, cy + ri * 0.48];

    const denom = (triLeft[1] - triRight[1]) * (triTop[0] - triRight[0]) + (triRight[0] - triLeft[0]) * (triTop[1] - triRight[1]);
    let w0 = ((triLeft[1] - triRight[1]) * (x - triRight[0]) + (triRight[0] - triLeft[0]) * (y - triRight[1])) / denom;
    let w1 = ((triRight[1] - triTop[1]) * (x - triRight[0]) + (triTop[0] - triRight[0]) * (y - triRight[1])) / denom;
    let w2 = 1 - w0 - w1;

    w0 = clamp(w0, 0, 1); w1 = clamp(w1, 0, 1); w2 = clamp(w2, 0, 1);
    const sum = w0 + w1 + w2;
    if (sum <= 0) return;
    w0 /= sum; w1 /= sum; w2 /= sum;

    this._S = clamp(w1 + w2, 0, 1);
    this._V = clamp(w0 + w2, 0, 1);
    if (this._S === 0) this._H = 0;
  }

  /* ── Indicator positions ── */

  private _ringIndicatorPct(): [number, number] {
    const wrap = this._canvas?.parentElement;
    if (!wrap) return [50, 50];
    const rect = wrap.getBoundingClientRect();
    const half = Math.min(rect.width, rect.height) / 2;
    const r = (half * 0.96 + half * 0.70) / 2;
    const rad = this._H * Math.PI / 180;
    return [
      ((rect.width / 2 + r * Math.cos(rad)) / rect.width) * 100,
      ((rect.height / 2 + r * Math.sin(rad)) / rect.height) * 100,
    ];
  }

  private _triIndicatorPct(): [number, number] {
    const wrap = this._canvas?.parentElement;
    if (!wrap) return [50, 50];
    const rect = wrap.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    const half = Math.min(cx, cy);
    const ri = half * 0.70 - 2;
    const S = this._S, V = this._V;
    let w0 = 1 - S, w1 = 1 - V, w2 = S + V - 1;
    const sum = w0 + w1 + w2;
    if (sum <= 0) { w0 = 1 / 3; w1 = 1 / 3; w2 = 1 / 3; }
    else { w0 /= sum; w1 /= sum; w2 /= sum; }
    return [
      ((w0 * cx + w1 * (cx - ri * 0.72) + w2 * (cx + ri * 0.72)) / rect.width) * 100,
      ((w0 * (cy - ri * 0.82) + w1 * (cy + ri * 0.48) + w2 * (cy + ri * 0.48)) / rect.height) * 100,
    ];
  }

  /* ── Format helpers ── */

  private _fmtHex() { return formatHex(this._H, this._S, this._V); }
  private _fmtRgb() { return formatRgb(this._H, this._S, this._V); }
  private _fmtHsl() { return formatHsl(this._H, this._S, this._V); }
  private _fmtOklch() { return formatOklch(this._H, this._S, this._V); }

  private _fmt(f: Format): string {
    switch (f) {
      case 'hex': return this._fmtHex();
      case 'rgb': return this._fmtRgb();
      case 'hsl': return this._fmtHsl();
      case 'oklch': return this._fmtOklch();
    }
  }

  /* ── Clipboard ── */

  private async _copy(f: Format, e: Event) {
    const target = e.currentTarget as HTMLElement | null;
    try {
      await navigator.clipboard.writeText(this._fmt(f));
    } catch { /* ignore */ }
    target?.focus();
    this._copiedFormat = f;
    setTimeout(() => {
      if (this._copiedFormat === f) this._copiedFormat = null;
    }, 1400);
  }

  /* ── Eye dropper ── */

  private async _pickEyedropper() {
    if (!('EyeDropper' in window)) return;
    try {
      const eye = new (window as any).EyeDropper();
      const r = await eye.open();
      if (r?.sRGBHex) {
        const hex = r.sRGBHex.toUpperCase();
        if (this._prevValue && this._prevValue !== hex) {
          this._addRecent(this._prevValue);
        }
        const [H, S, V] = hexToHsv(hex);
        this._H = H; this._S = S; this._V = V;
        this._prevValue = hex;
        this._scheduleDraw();
      }
    } catch { /* user cancelled */ }
  }

  /* ── Hex input ── */

  private _onHexInput(e: InputEvent) {
    const val = (e.target as HTMLInputElement).value;
    const clean = val.replace(/[^0-9a-fA-F]/g, '').slice(0, 6);
    if (clean.length === 6) {
      const hex = '#' + clean.toUpperCase();
      if (this._prevValue && this._prevValue !== hex) {
        this._addRecent(this._prevValue);
      }
      const [H, S, V] = hexToHsv(hex);
      this._H = H; this._S = S; this._V = V;
      this._prevValue = hex;
      this._scheduleDraw();
    }
  }

  /* ── Alpha ── */

  private _onAlphaRange(e: Event) {
    this._alpha = parseFloat((e.target as HTMLInputElement).value);
  }

  /* ── Recent ── */

  private _addRecent(hex: string) {
    const idx = this._recent.indexOf(hex);
    if (idx >= 0) {
      this._recent = [hex, ...this._recent.slice(0, idx), ...this._recent.slice(idx + 1)];
      return;
    }
    this._recent = [hex, ...this._recent.slice(0, this.recentCount - 1)];
  }

  private _selectRecent(hex: string) {
    if (this._prevValue && this._prevValue !== hex) {
      this._addRecent(this._prevValue);
    }
    const [H, S, V] = hexToHsv(hex);
    this._H = H; this._S = S; this._V = V;
    this._prevValue = hex;
    this._scheduleDraw();
  }

  override render() {
    const chips: Format[] = ['oklch', 'hex', 'rgb', 'hsl'];
    const hex = this._fmtHex();
    const [rr, gg, bb] = hexToSrgb(hex);
    const rgbaColor = `rgba(${Math.round(rr * 255)},${Math.round(gg * 255)},${Math.round(bb * 255)},${this._alpha})`;
    const [rx, ry] = this._ringIndicatorPct();
    const [tx, ty] = this._triIndicatorPct();
    const alphaPct = Math.round(this._alpha * 100);

    return html`
      ${this.label ? html`<label data-part="label">${this.label}</label>` : nothing}
      <div data-element="color-input" data-part="picker" class="picker" style="--_tri-dot:${hex};--_ring-glow:${hex}40;">

        <div class="hsv-wrap"
          @mousedown=${this._onDown} @mousemove=${this._onMove}
          @mouseup=${this._onDragEnd} @mouseleave=${this._onDragEnd}
          @touchstart=${this._onDown} @touchmove=${this._onMove}
          @touchend=${this._onDragEnd}
        >
          <canvas></canvas>
          <div class="ring-indicator"
            style="inset-inline-start:${rx}%;inset-block-start:${ry}%;">
          </div>
          <div class="tri-indicator"
            style="inset-inline-start:${tx}%;inset-block-start:${ty}%;">
          </div>
        </div>

        <div class="preview-row">
          <div class="preview-stack">
            <div class="preview-swatch old" style="background:${this._prevValue || hex}"></div>
            <div class="preview-swatch" style="background:${rgbaColor}"></div>
          </div>
          <input class="hex-input"
            .value=${hex}
            @input=${this._onHexInput}
            placeholder=${t('colorPlaceholder')}
            spellcheck="false"
            autocomplete="off"
            aria-label=${t('colorHexLabel')}
          />
        </div>

        ${this.showAlpha ? html`
          <div class="alpha-row">
            <div class="alpha-track-wrap">
              <div class="alpha-track-bg" style="background:linear-gradient(to right, transparent, ${hex})"></div>
              <input class="alpha-range" type="range" min="0" max="1" step="0.01" .value=${this._alpha} @input=${this._onAlphaRange} aria-label=${t('colorAlphaLabel')} />
            </div>
            <span class="alpha-label">${alphaPct}%</span>
          </div>
        ` : nothing}

        <div class="toolbar">
          <div class="formats">
            ${chips.map(f => html`
              <span class="format-chip ${f === 'oklch' ? 'oklch-chip' : ''} ${this._copiedFormat === f ? 'copied' : ''}"
                @click=${(e: Event) => this._copy(f, e)}
                role="button" tabindex="0"
                aria-label=${t('colorCopy', { format: f.toUpperCase() })}
                title=${t('colorCopyTitle')}
              >
                <span class="chip-swatch" style="background:${hex}"></span>
                <span class="chip-label">${this._copiedFormat === f ? '✓' : f.toUpperCase()}</span>
                <span class="chip-value">${this._copiedFormat === f ? t('colorCopied') : this._fmt(f)}</span>
              </span>
            `)}
          </div>
          ${this.showEyedropper && 'EyeDropper' in window ? html`
            <button class="eyedropper" @click=${this._pickEyedropper} aria-label=${t('colorEyedropper')} title=${t('colorEyedropperTitle')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 22l1-1h3l9-9"/>
                <path d="M3 21l9-9"/>
                <path d="M15 7.5l1.5-1.5a2.5 2.5 0 013.5 3.5L14 16h-3l-2-2 6-6.5z"/>
                <path d="M18.5 5.5L21 3"/>
              </svg>
            </button>
          ` : nothing}
        </div>

        ${this.showRecent && this._recent.length ? html`
          <div class="recent-row">
            <span class="recent-label">${t('colorRecent')}</span>
            ${this._recent.slice(0, this.recentCount).map(c => html`
              <button class="recent-swatch" style="background:${c}" @click=${() => this._selectRecent(c)} aria-label=${c} title=${c}></button>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
  }
}
