import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { t } from './_internal/locale.ts';

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
  override createRenderRoot() { return this; }

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

  override firstUpdated() {
    this._moveChildren();
  }

  private _moveChildren() {
    const containers = this.querySelectorAll('[data-slot]');
    Array.from(this.children).forEach(child => {
      const slot = child.getAttribute('slot') || 'default';
      let container = this.querySelector(`[data-slot="${slot}"]`);
      if (!container) container = containers[0];
      if (container) container.appendChild(child);
    });
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
        data-element="toast"
        data-part="toast"
        class=${classMap({ toast: true, 'toast--open': this.open, [`toast--${this.variant}`]: true })}
        role="alert"
        aria-atomic="true"
      >
        <span data-part="icon" class="icon">
          <span data-slot="icon">${this._renderIcon()}</span>
        </span>
        <span data-part="message" class="message">
          <span data-slot="default"></span>
        </span>
        ${this.dismissible
          ? html`<button data-part="dismiss" class="dismiss" aria-label=${t('toastClose')} @click=${this._dismiss}>&times;</button>`
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
