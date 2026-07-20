import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @slot icon - Icon displayed in the toast
 * @slot - Default slot for toast message
 */
@customElement('auy-internal-toast')
export class AuyInternalToast extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .toast {
        display: none;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
        transform: translateX(100%);
        opacity: 0;
        transition: display var(--auy-transition-base) allow-discrete,
                    transform var(--auy-transition-base),
                    opacity var(--auy-transition-base);
      }

      .toast--open {
        display: flex;
        transform: translateX(0);
        opacity: 1;
      }

      @starting-style {
        .toast--open {
          transform: translateX(100%);
          opacity: 0;
        }
      }

      .icon {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        inline-size: 1.25em;
        block-size: 1.25em;
      }

      .icon svg {
        inline-size: 100%;
        block-size: 100%;
        fill: currentColor;
      }

      .message {
        flex: 1;
        min-inline-size: 0;
      }

      .dismiss {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        inline-size: 1.5em;
        block-size: 1.5em;
        padding: 0;
        border: none;
        border-radius: var(--auy-radius-sm);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 1.2em;
        line-height: 1;
        opacity: 0.7;
        transition: opacity var(--auy-transition-fast);
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      .dismiss:hover {
        opacity: 1;
      }

      .dismiss:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .toast--info {
        border-inline-start: 3px solid var(--auy-color-info);
      }

      .toast--success {
        border-inline-start: 3px solid var(--auy-color-success);
      }

      .toast--error {
        border-inline-start: 3px solid var(--auy-color-error);
      }

      .toast--warning {
        border-inline-start: 3px solid var(--auy-color-warning);
      }

      @media (prefers-reduced-motion: reduce) {
        .toast {
          transition: none;
        }
      }

      @media (forced-colors: active) {
        .toast {
          border: 1px solid CanvasText;
        }

        .dismiss {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        .toast {
          display: flex !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    }
  `;

  @property({ type: String })
  variant: 'info' | 'success' | 'error' | 'warning' = 'info';

  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Number })
  duration = 4000;

  @property({ type: Boolean })
  dismissible = true;

  private _timer: ReturnType<typeof setTimeout> | null = null;

  private _startTimer() {
    this._clearTimer();
    if (this.open && this.duration > 0 && typeof window !== 'undefined') {
      this._timer = window.setTimeout(() => {
        this.open = false;
      }, this.duration);
    }
  }

  private _clearTimer() {
    if (this._timer !== null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  private _dispatchShow() {
    this.dispatchEvent(new CustomEvent('show', { bubbles: true, composed: true }));
  }

  private _dispatchHide() {
    this.dispatchEvent(new CustomEvent('hide', { bubbles: true, composed: true }));
  }

  private _dismiss() {
    this.open = false;
  }

  override connectedCallback() {
    super.connectedCallback();
    if (this.open) {
      this._startTimer();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
  }

  override shouldUpdate(changed: Map<string, unknown>) {
    if (changed.has('variant') || changed.has('dismissible')) {
      return this.open;
    }
    return true;
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._startTimer();
        this._dispatchShow();
      } else {
        this._clearTimer();
        this._dispatchHide();
      }
    }
    if (changedProperties.has('duration') && this.open) {
      this._startTimer();
    }
  }

  override render() {
    return html`
      <div
        part="toast"
        class=${classMap({ toast: true, 'toast--open': this.open, [`toast--${this.variant}`]: true })}
        role="alert"
        aria-live="polite"
      >
        <span part="icon" class="icon">
          <slot name="icon">
            ${this._renderIcon()}
          </slot>
        </span>
        <span part="message" class="message">
          <slot></slot>
        </span>
        ${this.dismissible
          ? html`<button part="dismiss" class="dismiss" aria-label="Fechar" @click=${this._dismiss}>&times;</button>`
          : ''}
      </div>
    `;
  }

  private _renderIcon() {
    switch (this.variant) {
      case 'success':
        return html`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
      case 'error':
        return html`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`;
      case 'warning':
        return html`<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
      case 'info':
      default:
        return html`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15v-2h2v2zm2-4h-2V7h2v6z"/></svg>`;
    }
  }
}
