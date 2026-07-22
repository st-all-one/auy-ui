import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts';

type ModalVariant = 'default' | 'info' | 'success' | 'warning' | 'error';

const VARIANT_ICONS: Record<ModalVariant, string> = {
  default: '',
  info: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15v-2h2v2zm2-4h-2V7h2v6z"/></svg>',
  success: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>',
  warning: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>',
  error: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>',
};

/**
 * @element auy-comp-modal
 * @slot - Conteúdo do corpo
 * @slot header - Cabeçalho personalizado
 * @slot footer - Rodapé (ações)
 * @fires open - Disparado ao abrir
 * @fires close - Disparado ao fechar
 * @csspart header - Cabeçalho
 * @csspart title - Título
 * @csspart description - Descrição
 * @csspart icon - Ícone de variante
 * @csspart close-button - Botão de fechar
 * @csspart body - Corpo
 * @csspart footer - Rodapé
 * @csspart divider - Linha divisória
 */
@customElement('auy-comp-modal')
export class AuyCompModal extends StyleCustomizableMixin(LitElement) {
  static override get observedDataEvents(): string[] {
    return ['open', 'close']
  }

  static override shadowRootOptions: ShadowRootInit = { mode: 'open', delegatesFocus: true };

  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      dialog {
        border: none;
        border-radius: var(--auy-radius-lg);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-lg);
        inline-size: min(calc(100% - 2rem), 32rem);
        margin: auto;
        padding: 0;
        max-block-size: 85dvh;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        opacity: 0;
        transform: scale(0.95) translateY(0.5rem);
        transition: opacity 0.2s ease, transform 0.2s ease, overlay 0.2s ease allow-discrete, display 0.2s ease allow-discrete;
      }

      dialog[open] {
        opacity: 1;
        transform: scale(1) translateY(0);
      }

      @starting-style {
        dialog[open] {
          opacity: 0;
          transform: scale(0.95) translateY(0.5rem);
        }
      }

      dialog::backdrop {
        background: color-mix(in oklch, var(--auy-color-overlay) 50%, transparent);
        backdrop-filter: blur(4px);
        transition: background 0.2s ease;
      }

      dialog[data-size="sm"] {
        inline-size: min(calc(100% - 2rem), 24rem);
      }

      dialog[data-size="lg"] {
        inline-size: min(calc(100% - 2rem), 48rem);
      }

      dialog[data-size="xl"] {
        inline-size: min(calc(100% - 2rem), 64rem);
      }

      dialog[data-size="full"] {
        inline-size: min(calc(100% - 2rem), calc(100% - 2rem));
        block-size: min(calc(100dvh - 2rem), 90dvh);
        border-radius: var(--auy-radius-md);
        max-block-size: calc(100dvh - 2rem);
      }

      .head {
        display: flex;
        align-items: flex-start;
        gap: var(--auy-space-md);
        padding: var(--auy-space-lg);
        padding-block-end: var(--auy-space-sm);
      }

      .head-icon {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.75rem;
        block-size: 1.75rem;
        margin-block-start: 0.125rem;
      }
      .head-icon svg {
        inline-size: 100%;
        block-size: 100%;
      }

      .head-icon--info { color: var(--auy-color-info); }
      .head-icon--success { color: var(--auy-color-success); }
      .head-icon--warning { color: var(--auy-color-warning); }
      .head-icon--error { color: var(--auy-color-error); }

      .head-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--auy-space-xs);
      }

      .title {
        font-size: var(--auy-text-lg);
        font-weight: var(--auy-font-weight-semibold);
        line-height: 1.4;
        color: var(--auy-color-text);
        margin: 0;
      }

      .description {
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        line-height: 1.5;
        margin: 0;
      }

      .close {
        flex-shrink: 0;
        min-inline-size: 2.75rem;
        min-block-size: 2.75rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: none;
        border-radius: var(--auy-radius-sm);
        background: transparent;
        color: var(--auy-color-text-muted);
        cursor: pointer;
        font-size: var(--auy-text-lg);
        line-height: 1;
        opacity: 0.6;
        touch-action: manipulation;
        transition: opacity var(--auy-transition-fast), background var(--auy-transition-fast), color var(--auy-transition-fast);
      }
      .close:hover {
        opacity: 1;
        background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
        color: var(--auy-color-text);
      }
      .close:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .divider {
        border: none;
        border-block-start: 1px solid var(--auy-color-border);
        margin: 0;
      }

      .body {
        padding: var(--auy-space-sm) var(--auy-space-lg) var(--auy-space-lg);
      }

      .body--no-title {
        padding-block-start: var(--auy-space-lg);
      }

      .footer {
        padding: var(--auy-space-lg);
        padding-block-start: var(--auy-space-md);
        display: flex;
        justify-content: flex-end;
        gap: var(--auy-space-sm);
      }

      @media (prefers-reduced-motion: reduce) {
        dialog {
          transition: none;
        }
        dialog::backdrop {
          transition: none;
        }
      }

      @media (forced-colors: active) {
        dialog {
          border: 1px solid CanvasText;
        }
        .close {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        dialog {
          display: block !important;
          position: static !important;
          opacity: 1 !important;
          transform: none !important;
          box-shadow: none !important;
          border: 1px solid CanvasText !important;
        }
        dialog::backdrop {
          display: none !important;
        }
      }
    }
  `;

  /** Controla a abertura do modal */
  @property({ type: Boolean, reflect: true })
  open = false;

  /** Título do modal */
  @property({ type: String })
  title = '';

  /** Descrição exibida abaixo do título */
  @property({ type: String })
  description = '';

  /** Variante visual (define ícone) */
  @property({ type: String })
  variant: ModalVariant = 'default';

  /** Tamanho do modal: sm, md, lg, xl, full */
  @property({ type: String })
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';

  /** Exibe botão de fechar */
  @property({ type: Boolean })
  closable = true;

  /** Fecha ao clicar no backdrop */
  @property({ type: Boolean, attribute: 'closeonoverlay' })
  closeOnOverlay = true;

  /** Fecha ao pressionar ESC */
  @property({ type: Boolean, attribute: 'closeonescape' })
  closeOnEscape = true;

  /** Bloqueia scroll do body quando aberto */
  @property({ type: Boolean, attribute: 'preventscroll' })
  preventBodyScroll = true;

  private _previousFocus: HTMLElement | null = null;

  private _getDialog(): HTMLDialogElement | null {
    return this.shadowRoot?.querySelector('dialog') ?? null;
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('open')) {
      const dialog = this._getDialog();
      if (!dialog) return;

      if (this.open) {
        this._previousFocus = (document.activeElement as HTMLElement) ?? null;
        if (this.preventBodyScroll) {
          dialog.showModal();
        } else {
          dialog.show();
        }
        this.dispatchEvent(new CustomEvent('open', { bubbles: true, composed: true }));
      } else {
        dialog.close();
        this._returnFocus();
        this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }));
      }
    }
  }

  private _handleDialogClose() {
    if (this.open) {
      this.open = false;
    }
  }

  private _handleCancel(e: Event) {
    if (!this.closeOnEscape) {
      e.preventDefault();
    }
  }

  private _handleOverlayClick(e: MouseEvent) {
    if (!this.closeOnOverlay) return;
    const dialog = this._getDialog();
    if (!dialog) return;
    if (e.target === dialog) {
      this.open = false;
    }
  }

  private _close() {
    this.open = false;
  }

  private _returnFocus() {
    if (this._previousFocus && typeof this._previousFocus.focus === 'function') {
      this._previousFocus.focus();
    }
    this._previousFocus = null;
  }

  private _renderIcon() {
    const icon = VARIANT_ICONS[this.variant];
    if (!icon) return nothing;
    return html`
      <span part="icon" class="head-icon head-icon--${this.variant}">${unsafeHTML(icon)}</span>
    `;
  }

  override render() {
    const hasHeader = this.title || this.variant !== 'default' || !!this.closable;

    return html`
      ${this._renderCustomStyles()}
      <dialog
        role="dialog"
        aria-modal="true"
        aria-label=${this.title || nothing}
        data-size=${this.size}
        @close=${this._handleDialogClose}
        @cancel=${this._handleCancel}
        @click=${this._handleOverlayClick}
      >
        ${hasHeader ? html`
          <div part="header" class="head">
            ${this._renderIcon()}
            <div class="head-body">
              <slot name="header">
                <h2 class="title" part="title">${this.title}</h2>
                ${this.description ? html`
                  <p class="description" part="description">${this.description}</p>
                ` : ''}
              </slot>
            </div>
            ${this.closable ? html`
              <button part="close-button" class="close" aria-label="Fechar" @click=${this._close}>&times;</button>
            ` : ''}
          </div>
          <hr class="divider" part="divider" />
        ` : ''}
        <div part="body" class="body ${hasHeader ? '' : 'body--no-title'}">
          <slot></slot>
        </div>
        <hr class="divider" part="divider" />
        <div part="footer" class="footer">
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auy-comp-modal': AuyCompModal;
  }
}
