import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

@customElement('auy-admin-sidebar-item')
export class AuyAdminSidebarItem extends AuyLightElement {
  static override styles = css`
    :host { display: block; }
    a { all: unset; box-sizing: border-box; display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 0.375rem; cursor: pointer; text-decoration: none; color: inherit; font-size: var(--auy-text-sm); white-space: nowrap; transition: background-color 150ms ease, color 150ms ease; }
    a:hover { background: var(--_hover, oklch(96% 0.005 260)); }
    a:focus-visible { outline: 0.125rem solid var(--auy-color-primary, #3b82f6); outline-offset: 0.125rem; }
    a[aria-current="page"] { background: var(--_active, oklch(95% 0.03 260)); color: var(--auy-color-primary, #3b82f6); font-weight: 600; }
    a[disabled] { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
    .icon { display: inline-flex; align-items: center; justify-content: center; inline-size: 1.25rem; block-size: 1.25rem; flex-shrink: 0; }
  `;

  @property({ type: String }) href = '#';
  @property({ type: String }) icon = '';
  @property({ type: Boolean, reflect: true }) current = false;
  @property({ type: Boolean }) disabled = false;

  override render() {
    return html`
      <a href=${this.href} aria-current=${this.current ? 'page' : undefined} ?disabled=${this.disabled}>
        ${this.icon ? html`<span class="icon">${this.icon}</span>` : ''}
        <slot></slot>
      </a>
    `;
  }
}
