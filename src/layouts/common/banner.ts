import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

/**
 * Global communication banner with image, optional link, dismissible.
 *
 * @slot default - Custom banner content (replaces image when set)
 */
@customElement('auy-banner')
export class AuyBanner extends AuyLightElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      :host(:not([open])) {
        display: none;
      }

      aside {
        position: relative;
        overflow: hidden;
        transition: var(--auy-transition, 200ms ease);
        opacity: 1;
      }

      aside.closing {
        opacity: 0;
        padding-block: 0;
        block-size: 0;
        overflow: hidden;
      }

      a {
        display: block;
        text-decoration: none;
        color: inherit;
        touch-action: manipulation;
      }

      img {
        display: block;
        inline-size: 100%;
        block-size: auto;
        max-block-size: 120px;
        object-fit: cover;
        transition: var(--auy-transition, 200ms ease);
      }

      a:hover img {
        transform: scale(1.01);
      }

      .close {
        position: absolute;
        inset-block-start: 0.5rem;
        inset-inline-end: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        inline-size: 2rem;
        block-size: 2rem;
        border: none;
        border-radius: var(--auy-radius-full, 9999px);
        background: oklch(0% 0 0 / 0.4);
        color: oklch(100% 0 0);
        cursor: pointer;
        touch-action: manipulation;
        font-size: var(--auy-text-xl);
        line-height: 1;
        transition: var(--auy-transition, 200ms ease);
        z-index: 1;
      }

      .close:hover {
        background: oklch(0% 0 0 / 0.6);
      }

      .close:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      a:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .close:focus-visible,
        a:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        aside,
        img {
          transition: none;
        }
      }
    }
  `;

  @property({ type: String }) src = '';
  @property({ type: String }) href = '';
  @property({ type: String }) alt = '';
  @property({ type: Boolean }) dismissible = true;
  @property({ type: Boolean, reflect: true }) open = true;
  @property({ type: String }) storageKey = '';

  @state() private _closing = false;

  override connectedCallback(): void {
    super.connectedCallback();
    if (this.storageKey && typeof localStorage !== 'undefined') {
      const dismissed = localStorage.getItem(`auy-banner-dismissed:${this.storageKey}`);
      if (dismissed === 'true') {
        this.open = false;
      }
    }
  }

  private _dismiss() {
    this._closing = true;
    if (this.storageKey && typeof localStorage !== 'undefined') {
      localStorage.setItem(`auy-banner-dismissed:${this.storageKey}`, 'true');
    }
    setTimeout(() => {
      this.open = false;
      this._closing = false;
      this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }));
    }, 200);
  }

  override render() {
    const inner = html`
      ${this.dismissible
        ? html`<button class="close" @click=${this._dismiss} aria-label="Fechar">×</button>`
        : ''}
      ${this.href
        ? html`<a href=${this.href} target="_blank" rel="noopener noreferrer"><img src=${this.src} alt=${this.alt} loading="lazy"></a>`
        : html`<img src=${this.src} alt=${this.alt} loading="lazy">`}
    `;

    return html`
      <aside part="banner" class=${this._closing ? 'closing' : ''}>
        <slot>${inner}</slot>
      </aside>
    `;
  }
}
