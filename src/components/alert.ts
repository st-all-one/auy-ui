import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { t } from './_internal/locale.ts';

/**
 * @element auy-comp-alert
 * @slot - Conteúdo principal (descrição)
 * @slot title - Título do alerta
 * @slot action - Botões de ação
 * @fires show - Disparado quando o alerta é exibido
 * @fires dismiss - Disparado quando o alerta é fechado
 * @csspart alert - Container principal
 * @csspart icon - Ícone de variante
 * @csspart title - Título
 * @csspart description - Descrição
 * @csspart actions - Container de ações
 * @csspart dismiss - Botão de fechar
 */
@customElement('auy-comp-alert')
export class AuyCompAlert extends LitElement {
  override createRenderRoot() { return this; }

  /** Variante visual do alerta */
  @property({ type: String })
  variant: 'info' | 'success' | 'error' | 'warning' = 'info';

  /** Controla a visibilidade do alerta */
  @property({ type: Boolean, reflect: true })
  open = true;

  /** Habilita o botão de fechar */
  @property({ type: Boolean })
  dismissible = true;

  /** Título do alerta */
  @property({ type: String })
  title = '';

  /** Exibe o ícone da variante */
  @property({ type: Boolean })
  icon = true;

  /** Tempo em ms para auto-fechar (0 = desligado) */
  @property({ type: Number })
  timeout = 0;

  private _timer: ReturnType<typeof setTimeout> | null = null;

  private get _hasActions() {
    return Array.from(this.children).some(child => child.getAttribute('slot') === 'action');
  }

  private get _role() {
    return this._hasActions ? 'alertdialog' as const : 'alert' as const;
  }

  private get _ariaLive() {
    return this.variant === 'error' || this.variant === 'warning' ? 'assertive' as const : 'polite' as const;
  }

  private _startTimer() {
    this._clearTimer();
    if (this.timeout > 0 && typeof window !== 'undefined') {
      this._timer = window.setTimeout(() => {
        this.open = false;
      }, this.timeout);
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

  private _dispatchDismiss() {
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
  }

  private _handleDismiss() {
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

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._startTimer();
        this._dispatchShow();
      } else {
        this._clearTimer();
        this._dispatchDismiss();
      }
    }
    if (changedProperties.has('timeout') && this.open) {
      this._startTimer();
    }
  }

  override render() {
    if (!this.open) {
      return html``;
    }

    return html`
      <div
        data-element="alert"
        data-part="alert"
        class=${classMap({
          alert: true,
          'alert--info': this.variant === 'info',
          'alert--success': this.variant === 'success',
          'alert--error': this.variant === 'error',
          'alert--warning': this.variant === 'warning',
        })}
        role=${this._role}
        aria-live=${this._ariaLive}
        aria-atomic="true"
      >
        ${this.icon
          ? html`<span data-part="icon" class="alert__icon">${this._renderIcon()}</span>`
          : ''}
        <div data-part="content" class="alert__content">
          <div data-part="title" class="alert__title">
            <div data-slot="title">${this.title}</div>
          </div>
          <div data-part="description">
            <div data-slot="default"></div>
          </div>
          <div data-part="actions" class="alert__actions">
            <div data-slot="action"></div>
          </div>
        </div>
        ${this.dismissible
          ? html`<button data-part="dismiss" class="alert__dismiss" aria-label=${t('alertClose')} @click=${this._handleDismiss}>&times;</button>`
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
