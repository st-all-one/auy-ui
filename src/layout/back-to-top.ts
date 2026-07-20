import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * Floating "back to top" button that appears on scroll.
 */
@customElement('auy-back-to-top')
export class AuyBackToTop extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        position: fixed;
        inset-block-end: 2rem;
        z-index: 1;
      }

      :host([position='left']) {
        inset-inline-start: 2rem;
      }

      :host([position='right']),
      :host(:not([position])) {
        inset-inline-end: 2rem;
      }

      button {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        inline-size: 2.75rem;
        block-size: 2.75rem;
        border-radius: var(--auy-radius-full, 9999px);
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        color: oklch(100% 0 0);
        cursor: pointer;
        touch-action: manipulation;
        box-shadow: var(--auy-shadow-md, 0 4px 6px -1px oklch(0% 0 0 / 0.1));
        opacity: 0;
        transform: translateY(0.75rem);
        transition: var(--auy-transition, 200ms ease);
        pointer-events: none;
      }

      button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      button.visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      button:hover {
        box-shadow: var(--auy-shadow-lg, 0 10px 15px -3px oklch(0% 0 0 / 0.1));
        transform: translateY(-0.125rem);
      }

      button.visible:hover {
        transform: translateY(-0.125rem);
      }

      svg {
        inline-size: 1.25rem;
        block-size: 1.25rem;
      }

      @media (forced-colors: active) {
        button:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        button {
          transition: none;
        }
      }

      @media print {
        :host {
          display: none;
        }
      }
    }
  `;

  @property({ type: Number }) threshold = 300;
  @property({ type: String, reflect: true }) position: 'left' | 'right' = 'right';
  @property({ type: String }) label = 'Voltar ao topo';
  @property({ type: Boolean, reflect: true }) visible = false;

  @state() private _visible = false;

  private _onScroll: (() => void) | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      this._onScroll = () => {
        const shouldShow = window.scrollY > this.threshold;
        if (shouldShow !== this._visible) {
          this._visible = shouldShow;
          this.visible = shouldShow;
        }
      };
      window.addEventListener('scroll', this._onScroll, { passive: true });
      this._onScroll();
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (typeof window !== 'undefined' && this._onScroll) {
      window.removeEventListener('scroll', this._onScroll);
      this._onScroll = null;
    }
  }

  private _scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.dispatchEvent(new CustomEvent('scroll-top', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <button
        part="button"
        class=${classMap({ visible: this._visible })}
        @click=${this._scrollToTop}
        aria-label=${this.label}
        title=${this.label}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    `;
  }
}
