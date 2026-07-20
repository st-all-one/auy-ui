import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { classMap } from 'lit/directives/class-map.js';

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

/**
 * @slot - Default slot (not used when items are provided via property)
 */
@customElement('auy-internal-search')
export class AuyInternalSearch extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      :host(:not([open])) {
        display: none;
      }

      [part="overlay"] {
        position: fixed;
        inset: 0;
        z-index: 1;
        background: var(--auy-color-overlay, oklch(0% 0 0 / 0.4));
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-block-start: 15dvh;
        opacity: 0;
        transition: opacity var(--auy-transition, 200ms ease);
      }

      @starting-style {
        [part="overlay"] {
          opacity: 0;
        }
      }

      [part="panel"] {
        background: var(--auy-color-surface);
        border-radius: var(--auy-radius-lg);
        box-shadow: var(--auy-shadow-lg);
        inline-size: min(40rem, 90dvw);
        max-block-size: 60dvh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      [part="input-wrapper"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        border-block-end: 1px solid var(--auy-color-border);
      }

      [part="input"] {
        flex: 1;
        border: none;
        outline: none;
        font-size: var(--auy-text-lg);
        background: transparent;
        color: var(--auy-color-text);
        font-family: inherit;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      [part="close-btn"] {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 2rem;
        block-size: 2rem;
        border-radius: var(--auy-radius-lg);
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
        color: inherit;
        flex-shrink: 0;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      [part="close-btn"]:hover {
        background: color-mix(in srgb, currentColor 10%, transparent);
      }

      [part="close-btn"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      [part="hint"] {
        display: inline-flex;
        align-items: center;
        padding: 0.125rem 0.375rem;
        border: 1px solid var(--auy-color-border);
        border-radius: 0.25rem;
        font-size: var(--auy-text-xs);
        font-family: inherit;
        color: var(--auy-color-text-muted);
      }

      [part="results"] {
        flex: 1;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        padding: var(--auy-space-xs);
        list-style: none;
        margin: 0;
      }

      [part="result-item"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        cursor: pointer;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      @media (forced-colors: active) {
        [part="overlay"] {
          background: Canvas;
        }

        [part="input"] {
          border: 1px solid ButtonText;
        }

        [part="close-btn"] {
          border: 1px solid ButtonText;
        }

        [part="result-item"] {
          border: 1px solid ButtonText;
        }
      }

      [part="result-item"].selected {
        background: color-mix(in oklch, var(--auy-color-primary) 10%, transparent);
      }

      [part="result-icon"] {
        flex-shrink: 0;
        inline-size: 1.25rem;
        block-size: 1.25rem;
      }

      [part="result-content"] {
        flex: 1;
        display: grid;
        gap: 0.125rem;
      }

      [part="result-label"] {
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
      }

      [part="result-desc"] {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
      }

      [part="result-cat"] {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-primary);
      }

      [part="empty"] {
        padding: var(--auy-space-xl);
        text-align: center;
        color: var(--auy-color-text-muted);
      }

      [part="footer"] {
        display: flex;
        gap: var(--auy-space-md);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-block-start: 1px solid var(--auy-color-border);
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        justify-content: center;
      }

      @media (prefers-reduced-motion: reduce) {
        [part="overlay"] {
          transition: none;
        }
      }

      @media print {
        [part="overlay"] {
          background: transparent;
        }
      }
    }
  `;

  @property({ type: Array }) items: { label: string; description?: string; href?: string; icon?: string; category?: string }[] = [];
  @property({ type: String }) placeholder = 'Buscar...';
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) shortcut = 'k';

  @state() private _query = '';
  @state() private _selectedIndex = 0;
  @state() private _filtered: { label: string; description?: string; href?: string; icon?: string; category?: string }[] = [];

  @query('[part="input"]') private _inputEl!: HTMLInputElement;

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('items') || changed.has('_query')) {
      this._filtered = this._filterItems();
    }
  }

  override shouldUpdate(changed: Map<string, unknown>) {
    if (changed.has('open')) return true;
    return this.open;
  }

  private _onGlobalKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === this.shortcut) {
      e.preventDefault();
      this._open();
    }
  };

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this._onGlobalKeydown);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this._onGlobalKeydown);
    }
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open') && this.open) {
      requestAnimationFrame(() => {
        this._inputEl?.focus();
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

  private _onInput(e: InputEvent) {
    this._query = (e.target as HTMLInputElement).value;
    this._selectedIndex = 0;
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
    if ((e.target as HTMLElement).getAttribute('part') === 'overlay') {
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
    if (!this.open) return nothing;
    const filtered = this._filtered;
    return html`
      <div part="overlay" @click=${this._closeOnOverlay}>
        <div part="panel" role="dialog" aria-modal="true" aria-label="Busca">
          <div part="input-wrapper">
            <span part="search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true" style="inline-size:1.25rem;block-size:1.25rem"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></span>
            <input
              part="input"
              .value=${this._query}
              @input=${this._onInput}
              @keydown=${this._onKeydown}
              placeholder=${this.placeholder}
              aria-label="Buscar"
              autofocus
            />
            <button part="close-btn" @click=${this._close} aria-label="Fechar busca">×</button>
            <kbd part="hint">ESC</kbd>
          </div>
          ${filtered.length > 0 ? html`
            <ul part="results" role="listbox">
              ${keyed(this._filtered, filtered.map((item, idx) => html`
                <li
                  part="result-item"
                  role="option"
                  data-index="${idx}"
                  aria-selected=${this._selectedIndex === idx ? 'true' : 'false'}
                  class=${classMap({ selected: this._selectedIndex === idx })}
                  @click=${this._handleSelect}
                  @mouseenter=${this._handleMouseEnter}
                >
                  ${item.icon ? html`<span part="result-icon">${item.icon}</span>` : ''}
                  <div part="result-content">
                    <span part="result-label">${highlight(item.label, this._query)}</span>
                    ${item.description ? html`<span part="result-desc">${highlight(item.description, this._query)}</span>` : ''}
                  </div>
                  ${item.category ? html`<span part="result-cat">${item.category}</span>` : ''}
                </li>
              `))}
            </ul>
          ` : html`
            <div part="empty">Nenhum resultado encontrado</div>
          `}
          <div part="footer">
            <span>↑↓ Navegar</span>
            <span>↵ Selecionar</span>
            <span>ESC Fechar</span>
          </div>
        </div>
      </div>
    `;
  }
}
