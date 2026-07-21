import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

/* ── HSV / sRGB math ── */

function hsvToSrgb(H: number, S: number, V: number): [number, number, number] {
  H = ((H % 360) + 360) % 360;
  S = Math.max(0, Math.min(1, S));
  V = Math.max(0, Math.min(1, V));
  const c = V * S;
  const x = c * (1 - Math.abs(((H / 60) % 2) - 1));
  const m = V - c;
  let r, g, b;
  if (H < 60)       { r = c; g = x; b = 0; }
  else if (H < 120) { r = x; g = c; b = 0; }
  else if (H < 180) { r = 0; g = c; b = x; }
  else if (H < 240) { r = 0; g = x; b = c; }
  else if (H < 300) { r = x; g = 0; b = c; }
  else              { r = c; g = 0; b = x; }
  return [r + m, g + m, b + m];
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

function formatHex(H: number, S: number, V: number): string {
  const [r, g, b] = hsvToSrgb(H, S, V);
  const toH = (c: number) => Math.round(clamp(c, 0, 1) * 255).toString(16).padStart(2, '0');
  return `#${toH(r)}${toH(g)}${toH(b)}`.toUpperCase();
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
  return `oklch(${(L * 100).toFixed(1)}% ${(C * 100).toFixed(1)} ${hue.toFixed(0)})`;
}

function srgbInv(c: number): number {
  const a = Math.abs(c);
  return a > 0.04045 ? Math.sign(c) * Math.pow((a + 0.055) / 1.055, 2.4) : c / 12.92;
}

type Format = 'hex' | 'rgb' | 'hsl' | 'oklch';

/* ── Component ── */

@customElement('auy-comp-color-input')
export class AuyCompColorInput extends LitElement {
  static override styles = css`
    @layer components {
      :host { display: block; contain: layout style; }

      label {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
        margin-block-end: var(--auy-space-xs);
      }

      .picker {
        display: grid;
        gap: var(--auy-space-md);
        padding: var(--auy-space-md);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-lg);
      }

      /* ── Hue ring + SV triangle ── */
      .hsv-wrap {
        position: relative;
        inline-size: 100%;
        aspect-ratio: 1 / 1;
        max-block-size: 260px;
        margin-inline: auto;
        cursor: crosshair;
        touch-action: none;
      }

      .hsv-wrap canvas {
        display: block;
        inline-size: 100%;
        block-size: 100%;
      }

      .hsv-ring-indicator {
        position: absolute;
        pointer-events: none;
        inline-size: 14px; block-size: 14px;
        border: 2.5px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0,0,0,.35), 0 2px 6px rgba(0,0,0,.2);
        translate: -50% -50%;
        z-index: 2;
      }

      .hsv-tri-crosshair {
        position: absolute;
        pointer-events: none;
        inline-size: 12px; block-size: 12px;
        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0,0,0,.3), 0 2px 6px rgba(0,0,0,.2);
        translate: -50% -50%;
        z-index: 1;
      }

      /* ── Format chips ── */
      .formats { display: flex; flex-wrap: wrap; gap: var(--auy-space-2xs); }

      .format-chip {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: .2em .5em;
        font-family: var(--auy-font-mono);
        font-size: var(--auy-text-xs);
        border-radius: var(--auy-radius-sm);
        border: 1px solid var(--auy-color-border);
        background: var(--auy-color-surface-alt);
        color: var(--auy-color-text-muted);
        cursor: pointer;
        transition: background var(--auy-transition-fast), border-color var(--auy-transition-fast);
        line-height: 1.5; user-select: none;
        touch-action: manipulation; white-space: nowrap;
      }

      .format-chip:hover {
        border-color: var(--auy-color-primary);
        background: color-mix(in oklch, var(--auy-color-primary) 6%, transparent);
      }

      .format-chip:focus-visible {
        outline: .125rem solid var(--auy-color-primary);
        outline-offset: 1px;
      }

      .format-chip.copied {
        border-color: var(--auy-color-success);
        color: var(--auy-color-success);
      }

      /* ── Eyedropper ── */
      .eyedropper {
        display: inline-flex; align-items: center; justify-content: center;
        inline-size: 2rem; block-size: 2rem;
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-sm);
        background: var(--auy-color-surface);
        cursor: pointer; touch-action: manipulation;
        font-size: var(--auy-text-base); line-height: 1;
        transition: background var(--auy-transition-fast);
        flex-shrink: 0;
      }

      .eyedropper:hover { background: var(--auy-color-surface-alt); }
      .eyedropper:focus-visible { outline: .125rem solid var(--auy-color-primary); outline-offset: 2px; }

      .toolbar { display: flex; gap: var(--auy-space-sm); align-items: center; }
      .toolbar .formats { flex: 1; }

      @media (forced-colors: active) { .picker { border: 1px solid ButtonText; } }
      @media (prefers-reduced-motion: reduce) { .hsv-ring-indicator, .hsv-tri-crosshair { transition: none; } }
    }
  `;

  static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: String }) value = '#3b82f6';
  @property({ type: String }) label = '';
  @property({ type: Boolean }) showEyedropper = true;

  /* HSV internal state: H ∈ [0,360), S ∈ [0,1], V ∈ [0,1] */
  @state() private _H = 210;
  @state() private _S = 0.6;
  @state() private _V = 0.96;

  @query('.hsv-wrap canvas') private _canvas!: HTMLCanvasElement;

  private _updatingValue = false;
  private _dragTarget: 'ring' | 'tri' | null = null;

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('value') && !this._updatingValue) {
      if (/^#[0-9a-f]{6}$/i.test(this.value)) {
        const [H, S, V] = hexToHsv(this.value);
        this._H = H; this._S = S; this._V = V;
        this._scheduleRender();
      }
    }
  }

  override firstUpdated() { this._draw(); }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('_H') || changed.has('_S') || changed.has('_V')) {
      this._draw();
      this._syncValue();
    }
  }

  private _syncValue() {
    if (this._updatingValue) return;
    this._updatingValue = true;
    const hex = formatHex(this._H, this._S, this._V);
    this.value = hex;
    this._updatingValue = false;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: hex, hsv: { H: this._H, S: this._S, V: this._V } },
      bubbles: true, composed: true,
    }));
  }

  /* ── Drawing ── */

  private _drawPending = false;
  private _scheduleRender() {
    if (this._drawPending) return;
    this._drawPending = true;
    requestAnimationFrame(() => {
      this._drawPending = false;
      this._draw();
    });
  }

  private _draw() {
    const cvs = this._canvas;
    if (!cvs?.parentElement) return;
    const rect = cvs.parentElement.getBoundingClientRect();
    const dpr = devicePixelRatio || 1;
    const w = Math.round(rect.width * dpr), h = Math.round(rect.height * dpr);
    if (!w || !h) return;
    cvs.width = w; cvs.height = h;
    const ctx = cvs.getContext('2d');
    if (!ctx) return;

    const cx = w / 2, cy = h / 2;
    const half = Math.min(cx, cy);
    const rOuter = half * 0.96;
    const rInner = half * 0.70;
    const ri = rInner - 1;

    /* Triangle vertices */
    const triTop   : [number, number] = [cx, cy - ri * 0.82];
    const triLeft  : [number, number] = [cx - ri * 0.72, cy + ri * 0.48];
    const triRight : [number, number] = [cx + ri * 0.72, cy + ri * 0.48];
    const triDenom = (triLeft[1] - triRight[1]) * (triTop[0] - triRight[0]) + (triRight[0] - triLeft[0]) * (triTop[1] - triRight[1]);

    const curH = this._H;

    /* ── Render pixel data into an ImageData ── */
    const img = ctx.createImageData(w, h);
    const d = img.data;

    for (let x = 0; x < w; x++) {
      for (let y = 0; y < h; y++) {
        const dx = x - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let r = 0, g = 0, b = 0, a = 0;

        /* Ring */
        if (dist >= rInner && dist <= rOuter) {
          const H = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
          [r, g, b] = hsvToSrgb(H, 1, 1);
          a = 255;
        }

        /* Triangle (overrides ring hole) */
        if (dist < rInner) {
          const w0 = ((triLeft[1] - triRight[1]) * (x - triRight[0]) + (triRight[0] - triLeft[0]) * (y - triRight[1])) / triDenom;
          const w1 = ((triRight[1] - triTop[1]) * (x - triRight[0]) + (triTop[0] - triRight[0]) * (y - triRight[1])) / triDenom;
          const w2 = 1 - w0 - w1;
          if (w0 >= 0 && w1 >= 0 && w2 >= 0) {
            const S = w1 + w2;
            const V = w0 + w2;
            [r, g, b] = hsvToSrgb(curH, clamp(S, 0, 1), clamp(V, 0, 1));
            a = 255;
          }
        }

        const i = (y * w + x) * 4;
        d[i] = clamp(r * 255, 0, 255);
        d[i+1] = clamp(g * 255, 0, 255);
        d[i+2] = clamp(b * 255, 0, 255);
        d[i+3] = a;
      }
    }

    /* ── Draw on canvas with clipped AA ── */
    ctx.clearRect(0, 0, w, h);

    /* Offscreen canvas for pixel data (for clip-friendliness) */
    const off = document.createElement('canvas');
    off.width = w; off.height = h;
    const offCtx = off.getContext('2d')!;
    offCtx.putImageData(img, 0, 0);

    /* Clip ring donut + draw from offscreen */
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
    ctx.arc(cx, cy, rInner, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(off, 0, 0);
    ctx.restore();

    /* Clip triangle + draw from offscreen */
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(triTop[0], triTop[1]);
    ctx.lineTo(triLeft[0], triLeft[1]);
    ctx.lineTo(triRight[0], triRight[1]);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(off, 0, 0);
    ctx.restore();

    cvs.style.inlineSize = `${rect.width}px`;
    cvs.style.blockSize = `${rect.height}px`;
  }

  /* ── Interactions ── */

  private _pt(e: MouseEvent | TouchEvent) { return 'touches' in e ? e.touches[0] : e; }

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

    /* Triangle vertices in pixel coords */
    const triTop    = [cx, cy - ri * 0.82];
    const triLeft   = [cx - ri * 0.72, cy + ri * 0.48];
    const triRight  = [cx + ri * 0.72, cy + ri * 0.48];

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

  private _onDragEnd() { this._dragTarget = null; }

  /* ── Indicator positions ── */

  private _ringIndicatorX(): number {
    const wrap = this._canvas?.parentElement;
    if (!wrap) return 50;
    const rect = wrap.getBoundingClientRect();
    const half = Math.min(rect.width, rect.height) / 2;
    const r = ((half * 0.96) + (half * 0.70)) / 2;
    const cx = rect.width / 2;
    const rad = this._H * Math.PI / 180;
    return ((cx + r * Math.cos(rad)) / rect.width) * 100;
  }

  private _ringIndicatorY(): number {
    const wrap = this._canvas?.parentElement;
    if (!wrap) return 50;
    const rect = wrap.getBoundingClientRect();
    const half = Math.min(rect.width, rect.height) / 2;
    const r = ((half * 0.96) + (half * 0.70)) / 2;
    const cy = rect.height / 2;
    const rad = this._H * Math.PI / 180;
    return ((cy + r * Math.sin(rad)) / rect.height) * 100;
  }

  private _triCrosshairX(): number {
    const wrap = this._canvas?.parentElement;
    if (!wrap) return 50;
    const rect = wrap.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    const half = Math.min(cx, cy);
    const ri = half * 0.70 - 2;
    const S = this._S, V = this._V;
    let w0 = 1 - S, w1 = 1 - V, w2 = S + V - 1;
    const sum = w0 + w1 + w2;
    if (sum <= 0) { w0 = 1/3; w1 = 1/3; w2 = 1/3; }
    else { w0 /= sum; w1 /= sum; w2 /= sum; }
    const px = w0 * cx + w1 * (cx - ri * 0.72) + w2 * (cx + ri * 0.72);
    return (px / rect.width) * 100;
  }

  private _triCrosshairY(): number {
    const wrap = this._canvas?.parentElement;
    if (!wrap) return 50;
    const rect = wrap.getBoundingClientRect();
    const cx = rect.width / 2, cy = rect.height / 2;
    const half = Math.min(cx, cy);
    const ri = half * 0.70 - 2;
    const S = this._S, V = this._V;
    let w0 = 1 - S, w1 = 1 - V, w2 = S + V - 1;
    const sum = w0 + w1 + w2;
    if (sum <= 0) { w0 = 1/3; w1 = 1/3; w2 = 1/3; }
    else { w0 /= sum; w1 /= sum; w2 /= sum; }
    const py = w0 * (cy - ri * 0.82) + w1 * (cy + ri * 0.48) + w2 * (cy + ri * 0.48);
    return (py / rect.height) * 100;
  }

  /* ── Format chips ── */

  private _fmt(f: Format): string {
    switch (f) {
      case 'hex': return formatHex(this._H, this._S, this._V);
      case 'rgb': return formatRgb(this._H, this._S, this._V);
      case 'hsl': return formatHsl(this._H, this._S, this._V);
      case 'oklch': return formatOklch(this._H, this._S, this._V);
    }
  }

  private async _copy(f: Format, e: Event) {
    try {
      await navigator.clipboard.writeText(this._fmt(f));
    } catch { /* ignore */ }
    (e.currentTarget as HTMLElement).focus();
    this.dispatchEvent(new CustomEvent('copy-' + f, { bubbles: true, composed: true }));
  }

  private async _pickEyedropper() {
    if (!('EyeDropper' in window)) return;
    try {
      const eye = new (window as any).EyeDropper();
      const r = await eye.open();
      if (r?.sRGBHex) {
        const [H, S, V] = hexToHsv(r.sRGBHex);
        this._H = H; this._S = S; this._V = V;
        this._scheduleRender();
      }
    } catch { /* user cancelled */ }
  }

  override render() {
    const chips: Format[] = ['hex', 'rgb', 'hsl', 'oklch'];

    return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div part="picker" class="picker">
        <div class="hsv-wrap"
          @mousedown=${this._onDown} @mousemove=${this._onMove}
          @mouseup=${this._onDragEnd} @mouseleave=${this._onDragEnd}
          @touchstart=${this._onDown} @touchmove=${this._onMove}
          @touchend=${this._onDragEnd}
        >
          <canvas></canvas>
          <div class="hsv-ring-indicator"
            style="inset-inline-start:${this._ringIndicatorX()}%;inset-block-start:${this._ringIndicatorY()}%;">
          </div>
          <div class="hsv-tri-crosshair"
            style="inset-inline-start:${this._triCrosshairX()}%;inset-block-start:${this._triCrosshairY()}%;">
          </div>
        </div>

        <div class="toolbar">
          <div class="formats">
            ${chips.map(f => html`
              <span class="format-chip" @click=${(e: Event) => this._copy(f, e)} role="button" tabindex="0" aria-label="Copiar ${f.toUpperCase()}" title="Clique para copiar">
                <span style="font-weight:600;color:var(--auy-color-text);">${f.toUpperCase()}</span>
                ${this._fmt(f)}
              </span>
            `)}
          </div>
          ${this.showEyedropper && 'EyeDropper' in window ? html`
            <button class="eyedropper" @click=${this._pickEyedropper} aria-label="Pipeta" title="Selecionar cor da tela">💉</button>
          ` : nothing}
        </div>
      </div>
    `;
  }
}
