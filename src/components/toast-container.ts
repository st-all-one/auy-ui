import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

interface ToastItem {
  id: string;
  message: string;
  variant: 'info' | 'success' | 'error' | 'warning';
  duration: number;
}

@customElement('auy-comp-toast-container')
export class AuyCompToastContainer extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        position: fixed;
        z-index: 2;
        display: grid;
        gap: var(--auy-space-sm);
        pointer-events: none;
      }

      :host([position="top-right"]) {
        inset-block-start: var(--auy-space-md);
        inset-inline-end: var(--auy-space-md);
      }

      :host([position="top-left"]) {
        inset-block-start: var(--auy-space-md);
        inset-inline-start: var(--auy-space-md);
      }

      :host([position="bottom-right"]) {
        inset-block-end: var(--auy-space-md);
        inset-inline-end: var(--auy-space-md);
      }

      :host([position="bottom-left"]) {
        inset-block-end: var(--auy-space-md);
        inset-inline-start: var(--auy-space-md);
      }

      :host([position="top-center"]) {
        inset-block-start: var(--auy-space-md);
        inset-inline-start: 50%;
        translate: -50% 0;
      }

      .toast {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
        pointer-events: auto;
        max-inline-size: 24rem;
        animation: toast-in var(--auy-transition, 200ms) ease forwards;
        border-inline-start: 3px solid var(--auy-color-info);
      }

      .toast--success {
        border-inline-start-color: var(--auy-color-success);
      }

      .toast--error {
        border-inline-start-color: var(--auy-color-error);
      }

      .toast--warning {
        border-inline-start-color: var(--auy-color-warning);
      }

      .toast.removing {
        animation: toast-out var(--auy-transition, 200ms) ease forwards;
      }

      @keyframes toast-in {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes toast-out {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      :host([position*="left"]) .toast {
        animation-name: toast-in-left;
      }

      :host([position*="left"]) .toast.removing {
        animation-name: toast-out-left;
      }

      @keyframes toast-in-left {
        from {
          opacity: 0;
          transform: translateX(-100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes toast-out-left {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(-100%);
        }
      }

      .dismiss {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.5em;
        block-size: 1.5em;
        flex-shrink: 0;
        border-radius: var(--auy-radius-sm);
        cursor: pointer;
        font-size: 1.2em;
        line-height: 1;
        opacity: 0.7;
        transition: opacity var(--auy-transition-fast);
        touch-action: manipulation;
      }

      .dismiss:hover {
        opacity: 1;
      }

      .dismiss:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .message {
        flex: 1;
        min-inline-size: 0;
      }

      @media (forced-colors: active) {
        .toast {
          border: 1px solid CanvasText;
        }
        .dismiss:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .toast {
          animation: none;
        }
      }
    }
  `;

  static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: String, reflect: true }) position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' = 'top-right';
  @property({ type: Number }) defaultDuration = 4000;

  @state() private _toasts: ToastItem[] = [];
  private _counter = 0;

  show(message: string, variant: ToastItem['variant'] = 'info', duration?: number) {
    const id = `toast-${++this._counter}`;
    const toast: ToastItem = {
      id,
      message,
      variant,
      duration: duration ?? this.defaultDuration,
    };
    this._toasts = [...this._toasts, toast];

    if (toast.duration > 0) {
      setTimeout(() => this.dismiss(id), toast.duration);
    }

    return id;
  }

  dismiss(id: string) {
    const el = this.shadowRoot?.querySelector(`[data-id="${id}"]`);
    if (el) {
      el.classList.add('removing');
      setTimeout(() => {
        this._toasts = this._toasts.filter(t => t.id !== id);
      }, 200);
    } else {
      this._toasts = this._toasts.filter(t => t.id !== id);
    }
  }

  private _dismissToast(id: string) {
    this.dismiss(id);
  }

  private _getIcon(variant: string) {
    switch (variant) {
      case 'success': return '✓';
      case 'error': return '✕';
      case 'warning': return '⚠';
      default: return 'ℹ';
    }
  }

  override render() {
    if (this._toasts.length === 0) return null;

    return html`
      ${this._toasts.map(t => html`
        <div
          part="toast"
          class="toast toast--${t.variant}"
          data-id=${t.id}
          role="alert"
          aria-live="polite"
        >
          <span part="icon" aria-hidden="true">${this._getIcon(t.variant)}</span>
          <span part="message" class="message">${t.message}</span>
          <button
            part="dismiss"
            class="dismiss"
            @click=${() => this._dismissToast(t.id)}
            aria-label="Fechar"
          >&times;</button>
        </div>
      `)}
    `;
  }
}
