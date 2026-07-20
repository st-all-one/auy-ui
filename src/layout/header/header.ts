import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * @slot logo - Logo content in the header left area
 * @slot nav - Navigation content next to the logo
 * @slot search - Search component in the header right area
 * @slot actions - Action buttons in the header right area
 */
@customElement('auy-header')
export class AuyHeader extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      header {
        display: flex;
        align-items: center;
        padding: var(--auy-header-padding, 0.5rem 1rem);
        background: var(--auy-header-bg, var(--color-surface, oklch(100% 0 0)));
        border-block-end: var(--auy-header-border, 1px solid var(--color-border, oklch(0% 0 0 / 0.12)));
        container-type: inline-size;
        position: relative;
      }

      :host([sticky]) header {
        position: sticky;
        inset-block-start: 0;
        z-index: 1;
      }

      :host([theme="dark"]) header {
        background: var(--auy-header-bg-dark, oklch(12% 0.01 260));
        border-block-end-color: var(--auy-header-border-dark, oklch(25% 0.02 260));
        color: var(--auy-header-color-dark, oklch(96% 0.005 260));
      }

      .left {
        display: flex;
        align-items: center;
        gap: var(--auy-header-gap, 1rem);
      }

      .right {
        display: flex;
        align-items: center;
        gap: var(--auy-header-gap, 1rem);
        margin-inline-start: auto;
      }

      .title {
        font-size: var(--auy-header-title-size, 1.25rem);
        font-weight: var(--auy-header-title-weight, 600);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .nav-wrapper {
        display: contents;
      }

      .hamburger {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        color: inherit;
        line-height: 0;
        touch-action: manipulation;
      }

      .hamburger-line {
        display: block;
        inline-size: 1.5rem;
        block-size: 0.125rem;
        background: currentColor;
        margin: 0.25rem 0;
        transition: var(--auy-transition, 200ms ease);
      }

      :host(.nav-open) .hamburger-line:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }

      :host(.nav-open) .hamburger-line:nth-child(2) {
        opacity: 0;
      }

      :host(.nav-open) .hamburger-line:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }

      .hamburger:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .hamburger:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (max-width: 768px) {
        .hamburger {
          display: block;
        }

        .nav-wrapper {
          display: none;
        }

        :host(.nav-open) .nav-wrapper {
          display: block;
          position: absolute;
          inset-block-start: 100%;
          inset-inline-start: 0;
          inset-inline-end: 0;
          z-index: 1;
          background: inherit;
          padding: 1rem;
          box-shadow: 0 4px 12px oklch(0% 0 0 / 0.15);
        }
      }

      @container (max-width: 360px) {
        .title {
          display: none;
        }
      }

      @media print {
        .nav-wrapper,
        .right {
          display: none !important;
        }
      }
    }
  `;

  @property({ type: String }) pageTitle = '';
  @property({ type: Boolean, reflect: true }) sticky = false;
  @property({ type: String }) theme: 'light' | 'dark' = 'light';
  @property({ type: String }) logoContrast = '';

  @state() private _menuOpen = false;
  @state() private _contrastActive = false;

  private _contrastObserver: MutationObserver | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      this._contrastActive = document.documentElement.hasAttribute('data-auy-contrast');
      this._contrastObserver = new MutationObserver(() => {
        this._contrastActive = document.documentElement.hasAttribute('data-auy-contrast');
      });
      this._contrastObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-auy-contrast'],
      });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._contrastObserver) {
      this._contrastObserver.disconnect();
      this._contrastObserver = null;
    }
  }

  private _toggleMenu() {
    this._menuOpen = !this._menuOpen;
    this.classList.toggle('nav-open', this._menuOpen);
    this.dispatchEvent(new CustomEvent('menu-toggle', {
      detail: { open: this._menuOpen },
      bubbles: true,
      composed: true,
    }));
  }

  render() {
    return html`
      <header part="header" role="banner">
        <div class="left">
          <slot name="logo" part="logo">
            ${this.logoContrast && this._contrastActive
              ? html`<img src=${this.logoContrast} alt="" style="inline-size:auto;block-size:2.5rem">`
              : ''}
          </slot>
          ${this.pageTitle ? html`<span part="title" class="title">${this.pageTitle}</span>` : ''}
          <div class="nav-wrapper" part="nav">
            <slot name="nav"></slot>
          </div>
        </div>
        <div class="right">
          <slot name="search" part="search"></slot>
          <slot name="actions" part="actions"></slot>
        </div>
        <button
          part="hamburger"
          class="hamburger"
          @click=${this._toggleMenu}
          aria-label="${this._menuOpen ? 'Fechar menu' : 'Abrir menu'}"
          aria-expanded="${this._menuOpen}"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </header>
    `;
  }
}
