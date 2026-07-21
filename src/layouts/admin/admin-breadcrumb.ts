import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

@customElement('auy-admin-breadcrumb')
export class AuyAdminBreadcrumb extends AuyLightElement {
  static override styles = css`
    :host { display: block; }
    nav { display: flex; align-items: center; gap: 0.25rem; font-size: var(--auy-text-sm); color: var(--auy-color-text-muted, #6b7280); }
    ::slotted(*)::after { content: '/'; margin-inline: 0.25rem; color: var(--auy-color-border, #d1d5db); }
    ::slotted(*:last-child)::after { content: none; }
    ::slotted(*[current]) { color: var(--auy-color-text, #1a1a1a); font-weight: 600; }
  `;

  override render() {
    return html`<nav aria-label="Breadcrumb"><slot></slot></nav>`;
  }
}
