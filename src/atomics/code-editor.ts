import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

@customElement('auy-internal-code-editor')
export class AuyInternalCodeEditor extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .editor {
        display: flex;
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        overflow: hidden;
        font-family: var(--auy-font-mono);
        font-size: var(--auy-text-sm);
        line-height: 1.5;
        background: var(--auy-color-surface);
      }

      .gutter {
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

      ::part(textarea)::selection {
        background: var(--auy-color-primary-muted, oklch(from var(--auy-color-primary) 80% 0.15 h / 0.2));
      }

      .cm-host {
        flex: 1;
        overflow: auto;
      }

      @media (forced-colors: active) {
        .editor {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        .editor {
          border-color: #000;
        }
      }

      @media (prefers-color-scheme: dark) {
        .editor {
          border-color: var(--auy-color-border, oklch(28% 0.03 260));
          background: var(--auy-color-surface, oklch(20% 0.03 260));
        }

        textarea {
          color: var(--auy-color-text, oklch(93% 0.01 260));
        }
      }
    }
  `;

  @property({ type: String }) value = '';
  @property({ type: String }) language = 'html';
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: String }) theme = 'default';
  @property({ type: Boolean }) lineNumbers = true;
  @property({ type: String }) height = '300px';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) cmOptions = '';

  @state() private _lines: string[] = ['1'];
  @state() private _cmLoaded = false;

  @query('textarea') private _textarea!: HTMLTextAreaElement;
  @query('.gutter') private _gutter!: HTMLElement;
  @query('.cm-host') private _cmHost!: HTMLElement;

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
        <div part="editor" class="editor" style="height: ${this.height}">
          <div part="cm-host" class="cm-host"></div>
        </div>
      `;
    }

    return html`
      <div part="editor" class="editor" style="height: ${this.height}">
        ${this.lineNumbers
          ? html`
              <div part="gutter" class="gutter" aria-hidden="true">
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
      // @ts-ignore — dynamic CDN import, no local types
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
