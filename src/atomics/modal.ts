import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { query } from 'lit/decorators/query.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @slot title - Modal title
 * @slot - Default slot for modal body content
 * @slot actions - Modal footer actions
 */
@customElement('auy-internal-modal')
export class AuyInternalModal extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
        color-scheme: light dark;
      }

      dialog {
        padding: 0;
        border: none;
        border-radius: var(--auy-radius-lg);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-lg);
        max-inline-size: 32rem;
        inline-size: 100%;
        max-block-size: 85dvh;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        opacity: 0;
        transform: scale(0.95);
        transition: opacity var(--auy-transition, 200ms ease), transform var(--auy-transition, 200ms ease), overlay var(--auy-transition, 200ms ease) allow-discrete, display var(--auy-transition, 200ms ease) allow-discrete;
      }

      dialog[open] {
        opacity: 1;
        transform: scale(1);
      }

      @starting-style {
        dialog[open] {
          opacity: 0;
          transform: scale(0.95);
        }
      }

      dialog::backdrop {
        background: var(--auy-color-overlay, oklch(0% 0 0 / 0.4));
        backdrop-filter: blur(4px);
        transition: background-color var(--auy-transition, 200ms ease), backdrop-filter var(--auy-transition, 200ms ease);
      }

      @starting-style {
        dialog::backdrop {
          background-color: transparent;
          backdrop-filter: blur(0px);
        }
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

        .close-button {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        dialog::backdrop {
          background-color: transparent;
          backdrop-filter: none;
        }

        .close-button {
          display: none;
        }
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--auy-space-md);
        padding: var(--auy-space-md);
        padding-block-end: 0;
      }

      .close-button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 2rem;
        block-size: 2rem;
        border-radius: var(--auy-radius-lg);
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
        color: inherit;
        flex-shrink: 0;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      .close-button:hover {
        background: color-mix(in srgb, currentColor 10%, transparent);
      }

      .close-button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .body {
        padding: var(--auy-space-md);
      }

      .footer {
        padding: var(--auy-space-md);
        padding-block-start: 0;
        display: flex;
        justify-content: flex-end;
        gap: var(--auy-space-md);
      }
    }
  `;

  @property({ type: Boolean, reflect: true }) open = false;

  private _lastFocused: HTMLElement | null = null;

  @query('#dialog')
  private _dialog!: HTMLDialogElement;
  @query('.close-button') private _closeButton!: HTMLElement;

  private _boundCloseHandler: (() => void) | null = null;

  override updated(changed: Map<string, unknown>) {
    if (changed.has('open')) {
      if (!this._dialog) return;
      if (this.open) {
        this._dialog.showModal();
        this._focusTrap();
        this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
      } else {
        this._dialog.close();
      }
    }
  }

  override firstUpdated() {
    this._boundCloseHandler = () => {
      if (this.open) {
        this.open = false;
        this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
      }
    };
    this._dialog?.addEventListener('close', this._boundCloseHandler);
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', this._handleKeyDown);
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (typeof window !== 'undefined') {
      document.removeEventListener('keydown', this._handleKeyDown);
    }
    if (this._boundCloseHandler) {
      this._dialog?.removeEventListener('close', this._boundCloseHandler);
      this._boundCloseHandler = null;
    }
  }

  private _focusTrap() {
    if (!this._dialog) return;
    const focusable = this._dialog.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (this._closeButton) {
      this._closeButton.focus();
    } else if (focusable) {
      focusable.focus();
    }
  }

  private _handleDialogClick(e: MouseEvent) {
    if (e.target === this._dialog) {
      this.open = false;
    }
  }

  show() {
    this._lastFocused = document.activeElement as HTMLElement | null;
    this.open = true;
  }

  close() {
    this.open = false;
    this._lastFocused?.focus();
    this._lastFocused = null;
  }

  private readonly _handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== 'Tab' || !this.open) return;
    const dialog = this._dialog;
    if (!dialog) return;
    const focusable = dialog.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  override render() {
    return html`
      <dialog id="dialog" part="dialog" class=${classMap({ modal: true, open: this.open, closed: !this.open })} aria-labelledby="title-slot" @click=${this._handleDialogClick}>
        <div part="header" class="header">
          <slot name="title" part="title" id="title-slot"></slot>
          <button part="close-button" class="close-button" aria-label="Fechar" @click=${() => { this.open = false; }}>
            ✕
          </button>
        </div>
        <div part="body" class="body">
          <slot></slot>
        </div>
        <div part="footer" class="footer">
          <slot name="actions"></slot>
        </div>
      </dialog>
    `;
  }
}
