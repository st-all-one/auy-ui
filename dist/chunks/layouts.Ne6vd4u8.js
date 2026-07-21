import { t as __decorate } from "./decorate.BeMZb0KT.js";
import { LitElement, css, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
//#region src/layouts/_internal/AuyLightElement.ts
var AuyLightElement = class extends LitElement {
	createRenderRoot() {
		return this;
	}
};
//#endregion
//#region src/layouts/admin/admin-layout.ts
var AuyAdminLayout = class AuyAdminLayout extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.theme = "light";
		this.sidebarWidth = "17.5rem";
		this.headerHeight = "auto";
		this.skipLinks = [
			{
				href: "#main-content",
				label: "Ir para o conteúdo principal",
				accesskey: "1"
			},
			{
				href: "#main-nav",
				label: "Ir para a navegação",
				accesskey: "2"
			},
			{
				href: "#footer",
				label: "Ir para o rodapé",
				accesskey: "3"
			}
		];
		this._hasSidebar = false;
		this._hasHeader = false;
		this._observer = null;
	}
	static {
		this.styles = css`
    :host { display: block; font-family: var(--auy-font-sans, system-ui); background: var(--auy-color-surface, #fff); color: var(--auy-color-text, #1a1a1a); }
    :host([theme="dark"]) { color-scheme: dark; }
    :host([theme="light"]) { color-scheme: light; }

    nav.skip-links { position: absolute; z-index: 1000; }
    .skip-link { position: absolute; inline-size: 1px; block-size: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
    .skip-link:focus { inline-size: auto; block-size: auto; padding: 0.5rem 1rem; margin: 0; overflow: visible; clip: auto; white-space: normal; background: var(--auy-color-surface, #fff); color: var(--auy-color-primary, #3b82f6); outline: 0.125rem solid var(--auy-color-primary, #3b82f6); text-decoration: none; }

    #layout { display: grid; min-block-size: 100dvh; }

    @media print {
      nav.skip-links { position: fixed; inset-block-start: 0; inset-inline-start: 0; z-index: 1; }
      .skip-link { display: none; }
    }
  `;
	}
	_updatePresence() {
		this._hasSidebar = this.querySelector("[slot=\"sidebar\"]") !== null;
		this._hasHeader = this.querySelector("[slot=\"header\"]") !== null;
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window !== "undefined") {
			document.documentElement.setAttribute("data-theme", this.theme);
			this._updatePresence();
			this._observer = new MutationObserver(() => this._updatePresence());
			this._observer.observe(this, {
				childList: true,
				subtree: true
			});
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (typeof window !== "undefined") document.documentElement.removeAttribute("data-theme");
		if (this._observer) {
			this._observer.disconnect();
			this._observer = null;
		}
	}
	updated(changed) {
		if (changed.has("theme") && typeof window !== "undefined") document.documentElement.setAttribute("data-theme", this.theme);
	}
	render() {
		const { _hasSidebar: hasSidebar, _hasHeader: hasHeader } = this;
		let areas, columns, rows;
		if (hasSidebar && hasHeader) {
			areas = "\"sidebar header\" \"sidebar main\" \"sidebar footer\"";
			columns = `${this.sidebarWidth} 1fr`;
			rows = `${this.headerHeight} 1fr auto`;
		} else if (hasSidebar) {
			areas = "\"sidebar\" \"main\" \"footer\"";
			columns = `${this.sidebarWidth} 1fr`;
			rows = "1fr auto";
		} else if (hasHeader) {
			areas = "\"header\" \"main\" \"footer\"";
			columns = "1fr";
			rows = `${this.headerHeight} 1fr auto`;
		} else {
			areas = "\"main\" \"footer\"";
			columns = "1fr";
			rows = "1fr auto";
		}
		return html`
      <nav class="skip-links" aria-label="Pular para">
        ${this.skipLinks.map((link) => html`<a class="skip-link" href=${link.href} accesskey=${link.accesskey || ""} aria-keyshortcuts=${link.accesskey ? `Shift+Alt+${link.accesskey}` : ""}>${link.label}</a>`)}
      </nav>
      <div id="layout" style="grid-template-areas: ${areas}; grid-template-columns: ${columns}; grid-template-rows: ${rows};">
        ${hasSidebar ? html`<div style="grid-area: sidebar;" id="main-nav"><slot name="sidebar"></slot></div>` : ""}
        ${hasHeader ? html`<div style="grid-area: header;" role="banner"><slot name="header"></slot></div>` : ""}
        <div id="main-content" style="grid-area: main;" role="main"><slot name="main"></slot></div>
        <div style="grid-area: footer;" id="footer" role="contentinfo"><slot name="footer"></slot></div>
      </div>
      <slot></slot>
    `;
	}
};
__decorate([property({
	type: String,
	reflect: true
})], AuyAdminLayout.prototype, "theme", void 0);
__decorate([property({ type: String })], AuyAdminLayout.prototype, "sidebarWidth", void 0);
__decorate([property({ type: String })], AuyAdminLayout.prototype, "headerHeight", void 0);
__decorate([property({ type: Array })], AuyAdminLayout.prototype, "skipLinks", void 0);
__decorate([state()], AuyAdminLayout.prototype, "_hasSidebar", void 0);
__decorate([state()], AuyAdminLayout.prototype, "_hasHeader", void 0);
AuyAdminLayout = __decorate([customElement("auy-admin-layout")], AuyAdminLayout);
//#endregion
//#region src/layouts/admin/admin-sidebar.ts
var AuyAdminSidebar = class AuyAdminSidebar extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.appTitle = "";
		this.collapsed = false;
		this.items = [];
		this.theme = "light";
	}
	static {
		this.styles = css`
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
	}
	_toggleCollapse() {
		this.collapsed = !this.collapsed;
		this.dispatchEvent(new CustomEvent("toggle-collapse", {
			detail: { collapsed: this.collapsed },
			bubbles: true,
			composed: true
		}));
	}
	render() {
		return html`
      <aside aria-label="Navegação lateral">
        <div class="header">
          <div class="logo-area">
            <slot name="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            </slot>
            <span class="app-title">${this.appTitle}</span>
          </div>
          <button class="toggle-btn" @click=${this._toggleCollapse} aria-label=${this.collapsed ? "Expandir" : "Recolher"}>
            ${this.collapsed ? ">" : "<"}
          </button>
        </div>
        <div class="nav-wrapper">
          <nav class="nav" aria-label="Principal">
            <slot></slot>
            ${this.items.length > 0 ? html`${this.items.map((item) => html`
              <auy-admin-sidebar-item href=${item.href} icon=${item.icon || ""} ?current=${item.current} ?active=${item.active}>
                ${item.label}
              </auy-admin-sidebar-item>
            `)}` : ""}
          </nav>
        </div>
        <slot name="extension"></slot>
      </aside>
    `;
	}
};
__decorate([property({ type: String })], AuyAdminSidebar.prototype, "appTitle", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyAdminSidebar.prototype, "collapsed", void 0);
__decorate([property({ type: Array })], AuyAdminSidebar.prototype, "items", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyAdminSidebar.prototype, "theme", void 0);
AuyAdminSidebar = __decorate([customElement("auy-admin-sidebar")], AuyAdminSidebar);
//#endregion
//#region src/layouts/admin/admin-sidebar-item.ts
var AuyAdminSidebarItem = class AuyAdminSidebarItem extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.href = "#";
		this.icon = "";
		this.current = false;
		this.disabled = false;
	}
	static {
		this.styles = css`
    :host { display: block; }
    a { all: unset; box-sizing: border-box; display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 0.375rem; cursor: pointer; text-decoration: none; color: inherit; font-size: var(--auy-text-sm); white-space: nowrap; transition: background-color 150ms ease, color 150ms ease; }
    a:hover { background: var(--_hover, oklch(96% 0.005 260)); }
    a:focus-visible { outline: 0.125rem solid var(--auy-color-primary, #3b82f6); outline-offset: 0.125rem; }
    a[aria-current="page"] { background: var(--_active, oklch(95% 0.03 260)); color: var(--auy-color-primary, #3b82f6); font-weight: 600; }
    a[disabled] { opacity: 0.5; cursor: not-allowed; pointer-events: none; }
    .icon { display: inline-flex; align-items: center; justify-content: center; inline-size: 1.25rem; block-size: 1.25rem; flex-shrink: 0; }
  `;
	}
	render() {
		return html`
      <a href=${this.href} aria-current=${this.current ? "page" : void 0} ?disabled=${this.disabled}>
        ${this.icon ? html`<span class="icon">${this.icon}</span>` : ""}
        <slot></slot>
      </a>
    `;
	}
};
__decorate([property({ type: String })], AuyAdminSidebarItem.prototype, "href", void 0);
__decorate([property({ type: String })], AuyAdminSidebarItem.prototype, "icon", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyAdminSidebarItem.prototype, "current", void 0);
__decorate([property({ type: Boolean })], AuyAdminSidebarItem.prototype, "disabled", void 0);
AuyAdminSidebarItem = __decorate([customElement("auy-admin-sidebar-item")], AuyAdminSidebarItem);
//#endregion
//#region src/layouts/admin/admin-header.ts
var AuyAdminHeader = class AuyAdminHeader extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.pageTitle = "";
		this.sticky = false;
	}
	static {
		this.styles = css`
    :host { display: block; }
    header { display: flex; align-items: center; padding: 0.5rem 1rem; background: var(--auy-color-surface, #fff); border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.12)); container-type: inline-size; }
    :host([sticky]) header { position: sticky; inset-block-start: 0; z-index: 100; }
    .left { display: flex; align-items: center; gap: 1rem; }
    .right { display: flex; align-items: center; gap: 1rem; margin-inline-start: auto; }
    .title { font-size: var(--auy-text-xl); font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    @media (max-width: 768px) { header { flex-wrap: wrap; } }
  `;
	}
	render() {
		return html`
      <header role="banner">
        <div class="left">
          <slot name="logo"></slot>
          ${this.pageTitle ? html`<span class="title">${this.pageTitle}</span>` : ""}
          <slot name="nav"></slot>
        </div>
        <div class="right">
          <slot name="search"></slot>
          <slot name="actions"></slot>
        </div>
      </header>
    `;
	}
};
__decorate([property({ type: String })], AuyAdminHeader.prototype, "pageTitle", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyAdminHeader.prototype, "sticky", void 0);
AuyAdminHeader = __decorate([customElement("auy-admin-header")], AuyAdminHeader);
//#endregion
//#region src/layouts/admin/admin-main-section.ts
var AuyAdminMainSection = class AuyAdminMainSection extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.header = "";
	}
	static {
		this.styles = css`
    :host { display: block; }
    main { padding: 1.5rem; display: grid; gap: 1.5rem; align-content: start; }
    header { display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15)); padding-block-end: 1rem; }
    h1 { font-size: var(--auy-text-2xl); font-weight: 600; margin: 0; line-height: 1.3; }
    .content { display: grid; gap: 1.5rem; }
    @media print { main { display: block; } }
  `;
	}
	render() {
		return html`
      <main id="main-content" role="main">
        ${this.header ? html`<header><h1>${this.header}</h1><slot name="header-actions"></slot></header>` : ""}
        <div class="content"><slot></slot></div>
      </main>
    `;
	}
};
__decorate([property({ type: String })], AuyAdminMainSection.prototype, "header", void 0);
AuyAdminMainSection = __decorate([customElement("auy-admin-main-section")], AuyAdminMainSection);
//#endregion
//#region src/layouts/admin/admin-breadcrumb.ts
var AuyAdminBreadcrumb = class AuyAdminBreadcrumb extends AuyLightElement {
	static {
		this.styles = css`
    :host { display: block; }
    nav { display: flex; align-items: center; gap: 0.25rem; font-size: var(--auy-text-sm); color: var(--auy-color-text-muted, #6b7280); }
    ::slotted(*)::after { content: '/'; margin-inline: 0.25rem; color: var(--auy-color-border, #d1d5db); }
    ::slotted(*:last-child)::after { content: none; }
    ::slotted(*[current]) { color: var(--auy-color-text, #1a1a1a); font-weight: 600; }
  `;
	}
	render() {
		return html`<nav aria-label="Breadcrumb"><slot></slot></nav>`;
	}
};
AuyAdminBreadcrumb = __decorate([customElement("auy-admin-breadcrumb")], AuyAdminBreadcrumb);
//#endregion
//#region src/layouts/admin/admin-breadcrumb-item.ts
var AuyAdminBreadcrumbItem = class AuyAdminBreadcrumbItem extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.href = "";
		this.current = false;
	}
	static {
		this.styles = css`
    :host { display: inline; }
    a { color: inherit; text-decoration: none; }
    a:hover { text-decoration: underline; }
    span { color: inherit; }
  `;
	}
	render() {
		if (this.current) return html`<span aria-current="page"><slot></slot></span>`;
		return html`<a href=${this.href}><slot></slot></a>`;
	}
};
__decorate([property({ type: String })], AuyAdminBreadcrumbItem.prototype, "href", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyAdminBreadcrumbItem.prototype, "current", void 0);
AuyAdminBreadcrumbItem = __decorate([customElement("auy-admin-breadcrumb-item")], AuyAdminBreadcrumbItem);
//#endregion
//#region src/layouts/admin/admin-footer.ts
var AuyAdminFooter = class AuyAdminFooter extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.copyright = "";
		this.year = (/* @__PURE__ */ new Date()).getFullYear();
	}
	static {
		this.styles = css`
    :host { display: block; }
    footer { padding: 2rem 1rem 1rem; background: var(--auy-color-surface, #fff); border-block-start: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.12)); }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; max-inline-size: 75rem; margin: 0 auto; }
    .copyright { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 0.25rem 0.5rem; max-inline-size: 75rem; margin: 2rem auto 0; padding-block-start: 1rem; border-block-start: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.08)); font-size: var(--auy-text-sm); color: var(--auy-color-text-muted, #6b7280); }
    @media (max-width: 639px) { .grid { grid-template-columns: 1fr; } }
    @media (min-width: 640px) and (max-width: 1023px) { .grid { grid-template-columns: repeat(2, 1fr); } }
    @media print { footer { border-block-start: 1px solid #000; background: none; } }
  `;
	}
	render() {
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
};
__decorate([property({ type: String })], AuyAdminFooter.prototype, "copyright", void 0);
__decorate([property({ type: Number })], AuyAdminFooter.prototype, "year", void 0);
AuyAdminFooter = __decorate([customElement("auy-admin-footer")], AuyAdminFooter);
//#endregion
//#region src/layouts/cms/cms-layout.ts
var AuyCmsLayout = class AuyCmsLayout extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.theme = "light";
		this.appTitle = "";
		this.sidebarCollapsed = false;
	}
	get _activeTheme() {
		if (typeof window === "undefined") return "light";
		return document.documentElement.getAttribute("data-theme") || "light";
	}
	_toggleSidebar() {
		this.sidebarCollapsed = !this.sidebarCollapsed;
		this.dispatchEvent(new CustomEvent("sidebar-toggle", {
			detail: { collapsed: this.sidebarCollapsed },
			bubbles: true,
			composed: true
		}));
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: grid;
        grid-template-rows: auto 1fr;
        block-size: 100dvh;
        color-scheme: light;
        container-type: inline-size;
      }
      :host([theme="dark"]) {
        color-scheme: dark;
      }

      [part="header"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-md, 1rem);
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.12));
        background: var(--auy-color-surface, oklch(100% 0 0));
        position: sticky;
        inset-block-start: 0;
        z-index: 1;
      }
      :host([theme="dark"]) [part="header"] {
        background: var(--auy-color-surface-dark, oklch(13% 0.01 260));
        border-block-end-color: var(--auy-color-border-dark, oklch(25% 0.02 260));
      }

      [part="hamburger"] {
        background: none;
        border: none;
        cursor: pointer;
        touch-action: manipulation;
        font-size: var(--auy-text-lg);
        padding: 0.25rem;
        border-radius: var(--auy-radius-sm, 0.25rem);
        color: var(--auy-color-text, oklch(15% 0.02 260));
        display: flex;
        align-items: center;
        justify-content: center;
      }
      [part="hamburger"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary, oklch(45% 0.25 250));
        outline-offset: 0.125rem;
      }

      [part="app-title"] {
        font-size: var(--auy-text-lg);
        font-weight: 600;
        color: var(--auy-color-text, oklch(15% 0.02 260));
      }
      :host([theme="dark"]) [part="app-title"] {
        color: var(--auy-color-text-dark, oklch(95% 0.005 260));
      }

      [part="header-right"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm, 0.5rem);
        margin-inline-start: auto;
      }

      [part="body"] {
        display: flex;
        flex: 1;
        overflow: hidden;
      }

      [part="sidebar"] {
        inline-size: 15.625rem;
        overflow-y: auto;
        overflow-x: hidden;
        transition: var(--auy-transition, 200ms ease);
        border-inline-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.12));
        flex-shrink: 0;
        background: var(--auy-color-surface-secondary, oklch(97% 0.01 260));
        box-sizing: border-box;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
      }
      :host([theme="dark"]) [part="sidebar"] {
        background: var(--auy-color-surface-dark-secondary, oklch(10% 0.01 260));
        border-inline-end-color: var(--auy-color-border-dark, oklch(25% 0.02 260));
      }

      [part="sidebar"].collapsed {
        inline-size: 0;
        overflow: hidden;
        padding: 0;
        border: none;
      }

      [part="main"] {
        flex: 1;
        overflow-y: auto;
        padding: var(--auy-space-lg, 1.5rem);
        display: grid;
        gap: var(--auy-space-md, 1rem);
        align-content: start;
        background: var(--auy-color-bg, oklch(97% 0.003 260));
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
      }
      :host([theme="dark"]) [part="main"] {
        background: var(--auy-color-bg-dark, oklch(8% 0.01 260));
      }

      [part="backdrop"] {
        display: none;
      }

      @container (max-width: 768px) {
        [part="sidebar"] {
          position: fixed;
          inset-block-start: 0;
          inset-inline-start: 0;
          block-size: 100dvh;
          inline-size: 15.625rem;
        }
        [part="sidebar"].collapsed {
          inline-size: 0;
          overflow: hidden;
          padding: 0;
          border: none;
        }
        [part="backdrop"] {
          display: block;
          position: fixed;
          inset: 0;
          background: var(--auy-color-overlay, oklch(0% 0 0 / 0.4));
          z-index: 1;
        }
        [part="backdrop"].hidden {
          display: none;
        }
      }

      @media print {
        [part="sidebar"],
        [part="header"] {
          display: none;
        }
      }

      @media (forced-colors: active) {
        [part="hamburger"]:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [part="sidebar"] {
          transition: none;
        }
      }
    }
  `;
	}
	render() {
		return html`
      <header part="header">
        <button @click=${this._toggleSidebar} part="hamburger" aria-label="Menu">☰</button>
        <span part="app-title">${this.appTitle}</span>
        <div part="header-right">
          <slot name="search"></slot>
          <slot name="user"></slot>
        </div>
      </header>
      <div part="body">
        <aside part="sidebar" class=${this.sidebarCollapsed ? "collapsed" : ""}>
          <slot name="sidebar"></slot>
        </aside>
        <div part="backdrop" class=${this.sidebarCollapsed ? "hidden" : ""} @click=${this._toggleSidebar}></div>
        <main part="main" id="cms-main">
          <slot name="breadcrumb"></slot>
          <slot name="page-title"></slot>
          <slot></slot>
        </main>
      </div>
    `;
	}
};
__decorate([property({
	type: String,
	reflect: true
})], AuyCmsLayout.prototype, "theme", void 0);
__decorate([property({ type: String })], AuyCmsLayout.prototype, "appTitle", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCmsLayout.prototype, "sidebarCollapsed", void 0);
AuyCmsLayout = __decorate([customElement("auy-cms-layout")], AuyCmsLayout);
//#endregion
//#region src/layouts/cms/cms-login.ts
var AuyCmsLogin = class AuyCmsLogin extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.appTitle = "Painel Administrativo";
		this.appLogo = "";
		this.error = "";
		this.loading = false;
		this.csrfToken = "";
		this._email = "";
		this._password = "";
	}
	_handleSubmit(e) {
		e.preventDefault();
		this.dispatchEvent(new CustomEvent("login", {
			detail: {
				email: this._email,
				password: this._password
			},
			bubbles: true,
			composed: true
		}));
	}
	_onEmailInput(e) {
		this._email = e.target.value;
	}
	_onPassInput(e) {
		this._password = e.target.value;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: grid;
        place-items: center;
        min-block-size: 100dvh;
        contain: layout style;
        background: oklch(20% 0.03 260);
      }

      [part="container"] {
        inline-size: min(400px, 90vw);
      }

      [part="card"] {
        background: var(--auy-color-surface, oklch(100% 0 0));
        border-radius: var(--auy-radius-lg, 0.75rem);
        box-shadow: var(--auy-shadow-lg, 0 4px 24px oklch(0% 0 0 / 0.12));
        padding: var(--auy-space-xl, 2rem);
        opacity: 0;
        transform: translateY(0.625rem);
        transition: var(--auy-transition, 200ms ease);
      }
      @starting-style {
        [part="card"] {
          opacity: 0;
          transform: translateY(0.625rem);
        }
      }
      [part="card"] {
        opacity: 1;
        transform: translateY(0);
      }

      [part="header"] {
        text-align: center;
        margin-block-end: var(--auy-space-lg, 1.5rem);
      }

      [part="logo"] {
        max-inline-size: 120px;
        block-size: auto;
        margin-block-end: var(--auy-space-sm, 0.5rem);
      }

      [part="title"] {
        font-size: var(--auy-text-xl);
        font-weight: 600;
        margin: 0;
        color: var(--auy-color-text, oklch(15% 0.02 260));
      }

      [part="error"] {
        background: oklch(from var(--auy-color-error, oklch(50% 0.24 30)) 95% 0.02 h);
        color: var(--auy-color-error, oklch(50% 0.24 30));
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        border-radius: var(--auy-radius-md, 0.5rem);
        font-size: var(--auy-text-sm);
        margin-block-end: var(--auy-space-md, 1rem);
      }

      [part="form"] {
        display: grid;
        gap: var(--auy-space-md, 1rem);
      }

      [part="label"] {
        display: grid;
        gap: 0.25rem;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text, oklch(15% 0.02 260));
      }

      [part="input"] {
        inline-size: 100%;
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        border: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.12));
        border-radius: var(--auy-radius-md, 0.5rem);
        background: var(--auy-color-surface, oklch(100% 0 0));
        color: var(--auy-color-text, oklch(15% 0.02 260));
        font-size: var(--auy-text-base);
        box-sizing: border-box;
        outline: none;
        touch-action: manipulation;
      }
      [part="input"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary, oklch(45% 0.25 250));
        outline-offset: 0.125rem;
      }

      [part="submit"] {
        inline-size: 100%;
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        background: var(--auy-color-primary, oklch(45% 0.25 250));
        color: oklch(100% 0 0);
        border: none;
        border-radius: var(--auy-radius-md, 0.5rem);
        font-size: var(--auy-text-base);
        font-weight: 500;
        cursor: pointer;
        touch-action: manipulation;
        transition: var(--auy-transition, 200ms ease);
      }
      [part="submit"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary, oklch(45% 0.25 250));
        outline-offset: 0.125rem;
      }
      [part="submit"]:hover {
        filter: brightness(1.1);
      }
      [part="submit"]:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      [part="footer"] {
        text-align: center;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted, oklch(55% 0.02 260));
        margin-block-start: var(--auy-space-md, 1rem);
      }

      [part="credits"] {
        text-align: center;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted, oklch(55% 0.02 260));
        margin-block-start: var(--auy-space-md, 1rem);
      }

      @media (forced-colors: active) {
        [part="submit"]:focus-visible,
        [part="input"]:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [part="card"] {
          transition: none;
        }
        [part="submit"] {
          transition: none;
        }
      }

      @media print {
        :host {
          display: none;
        }
      }
    }
  `;
	}
	render() {
		return html`
      <div part="container">
        <div part="card">
          <div part="header">
            ${this.appLogo ? html`<img src=${this.appLogo} part="logo" alt="">` : ""}
            <h1 part="title">${this.appTitle}</h1>
          </div>
          ${this.error ? html`<div part="error" role="alert">${this.error}</div>` : ""}
          <form part="form" @submit=${this._handleSubmit}>
            <label part="label">
              Email
              <input part="input" type="email" name="email" required .value=${this._email} @input=${this._onEmailInput} autocomplete="email" placeholder="seu@email.com">
            </label>
            <label part="label">
              Senha
              <input part="input" type="password" name="password" required .value=${this._password} @input=${this._onPassInput} autocomplete="current-password" placeholder="••••••••">
            </label>
            <button part="submit" type="submit" ?disabled=${this.loading}>
              ${this.loading ? "Entrando…" : "Entrar"}
            </button>
          </form>
          <div part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
        <div part="credits">
          <slot name="credits"></slot>
        </div>
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyCmsLogin.prototype, "appTitle", void 0);
__decorate([property({ type: String })], AuyCmsLogin.prototype, "appLogo", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyCmsLogin.prototype, "error", void 0);
__decorate([property({ type: Boolean })], AuyCmsLogin.prototype, "loading", void 0);
__decorate([property({ type: String })], AuyCmsLogin.prototype, "csrfToken", void 0);
__decorate([state()], AuyCmsLogin.prototype, "_email", void 0);
__decorate([state()], AuyCmsLogin.prototype, "_password", void 0);
AuyCmsLogin = __decorate([customElement("auy-cms-login")], AuyCmsLogin);
//#endregion
//#region src/layouts/common/back-to-top.ts
var AuyBackToTop = class AuyBackToTop extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.threshold = 300;
		this.position = "right";
		this.label = "Voltar ao topo";
		this.visible = false;
		this._visible = false;
		this._onScroll = null;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        position: fixed;
        inset-block-end: 2rem;
        z-index: 1;
      }

      :host([position='left']) {
        inset-inline-start: 2rem;
      }

      :host([position='right']),
      :host(:not([position])) {
        inset-inline-end: 2rem;
      }

      button {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
        inline-size: 2.75rem;
        block-size: 2.75rem;
        border-radius: var(--auy-radius-full, 9999px);
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        color: oklch(100% 0 0);
        cursor: pointer;
        touch-action: manipulation;
        box-shadow: var(--auy-shadow-md, 0 4px 6px -1px oklch(0% 0 0 / 0.1));
        opacity: 0;
        transform: translateY(0.75rem);
        transition: var(--auy-transition, 200ms ease);
        pointer-events: none;
      }

      button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      button.visible {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }

      button:hover {
        box-shadow: var(--auy-shadow-lg, 0 10px 15px -3px oklch(0% 0 0 / 0.1));
        transform: translateY(-0.125rem);
      }

      button.visible:hover {
        transform: translateY(-0.125rem);
      }

      svg {
        inline-size: 1.25rem;
        block-size: 1.25rem;
      }

      @media (forced-colors: active) {
        button:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        button {
          transition: none;
        }
      }

      @media print {
        :host {
          display: none;
        }
      }
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window !== "undefined") {
			this._onScroll = () => {
				const shouldShow = window.scrollY > this.threshold;
				if (shouldShow !== this._visible) {
					this._visible = shouldShow;
					this.visible = shouldShow;
				}
			};
			window.addEventListener("scroll", this._onScroll, { passive: true });
			this._onScroll();
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (typeof window !== "undefined" && this._onScroll) {
			window.removeEventListener("scroll", this._onScroll);
			this._onScroll = null;
		}
	}
	_scrollToTop() {
		if (typeof window !== "undefined") window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
		this.dispatchEvent(new CustomEvent("scroll-top", {
			bubbles: true,
			composed: true
		}));
	}
	render() {
		return html`
      <button
        part="button"
        class=${classMap({ visible: this._visible })}
        @click=${this._scrollToTop}
        aria-label=${this.label}
        title=${this.label}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    `;
	}
};
__decorate([property({ type: Number })], AuyBackToTop.prototype, "threshold", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyBackToTop.prototype, "position", void 0);
__decorate([property({ type: String })], AuyBackToTop.prototype, "label", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyBackToTop.prototype, "visible", void 0);
__decorate([state()], AuyBackToTop.prototype, "_visible", void 0);
AuyBackToTop = __decorate([customElement("auy-back-to-top")], AuyBackToTop);
//#endregion
//#region src/layouts/common/banner.ts
var AuyBanner = class AuyBanner extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.src = "";
		this.href = "";
		this.alt = "";
		this.dismissible = true;
		this.open = true;
		this.storageKey = "";
		this._closing = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      :host(:not([open])) {
        display: none;
      }

      aside {
        position: relative;
        overflow: hidden;
        transition: var(--auy-transition, 200ms ease);
        opacity: 1;
      }

      aside.closing {
        opacity: 0;
        padding-block: 0;
        block-size: 0;
        overflow: hidden;
      }

      a {
        display: block;
        text-decoration: none;
        color: inherit;
        touch-action: manipulation;
      }

      img {
        display: block;
        inline-size: 100%;
        block-size: auto;
        max-block-size: 120px;
        object-fit: cover;
        transition: var(--auy-transition, 200ms ease);
      }

      a:hover img {
        transform: scale(1.01);
      }

      .close {
        position: absolute;
        inset-block-start: 0.5rem;
        inset-inline-end: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        inline-size: 2rem;
        block-size: 2rem;
        border: none;
        border-radius: var(--auy-radius-full, 9999px);
        background: oklch(0% 0 0 / 0.4);
        color: oklch(100% 0 0);
        cursor: pointer;
        touch-action: manipulation;
        font-size: var(--auy-text-xl);
        line-height: 1;
        transition: var(--auy-transition, 200ms ease);
        z-index: 1;
      }

      .close:hover {
        background: oklch(0% 0 0 / 0.6);
      }

      .close:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      a:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .close:focus-visible,
        a:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        aside,
        img {
          transition: none;
        }
      }
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.storageKey && typeof localStorage !== "undefined") {
			if (localStorage.getItem(`auy-banner-dismissed:${this.storageKey}`) === "true") this.open = false;
		}
	}
	_dismiss() {
		this._closing = true;
		if (this.storageKey && typeof localStorage !== "undefined") localStorage.setItem(`auy-banner-dismissed:${this.storageKey}`, "true");
		setTimeout(() => {
			this.open = false;
			this._closing = false;
			this.dispatchEvent(new CustomEvent("dismiss", {
				bubbles: true,
				composed: true
			}));
		}, 200);
	}
	render() {
		const inner = html`
      ${this.dismissible ? html`<button class="close" @click=${this._dismiss} aria-label="Fechar">×</button>` : ""}
      ${this.href ? html`<a href=${this.href} target="_blank" rel="noopener noreferrer"><img src=${this.src} alt=${this.alt} loading="lazy"></a>` : html`<img src=${this.src} alt=${this.alt} loading="lazy">`}
    `;
		return html`
      <aside part="banner" class=${this._closing ? "closing" : ""}>
        <slot>${inner}</slot>
      </aside>
    `;
	}
};
__decorate([property({ type: String })], AuyBanner.prototype, "src", void 0);
__decorate([property({ type: String })], AuyBanner.prototype, "href", void 0);
__decorate([property({ type: String })], AuyBanner.prototype, "alt", void 0);
__decorate([property({ type: Boolean })], AuyBanner.prototype, "dismissible", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyBanner.prototype, "open", void 0);
__decorate([property({ type: String })], AuyBanner.prototype, "storageKey", void 0);
__decorate([state()], AuyBanner.prototype, "_closing", void 0);
AuyBanner = __decorate([customElement("auy-banner")], AuyBanner);
//#endregion
//#region src/layouts/common/skeleton.ts
var AuySkeleton = class AuySkeleton extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.lang = "pt-BR";
		this.title = "";
		this.charset = "UTF-8";
		this.viewport = "width=device-width, initial-scale=1.0, viewport-fit=cover";
		this.themeColor = "";
		this.description = "";
		this.colorScheme = "light dark";
		this.fontsUrl = "";
		this._metaElements = /* @__PURE__ */ new Map();
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: contents;
      }
    }
  `;
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this._metaElements.forEach((el) => {
			if (el.parentNode) el.parentNode.removeChild(el);
		});
		this._metaElements.clear();
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window === "undefined") return;
		document.documentElement.lang = this.lang;
		this._ensureMeta("charset", "meta[charset]", "charset", this.charset);
		this._ensureMeta("viewport", "meta[name=\"viewport\"]", "name", "viewport", "content", this.viewport);
		this._ensureMeta("description", "meta[name=\"description\"]", "name", "description", "content", this.description);
		this._ensureMeta("theme-color", "meta[name=\"theme-color\"]", "name", "theme-color", "content", this.themeColor);
		this._ensureMeta("color-scheme", "meta[name=\"color-scheme\"]", "name", "color-scheme", "content", this.colorScheme);
		this._ensureTitle();
		if (this.fontsUrl) this._ensureFontPreconnect();
	}
	updated(changed) {
		if (typeof window === "undefined") return;
		if (changed.has("lang")) document.documentElement.lang = this.lang;
		if (changed.has("title")) this._ensureTitle();
		if (changed.has("charset")) this._updateMetaContent("charset", this.charset);
		if (changed.has("viewport")) this._updateMetaContent("viewport", this.viewport);
		if (changed.has("description")) this._updateMetaContent("description", this.description);
		if (changed.has("themeColor")) this._updateMetaContent("theme-color", this.themeColor);
		if (changed.has("colorScheme")) this._updateMetaContent("color-scheme", this.colorScheme);
		if (changed.has("fontsUrl")) if (this.fontsUrl) this._ensureFontPreconnect();
		else this._removeFontPreconnect();
	}
	_ensureMeta(key, selector, attr1, val1, attr2, val2) {
		let el = this._metaElements.get(key);
		if (!el) el = document.head.querySelector(selector);
		if (!el) {
			el = document.createElement("meta");
			el.setAttribute(attr1, val1 ?? "");
			if (attr2 && val2 !== void 0) el.setAttribute(attr2, val2);
			document.head.appendChild(el);
			this._metaElements.set(key, el);
		} else {
			if (attr2 && val2 !== void 0) el.setAttribute(attr2, val2);
			this._metaElements.set(key, el);
		}
	}
	_ensureTitle() {
		let el = document.head.querySelector("title");
		if (!el) {
			el = document.createElement("title");
			document.head.appendChild(el);
		}
		el.textContent = this.title;
	}
	_updateMetaContent(key, value) {
		const el = this._metaElements.get(key);
		if (el) if (key === "charset") el.setAttribute("charset", value);
		else el.setAttribute("content", value);
	}
	_ensureFontPreconnect() {
		if (!this.fontsUrl) return;
		const key = "fonts-preconnect";
		let el = this._metaElements.get(key);
		if (!el) el = document.head.querySelector(`link[rel="preconnect"][href="${this.fontsUrl}"]`);
		if (!el) {
			el = document.createElement("link");
			el.rel = "preconnect";
			el.href = this.fontsUrl;
			el.crossOrigin = "anonymous";
			document.head.appendChild(el);
			this._metaElements.set(key, el);
		} else if (el.href !== this.fontsUrl) el.href = this.fontsUrl;
	}
	_removeFontPreconnect() {
		const el = this._metaElements.get("fonts-preconnect");
		if (el && el.parentNode) el.parentNode.removeChild(el);
		this._metaElements.delete("fonts-preconnect");
	}
	setTheme(theme) {
		document.documentElement.setAttribute("data-theme", theme);
		this.colorScheme = theme;
		this._updateMetaContent("color-scheme", theme);
	}
	render() {
		return html`<slot></slot>`;
	}
};
__decorate([property({ type: String })], AuySkeleton.prototype, "lang", void 0);
__decorate([property({ type: String })], AuySkeleton.prototype, "title", void 0);
__decorate([property({ type: String })], AuySkeleton.prototype, "charset", void 0);
__decorate([property({ type: String })], AuySkeleton.prototype, "viewport", void 0);
__decorate([property({ type: String })], AuySkeleton.prototype, "themeColor", void 0);
__decorate([property({ type: String })], AuySkeleton.prototype, "description", void 0);
__decorate([property({ type: String })], AuySkeleton.prototype, "colorScheme", void 0);
__decorate([property({ type: String })], AuySkeleton.prototype, "fontsUrl", void 0);
AuySkeleton = __decorate([customElement("auy-skeleton")], AuySkeleton);
//#endregion
//#region src/layouts/common/print-engine.ts
var AuyPrintEngine = class AuyPrintEngine extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.title = "";
		this.showWatermark = true;
		this.watermarkText = "CÓPIA CONTROLADA";
		this.showHeader = true;
		this.showFooter = true;
		this.showQR = false;
		this._originalTitle = null;
		this._currentDate = /* @__PURE__ */ new Date();
		this._dateInterval = null;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .toolbar {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--auy-color-surface);
        border-block-end: 1px solid var(--auy-color-border);
      }

      .toolbar button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        background: var(--auy-color-primary);
        color: #fff;
        cursor: pointer;
        touch-action: manipulation;
        font: inherit;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }

      .toolbar button:hover {
        opacity: 0.9;
      }

      .toolbar button:active {
        opacity: 0.8;
      }

      .toolbar button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .toolbar .info {
        margin-inline-start: auto;
        font-size: 0.8rem;
        color: var(--auy-color-text-muted);
        display: flex;
        align-items: center;
      }

      .print-area {
        position: relative;
        max-inline-size: 210mm;
        margin: 0 auto;
        padding: 15mm;
        background: #fff;
        color: #000;
        min-block-size: 297mm;
        box-shadow: var(--auy-shadow-md);
      }

      .print-area .watermark {
        position: fixed;
        inset-block-start: 50%;
        inset-inline-start: 50%;
        translate: -50% -50%;
        font-size: 80px;
        opacity: 0.04;
        color: #000;
        font-weight: 900;
        pointer-events: none;
        white-space: nowrap;
        rotate: -30deg;
        user-select: none;
      }

      .print-area .print-header {
        border-block-end: 2px solid #000;
        padding-block-end: 1rem;
        margin-block-end: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .print-area .print-content {
        position: relative;
        min-block-size: 60dvh;
      }

      .print-area .print-footer {
        border-block-start: 1px solid #ccc;
        padding-block-start: 1rem;
        margin-block-start: 2rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: #666;
      }

      .print-footer .qr-code {
        display: inline-block;
        vertical-align: middle;
        inline-size: 32px;
        block-size: 32px;
      }

      .preview-mode .print-area {
        box-shadow: var(--auy-shadow-lg);
        outline: 2px solid var(--auy-color-primary);
        outline-offset: 2px;
      }

      @media print {
        .toolbar {
          display: none !important;
        }

        .print-area {
          box-shadow: none;
          padding: 0;
          max-inline-size: none;
          margin: 0;
          min-block-size: auto;
        }

        .print-area .watermark {
          opacity: 0.03;
        }

        .print-footer .qr-code {
          inline-size: 60px;
          block-size: 60px;
        }

        a[href]:after {
          content: ' (' attr(href) ')';
        }
      }

      @media (forced-colors: active) {
        .toolbar button:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        * {
          transition: none !important;
        }
      }
    }

    @page {
      size: A4;
      margin: 15mm;
    }

    @page :first {
      margin-top: 25mm;
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window !== "undefined") {
			this._originalTitle = document.title;
			this._dateInterval = setInterval(() => {
				this._currentDate = /* @__PURE__ */ new Date();
			}, 3e4);
		}
	}
	disconnectedCallback() {
		if (typeof window !== "undefined") {
			if (this._originalTitle !== null) {
				document.title = this._originalTitle;
				this._originalTitle = null;
			}
			if (this._dateInterval !== null) {
				clearInterval(this._dateInterval);
				this._dateInterval = null;
			}
		}
		super.disconnectedCallback();
	}
	_print() {
		if (typeof window === "undefined") return;
		if (this.title) document.title = this.title;
		window.print();
		if (this._originalTitle !== null) document.title = this._originalTitle;
	}
	_preview() {
		this.classList.toggle("preview-mode");
	}
	_renderHeader() {
		if (!this.showHeader) return "";
		return html`
      <span part="header-title">${this.title}</span>
      <span part="header-date">${this._currentDate.toLocaleDateString()}</span>
    `;
	}
	_renderFooter() {
		if (!this.showFooter) return "";
		return html`
      <span part="footer-url">${typeof window !== "undefined" ? window.location.href : ""}</span>
      <span part="footer-timestamp">${this._currentDate.toLocaleString()}</span>
      ${this.showQR ? html`
        <span part="footer-qr">${this._generateQR(typeof window !== "undefined" ? window.location.href : "")}</span>
      ` : ""}
    `;
	}
	_generateQR(_text) {
		const dim = 32;
		return html`
      <svg class="qr-code" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" width="${dim}" height="${dim}" aria-hidden="true" focusable="false" role="img">
        <title>QR Code</title>
        <rect width="${dim}" height="${dim}" fill="transparent"/>
        <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="6" fill="#666">QR</text>
      </svg>
    `;
	}
	render() {
		return html`
      <div part="toolbar" class="toolbar">
        <button @click=${this._print} part="btn">Imprimir</button>
        <button @click=${this._preview} part="btn">Visualizar</button>
        <span part="info" class="info">${this._currentDate.toLocaleString()}</span>
      </div>
      <div part="print-area" class="print-area">
        ${this.showWatermark ? html`<div part="watermark" class="watermark" aria-hidden="true">${this.watermarkText}</div>` : ""}
        <div part="print-header" class="print-header">${this._renderHeader()}</div>
        <div part="print-content" class="print-content">
          <slot></slot>
        </div>
        <div part="print-footer" class="print-footer">${this._renderFooter()}</div>
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyPrintEngine.prototype, "title", void 0);
__decorate([property({ type: Boolean })], AuyPrintEngine.prototype, "showWatermark", void 0);
__decorate([property({ type: String })], AuyPrintEngine.prototype, "watermarkText", void 0);
__decorate([property({ type: Boolean })], AuyPrintEngine.prototype, "showHeader", void 0);
__decorate([property({ type: Boolean })], AuyPrintEngine.prototype, "showFooter", void 0);
__decorate([property({ type: Boolean })], AuyPrintEngine.prototype, "showQR", void 0);
__decorate([state()], AuyPrintEngine.prototype, "_currentDate", void 0);
AuyPrintEngine = __decorate([customElement("auy-print-engine")], AuyPrintEngine);
//#endregion
//#region src/layouts/common/accessibility-bar.ts
var A11Y_STORAGE_KEY = "auy_a11y";
var DEFAULT_STATE = {
	fontSize: 100,
	contrast: false,
	dyslexia: false,
	readingGuide: "off",
	cursor: false,
	highlightLinks: false,
	spacing: 0,
	noAnimations: false
};
function loadState() {
	try {
		const raw = localStorage.getItem(A11Y_STORAGE_KEY);
		if (raw) return {
			...DEFAULT_STATE,
			...JSON.parse(raw)
		};
	} catch {}
	return { ...DEFAULT_STATE };
}
function persistState(state) {
	localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(state));
}
function injectAccessibilityStyles() {
	if (document.getElementById("auy-a11y-global-css")) return;
	const cursorSvg = [
		"<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"48\" height=\"48\" viewBox=\"0 0 48 48\">",
		"<circle cx=\"24\" cy=\"24\" r=\"22\" fill=\"none\" stroke=\"#000\" stroke-width=\"4\"/>",
		"<circle cx=\"24\" cy=\"24\" r=\"4\" fill=\"#000\"/>",
		"<line x1=\"24\" y1=\"2\" x2=\"24\" y2=\"46\" stroke=\"#000\" stroke-width=\"1\" opacity=\".3\"/>",
		"<line x1=\"2\" y1=\"24\" x2=\"46\" y2=\"24\" stroke=\"#000\" stroke-width=\"1\" opacity=\".3\"/>",
		"</svg>"
	].join("");
	const cursorUri = `url("data:image/svg+xml,${encodeURIComponent(cursorSvg)}") 24 24, default`;
	const cssText = `
html[data-auy-contrast]{filter:invert(1) hue-rotate(180deg);background:#000}
html[data-auy-contrast] img,html[data-auy-contrast] video,html[data-auy-contrast] canvas{filter:invert(1) hue-rotate(180deg)}
html[data-auy-dyslexia]{font-family:'OpenDyslexic','Comic Sans MS',sans-serif!important}
html[data-auy-dyslexia] *{font-family:inherit!important}
html[data-auy-highlight-links] a{background:yellow!important;color:black!important;outline:2px solid black!important;text-decoration-color:black!important}
html[data-auy-no-animations] *,html[data-auy-no-animations] *::before,html[data-auy-no-animations] *::after{animation-delay:-0.01ms!important;animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-delay:0s!important;transition-duration:0s!important}
html[data-auy-cursor] *{cursor:${cursorUri}!important}
html[data-auy-cursor] input,html[data-auy-cursor] textarea,html[data-auy-cursor] select,html[data-auy-cursor] [contenteditable]{cursor:${cursorUri}!important}
html[data-auy-guide="window"] .auy-reading-guide-window{box-shadow:0 0 0 9999px rgba(0,0,0,0.25)!important;pointer-events:none!important;z-index:1!important}
html[data-auy-guide="marker"] .auy-reading-guide-marker{pointer-events:none!important;z-index:1!important}
html.auy-spacing-1{letter-spacing:0.12em!important;word-spacing:0.16em!important;line-height:1.5!important}
html.auy-spacing-1 *{letter-spacing:inherit;word-spacing:inherit;line-height:inherit}
html.auy-spacing-2{letter-spacing:0.2em!important;word-spacing:0.3em!important;line-height:2!important}
html.auy-spacing-2 *{letter-spacing:inherit;word-spacing:inherit;line-height:inherit}
  `.trim();
	const style = document.createElement("style");
	style.id = "auy-a11y-global-css";
	style.textContent = cssText;
	document.head.appendChild(style);
}
var AuyAccessibilityBar = class AuyAccessibilityBar extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.mode = "widget";
		this.contrast = false;
		this.fontSize = 100;
		this.showVlibras = false;
		this.skipLinks = [
			{
				href: "#main-content",
				label: "Ir para o conteúdo principal"
			},
			{
				href: "#main-nav",
				label: "Ir para a navegação"
			},
			{
				href: "#footer",
				label: "Ir para o rodapé"
			}
		];
		this._showWidgetPanel = false;
		this._readingGuideEl = null;
		this._onMouseMove = null;
		this._dyslexia = false;
		this._readingGuide = "off";
		this._cursorEnlarged = false;
		this._highlightLinks = false;
		this._spacing = 0;
		this._noAnimations = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
      }

      .skip-link:focus {
        position: fixed;
        inset-block-start: var(--auy-space-sm, 0.5rem);
        inset-inline-start: var(--auy-space-sm, 0.5rem);
        inline-size: auto;
        block-size: auto;
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
        background-color: var(--auy-color-primary, oklch(50% 0.2 250));
        color: oklch(100% 0 0);
        font-size: var(--auy-text-sm);
        border-radius: var(--auy-radius-md, 0.375rem);
        text-decoration: none;
        z-index: 1;
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .toolbar {
        display: flex;
        align-items: center;
        gap: var(--auy-space-xs, 0.375rem);
        padding: var(--auy-space-xs, 0.375rem) var(--auy-space-sm, 0.5rem);
        background-color: var(--auy-color-surface, oklch(100% 0 0));
        border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        position: sticky;
        inset-block-start: 0;
        z-index: 1;
        flex-wrap: wrap;
      }

      .toolbar-btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-xs, 0.25rem);
        padding: var(--auy-space-xs, 0.25rem) var(--auy-space-sm, 0.5rem);
        font-family: inherit;
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text, oklch(20% 0.03 260));
        background-color: transparent;
        border: 0.0625rem solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: var(--auy-radius-sm, 0.25rem);
        cursor: pointer;
        line-height: 1;
        transition: background-color var(--auy-transition-fast, 150ms) ease,
          border-color var(--auy-transition-fast, 150ms) ease,
          color var(--auy-transition-fast, 150ms) ease;
        user-select: none;
        -webkit-user-select: none;
        white-space: nowrap;
        min-block-size: 2.25rem;
      }

      .toolbar-btn:hover {
        background-color: var(--auy-color-surface-hover, oklch(96% 0.005 260));
      }

      .toolbar-btn:active {
        background-color: var(--auy-color-surface-active, oklch(0% 0 0 / 0.1));
      }

      .toolbar-btn:focus-visible {
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .toolbar-btn[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      .contrast-active {
        background-color: var(--auy-color-primary, oklch(50% 0.2 250));
        color: oklch(100% 0 0);
        border-color: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      .contrast-active:hover {
        background-color: var(--auy-color-primary-hover, oklch(45% 0.2 250));
        border-color: var(--auy-color-primary-hover, oklch(45% 0.2 250));
      }

      .contrast-active:active {
        background-color: var(--auy-color-primary-active, oklch(42% 0.22 250));
        border-color: var(--auy-color-primary-active, oklch(42% 0.22 250));
      }

      .separator {
        inline-size: 0.0625rem;
        block-size: 1.5rem;
        background-color: var(--auy-color-border, oklch(0% 0 0 / 0.15));
        margin: 0 var(--auy-space-xs, 0.25rem);
      }

      .vlibras-link {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs, 0.25rem);
        padding: var(--auy-space-xs, 0.25rem) var(--auy-space-sm, 0.5rem);
        font-family: inherit;
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text, oklch(20% 0.03 260));
        text-decoration: none;
        border: 0.0625rem solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: var(--auy-radius-sm, 0.25rem);
        cursor: pointer;
        line-height: 1;
        min-block-size: 2.25rem;
        transition: background-color var(--auy-transition-fast, 150ms) ease,
          border-color var(--auy-transition-fast, 150ms) ease;
      }

      .vlibras-link:hover {
        background-color: var(--auy-color-surface-hover, oklch(96% 0.005 260));
      }

      .vlibras-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .floating-btn {
        box-sizing: border-box;
        position: fixed;
        inset-block-end: 1rem;
        inset-inline-end: 1rem;
        inline-size: 3rem;
        block-size: 3rem;
        border-radius: 50%;
        border: none;
        margin: 0;
        padding: 0;
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        color: oklch(100% 0 0);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--auy-text-xl);
        font-weight: 700;
        font-family: inherit;
        line-height: 1;
        cursor: pointer;
        text-decoration: none;
        box-shadow: 0 0.125rem 0.5rem oklch(0% 0 0 / 0.25);
        transition: background-color var(--auy-transition-fast, 150ms) ease;
      }

      .floating-btn:hover {
        background: var(--auy-color-primary-hover, oklch(45% 0.2 250));
      }

      .floating-btn:focus-visible {
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .widget-panel {
        position: fixed;
        inset-block-end: 5rem;
        inset-inline-end: 1rem;
        inline-size: 17.5rem;
        background: var(--auy-color-surface, oklch(100% 0 0));
        border-radius: var(--auy-radius-lg, 0.5rem);
        box-shadow: 0 0.25rem 1rem oklch(0% 0 0 / 0.2);
        padding: 1rem;
      }

      .widget-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
        margin-block-end: 0.75rem;
      }

      .widget-btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 0.25rem;
        font-family: inherit;
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text, oklch(20% 0.03 260));
        background: transparent;
        border: 0.0625rem solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: var(--auy-radius-sm, 0.25rem);
        cursor: pointer;
        line-height: 1.2;
        text-align: center;
        min-block-size: 2.5rem;
        transition: background-color var(--auy-transition-fast, 150ms) ease,
          border-color var(--auy-transition-fast, 150ms) ease,
          color var(--auy-transition-fast, 150ms) ease;
      }

      .widget-btn:hover {
        background: var(--auy-color-surface-hover, oklch(96% 0.005 260));
      }

      .widget-btn:active {
        background: var(--auy-color-surface-active, oklch(0% 0 0 / 0.1));
      }

      .widget-btn:focus-visible {
        outline: 0.125rem solid var(--auy-color-focus-ring, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      .widget-btn.active {
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        color: oklch(100% 0 0);
        border-color: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      .widget-btn.active:hover {
        background: var(--auy-color-primary-hover, oklch(45% 0.2 250));
        border-color: var(--auy-color-primary-hover, oklch(45% 0.2 250));
      }

      .widget-btn.active:active {
        background: var(--auy-color-primary-active, oklch(42% 0.22 250));
        border-color: var(--auy-color-primary-active, oklch(42% 0.22 250));
      }

      .widget-btn[disabled] {
        opacity: 0.4;
        cursor: not-allowed;
        pointer-events: none;
      }

      .widget-btn.reset-btn {
        grid-column: 1 / -1;
        inline-size: 100%;
        border-color: var(--auy-color-border, oklch(0% 0 0 / 0.15));
        font-weight: 600;
      }

      @media (forced-colors: active) {
        .toolbar-btn:focus-visible,
        .vlibras-link:focus-visible,
        .floating-btn:focus-visible,
        .widget-btn:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .toolbar-btn,
        .vlibras-link,
        .floating-btn,
        .widget-btn {
          transition: none;
        }
      }

      @media print {
        :host {
          display: none !important;
        }
      }
    }
  `;
	}
	_increaseFont() {
		const newSize = Math.min(this.fontSize + 10, 140);
		this.fontSize = newSize;
		this._applyFontSize(newSize);
	}
	_decreaseFont() {
		const newSize = Math.max(this.fontSize - 10, 80);
		this.fontSize = newSize;
		this._applyFontSize(newSize);
	}
	_applyFontSize(scale) {
		if (typeof window === "undefined") return;
		document.documentElement.style.setProperty("--auy-font-scale", `${scale}%`);
		document.documentElement.style.fontSize = `${scale}%`;
		this._saveState();
		this.dispatchEvent(new CustomEvent("font-change", { detail: { scale } }));
	}
	_toggleContrast() {
		this.contrast = !this.contrast;
		this._applyHtmlAttr("data-auy-contrast", this.contrast);
		this._saveState();
		this.dispatchEvent(new CustomEvent("contrast-toggle", { detail: { active: this.contrast } }));
	}
	_toggleDyslexia() {
		this._dyslexia = !this._dyslexia;
		this._applyHtmlAttr("data-auy-dyslexia", this._dyslexia);
		this._saveState();
	}
	_toggleReadingGuide() {
		const next = this._readingGuide === "off" ? "window" : this._readingGuide === "window" ? "marker" : "off";
		this._readingGuide = next;
		if (next !== "off") this._createReadingGuide();
		else this._destroyReadingGuide();
		if (typeof window !== "undefined") {
			const html = document.documentElement;
			if (next === "off") html.removeAttribute("data-auy-guide");
			else html.setAttribute("data-auy-guide", next);
		}
		this._saveState();
	}
	_toggleCursor() {
		this._cursorEnlarged = !this._cursorEnlarged;
		this._applyHtmlAttr("data-auy-cursor", this._cursorEnlarged);
		this._saveState();
	}
	_toggleHighlightLinks() {
		this._highlightLinks = !this._highlightLinks;
		this._applyHtmlAttr("data-auy-highlight-links", this._highlightLinks);
		this._saveState();
	}
	_increaseSpacing() {
		this._spacing = Math.min(this._spacing + 1, 2);
		this._applySpacing();
		this._saveState();
	}
	_decreaseSpacing() {
		this._spacing = Math.max(this._spacing - 1, 0);
		this._applySpacing();
		this._saveState();
	}
	_applySpacing() {
		if (typeof window === "undefined") return;
		const html = document.documentElement;
		html.classList.remove("auy-spacing-1", "auy-spacing-2");
		if (this._spacing === 1) html.classList.add("auy-spacing-1");
		else if (this._spacing === 2) html.classList.add("auy-spacing-2");
	}
	_toggleNoAnimations() {
		this._noAnimations = !this._noAnimations;
		this._applyHtmlAttr("data-auy-no-animations", this._noAnimations);
		this._saveState();
	}
	_resetAll() {
		if (this._readingGuide !== "off") this._destroyReadingGuide();
		this.fontSize = DEFAULT_STATE.fontSize;
		this.contrast = DEFAULT_STATE.contrast;
		this._dyslexia = DEFAULT_STATE.dyslexia;
		this._readingGuide = DEFAULT_STATE.readingGuide;
		this._cursorEnlarged = DEFAULT_STATE.cursor;
		this._highlightLinks = DEFAULT_STATE.highlightLinks;
		this._spacing = DEFAULT_STATE.spacing;
		this._noAnimations = DEFAULT_STATE.noAnimations;
		if (typeof window !== "undefined") {
			document.documentElement.style.removeProperty("--auy-font-scale");
			document.documentElement.style.fontSize = "";
			document.documentElement.classList.remove("auy-spacing-1", "auy-spacing-2");
			for (const attr of [
				"data-auy-contrast",
				"data-auy-dyslexia",
				"data-auy-guide",
				"data-auy-cursor",
				"data-auy-highlight-links",
				"data-auy-no-animations"
			]) document.documentElement.removeAttribute(attr);
		}
		persistState(DEFAULT_STATE);
		this.dispatchEvent(new CustomEvent("a11y-reset"));
	}
	_applyHtmlAttr(attr, active) {
		if (typeof window === "undefined") return;
		if (active) document.documentElement.setAttribute(attr, "true");
		else document.documentElement.removeAttribute(attr);
	}
	_createReadingGuide() {
		if (this._readingGuideEl) return;
		const mode = this._readingGuide;
		if (mode === "off") return;
		const el = document.createElement("div");
		if (mode === "window") {
			el.className = "auy-reading-guide-window";
			el.style.cssText = [
				"position:fixed",
				"inset-inline-start:0",
				"inset-inline-end:0",
				"block-size:4.8rem",
				"background:rgba(255,200,0,0.15)",
				"border-block-start:2px solid rgba(255,150,0,0.4)",
				"border-block-end:2px solid rgba(255,150,0,0.4)",
				"pointer-events:none",
				"display:none"
			].join(";");
		} else {
			el.className = "auy-reading-guide-marker";
			el.style.cssText = [
				"position:fixed",
				"inset-inline-start:0",
				"inset-inline-end:0",
				"block-size:2px",
				"background:rgba(255,0,0,0.5)",
				"pointer-events:none",
				"display:none",
				"z-index:1"
			].join(";");
		}
		document.body.appendChild(el);
		this._readingGuideEl = el;
		this._onMouseMove = (e) => {
			el.style.display = "block";
			if (mode === "window") el.style.top = `${e.clientY - 38.4}px`;
			else el.style.top = `${e.clientY}px`;
		};
		document.addEventListener("mousemove", this._onMouseMove);
	}
	_destroyReadingGuide() {
		if (this._readingGuideEl) {
			this._readingGuideEl.remove();
			this._readingGuideEl = null;
		}
		if (this._onMouseMove) {
			document.removeEventListener("mousemove", this._onMouseMove);
			this._onMouseMove = null;
		}
	}
	_saveState() {
		persistState({
			fontSize: this.fontSize,
			contrast: this.contrast,
			dyslexia: this._dyslexia,
			readingGuide: this._readingGuide,
			cursor: this._cursorEnlarged,
			highlightLinks: this._highlightLinks,
			spacing: this._spacing,
			noAnimations: this._noAnimations
		});
	}
	_toggleWidgetPanel() {
		this._showWidgetPanel = !this._showWidgetPanel;
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window === "undefined") return;
		injectAccessibilityStyles();
		const state = loadState();
		this.fontSize = state.fontSize;
		this.contrast = state.contrast;
		this._dyslexia = state.dyslexia;
		this._readingGuide = state.readingGuide;
		this._cursorEnlarged = state.cursor;
		this._highlightLinks = state.highlightLinks;
		this._spacing = state.spacing;
		this._noAnimations = state.noAnimations;
		if (state.fontSize !== 100) {
			document.documentElement.style.setProperty("--auy-font-scale", `${state.fontSize}%`);
			document.documentElement.style.fontSize = `${state.fontSize}%`;
		}
		this._applyHtmlAttr("data-auy-contrast", state.contrast);
		this._applyHtmlAttr("data-auy-dyslexia", state.dyslexia);
		if (state.readingGuide !== "off") document.documentElement.setAttribute("data-auy-guide", state.readingGuide);
		this._applyHtmlAttr("data-auy-cursor", state.cursor);
		this._applyHtmlAttr("data-auy-highlight-links", state.highlightLinks);
		this._applyHtmlAttr("data-auy-no-animations", state.noAnimations);
		if (state.readingGuide !== "off") this._createReadingGuide();
		this._applySpacing();
		if (state.readingGuide) this._createReadingGuide();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this._destroyReadingGuide();
	}
	render() {
		return html`
      ${this.mode === "compact" ? html`
            <nav part="toolbar" class="toolbar" aria-label="Acessibilidade">
              <button
                part="btn-decrease"
                class="toolbar-btn"
                @click=${this._decreaseFont}
                ?disabled=${this.fontSize <= 80}
                aria-label="Diminuir fonte"
                title="Diminuir fonte"
              >
                A-
              </button>

              <button
                part="btn-increase"
                class="toolbar-btn"
                @click=${this._increaseFont}
                ?disabled=${this.fontSize >= 140}
                aria-label="Aumentar fonte"
                title="Aumentar fonte"
              >
                A+
              </button>

              <span class="separator" aria-hidden="true"></span>

              <button
                part="btn-contrast"
                class="toolbar-btn ${this.contrast ? "contrast-active" : ""}"
                @click=${this._toggleContrast}
                aria-label=${this.contrast ? "Desativar alto contraste" : "Ativar alto contraste"}
                aria-pressed=${this.contrast ? "true" : "false"}
                title=${this.contrast ? "Desativar alto contraste" : "Ativar alto contraste"}
              >
                Contraste
              </button>

              <span class="separator" aria-hidden="true"></span>

              <button
                class="toolbar-btn ${this._dyslexia ? "contrast-active" : ""}"
                @click=${this._toggleDyslexia}
                aria-label=${this._dyslexia ? "Desativar fonte para dislexia" : "Ativar fonte para dislexia"}
                aria-pressed=${this._dyslexia ? "true" : "false"}
                title=${this._dyslexia ? "Desativar fonte dislexia" : "Ativar fonte dislexia"}
              >
                Dislexia
              </button>

              <button
                class="toolbar-btn ${this._readingGuide !== "off" ? "contrast-active" : ""}"
                @click=${this._toggleReadingGuide}
                aria-label=${this._readingGuide === "off" ? "Ativar guia de leitura (janela)" : this._readingGuide === "window" ? "Ativar guia de leitura (linha)" : "Desativar guia de leitura"}
                aria-pressed=${this._readingGuide !== "off" ? "true" : "false"}
                title=${this._readingGuide === "off" ? "Guia de leitura - janela" : this._readingGuide === "window" ? "Guia de leitura - linha" : "Desativar guia"}
              >
                ${this._readingGuide === "window" ? "Guia ▼" : this._readingGuide === "marker" ? "Guia ─" : "Guia"}
              </button>

              <button
                class="toolbar-btn ${this._cursorEnlarged ? "contrast-active" : ""}"
                @click=${this._toggleCursor}
                aria-label=${this._cursorEnlarged ? "Desativar cursor ampliado" : "Ativar cursor ampliado"}
                aria-pressed=${this._cursorEnlarged ? "true" : "false"}
                title=${this._cursorEnlarged ? "Desativar cursor ampliado" : "Ativar cursor ampliado"}
              >
                Cursor
              </button>

              <button
                class="toolbar-btn ${this._highlightLinks ? "contrast-active" : ""}"
                @click=${this._toggleHighlightLinks}
                aria-label=${this._highlightLinks ? "Desativar destaque de links" : "Ativar destaque de links"}
                aria-pressed=${this._highlightLinks ? "true" : "false"}
                title=${this._highlightLinks ? "Desativar destaque de links" : "Ativar destaque de links"}
              >
                Links
              </button>

              <span class="separator" aria-hidden="true"></span>

              <button
                class="toolbar-btn"
                @click=${this._decreaseSpacing}
                ?disabled=${this._spacing <= 0}
                aria-label="Diminuir espaçamento"
                title="Diminuir espaçamento"
              >
                Espaço-
              </button>

              <button
                class="toolbar-btn"
                @click=${this._increaseSpacing}
                ?disabled=${this._spacing >= 2}
                aria-label="Aumentar espaçamento"
                title="Aumentar espaçamento"
              >
                Espaço+
              </button>

              <span class="separator" aria-hidden="true"></span>

              <button
                class="toolbar-btn ${this._noAnimations ? "contrast-active" : ""}"
                @click=${this._toggleNoAnimations}
                aria-label=${this._noAnimations ? "Ativar animações" : "Desativar animações"}
                aria-pressed=${this._noAnimations ? "true" : "false"}
                title=${this._noAnimations ? "Ativar animações" : "Desativar animações"}
              >
                Animações
              </button>

              <span class="separator" aria-hidden="true"></span>

              <button
                class="toolbar-btn"
                @click=${this._resetAll}
                aria-label="Redefinir todas as configurações de acessibilidade"
                title="Redefinir acessibilidade"
              >
                Resetar
              </button>

              ${this.showVlibras ? html`
                    <span class="separator" aria-hidden="true"></span>

                    <a
                      part="btn-vlibras"
                      class="vlibras-link"
                      href="https://vlibras.gov.br"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="VLibras - Tradutor para Libras"
                      title="VLibras - Tradutor para Libras"
                    >
                      VLibras
                    </a>
                  ` : ""}
            </nav>
          ` : html`
            <button
              class="floating-btn"
              @click=${this._toggleWidgetPanel}
              aria-label="Acessibilidade"
              aria-expanded=${this._showWidgetPanel ? "true" : "false"}
              title="Opções de acessibilidade"
            >
              A
            </button>

            ${this._showWidgetPanel ? html`
                  <div class="widget-panel" role="dialog" aria-label="Opções de acessibilidade">
                    <div class="widget-grid">
                      <button
                        class="widget-btn ${this._dyslexia ? "active" : ""}"
                        @click=${this._toggleDyslexia}
                        aria-pressed=${this._dyslexia ? "true" : "false"}
                      >
                        Dislexia
                      </button>

                      <button
                        class="widget-btn ${this._readingGuide !== "off" ? "active" : ""}"
                        @click=${this._toggleReadingGuide}
                        aria-pressed=${this._readingGuide !== "off" ? "true" : "false"}
                      >
                        ${this._readingGuide === "window" ? "Guia ▼" : this._readingGuide === "marker" ? "Guia ─" : "Guia"}
                      </button>

                      <button
                        class="widget-btn ${this._cursorEnlarged ? "active" : ""}"
                        @click=${this._toggleCursor}
                        aria-pressed=${this._cursorEnlarged ? "true" : "false"}
                      >
                        Cursor
                      </button>

                      <button
                        class="widget-btn ${this._highlightLinks ? "active" : ""}"
                        @click=${this._toggleHighlightLinks}
                        aria-pressed=${this._highlightLinks ? "true" : "false"}
                      >
                        Links
                      </button>

                      <button
                        class="widget-btn"
                        @click=${this._decreaseFont}
                        ?disabled=${this.fontSize <= 80}
                        aria-label="Diminuir fonte"
                      >
                        A-
                      </button>

                      <button
                        class="widget-btn"
                        @click=${this._increaseFont}
                        ?disabled=${this.fontSize >= 140}
                        aria-label="Aumentar fonte"
                      >
                        A+
                      </button>

                      <button
                        class="widget-btn"
                        @click=${this._decreaseSpacing}
                        ?disabled=${this._spacing <= 0}
                        aria-label="Diminuir espaçamento"
                      >
                        Espaço-
                      </button>

                      <button
                        class="widget-btn"
                        @click=${this._increaseSpacing}
                        ?disabled=${this._spacing >= 2}
                        aria-label="Aumentar espaçamento"
                      >
                        Espaço+
                      </button>

                      <button
                        class="widget-btn ${this.contrast ? "active" : ""}"
                        @click=${this._toggleContrast}
                        aria-pressed=${this.contrast ? "true" : "false"}
                      >
                        Contraste
                      </button>

                      <button
                        class="widget-btn ${this._noAnimations ? "active" : ""}"
                        @click=${this._toggleNoAnimations}
                        aria-pressed=${this._noAnimations ? "true" : "false"}
                      >
                        Animações
                      </button>
                    </div>

                    <button class="widget-btn reset-btn" @click=${this._resetAll}>
                      Resetar tudo
                    </button>
                  </div>
                ` : ""}
          `}
    `;
	}
};
__decorate([property({ type: String })], AuyAccessibilityBar.prototype, "mode", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyAccessibilityBar.prototype, "contrast", void 0);
__decorate([property({ type: Number })], AuyAccessibilityBar.prototype, "fontSize", void 0);
__decorate([property({ type: Boolean })], AuyAccessibilityBar.prototype, "showVlibras", void 0);
__decorate([property({ type: Array })], AuyAccessibilityBar.prototype, "skipLinks", void 0);
__decorate([state()], AuyAccessibilityBar.prototype, "_showWidgetPanel", void 0);
__decorate([state()], AuyAccessibilityBar.prototype, "_dyslexia", void 0);
__decorate([state()], AuyAccessibilityBar.prototype, "_readingGuide", void 0);
__decorate([state()], AuyAccessibilityBar.prototype, "_cursorEnlarged", void 0);
__decorate([state()], AuyAccessibilityBar.prototype, "_highlightLinks", void 0);
__decorate([state()], AuyAccessibilityBar.prototype, "_spacing", void 0);
__decorate([state()], AuyAccessibilityBar.prototype, "_noAnimations", void 0);
AuyAccessibilityBar = __decorate([customElement("auy-accessibility-bar")], AuyAccessibilityBar);
//#endregion
//#region src/layouts/common/footer-transparency.ts
var AuyFooterTransparency = class AuyFooterTransparency extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.title = "Transparência";
		this.description = "";
		this.items = [
			{
				label: "Lei de Acesso à Informação",
				href: "#"
			},
			{
				label: "Perguntas Frequentes",
				href: "#"
			},
			{
				label: "Dados Abertos",
				href: "#"
			},
			{
				label: "Relatório de Gestão",
				href: "#"
			},
			{
				label: "Contrato de Gestão",
				href: "#"
			},
			{
				label: "SIC Físico",
				href: "#"
			},
			{
				label: "e-SIC",
				href: "#"
			},
			{
				label: "Serviço de Informação",
				href: "#"
			}
		];
		this.columns = 4;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .panel {
        display: grid;
        gap: var(--auy-space-md);
        padding: var(--auy-space-lg);
        background: color-mix(in oklch, var(--auy-color-primary) 4%, transparent);
        border-radius: var(--auy-radius-md);
      }

      h3 {
        font-size: var(--auy-text-base);
        font-weight: 600;
        color: var(--auy-color-text);
        margin: 0;
      }

      p {
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        margin: 0;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(var(--columns, 4), 1fr);
        gap: var(--auy-space-sm);
        container-type: inline-size;
      }

      .link {
        display: flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm);
        border-radius: var(--auy-radius-sm);
        text-decoration: none;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-primary);
        transition: background var(--auy-transition-fast);
        line-height: var(--auy-line-height-sm);
        touch-action: manipulation;
      }

      .link:hover {
        background: color-mix(in oklch, var(--auy-color-primary) 8%, transparent);
        text-decoration: underline;
      }

      .link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .link:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @container (max-width: 600px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @container (max-width: 400px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }

      @media print {
        .panel {
          display: none;
        }
      }
    }
  `;
	}
	render() {
		return html`
      <div part="panel" class="panel">
        ${this.title ? html`<h3 part="title">${this.title}</h3>` : ""}
        ${this.description ? html`<p part="desc">${this.description}</p>` : ""}
        <div part="grid" class="grid" style="--columns: ${this.columns}">
          ${this.items.map((item) => html`
              <a part="link" href=${item.href} class="link">
                ${item.icon ? html`<span part="link-icon">${item.icon}</span>` : ""}
                <span part="link-label">${item.label}</span>
              </a>
            `)}
        </div>
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyFooterTransparency.prototype, "title", void 0);
__decorate([property({ type: String })], AuyFooterTransparency.prototype, "description", void 0);
__decorate([property({ type: Array })], AuyFooterTransparency.prototype, "items", void 0);
__decorate([property({ type: Number })], AuyFooterTransparency.prototype, "columns", void 0);
AuyFooterTransparency = __decorate([customElement("auy-footer-transparency")], AuyFooterTransparency);
//#endregion
//#region src/layouts/error/403.ts
var AuyError403 = class AuyError403 extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.message = "Acesso negado";
		this.description = "Você não tem permissão para acessar esta página.";
		this.homeUrl = "/";
		this.homeLabel = "Voltar ao início";
		this.loginUrl = "/login";
		this.loginLabel = "Fazer login";
		this.standalone = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: grid;
        place-items: center;
        min-block-size: 60dvh;
        padding: var(--auy-space-lg);
        contain: layout style;
        text-align: center;
      }

      .error-wrapper {
        display: grid;
        gap: var(--auy-space-md);
        max-inline-size: 480px;
      }

      .error-code {
        font-size: var(--auy-text-5xl);
        font-weight: 800;
        line-height: 1;
        color: var(--auy-color-warning);
        user-select: none;
        font-variant-numeric: tabular-nums;
      }

      .error-message {
        font-size: var(--auy-text-xl);
        font-weight: 600;
        color: var(--auy-color-text);
        margin: 0;
      }

      .error-description {
        font-size: var(--auy-text-base);
        color: var(--auy-color-text-muted);
        line-height: var(--auy-line-height);
        margin: 0;
      }

      .error-actions {
        display: flex;
        gap: var(--auy-space-sm);
        justify-content: center;
        flex-wrap: wrap;
        margin-block-start: var(--auy-space-sm);
      }

      .login-link {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm) var(--auy-space-md);
        background: var(--auy-color-primary);
        color: oklch(100% 0 0);
        border: none;
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        font-weight: 500;
        text-decoration: none;
        cursor: pointer;
        touch-action: manipulation;
        transition: filter var(--auy-transition-fast);
      }

      .login-link:hover {
        filter: brightness(1.1);
      }

      .login-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .home-link {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm) var(--auy-space-md);
        background: transparent;
        color: var(--auy-color-text);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        font-weight: 500;
        text-decoration: none;
        touch-action: manipulation;
        transition: background var(--auy-transition-fast);
      }

      .home-link:hover {
        background: color-mix(in oklch, var(--auy-color-text) 6%, transparent);
      }

      .home-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .login-link:focus-visible,
        .home-link:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .login-link,
        .home-link {
          transition: none;
        }
      }

      @media print {
        :host {
          min-block-size: auto;
          padding: 2rem;
        }
        .login-link, .home-link {
          display: none;
        }
      }
    }
  `;
	}
	_renderCard() {
		return html`
      <div class="error-wrapper" role="alert">
        <div class="error-code" aria-hidden="true">403</div>
        <h1 class="error-message">${this.message}</h1>
        <p class="error-description">${this.description}</p>
        <div class="error-actions">
          <a class="login-link" href=${this.loginUrl}>${this.loginLabel}</a>
          <a class="home-link" href=${this.homeUrl}>${this.homeLabel}</a>
        </div>
      </div>
    `;
	}
	render() {
		return this.standalone ? html`<auy-skeleton title="${this.message}">${this._renderCard()}</auy-skeleton>` : this._renderCard();
	}
};
__decorate([property({ type: String })], AuyError403.prototype, "message", void 0);
__decorate([property({ type: String })], AuyError403.prototype, "description", void 0);
__decorate([property({ type: String })], AuyError403.prototype, "homeUrl", void 0);
__decorate([property({ type: String })], AuyError403.prototype, "homeLabel", void 0);
__decorate([property({ type: String })], AuyError403.prototype, "loginUrl", void 0);
__decorate([property({ type: String })], AuyError403.prototype, "loginLabel", void 0);
__decorate([property({ type: Boolean })], AuyError403.prototype, "standalone", void 0);
AuyError403 = __decorate([customElement("auy-error-403")], AuyError403);
//#endregion
//#region src/layouts/error/404.ts
var AuyError404 = class AuyError404 extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.message = "Página não encontrada";
		this.description = "A página que você procura não existe ou foi movida.";
		this.homeUrl = "/";
		this.homeLabel = "Voltar ao início";
		this.standalone = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: grid;
        place-items: center;
        min-block-size: 60dvh;
        padding: var(--auy-space-lg);
        contain: layout style;
        text-align: center;
      }

      .error-wrapper {
        display: grid;
        gap: var(--auy-space-md);
        max-inline-size: 480px;
      }

      .error-code {
        font-size: var(--auy-text-5xl);
        font-weight: 800;
        line-height: 1;
        color: var(--auy-color-primary);
        user-select: none;
        font-variant-numeric: tabular-nums;
      }

      .error-message {
        font-size: var(--auy-text-xl);
        font-weight: 600;
        color: var(--auy-color-text);
        margin: 0;
      }

      .error-description {
        font-size: var(--auy-text-base);
        color: var(--auy-color-text-muted);
        line-height: var(--auy-line-height);
        margin: 0;
      }

      .error-actions {
        display: flex;
        gap: var(--auy-space-sm);
        justify-content: center;
        flex-wrap: wrap;
        margin-block-start: var(--auy-space-sm);
      }

      .home-link {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm) var(--auy-space-md);
        background: var(--auy-color-primary);
        color: oklch(100% 0 0);
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        font-weight: 500;
        text-decoration: none;
        touch-action: manipulation;
        transition: filter var(--auy-transition-fast);
      }

      .home-link:hover {
        filter: brightness(1.1);
      }

      .home-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .home-link:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .home-link {
          transition: none;
        }
      }

      @media print {
        :host {
          min-block-size: auto;
          padding: 2rem;
        }
        .home-link {
          display: none;
        }
      }
    }
  `;
	}
	_renderCard() {
		return html`
      <div class="error-wrapper" role="alert">
        <div class="error-code" aria-hidden="true">404</div>
        <h1 class="error-message">${this.message}</h1>
        <p class="error-description">${this.description}</p>
        <div class="error-actions">
          <a class="home-link" href=${this.homeUrl}>${this.homeLabel}</a>
        </div>
      </div>
    `;
	}
	render() {
		return this.standalone ? html`<auy-skeleton title="${this.message}">${this._renderCard()}</auy-skeleton>` : this._renderCard();
	}
};
__decorate([property({ type: String })], AuyError404.prototype, "message", void 0);
__decorate([property({ type: String })], AuyError404.prototype, "description", void 0);
__decorate([property({ type: String })], AuyError404.prototype, "homeUrl", void 0);
__decorate([property({ type: String })], AuyError404.prototype, "homeLabel", void 0);
__decorate([property({ type: Boolean })], AuyError404.prototype, "standalone", void 0);
AuyError404 = __decorate([customElement("auy-error-404")], AuyError404);
//#endregion
//#region src/layouts/error/419.ts
var AuyError419 = class AuyError419 extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.message = "Sessão expirada";
		this.description = "Sua sessão expirou por inatividade. Faça login novamente para continuar.";
		this.loginUrl = "/login";
		this.loginLabel = "Fazer login";
		this.retryLabel = "Atualizar página";
		this.standalone = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: grid;
        place-items: center;
        min-block-size: 60dvh;
        padding: var(--auy-space-lg);
        contain: layout style;
        text-align: center;
      }

      .error-wrapper {
        display: grid;
        gap: var(--auy-space-md);
        max-inline-size: 480px;
      }

      .error-code {
        font-size: var(--auy-text-5xl);
        font-weight: 800;
        line-height: 1;
        color: var(--auy-color-warning);
        user-select: none;
        font-variant-numeric: tabular-nums;
      }

      .error-message {
        font-size: var(--auy-text-xl);
        font-weight: 600;
        color: var(--auy-color-text);
        margin: 0;
      }

      .error-description {
        font-size: var(--auy-text-base);
        color: var(--auy-color-text-muted);
        line-height: var(--auy-line-height);
        margin: 0;
      }

      .error-actions {
        display: flex;
        gap: var(--auy-space-sm);
        justify-content: center;
        flex-wrap: wrap;
        margin-block-start: var(--auy-space-sm);
      }

      .retry-button {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm) var(--auy-space-md);
        background: var(--auy-color-primary);
        color: oklch(100% 0 0);
        border: none;
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        font-weight: 500;
        cursor: pointer;
        touch-action: manipulation;
        transition: filter var(--auy-transition);
      }

      .retry-button:hover {
        filter: brightness(1.1);
      }

      .retry-button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .home-link {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm) var(--auy-space-md);
        background: transparent;
        color: var(--auy-color-text);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        font-weight: 500;
        text-decoration: none;
        touch-action: manipulation;
        transition: background var(--auy-transition);
      }

      .home-link:hover {
        background: color-mix(in oklch, var(--auy-color-text) 6%, transparent);
      }

      .home-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .retry-button:focus-visible,
        .home-link:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .retry-button,
        .home-link {
          transition: none;
        }
      }

      @media print {
        :host {
          min-block-size: auto;
          padding: 2rem;
        }
        .retry-button, .home-link {
          display: none;
        }
      }
    }
  `;
	}
	_handleRetry() {
		location.reload();
	}
	_renderCard() {
		return html`
      <div class="error-wrapper" role="alert">
        <div class="error-code" aria-hidden="true">419</div>
        <h1 class="error-message">${this.message}</h1>
        <p class="error-description">${this.description}</p>
        <div class="error-actions">
          <button class="retry-button" @click=${this._handleRetry}>${this.retryLabel}</button>
          <a class="home-link" href=${this.loginUrl}>${this.loginLabel}</a>
        </div>
      </div>
    `;
	}
	render() {
		return this.standalone ? html`<auy-skeleton title="${this.message}">${this._renderCard()}</auy-skeleton>` : this._renderCard();
	}
};
__decorate([property({ type: String })], AuyError419.prototype, "message", void 0);
__decorate([property({ type: String })], AuyError419.prototype, "description", void 0);
__decorate([property({ type: String })], AuyError419.prototype, "loginUrl", void 0);
__decorate([property({ type: String })], AuyError419.prototype, "loginLabel", void 0);
__decorate([property({ type: String })], AuyError419.prototype, "retryLabel", void 0);
__decorate([property({ type: Boolean })], AuyError419.prototype, "standalone", void 0);
AuyError419 = __decorate([customElement("auy-error-419")], AuyError419);
//#endregion
//#region src/layouts/error/500.ts
var AuyError500 = class AuyError500 extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.message = "Erro interno do servidor";
		this.description = "Ocorreu um erro inesperado. Tente novamente mais tarde.";
		this.homeUrl = "/";
		this.homeLabel = "Voltar ao início";
		this.retryLabel = "Tentar novamente";
		this.standalone = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: grid;
        place-items: center;
        min-block-size: 60dvh;
        padding: var(--auy-space-lg);
        contain: layout style;
        text-align: center;
      }

      .error-wrapper {
        display: grid;
        gap: var(--auy-space-md);
        max-inline-size: 480px;
      }

      .error-code {
        font-size: var(--auy-text-5xl);
        font-weight: 800;
        line-height: 1;
        color: var(--auy-color-error);
        user-select: none;
        font-variant-numeric: tabular-nums;
      }

      .error-message {
        font-size: var(--auy-text-xl);
        font-weight: 600;
        color: var(--auy-color-text);
        margin: 0;
      }

      .error-description {
        font-size: var(--auy-text-base);
        color: var(--auy-color-text-muted);
        line-height: var(--auy-line-height);
        margin: 0;
      }

      .error-actions {
        display: flex;
        gap: var(--auy-space-sm);
        justify-content: center;
        flex-wrap: wrap;
        margin-block-start: var(--auy-space-sm);
      }

      .retry-button {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm) var(--auy-space-md);
        background: var(--auy-color-primary);
        color: oklch(100% 0 0);
        border: none;
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        font-weight: 500;
        cursor: pointer;
        touch-action: manipulation;
        transition: filter var(--auy-transition);
      }

      .retry-button:hover {
        filter: brightness(1.1);
      }

      .retry-button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .home-link {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm) var(--auy-space-md);
        background: transparent;
        color: var(--auy-color-text);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        font-weight: 500;
        text-decoration: none;
        touch-action: manipulation;
        transition: background var(--auy-transition);
      }

      .home-link:hover {
        background: color-mix(in oklch, var(--auy-color-text) 6%, transparent);
      }

      .home-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .retry-button:focus-visible,
        .home-link:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .retry-button,
        .home-link {
          transition: none;
        }
      }

      @media print {
        :host {
          min-block-size: auto;
          padding: 2rem;
        }
        .retry-button, .home-link {
          display: none;
        }
      }
    }
  `;
	}
	_handleRetry() {
		location.reload();
	}
	_renderCard() {
		return html`
      <div class="error-wrapper" role="alert">
        <div class="error-code" aria-hidden="true">500</div>
        <h1 class="error-message">${this.message}</h1>
        <p class="error-description">${this.description}</p>
        <div class="error-actions">
          <button class="retry-button" @click=${this._handleRetry}>${this.retryLabel}</button>
          <a class="home-link" href=${this.homeUrl}>${this.homeLabel}</a>
        </div>
      </div>
    `;
	}
	render() {
		return this.standalone ? html`<auy-skeleton title="${this.message}">${this._renderCard()}</auy-skeleton>` : this._renderCard();
	}
};
__decorate([property({ type: String })], AuyError500.prototype, "message", void 0);
__decorate([property({ type: String })], AuyError500.prototype, "description", void 0);
__decorate([property({ type: String })], AuyError500.prototype, "homeUrl", void 0);
__decorate([property({ type: String })], AuyError500.prototype, "homeLabel", void 0);
__decorate([property({ type: String })], AuyError500.prototype, "retryLabel", void 0);
__decorate([property({ type: Boolean })], AuyError500.prototype, "standalone", void 0);
AuyError500 = __decorate([customElement("auy-error-500")], AuyError500);
//#endregion
//#region src/layouts/error/503.ts
var AuyError503 = class AuyError503 extends AuyLightElement {
	constructor(..._args) {
		super(..._args);
		this.message = "Serviço indisponível";
		this.description = "O sistema está em manutenção. Tente novamente mais tarde.";
		this.homeUrl = "/";
		this.homeLabel = "Verificar disponibilidade";
		this.retryLabel = "Tentar novamente";
		this.standalone = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: grid;
        place-items: center;
        min-block-size: 60dvh;
        padding: var(--auy-space-lg);
        contain: layout style;
        text-align: center;
      }

      .error-wrapper {
        display: grid;
        gap: var(--auy-space-md);
        max-inline-size: 480px;
      }

      .error-code {
        font-size: var(--auy-text-5xl);
        font-weight: 800;
        line-height: 1;
        color: var(--auy-color-info);
        user-select: none;
        font-variant-numeric: tabular-nums;
      }

      .error-message {
        font-size: var(--auy-text-xl);
        font-weight: 600;
        color: var(--auy-color-text);
        margin: 0;
      }

      .error-description {
        font-size: var(--auy-text-base);
        color: var(--auy-color-text-muted);
        line-height: var(--auy-line-height);
        margin: 0;
      }

      .error-actions {
        display: flex;
        gap: var(--auy-space-sm);
        justify-content: center;
        flex-wrap: wrap;
        margin-block-start: var(--auy-space-sm);
      }

      .retry-button {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm) var(--auy-space-md);
        background: var(--auy-color-primary);
        color: oklch(100% 0 0);
        border: none;
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        font-weight: 500;
        cursor: pointer;
        touch-action: manipulation;
        transition: filter var(--auy-transition);
      }

      .retry-button:hover {
        filter: brightness(1.1);
      }

      .retry-button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .home-link {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm) var(--auy-space-md);
        background: transparent;
        color: var(--auy-color-text);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        font-weight: 500;
        text-decoration: none;
        touch-action: manipulation;
        transition: background var(--auy-transition);
      }

      .home-link:hover {
        background: color-mix(in oklch, var(--auy-color-text) 6%, transparent);
      }

      .home-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .retry-button:focus-visible,
        .home-link:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .retry-button,
        .home-link {
          transition: none;
        }
      }

      @media print {
        :host {
          min-block-size: auto;
          padding: 2rem;
        }
        .retry-button, .home-link {
          display: none;
        }
      }
    }
  `;
	}
	_handleRetry() {
		location.reload();
	}
	_renderCard() {
		return html`
      <div class="error-wrapper" role="alert">
        <div class="error-code" aria-hidden="true">503</div>
        <h1 class="error-message">${this.message}</h1>
        <p class="error-description">${this.description}</p>
        <div class="error-actions">
          <button class="retry-button" @click=${this._handleRetry}>${this.retryLabel}</button>
          <a class="home-link" href=${this.homeUrl}>${this.homeLabel}</a>
        </div>
      </div>
    `;
	}
	render() {
		return this.standalone ? html`<auy-skeleton title="${this.message}">${this._renderCard()}</auy-skeleton>` : this._renderCard();
	}
};
__decorate([property({ type: String })], AuyError503.prototype, "message", void 0);
__decorate([property({ type: String })], AuyError503.prototype, "description", void 0);
__decorate([property({ type: String })], AuyError503.prototype, "homeUrl", void 0);
__decorate([property({ type: String })], AuyError503.prototype, "homeLabel", void 0);
__decorate([property({ type: String })], AuyError503.prototype, "retryLabel", void 0);
__decorate([property({ type: Boolean })], AuyError503.prototype, "standalone", void 0);
AuyError503 = __decorate([customElement("auy-error-503")], AuyError503);
//#endregion
export { AuyAdminMainSection as _, AuyError403 as a, AuyAdminSidebar as b, AuyPrintEngine as c, AuyBackToTop as d, AuyCmsLogin as f, AuyAdminBreadcrumb as g, AuyAdminBreadcrumbItem as h, AuyError404 as i, AuySkeleton as l, AuyAdminFooter as m, AuyError500 as n, AuyFooterTransparency as o, AuyCmsLayout as p, AuyError419 as r, AuyAccessibilityBar as s, AuyError503 as t, AuyBanner as u, AuyAdminHeader as v, AuyAdminLayout as x, AuyAdminSidebarItem as y };
