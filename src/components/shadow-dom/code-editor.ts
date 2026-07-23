import { html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { AuyShadowElement } from '../_internal/AuyShadowElement.base.ts';
import { DataAwareMixin } from '../_internal/data-aware.mixin.ts';
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts';

/**
 * Code editor component with optional CodeMirror 6 integration.
 *
 * @element auy-comp-code-editor
 *
 * @property {string} value - The editor content.
 * @property {string} language - Programming language identifier (default 'html').
 * @property {boolean} readonly - Whether the editor is read-only. Reflected as attribute.
 * @property {string} theme - Editor theme name (default 'default').
 * @property {boolean} lineNumbers - Whether to show line numbers (default true).
 * @property {string} height - CSS height value for the editor (default '300px').
 * @property {string} placeholder - Placeholder text when empty.
 * @property {string} cmOptions - JSON string of CodeMirror 6 options to pass when loading CM.
 *
 * @state {string[]} _lines - Array of line number strings for the gutter.
 * @state {boolean} _cmLoaded - Whether CodeMirror has been dynamically loaded.
 *
 * @query {HTMLTextAreaElement} _textarea - The textarea element.
 * @query {HTMLElement} _gutter - The line-number gutter element.
 * @query {HTMLElement} _cmHost - The container for CodeMirror.
 *
 * @fires {CustomEvent} input - Dispatched when the value changes.
 * @fires {Event} change - Dispatched when the value changes.
 *
 * @csspart editor - The editor wrapper.
 * @csspart gutter - The line-number gutter.
 * @csspart textarea - The textarea element.
 * @csspart cm-host - The CodeMirror host container.
 */
@customElement('auy-comp-code-editor')
export class AuyCompCodeEditor extends StyleCustomizableMixin(DataAwareMixin(AuyShadowElement)) {
  static override get observedDataEvents(): string[] {
    return ['input', 'change']
  }
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      [data-auy-part="editor"] {
        display: flex;
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        overflow: hidden;
        font-family: var(--auy-font-mono);
        font-size: var(--auy-text-sm);
        line-height: 1.5;
        background: var(--auy-color-surface);
      }

      [data-auy-part="gutter"] {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        background: color-mix(in oklch, var(--auy-color-border) 30%, transparent);
        color: var(--auy-color-text-muted);
        text-align: right;
        user-select: none;
        min-inline-size: 3rem;
        flex-shrink: 0;
        overflow: hidden;
      }

      textarea {
        flex: 1;
        border: none;
        padding: 0.5rem;
        font: inherit;
        background: transparent;
        color: var(--auy-color-text);
        resize: both;
        outline: none;
        tab-size: 2;
        white-space: pre;
        overflow-wrap: normal;
        overflow: auto;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      :host([readonly]) textarea {
        cursor: default;
      }

      textarea:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      textarea::selection {
        background: var(--auy-color-primary-muted, oklch(from var(--auy-color-primary) 80% 0.15 h / 0.2));
      }

      [data-auy-part="cm-host"] {
        flex: 1;
        overflow: auto;
      }

      @media (forced-colors: active) {
        [data-auy-part="editor"] {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        [data-auy-part="editor"] {
          border-color: #000;
        }
      }
    }
  `;

  /** The editor content. */
  @property({ type: String }) value = '';
  /** Programming language identifier. */
  @property({ type: String }) language = 'html';
  /** Whether the editor is read-only. */
  @property({ type: Boolean, reflect: true }) readonly = false;
  /** Editor theme name. */
  @property({ type: String }) theme = 'default';
  /** Whether to show line numbers. */
  @property({ type: Boolean }) lineNumbers = true;
  /** CSS height value for the editor. */
  @property({ type: String }) height = 'clamp(200px, 40dvh, 600px)';
  /** Placeholder text when empty. */
  @property({ type: String }) placeholder = '';
  /** JSON string of CodeMirror 6 options. */
  @property({ type: String }) cmOptions = '';

  protected override _parseResponse(data: unknown): void {
    const d = data as Record<string, string>
    if (d.value !== undefined) this.value = d.value
    if (d.language) this.language = d.language
  }

  /** Array of line number strings for the gutter. */
  @state() private _lines: string[] = ['1'];
  /** Whether CodeMirror has been dynamically loaded. */
  @state() private _cmLoaded = false;

  /** The textarea element. */
  @query('textarea') private _textarea!: HTMLTextAreaElement;
  /** The line-number gutter element. */
  @query('[data-auy-part="gutter"]') private _gutter!: HTMLElement;
  /** The container for CodeMirror. */
  @query('[data-auy-part="cm-host"]') private _cmHost!: HTMLElement;

  override shouldUpdate(changed: Map<string, unknown>) {
    return changed.has('value') || changed.has('lineNumbers') || changed.has('cmOptions') || changed.has('height') || changed.has('readonly') || changed.has('placeholder') || changed.has('_cmLoaded');
  }

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('value') || changed.has('lineNumbers')) {
      this._updateLineNumbers();
    }
  }

  override render() {
    if (this._cmLoaded) {
      return html`
        ${this._renderCustomStyles()}
<div part="editor" data-auy-part="editor" style="height: ${this.height}">
          <div part="cm-host" data-auy-part="cm-host"></div>
        </div>
      `;
    }

    return html`
      ${this._renderCustomStyles()}
      <div part="editor" data-auy-part="editor" style="height: ${this.height}">
        ${this.lineNumbers
          ? html`
              <div part="gutter" data-auy-part="gutter" aria-hidden="true">
                ${this._lines.map(n => html`<span>${n}</span>`)}
              </div>
            `
          : nothing}
        <textarea
          part="textarea"
          .value=${this.value}
          ?readonly=${this.readonly}
          placeholder=${this.placeholder || nothing}
          @input=${this._onInput}
          @keydown=${this._onKeydown}
          @scroll=${this._syncScroll}
          spellcheck="false"
          wrap="off"
        ></textarea>
      </div>
    `;
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('cmOptions') && this.cmOptions) {
      this._loadCodeMirror();
    }
  }

  private _onInput(e: Event) {
    const target = e.target as HTMLTextAreaElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private _onKeydown(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const before = target.value.substring(0, start);
      const after = target.value.substring(end);
      target.value = `${before}  ${after}`;
      target.selectionStart = target.selectionEnd = start + 2;
      this.value = target.value;
      this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
      this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
  }

  private _syncScroll() {
    if (this._textarea && this._gutter) {
      this._gutter.scrollTop = this._textarea.scrollTop;
    }
  }

  private _updateLineNumbers() {
    if (!this.lineNumbers) {
      this._lines = [];
      return;
    }
    const count = Math.max(1, (this.value || '').split('\n').length);
    this._lines = Array.from({ length: count }, (_, i) => String(i + 1));
  }

  private async _loadCodeMirror() {
    try {
      // @ts-expect-error — dynamic CDN import, no local types
      const cm = await import('https://cdn.jsdelivr.net/npm/codemirror@6/+esm');
      if (this._cmHost && cm.EditorView) {
        const options = this.cmOptions ? JSON.parse(this.cmOptions) : {};
        this._cmHost.innerHTML = '';
        new cm.EditorView({
          doc: this.value,
          parent: this._cmHost,
          ...options,
        });
      }
      this._cmLoaded = true;
    } catch {
      this._cmLoaded = false;
    }
    this.requestUpdate();
  }
}
