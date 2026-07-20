import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('auy-accordion')
export class AuyAccordion extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      details {
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        overflow: hidden;
        transition: border-color var(--auy-transition);
      }

      details + details {
        margin-block-start: -1px;
        border-radius: 0;
      }

      details:first-of-type {
        border-start-end-radius: var(--auy-radius-md);
        border-start-start-radius: var(--auy-radius-md);
      }

      details:last-of-type {
        border-end-end-radius: var(--auy-radius-md);
        border-end-start-radius: var(--auy-radius-md);
      }

      details[open] {
        border-color: var(--auy-color-primary);
      }

      summary {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        font-weight: 500;
        font-size: var(--auy-text-sm);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        list-style: none;
        -webkit-user-select: none;
      }

      summary::-webkit-details-marker {
        display: none;
      }

      summary::marker {
        display: none;
        content: '';
      }

      summary:hover {
        background: color-mix(in oklch, var(--auy-color-border) 10%, transparent);
      }

      summary:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: -0.125rem;
      }

      .indicator {
        margin-inline-start: auto;
        transition: transform var(--auy-transition);
        font-size: 0.75rem;
        line-height: 1;
        flex-shrink: 0;
      }

      details[open] .indicator {
        transform: rotate(180deg);
      }

      .content {
        padding: var(--auy-space-md);
        padding-block-start: 0;
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
      }

      @media (forced-colors: active) {
        details {
          border: 1px solid ButtonText;
        }
        summary:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: -2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .indicator {
          transition: none;
        }
      }

      @media print {
        details {
          border-color: #000;
        }
        summary {
          font-weight: 700;
        }
      }
    }
  `;

  @property({ type: String }) heading = '';
  @property({ type: Boolean, reflect: true }) open = false;

  @state() private _open = false;

  private _toggle(e: Event) {
    const details = e.currentTarget as HTMLDetailsElement;
    this._open = details.open;
    this.open = details.open;
    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { open: this._open },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <details ?open=${this.open} @toggle=${this._toggle}>
        <summary part="summary">
          <slot name="heading">${this.heading}</slot>
          <span part="indicator" class="indicator" aria-hidden="true">▾</span>
        </summary>
        <div part="content" class="content">
          <slot></slot>
        </div>
      </details>
    `;
  }
}
