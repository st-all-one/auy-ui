import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { t } from './_internal/locale.ts';

/** Representa um toast individual dentro do container. */
interface ToastItem {
  id: string;
  message: string;
  variant: 'info' | 'success' | 'error' | 'warning';
  duration: number;
}

/** Container gerenciador de toasts com posicionamento fixo e auto-dismiss. */
@customElement('auy-comp-toast-container')
export class AuyCompToastContainer extends LitElement {
  override createRenderRoot() { return this; }

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
    const el = this.querySelector(`[data-id="${id}"]`);
    if (el) {
      el.classList.add('removing');
      setTimeout(() => {
        this._toasts = this._toasts.filter(item => item.id !== id);
      }, 200);
    } else {
      this._toasts = this._toasts.filter(item => item.id !== id);
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
      ${this._toasts.map(toast => html`
        <div
          data-element="toast-container"
          data-part="toast"
          class="toast toast--${toast.variant}"
          data-id=${toast.id}
          role="alert"
          aria-live="polite"
        >
          <span data-part="icon" aria-hidden="true">${this._getIcon(toast.variant)}</span>
          <span data-part="message" class="message">${toast.message}</span>
          <button
            data-part="dismiss"
            class="dismiss"
            @click=${() => this._dismissToast(toast.id)}
            aria-label=${t('toastClose')}
          >&times;</button>
        </div>
      `)}
    `;
  }
}
