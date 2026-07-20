import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-nav')
export class AuyNav extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      nav {
        display: flex;
        align-items: center;
        gap: var(--auy-space-2xs);
        flex-wrap: wrap;
      }

      :host([variant="tray"]) nav {
        padding: var(--auy-space-2xs);
        background: color-mix(in oklch, var(--auy-color-border) 8%, transparent);
        border-radius: var(--auy-radius-lg);
      }

      :host([orientation="vertical"]) nav {
        flex-direction: column;
        align-items: stretch;
      }

      /* ── Links: navegação textual ── */
      ::slotted(a) {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: 0.5rem 0.75rem;
        font-family: inherit;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        line-height: 1.5;
        color: var(--auy-color-text-muted);
        text-decoration: none;
        border-radius: var(--auy-radius-md);
        white-space: nowrap;
        background: none;
        border: none;
        cursor: pointer;
        touch-action: manipulation;
        transition: background var(--auy-transition-fast), color var(--auy-transition-fast);
      }

      ::slotted(a:hover) {
        background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
        color: var(--auy-color-text);
      }

      ::slotted(a[aria-current="page"]) {
        background: var(--auy-color-surface);
        color: var(--auy-color-primary);
        font-weight: 600;
        box-shadow: 0 1px 3px oklch(0% 0 0 / 0.08);
      }

      :host([variant="tray"]) ::slotted(a[aria-current="page"]) {
        box-shadow: 0 1px 3px oklch(0% 0 0 / 0.1), 0 1px 2px oklch(0% 0 0 / 0.06);
      }

      /* ── Buttons: ação visual destacada ── */
      ::slotted(button) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-xs);
        padding: 0.5rem 0.875rem;
        font-family: inherit;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        line-height: 1.5;
        color: var(--auy-color-primary);
        text-decoration: none;
        border-radius: var(--auy-radius-md);
        white-space: nowrap;
        background: color-mix(in oklch, var(--auy-color-primary) 8%, transparent);
        border: 1px solid color-mix(in oklch, var(--auy-color-primary) 20%, transparent);
        cursor: pointer;
        touch-action: manipulation;
        transition: background var(--auy-transition-fast), color var(--auy-transition-fast), border-color var(--auy-transition-fast), box-shadow var(--auy-transition-fast);
      }

      ::slotted(button:hover) {
        background: var(--auy-color-primary);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-primary);
        box-shadow: 0 1px 3px oklch(0% 0 0 / 0.12);
      }

      ::slotted(button:active) {
        background: var(--auy-color-primary-active);
        border-color: var(--auy-color-primary-active);
      }

      ::slotted(button[aria-current="page"]) {
        background: var(--auy-color-primary);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-primary);
        box-shadow: 0 1px 3px oklch(0% 0 0 / 0.12);
      }

      /* ── Variante underline: só afeta links ── */
      :host([variant="underline"]) ::slotted(a) {
        border-radius: 0;
        padding: 0.5rem 0.875rem;
        border-block-end: 2px solid transparent;
        margin-block-end: 0;
      }

      :host([variant="underline"]) ::slotted(a:hover) {
        background: none;
        border-block-end-color: var(--auy-color-text-muted);
      }

      :host([variant="underline"]) ::slotted(a[aria-current="page"]) {
        background: none;
        box-shadow: none;
        border-block-end-color: var(--auy-color-primary);
      }

      :host([variant="underline"][orientation="vertical"]) ::slotted(a) {
        border-block-end: none;
        border-inline-start: 2px solid transparent;
        margin-inline-end: 0;
      }

      :host([variant="underline"][orientation="vertical"]) ::slotted(a:hover) {
        border-block-end-color: transparent;
        border-inline-start-color: var(--auy-color-text-muted);
      }

      :host([variant="underline"][orientation="vertical"]) ::slotted(a[aria-current="page"]) {
        border-block-end-color: transparent;
        border-inline-start-color: var(--auy-color-primary);
        background: color-mix(in oklch, var(--auy-color-primary) 6%, transparent);
      }

      ::slotted(a:focus-visible),
      ::slotted(button:focus-visible) {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.0625rem;
      }

      @media (forced-colors: active) {
        ::slotted(a[aria-current="page"]) {
          border: 1px solid Highlight;
        }
        ::slotted(a:focus-visible),
        ::slotted(button:focus-visible) {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media print {
        nav {
          display: flex !important;
        }
      }
    }
  `;

  @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';
  @property({ type: String, reflect: true }) variant: 'default' | 'tray' | 'underline' = 'default';
  @property({ type: String, attribute: 'aria-label' }) ariaNavLabel = 'Navegação';

  override render() {
    return html`
      <nav part="nav" aria-label=${this.ariaNavLabel}>
        <slot></slot>
      </nav>
    `;
  }
}
