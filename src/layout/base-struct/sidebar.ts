import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
  current?: boolean;
  children?: NavItem[];
}

/**
 * @slot logo - Logo content in the sidebar header
 * @slot extension - Extension content at the bottom of the sidebar
 */
@customElement('auy-sidebar')
export class AuySidebar extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        position: fixed;
        inset-block-start: 0;
        inset-inline-start: 0;
        block-size: 100%;
        contain: layout style;
        color-scheme: light dark;
      }

      :host([theme='dark']) {
        --_bg: var(--auy-color-sidebar-bg-dark, oklch(15% 0.02 280));
        --_text: var(--auy-color-sidebar-text-dark, oklch(85% 0.03 270));
        --_text-muted: var(--auy-color-sidebar-text-muted-dark, oklch(50% 0.02 270));
        --_hover: var(--auy-color-sidebar-hover-dark, oklch(22% 0.02 270));
        --_active: var(--auy-color-sidebar-active-dark, oklch(30% 0.02 270));
        --_active-text: var(--auy-color-sidebar-active-text-dark, oklch(85% 0.03 270));
        --_border: var(--auy-color-sidebar-border-dark, oklch(22% 0.02 270));
        --_toggle-bg: var(--auy-color-sidebar-toggle-bg-dark, oklch(22% 0.02 270));
        --_toggle-hover: var(--auy-color-sidebar-toggle-hover-dark, oklch(30% 0.02 270));
        --_toggle-color: var(--auy-color-sidebar-toggle-color-dark, oklch(85% 0.03 270));
        --_header-border: var(--auy-color-sidebar-header-border-dark, oklch(22% 0.02 270));
      }

      :host([theme='light']),
      :host(:not([theme='dark'])) {
        --_bg: var(--auy-color-sidebar-bg, oklch(100% 0 0));
        --_text: var(--auy-color-sidebar-text, oklch(20% 0.03 260));
        --_text-muted: var(--auy-color-sidebar-text-muted, oklch(45% 0.03 260));
        --_hover: var(--auy-color-sidebar-hover, oklch(96% 0.005 260));
        --_active: var(--auy-color-sidebar-active, oklch(95% 0.03 260));
        --_active-text: var(--auy-color-sidebar-active-text, oklch(50% 0.2 250));
        --_border: var(--auy-color-sidebar-border, oklch(0% 0 0 / 0.1));
        --_toggle-bg: var(--auy-color-sidebar-toggle-bg, oklch(96% 0.005 260));
        --_toggle-hover: var(--auy-color-sidebar-toggle-hover, oklch(0% 0 0 / 0.1));
        --_toggle-color: var(--auy-color-sidebar-toggle-color, oklch(45% 0.03 260));
        --_header-border: var(--auy-color-sidebar-header-border, oklch(0% 0 0 / 0.1));
      }

      :host(:not([collapsed])) [part='sidebar'] {
        inline-size: var(--auy-sidebar-width, 17.5rem);
      }

      :host([collapsed]) [part='sidebar'] {
        inline-size: var(--auy-sidebar-collapsed-width, 4rem);
      }

      [part='sidebar'] {
        display: flex;
        flex-direction: column;
        block-size: 100%;
        background: var(--_bg);
        color: var(--_text);
        border-inline-end: 1px solid var(--_border);
        overflow: hidden;
        transition: inline-size var(--auy-transition-normal, 250ms) ease;
        box-sizing: border-box;
        position: relative;
      }

      [part='header'] {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: var(--auy-space-md, 1rem);
        border-block-end: 1px solid var(--_header-border);
        min-block-size: 3.5rem;
        gap: var(--auy-space-sm, 0.5rem);
        flex-shrink: 0;
      }

      .logo-area {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm, 0.5rem);
        overflow: hidden;
        flex: 1;
        min-inline-size: 0;
      }

      .logo-area svg,
      .logo-area img {
        flex-shrink: 0;
        inline-size: 1.5rem;
        block-size: 1.5rem;
      }

      .app-title {
        font-size: var(--auy-text-base, 1rem);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: opacity var(--auy-transition-fast, 150ms) ease;
      }

      :host([collapsed]) .app-title {
        opacity: 0;
        inline-size: 0;
        overflow: hidden;
        margin: 0;
        padding: 0;
      }

      [part='toggle'] {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.75rem;
        block-size: 1.75rem;
        border-radius: var(--auy-radius-sm, 0.25rem);
        cursor: pointer;
        touch-action: manipulation;
        background: var(--_toggle-bg);
        color: var(--_toggle-color);
        flex-shrink: 0;
        transition: background-color var(--auy-transition-fast, 150ms) ease;
      }

      [part='toggle']:hover {
        background: var(--_toggle-hover);
      }

      [part='toggle']:focus-visible {
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .nav-wrapper {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        content-visibility: auto;
        contain-intrinsic-size: 200px;
      }

      [part='nav'] {
        display: flex;
        flex-direction: column;
        padding: var(--auy-space-sm, 0.5rem);
        list-style: none;
        margin: 0;
      }

      [part='item'] {
        display: flex;
        flex-direction: column;
        border-radius: var(--auy-radius-md, 0.375rem);
        overflow: hidden;
      }

      :host([collapsed]) [part='item'] .sub-items {
        display: none;
      }

      .item-link {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm, 0.5rem);
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 0.75rem);
        border-radius: var(--auy-radius-md, 0.375rem);
        cursor: pointer;
        touch-action: manipulation;
        text-decoration: none;
        color: var(--_text);
        font-size: var(--auy-text-sm, 0.875rem);
        font-family: inherit;
        white-space: nowrap;
        transition: background-color var(--auy-transition-fast, 150ms) ease,
          color var(--auy-transition-fast, 150ms) ease;
        user-select: none;
        -webkit-user-select: none;
        position: relative;
      }

      .item-link:hover {
        background: var(--_hover);
      }

      .item-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .item-link[aria-current='page'] {
        background: var(--_active);
        color: var(--_active-text);
        font-weight: 600;
      }

      .item-link[aria-current='page']::before {
        content: '';
        position: absolute;
        inset-inline-start: 0;
        inset-block-start: 50%;
        transform: translateY(-50%);
        inline-size: 0.1875rem;
        block-size: 50%;
        border-radius: 0 var(--auy-radius-sm, 0.25rem) var(--auy-radius-sm, 0);
        background: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      [part='item-icon'] {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.25rem;
        block-size: 1.25rem;
        flex-shrink: 0;
        font-size: var(--auy-text-base, 1rem);
      }

      [part='item-label'] {
        overflow: hidden;
        text-overflow: ellipsis;
        flex: 1;
        min-inline-size: 0;
        transition: opacity var(--auy-transition-fast, 150ms) ease;
      }

      :host([collapsed]) [part='item-label'] {
        opacity: 0;
        inline-size: 0;
        overflow: hidden;
        margin: 0;
      }

      .item-chevron {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1rem;
        block-size: 1rem;
        flex-shrink: 0;
        transition: transform var(--auy-transition-fast, 150ms) ease;
        font-size: 0.75rem;
      }

      .item-chevron.expanded {
        transform: rotate(90deg);
      }

      :host([collapsed]) .item-chevron {
        display: none;
      }

      .sub-items {
        display: flex;
        flex-direction: column;
        padding: 0;
        margin: 0;
        list-style: none;
        overflow: hidden;
      }

      .sub-items .item-link {
        padding-inline-start: calc(var(--auy-space-md, 0.75rem) + 1.75rem);
        font-size: var(--auy-text-xs, 0.75rem);
      }

      :host([collapsed]) .sub-items {
        display: none;
      }

      [part='extension'] {
        border-block-start: 1px solid var(--_border);
        padding: var(--auy-space-md, 1rem);
        flex-shrink: 0;
      }

      :host([collapsed]) [part='extension'] {
        padding: var(--auy-space-sm, 0.5rem);
      }

      @media (forced-colors: active) {
        [part='toggle']:focus-visible,
        .item-link:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [part='sidebar'],
        .item-link,
        .item-chevron,
        .app-title,
        [part='item-label'],
        [part='toggle'] {
          transition: none;
        }
      }

      @media print {
        :host {
          display: none;
        }
      }

      @media (max-width: 768px) {
        [part='sidebar'] {
          position: fixed;
          inset-block-start: 0;
          inset-inline-start: 0;
          block-size: 100%;
          transform: translateX(-100%);
          transition: transform var(--auy-transition-normal, 250ms) ease,
            inline-size var(--auy-transition-normal, 250ms) ease;
          will-change: transform;
          box-shadow: none;
        }

        :host(:not([collapsed])) [part='sidebar'] {
          transform: translateX(0);
          box-shadow: var(--auy-shadow-lg, 0 10px 15px -3px oklch(0% 0 0 / 0.1));
        }

        :host([collapsed]) [part='sidebar'] {
          transform: translateX(-100%);
          inline-size: var(--auy-sidebar-width, 17.5rem);
        }

        :host([collapsed]) .app-title {
          opacity: 1;
          inline-size: auto;
          overflow: visible;
          margin: initial;
          padding: initial;
        }

        :host([collapsed]) [part='item-label'] {
          opacity: 1;
          inline-size: auto;
          overflow: visible;
          margin: initial;
        }

        :host([collapsed]) .sub-items {
          display: flex;
        }

        :host([collapsed]) .item-chevron {
          display: inline-flex;
        }

        :host([collapsed]) [part='extension'] {
          padding: var(--auy-space-md, 1rem);
        }
      }
    }
  `;

  @property({ type: String }) appTitle = '';
  @property({ type: Boolean, reflect: true }) collapsed = false;
  @property({ type: Array }) items: NavItem[] = [];
  @property({ type: String, reflect: true }) theme: 'light' | 'dark' = 'light';
  @property({ type: String }) logoContrast = '';

  @state() private _contrastActive = false;

  private _contrastObserver: MutationObserver | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      this._contrastActive = document.documentElement.hasAttribute('data-auy-contrast');
      this._contrastObserver = new MutationObserver(() => {
        this._contrastActive = document.documentElement.hasAttribute('data-auy-contrast');
      });
      this._contrastObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-auy-contrast'],
      });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._contrastObserver) {
      this._contrastObserver.disconnect();
      this._contrastObserver = null;
    }
  }

  private _toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.dispatchEvent(new CustomEvent('toggle-collapse', {
      detail: { collapsed: this.collapsed },
      bubbles: true,
      composed: true,
    }));
  }

  private readonly _handleNavClick = (e: Event) => {
    const href = (e.currentTarget as HTMLElement).dataset.href;
    if (!href) return;
    const findItem = (items: NavItem[]): NavItem | undefined => {
      for (const item of items) {
        if (item.href === href) return item;
        if (item.children) {
          const found = findItem(item.children);
          if (found) return found;
        }
      }
      return undefined;
    };
    const item = findItem(this.items);
    if (item && item.children && item.children.length > 0) {
      e.preventDefault();
      const updateActive = (items: NavItem[]): NavItem[] =>
        items.map(i => i === item ? { ...i, active: !i.active } : { ...i, children: i.children ? updateActive(i.children) : undefined });
      this.items = updateActive(this.items);
    }
  };

  private _renderItem(item: NavItem) {
    const hasChildren = item.children && item.children.length > 0;
    return html`
      <li part="item">
        <a
          class="item-link"
          href=${item.href}
          data-href=${item.href}
            aria-current=${item.current ? 'page' : nothing}
            aria-expanded=${hasChildren ? (item.active ? 'true' : 'false') : nothing}
            @click=${this._handleNavClick}
          >
            ${item.icon
              ? html`<span part="item-icon">${item.icon}</span>`
              : nothing}
            <span part="item-label">${item.label}</span>
          ${hasChildren
            ? html`<span class=${classMap({ 'item-chevron': true, expanded: !!item.active })}>❯</span>`
            : nothing}
        </a>
        ${hasChildren
          ? html`
            <ul class="sub-items" role="group">
              ${item.children!.map(child => html`
                <li part="item">
                  <a
                    class="item-link"
                    href=${child.href}
                    data-href=${child.href}
                    aria-current=${child.current ? 'page' : nothing}
                  >
                    ${child.icon
                      ? html`<span part="item-icon">${child.icon}</span>`
                      : nothing}
                    <span part="item-label">${child.label}</span>
                  </a>
                </li>
              `)}
            </ul>
          `
          : nothing}
      </li>
    `;
  }

  override render() {
    return html`
      <aside part="sidebar" aria-label="Navegação lateral">
        <div part="header">
          <div class="logo-area">
            <slot name="logo">
              ${this._contrastActive && this.logoContrast
                ? html`<img src=${this.logoContrast} alt="" style="inline-size:1.5rem;block-size:1.5rem">`
                : html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>`}
            </slot>
            <span class="app-title">${this.appTitle}</span>
          </div>
          <button part="toggle" @click=${this._toggleCollapse} aria-label=${this.collapsed ? 'Expandir navegação' : 'Recolher navegação'}>
            ${this.collapsed
              ? html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`
              : html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`}
          </button>
        </div>
        <div class="nav-wrapper">
          <nav part="nav" aria-label="Navegação principal">
            <ul>
              ${this.items.map(item => this._renderItem(item))}
            </ul>
          </nav>
        </div>
        <slot name="extension" part="extension"></slot>
      </aside>
    `;
  }
}
