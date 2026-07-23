import { html, css } from 'lit';
import { customElement, property, queryAssignedElements } from 'lit/decorators.js';
import { AuyShadowElement } from '../_internal/AuyShadowElement.base.ts';
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts';


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
export class AuyCompAlert extends StyleCustomizableMixin(AuyShadowElement) {
  static override get observedDataEvents(): string[] {
    return ['show', 'dismiss']
  }

  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      [data-auy="alert"] {
        display: flex;
        align-items: flex-start;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
        background: oklch(from var(--auy-color-info) 95% 0.02 h);
        border-inline-start: 3px solid var(--auy-color-info);
        transition: opacity var(--auy-transition-base), transform var(--auy-transition-base);
      }

      [data-auy-variant="success"] {
        background: oklch(from var(--auy-color-success) 95% 0.02 h);
        border-inline-start-color: var(--auy-color-success);
      }

      [data-auy-variant="warning"] {
        background: oklch(from var(--auy-color-warning) 95% 0.02 h);
        border-inline-start-color: var(--auy-color-warning);
      }

      [data-auy-variant="error"] {
        background: oklch(from var(--auy-color-error) 95% 0.02 h);
        border-inline-start-color: var(--auy-color-error);
      }

      @starting-style {
        [data-auy="alert"] {
          opacity: 0;
          transform: translateY(-0.5rem);
        }
      }

      [data-auy-part="icon"] {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        inline-size: 1.25em;
        block-size: 1.25em;
        margin-block-start: 1px;
      }

      [data-auy-part="icon"] svg {
        inline-size: 100%;
        block-size: 100%;
        fill: currentColor;
      }

      [data-auy-part="content"] {
        flex: 1;
        display: grid;
        gap: 0.25rem;
        min-inline-size: 0;
      }

      [data-auy-part="title"] {
        font-weight: var(--auy-font-weight-semibold);
        font-size: var(--auy-text-sm);
      }

      [data-auy-part="actions"] {
        display: flex;
        gap: var(--auy-space-sm);
        margin-block-start: var(--auy-space-xs);
      }

      [data-auy-part="dismiss"] {
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
        font-size: var(--auy-text-lg);
        line-height: 1;
        opacity: 0.7;
        touch-action: manipulation;
      }

      [data-auy-part="dismiss"]:hover {
        opacity: 1;
      }

      [data-auy-part="dismiss"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (prefers-color-scheme: dark) {
        [data-auy="alert"] {
          background: oklch(from var(--auy-color-info) 25% 0.06 h);
          color: oklch(from var(--auy-color-info) 85% 0.1 h);
        }

        [data-auy-variant="success"] {
          background: oklch(from var(--auy-color-success) 25% 0.06 h);
          color: oklch(from var(--auy-color-success) 85% 0.1 h);
        }

        [data-auy-variant="warning"] {
          background: oklch(from var(--auy-color-warning) 25% 0.06 h);
          color: oklch(from var(--auy-color-warning) 85% 0.12 h);
        }

        [data-auy-variant="error"] {
          background: oklch(from var(--auy-color-error) 25% 0.06 h);
          color: oklch(from var(--auy-color-error) 85% 0.1 h);
        }
      }

      @media (forced-colors: active) {
        [data-auy="alert"] {
          border: 1px solid CanvasText;
        }

        [data-auy-part="dismiss"] {
          border: 1px solid ButtonText;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [data-auy="alert"] {
          transition: none;
        }
      }

      @media print {
        [data-auy="alert"] {
          break-inside: avoid;
        }
      }
    }
  `;

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

  @queryAssignedElements({ slot: 'action' })
  private _actionSlotEls!: HTMLElement[];

  private _timer: ReturnType<typeof setTimeout> | null = null;

  private get _hasActions() {
    return this._actionSlotEls.length > 0;
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
      ${this._renderCustomStyles()}
      <div
        part="alert"
        data-auy="alert"
        data-auy-variant=${this.variant}
        role=${this._role}
        aria-live=${this._ariaLive}
        aria-atomic="true"
      >
        ${this.icon
          ? html`<span part="icon" data-auy-part="icon">${this._renderIcon()}</span>`
          : ''}
        <div part="content" data-auy-part="content">
          <div part="title" data-auy-part="title">
            <slot name="title">${this.title}</slot>
          </div>
          <div part="description">
            <slot></slot>
          </div>
          <div part="actions" data-auy-part="actions">
            <slot name="action"></slot>
          </div>
        </div>
        ${this.dismissible
          ? html`<button part="dismiss" data-auy-part="dismiss" aria-label="Fechar" @click=${this._handleDismiss}>&times;</button>`
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
