import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @slot default - No named slots; error content rendered via properties
 */
@customElement('auy-error-404')
export class AuyError404 extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: grid;
        place-items: center;
        min-block-size: 60dvh;
        padding: var(--auy-space-lg);
        contain: layout style;
        text-align: center;
      }

      .error-wrapper {
        display: grid;
        gap: var(--auy-space-md);
        max-inline-size: 480px;
      }

      .error-code {
        font-size: clamp(4rem, 12vw, 8rem);
        font-weight: 800;
        line-height: 1;
        color: var(--auy-color-primary);
        user-select: none;
        font-variant-numeric: tabular-nums;
      }

      .error-message {
        font-size: var(--auy-text-xl);
        font-weight: 600;
        color: var(--auy-color-text);
        margin: 0;
      }

      .error-description {
        font-size: var(--auy-text-base);
        color: var(--auy-color-text-muted);
        line-height: var(--auy-line-height);
        margin: 0;
      }

      .error-actions {
        display: flex;
        gap: var(--auy-space-sm);
        justify-content: center;
        flex-wrap: wrap;
        margin-block-start: var(--auy-space-sm);
      }

      .home-link {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm) var(--auy-space-md);
        background: var(--auy-color-primary);
        color: oklch(100% 0 0);
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        font-weight: 500;
        text-decoration: none;
        touch-action: manipulation;
        transition: filter var(--auy-transition-fast);
      }

      .home-link:hover {
        filter: brightness(1.1);
      }

      .home-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .home-link:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .home-link {
          transition: none;
        }
      }

      @media print {
        :host {
          min-block-size: auto;
          padding: 2rem;
        }
        .home-link {
          display: none;
        }
      }
    }
  `;

  @property({ type: String }) message = 'Página não encontrada';
  @property({ type: String }) description = 'A página que você procura não existe ou foi movida.';
  @property({ type: String }) homeUrl = '/';
  @property({ type: String }) homeLabel = 'Voltar ao início';
  @property({ type: Boolean }) standalone = false;

  private _renderCard() {
    return html`
      <div class="error-wrapper" role="alert">
        <div class="error-code" aria-hidden="true">404</div>
        <h1 class="error-message">${this.message}</h1>
        <p class="error-description">${this.description}</p>
        <div class="error-actions">
          <a class="home-link" href=${this.homeUrl}>${this.homeLabel}</a>
        </div>
      </div>
    `;
  }

  override render() {
    return this.standalone
      ? html`<auy-skeleton title="${this.message}">${this._renderCard()}</auy-skeleton>`
      : this._renderCard();
  }
}
