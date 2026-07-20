import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export const A11Y_STORAGE_KEY = 'auy_a11y';

export interface SkipLink {
  href: string;
  label: string;
}

interface A11yState {
  fontSize: number;
  contrast: boolean;
  dyslexia: boolean;
  readingGuide: 'off' | 'window' | 'marker';
  cursor: boolean;
  highlightLinks: boolean;
  spacing: number;
  noAnimations: boolean;
}

const DEFAULT_STATE: A11yState = {
  fontSize: 100,
  contrast: false,
  dyslexia: false,
  readingGuide: 'off',
  cursor: false,
  highlightLinks: false,
  spacing: 0,
  noAnimations: false,
};

function loadState(): A11yState {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch { /* ignore */ }
  return { ...DEFAULT_STATE };
}

function persistState(state: A11yState) {
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(state));
}

export function injectAccessibilityStyles() {
  if (document.getElementById('auy-a11y-global-css')) return;

  const cursorSvg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48">',
    '<circle cx="24" cy="24" r="22" fill="none" stroke="#000" stroke-width="4"/>',
    '<circle cx="24" cy="24" r="4" fill="#000"/>',
    '<line x1="24" y1="2" x2="24" y2="46" stroke="#000" stroke-width="1" opacity=".3"/>',
    '<line x1="2" y1="24" x2="46" y2="24" stroke="#000" stroke-width="1" opacity=".3"/>',
    '</svg>',
  ].join('');
  const cursorUri = `url("data:image/svg+xml,${encodeURIComponent(cursorSvg)}") 24 24, default`;

  const cssText = `
html[data-auy-contrast]{filter:invert(1) hue-rotate(180deg);background:#000}
html[data-auy-contrast] img,html[data-auy-contrast] video,html[data-auy-contrast] canvas{filter:invert(1) hue-rotate(180deg)}
html[data-auy-dyslexia]{font-family:'OpenDyslexic','Comic Sans MS',sans-serif!important}
html[data-auy-dyslexia] *{font-family:inherit!important}
html[data-auy-highlight-links] a{background:yellow!important;color:black!important;outline:2px solid black!important;text-decoration-color:black!important}
html[data-auy-no-animations] *,html[data-auy-no-animations] *::before,html[data-auy-no-animations] *::after{animation-delay:-0.01ms!important;animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-delay:0s!important;transition-duration:0s!important}
html[data-auy-cursor] *{cursor:${cursorUri}!important}
html[data-auy-cursor] input,html[data-auy-cursor] textarea,html[data-auy-cursor] select,html[data-auy-cursor] [contenteditable]{cursor:${cursorUri}!important}
html[data-auy-guide="window"] .auy-reading-guide-window{box-shadow:0 0 0 9999px rgba(0,0,0,0.25)!important;pointer-events:none!important;z-index:1!important}
html[data-auy-guide="marker"] .auy-reading-guide-marker{pointer-events:none!important;z-index:1!important}
html.auy-spacing-1{letter-spacing:0.12em!important;word-spacing:0.16em!important;line-height:1.5!important}
html.auy-spacing-1 *{letter-spacing:inherit;word-spacing:inherit;line-height:inherit}
html.auy-spacing-2{letter-spacing:0.2em!important;word-spacing:0.3em!important;line-height:2!important}
html.auy-spacing-2 *{letter-spacing:inherit;word-spacing:inherit;line-height:inherit}
  `.trim();

  const style = document.createElement('style');
  style.id = 'auy-a11y-global-css';
  style.textContent = cssText;
  document.head.appendChild(style);
}

/**
 * @slot default - No named slots; accessibility controls rendered inline
 */
@customElement('auy-accessibility-bar')
export class AuyAccessibilityBar extends LitElement {
  createRenderRoot() {
    return this;
  }

  @property({ type: String }) mode: 'compact' | 'widget' = 'widget';

  @property({ type: Boolean, reflect: true }) contrast = false;

  @property({ type: Number }) fontSize = 100;

  @property({ type: Boolean }) showVlibras = false;

  @property({ type: Array }) skipLinks: SkipLink[] = [
    { href: '#main-content', label: 'Ir para o conteúdo principal' },
    { href: '#main-nav', label: 'Ir para a navegação' },
    { href: '#footer', label: 'Ir para o rodapé' },
  ];

  @state() private _showWidgetPanel = false;

  private _readingGuideEl: HTMLElement | null = null;

  private _onMouseMove: ((e: MouseEvent) => void) | null = null;

  @state() private _dyslexia = false;

  @state() private _readingGuide: 'off' | 'window' | 'marker' = 'off';

  @state() private _cursorEnlarged = false;

  @state() private _highlightLinks = false;

  @state() private _spacing = 0;

  @state() private _noAnimations = false;

  static styles = css`
    @layer components {
      :host {
        display: block;
      }

      .skip-link:focus {
        position: fixed;
        inset-block-start: var(--auy-space-sm, 0.5rem);
        inset-inline-start: var(--auy-space-sm, 0.5rem);
        inline-size: auto;
        block-size: auto;
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
        background-color: var(--auy-color-primary, oklch(50% 0.2 250));
        color: oklch(100% 0 0);
        font-size: var(--auy-text-sm, 0.875rem);
        border-radius: var(--auy-radius-md, 0.375rem);
        text-decoration: none;
        z-index: 1;
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .toolbar {
        display: flex;
        align-items: center;
        gap: var(--auy-space-xs, 0.375rem);
        padding: var(--auy-space-xs, 0.375rem) var(--auy-space-sm, 0.5rem);
        background-color: var(--auy-color-surface, oklch(100% 0 0));
        border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        position: sticky;
        inset-block-start: 0;
        z-index: 1;
        flex-wrap: wrap;
      }

      .toolbar-btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-xs, 0.25rem);
        padding: var(--auy-space-xs, 0.25rem) var(--auy-space-sm, 0.5rem);
        font-family: inherit;
        font-size: var(--auy-text-sm, 0.875rem);
        color: var(--auy-color-text, oklch(20% 0.03 260));
        background-color: transparent;
        border: 0.0625rem solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: var(--auy-radius-sm, 0.25rem);
        cursor: pointer;
        line-height: 1;
        transition: background-color var(--auy-transition-fast, 150ms) ease,
          border-color var(--auy-transition-fast, 150ms) ease,
          color var(--auy-transition-fast, 150ms) ease;
        user-select: none;
        -webkit-user-select: none;
        white-space: nowrap;
        min-block-size: 2.25rem;
      }

      .toolbar-btn:hover {
        background-color: var(--auy-color-surface-hover, oklch(96% 0.005 260));
      }

      .toolbar-btn:active {
        background-color: var(--auy-color-surface-active, oklch(0% 0 0 / 0.1));
      }

      .toolbar-btn:focus-visible {
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .toolbar-btn[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      .contrast-active {
        background-color: var(--auy-color-primary, oklch(50% 0.2 250));
        color: oklch(100% 0 0);
        border-color: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      .contrast-active:hover {
        background-color: var(--auy-color-primary-hover, oklch(45% 0.2 250));
        border-color: var(--auy-color-primary-hover, oklch(45% 0.2 250));
      }

      .contrast-active:active {
        background-color: var(--auy-color-primary-active, oklch(42% 0.22 250));
        border-color: var(--auy-color-primary-active, oklch(42% 0.22 250));
      }

      .separator {
        inline-size: 0.0625rem;
        block-size: 1.5rem;
        background-color: var(--auy-color-border, oklch(0% 0 0 / 0.15));
        margin: 0 var(--auy-space-xs, 0.25rem);
      }

      .vlibras-link {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs, 0.25rem);
        padding: var(--auy-space-xs, 0.25rem) var(--auy-space-sm, 0.5rem);
        font-family: inherit;
        font-size: var(--auy-text-sm, 0.875rem);
        color: var(--auy-color-text, oklch(20% 0.03 260));
        text-decoration: none;
        border: 0.0625rem solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: var(--auy-radius-sm, 0.25rem);
        cursor: pointer;
        line-height: 1;
        min-block-size: 2.25rem;
        transition: background-color var(--auy-transition-fast, 150ms) ease,
          border-color var(--auy-transition-fast, 150ms) ease;
      }

      .vlibras-link:hover {
        background-color: var(--auy-color-surface-hover, oklch(96% 0.005 260));
      }

      .vlibras-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .floating-btn {
        box-sizing: border-box;
        position: fixed;
        inset-block-end: 1rem;
        inset-inline-end: 1rem;
        inline-size: 3rem;
        block-size: 3rem;
        border-radius: 50%;
        border: none;
        margin: 0;
        padding: 0;
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        color: oklch(100% 0 0);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.25rem;
        font-weight: 700;
        font-family: inherit;
        line-height: 1;
        cursor: pointer;
        text-decoration: none;
        box-shadow: 0 0.125rem 0.5rem oklch(0% 0 0 / 0.25);
        transition: background-color var(--auy-transition-fast, 150ms) ease;
      }

      .floating-btn:hover {
        background: var(--auy-color-primary-hover, oklch(45% 0.2 250));
      }

      .floating-btn:focus-visible {
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .widget-panel {
        position: fixed;
        inset-block-end: 5rem;
        inset-inline-end: 1rem;
        inline-size: 17.5rem;
        background: var(--auy-color-surface, oklch(100% 0 0));
        border-radius: var(--auy-radius-lg, 0.5rem);
        box-shadow: 0 0.25rem 1rem oklch(0% 0 0 / 0.2);
        padding: 1rem;
      }

      .widget-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        margin-block-end: 0.75rem;
      }

      .widget-btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.25rem;
        font-family: inherit;
        font-size: var(--auy-text-sm, 0.8125rem);
        color: var(--auy-color-text, oklch(20% 0.03 260));
        background: transparent;
        border: 0.0625rem solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: var(--auy-radius-sm, 0.25rem);
        cursor: pointer;
        line-height: 1.2;
        text-align: center;
        min-block-size: 2.5rem;
        transition: background-color var(--auy-transition-fast, 150ms) ease,
          border-color var(--auy-transition-fast, 150ms) ease,
          color var(--auy-transition-fast, 150ms) ease;
      }

      .widget-btn:hover {
        background: var(--auy-color-surface-hover, oklch(96% 0.005 260));
      }

      .widget-btn:active {
        background: var(--auy-color-surface-active, oklch(0% 0 0 / 0.1));
      }

      .widget-btn:focus-visible {
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .widget-btn.active {
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        color: oklch(100% 0 0);
        border-color: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      .widget-btn.active:hover {
        background: var(--auy-color-primary-hover, oklch(45% 0.2 250));
        border-color: var(--auy-color-primary-hover, oklch(45% 0.2 250));
      }

      .widget-btn.active:active {
        background: var(--auy-color-primary-active, oklch(42% 0.22 250));
        border-color: var(--auy-color-primary-active, oklch(42% 0.22 250));
      }

      .widget-btn[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      .widget-btn.reset-btn {
        grid-column: 1 / -1;
        inline-size: 100%;
        border-color: var(--auy-color-border, oklch(0% 0 0 / 0.15));
        font-weight: 600;
      }

      @media (forced-colors: active) {
        .toolbar-btn:focus-visible,
        .vlibras-link:focus-visible,
        .floating-btn:focus-visible,
        .widget-btn:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .toolbar-btn,
        .vlibras-link,
        .floating-btn,
        .widget-btn {
          transition: none;
        }
      }

      @media print {
        :host {
          display: none !important;
        }
      }
    }
  `;

  private _increaseFont() {
    const newSize = Math.min(this.fontSize + 10, 140);
    this.fontSize = newSize;
    this._applyFontSize(newSize);
  }

  private _decreaseFont() {
    const newSize = Math.max(this.fontSize - 10, 80);
    this.fontSize = newSize;
    this._applyFontSize(newSize);
  }

  private _applyFontSize(scale: number) {
    if (typeof window === 'undefined') return;
    document.documentElement.style.setProperty('--auy-font-scale', `${scale}%`);
    document.documentElement.style.fontSize = `${scale}%`;
    this._saveState();
    this.dispatchEvent(new CustomEvent('font-change', { detail: { scale } }));
  }

  private _toggleContrast() {
    this.contrast = !this.contrast;
    this._applyHtmlAttr('data-auy-contrast', this.contrast);
    this._saveState();
    this.dispatchEvent(new CustomEvent('contrast-toggle', { detail: { active: this.contrast } }));
  }

  private _toggleDyslexia() {
    this._dyslexia = !this._dyslexia;
    this._applyHtmlAttr('data-auy-dyslexia', this._dyslexia);
    this._saveState();
  }

  private _toggleReadingGuide() {
    const next = this._readingGuide === 'off' ? 'window' : this._readingGuide === 'window' ? 'marker' : 'off';
    this._readingGuide = next;
    if (next !== 'off') {
      this._createReadingGuide();
    } else {
      this._destroyReadingGuide();
    }
    if (typeof window !== 'undefined') {
      const html = document.documentElement;
      if (next === 'off') {
        html.removeAttribute('data-auy-guide');
      } else {
        html.setAttribute('data-auy-guide', next);
      }
    }
    this._saveState();
  }

  private _toggleCursor() {
    this._cursorEnlarged = !this._cursorEnlarged;
    this._applyHtmlAttr('data-auy-cursor', this._cursorEnlarged);
    this._saveState();
  }

  private _toggleHighlightLinks() {
    this._highlightLinks = !this._highlightLinks;
    this._applyHtmlAttr('data-auy-highlight-links', this._highlightLinks);
    this._saveState();
  }

  private _increaseSpacing() {
    this._spacing = Math.min(this._spacing + 1, 2);
    this._applySpacing();
    this._saveState();
  }

  private _decreaseSpacing() {
    this._spacing = Math.max(this._spacing - 1, 0);
    this._applySpacing();
    this._saveState();
  }

  private _applySpacing() {
    if (typeof window === 'undefined') return;
    const html = document.documentElement;
    html.classList.remove('auy-spacing-1', 'auy-spacing-2');
    if (this._spacing === 1) html.classList.add('auy-spacing-1');
    else if (this._spacing === 2) html.classList.add('auy-spacing-2');
  }

  private _toggleNoAnimations() {
    this._noAnimations = !this._noAnimations;
    this._applyHtmlAttr('data-auy-no-animations', this._noAnimations);
    this._saveState();
  }

  private _resetAll() {
    if (this._readingGuide !== 'off') this._destroyReadingGuide();

    this.fontSize = DEFAULT_STATE.fontSize;
    this.contrast = DEFAULT_STATE.contrast;
    this._dyslexia = DEFAULT_STATE.dyslexia;
    this._readingGuide = DEFAULT_STATE.readingGuide;
    this._cursorEnlarged = DEFAULT_STATE.cursor;
    this._highlightLinks = DEFAULT_STATE.highlightLinks;
    this._spacing = DEFAULT_STATE.spacing;
    this._noAnimations = DEFAULT_STATE.noAnimations;

    if (typeof window !== 'undefined') {
      document.documentElement.style.removeProperty('--auy-font-scale');
      document.documentElement.style.fontSize = '';
      document.documentElement.classList.remove('auy-spacing-1', 'auy-spacing-2');

      const attrs = [
        'data-auy-contrast',
        'data-auy-dyslexia',
        'data-auy-guide',
        'data-auy-cursor',
        'data-auy-highlight-links',
        'data-auy-no-animations',
      ];
      for (const attr of attrs) {
        document.documentElement.removeAttribute(attr);
      }
    }

    persistState(DEFAULT_STATE);
    this.dispatchEvent(new CustomEvent('a11y-reset'));
  }

  private _applyHtmlAttr(attr: string, active: boolean) {
    if (typeof window === 'undefined') return;
    if (active) {
      document.documentElement.setAttribute(attr, 'true');
    } else {
      document.documentElement.removeAttribute(attr);
    }
  }

  private _createReadingGuide() {
    if (this._readingGuideEl) return;
    const mode = this._readingGuide;
    if (mode === 'off') return;

    const el = document.createElement('div');

    if (mode === 'window') {
      el.className = 'auy-reading-guide-window';
      el.style.cssText = [
        'position:fixed',
        'inset-inline-start:0',
        'inset-inline-end:0',
        'block-size:4.8rem',
        'background:rgba(255,200,0,0.15)',
        'border-block-start:2px solid rgba(255,150,0,0.4)',
        'border-block-end:2px solid rgba(255,150,0,0.4)',
        'pointer-events:none',
        'display:none',
      ].join(';');
    } else {
      el.className = 'auy-reading-guide-marker';
      el.style.cssText = [
        'position:fixed',
        'inset-inline-start:0',
        'inset-inline-end:0',
        'block-size:2px',
        'background:rgba(255,0,0,0.5)',
        'pointer-events:none',
        'display:none',
        'z-index:1',
      ].join(';');
    }

    document.body.appendChild(el);
    this._readingGuideEl = el;
    this._onMouseMove = (e: MouseEvent) => {
      el.style.display = 'block';
      if (mode === 'window') {
        el.style.top = `${e.clientY - 38.4}px`;
      } else {
        el.style.top = `${e.clientY}px`;
      }
    };
    document.addEventListener('mousemove', this._onMouseMove);
  }

  private _destroyReadingGuide() {
    if (this._readingGuideEl) {
      this._readingGuideEl.remove();
      this._readingGuideEl = null;
    }
    if (this._onMouseMove) {
      document.removeEventListener('mousemove', this._onMouseMove);
      this._onMouseMove = null;
    }
  }

  private _saveState() {
    const state: A11yState = {
      fontSize: this.fontSize,
      contrast: this.contrast,
      dyslexia: this._dyslexia,
      readingGuide: this._readingGuide,
      cursor: this._cursorEnlarged,
      highlightLinks: this._highlightLinks,
      spacing: this._spacing,
      noAnimations: this._noAnimations,
    };
    persistState(state);
  }

  private _toggleWidgetPanel() {
    this._showWidgetPanel = !this._showWidgetPanel;
  }

  override connectedCallback() {
    super.connectedCallback();
    if (typeof window === 'undefined') return;
    injectAccessibilityStyles();

    const state = loadState();
    this.fontSize = state.fontSize;
    this.contrast = state.contrast;
    this._dyslexia = state.dyslexia;
    this._readingGuide = state.readingGuide;
    this._cursorEnlarged = state.cursor;
    this._highlightLinks = state.highlightLinks;
    this._spacing = state.spacing;
    this._noAnimations = state.noAnimations;

    if (state.fontSize !== 100) {
      document.documentElement.style.setProperty('--auy-font-scale', `${state.fontSize}%`);
      document.documentElement.style.fontSize = `${state.fontSize}%`;
    }

    this._applyHtmlAttr('data-auy-contrast', state.contrast);
    this._applyHtmlAttr('data-auy-dyslexia', state.dyslexia);
    if (state.readingGuide !== 'off') {
      document.documentElement.setAttribute('data-auy-guide', state.readingGuide);
    }
    this._applyHtmlAttr('data-auy-cursor', state.cursor);
    this._applyHtmlAttr('data-auy-highlight-links', state.highlightLinks);
    this._applyHtmlAttr('data-auy-no-animations', state.noAnimations);

    if (state.readingGuide !== 'off') this._createReadingGuide();
    this._applySpacing();

    if (state.readingGuide) this._createReadingGuide();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._destroyReadingGuide();
  }

  override render() {
    return html`
      ${this.mode === 'compact'
        ? html`
            <nav part="toolbar" class="toolbar" aria-label="Acessibilidade">
              <button
                part="btn-decrease"
                class="toolbar-btn"
                @click=${this._decreaseFont}
                ?disabled=${this.fontSize <= 80}
                aria-label="Diminuir fonte"
                title="Diminuir fonte"
              >
                A-
              </button>

              <button
                part="btn-increase"
                class="toolbar-btn"
                @click=${this._increaseFont}
                ?disabled=${this.fontSize >= 140}
                aria-label="Aumentar fonte"
                title="Aumentar fonte"
              >
                A+
              </button>

              <span class="separator" aria-hidden="true"></span>

              <button
                part="btn-contrast"
                class="toolbar-btn ${this.contrast ? 'contrast-active' : ''}"
                @click=${this._toggleContrast}
                aria-label=${this.contrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
                aria-pressed=${this.contrast ? 'true' : 'false'}
                title=${this.contrast ? 'Desativar alto contraste' : 'Ativar alto contraste'}
              >
                Contraste
              </button>

              <span class="separator" aria-hidden="true"></span>

              <button
                class="toolbar-btn ${this._dyslexia ? 'contrast-active' : ''}"
                @click=${this._toggleDyslexia}
                aria-label=${this._dyslexia ? 'Desativar fonte para dislexia' : 'Ativar fonte para dislexia'}
                aria-pressed=${this._dyslexia ? 'true' : 'false'}
                title=${this._dyslexia ? 'Desativar fonte dislexia' : 'Ativar fonte dislexia'}
              >
                Dislexia
              </button>

              <button
                class="toolbar-btn ${this._readingGuide !== 'off' ? 'contrast-active' : ''}"
                @click=${this._toggleReadingGuide}
                aria-label=${this._readingGuide === 'off' ? 'Ativar guia de leitura (janela)' : this._readingGuide === 'window' ? 'Ativar guia de leitura (linha)' : 'Desativar guia de leitura'}
                aria-pressed=${this._readingGuide !== 'off' ? 'true' : 'false'}
                title=${this._readingGuide === 'off' ? 'Guia de leitura - janela' : this._readingGuide === 'window' ? 'Guia de leitura - linha' : 'Desativar guia'}
              >
                ${this._readingGuide === 'window' ? 'Guia ▼' : this._readingGuide === 'marker' ? 'Guia ─' : 'Guia'}
              </button>

              <button
                class="toolbar-btn ${this._cursorEnlarged ? 'contrast-active' : ''}"
                @click=${this._toggleCursor}
                aria-label=${this._cursorEnlarged ? 'Desativar cursor ampliado' : 'Ativar cursor ampliado'}
                aria-pressed=${this._cursorEnlarged ? 'true' : 'false'}
                title=${this._cursorEnlarged ? 'Desativar cursor ampliado' : 'Ativar cursor ampliado'}
              >
                Cursor
              </button>

              <button
                class="toolbar-btn ${this._highlightLinks ? 'contrast-active' : ''}"
                @click=${this._toggleHighlightLinks}
                aria-label=${this._highlightLinks ? 'Desativar destaque de links' : 'Ativar destaque de links'}
                aria-pressed=${this._highlightLinks ? 'true' : 'false'}
                title=${this._highlightLinks ? 'Desativar destaque de links' : 'Ativar destaque de links'}
              >
                Links
              </button>

              <span class="separator" aria-hidden="true"></span>

              <button
                class="toolbar-btn"
                @click=${this._decreaseSpacing}
                ?disabled=${this._spacing <= 0}
                aria-label="Diminuir espaçamento"
                title="Diminuir espaçamento"
              >
                Espaço-
              </button>

              <button
                class="toolbar-btn"
                @click=${this._increaseSpacing}
                ?disabled=${this._spacing >= 2}
                aria-label="Aumentar espaçamento"
                title="Aumentar espaçamento"
              >
                Espaço+
              </button>

              <span class="separator" aria-hidden="true"></span>

              <button
                class="toolbar-btn ${this._noAnimations ? 'contrast-active' : ''}"
                @click=${this._toggleNoAnimations}
                aria-label=${this._noAnimations ? 'Ativar animações' : 'Desativar animações'}
                aria-pressed=${this._noAnimations ? 'true' : 'false'}
                title=${this._noAnimations ? 'Ativar animações' : 'Desativar animações'}
              >
                Animações
              </button>

              <span class="separator" aria-hidden="true"></span>

              <button
                class="toolbar-btn"
                @click=${this._resetAll}
                aria-label="Redefinir todas as configurações de acessibilidade"
                title="Redefinir acessibilidade"
              >
                Resetar
              </button>

              ${this.showVlibras
                ? html`
                    <span class="separator" aria-hidden="true"></span>

                    <a
                      part="btn-vlibras"
                      class="vlibras-link"
                      href="https://vlibras.gov.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="VLibras - Tradutor para Libras"
                      title="VLibras - Tradutor para Libras"
                    >
                      VLibras
                    </a>
                  `
                : ''}
            </nav>
          `
        : html`
            <button
              class="floating-btn"
              @click=${this._toggleWidgetPanel}
              aria-label="Acessibilidade"
              aria-expanded=${this._showWidgetPanel ? 'true' : 'false'}
              title="Opções de acessibilidade"
            >
              A
            </button>

            ${this._showWidgetPanel
              ? html`
                  <div class="widget-panel" role="dialog" aria-label="Opções de acessibilidade">
                    <div class="widget-grid">
                      <button
                        class="widget-btn ${this._dyslexia ? 'active' : ''}"
                        @click=${this._toggleDyslexia}
                        aria-pressed=${this._dyslexia ? 'true' : 'false'}
                      >
                        Dislexia
                      </button>

                      <button
                        class="widget-btn ${this._readingGuide !== 'off' ? 'active' : ''}"
                        @click=${this._toggleReadingGuide}
                        aria-pressed=${this._readingGuide !== 'off' ? 'true' : 'false'}
                      >
                        ${this._readingGuide === 'window' ? 'Guia ▼' : this._readingGuide === 'marker' ? 'Guia ─' : 'Guia'}
                      </button>

                      <button
                        class="widget-btn ${this._cursorEnlarged ? 'active' : ''}"
                        @click=${this._toggleCursor}
                        aria-pressed=${this._cursorEnlarged ? 'true' : 'false'}
                      >
                        Cursor
                      </button>

                      <button
                        class="widget-btn ${this._highlightLinks ? 'active' : ''}"
                        @click=${this._toggleHighlightLinks}
                        aria-pressed=${this._highlightLinks ? 'true' : 'false'}
                      >
                        Links
                      </button>

                      <button
                        class="widget-btn"
                        @click=${this._decreaseFont}
                        ?disabled=${this.fontSize <= 80}
                        aria-label="Diminuir fonte"
                      >
                        A-
                      </button>

                      <button
                        class="widget-btn"
                        @click=${this._increaseFont}
                        ?disabled=${this.fontSize >= 140}
                        aria-label="Aumentar fonte"
                      >
                        A+
                      </button>

                      <button
                        class="widget-btn"
                        @click=${this._decreaseSpacing}
                        ?disabled=${this._spacing <= 0}
                        aria-label="Diminuir espaçamento"
                      >
                        Espaço-
                      </button>

                      <button
                        class="widget-btn"
                        @click=${this._increaseSpacing}
                        ?disabled=${this._spacing >= 2}
                        aria-label="Aumentar espaçamento"
                      >
                        Espaço+
                      </button>

                      <button
                        class="widget-btn ${this.contrast ? 'active' : ''}"
                        @click=${this._toggleContrast}
                        aria-pressed=${this.contrast ? 'true' : 'false'}
                      >
                        Contraste
                      </button>

                      <button
                        class="widget-btn ${this._noAnimations ? 'active' : ''}"
                        @click=${this._toggleNoAnimations}
                        aria-pressed=${this._noAnimations ? 'true' : 'false'}
                      >
                        Animações
                      </button>
                    </div>

                    <button class="widget-btn reset-btn" @click=${this._resetAll}>
                      Resetar tudo
                    </button>
                  </div>
                `
              : ''}
          `}
    `;
  }
}
