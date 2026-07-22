import { LitElement, html, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { DataAwareMixin } from './_internal/data-aware.mixin.ts';

@customElement('auy-comp-code-editor')
export class AuyCompCodeEditor extends DataAwareMixin(LitElement) {
  override createRenderRoot() { return this; }
  static override get observedDataEvents(): string[] {
    return ['input', 'change']
  }

  @property({ type: String }) value = '';
  @property({ type: String }) language = 'html';
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: String }) theme = 'default';
  @property({ type: Boolean }) lineNumbers = true;
  @property({ type: String }) height = 'clamp(200px, 40dvh, 600px)';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) cmOptions = '';

  protected override _parseResponse(data: unknown): void {
    const d = data as Record<string, string>
    if (d.value !== undefined) this.value = d.value
    if (d.language) this.language = d.language
  }

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
        <div data-part="editor" class="editor" data-element="code-editor" style="height: ${this.height}">
          <div data-part="cm-host" class="cm-host"></div>
        </div>
      `;
    }

    return html`
      <div data-part="editor" class="editor" data-element="code-editor" style="height: ${this.height}">
        ${this.lineNumbers
          ? html`
              <div data-part="gutter" class="gutter" aria-hidden="true">
                ${this._lines.map(n => html`<span>${n}</span>`)}
              </div>
            `
          : nothing}
        <textarea
          data-part="textarea"
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
