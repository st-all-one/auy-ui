import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AuyShadowElement } from '../_internal/AuyShadowElement.base.ts';
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts';

/** Representa um toast individual dentro do container. */
interface ToastItem {
  id: string;
  message: string;
  variant: 'info' | 'success' | 'error' | 'warning';
  duration: number;
}

/** Container gerenciador de toasts com posicionamento fixo e auto-dismiss. */
@customElement('auy-comp-toast-container')
export class AuyCompToastContainer extends StyleCustomizableMixin(AuyShadowElement) {
  static override styles = css`
    @layer components {
      :host {
        position: fixed;
        z-index: var(--auy-z-toast);
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

      [data-auy="toast"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        background: oklch(from var(--auy-color-info) 95% 0.04 h);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
        pointer-events: auto;
        max-inline-size: 24rem;
        animation: toast-in var(--auy-transition, 200ms) ease forwards;
        border-inline-start: 3px solid var(--auy-color-info);
      }

      [data-auy-variant="info"] {
        background: oklch(from var(--auy-color-info) 95% 0.04 h);
        border-inline-start-color: var(--auy-color-info);
      }

      [data-auy-variant="success"] {
        background: oklch(from var(--auy-color-success) 95% 0.04 h);
        border-inline-start-color: var(--auy-color-success);
      }

      [data-auy-variant="error"] {
        background: oklch(from var(--auy-color-error) 95% 0.04 h);
        border-inline-start-color: var(--auy-color-error);
      }

      [data-auy-variant="warning"] {
        background: oklch(from var(--auy-color-warning) 95% 0.04 h);
        border-inline-start-color: var(--auy-color-warning);
      }

      @media (prefers-color-scheme: dark) {
        [data-auy-variant="info"] { background: oklch(from var(--auy-color-info) 25% 0.06 h); }
        [data-auy-variant="success"] { background: oklch(from var(--auy-color-success) 25% 0.06 h); }
        [data-auy-variant="error"] { background: oklch(from var(--auy-color-error) 25% 0.06 h); }
        [data-auy-variant="warning"] { background: oklch(from var(--auy-color-warning) 25% 0.06 h); }
      }

      [data-auy="toast"][data-auy-state="removing"] {
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

      :host([position*="left"]) [data-auy="toast"] {
        animation-name: toast-in-left;
      }

      :host([position*="left"]) [data-auy="toast"][data-auy-state="removing"] {
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
          transform: translateX(-100%);
        }
        to {
          opacity: 0;
          transform: translateX(0);
        }
      }

      [data-auy-part="dismiss"] {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-inline-size: 2.75rem;
        min-block-size: 2.75rem;
        flex-shrink: 0;
        border-radius: var(--auy-radius-sm);
        cursor: pointer;
        font-size: var(--auy-text-lg);
        line-height: 1;
        opacity: 0.7;
        transition: opacity var(--auy-transition-fast);
        touch-action: manipulation;
      }

      [data-auy-part="dismiss"]:hover {
        opacity: 1;
      }

      [data-auy-part="dismiss"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      [data-auy-part="message"] {
        flex: 1;
        min-inline-size: 0;
      }

      @media (forced-colors: active) {
        [data-auy="toast"] {
          border: 1px solid CanvasText;
        }
        [data-auy-part="dismiss"]:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [data-auy="toast"] {
          animation: none;
        }
      }
    }
  `;

  /** Posição fixa do container na tela. */
  @property({ type: String, reflect: true }) position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' = 'top-right';
  /** Duração padrão em ms antes do auto-dismiss. */
  @property({ type: Number }) defaultDuration = 4000;

  /** Lista de toasts ativos. */
  @state() private _toasts: ToastItem[] = [];
  private _counter = 0;

  /** Exibe um novo toast e retorna seu ID. */
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

  /** Remove um toast pelo ID com animação de saída. */
  dismiss(id: string) {
    const el = this.shadowRoot?.querySelector(`[data-id="${id}"]`);
    if (el) {
      el.setAttribute('data-auy-state', 'removing');
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
      ${this._renderCustomStyles()}
      ${this._toasts.map(t => html`
        <div
          part="toast"
          data-auy="toast" data-auy-variant=${t.variant}
          data-id=${t.id}
          role="alert"
          aria-live="polite"
        >
          <span part="icon" aria-hidden="true">${this._getIcon(t.variant)}</span>
          <span part="message" data-auy-part="message">${t.message}</span>
          <button
            part="dismiss"
            data-auy-part="dismiss"
            @click=${() => this._dismissToast(t.id)}
            aria-label="Fechar"
          >&times;</button>
        </div>
      `)}
    `;
  }
}
