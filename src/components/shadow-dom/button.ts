import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { AuyShadowElement } from '../_internal/AuyShadowElement.base.ts';
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts';
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
export class AuyCompButton extends StyleCustomizableMixin(AuyShadowElement) {
  static override styles = css`
    @layer components {
      :host {
        display: inline-block;
        contain: content;
      }

      :host([fullWidth]) {
        display: flex;
      }

      [data-auy="button"] {
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

      [data-auy-size="sm"] {
        min-block-size: 2.5rem;
        padding: 0.375rem 0.75rem;
        font-size: var(--auy-text-sm);
      }

      [data-auy-size="md"] {
        min-block-size: 2.75rem;
        padding: 0.5rem 1rem;
        font-size: var(--auy-text-sm);
      }

      [data-auy-size="lg"] {
        min-block-size: 3rem;
        padding: 0.625rem 1.5rem;
        font-size: var(--auy-text-base);
      }

      [data-auy-size="icon"] {
        min-block-size: 2.75rem;
        min-inline-size: 2.75rem;
        padding: 0.375rem;
        font-size: var(--auy-text-base);
      }

      [data-auy-variant="primary"] {
        background-color: var(--auy-color-primary);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-primary);
      }

      [data-auy-variant="primary"]:hover {
        background-color: var(--auy-color-primary-hover);
        border-color: var(--auy-color-primary-hover);
      }

      [data-auy-variant="primary"]:active {
        background-color: var(--auy-color-primary-active);
        border-color: var(--auy-color-primary-active);
      }

      [data-auy-variant="secondary"] {
        background-color: var(--auy-color-secondary);
        color: var(--auy-color-secondary-inverse);
        border-color: var(--auy-color-secondary);
      }

      [data-auy-variant="secondary"]:hover {
        background-color: var(--auy-color-secondary-hover);
        border-color: var(--auy-color-secondary-hover);
      }

      [data-auy-variant="secondary"]:active {
        background-color: var(--auy-color-secondary-active);
        border-color: var(--auy-color-secondary-active);
      }

      [data-auy-variant="success"] {
        background-color: var(--auy-color-success);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-success);
      }

      [data-auy-variant="success"]:hover {
        background-color: color-mix(in oklch, var(--auy-color-success) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-success) 85%, var(--auy-color-text));
      }

      [data-auy-variant="success"]:active {
        background-color: color-mix(in oklch, var(--auy-color-success) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-success) 75%, var(--auy-color-text));
      }

      [data-auy-variant="error"] {
        background-color: var(--auy-color-error);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-error);
      }

      [data-auy-variant="error"]:hover {
        background-color: color-mix(in oklch, var(--auy-color-error) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-error) 85%, var(--auy-color-text));
      }

      [data-auy-variant="error"]:active {
        background-color: color-mix(in oklch, var(--auy-color-error) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-error) 75%, var(--auy-color-text));
      }

      [data-auy-variant="warning"] {
        background-color: var(--auy-color-warning);
        color: var(--auy-color-text);
        border-color: var(--auy-color-warning);
      }

      [data-auy-variant="warning"]:hover {
        background-color: color-mix(in oklch, var(--auy-color-warning) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-warning) 85%, var(--auy-color-text));
      }

      [data-auy-variant="warning"]:active {
        background-color: color-mix(in oklch, var(--auy-color-warning) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-warning) 75%, var(--auy-color-text));
      }

      [data-auy-variant="info"] {
        background-color: var(--auy-color-info);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-info);
      }

      [data-auy-variant="info"]:hover {
        background-color: color-mix(in oklch, var(--auy-color-info) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-info) 85%, var(--auy-color-text));
      }

      [data-auy-variant="info"]:active {
        background-color: color-mix(in oklch, var(--auy-color-info) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-info) 75%, var(--auy-color-text));
      }

      [data-auy-variant="ghost"] {
        background-color: transparent;
        color: var(--auy-color-text);
        border-color: transparent;
      }

      [data-auy-variant="ghost"]:hover {
        background-color: color-mix(in oklch, var(--auy-color-border) 20%, transparent);
      }

      [data-auy-variant="ghost"]:active {
        background-color: color-mix(in oklch, var(--auy-color-border) 35%, transparent);
      }

      [data-auy-variant="link"] {
        background-color: transparent;
        color: var(--auy-color-primary);
        padding-inline: 0;
        border: none;
        text-decoration: none;
      }

      [data-auy-variant="link"]:hover {
        color: var(--auy-color-primary-hover);
        text-decoration: underline;
      }

      [data-auy-variant="link"]:active {
        color: var(--auy-color-primary-active);
      }

      [data-auy="button"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      [data-auy="button"]:disabled,
      [data-auy="button"][aria-disabled="true"] {
        opacity: 0.45;
        filter: saturate(0.3);
        cursor: not-allowed;
        pointer-events: none;
      }

      [data-auy-part="icon"] {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        inline-size: 1em;
        block-size: 1em;
      }

      [data-auy-part="icon"] svg {
        inline-size: 100%;
        block-size: 100%;
        fill: currentColor;
        stroke: currentColor;
      }

      [data-auy-part="spinner"] {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        inline-size: 1.25em;
        block-size: 1.25em;
        line-height: 0;
      }

      [data-auy-part="spinner"]::after {
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

      [data-auy-loading] {
        opacity: 0.7;
        filter: saturate(0.45);
        pointer-events: none;
      }

      @media (prefers-reduced-motion: reduce) {
        [data-auy="button"] {
          transition: none;
        }

        [data-auy-part="spinner"]::after {
          animation: none;
        }
      }

      @media (forced-colors: active) {
        [data-auy="button"] {
          border: 1px solid ButtonText;
        }

        [data-auy-variant="link"] {
          border: none;
        }

        [data-auy="button"]:focus-visible {
          outline: 0.125rem solid Highlight;
          outline-offset: 0.125rem;
        }
      }

      @media print {
        [data-auy="button"] {
          background-color: transparent !important;
          color: CanvasText !important;
          border-color: CanvasText !important;
        }

        [data-auy-variant="link"] {
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

    const iconContent = showIcon ? html`
      <span part="icon" data-auy-part="icon">
        <slot name="icon">${unsafeHTML(ICONS[this.icon as IconName])}</slot>
      </span>
    ` : nothing;

    const spinnerContent = this.loading ? html`
      <span part="spinner" data-auy-part="spinner" aria-hidden="true"></span>
    ` : nothing;

    const content = html`
      ${this.iconPosition === 'left' ? iconContent : nothing}
      ${spinnerContent}
      <slot></slot>
      ${this.iconPosition === 'right' ? iconContent : nothing}
    `;

    if (isLink) {
      return html`
        ${this._renderCustomStyles()}
        <a
          part="link"
          data-auy="button"
          data-auy-variant=${this.variant}
          data-auy-size=${this.size}
          ?data-auy-loading=${this.loading}
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
      ${this._renderCustomStyles()}
      <button
        part="button"
        data-auy="button"
        data-auy-variant=${this.variant}
        data-auy-size=${this.size}
        ?data-auy-loading=${this.loading}
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
