import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { AuyShadowElement } from '../_internal/AuyShadowElement.base.ts';
import { ICONS } from '../_internal/icons.ts';
import type { IconName } from '../_internal/icons.ts';

/**
 * @element auy-comp-button
 * @slot - Rótulo do botão
 * @slot name="icon" - Ícone personalizado
 * @csspart button - Elemento `<button>` (quando não é link)
 * @csspart link - Elemento `<a>` (quando href é definido)
 * @csspart icon - Container do ícone
 * @csspart spinner - Indicador de carregamento
 */
@customElement('auy-comp-button')
export class AuyCompButton extends AuyShadowElement {
  static override styles = css`
    @layer components {
      :host {
        display: inline-block;
        contain: content;
      }

      :host([fullWidth]) {
        display: flex;
      }

      .btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-xs);
        inline-size: 100%;
        font-family: inherit;
        font-weight: var(--auy-font-weight-medium);
        line-height: 1.5;
        text-align: center;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: var(--auy-radius-md);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        transition: background-color var(--auy-transition), border-color var(--auy-transition), color var(--auy-transition), box-shadow var(--auy-transition);
      }

      .btn--sm {
        min-block-size: 2.5rem;
        padding: 0.375rem 0.75rem;
        font-size: var(--auy-text-sm);
      }

      .btn--md {
        min-block-size: 2.75rem;
        padding: 0.5rem 1rem;
        font-size: var(--auy-text-sm);
      }

      .btn--lg {
        min-block-size: 3rem;
        padding: 0.625rem 1.5rem;
        font-size: var(--auy-text-base);
      }

      .btn--icon {
        min-block-size: 2.75rem;
        min-inline-size: 2.75rem;
        padding: 0.375rem;
        font-size: var(--auy-text-base);
      }

      .btn--primary {
        background-color: var(--auy-color-primary);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-primary);
      }

      .btn--primary:hover {
        background-color: var(--auy-color-primary-hover);
        border-color: var(--auy-color-primary-hover);
      }

      .btn--primary:active {
        background-color: var(--auy-color-primary-active);
        border-color: var(--auy-color-primary-active);
      }

      .btn--secondary {
        background-color: var(--auy-color-secondary);
        color: var(--auy-color-secondary-inverse);
        border-color: var(--auy-color-secondary);
      }

      .btn--secondary:hover {
        background-color: var(--auy-color-secondary-hover);
        border-color: var(--auy-color-secondary-hover);
      }

      .btn--secondary:active {
        background-color: var(--auy-color-secondary-active);
        border-color: var(--auy-color-secondary-active);
      }

      .btn--success {
        background-color: var(--auy-color-success);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-success);
      }

      .btn--success:hover {
        background-color: color-mix(in oklch, var(--auy-color-success) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-success) 85%, var(--auy-color-text));
      }

      .btn--success:active {
        background-color: color-mix(in oklch, var(--auy-color-success) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-success) 75%, var(--auy-color-text));
      }

      .btn--error {
        background-color: var(--auy-color-error);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-error);
      }

      .btn--error:hover {
        background-color: color-mix(in oklch, var(--auy-color-error) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-error) 85%, var(--auy-color-text));
      }

      .btn--error:active {
        background-color: color-mix(in oklch, var(--auy-color-error) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-error) 75%, var(--auy-color-text));
      }

      .btn--warning {
        background-color: var(--auy-color-warning);
        color: var(--auy-color-text);
        border-color: var(--auy-color-warning);
      }

      .btn--warning:hover {
        background-color: color-mix(in oklch, var(--auy-color-warning) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-warning) 85%, var(--auy-color-text));
      }

      .btn--warning:active {
        background-color: color-mix(in oklch, var(--auy-color-warning) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-warning) 75%, var(--auy-color-text));
      }

      .btn--info {
        background-color: var(--auy-color-info);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-info);
      }

      .btn--info:hover {
        background-color: color-mix(in oklch, var(--auy-color-info) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-info) 85%, var(--auy-color-text));
      }

      .btn--info:active {
        background-color: color-mix(in oklch, var(--auy-color-info) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-info) 75%, var(--auy-color-text));
      }

      .btn--ghost {
        background-color: transparent;
        color: var(--auy-color-text);
        border-color: transparent;
      }

      .btn--ghost:hover {
        background-color: color-mix(in oklch, var(--auy-color-border) 20%, transparent);
      }

      .btn--ghost:active {
        background-color: color-mix(in oklch, var(--auy-color-border) 35%, transparent);
      }

      .btn--link {
        background-color: transparent;
        color: var(--auy-color-primary);
        padding-inline: 0;
        border: none;
        text-decoration: none;
      }

      .btn--link:hover {
        color: var(--auy-color-primary-hover);
        text-decoration: underline;
      }

      .btn--link:active {
        color: var(--auy-color-primary-active);
      }

      .btn:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .btn:disabled,
      .btn[aria-disabled="true"] {
        opacity: 0.45;
        filter: saturate(0.3);
        cursor: not-allowed;
        pointer-events: none;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        inline-size: 1em;
        block-size: 1em;
      }

      .icon svg {
        inline-size: 100%;
        block-size: 100%;
        fill: currentColor;
        stroke: currentColor;
      }

      .spinner {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        inline-size: 1.25em;
        block-size: 1.25em;
        line-height: 0;
      }

      .spinner::after {
        content: '';
        display: block;
        box-sizing: border-box;
        inline-size: 100%;
        block-size: 100%;
        border: 0.125em solid color-mix(in oklch, currentColor 25%, transparent);
        border-block-start-color: currentColor;
        border-radius: 50%;
        animation: auy-button-spin 0.6s linear infinite;
      }

      @keyframes auy-button-spin {
        to { transform: rotate(360deg); }
      }

      .btn--loading {
        opacity: 0.7;
        filter: saturate(0.45);
        pointer-events: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .btn {
          transition: none;
        }

        .spinner::after {
          animation: none;
        }
      }

      @media (forced-colors: active) {
        .btn {
          border: 1px solid ButtonText;
        }

        .btn--link {
          border: none;
        }

        .btn:focus-visible {
          outline: 0.125rem solid Highlight;
          outline-offset: 0.125rem;
        }
      }

      @media print {
        .btn {
          background-color: transparent !important;
          color: CanvasText !important;
          border-color: CanvasText !important;
        }

        .btn--link {
          text-decoration: underline;
        }
      }
    }
  `;

  /** Variante visual: primary, secondary, success, error, warning, info, ghost, link */
  @property({ type: String })
  variant: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost' | 'link' = 'primary';

  /** Tamanho: sm, md, lg, icon */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' | 'icon' = 'md';

  /** Estado de carregamento (desabilita e mostra spinner) */
  @property({ type: Boolean, reflect: true })
  loading = false;

  /** Desabilita o botão */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /** Tipo do botão: button, submit, reset */
  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  /** URL para modo link */
  @property({ type: String })
  href = '';

  /** Target para modo link */
  @property({ type: String })
  target = '';

  /** Ocupa 100% da largura */
  @property({ type: Boolean, reflect: true })
  fullWidth = false;

  /** Nome do ícone (da biblioteca interna) */
  @property({ type: String })
  icon = '';

  /** Posição do ícone: left, right */
  @property({ type: String })
  iconPosition: 'left' | 'right' = 'left';

  private _handleClick(e: Event) {
    if (this.loading || this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  override render() {
    const isLink = !!this.href;
    const isDisabled = this.loading || this.disabled;
    const showIcon = !this.loading && !!this.icon;

    const btnClasses = {
      btn: true,
      [`btn--${this.variant}`]: true,
      [`btn--${this.size}`]: true,
      'btn--loading': this.loading,
    };

    const iconContent = showIcon ? html`
      <span part="icon" class="icon">
        <slot name="icon">${unsafeHTML(ICONS[this.icon as IconName])}</slot>
      </span>
    ` : nothing;

    const spinnerContent = this.loading ? html`
      <span part="spinner" class="spinner" aria-hidden="true"></span>
    ` : nothing;

    const content = html`
      ${this.iconPosition === 'left' ? iconContent : nothing}
      ${spinnerContent}
      <slot></slot>
      ${this.iconPosition === 'right' ? iconContent : nothing}
    `;

    if (isLink) {
      return html`
        <a
          part="link"
          class=${classMap(btnClasses)}
          href=${isDisabled ? nothing : this.href}
          target=${ifDefined(this.target || undefined)}
          rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
          role="button"
          aria-disabled=${isDisabled ? 'true' : nothing}
          aria-busy=${this.loading ? 'true' : nothing}
          aria-label=${this.loading ? 'Carregando' : nothing}
          @click=${this._handleClick}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        part="button"
        class=${classMap(btnClasses)}
        type=${this.type}
        ?disabled=${isDisabled}
        aria-busy=${this.loading ? 'true' : nothing}
        aria-label=${this.loading ? 'Carregando' : nothing}
        @click=${this._handleClick}
      >
        ${content}
      </button>
    `;
  }
}
