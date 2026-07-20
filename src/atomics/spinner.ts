import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-internal-spinner')
export class AuyInternalSpinner extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: inline-flex;
        contain: layout style;
      }

      .spinner {
        inline-size: var(--spinner-size, 24px);
        block-size: var(--spinner-size, 24px);
        border-radius: 50%;
        border: calc(var(--spinner-size, 24px) * 0.1) solid color-mix(in oklch, var(--auy-color-primary, currentColor) 20%, transparent);
        border-top-color: var(--auy-color-primary, currentColor);
        animation: spin var(--spinner-speed, 0.8s) linear infinite;
      }

      @keyframes spin {
        to {
          rotate: 360deg;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .spinner {
          animation-duration: 0s;
        }
      }
    }
  `;

  @property({ type: Number }) size = 24;
  @property({ type: String }) color = 'var(--auy-color-primary)';
  @property({ type: Number }) speed = 0.8;

  override render() {
    const borderWidth = Math.max(1, Math.round(this.size * 0.1));
    return html`
      <div
        class="spinner"
        part="spinner"
        role="status"
        aria-label="Carregando"
        style="--spinner-size: ${this.size}px; --spinner-speed: ${this.speed}s; border-width: ${borderWidth}px; border-color: color-mix(in oklch, ${this.color} 20%, transparent); border-top-color: ${this.color};"
      ></div>
    `;
  }
}
