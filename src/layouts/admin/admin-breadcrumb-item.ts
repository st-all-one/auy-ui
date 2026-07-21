import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

@customElement('auy-admin-breadcrumb-item')
export class AuyAdminBreadcrumbItem extends AuyLightElement {
  static override styles = css`
    :host { display: inline; }
    a { color: inherit; text-decoration: none; }
    a:hover { text-decoration: underline; }
    span { color: inherit; }
  `;

  @property({ type: String }) href = '';
  @property({ type: Boolean, reflect: true }) current = false;

  override render() {
    if (this.current) return html`<span aria-current="page"><slot></slot></span>`;
    return html`<a href=${this.href}><slot></slot></a>`;
  }
}
