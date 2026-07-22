import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { DataAwareMixin } from './_internal/data-aware.mixin.ts';
import { t } from './_internal/locale.ts';

function highlight(text: string, query: string) {
  if (!query) return [text];
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    i % 2 === 1
      ? html`<mark style="background:var(--auy-color-primary);color:var(--auy-color-on-primary);border-radius:2px;padding:0 2px">${part}</mark>`
      : part
  );
}

const searchStyles = `
  auy-comp-search { display: block; }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: var(--auy-z-overlay);
    background: var(--auy-color-overlay, oklch(0% 0 0 / 0.4));
    display: none;
    align-items: flex-start;
    justify-content: center;
    padding-block-start: 15dvh;
    animation: overlay-in 200ms ease both;
  }
  .overlay.open { display: flex; }

  auy-comp-search[position="center"] .overlay {
    align-items: center;
    padding-block-start: 0;
  }
  auy-comp-search[position="top"] .overlay {
    align-items: flex-start;
    padding-block-start: 5dvh;
  }

  @keyframes overlay-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .panel {
    background: var(--auy-color-surface);
    border-radius: var(--auy-radius-lg);
    box-shadow: var(--auy-shadow-lg);
    inline-size: min(40rem, 90dvw);
    max-block-size: 60dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  auy-comp-search[size="sm"] .panel { inline-size: min(28rem, 90dvw); }
  auy-comp-search[size="lg"] .panel { inline-size: min(52rem, 90dvw); }
  auy-comp-search[size="full"] .panel { inline-size: min(60rem, 94dvw); max-block-size: 80dvh; }

  auy-comp-search[variant="elevated"] .panel {
    box-shadow: 0 1rem 3rem color-mix(in oklch, var(--auy-color-border) 40%, transparent);
  }

  auy-comp-search[variant="bordered"] .panel {
    box-shadow: none;
    border: 1px solid var(--auy-color-border);
  }

  auy-comp-search[variant="bordered"] .overlay {
    background: var(--auy-color-overlay, oklch(0% 0 0 / 0.25));
  }

  .input-wrap {
    display: flex;
    align-items: center;
    gap: var(--auy-space-sm);
    padding: var(--auy-space-md);
    border-block-end: 1px solid var(--auy-color-border);
  }

  .input-wrap input {
    flex: 1;
    border: none;
    outline: none;
    font-size: var(--auy-text-lg);
    background: transparent;
    color: var(--auy-color-text);
    font-family: inherit;
    touch-action: manipulation;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    color: var(--auy-color-text-muted);
    opacity: 0.5;
  }
  .icon svg { inline-size: 1.25rem; block-size: 1.25rem; }

  .close-btn {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 2.75rem;
    block-size: 2.75rem;
    border-radius: var(--auy-radius-lg);
    cursor: pointer;
    font-size: var(--auy-text-xl);
    line-height: 1;
    color: inherit;
    flex-shrink: 0;
    touch-action: manipulation;
  }
  .close-btn:hover { background: color-mix(in srgb, currentColor 10%, transparent); }
  .close-btn:focus-visible {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: 0.125rem;
  }

  .hint {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.375rem;
    border: 1px solid var(--auy-color-border);
    border-radius: 0.25rem;
    font-size: var(--auy-text-xs);
    font-family: inherit;
    color: var(--auy-color-text-muted);
  }

  .results {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;
    padding: var(--auy-space-xs);
    list-style: none;
    margin: 0;
  }

  .result-item {
    display: flex;
    align-items: center;
    gap: var(--auy-space-sm);
    padding: var(--auy-space-sm) var(--auy-space-md);
    border-radius: var(--auy-radius-md);
    cursor: pointer;
    touch-action: manipulation;
  }
  .result-item.sel { background: color-mix(in oklch, var(--auy-color-primary) 10%, transparent); }

  .result-content { flex: 1; display: grid; gap: 0.125rem; }
  .result-label { font-size: var(--auy-text-sm); font-weight: var(--auy-font-weight-medium); color: var(--auy-color-text); }
  .result-desc { font-size: var(--auy-text-xs); color: var(--auy-color-text-muted); }
  .result-cat { font-size: var(--auy-text-xs); color: var(--auy-color-primary); }

  .empty {
    padding: var(--auy-space-xl);
    text-align: center;
    color: var(--auy-color-text-muted);
  }

  .footer {
    display: flex;
    gap: var(--auy-space-md);
    padding: var(--auy-space-sm) var(--auy-space-md);
    border-block-start: 1px solid var(--auy-color-border);
    font-size: var(--auy-text-xs);
    color: var(--auy-color-text-muted);
    justify-content: center;
  }

  search { display: contents; }

  @media (forced-colors: active) {
    .overlay { background: Canvas; }
    .close-btn:focus-visible { outline: 2px solid Highlight; outline-offset: 2px; }
    .result-item.sel { background: Highlight; color: HighlightText; }
  }
  @media (prefers-reduced-motion: reduce) { .overlay { animation: none; } }
  @media print { .overlay { background: transparent; } }
`;

/** Componente de busca com overlay, filtro local e suporte a dados remotos. */
@customElement('auy-comp-search')
export class AuyCompSearch extends DataAwareMixin(LitElement) {
  static override get observedDataEvents(): string[] {
    return ['search-select', 'search-close']
  }

  override createRenderRoot() {
    return this;
  }

  /** Lista de itens para exibir nos resultados. */
  @property({ type: Array }) items: { label: string; description?: string; href?: string; icon?: string; category?: string }[] = [];
  /** Texto do placeholder do campo de busca. */
  @property({ type: String }) placeholder = t('searchPlaceholder');
  /** Controla a abertura/fechamento do overlay de busca. */
  @property({ type: Boolean, reflect: true }) open = false;
  /** Tecla de atalho (ex: "k" para Ctrl+K). */
  @property({ type: String }) shortcut = 'k';

  protected override _parseResponse(data: unknown): void {
    if (Array.isArray(data)) {
      this.items = data;
    } else if (data && typeof data === 'object') {
      const d = data as Record<string, unknown>;
      if (Array.isArray(d.results)) this.items = d.results;
      else if (Array.isArray(d.items)) this.items = d.items;
    }
  }

  /** URL para busca remota via fetch. */
  @property({ type: String }) src = '';
  /** Tempo de debounce em ms para busca remota. */
  @property({ type: Number }) debounceMs = 300;
  /** Variante visual do painel de busca. */
  @property({ type: String, reflect: true }) variant: 'default' | 'elevated' | 'bordered' = 'default';
  /** Tamanho do painel de busca. */
  @property({ type: String, reflect: true }) size: 'sm' | 'md' | 'lg' | 'full' = 'md';
  /** Posição vertical do overlay de busca. */
  @property({ type: String, reflect: true }) position: 'default' | 'center' | 'top' = 'default';

  @state() private _query = '';
  @state() private _selectedIndex = 0;
  @state() private _filtered: { label: string; description?: string; href?: string; icon?: string; category?: string }[] = [];
  @state() private _debounceTimer: ReturnType<typeof setTimeout> | null = null;
  private _fetchController: AbortController | null = null;

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('items') || changed.has('_query')) {
      this._filtered = this._filterItems();
    }
  }

  private _onGlobalKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === this.shortcut) {
      e.preventDefault();
      this._open();
    }
  };

  /** Registra o listener global de teclado para o atalho de busca. */
  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this._onGlobalKeydown);
    }
  }

  /** Remove o listener global de teclado. */
  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this._onGlobalKeydown);
    }
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open') && this.open) {
      requestAnimationFrame(() => {
        const el = this.querySelector<HTMLInputElement>('input');
        el?.focus();
      });
    }
  }

  private _filterItems() {
    if (!this._query) {
      return this.items.slice(0, 10);
    }
    const q = this._query.toLowerCase();
    return this.items.filter(item =>
      item.label.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q))
    );
  }

  private async _fetchResults(query: string) {
    if (!this.src) return;
    this._fetchController?.abort();
    this._fetchController = new AbortController();
    try {
      const url = new URL(this.src, window.location.href);
      url.searchParams.set('q', query);
      const res = await fetch(url.toString(), { signal: this._fetchController.signal });
      if (!res.ok) throw new Error('Search failed');
      const data = await res.json();
      if (Array.isArray(data)) {
        this.items = data;
      } else if (data.results) {
        this.items = data.results;
      }
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === 'AbortError') return;
      this.items = [];
    }
  }

  private _onInput(e: InputEvent) {
    this._query = (e.target as HTMLInputElement).value;
    this._selectedIndex = 0;
    if (this.src) {
      clearTimeout(this._debounceTimer!);
      this._debounceTimer = window.setTimeout(() => this._fetchResults(this._query), this.debounceMs);
    }
  }

  private _onKeydown(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._selectedIndex = Math.min(this._selectedIndex + 1, this._filtered.length - 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (this._filtered[this._selectedIndex]) {
          this._selectItem(this._filtered[this._selectedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        this._close();
        break;
      case 'Tab':
        e.preventDefault();
        break;
    }
  }

  private _selectItem(item: { label: string; description?: string; href?: string; icon?: string; category?: string }) {
    this.dispatchEvent(new CustomEvent('search-select', { detail: item, bubbles: true, composed: true }));
    if (item.href) {
      window.location.href = item.href;
    }
    this._close();
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('search-close', { bubbles: true, composed: true }));
  }

  private _open() {
    this.open = true;
    this._query = '';
    this._selectedIndex = 0;
  }

  private _closeOnOverlay(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('overlay')) {
      this._close();
    }
  }

  private readonly _handleSelect = (e: Event) => {
    const idx = Number((e.currentTarget as HTMLElement).dataset.index);
    this._selectItem(this._filtered[idx]);
  };

  private readonly _handleMouseEnter = (e: Event) => {
    const idx = Number((e.currentTarget as HTMLElement).dataset.index);
    this._selectedIndex = idx;
  };

  override render() {
    const filtered = this._filtered;
    return html`
      <style>${searchStyles}</style>
      <div data-element="search" class="overlay ${this.open ? 'open' : ''}" @click=${this._closeOnOverlay}>
        <div class="panel" role="dialog" aria-modal="true" aria-label=${t('searchDialog')}>
          <search>
          <div class="input-wrap">
            <span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></span>
            <input
              .value=${this._query}
              @input=${this._onInput}
              @keydown=${this._onKeydown}
              placeholder=${this.placeholder}
              aria-label=${t('searchInput')}
              ?autofocus=${this.open}
            />
            <button class="close-btn" @click=${this._close} aria-label=${t('searchClose')}>×</button>
            <kbd class="hint">ESC</kbd>
          </div>
          ${filtered.length > 0 ? html`
            <ul class="results" role="listbox">
              ${keyed(this._filtered, filtered.map((item, idx) => html`
                <li
                  class="result-item ${this._selectedIndex === idx ? 'sel' : ''}"
                  role="option"
                  data-index="${idx}"
                  aria-selected=${this._selectedIndex === idx ? 'true' : 'false'}
                  @click=${this._handleSelect}
                  @mouseenter=${this._handleMouseEnter}
                >
                  ${item.icon ? html`<span style="flex-shrink:0;inline-size:1.25rem;block-size:1.25rem;">${item.icon}</span>` : ''}
                  <div class="result-content">
                    <span class="result-label">${highlight(item.label, this._query)}</span>
                    ${item.description ? html`<span class="result-desc">${highlight(item.description, this._query)}</span>` : ''}
                  </div>
                  ${item.category ? html`<span class="result-cat">${item.category}</span>` : ''}
                </li>
              `))}
            </ul>
          ` : html`
            <div class="empty">${t('searchEmpty')}</div>
          `}
          <div class="footer">
            <span>${t('searchNavHint')}</span>
            <span>${t('searchSelectHint')}</span>
            <span>${t('searchCloseHint')}</span>
          </div>
          </search>
        </div>
      </div>
    `;
  }
}
