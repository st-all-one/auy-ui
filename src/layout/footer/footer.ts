import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @slot logo - Logo content in the footer grid
 * @slot nav - Navigation links column
 * @slot social - Social media links column
 * @slot services - Services column
 * @slot contact - Contact information column
 * @slot metadata - Metadata column
 * @slot copyright-extras - Extra content next to the copyright text
 */
@customElement('auy-footer')
export class AuyFooter extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      footer {
        padding: var(--auy-footer-padding, 2rem 1rem 1rem);
        background: var(--auy-footer-bg, var(--color-surface, oklch(100% 0 0)));
        border-block-start: var(--auy-footer-border, 1px solid var(--color-border, oklch(0% 0 0 / 0.12)));
        container-type: inline-size;
        container-name: footer;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(var(--auy-footer-columns, 4), 1fr);
        gap: var(--auy-footer-grid-gap, 2rem);
        max-inline-size: var(--auy-footer-max-width, 75rem);
        margin: 0 auto;
      }

      .grid > ::slotted(*) {
        display: grid;
        grid-template-rows: auto 1fr;
      }

      .copyright {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: var(--auy-footer-copyright-gap, 0.25rem 0.5rem);
        max-inline-size: var(--auy-footer-max-width, 75rem);
        margin: 2rem auto 0;
        padding-block-start: 1rem;
        border-block-start: var(--auy-footer-copyright-border, 1px solid var(--color-border-subtle, oklch(0% 0 0 / 0.08)));
        font-size: var(--auy-footer-copyright-size, 0.875rem);
        color: var(--auy-footer-copyright-color, var(--color-text-secondary, oklch(40% 0.01 260)));
      }

      @container footer (max-width: 639px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }

      @container footer (min-width: 640px) and (max-width: 1023px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media print {
        footer {
          border-block-start: 1px solid #000;
          background: none;
        }

        .copyright {
          border-block-start: 1px solid #ccc;
          color: #000;
        }
      }
    }
  `;

  @property({ type: String }) copyright = '';

  @property({ type: Number }) year = new Date().getFullYear();

  @property({ type: Number }) columns = 4;

  render() {
    return html`
      <footer part="footer" role="contentinfo">
        <div class="grid" style="--auy-footer-columns: ${this.columns}">
          <slot name="logo" part="logo"></slot>
          <slot name="nav" part="nav"></slot>
          <slot name="social" part="social"></slot>
          <slot name="services" part="services"></slot>
          <slot name="contact" part="contact"></slot>
          <slot name="metadata" part="metadata"></slot>
        </div>
        <div part="copyright" class="copyright">
          <span>&copy; ${this.year} ${this.copyright}</span>
          <slot name="copyright-extras" part="copyright-extras"></slot>
        </div>
      </footer>
    `;
  }
}
