import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

@customElement('auy-admin-footer')
export class AuyAdminFooter extends AuyLightElement {
  static override styles = css`
    :host { display: block; }
    footer { padding: 2rem 1rem 1rem; background: var(--auy-color-surface, #fff); border-block-start: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.12)); }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; max-inline-size: 75rem; margin: 0 auto; }
    .copyright { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.25rem 0.5rem; max-inline-size: 75rem; margin: 2rem auto 0; padding-block-start: 1rem; border-block-start: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.08)); font-size: var(--auy-text-sm); color: var(--auy-color-text-muted, #6b7280); }
    @media (max-width: 639px) { .grid { grid-template-columns: 1fr; } }
    @media (min-width: 640px) and (max-width: 1023px) { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media print { footer { border-block-start: 1px solid #000; background: none; } }
  `;

  @property({ type: String }) copyright = '';
  @property({ type: Number }) year = new Date().getFullYear();

  override render() {
    return html`
      <footer role="contentinfo">
        <div class="grid">
          <slot name="logo"></slot><slot name="nav"></slot><slot name="social"></slot><slot name="services"></slot>
        </div>
        <div class="copyright">
          <span>&copy; ${this.year} ${this.copyright}</span>
          <slot name="copyright-extras"></slot>
        </div>
      </footer>
    `;
  }
}
