import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { t } from './_internal/locale.ts';

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
export class AuyCompModal extends LitElement {
  override createRenderRoot() { return this; }

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
    return this.querySelector('dialog');
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
      <span data-part="icon" class="head-icon head-icon--${this.variant}">${unsafeHTML(icon)}</span>
    `;
  }

  override render() {
    const hasHeader = this.title || this.variant !== 'default' || !!this.closable;

    return html`
      <dialog
        data-element="modal"
        role="dialog"
        aria-modal="true"
        aria-label=${this.title || nothing}
        data-size=${this.size}
        @close=${this._handleDialogClose}
        @cancel=${this._handleCancel}
        @click=${this._handleOverlayClick}
      >
        ${hasHeader ? html`
          <div data-part="header" class="head">
            ${this._renderIcon()}
            <div class="head-body">
              <div data-slot="header">
                <h2 class="title" data-part="title">${this.title}</h2>
                ${this.description ? html`
                  <p class="description" data-part="description">${this.description}</p>
                ` : ''}
              </div>
            </div>
            ${this.closable ? html`
              <button data-part="close-button" class="close" aria-label=${t('modalClose')} @click=${this._close}>&times;</button>
            ` : ''}
          </div>
          <hr class="divider" data-part="divider" />
        ` : ''}
        <div data-part="body" class="body ${hasHeader ? '' : 'body--no-title'}">
          <div data-slot="default"></div>
        </div>
        <hr class="divider" data-part="divider" />
        <div data-part="footer" class="footer">
          <div data-slot="footer"></div>
        </div>
      </dialog>
    `;
  }
}


