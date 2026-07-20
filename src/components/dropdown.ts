import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

@customElement('auy-dropdown')
export class AuyDropdown extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: inline-block;
        position: relative;
        contain: layout style;
      }

      details {
        position: relative;
      }

      summary {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: 0.5rem 0.75rem;
        font-family: inherit;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        line-height: 1.5;
        color: var(--auy-color-text);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        list-style: none;
        -webkit-user-select: none;
        transition: border-color var(--auy-transition-fast), box-shadow var(--auy-transition-fast);
      }

      summary::-webkit-details-marker {
        display: none;
      }

      summary::marker {
        display: none;
        content: '';
      }

      summary:hover {
        border-color: var(--auy-color-text-muted);
      }

      summary:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.0625rem;
      }

      details[open] summary {
        border-color: var(--auy-color-primary);
        border-end-end-radius: 0;
        border-end-start-radius: 0;
      }

      .indicator {
        display: flex;
        align-items: center;
        color: var(--auy-color-text-muted);
        transition: transform var(--auy-transition);
        line-height: 0;
        flex-shrink: 0;
      }

      .indicator svg {
        inline-size: 0.875rem;
        block-size: 0.875rem;
      }

      details[open] .indicator {
        transform: rotate(180deg);
      }

      .menu {
        position: absolute;
        inset-block-start: 100%;
        inset-inline-start: 0;
        min-inline-size: max(100%, 10rem);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-primary);
        border-block-start: none;
        border-radius: 0 0 var(--auy-radius-md) var(--auy-radius-md);
        box-shadow: var(--auy-shadow-lg);
        padding: var(--auy-space-2xs);
        z-index: 100;
        list-style: none;
        margin: 0;
        display: none;
        opacity: 0;
        transform: translateY(-4px);
        transition: display var(--auy-transition, 200ms) allow-discrete,
          opacity var(--auy-transition, 200ms),
          transform var(--auy-transition, 200ms);
        overflow: hidden;
      }

      details[open] .menu {
        display: block;
        opacity: 1;
        transform: translateY(0);
      }

      @starting-style {
        details[open] .menu {
          opacity: 0;
          transform: translateY(-4px);
        }
      }

      :host([align="end"]) .menu {
        inset-inline-start: auto;
        inset-inline-end: 0;
      }

      .menu-items {
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: 0;
        margin: 0;
      }

      .menu ::slotted(*) {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        inline-size: 100%;
        padding: var(--auy-space-sm) var(--auy-space-md);
        font-family: inherit;
        font-size: var(--auy-text-sm);
        line-height: 1.5;
        color: var(--auy-color-text);
        background: none;
        border: none;
        border-radius: var(--auy-radius-sm);
        cursor: pointer;
        text-align: start;
        text-decoration: none;
        transition: background var(--auy-transition-fast);
        touch-action: manipulation;
        box-sizing: border-box;
        white-space: nowrap;
      }

      .menu ::slotted(:hover),
      .menu ::slotted(.highlighted) {
        background: color-mix(in oklch, var(--auy-color-border) 20%, transparent);
        color: var(--auy-color-text);
        text-decoration: none;
      }

      .menu ::slotted(:focus-visible) {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: -0.0625rem;
      }

      .menu ::slotted([aria-current="page"]) {
        background: color-mix(in oklch, var(--auy-color-primary) 10%, transparent);
        color: var(--auy-color-primary);
        font-weight: 600;
      }

      .menu ::slotted([role="separator"]) {
        display: block;
        block-size: 1px;
        padding: 0;
        margin: var(--auy-space-2xs) var(--auy-space-sm);
        background: var(--auy-color-border);
        border: none;
        pointer-events: none;
        inline-size: auto;
        cursor: default;
      }

      .menu ::slotted([role="separator"]):hover {
        background: var(--auy-color-border);
      }

      @media (forced-colors: active) {
        summary {
          border: 1px solid ButtonText;
        }
        .menu {
          border: 1px solid ButtonText;
          border-block-start: none;
        }
        summary:focus-visible,
        .menu ::slotted(:focus-visible) {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .indicator {
          transition: none;
        }
        .menu {
          transition: none;
        }
      }

      @media print {
        .menu {
          display: none !important;
        }
      }
    }
  `;

  @property({ type: String, reflect: true }) align: 'start' | 'end' = 'start';
  @property({ type: String }) label = '';
  @property({ type: Boolean, reflect: true }) open = false;

  @state() private _open = false;

  @query('.menu') private _menuEl!: HTMLElement;

  private _boundKeydown: ((e: KeyboardEvent) => void) | null = null;
  private _boundClose: ((e: MouseEvent) => void) | null = null;

  private _toggle(e: Event) {
    const details = e.currentTarget as HTMLDetailsElement;
    this._open = details.open;
    this.open = details.open;
    if (this._open) {
      this._openMenu();
    } else {
      this._closeMenu();
    }
  }

  private _openMenu() {
    this._addOutsideListeners();
    requestAnimationFrame(() => this._focusFirstItem());
  }

  private _closeMenu() {
    this._removeOutsideListeners();
  }

  private _focusFirstItem() {
    if (!this._menuEl) return;
    const items = this._getItems();
    if (items.length > 0) {
      (items[0] as HTMLElement).focus();
    }
  }

  private _getItems(): NodeListOf<HTMLElement> {
    return this._menuEl?.querySelectorAll(
      'a, button, [role="menuitem"], [tabindex]:not([tabindex="-1"])'
    ) || (new NodeList() as NodeListOf<HTMLElement>);
  }

  private _navigateItems(direction: 1 | -1) {
    const items = Array.from(this._getItems()).filter(el => el.offsetParent !== null);
    if (items.length === 0) return;
    const currentIdx = items.findIndex(el => el === document.activeElement);
    const nextIdx = Math.max(0, Math.min(items.length - 1, currentIdx + direction));
    items[nextIdx]?.focus();
  }

  private _addOutsideListeners() {
    if (typeof window === 'undefined') return;
    this._boundKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        this._close();
        return;
      }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        this._navigateItems(e.key === 'ArrowDown' ? 1 : -1);
      }
    };
    this._boundClose = (e: MouseEvent) => {
      const path = e.composedPath();
      if (!path.includes(this)) {
        this._close();
      }
    };
    document.addEventListener('keydown', this._boundKeydown);
    document.addEventListener('click', this._boundClose);
  }

  private _removeOutsideListeners() {
    if (this._boundKeydown) {
      document.removeEventListener('keydown', this._boundKeydown);
      this._boundKeydown = null;
    }
    if (this._boundClose) {
      document.removeEventListener('click', this._boundClose);
      this._boundClose = null;
    }
  }

  private _close() {
    const details = this.shadowRoot?.querySelector('details');
    if (details) {
      details.removeAttribute('open');
      this._open = false;
      this.open = false;
    }
    this._removeOutsideListeners();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._removeOutsideListeners();
  }

  override render() {
    return html`
      <details @toggle=${this._toggle}>
        <summary part="trigger" role="button" aria-haspopup="true" aria-expanded=${this._open ? 'true' : 'false'}>
          <slot name="trigger">${this.label}</slot>
          <span part="indicator" class="indicator" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </summary>
        <div part="menu" class="menu" role="menu">
          <div class="menu-items">
            <slot></slot>
          </div>
        </div>
      </details>
    `;
  }
}
