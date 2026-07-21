import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

@customElement('auy-admin-main-section')
export class AuyAdminMainSection extends AuyLightElement {
  static override styles = css`
    :host { display: block; }
    main { padding: 1.5rem; display: grid; gap: 1.5rem; align-content: start; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15)); padding-block-end: 1rem; }
    h1 { font-size: var(--auy-text-2xl); font-weight: 600; margin: 0; line-height: 1.3; }
    .content { display: grid; gap: 1.5rem; }
    @media print { main { display: block; } }
  `;

  @property({ type: String }) header = '';

  override render() {
    return html`
      <main id="main-content" role="main">
        ${this.header ? html`<header><h1>${this.header}</h1><slot name="header-actions"></slot></header>` : ''}
        <div class="content"><slot></slot></div>
      </main>
    `;
  }
}
