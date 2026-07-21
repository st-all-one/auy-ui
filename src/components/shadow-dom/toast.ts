import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Toast component for displaying brief, auto-dismissible notifications.
 *
 * @element auy-comp-toast
 *
 * @property {'info'|'success'|'error'|'warning'} variant - Visual variant of the toast. Defaults to 'info'.
 * @property {boolean} open - Whether the toast is visible. Reflected as attribute.
 * @property {number} duration - Auto-dismiss duration in milliseconds. Set to 0 to disable. Defaults to 4000.
 * @property {boolean} dismissible - Whether the toast shows a dismiss button. Defaults to true.
 *
 * @fires {CustomEvent} show - Dispatched when the toast opens.
 * @fires {CustomEvent} hide - Dispatched when the toast closes.
 *
 * @slot - Default slot for the toast message.
 * @slot icon - Slot for a custom icon element.
 *
 * @csspart toast - The root container of the toast.
 * @csspart icon - The icon container.
 * @csspart message - The message container.
 * @csspart dismiss - The dismiss button.
 */
@customElement('auy-comp-toast')
export class AuyCompToast extends LitElement {
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
        min-inline-size: 2.75rem;
        min-block-size: 2.75rem;
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
        background: oklch(from var(--auy-color-info) 95% 0.04 h);
      }

      .toast--success {
        border-inline-start: 3px solid var(--auy-color-success);
        background: oklch(from var(--auy-color-success) 95% 0.04 h);
      }

      .toast--error {
        border-inline-start: 3px solid var(--auy-color-error);
        background: oklch(from var(--auy-color-error) 95% 0.04 h);
      }

      .toast--warning {
        border-inline-start: 3px solid var(--auy-color-warning);
        background: oklch(from var(--auy-color-warning) 95% 0.04 h);
      }

      @media (prefers-color-scheme: dark) {
        .toast--info { background: oklch(from var(--auy-color-info) 25% 0.06 h); }
        .toast--success { background: oklch(from var(--auy-color-success) 25% 0.06 h); }
        .toast--error { background: oklch(from var(--auy-color-error) 25% 0.06 h); }
        .toast--warning { background: oklch(from var(--auy-color-warning) 25% 0.06 h); }
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

  /** Visual variant of the toast. */
  @property({ type: String })
  variant: 'info' | 'success' | 'error' | 'warning' = 'info';

  /** Whether the toast is visible. */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Auto-dismiss duration in milliseconds (0 to disable). */
  @property({ type: Number })
  duration = 4000;

  /** Whether the toast shows a dismiss button. */
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
        aria-atomic="true"
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
