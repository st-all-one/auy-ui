import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

@customElement('auy-admin-header')
export class AuyAdminHeader extends AuyLightElement {
  static override styles = css`
    :host { display: block; }
    header { display: flex; align-items: center; padding: 0.5rem 1rem; background: var(--auy-color-surface, #fff); border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.12)); container-type: inline-size; }
    :host([sticky]) header { position: sticky; inset-block-start: 0; z-index: 100; }
    .left { display: flex; align-items: center; gap: 1rem; }
    .right { display: flex; align-items: center; gap: 1rem; margin-inline-start: auto; }
    .title { font-size: var(--auy-text-xl); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    @media (max-width: 768px) { header { flex-wrap: wrap; } }
  `;

  @property({ type: String }) pageTitle = '';
  @property({ type: Boolean, reflect: true }) sticky = false;

  override render() {
    return html`
      <header role="banner">
        <div class="left">
          <slot name="logo"></slot>
          ${this.pageTitle ? html`<span class="title">${this.pageTitle}</span>` : ''}
          <slot name="nav"></slot>
        </div>
        <div class="right">
          <slot name="search"></slot>
          <slot name="actions"></slot>
        </div>
      </header>
    `;
  }
}
