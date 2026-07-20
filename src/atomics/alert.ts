import { LitElement, html, svg, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ICON_SVG } from '../assets/icons.js';

/**
 * @slot title - Alert title
 * @slot - Default slot for alert message
 */
@customElement('auy-internal-alert')
export class AuyInternalAlert extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      :host(:not([open])) {
        display: none;
      }

      .alert {
        display: flex;
        align-items: flex-start;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
      }

      @starting-style {
        .alert {
          opacity: 0;
        }
      }

      .alert.variant-info {
        background: oklch(from var(--auy-color-info) 95% 0.02 h);
      }

      .alert.variant-success {
        background: oklch(from var(--auy-color-success) 95% 0.02 h);
      }

      .alert.variant-warning {
        background: oklch(from var(--auy-color-warning) 95% 0.02 h);
      }

      .alert.variant-error {
        background: oklch(from var(--auy-color-error) 95% 0.02 h);
      }

      .icon {
        flex-shrink: 0;
        inline-size: 20px;
        block-size: 20px;
        margin-block-start: 1px;
      }

      .content {
        flex: 1;
        display: grid;
        gap: 0.25rem;
      }

      ::slotted([slot="title"]) {
        font-weight: 600;
      }

      .close {
        flex-shrink: 0;
        padding: 0.25rem;
        cursor: pointer;
        opacity: 0.7;
        color: inherit;
        background: none;
        border: none;
        line-height: 1;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      .close:hover {
        opacity: 1;
      }

      .close:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .close {
          border: 1px solid ButtonText;
        }

        .alert {
          border: 1px solid CanvasText;
        }
      }

      @media (prefers-color-scheme: dark) {
        .alert.variant-info {
          background: oklch(from var(--auy-color-info) 25% 0.06 h);
          color: oklch(from var(--auy-color-info) 85% 0.1 h);
        }
        .alert.variant-success {
          background: oklch(from var(--auy-color-success) 25% 0.06 h);
          color: oklch(from var(--auy-color-success) 85% 0.1 h);
        }
        .alert.variant-warning {
          background: oklch(from var(--auy-color-warning) 25% 0.06 h);
          color: oklch(from var(--auy-color-warning) 85% 0.12 h);
        }
        .alert.variant-error {
          background: oklch(from var(--auy-color-error) 25% 0.06 h);
          color: oklch(from var(--auy-color-error) 85% 0.1 h);
        }
      }

      @media (prefers-reduced-motion: no-preference) {
        .alert {
          transition: opacity var(--auy-transition, 200ms ease);
          opacity: 1;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .alert {
          transition: none;
        }
      }

      @media print {
        .close {
          display: none;
        }
      }
    }
  `;

  @property({ reflect: true, type: Boolean })
  open: boolean = true;

  @property({ type: Boolean })
  dismissible: boolean = false;

  @property({ type: String })
  variant: 'info' | 'success' | 'warning' | 'error' = 'info';

  @property({ type: String })
  icon: string = '';

  private _dismiss() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
  }

  show() {
    this.open = true;
  }

  hide() {
    this.open = false;
  }

  override render() {
    const variantIcon = this.icon
      ? svg`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>${this.variant}</title><use href="#${this.icon}"/></svg>`
      : ICON_SVG[this.variant];

    return html`
      <div part="alert" class=${classMap({ alert: true, [`variant-${this.variant}`]: true })} role="alert" aria-live="polite">
        <div part="icon" class="icon">
          ${variantIcon}
        </div>
        <div part="content" class="content">
          <slot name="title" part="title"></slot>
          <slot part="message"></slot>
        </div>
        ${this.dismissible ? html`<button part="close" class="close" @click=${this._dismiss} aria-label="Fechar">×</button>` : ''}
      </div>
    `;
  }
}
