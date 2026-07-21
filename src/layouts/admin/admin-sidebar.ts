import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
  current?: boolean;
  children?: NavItem[];
}

@customElement('auy-admin-sidebar')
export class AuyAdminSidebar extends AuyLightElement {
  static override styles = css`
    :host { display: block; block-size: 100%; }
    :host([collapsed]) { inline-size: var(--auy-sidebar-collapsed-width, 4rem); }

    aside { display: flex; flex-direction: column; block-size: 100%; background: var(--_bg); color: var(--_text); border-inline-end: 1px solid var(--_border); overflow: hidden; transition: inline-size 250ms ease; box-sizing: border-box; }
    :host(:not([collapsed])) aside { inline-size: var(--auy-sidebar-width, 17.5rem); }
    :host([collapsed]) aside { inline-size: var(--auy-sidebar-collapsed-width, 4rem); }

    :host([theme='dark']) { --_bg: oklch(15% 0.02 280); --_text: oklch(85% 0.03 270); --_text-muted: oklch(50% 0.02 270); --_hover: oklch(22% 0.02 270); --_active: oklch(30% 0.02 270); --_active-text: oklch(85% 0.03 270); --_border: oklch(22% 0.02 270); --_header-border: oklch(22% 0.02 270); }
    :host(:not([theme='dark'])) { --_bg: oklch(100% 0 0); --_text: oklch(20% 0.03 260); --_text-muted: oklch(45% 0.03 260); --_hover: oklch(96% 0.005 260); --_active: oklch(95% 0.03 260); --_active-text: oklch(50% 0.2 250); --_border: oklch(0% 0 0 / 0.1); --_header-border: oklch(0% 0 0 / 0.1); }

    .header { display: flex; align-items: center; justify-content: space-between; padding: 1rem; border-bottom: 1px solid var(--_header-border); min-height: 3.5rem; gap: 0.5rem; flex-shrink: 0; }
    .logo-area { display: flex; align-items: center; gap: 0.5rem; overflow: hidden; flex: 1; min-inline-size: 0; }
    .app-title { font-size: var(--auy-text-base); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    :host([collapsed]) .app-title { opacity: 0; inline-size: 0; overflow: hidden; }

    .toggle-btn { all: unset; display: flex; align-items: center; justify-content: center; inline-size: 1.75rem; block-size: 1.75rem; border-radius: 0.25rem; cursor: pointer; flex-shrink: 0; color: var(--_text-muted); }
    .toggle-btn:hover { background: var(--_hover); }
    .toggle-btn:focus-visible { outline: 0.125rem solid var(--auy-color-primary, #3b82f6); outline-offset: 0.125rem; }

    .nav-wrapper { flex: 1; overflow-y: auto; overflow-x: hidden; }
    .nav { padding: 0.5rem; }

    ::slotted(auy-admin-sidebar-item) { display: block; }

    @media (max-width: 768px) {
      aside { position: fixed; inset-block-start: 0; inset-inline-start: 0; block-size: 100%; transform: translateX(-100%); box-shadow: none; }
      :host(:not([collapsed])) aside { transform: translateX(0); box-shadow: 0 10px 15px -3px oklch(0% 0 0 / 0.1); }
      :host([collapsed]) aside { transform: translateX(-100%); inline-size: var(--auy-sidebar-width, 17.5rem); }
      :host([collapsed]) .app-title { opacity: 1; inline-size: auto; }
    }

    @media print { :host { display: none; } }
    @media (prefers-reduced-motion: reduce) { aside { transition: none; } }
  `;

  @property({ type: String }) appTitle = '';
  @property({ type: Boolean, reflect: true }) collapsed = false;
  @property({ type: Array }) items: NavItem[] = [];
  @property({ type: String, reflect: true }) theme: 'light' | 'dark' = 'light';

  private _toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('toggle-collapse', { detail: { collapsed: this.collapsed }, bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <aside aria-label="Navegação lateral">
        <div class="header">
          <div class="logo-area">
            <slot name="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </slot>
            <span class="app-title">${this.appTitle}</span>
          </div>
          <button class="toggle-btn" @click=${this._toggleCollapse} aria-label=${this.collapsed ? 'Expandir' : 'Recolher'}>
            ${this.collapsed ? '>' : '<'}
          </button>
        </div>
        <div class="nav-wrapper">
          <nav class="nav" aria-label="Principal">
            <slot></slot>
            ${this.items.length > 0 ? html`${this.items.map(item => html`
              <auy-admin-sidebar-item href=${item.href} icon=${item.icon || ''} ?current=${item.current} ?active=${item.active}>
                ${item.label}
              </auy-admin-sidebar-item>
            `)}` : ''}
          </nav>
        </div>
        <slot name="extension"></slot>
      </aside>
    `;
  }
}
