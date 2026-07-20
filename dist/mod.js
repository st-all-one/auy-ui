import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, query, queryAll, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { query as query$1 } from "lit/decorators/query.js";
import { queryAll as queryAll$1 } from "lit/decorators/query-all.js";
import { keyed } from "lit/directives/keyed.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { live } from "lit/directives/live.js";
//#region src/styles/global.ts
var resetStyles = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;
var tokenStyles = css`
  @layer components {
    :host {
      --auy-color-primary: oklch(50% 0.2 250);
      --auy-color-primary-hover: oklch(45% 0.2 250);
      --auy-color-primary-active: oklch(42% 0.22 250);
      --auy-color-primary-focus: oklch(55% 0.25 250 / 0.35);
      --auy-color-primary-inverse: oklch(100% 0 0);
      --auy-color-secondary: oklch(45% 0.03 260);
      --auy-color-secondary-hover: oklch(40% 0.03 260);
      --auy-color-secondary-active: oklch(37% 0.03 260);
      --auy-color-secondary-focus: oklch(45% 0.03 260 / 0.35);
      --auy-color-secondary-inverse: oklch(100% 0 0);
      --auy-color-surface: oklch(98% 0.005 260);
      --auy-color-text: oklch(20% 0.03 260);
      --auy-color-text-muted: oklch(45% 0.03 260);
      --auy-color-border: oklch(0% 0 0 / 0.1);
      --auy-color-error: oklch(55% 0.22 30);
      --auy-color-success: oklch(55% 0.2 145);
      --auy-color-info: oklch(50% 0.2 250);
      --auy-color-overlay: oklch(0% 0 0 / 0.4);
      --auy-radius-sm: 4px;
      --auy-radius-md: 8px;
      --auy-transition: 200ms ease;
    }
  }
`;
var accessibilityStyles = css`
  @layer components {
    :focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.125rem;
    }

    :focus:not(:focus-visible) {
      outline: none;
    }

    .sr-only,
    .sr-only-focusable {
      position: absolute;
      inline-size: 1px;
      block-size: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }

    .sr-only-focusable:focus-within,
    .sr-only-focusable:focus {
      inline-size: auto;
      block-size: auto;
      padding: 0.5rem 1rem;
      margin: 0;
      overflow: visible;
      clip: auto;
      white-space: normal;
      z-index: 1;
      background: var(--auy-color-surface);
      color: var(--auy-color-text);
      border-radius: var(--auy-radius-sm);
      text-decoration: none;
    }

    @media (forced-colors: active) {
      .sr-only-focusable:focus-within,
      .sr-only-focusable:focus {
        border: 2px solid ButtonText;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
var baseStyles = [tokenStyles, accessibilityStyles];
//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/decorate.js
function __decorate(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
}
//#endregion
//#region src/atomics/button.ts
var AuyInternalButton = class AuyInternalButton extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.variant = "primary";
		this.size = "md";
		this.loading = false;
		this.disabled = false;
		this.type = "button";
		this.ariaLabel = null;
		this.ariaExpanded = null;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: inline-block;
      }

      button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-xs, 6px);
        font-family: inherit;
        font-size: var(--auy-text-sm, 0.875rem);
        font-weight: 500;
        line-height: 1.5;
        border-start-start-radius: var(--_radius-start, var(--auy-radius-md, 6px));
        border-start-end-radius: var(--_radius-end, var(--auy-radius-md, 6px));
        border-end-start-radius: var(--_radius-start, var(--auy-radius-md, 6px));
        border-end-end-radius: var(--_radius-end, var(--auy-radius-md, 6px));
        padding: 0.625rem 1rem;
        cursor: pointer;
        transition: background-color var(--auy-transition, 200ms ease),
          border-color var(--auy-transition, 200ms ease),
          color var(--auy-transition, 200ms ease),
          box-shadow var(--auy-transition, 200ms ease);
        user-select: none;
        -webkit-user-select: none;
        -ms-touch-action: manipulation;
        touch-action: manipulation;

        &:where([size='sm']) {
          padding: 0.375rem 0.75rem;
          font-size: var(--auy-text-xs, 0.75rem);
          border-start-start-radius: var(--_radius-start, var(--auy-radius-sm, 4px));
          border-start-end-radius: var(--_radius-end, var(--auy-radius-sm, 4px));
          border-end-start-radius: var(--_radius-start, var(--auy-radius-sm, 4px));
          border-end-end-radius: var(--_radius-end, var(--auy-radius-sm, 4px));
        }

        &:where([size='lg']) {
          padding: 0.75rem 1.5rem;
          font-size: var(--auy-text-base, 1rem);
          border-start-start-radius: var(--_radius-start, var(--auy-radius-lg, 8px));
          border-start-end-radius: var(--_radius-end, var(--auy-radius-lg, 8px));
          border-end-start-radius: var(--_radius-start, var(--auy-radius-lg, 8px));
          border-end-end-radius: var(--_radius-end, var(--auy-radius-lg, 8px));
        }

        &:where([variant='primary']) {
          background-color: var(--auy-color-primary, oklch(50% 0.2 250));
          color: var(--auy-color-primary-inverse, oklch(100% 0 0));

          &:hover {
            background-color: var(--auy-color-primary-hover, oklch(45% 0.2 250));
          }

          &:active {
            background-color: var(--auy-color-primary-active, oklch(42% 0.22 250));
          }
        }

        &:where([variant='secondary']) {
          background-color: transparent;
          color: var(--auy-color-text, oklch(20% 0.03 260));
          border: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));

          &:hover {
            background-color: oklch(0% 0 0 / 0.06);
          }

          &:active {
            background-color: oklch(0% 0 0 / 0.1);
          }
        }

        &:where([variant='ghost']) {
          background-color: transparent;
          color: var(--auy-color-text, oklch(20% 0.03 260));

          &:hover {
            background-color: oklch(0% 0 0 / 0.06);
          }

          &:active {
            background-color: oklch(0% 0 0 / 0.1);
          }
        }

        &:where([variant='danger']) {
          background-color: var(--auy-color-error, oklch(55% 0.22 30));
          color: oklch(100% 0 0);

          &:hover {
            background-color: oklch(50% 0.22 30);
          }

          &:active {
            background-color: oklch(45% 0.22 30);
          }
        }

        &:where([variant='contrast']) {
          background-color: oklch(20% 0.03 260);
          color: oklch(100% 0 0);

          &:hover {
            background-color: oklch(0% 0 0);
          }

          &:active {
            background-color: oklch(15% 0.03 260);
          }
        }

        &:focus-visible {
          outline: none;
          box-shadow: 0 0 0 0.125rem var(--auy-color-primary-focus, oklch(55% 0.25 250 / 0.35));
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        @media (forced-colors: active) {
          border: 1px solid ButtonText;

          &:focus-visible {
            outline: 2px solid Highlight;
            outline-offset: 2px;
            box-shadow: none;
          }

          &:disabled {
            border-color: GrayText;
            color: GrayText;
          }

          .spinner {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          transition: none;

          &:active {
            transform: none;
          }
        }
      }

      .spinner {
        display: inline-flex;
      }
    }
  `;
	}
	render() {
		return html`
      <button
        part="button"
        type=${this.type}
        variant=${this.variant}
        size=${this.size}
        aria-label=${this.ariaLabel || nothing}
        aria-expanded=${this.ariaExpanded || nothing}
        ?disabled=${this.disabled || this.loading}
        ?aria-disabled=${this.loading || nothing}
      >
        ${this.loading ? html`<span class="spinner"><auy-internal-spinner size="14"></auy-internal-spinner></span>` : ""}
        <slot></slot>
      </button>
    `;
	}
};
__decorate([property({ type: String })], AuyInternalButton.prototype, "variant", void 0);
__decorate([property({ type: String })], AuyInternalButton.prototype, "size", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalButton.prototype, "loading", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalButton.prototype, "disabled", void 0);
__decorate([property({ type: String })], AuyInternalButton.prototype, "type", void 0);
__decorate([property({
	type: String,
	attribute: "aria-label"
})], AuyInternalButton.prototype, "ariaLabel", void 0);
__decorate([property({
	type: String,
	attribute: "aria-expanded"
})], AuyInternalButton.prototype, "ariaExpanded", void 0);
AuyInternalButton = __decorate([customElement("auy-internal-button")], AuyInternalButton);
//#endregion
//#region src/atomics/badge.ts
var AuyInternalBadge = class AuyInternalBadge extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.variant = "default";
		this.outline = false;
		this.pill = false;
		this.dot = false;
		this.max = 99;
		this.icon = "";
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.3em;
        padding: 0.25em 0.75em;
        font-size: 0.8125rem;
        font-weight: 600;
        line-height: 1.3;
        border-radius: var(--auy-radius-sm);
        color: oklch(100% 0 0);
        background: var(--auy-color-primary);
        white-space: nowrap;
        user-select: none;
        border: 1px solid transparent;
      }

      .badge--pill {
        border-radius: var(--auy-radius-full);
        padding-inline: 0.8em;
        padding-block: 0.25em;
      }

      .badge--success {
        background: var(--auy-color-success);
      }

      .badge--error {
        background: var(--auy-color-error);
      }

      .badge--warning {
        background: var(--auy-color-warning);
        color: oklch(15% 0.02 260);
      }

      .badge--info {
        background: var(--auy-color-info);
      }

      .badge--neutral {
        background: color-mix(in oklch, var(--auy-color-border) 60%, transparent);
        color: var(--auy-color-text);
      }

      /* Outline variants */
      .badge--outline {
        background: transparent;
        border-color: var(--auy-color-primary);
        color: var(--auy-color-primary);
      }

      .badge--outline.badge--success {
        border-color: var(--auy-color-success);
        color: var(--auy-color-success);
      }

      .badge--outline.badge--error {
        border-color: var(--auy-color-error);
        color: var(--auy-color-error);
      }

      .badge--outline.badge--warning {
        border-color: var(--auy-color-warning);
        color: oklch(45% 0.15 85);
      }

      .badge--outline.badge--info {
        border-color: var(--auy-color-info);
        color: var(--auy-color-info);
      }

      .badge--outline.badge--neutral {
        border-color: var(--auy-color-text-muted);
        color: var(--auy-color-text-muted);
      }

      /* Count badge */
      .badge--count {
        min-inline-size: 1.5em;
        border-radius: var(--auy-radius-full);
        padding: 0.15em 0.4em;
        font-size: 0.75rem;
        font-weight: 700;
        background: var(--auy-color-primary);
        color: oklch(100% 0 0);
      }

      .badge--dot {
        inline-size: 0.625rem;
        block-size: 0.625rem;
        padding: 0;
        border-radius: 50%;
        min-inline-size: 0;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        font-size: 0.9em;
        line-height: 1;
      }

      @media (forced-colors: active) {
        .badge {
          border: 1px solid ButtonText;
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
	render() {
		const isDot = this.dot;
		const rawCount = this.count;
		const isCount = !isDot && rawCount !== void 0 && rawCount !== null;
		const displayCount = isCount ? rawCount > this.max ? `${this.max}+` : `${rawCount}` : null;
		const varCls = !isCount && !isDot && this.variant !== "default" ? `badge--${this.variant}` : "";
		const outlineCls = this.outline ? "badge--outline" : "";
		return html`
      <span part="badge" class=${[
			"badge",
			this.pill || isCount ? "badge--pill" : "",
			isCount ? "badge--count" : "",
			isDot ? "badge--dot" : "",
			varCls,
			outlineCls
		].filter(Boolean).join(" ")} role="status">
        ${isDot ? nothing : isCount ? html`${displayCount}` : html`
          ${this.icon ? html`<span part="icon" class="icon">${this.icon}</span>` : nothing}
          <slot></slot>
        `}
      </span>
    `;
	}
};
__decorate([property({ type: String })], AuyInternalBadge.prototype, "variant", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalBadge.prototype, "outline", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalBadge.prototype, "pill", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalBadge.prototype, "dot", void 0);
__decorate([property({ type: Number })], AuyInternalBadge.prototype, "count", void 0);
__decorate([property({ type: Number })], AuyInternalBadge.prototype, "max", void 0);
__decorate([property({ type: String })], AuyInternalBadge.prototype, "icon", void 0);
AuyInternalBadge = __decorate([customElement("auy-internal-badge")], AuyInternalBadge);
//#endregion
//#region src/atomics/spinner.ts
var AuyInternalSpinner = class AuyInternalSpinner extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.size = 24;
		this.color = "var(--auy-color-primary)";
		this.speed = .8;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: inline-flex;
        contain: layout style;
      }

      .spinner {
        inline-size: var(--spinner-size, 24px);
        block-size: var(--spinner-size, 24px);
        border-radius: 50%;
        border: calc(var(--spinner-size, 24px) * 0.1) solid color-mix(in oklch, var(--auy-color-primary, currentColor) 20%, transparent);
        border-top-color: var(--auy-color-primary, currentColor);
        animation: spin var(--spinner-speed, 0.8s) linear infinite;
      }

      @keyframes spin {
        to {
          rotate: 360deg;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .spinner {
          animation-duration: 0s;
        }
      }
    }
  `;
	}
	render() {
		const borderWidth = Math.max(1, Math.round(this.size * .1));
		return html`
      <div
        class="spinner"
        part="spinner"
        role="status"
        aria-label="Carregando"
        style="--spinner-size: ${this.size}px; --spinner-speed: ${this.speed}s; border-width: ${borderWidth}px; border-color: color-mix(in oklch, ${this.color} 20%, transparent); border-top-color: ${this.color};"
      ></div>
    `;
	}
};
__decorate([property({ type: Number })], AuyInternalSpinner.prototype, "size", void 0);
__decorate([property({ type: String })], AuyInternalSpinner.prototype, "color", void 0);
__decorate([property({ type: Number })], AuyInternalSpinner.prototype, "speed", void 0);
AuyInternalSpinner = __decorate([customElement("auy-internal-spinner")], AuyInternalSpinner);
//#endregion
//#region src/atomics/card.ts
var AuyInternalCard = class AuyInternalCard extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.variant = "default";
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .card {
        display: grid;
        grid-template-rows: auto 1fr;
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        overflow: hidden;
      }

      .variant-elevated {
        box-shadow: var(--auy-shadow-sm);
      }

      .variant-outlined {
        border: 1px solid var(--auy-border-color, currentColor);
      }

      slot[name="media"] {
        grid-row: 1;
      }

      slot[name="media"]::slotted(*) {
        display: block;
        inline-size: 100%;
      }

      .body {
        grid-row: 2;
        display: flex;
        flex-direction: column;
        gap: var(--auy-space-md);
        padding: var(--auy-space-md);
      }

      .card-link {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      .card-link:hover {
        scale: 1.02;
        transform-origin: center center;
      }

      .card-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .card-link {
          border: 1px solid ButtonText;
        }
      }

      @media (prefers-reduced-motion: no-preference) {
        .card-link {
          transition: scale var(--auy-transition, 200ms ease);
        }
      }

      @media print {
        .card {
          break-inside: avoid;
        }

        .card-link::after {
          content: " (" attr(href) ")";
          font-size: 0.8em;
          opacity: 0.7;
        }
      }
    }
  `;
	}
	render() {
		const classes = {
			card: true,
			"card-link": !!this.href,
			"variant-elevated": this.variant === "elevated",
			"variant-outlined": this.variant === "outlined"
		};
		const content = html`
      <slot name="media" part="media"></slot>
      <div class="body" part="body">
        <slot name="title" part="title"></slot>
        <slot name="description" part="description"></slot>
        <slot></slot>
        <slot name="footer" part="footer"></slot>
      </div>
    `;
		if (this.href) return html`
        <a
          href=${this.href}
          class=${classMap(classes)}
          part="card"
        >
          ${content}
        </a>
      `;
		return html`
      <div class=${classMap(classes)} part="card">
        ${content}
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyInternalCard.prototype, "variant", void 0);
__decorate([property({ type: String })], AuyInternalCard.prototype, "href", void 0);
AuyInternalCard = __decorate([customElement("auy-internal-card")], AuyInternalCard);
//#endregion
//#region \0@oxc-project+runtime@0.139.0/helpers/esm/taggedTemplateLiteral.js
function _taggedTemplateLiteral(e, t) {
	return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
//#endregion
//#region src/atomics/breadcrumb.ts
var _templateObject;
var AuyInternalBreadcrumb = class AuyInternalBreadcrumb extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.crumbs = [];
		this.generateJsonLd = true;
		this.showHomeIcon = true;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      nav {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        container-type: inline-size;
        padding-block: var(--auy-space-2xs);
      }

      ol {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
        gap: 0;
      }

      li {
        display: flex;
        align-items: center;
      }

      .separator {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-inline: var(--auy-space-2xs);
        color: var(--auy-color-border);
        flex-shrink: 0;
        line-height: 0;
      }

      .separator svg {
        inline-size: 0.875rem;
        block-size: 0.875rem;
      }

      a {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-2xs);
        color: var(--auy-color-text-muted);
        text-decoration: none;
        padding: var(--auy-space-2xs) var(--auy-space-xs);
        border-radius: var(--auy-radius-sm);
        transition: background var(--auy-transition-fast), color var(--auy-transition-fast);
        white-space: nowrap;
        touch-action: manipulation;
        font-weight: 450;
      }

      a:hover {
        background: color-mix(in oklch, var(--auy-color-border) 20%, transparent);
        color: var(--auy-color-text);
        text-decoration: none;
      }

      a:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.0625rem;
      }

      a home-icon {
        display: inline-flex;
        align-items: center;
        color: var(--auy-color-text-muted);
      }

      a:hover home-icon {
        color: var(--auy-color-primary);
      }

      .current {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-2xs);
        padding: var(--auy-space-2xs) var(--auy-space-xs);
        color: var(--auy-color-text);
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-inline-size: 20ch;
      }

      .current icon {
        display: inline-flex;
        align-items: center;
        color: var(--auy-color-primary);
        flex-shrink: 0;
      }

      @container (max-width: 400px) {
        li:not(:last-of-type) .label {
          max-inline-size: 10ch;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }

      @media (forced-colors: active) {
        a {
          border: 1px solid transparent;
        }
        a:hover {
          border-color: ButtonText;
        }
        a:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media print {
        nav {
          display: flex;
        }
      }
    }
  `;
	}
	_jsonLdScript() {
		if (!this.generateJsonLd || this.crumbs.length === 0) return nothing;
		const json = {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			itemListElement: this.crumbs.map((crumb, i) => ({
				"@type": "ListItem",
				position: i + 1,
				name: crumb.label,
				...crumb.href ? { item: crumb.href } : {}
			}))
		};
		return html(_templateObject || (_templateObject = _taggedTemplateLiteral(["<script type=\"application/ld+json\">", "<\/script>"])), JSON.stringify(json));
	}
	_chevron() {
		return html`
      <span class="separator" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </span>
    `;
	}
	_renderLabel(crumb, i) {
		if (i === 0 && this.showHomeIcon && crumb.href === "/") return html`
        <span class="home-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="inline-size:1em;block-size:1em;">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </span>
      `;
		return html`
      ${crumb.icon ? html`<span aria-hidden="true">${crumb.icon}</span>` : nothing}
      <span class="label">${crumb.label}</span>
    `;
	}
	render() {
		return html`
      <nav aria-label="Breadcrumb">
        <ol>
          ${this.crumbs.length > 0 ? this.crumbs.map((crumb, i) => html`
                  ${i > 0 ? this._chevron() : nothing}
                  <li>
                    ${crumb.href ? html`
                          <a href=${crumb.href} aria-label=${i === 0 && this.showHomeIcon && crumb.href === "/" ? "Início" : nothing}>
                            ${this._renderLabel(crumb, i)}
                          </a>
                        ` : html`
                          <span class="current" aria-current="page">
                            ${this._renderLabel(crumb, i)}
                          </span>
                        `}
                  </li>
                `) : html`<li><slot></slot></li>`}
        </ol>
        ${this._jsonLdScript()}
      </nav>
    `;
	}
};
__decorate([property({ type: Array })], AuyInternalBreadcrumb.prototype, "crumbs", void 0);
__decorate([property({ type: Boolean })], AuyInternalBreadcrumb.prototype, "generateJsonLd", void 0);
__decorate([property({ type: Boolean })], AuyInternalBreadcrumb.prototype, "showHomeIcon", void 0);
AuyInternalBreadcrumb = __decorate([customElement("auy-internal-breadcrumb")], AuyInternalBreadcrumb);
//#endregion
//#region src/atomics/tooltip.ts
var AuyInternalTooltip = class AuyInternalTooltip extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.text = "";
		this.position = "top";
		this.visible = false;
		this._hideTimer = null;
		this._show = () => {
			if (this._hideTimer) clearTimeout(this._hideTimer);
			this.visible = true;
		};
		this._hide = () => {
			this._hideTimer = setTimeout(() => {
				this.visible = false;
			}, 150);
		};
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        position: relative;
        display: inline-block;
      }

      .tooltip {
        position: absolute;
        z-index: 1;
        inset-block-end: calc(100% + 0.375rem);
        inset-inline-start: 50%;
        translate: -50% 0;
        padding: var(--auy-space-xs) var(--auy-space-sm);
        font-size: var(--auy-text-xs);
        font-weight: 500;
        line-height: 1.3;
        white-space: nowrap;
        border-radius: var(--auy-radius-sm);
        background: oklch(20% 0.03 260);
        color: oklch(95% 0 0);
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--auy-transition, 200ms) ease, visibility 0s linear 0.2s;
        visibility: hidden;
      }

      .tooltip--visible {
        opacity: 1;
        visibility: visible;
        transition: opacity var(--auy-transition, 200ms) ease, visibility 0s linear 0s;
      }

      .tooltip--bottom {
        inset-block-end: auto;
        inset-block-start: calc(100% + 0.375rem);
      }

      .tooltip--left {
        inset-block-end: auto;
        inset-block-start: 50%;
        inset-inline-end: calc(100% + 0.375rem);
        inset-inline-start: auto;
        translate: 0 -50%;
      }

      .tooltip--right {
        inset-block-end: auto;
        inset-block-start: 50%;
        inset-inline-start: calc(100% + 0.375rem);
        translate: 0 -50%;
      }

      @media (prefers-reduced-motion: reduce) {
        .tooltip {
          transition: none;
        }
      }

      @media print {
        .tooltip {
          display: none;
        }
      }
    }
  `;
	}
	render() {
		const cls = `tooltip ${this.visible ? "tooltip--visible" : ""} ${this.position === "bottom" ? "tooltip--bottom" : this.position === "left" ? "tooltip--left" : this.position === "right" ? "tooltip--right" : ""}`;
		return html`
      <span part="trigger" @mouseenter=${this._show} @mouseleave=${this._hide} @focusin=${this._show} @focusout=${this._hide} style="display:inline-flex">
        <slot></slot>
      </span>
      <span part="tooltip" class=${cls} role="tooltip">${this.text}</span>
    `;
	}
};
__decorate([property({ type: String })], AuyInternalTooltip.prototype, "text", void 0);
__decorate([property({ type: String })], AuyInternalTooltip.prototype, "position", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalTooltip.prototype, "visible", void 0);
AuyInternalTooltip = __decorate([customElement("auy-internal-tooltip")], AuyInternalTooltip);
//#endregion
//#region src/atomics/modal.ts
var AuyInternalModal = class AuyInternalModal extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.open = false;
		this._lastFocused = null;
		this._boundCloseHandler = null;
		this._handleKeyDown = (e) => {
			if (e.key !== "Tab" || !this.open) return;
			const dialog = this._dialog;
			if (!dialog) return;
			const focusable = dialog.querySelectorAll("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
			if (focusable.length === 0) return;
			const first = focusable[0];
			const last = focusable[focusable.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
        color-scheme: light dark;
      }

      dialog {
        padding: 0;
        border: none;
        border-radius: var(--auy-radius-lg);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-lg);
        max-inline-size: 32rem;
        inline-size: 100%;
        max-block-size: 85dvh;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        opacity: 0;
        transform: scale(0.95);
        transition: opacity var(--auy-transition, 200ms ease), transform var(--auy-transition, 200ms ease), overlay var(--auy-transition, 200ms ease) allow-discrete, display var(--auy-transition, 200ms ease) allow-discrete;
      }

      dialog[open] {
        opacity: 1;
        transform: scale(1);
      }

      @starting-style {
        dialog[open] {
          opacity: 0;
          transform: scale(0.95);
        }
      }

      dialog::backdrop {
        background: var(--auy-color-overlay, oklch(0% 0 0 / 0.4));
        backdrop-filter: blur(4px);
        transition: background-color var(--auy-transition, 200ms ease), backdrop-filter var(--auy-transition, 200ms ease);
      }

      @starting-style {
        dialog::backdrop {
          background-color: transparent;
          backdrop-filter: blur(0px);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        dialog {
          transition: none;
        }

        dialog::backdrop {
          transition: none;
        }
      }

      @media (forced-colors: active) {
        dialog {
          border: 1px solid CanvasText;
        }

        .close-button {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        dialog::backdrop {
          background-color: transparent;
          backdrop-filter: none;
        }

        .close-button {
          display: none;
        }
      }

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--auy-space-md);
        padding: var(--auy-space-md);
        padding-block-end: 0;
      }

      .close-button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 2rem;
        block-size: 2rem;
        border-radius: var(--auy-radius-lg);
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
        color: inherit;
        flex-shrink: 0;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      .close-button:hover {
        background: color-mix(in srgb, currentColor 10%, transparent);
      }

      .close-button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .body {
        padding: var(--auy-space-md);
      }

      .footer {
        padding: var(--auy-space-md);
        padding-block-start: 0;
        display: flex;
        justify-content: flex-end;
        gap: var(--auy-space-md);
      }
    }
  `;
	}
	updated(changed) {
		if (changed.has("open")) {
			if (!this._dialog) return;
			if (this.open) {
				this._dialog.showModal();
				this._focusTrap();
				this.dispatchEvent(new CustomEvent("open", { bubbles: true }));
			} else this._dialog.close();
		}
	}
	firstUpdated() {
		this._boundCloseHandler = () => {
			if (this.open) {
				this.open = false;
				this.dispatchEvent(new CustomEvent("close", { bubbles: true }));
			}
		};
		this._dialog?.addEventListener("close", this._boundCloseHandler);
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window !== "undefined") document.addEventListener("keydown", this._handleKeyDown);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (typeof window !== "undefined") document.removeEventListener("keydown", this._handleKeyDown);
		if (this._boundCloseHandler) {
			this._dialog?.removeEventListener("close", this._boundCloseHandler);
			this._boundCloseHandler = null;
		}
	}
	_focusTrap() {
		if (!this._dialog) return;
		const focusable = this._dialog.querySelector("button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])");
		if (this._closeButton) this._closeButton.focus();
		else if (focusable) focusable.focus();
	}
	_handleDialogClick(e) {
		if (e.target === this._dialog) this.open = false;
	}
	show() {
		this._lastFocused = document.activeElement;
		this.open = true;
	}
	close() {
		this.open = false;
		this._lastFocused?.focus();
		this._lastFocused = null;
	}
	render() {
		return html`
      <dialog id="dialog" part="dialog" class=${classMap({
			modal: true,
			open: this.open,
			closed: !this.open
		})} aria-labelledby="title-slot" @click=${this._handleDialogClick}>
        <div part="header" class="header">
          <slot name="title" part="title" id="title-slot"></slot>
          <button part="close-button" class="close-button" aria-label="Fechar" @click=${() => {
			this.open = false;
		}}>
            ✕
          </button>
        </div>
        <div part="body" class="body">
          <slot></slot>
        </div>
        <div part="footer" class="footer">
          <slot name="actions"></slot>
        </div>
      </dialog>
    `;
	}
};
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalModal.prototype, "open", void 0);
__decorate([query$1("#dialog")], AuyInternalModal.prototype, "_dialog", void 0);
__decorate([query$1(".close-button")], AuyInternalModal.prototype, "_closeButton", void 0);
AuyInternalModal = __decorate([customElement("auy-internal-modal")], AuyInternalModal);
//#endregion
//#region src/atomics/table.ts
var AuyInternalTable = class AuyInternalTable extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.columns = [];
		this.rows = [];
		this.selectable = false;
		this.theme = "light";
		this._computedColumns = [];
		this._computedGridCols = "";
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
      }

      [part="table"] {
        display: grid;
        grid-template-columns: var(--grid-cols);
        border: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: var(--auy-radius-md, 6px);
        background: var(--auy-color-surface, oklch(100% 0 0));
        color: var(--auy-color-text, oklch(20% 0.03 260));
        overflow: auto;
        overscroll-behavior: contain;
      }

      [role="rowgroup"] {
        display: contents;
      }

      [part="header"] {
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: subgrid;
        position: sticky;
        inset-block-start: 0;
        z-index: 1;
        background: oklch(97% 0.003 260);
        border-block-end: 2px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
      }

      :host([theme="dark"]) [part="header"] {
        background: oklch(20% 0.02 260);
      }

      [part="row"] {
        display: grid;
        grid-column: 1 / -1;
        grid-template-columns: subgrid;
        transition: background-color var(--auy-transition, 200ms) ease;
      }

      [part="row"]:hover {
        background-color: oklch(96% 0.005 260);
      }

      :host([theme="dark"]) [part="row"]:hover {
        background-color: oklch(22% 0.02 260);
      }

      [part="row"]:nth-child(even) {
        background-color: oklch(98% 0.003 260);
      }

      :host([theme="dark"]) [part="row"]:nth-child(even) {
        background-color: oklch(17% 0.015 260);
      }

      [part="row"]:nth-child(even):hover {
        background-color: oklch(95% 0.005 260);
      }

      :host([theme="dark"]) [part="row"]:nth-child(even):hover {
        background-color: oklch(24% 0.02 260);
      }

      [role="columnheader"] {
        padding: 0.625rem 1rem;
        font-size: 0.6875rem;
        font-weight: 600;
        color: var(--auy-color-text-muted, oklch(45% 0.03 260));
        text-transform: uppercase;
        letter-spacing: 0.06em;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        user-select: none;
      }

      [role="cell"] {
        padding: 0.625rem 1rem;
        font-size: var(--auy-text-sm, 0.875rem);
        line-height: 1.5;
        color: var(--auy-color-text, oklch(20% 0.03 260));
        overflow: hidden;
        text-overflow: ellipsis;
      }

      [role="row"]:not([part="header"]) {
        border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.08));
      }

      [role="row"]:last-child {
        border-block-end: none;
      }

      @container (max-width: 600px) {
        [part="table"] {
          display: block;
        }

        [part="header"] {
          display: none;
        }

        [part="row"] {
          display: flex;
          flex-direction: column;
          padding: 0.5rem 0;
          border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        }

        [role="cell"] {
          display: flex;
          padding: 0.25rem 1rem;
          border-block-end: none;
        }

        [role="cell"]::before {
          content: attr(data-label);
          font-weight: 600;
          color: var(--auy-color-text-muted, oklch(45% 0.03 260));
          font-size: var(--auy-text-xs, 0.75rem);
          min-inline-size: 7.5rem;
          flex-shrink: 0;
        }
      }

      input[type="checkbox"] {
        accent-color: var(--auy-color-primary, oklch(50% 0.2 250));
        -ms-touch-action: manipulation;
        touch-action: manipulation;
        margin: 0;
        display: block;
      }

      input[type="checkbox"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        [part="table"] {
          border: 1px solid CanvasText;
        }
        [role="row"]:not([part="header"]) {
          border-block-end: 1px solid CanvasText;
        }
      }

      @media print {
        [part="header"] {
          position: static;
          border-block-end: 2px solid #000;
        }
        [part="row"] {
          break-inside: avoid;
        }
        [part="row"]:hover {
          background-color: transparent;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [part="row"] {
          transition: none;
        }
      }
    }
  `;
	}
	willUpdate(changed) {
		if (changed.has("selectable") || changed.has("columns")) {
			this._computedColumns = this.selectable ? [{
				label: "",
				key: "__select__"
			}, ...this.columns] : this.columns;
			this._computedGridCols = this.selectable ? `48px repeat(${this.columns.length}, 1fr)` : `repeat(${this.columns.length}, 1fr)`;
		}
	}
	_onSelectAll(e) {
		const checked = e.target.checked;
		Array.from(this._rows).filter((row) => row.getAttribute("part") !== "header").flatMap((row) => Array.from(row.querySelectorAll("input[type=\"checkbox\"]"))).forEach((cb) => cb.checked = checked);
		this.dispatchEvent(new CustomEvent("select-all", { detail: { checked } }));
	}
	_onSelect(e) {
		const target = e.target;
		const rowIndex = Number(target.dataset.index);
		const checked = target.checked;
		this.dispatchEvent(new CustomEvent("select", { detail: {
			index: rowIndex,
			checked,
			row: this.rows[rowIndex]
		} }));
	}
	render() {
		const cols = this._computedColumns;
		return html`
      <div part="table" role="table" style="--grid-cols: ${this._computedGridCols}">
        <div role="rowgroup">
          <div role="row" part="header">
            ${cols.map((col) => html`
                <div role="columnheader" part="cell">
                  ${col.key === "__select__" ? html`<input type="checkbox" @change=${this._onSelectAll} />` : col.label}
                </div>
              `)}
          </div>
        </div>
        <div role="rowgroup">
          ${keyed(this.rows, this.rows.map((row, rowIndex) => html`
              <div role="row" part="row">
                ${cols.map((col) => html`
                    <div
                      role="cell"
                      part="cell"
                      data-label=${col.key !== "__select__" ? col.label : nothing}
                    >
                      ${col.key === "__select__" ? html`<input
                            type="checkbox"
                            data-index=${rowIndex}
                            @change=${this._onSelect}
                          />` : row[col.key] ?? nothing}
                    </div>
                  `)}
              </div>
            `))}
        </div>
      </div>
    `;
	}
};
__decorate([property({ type: Array })], AuyInternalTable.prototype, "columns", void 0);
__decorate([property({ type: Array })], AuyInternalTable.prototype, "rows", void 0);
__decorate([property({ type: Boolean })], AuyInternalTable.prototype, "selectable", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyInternalTable.prototype, "theme", void 0);
__decorate([state()], AuyInternalTable.prototype, "_computedColumns", void 0);
__decorate([state()], AuyInternalTable.prototype, "_computedGridCols", void 0);
__decorate([queryAll$1("[role=\"row\"]")], AuyInternalTable.prototype, "_rows", void 0);
AuyInternalTable = __decorate([customElement("auy-internal-table")], AuyInternalTable);
//#endregion
//#region src/atomics/toast.ts
var AuyInternalToast = class AuyInternalToast extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.variant = "info";
		this.open = false;
		this.duration = 4e3;
		this.dismissible = true;
		this._timer = null;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .toast {
        display: none;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
        transform: translateX(100%);
        opacity: 0;
        transition: display var(--auy-transition-base) allow-discrete,
                    transform var(--auy-transition-base),
                    opacity var(--auy-transition-base);
      }

      .toast--open {
        display: flex;
        transform: translateX(0);
        opacity: 1;
      }

      @starting-style {
        .toast--open {
          transform: translateX(100%);
          opacity: 0;
        }
      }

      .icon {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        inline-size: 1.25em;
        block-size: 1.25em;
      }

      .icon svg {
        inline-size: 100%;
        block-size: 100%;
        fill: currentColor;
      }

      .message {
        flex: 1;
        min-inline-size: 0;
      }

      .dismiss {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        inline-size: 1.5em;
        block-size: 1.5em;
        padding: 0;
        border: none;
        border-radius: var(--auy-radius-sm);
        background: transparent;
        color: inherit;
        cursor: pointer;
        font-size: 1.2em;
        line-height: 1;
        opacity: 0.7;
        transition: opacity var(--auy-transition-fast);
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      .dismiss:hover {
        opacity: 1;
      }

      .dismiss:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .toast--info {
        border-inline-start: 3px solid var(--auy-color-info);
      }

      .toast--success {
        border-inline-start: 3px solid var(--auy-color-success);
      }

      .toast--error {
        border-inline-start: 3px solid var(--auy-color-error);
      }

      .toast--warning {
        border-inline-start: 3px solid var(--auy-color-warning);
      }

      @media (prefers-reduced-motion: reduce) {
        .toast {
          transition: none;
        }
      }

      @media (forced-colors: active) {
        .toast {
          border: 1px solid CanvasText;
        }

        .dismiss {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        .toast {
          display: flex !important;
          transform: none !important;
          opacity: 1 !important;
        }
      }
    }
  `;
	}
	_startTimer() {
		this._clearTimer();
		if (this.open && this.duration > 0 && typeof window !== "undefined") this._timer = window.setTimeout(() => {
			this.open = false;
		}, this.duration);
	}
	_clearTimer() {
		if (this._timer !== null) {
			clearTimeout(this._timer);
			this._timer = null;
		}
	}
	_dispatchShow() {
		this.dispatchEvent(new CustomEvent("show", {
			bubbles: true,
			composed: true
		}));
	}
	_dispatchHide() {
		this.dispatchEvent(new CustomEvent("hide", {
			bubbles: true,
			composed: true
		}));
	}
	_dismiss() {
		this.open = false;
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.open) this._startTimer();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this._clearTimer();
	}
	shouldUpdate(changed) {
		if (changed.has("variant") || changed.has("dismissible")) return this.open;
		return true;
	}
	updated(changedProperties) {
		if (changedProperties.has("open")) if (this.open) {
			this._startTimer();
			this._dispatchShow();
		} else {
			this._clearTimer();
			this._dispatchHide();
		}
		if (changedProperties.has("duration") && this.open) this._startTimer();
	}
	render() {
		return html`
      <div
        part="toast"
        class=${classMap({
			toast: true,
			"toast--open": this.open,
			[`toast--${this.variant}`]: true
		})}
        role="alert"
        aria-live="polite"
      >
        <span part="icon" class="icon">
          <slot name="icon">
            ${this._renderIcon()}
          </slot>
        </span>
        <span part="message" class="message">
          <slot></slot>
        </span>
        ${this.dismissible ? html`<button part="dismiss" class="dismiss" aria-label="Fechar" @click=${this._dismiss}>&times;</button>` : ""}
      </div>
    `;
	}
	_renderIcon() {
		switch (this.variant) {
			case "success": return html`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`;
			case "error": return html`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`;
			case "warning": return html`<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`;
			default: return html`<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15v-2h2v2zm2-4h-2V7h2v6z"/></svg>`;
		}
	}
};
__decorate([property({ type: String })], AuyInternalToast.prototype, "variant", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalToast.prototype, "open", void 0);
__decorate([property({ type: Number })], AuyInternalToast.prototype, "duration", void 0);
__decorate([property({ type: Boolean })], AuyInternalToast.prototype, "dismissible", void 0);
AuyInternalToast = __decorate([customElement("auy-internal-toast")], AuyInternalToast);
//#endregion
//#region src/atomics/tabs.ts
var AuyInternalTabs = class AuyInternalTabs extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.tabs = [];
		this.activeTab = "";
		this.orientation = "horizontal";
		this._handleTabClick = (e) => {
			const idx = Number(e.currentTarget.dataset.index);
			this._selectTab(this.tabs[idx].id);
		};
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      :host([orientation='vertical']) {
        display: flex;
        flex-direction: row;
      }

      [part='tabs'] {
        display: flex;
        position: relative;
        gap: var(--auy-space-xs, 6px);
        border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
      }

      :host([orientation='vertical']) [part='tabs'] {
        flex-direction: column;
        border-block-end: none;
        border-inline-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        gap: 0;
      }

      [part='tab'] {
        all: unset;
        box-sizing: border-box;
        padding: var(--auy-space-sm, 8px) var(--auy-space-md, 16px);
        font-family: inherit;
        font-size: var(--auy-text-sm, 0.875rem);
        color: var(--auy-color-text-muted, oklch(45% 0.03 260));
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        white-space: nowrap;
        transition: color var(--auy-transition-fast, 150ms) ease;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      [part='tab']:hover {
        color: var(--auy-color-text, oklch(20% 0.03 260));
      }

      [part='tab'][aria-selected='true'] {
        color: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      [part='tab']:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        [part='tab'] {
          border: 1px solid ButtonText;
        }
      }

      [part='indicator'] {
        position: absolute;
        inset-block-end: 0;
        inset-inline-start: 0;
        block-size: 2px;
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        transition: transform var(--auy-transition-slow, 250ms) ease,
          inline-size var(--auy-transition-slow, 250ms) ease;
        will-change: transform, inline-size;
      }

      :host([orientation='vertical']) [part='indicator'] {
        inset-block-end: auto;
        inset-inline-end: 0;
        inset-block-start: 0;
        inset-inline-start: auto;
        inline-size: 2px;
        block-size: 0;
        transition: transform var(--auy-transition-slow, 250ms) ease,
          block-size var(--auy-transition-slow, 250ms) ease;
      }

      [part='panel'] {
        padding: var(--auy-space-md, 16px);
      }

      [part='panel'][aria-hidden='true'] {
        display: none;
      }

      :host([orientation='vertical']) [part='panel'] {
        flex: 1;
      }

      @media print {
        [part='panel'] {
          display: block !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [part='indicator'] {
          transition: none;
        }
      }
    }
  `;
	}
	_selectedId() {
		if (this.activeTab && this.tabs.some((t) => t.id === this.activeTab)) return this.activeTab;
		return this.tabs[0]?.id ?? "";
	}
	_selectTab(id) {
		if (id === this.activeTab) return;
		this.activeTab = id;
		this.dispatchEvent(new CustomEvent("tab-change", {
			detail: { id },
			bubbles: true,
			composed: true
		}));
	}
	_positionIndicator() {
		if (!this._indicator || !this._tabButtons.length) return;
		const activeId = this._selectedId();
		const activeEl = Array.from(this._tabButtons).find((el) => el.dataset.tabId === activeId);
		if (!activeEl) {
			this._indicator.style.transform = "";
			this._indicator.style.width = "";
			this._indicator.style.height = "";
			return;
		}
		if (this.orientation === "horizontal") {
			this._indicator.style.transform = `translateX(${activeEl.offsetLeft}px)`;
			this._indicator.style.width = `${activeEl.offsetWidth}px`;
		} else {
			this._indicator.style.transform = `translateY(${activeEl.offsetTop}px)`;
			this._indicator.style.height = `${activeEl.offsetHeight}px`;
		}
	}
	_onKeyDown(e) {
		if (!this.tabs.length) return;
		const idx = this.tabs.findIndex((t) => t.id === this._selectedId());
		let next = idx;
		switch (e.key) {
			case "ArrowRight":
				if (this.orientation === "horizontal") next = (idx + 1) % this.tabs.length;
				break;
			case "ArrowLeft":
				if (this.orientation === "horizontal") next = (idx - 1 + this.tabs.length) % this.tabs.length;
				break;
			case "ArrowDown":
				if (this.orientation === "vertical") next = (idx + 1) % this.tabs.length;
				break;
			case "ArrowUp":
				if (this.orientation === "vertical") next = (idx - 1 + this.tabs.length) % this.tabs.length;
				break;
			case "Home":
				next = 0;
				break;
			case "End":
				next = this.tabs.length - 1;
				break;
			default: return;
		}
		e.preventDefault();
		const el = this._tabButtons[next];
		if (el) el.focus();
		this._selectTab(this.tabs[next].id);
	}
	willUpdate(changed) {
		if (changed.has("tabs")) {
			if (!this.tabs.some((t) => t.id === this.activeTab) && this.tabs.length > 0) this.activeTab = this.tabs[0].id;
		}
	}
	firstUpdated() {
		this._positionIndicator();
	}
	updated(changed) {
		if (changed.has("activeTab") || changed.has("tabs") || changed.has("orientation")) this.updateComplete.then(() => this._positionIndicator());
	}
	render() {
		if (this.tabs.length > 0) {
			const activeId = this._selectedId();
			return html`
        <div part="tabs" role="tablist" @keydown=${this._onKeyDown}>
          ${keyed(this.tabs, this.tabs.map((tab, i) => {
				const isActive = tab.id === activeId;
				return html`
              <button
                part="tab"
                role="tab"
                id="tab-${tab.id}"
                data-tab-id=${tab.id}
                data-index="${i}"
                aria-selected=${isActive ? "true" : "false"}
                aria-controls="panel-${tab.id}"
                tabindex=${isActive ? "0" : "-1"}
                @click=${this._handleTabClick}
              >${tab.label}</button>
            `;
			}))}
          <div part="indicator"></div>
        </div>
        ${keyed(this.tabs, this.tabs.map((tab) => {
				const isActive = tab.id === activeId;
				return html`
            <div
              part="panel"
              role="tabpanel"
              id="panel-${tab.id}"
              aria-labelledby="tab-${tab.id}"
              aria-hidden=${isActive ? "false" : "true"}
            ><slot name="panel-${tab.id}"></slot></div>
          `;
			}))}
      `;
		}
		return html`
      <div part="tabs" role="tablist">
        <slot name="tab"></slot>
        <div part="indicator"></div>
      </div>
      <slot name="panel"></slot>
    `;
	}
};
__decorate([property({ type: Array })], AuyInternalTabs.prototype, "tabs", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyInternalTabs.prototype, "activeTab", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyInternalTabs.prototype, "orientation", void 0);
__decorate([query("[part=\"indicator\"]")], AuyInternalTabs.prototype, "_indicator", void 0);
__decorate([queryAll("[part=\"tab\"]")], AuyInternalTabs.prototype, "_tabButtons", void 0);
AuyInternalTabs = __decorate([customElement("auy-internal-tabs")], AuyInternalTabs);
//#endregion
//#region src/utils/format.ts
/**
* Formats a date using Intl.DateTimeFormat.
*
* @example formatDate('2024-03-15') // "15/03/2024"
* @example formatDate(new Date(), 'en-US') // "3/15/2024"
*/
function formatDate(date, locale = "pt-BR") {
	if (!date) return "";
	try {
		return new Intl.DateTimeFormat(locale).format(new Date(date));
	} catch {
		return "";
	}
}
/**
* Formats a number as currency using Intl.NumberFormat.
*
* @example formatCurrency(1500.5) // "R$ 1.500,50"
* @example formatCurrency(99.99, 'USD', 'en-US') // "$99.99"
*/
function formatCurrency(value, currency = "BRL", locale = "pt-BR") {
	if (typeof value !== "number" || isNaN(value)) return "";
	return new Intl.NumberFormat(locale, {
		style: "currency",
		currency
	}).format(value);
}
/**
* Formats a number with thousand separators using Intl.NumberFormat.
*
* @example formatNumber(1234567.89) // "1.234.567,89"
* @example formatNumber(1000000, 'en-US') // "1,000,000"
*/
function formatNumber(value, locale = "pt-BR") {
	if (typeof value !== "number" || isNaN(value)) return "";
	return new Intl.NumberFormat(locale).format(value);
}
var RELATIVE_UNITS = [
	{
		unit: "year",
		ms: 31536e6
	},
	{
		unit: "month",
		ms: 2592e6
	},
	{
		unit: "week",
		ms: 6048e5
	},
	{
		unit: "day",
		ms: 864e5
	},
	{
		unit: "hour",
		ms: 36e5
	},
	{
		unit: "minute",
		ms: 6e4
	},
	{
		unit: "second",
		ms: 1e3
	}
];
/**
* Formats a date as a human-readable relative time string.
*
* @example formatRelativeTime(Date.now() - 300000) // "há 5 minutos"
* @example formatRelativeTime(Date.now() + 7200000, 'en') // "in 2 hours"
*/
function formatRelativeTime(date, locale = "pt-BR") {
	if (!date) return "";
	const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });
	const elapsed = new Date(date).getTime() - Date.now();
	for (const { unit, ms } of RELATIVE_UNITS) {
		const diff = Math.round(elapsed / ms);
		if (Math.abs(diff) >= 1) return rtf.format(diff, unit);
	}
	return rtf.format(0, "second");
}
/**
* Returns the singular or plural form of a word based on count.
*
* @example pluralize(1, 'item') // "item"
* @example pluralize(3, 'item') // "itens"
* @example pluralize(0, 'pessoa', 'pessoas') // "pessoas"
*/
function pluralize(count, singular, plural) {
	return count === 1 ? singular : plural ?? singular + "s";
}
/**
* Truncates a string to a maximum length without breaking words.
*
* @example truncate('Hello world', 8) // "Hello..."
* @example truncate('Hello world', 10, ' [..]') // "Hello [..]"
*/
function truncate(str, maxLength, suffix = "...") {
	if (str.length <= maxLength) return str;
	if (maxLength <= suffix.length) return str.slice(0, maxLength);
	const truncated = str.slice(0, maxLength - suffix.length);
	const lastSpace = truncated.lastIndexOf(" ");
	return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + suffix;
}
/**
* Converts a string to a URL-friendly slug.
*
* @example slugify('Olá Mundo!') // "ola-mundo"
* @example slugify('Ação & Reação') // "acao-reacao"
*/
function slugify(str) {
	return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/[\s-]+/g, "-").replace(/^-+|-+$/g, "");
}
/**
* Strips all non-digit characters from a string.
*
* @example stripMask('123.456.789-00') // "12345678900"
*/
function stripMask(value) {
	return value.replace(/\D/g, "");
}
/**
* Formats a string as a Brazilian CPF (XXX.XXX.XXX-XX).
*
* @example maskCPF('12345678900') // "123.456.789-00"
* @example maskCPF('123.456.789-00') // "123.456.789-00"
*/
function maskCPF(value) {
	const digits = stripMask(value).slice(0, 11);
	if (digits.length !== 11) return value;
	return digits.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
/**
* Formats a string as a Brazilian CNPJ (XX.XXX.XXX/XXXX-XX).
*
* @example maskCNPJ('11222333000181') // "11.222.333/0001-81"
*/
function maskCNPJ(value) {
	const digits = stripMask(value).slice(0, 14);
	if (digits.length !== 14) return value;
	return digits.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}
/**
* Formats a string as a Brazilian phone number.
*
* @example maskPhone('11987654321') // "(11) 98765-4321"
* @example maskPhone('1133334444')  // "(11) 3333-4444"
*/
function maskPhone(value) {
	const digits = stripMask(value).slice(0, 11);
	if (digits.length < 10) return value;
	if (digits.length <= 10) return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
	return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}
/**
* Capitalizes the first letter of each word in a string.
*
* @example capitalize('hello world') // "Hello World"
* @example capitalize('OLÁ MUNDO')   // "Olá Mundo"
*/
function capitalize(str) {
	return str.toLowerCase().replace(/\b\p{L}/gu, (char) => char.toUpperCase());
}
//#endregion
//#region src/atomics/form-group.ts
var AuyInternalFormGroup = class AuyInternalFormGroup extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.name = "";
		this.type = "text";
		this.value = "";
		this.placeholder = "";
		this.required = false;
		this.disabled = false;
		this.readonly = false;
		this.error = "";
		this.helpText = "";
		this.options = [];
		this.maxlength = 0;
		this.mask = "";
		this._charCount = 0;
		this._touched = false;
		this._nativeValid = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }

      /* ── Label ── */
      [part='label'] {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        margin-block-end: 0.25rem;
        color: var(--auy-color-text);
      }

      .required {
        color: var(--auy-color-error);
        margin-inline-start: 0.125rem;
      }

      /* ── Wrapper ── */
      [part='input-wrapper'] {
        position: relative;
        display: flex;
        align-items: center;
      }

      /* ── Input base ── */
      [part='input'] {
        box-sizing: border-box;
        display: block;
        inline-size: 100%;
        padding: var(--auy-space-sm) var(--auy-space-md);
        padding-inline-end: 2.25rem;
        font-family: inherit;
        font-size: var(--auy-text-sm);
        line-height: 1.5;
        color: var(--auy-color-text);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        transition: border-color var(--auy-transition), box-shadow var(--auy-transition);
        outline: none;
        touch-action: manipulation;
      }

      [part='input']::placeholder {
        color: var(--auy-color-text-muted);
        opacity: 0.7;
      }

      /* ── Focus ── */
      [part='input']:focus-visible {
        border-color: var(--auy-color-primary);
        box-shadow: 0 0 0 0.125rem color-mix(in oklch, var(--auy-color-primary) 25%, transparent);
      }

      /* ── State-driven validation (no :user-valid/:user-invalid) ── */
      :host([data-valid]) [part='input'] {
        border-color: var(--auy-color-success);
      }

      :host([data-valid]) [part='input']:focus-visible {
        box-shadow: 0 0 0 0.125rem color-mix(in oklch, var(--auy-color-success) 25%, transparent);
      }

      :host([data-invalid]) [part='input'] {
        border-color: var(--auy-color-error);
      }

      :host([data-invalid]) [part='input']:focus-visible {
        box-shadow: 0 0 0 0.125rem color-mix(in oklch, var(--auy-color-error) 25%, transparent);
      }

      /* ── Validation icons ── */
      .icon {
        position: absolute;
        inset-inline-end: 0.5rem;
        inset-block-start: 50%;
        translate: 0 -50%;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--auy-transition), transform var(--auy-transition);
        transform: scale(0.8);
      }

      .icon--visible {
        opacity: 1;
        transform: scale(1);
      }

      .icon svg {
        inline-size: 1rem;
        block-size: 1rem;
      }

      .icon--success {
        color: var(--auy-color-success);
      }

      .icon--error {
        color: var(--auy-color-error);
      }

      /* ── Messages ── */
      [part='help'],
      [part='error'] {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: var(--auy-text-xs);
        margin-block-start: 0.25rem;
        overflow: hidden;
      }

      [part='help'] {
        color: var(--auy-color-text-muted);
      }

      [part='error'] {
        color: var(--auy-color-error);
      }

      /* ── Textarea ── */
      textarea[part='input'] {
        resize: vertical;
        min-block-size: 5rem;
      }

      /* ── Select ── */
      select[part='input'] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-inline-end: var(--auy-space-xl);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%236b7280' d='M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right var(--auy-space-sm) center;
        background-size: 16px;
        cursor: pointer;
        touch-action: manipulation;
      }

      @media (prefers-reduced-motion: reduce) {
        [part='input'],
        .icon {
          transition: none;
        }
      }

      @media (forced-colors: active) {
        [part='input'] {
          border: 1px solid ButtonText;
        }
        [part='input']:focus-visible {
          outline: 0.125rem solid Highlight;
          outline-offset: 0.125rem;
        }
      }

      @media print {
        [part='error'],
        [part='help'] {
          display: none;
        }
      }
    }
  `;
	}
	_applyMask(raw) {
		switch (this.mask) {
			case "phone": return maskPhone(raw);
			case "cpf": return maskCPF(raw);
			case "cnpj": return maskCNPJ(raw);
			case "cep": {
				const digits = raw.replace(/\D/g, "").slice(0, 8);
				return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
			}
			case "numbers": return raw.replace(/\D/g, "");
			default: return raw;
		}
	}
	handleInput(e) {
		const target = e.target;
		this._inputEl = target;
		if (this.mask) {
			const cursor = target.selectionStart;
			const masked = this._applyMask(target.value);
			if (masked !== target.value) {
				target.value = masked;
				if (cursor !== null) target.setSelectionRange(cursor, cursor);
			}
		}
		this.value = target.value;
		this._charCount = target.value.length;
		if (!this._touched) this._touched = true;
		this._validateNative(target);
		this.dispatchEvent(new CustomEvent("input", {
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	handleBlur() {
		if (!this._touched) this._touched = true;
		if (this._inputEl) this._validateNative(this._inputEl);
		if (!this.error && !this._nativeValid) this.dispatchEvent(new CustomEvent("auy-validate", {
			bubbles: true,
			composed: true,
			detail: {
				name: this.name,
				value: this.value
			}
		}));
	}
	_validateNative(el) {
		this._nativeValid = el.checkValidity();
		requestAnimationFrame(() => this._syncAttrs());
	}
	_syncAttrs() {
		const hasValue = this.value.length > 0;
		const isError = !!this.error;
		const valid = !isError && this._nativeValid && hasValue;
		const invalid = isError || !this._nativeValid && hasValue;
		this.toggleAttribute("data-valid", valid);
		this.toggleAttribute("data-invalid", invalid);
	}
	updated(changed) {
		if (changed.has("error")) this._syncAttrs();
	}
	_checkIcon() {
		return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
	}
	_errorIcon() {
		return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
	}
	render() {
		const label = this.label ? html`
          <label part="label" for="input">
            ${this.label}
            ${this.required ? html`<span class="required" aria-hidden="true">*</span>` : nothing}
          </label>
        ` : nothing;
		const hasError = !!this.error;
		const helpTextEl = this.helpText && !hasError ? html`<div part="help" id="help">${this.helpText}</div>` : nothing;
		const errorEl = hasError ? html`<div part="error" role="alert">${this.error}</div>` : nothing;
		const describedBy = this.helpText && !hasError ? "help" : void 0;
		let input;
		if (this.type === "textarea") input = html`
        <textarea
          part="input"
          id="input"
          name=${ifDefined(this.name || void 0)}
          placeholder=${ifDefined(this.placeholder || void 0)}
          .value=${live(this.value)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          maxlength=${this.maxlength > 0 ? this.maxlength : nothing}
          aria-invalid=${hasError ? "true" : nothing}
          aria-describedby=${ifDefined(describedBy)}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>
        ${this.maxlength > 0 ? html`<div style="font-size:var(--auy-text-xs);color:var(--auy-color-text-muted);text-align:end;margin-block-start:0.125rem;">${this._charCount}/${this.maxlength}</div>` : nothing}
      `;
		else if (this.type === "select") {
			const opts = this.options.map((o) => html`<option value=${o.value} ?selected=${o.value === this.value}>${o.label}</option>`);
			input = html`
        <select
          part="input"
          id="input"
          name=${ifDefined(this.name || void 0)}
          .value=${live(this.value)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${hasError ? "true" : nothing}
          aria-describedby=${ifDefined(describedBy)}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        >
          ${opts}
        </select>
      `;
		} else {
			const inputMode = this.mask === "phone" ? "tel" : this.mask === "numbers" ? "numeric" : this.mask === "cep" ? "numeric" : this.type === "number" ? "numeric" : this.type === "tel" ? "tel" : void 0;
			const inputPattern = this.mask === "phone" ? "[sS]*" : this.mask === "cpf" ? "[sS]*" : this.mask === "numbers" ? "[0-9]*" : void 0;
			input = html`
        <input
          part="input"
          id="input"
          type=${this.mask === "phone" ? "tel" : this.mask === "numbers" ? "text" : this.type}
          name=${ifDefined(this.name || void 0)}
          placeholder=${ifDefined(this.placeholder || void 0)}
          .value=${live(this.value)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          maxlength=${this.maxlength > 0 ? this.maxlength : nothing}
          inputmode=${ifDefined(inputMode)}
          pattern=${ifDefined(inputPattern)}
          aria-invalid=${hasError ? "true" : nothing}
          aria-describedby=${ifDefined(describedBy)}
          autocomplete=${ifDefined(this.type === "email" ? "email" : this.type === "password" ? "current-password" : void 0)}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        >
      `;
		}
		const showValid = this.hasAttribute("data-valid");
		const showInvalid = this.hasAttribute("data-invalid");
		return html`
      ${label}
      <div part="input-wrapper">
        ${input}
        <span class="icon icon--success ${showValid ? "icon--visible" : ""}" aria-hidden="true">${this._checkIcon()}</span>
        <span class="icon icon--error ${showInvalid ? "icon--visible" : ""}" aria-hidden="true">${this._errorIcon()}</span>
        <slot name="error-icon" part="error-icon-slot"></slot>
      </div>
      ${showInvalid ? errorEl : helpTextEl}
    `;
	}
};
__decorate([property({ type: String })], AuyInternalFormGroup.prototype, "label", void 0);
__decorate([property({ type: String })], AuyInternalFormGroup.prototype, "name", void 0);
__decorate([property({ type: String })], AuyInternalFormGroup.prototype, "type", void 0);
__decorate([property({ type: String })], AuyInternalFormGroup.prototype, "value", void 0);
__decorate([property({ type: String })], AuyInternalFormGroup.prototype, "placeholder", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalFormGroup.prototype, "required", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalFormGroup.prototype, "disabled", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalFormGroup.prototype, "readonly", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyInternalFormGroup.prototype, "error", void 0);
__decorate([property({ type: String })], AuyInternalFormGroup.prototype, "helpText", void 0);
__decorate([property({ type: Array })], AuyInternalFormGroup.prototype, "options", void 0);
__decorate([property({ type: Number })], AuyInternalFormGroup.prototype, "maxlength", void 0);
__decorate([property({ type: String })], AuyInternalFormGroup.prototype, "mask", void 0);
__decorate([state()], AuyInternalFormGroup.prototype, "_charCount", void 0);
__decorate([state()], AuyInternalFormGroup.prototype, "_touched", void 0);
__decorate([state()], AuyInternalFormGroup.prototype, "_nativeValid", void 0);
AuyInternalFormGroup = __decorate([customElement("auy-internal-form-group")], AuyInternalFormGroup);
//#endregion
//#region src/atomics/pagination.ts
var AuyInternalPagination = class AuyInternalPagination extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.current = 1;
		this.total = 1;
		this.perPage = 10;
		this.maxVisible = 5;
		this.disabled = false;
		this._totalPages = 1;
		this._firstPage = true;
		this._lastPage = true;
		this._pages = [];
		this._handlePageClick = (e) => {
			const page = Number(e.currentTarget.dataset.page);
			this._goTo(page);
		};
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      nav {
        display: flex;
        align-items: center;
        gap: var(--auy-space-xs);
        justify-content: center;
        flex-wrap: wrap;
      }

      button {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-inline-size: 2.25rem;
        block-size: 2.25rem;
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        cursor: pointer;
        color: var(--auy-color-text);
        background: transparent;
        transition: background var(--auy-transition, 200ms ease);
        box-sizing: border-box;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      button:hover:not(:disabled):not(.ellipsis) {
        background: var(--auy-color-border);
      }

      button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      button.active {
        background: var(--auy-color-primary);
        color: oklch(100% 0 0);
        font-weight: 600;
      }

      button.ellipsis {
        letter-spacing: 2px;
        cursor: default;
      }

      @media (forced-colors: active) {
        button {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        nav {
          display: none;
        }
      }
    }
  `;
	}
	willUpdate(changed) {
		if (changed.has("total") || changed.has("perPage") || changed.has("current") || changed.has("maxVisible") || changed.has("disabled")) {
			this._totalPages = Math.ceil(this.total / this.perPage);
			this._firstPage = this.current <= 1 || this.disabled;
			this._lastPage = this.current >= this._totalPages || this.disabled;
			this._pages = this._generatePages();
		}
	}
	_goTo(page) {
		if (this.disabled) return;
		if (page < 1 || page > this._totalPages) return;
		if (page === this.current) return;
		this.current = page;
		this.dispatchEvent(new CustomEvent("page-change", {
			detail: {
				page: this.current,
				perPage: this.perPage
			},
			bubbles: true,
			composed: true
		}));
	}
	_goPrev() {
		if (this.current > 1) this._goTo(this.current - 1);
	}
	_goNext() {
		if (this.current < this._totalPages) this._goTo(this.current + 1);
	}
	_generatePages() {
		const total = this._totalPages;
		const current = this.current;
		const visible = this.maxVisible;
		if (total <= visible + 2) return Array.from({ length: total }, (_, i) => i + 1);
		const pages = [1];
		let start = Math.max(2, current - Math.floor(visible / 2));
		let end = Math.min(total - 1, start + visible - 1);
		if (end - start < visible - 1) start = Math.max(2, end - visible + 1);
		if (start > 2) pages.push("...");
		for (let i = start; i <= end; i++) pages.push(i);
		if (end < total - 1) pages.push("...");
		pages.push(total);
		return pages;
	}
	render() {
		const pages = this._pages;
		return html`
      <nav part="nav" aria-label="Paginação">
        <button
          part="btn prev"
          ?disabled=${this._firstPage}
          @click=${this._goPrev}
          aria-label="Página anterior"
        >
          <slot name="prev-icon">‹</slot>
        </button>
        ${pages.map((p) => typeof p === "string" ? html`<button part="btn ellipsis" class="ellipsis" disabled aria-hidden="true">${p}</button>` : html`
                  <button
                    part="btn page"
                    class=${classMap({ active: p === this.current })}
                    ?disabled=${this.disabled}
                    data-page="${p}"
                    @click=${this._handlePageClick}
                    aria-current=${p === this.current ? "page" : nothing}
                    aria-label="Ir para página ${p}"
                  >
                    ${p}
                  </button>
                `)}
        <button
          part="btn next"
          ?disabled=${this._lastPage}
          @click=${this._goNext}
          aria-label="Próxima página"
        >
          <slot name="next-icon">›</slot>
        </button>
      </nav>
    `;
	}
};
__decorate([property({
	type: Number,
	reflect: true
})], AuyInternalPagination.prototype, "current", void 0);
__decorate([property({ type: Number })], AuyInternalPagination.prototype, "total", void 0);
__decorate([property({ type: Number })], AuyInternalPagination.prototype, "perPage", void 0);
__decorate([property({ type: Number })], AuyInternalPagination.prototype, "maxVisible", void 0);
__decorate([property({ type: Boolean })], AuyInternalPagination.prototype, "disabled", void 0);
__decorate([state()], AuyInternalPagination.prototype, "_totalPages", void 0);
__decorate([state()], AuyInternalPagination.prototype, "_firstPage", void 0);
__decorate([state()], AuyInternalPagination.prototype, "_lastPage", void 0);
__decorate([state()], AuyInternalPagination.prototype, "_pages", void 0);
AuyInternalPagination = __decorate([customElement("auy-internal-pagination")], AuyInternalPagination);
//#endregion
//#region src/assets/icons.ts
/** Collection of SVG icons for use throughout the application. */
var ICONS = {
	chevronDown: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Chevron para baixo</title><path d=\"M6 9l6 6 6-6\"/></svg>",
	chevronUp: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Chevron para cima</title><path d=\"M18 15l-6-6-6 6\"/></svg>",
	chevronLeft: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Chevron para esquerda</title><path d=\"M15 18l-6-6 6-6\"/></svg>",
	chevronRight: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Chevron para direita</title><path d=\"M9 18l6-6-6-6\"/></svg>",
	menu: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Menu</title><path d=\"M3 12h18M3 6h18M3 18h18\"/></svg>",
	close: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Fechar</title><path d=\"M18 6L6 18M6 6l12 12\"/></svg>",
	plus: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Adicionar</title><path d=\"M12 5v14M5 12h14\"/></svg>",
	minus: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Subtrair</title><path d=\"M5 12h14\"/></svg>",
	search: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Pesquisar</title><circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"M21 21l-4.35-4.35\"/></svg>",
	home: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Início</title><path d=\"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z\"/><polyline points=\"9 22 9 12 15 12 15 22\"/></svg>",
	settings: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Configurações</title><circle cx=\"12\" cy=\"12\" r=\"3\"/><path d=\"M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z\"/></svg>",
	user: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Usuário</title><path d=\"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/></svg>",
	edit: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Editar</title><path d=\"M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7\"/><path d=\"M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z\"/></svg>",
	trash: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Excluir</title><polyline points=\"3 6 5 6 21 6\"/><path d=\"M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2\"/><line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"/><line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"/></svg>",
	save: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Salvar</title><path d=\"M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z\"/><polyline points=\"17 21 17 13 7 13 7 21\"/><polyline points=\"7 3 7 8 15 8\"/></svg>",
	download: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Baixar</title><path d=\"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4\"/><polyline points=\"7 10 12 15 17 10\"/><line x1=\"12\" y1=\"15\" x2=\"12\" y2=\"3\"/></svg>",
	upload: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Enviar</title><path d=\"M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4\"/><polyline points=\"17 8 12 3 7 8\"/><line x1=\"12\" y1=\"3\" x2=\"12\" y2=\"15\"/></svg>",
	refresh: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Atualizar</title><polyline points=\"23 4 23 10 17 10\"/><polyline points=\"1 20 1 14 7 14\"/><path d=\"M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15\"/></svg>",
	check: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Confirmar</title><polyline points=\"20 6 9 17 4 12\"/></svg>",
	alert: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Alerta</title><path d=\"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>",
	info: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Informação</title><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"12\" y1=\"16\" x2=\"12\" y2=\"12\"/><line x1=\"12\" y1=\"8\" x2=\"12.01\" y2=\"8\"/></svg>",
	error: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Erro</title><circle cx=\"12\" cy=\"12\" r=\"10\"/><line x1=\"15\" y1=\"9\" x2=\"9\" y2=\"15\"/><line x1=\"9\" y1=\"9\" x2=\"15\" y2=\"15\"/></svg>",
	warning: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Aviso</title><path d=\"M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z\"/><line x1=\"12\" y1=\"9\" x2=\"12\" y2=\"13\"/><line x1=\"12\" y1=\"17\" x2=\"12.01\" y2=\"17\"/></svg>",
	success: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Sucesso</title><path d=\"M22 11.08V12a10 10 0 11-5.93-9.14\"/><polyline points=\"22 4 12 14.01 9 11.01\"/></svg>",
	externalLink: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Link externo</title><path d=\"M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6\"/><polyline points=\"15 3 21 3 21 9\"/><line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"/></svg>",
	eye: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Olho</title><path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>",
	eyeOff: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Olho oculto</title><path d=\"M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M14.12 14.12a3 3 0 11-4.24-4.24\"/><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"/></svg>",
	filter: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Filtrar</title><polygon points=\"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3\"/></svg>",
	sort: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Ordenar</title><path d=\"M11 5h10M11 9h7M11 13h4\"/><polyline points=\"3 5 6 2 9 5\"/><polyline points=\"3 11 6 14 9 11\"/><path d=\"M7 2v8\"/><path d=\"M7 14v8\"/></svg>",
	moreVertical: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Mais opções</title><circle cx=\"12\" cy=\"12\" r=\"1\"/><circle cx=\"12\" cy=\"5\" r=\"1\"/><circle cx=\"12\" cy=\"19\" r=\"1\"/></svg>",
	calendar: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Calendário</title><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"16\" y1=\"2\" x2=\"16\" y2=\"6\"/><line x1=\"8\" y1=\"2\" x2=\"8\" y2=\"6\"/><line x1=\"3\" y1=\"10\" x2=\"21\" y2=\"10\"/></svg>",
	clock: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Relógio</title><circle cx=\"12\" cy=\"12\" r=\"10\"/><polyline points=\"12 6 12 12 16 14\"/></svg>",
	file: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Arquivo</title><path d=\"M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"16\" y1=\"13\" x2=\"8\" y2=\"13\"/><line x1=\"16\" y1=\"17\" x2=\"8\" y2=\"17\"/><polyline points=\"10 9 9 9 8 9\"/></svg>",
	image: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Imagem</title><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><polyline points=\"21 15 16 10 5 21\"/></svg>",
	table: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Tabela</title><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><line x1=\"3\" y1=\"9\" x2=\"21\" y2=\"9\"/><line x1=\"3\" y1=\"15\" x2=\"21\" y2=\"15\"/><line x1=\"9\" y1=\"3\" x2=\"9\" y2=\"21\"/><line x1=\"15\" y1=\"3\" x2=\"15\" y2=\"21\"/></svg>",
	fontSize: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Tamanho da fonte</title><polyline points=\"4 7 4 4 20 4 20 7\"/><polyline points=\"9 20 12 4 15 20\"/><line x1=\"7\" y1=\"16\" x2=\"17\" y2=\"16\"/></svg>",
	contrast: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" focusable=\"false\" role=\"img\" aria-hidden=\"true\"><title>Contraste</title><circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M12 2a10 10 0 010 20V2z\"/></svg>"
};
ICONS.chevronDown;
ICONS.chevronUp;
ICONS.chevronLeft;
ICONS.chevronRight;
ICONS.menu;
ICONS.close;
ICONS.plus;
ICONS.minus;
ICONS.search;
ICONS.home;
ICONS.settings;
ICONS.user;
ICONS.edit;
ICONS.trash;
ICONS.save;
ICONS.download;
ICONS.upload;
ICONS.refresh;
ICONS.check;
ICONS.alert;
ICONS.info;
ICONS.error;
ICONS.warning;
ICONS.success;
ICONS.externalLink;
ICONS.eye;
ICONS.eyeOff;
ICONS.filter;
ICONS.sort;
ICONS.moreVertical;
ICONS.calendar;
ICONS.clock;
ICONS.file;
ICONS.image;
ICONS.table;
ICONS.fontSize;
ICONS.contrast;
/** Lit SVG templates — zero unsafeHTML, type-safe, performant. */
var ICON_SVG = {
	info: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Informação</title><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
	success: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Sucesso</title><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
	warning: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Aviso</title><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
	error: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Erro</title><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
};
//#endregion
//#region src/atomics/alert.ts
var AuyInternalAlert = class AuyInternalAlert extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.open = true;
		this.dismissible = false;
		this.variant = "info";
		this.icon = "";
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

      .alert {
        display: flex;
        align-items: flex-start;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
      }

      @starting-style {
        .alert {
          opacity: 0;
        }
      }

      .alert.variant-info {
        background: oklch(from var(--auy-color-info) 95% 0.02 h);
      }

      .alert.variant-success {
        background: oklch(from var(--auy-color-success) 95% 0.02 h);
      }

      .alert.variant-warning {
        background: oklch(from var(--auy-color-warning) 95% 0.02 h);
      }

      .alert.variant-error {
        background: oklch(from var(--auy-color-error) 95% 0.02 h);
      }

      .icon {
        flex-shrink: 0;
        inline-size: 20px;
        block-size: 20px;
        margin-block-start: 1px;
      }

      .content {
        flex: 1;
        display: grid;
        gap: 0.25rem;
      }

      ::slotted([slot="title"]) {
        font-weight: 600;
      }

      .close {
        flex-shrink: 0;
        padding: 0.25rem;
        cursor: pointer;
        opacity: 0.7;
        color: inherit;
        background: none;
        border: none;
        line-height: 1;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      .close:hover {
        opacity: 1;
      }

      .close:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .close {
          border: 1px solid ButtonText;
        }

        .alert {
          border: 1px solid CanvasText;
        }
      }

      @media (prefers-color-scheme: dark) {
        .alert.variant-info {
          background: oklch(from var(--auy-color-info) 25% 0.06 h);
          color: oklch(from var(--auy-color-info) 85% 0.1 h);
        }
        .alert.variant-success {
          background: oklch(from var(--auy-color-success) 25% 0.06 h);
          color: oklch(from var(--auy-color-success) 85% 0.1 h);
        }
        .alert.variant-warning {
          background: oklch(from var(--auy-color-warning) 25% 0.06 h);
          color: oklch(from var(--auy-color-warning) 85% 0.12 h);
        }
        .alert.variant-error {
          background: oklch(from var(--auy-color-error) 25% 0.06 h);
          color: oklch(from var(--auy-color-error) 85% 0.1 h);
        }
      }

      @media (prefers-reduced-motion: no-preference) {
        .alert {
          transition: opacity var(--auy-transition, 200ms ease);
          opacity: 1;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .alert {
          transition: none;
        }
      }

      @media print {
        .close {
          display: none;
        }
      }
    }
  `;
	}
	_dismiss() {
		this.open = false;
		this.dispatchEvent(new CustomEvent("dismiss", {
			bubbles: true,
			composed: true
		}));
	}
	show() {
		this.open = true;
	}
	hide() {
		this.open = false;
	}
	render() {
		const variantIcon = this.icon ? svg`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>${this.variant}</title><use href="#${this.icon}"/></svg>` : ICON_SVG[this.variant];
		return html`
      <div part="alert" class=${classMap({
			alert: true,
			[`variant-${this.variant}`]: true
		})} role="alert" aria-live="polite">
        <div part="icon" class="icon">
          ${variantIcon}
        </div>
        <div part="content" class="content">
          <slot name="title" part="title"></slot>
          <slot part="message"></slot>
        </div>
        ${this.dismissible ? html`<button part="close" class="close" @click=${this._dismiss} aria-label="Fechar">×</button>` : ""}
      </div>
    `;
	}
};
__decorate([property({
	reflect: true,
	type: Boolean
})], AuyInternalAlert.prototype, "open", void 0);
__decorate([property({ type: Boolean })], AuyInternalAlert.prototype, "dismissible", void 0);
__decorate([property({ type: String })], AuyInternalAlert.prototype, "variant", void 0);
__decorate([property({ type: String })], AuyInternalAlert.prototype, "icon", void 0);
AuyInternalAlert = __decorate([customElement("auy-internal-alert")], AuyInternalAlert);
//#endregion
//#region src/atomics/checkbox.ts
var AuyInternalCheckbox = class AuyInternalCheckbox extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.type = "checkbox";
		this.value = "";
		this.name = "";
		this.checked = false;
		this.disabled = false;
		this.required = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: inline-block;
        contain: layout style;
      }

      label {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-sm, 0.5rem);
        cursor: pointer;
        font-size: var(--auy-text-sm, 0.875rem);
        line-height: 1.5;
        color: var(--auy-color-text, oklch(20% 0.03 260));
        touch-action: manipulation;
        user-select: none;
      }

      :host([disabled]) label {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      input {
        position: absolute;
        opacity: 0;
        inline-size: 0;
        block-size: 0;
        pointer-events: none;
      }

      .control {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background var(--auy-transition, 200ms ease),
          border-color var(--auy-transition, 200ms ease),
          box-shadow var(--auy-transition, 200ms ease);
      }

      input:focus-visible + .control {
        outline: 0.125rem solid var(--auy-color-primary, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      /* Checkbox */
      :host([type='checkbox']) .control {
        inline-size: 1.25em;
        block-size: 1.25em;
        border: 0.125rem solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: var(--auy-radius-sm, 4px);
        background: var(--auy-color-surface, oklch(100% 0 0));
      }

      :host([type='checkbox']) input:checked + .control {
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        border-color: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      :host([type='checkbox']) .check-icon {
        opacity: 0;
        transition: opacity var(--auy-transition, 200ms) ease;
      }

      :host([type='checkbox']) input:checked + .control .check-icon {
        opacity: 1;
      }

      /* Radio */
      :host([type='radio']) .control {
        inline-size: 1.25em;
        block-size: 1.25em;
        border: 0.125rem solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: 50%;
        background: var(--auy-color-surface, oklch(100% 0 0));
      }

      :host([type='radio']) input:checked + .control {
        border-color: var(--auy-color-primary, oklch(50% 0.2 250));
        border-width: 0.4em;
      }

      /* Switch */
      :host([type='switch']) .control {
        inline-size: 2.25em;
        block-size: 1.25em;
        border-radius: 1.25em;
        background: var(--auy-color-border, oklch(0% 0 0 / 0.25));
        position: relative;
      }

      :host([type='switch']) .thumb {
        position: absolute;
        inset-block-start: 0.125em;
        inset-inline-start: 0.125em;
        inline-size: calc(1.25em - 0.25em);
        block-size: calc(1.25em - 0.25em);
        border-radius: 50%;
        background: var(--auy-color-surface, oklch(100% 0 0));
        box-shadow: 0 0.0625em 0.1875em oklch(0% 0 0 / 0.2);
        transition: margin var(--auy-transition, 200ms) ease;
      }

      :host([type='switch']) input:checked + .control {
        background: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      :host([type='switch']) input:checked + .control .thumb {
        margin-inline-start: calc(2.25em - 1.25em);
      }

      @media (forced-colors: active) {
        .control {
          border-color: ButtonText;
        }
        input:checked + .control {
          background: Highlight;
          border-color: Highlight;
        }
        :host([type='switch']) input:checked + .control .thumb {
          margin-inline-start: calc(2.25em - 1.25em);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .control,
        .check-icon,
        .thumb {
          transition: none;
        }
      }
    }
  `;
	}
	_handleChange(e) {
		const input = e.target;
		this.checked = input.checked;
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	render() {
		return html`
      <label>
        <input
          type=${this.type === "switch" ? "checkbox" : this.type}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name}
          .value=${this.value}
          @change=${this._handleChange}
        >
        <span class="control" aria-hidden="true">
          ${this.type === "checkbox" ? html`<svg class="check-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="oklch(100% 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 6 5 9 10 3"/></svg>` : this.type === "switch" ? html`<span class="thumb"></span>` : nothing}
        </span>
        <slot></slot>
      </label>
    `;
	}
};
__decorate([property({ type: String })], AuyInternalCheckbox.prototype, "type", void 0);
__decorate([property({ type: String })], AuyInternalCheckbox.prototype, "value", void 0);
__decorate([property({ type: String })], AuyInternalCheckbox.prototype, "name", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalCheckbox.prototype, "checked", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalCheckbox.prototype, "disabled", void 0);
__decorate([property({ type: Boolean })], AuyInternalCheckbox.prototype, "required", void 0);
AuyInternalCheckbox = __decorate([customElement("auy-internal-checkbox")], AuyInternalCheckbox);
//#endregion
//#region src/atomics/button-group.ts
var AuyButtonGroup = class AuyButtonGroup extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.ariaLabel = "";
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: inline-flex;
      }

      [part="group"] {
        display: inline-flex;
        flex: 1;
      }

      ::slotted(*) {
        flex: 1 1 auto;
        position: relative;
        min-inline-size: 0;
      }

      ::slotted(:not(:first-child)) {
        margin-inline-start: -1px;
        --_radius-start: 0px;
      }

      ::slotted(:not(:last-child)) {
        --_radius-end: 0px;
      }

      ::slotted(:focus-visible) {
        z-index: 1;
      }

      @media (forced-colors: active) {
        ::slotted(*) {
          border: 1px solid ButtonText;
        }
        ::slotted(:focus-visible) {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }
    }
  `;
	}
	render() {
		return html`
      <div part="group" role="group" aria-label=${this.ariaLabel || "Grupo de botões"}>
        <slot></slot>
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyButtonGroup.prototype, "ariaLabel", void 0);
AuyButtonGroup = __decorate([customElement("auy-button-group")], AuyButtonGroup);
//#endregion
//#region src/atomics/code-editor.ts
var AuyInternalCodeEditor = class AuyInternalCodeEditor extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.value = "";
		this.language = "html";
		this.readonly = false;
		this.theme = "default";
		this.lineNumbers = true;
		this.height = "300px";
		this.placeholder = "";
		this.cmOptions = "";
		this._lines = ["1"];
		this._cmLoaded = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .editor {
        display: flex;
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        overflow: hidden;
        font-family: var(--auy-font-mono);
        font-size: var(--auy-text-sm);
        line-height: 1.5;
        background: var(--auy-color-surface);
      }

      .gutter {
        display: flex;
        flex-direction: column;
        padding: 0.5rem;
        background: color-mix(in oklch, var(--auy-color-border) 30%, transparent);
        color: var(--auy-color-text-muted);
        text-align: right;
        user-select: none;
        min-inline-size: 3rem;
        flex-shrink: 0;
        overflow: hidden;
      }

      textarea {
        flex: 1;
        border: none;
        padding: 0.5rem;
        font: inherit;
        background: transparent;
        color: var(--auy-color-text);
        resize: both;
        outline: none;
        tab-size: 2;
        white-space: pre;
        overflow-wrap: normal;
        overflow: auto;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      :host([readonly]) textarea {
        cursor: default;
      }

      textarea:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      textarea::selection {
        background: var(--auy-color-primary-muted, oklch(from var(--auy-color-primary) 80% 0.15 h / 0.2));
      }

      ::part(textarea)::selection {
        background: var(--auy-color-primary-muted, oklch(from var(--auy-color-primary) 80% 0.15 h / 0.2));
      }

      .cm-host {
        flex: 1;
        overflow: auto;
      }

      @media (forced-colors: active) {
        .editor {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        .editor {
          border-color: #000;
        }
      }

      @media (prefers-color-scheme: dark) {
        .editor {
          border-color: var(--auy-color-border, oklch(28% 0.03 260));
          background: var(--auy-color-surface, oklch(20% 0.03 260));
        }

        textarea {
          color: var(--auy-color-text, oklch(93% 0.01 260));
        }
      }
    }
  `;
	}
	shouldUpdate(changed) {
		return changed.has("value") || changed.has("lineNumbers") || changed.has("cmOptions") || changed.has("height") || changed.has("readonly") || changed.has("placeholder") || changed.has("_cmLoaded");
	}
	willUpdate(changed) {
		if (changed.has("value") || changed.has("lineNumbers")) this._updateLineNumbers();
	}
	render() {
		if (this._cmLoaded) return html`
        <div part="editor" class="editor" style="height: ${this.height}">
          <div part="cm-host" class="cm-host"></div>
        </div>
      `;
		return html`
      <div part="editor" class="editor" style="height: ${this.height}">
        ${this.lineNumbers ? html`
              <div part="gutter" class="gutter" aria-hidden="true">
                ${this._lines.map((n) => html`<span>${n}</span>`)}
              </div>
            ` : nothing}
        <textarea
          part="textarea"
          .value=${this.value}
          ?readonly=${this.readonly}
          placeholder=${this.placeholder || nothing}
          @input=${this._onInput}
          @keydown=${this._onKeydown}
          @scroll=${this._syncScroll}
          spellcheck="false"
          wrap="off"
        ></textarea>
      </div>
    `;
	}
	updated(changed) {
		if (changed.has("cmOptions") && this.cmOptions) this._loadCodeMirror();
	}
	_onInput(e) {
		const target = e.target;
		this.value = target.value;
		this.dispatchEvent(new CustomEvent("input", {
			bubbles: true,
			composed: true
		}));
		this.dispatchEvent(new Event("change", {
			bubbles: true,
			composed: true
		}));
	}
	_onKeydown(e) {
		if (e.key === "Tab") {
			e.preventDefault();
			const target = e.target;
			const start = target.selectionStart;
			const end = target.selectionEnd;
			target.value = `${target.value.substring(0, start)}  ${target.value.substring(end)}`;
			target.selectionStart = target.selectionEnd = start + 2;
			this.value = target.value;
			this.dispatchEvent(new CustomEvent("input", {
				bubbles: true,
				composed: true
			}));
			this.dispatchEvent(new Event("change", {
				bubbles: true,
				composed: true
			}));
		}
	}
	_syncScroll() {
		if (this._textarea && this._gutter) this._gutter.scrollTop = this._textarea.scrollTop;
	}
	_updateLineNumbers() {
		if (!this.lineNumbers) {
			this._lines = [];
			return;
		}
		const count = Math.max(1, (this.value || "").split("\n").length);
		this._lines = Array.from({ length: count }, (_, i) => String(i + 1));
	}
	async _loadCodeMirror() {
		try {
			const cm = await import("https://cdn.jsdelivr.net/npm/codemirror@6/+esm");
			if (this._cmHost && cm.EditorView) {
				const options = this.cmOptions ? JSON.parse(this.cmOptions) : {};
				this._cmHost.innerHTML = "";
				new cm.EditorView({
					doc: this.value,
					parent: this._cmHost,
					...options
				});
			}
			this._cmLoaded = true;
		} catch {
			this._cmLoaded = false;
		}
		this.requestUpdate();
	}
};
__decorate([property({ type: String })], AuyInternalCodeEditor.prototype, "value", void 0);
__decorate([property({ type: String })], AuyInternalCodeEditor.prototype, "language", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalCodeEditor.prototype, "readonly", void 0);
__decorate([property({ type: String })], AuyInternalCodeEditor.prototype, "theme", void 0);
__decorate([property({ type: Boolean })], AuyInternalCodeEditor.prototype, "lineNumbers", void 0);
__decorate([property({ type: String })], AuyInternalCodeEditor.prototype, "height", void 0);
__decorate([property({ type: String })], AuyInternalCodeEditor.prototype, "placeholder", void 0);
__decorate([property({ type: String })], AuyInternalCodeEditor.prototype, "cmOptions", void 0);
__decorate([state()], AuyInternalCodeEditor.prototype, "_lines", void 0);
__decorate([state()], AuyInternalCodeEditor.prototype, "_cmLoaded", void 0);
__decorate([query("textarea")], AuyInternalCodeEditor.prototype, "_textarea", void 0);
__decorate([query(".gutter")], AuyInternalCodeEditor.prototype, "_gutter", void 0);
__decorate([query(".cm-host")], AuyInternalCodeEditor.prototype, "_cmHost", void 0);
AuyInternalCodeEditor = __decorate([customElement("auy-internal-code-editor")], AuyInternalCodeEditor);
//#endregion
//#region src/atomics/search.ts
function highlight(text, query) {
	if (!query) return [text];
	const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return text.split(new RegExp(`(${escaped})`, "gi")).map((part, i) => i % 2 === 1 ? html`<mark style="background:var(--auy-color-primary);color:var(--auy-color-on-primary);border-radius:2px;padding:0 2px">${part}</mark>` : part);
}
var AuyInternalSearch = class AuyInternalSearch extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.items = [];
		this.placeholder = "Buscar...";
		this.open = false;
		this.shortcut = "k";
		this._query = "";
		this._selectedIndex = 0;
		this._filtered = [];
		this._onGlobalKeydown = (e) => {
			if ((e.ctrlKey || e.metaKey) && e.key === this.shortcut) {
				e.preventDefault();
				this._open();
			}
		};
		this._handleSelect = (e) => {
			const idx = Number(e.currentTarget.dataset.index);
			this._selectItem(this._filtered[idx]);
		};
		this._handleMouseEnter = (e) => {
			const idx = Number(e.currentTarget.dataset.index);
			this._selectedIndex = idx;
		};
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

      [part="overlay"] {
        position: fixed;
        inset: 0;
        z-index: 1;
        background: var(--auy-color-overlay, oklch(0% 0 0 / 0.4));
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-block-start: 15dvh;
        opacity: 0;
        transition: opacity var(--auy-transition, 200ms ease);
      }

      @starting-style {
        [part="overlay"] {
          opacity: 0;
        }
      }

      [part="panel"] {
        background: var(--auy-color-surface);
        border-radius: var(--auy-radius-lg);
        box-shadow: var(--auy-shadow-lg);
        inline-size: min(40rem, 90dvw);
        max-block-size: 60dvh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      [part="input-wrapper"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        border-block-end: 1px solid var(--auy-color-border);
      }

      [part="input"] {
        flex: 1;
        border: none;
        outline: none;
        font-size: var(--auy-text-lg);
        background: transparent;
        color: var(--auy-color-text);
        font-family: inherit;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      [part="close-btn"] {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 2rem;
        block-size: 2rem;
        border-radius: var(--auy-radius-lg);
        cursor: pointer;
        font-size: 1.25rem;
        line-height: 1;
        color: inherit;
        flex-shrink: 0;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      [part="close-btn"]:hover {
        background: color-mix(in srgb, currentColor 10%, transparent);
      }

      [part="close-btn"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      [part="hint"] {
        display: inline-flex;
        align-items: center;
        padding: 0.125rem 0.375rem;
        border: 1px solid var(--auy-color-border);
        border-radius: 0.25rem;
        font-size: var(--auy-text-xs);
        font-family: inherit;
        color: var(--auy-color-text-muted);
      }

      [part="results"] {
        flex: 1;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        padding: var(--auy-space-xs);
        list-style: none;
        margin: 0;
      }

      [part="result-item"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        cursor: pointer;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      @media (forced-colors: active) {
        [part="overlay"] {
          background: Canvas;
        }

        [part="input"] {
          border: 1px solid ButtonText;
        }

        [part="close-btn"] {
          border: 1px solid ButtonText;
        }

        [part="result-item"] {
          border: 1px solid ButtonText;
        }
      }

      [part="result-item"].selected {
        background: color-mix(in oklch, var(--auy-color-primary) 10%, transparent);
      }

      [part="result-icon"] {
        flex-shrink: 0;
        inline-size: 1.25rem;
        block-size: 1.25rem;
      }

      [part="result-content"] {
        flex: 1;
        display: grid;
        gap: 0.125rem;
      }

      [part="result-label"] {
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
      }

      [part="result-desc"] {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
      }

      [part="result-cat"] {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-primary);
      }

      [part="empty"] {
        padding: var(--auy-space-xl);
        text-align: center;
        color: var(--auy-color-text-muted);
      }

      [part="footer"] {
        display: flex;
        gap: var(--auy-space-md);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-block-start: 1px solid var(--auy-color-border);
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        justify-content: center;
      }

      @media (prefers-reduced-motion: reduce) {
        [part="overlay"] {
          transition: none;
        }
      }

      @media print {
        [part="overlay"] {
          background: transparent;
        }
      }
    }
  `;
	}
	willUpdate(changed) {
		if (changed.has("items") || changed.has("_query")) this._filtered = this._filterItems();
	}
	shouldUpdate(changed) {
		if (changed.has("open")) return true;
		return this.open;
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window !== "undefined") document.addEventListener("keydown", this._onGlobalKeydown);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (typeof window !== "undefined") document.removeEventListener("keydown", this._onGlobalKeydown);
	}
	updated(changed) {
		if (changed.has("open") && this.open) requestAnimationFrame(() => {
			this._inputEl?.focus();
		});
	}
	_filterItems() {
		if (!this._query) return this.items.slice(0, 10);
		const q = this._query.toLowerCase();
		return this.items.filter((item) => item.label.toLowerCase().includes(q) || item.description && item.description.toLowerCase().includes(q));
	}
	_onInput(e) {
		this._query = e.target.value;
		this._selectedIndex = 0;
	}
	_onKeydown(e) {
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				this._selectedIndex = Math.min(this._selectedIndex + 1, this._filtered.length - 1);
				break;
			case "ArrowUp":
				e.preventDefault();
				this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
				break;
			case "Enter":
				e.preventDefault();
				if (this._filtered[this._selectedIndex]) this._selectItem(this._filtered[this._selectedIndex]);
				break;
			case "Escape":
				e.preventDefault();
				this._close();
				break;
			case "Tab":
				e.preventDefault();
				break;
		}
	}
	_selectItem(item) {
		this.dispatchEvent(new CustomEvent("search-select", {
			detail: item,
			bubbles: true,
			composed: true
		}));
		if (item.href) window.location.href = item.href;
		this._close();
	}
	_close() {
		this.open = false;
		this.dispatchEvent(new CustomEvent("search-close", {
			bubbles: true,
			composed: true
		}));
	}
	_open() {
		this.open = true;
		this._query = "";
		this._selectedIndex = 0;
	}
	_closeOnOverlay(e) {
		if (e.target.getAttribute("part") === "overlay") this._close();
	}
	render() {
		if (!this.open) return nothing;
		const filtered = this._filtered;
		return html`
      <div part="overlay" @click=${this._closeOnOverlay}>
        <div part="panel" role="dialog" aria-modal="true" aria-label="Busca">
          <div part="input-wrapper">
            <span part="search-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" aria-hidden="true" style="inline-size:1.25rem;block-size:1.25rem"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></span>
            <input
              part="input"
              .value=${this._query}
              @input=${this._onInput}
              @keydown=${this._onKeydown}
              placeholder=${this.placeholder}
              aria-label="Buscar"
              autofocus
            />
            <button part="close-btn" @click=${this._close} aria-label="Fechar busca">×</button>
            <kbd part="hint">ESC</kbd>
          </div>
          ${filtered.length > 0 ? html`
            <ul part="results" role="listbox">
              ${keyed(this._filtered, filtered.map((item, idx) => html`
                <li
                  part="result-item"
                  role="option"
                  data-index="${idx}"
                  aria-selected=${this._selectedIndex === idx ? "true" : "false"}
                  class=${classMap({ selected: this._selectedIndex === idx })}
                  @click=${this._handleSelect}
                  @mouseenter=${this._handleMouseEnter}
                >
                  ${item.icon ? html`<span part="result-icon">${item.icon}</span>` : ""}
                  <div part="result-content">
                    <span part="result-label">${highlight(item.label, this._query)}</span>
                    ${item.description ? html`<span part="result-desc">${highlight(item.description, this._query)}</span>` : ""}
                  </div>
                  ${item.category ? html`<span part="result-cat">${item.category}</span>` : ""}
                </li>
              `))}
            </ul>
          ` : html`
            <div part="empty">Nenhum resultado encontrado</div>
          `}
          <div part="footer">
            <span>↑↓ Navegar</span>
            <span>↵ Selecionar</span>
            <span>ESC Fechar</span>
          </div>
        </div>
      </div>
    `;
	}
};
__decorate([property({ type: Array })], AuyInternalSearch.prototype, "items", void 0);
__decorate([property({ type: String })], AuyInternalSearch.prototype, "placeholder", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyInternalSearch.prototype, "open", void 0);
__decorate([property({ type: String })], AuyInternalSearch.prototype, "shortcut", void 0);
__decorate([state()], AuyInternalSearch.prototype, "_query", void 0);
__decorate([state()], AuyInternalSearch.prototype, "_selectedIndex", void 0);
__decorate([state()], AuyInternalSearch.prototype, "_filtered", void 0);
__decorate([query("[part=\"input\"]")], AuyInternalSearch.prototype, "_inputEl", void 0);
AuyInternalSearch = __decorate([customElement("auy-internal-search")], AuyInternalSearch);
//#endregion
//#region src/atomics/metadata.ts
var AuyInternalMetadata = class AuyInternalMetadata extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.title = "";
		this.description = "";
		this.canonical = "";
		this.ogTitle = "";
		this.ogDescription = "";
		this.ogImage = "";
		this.ogUrl = "";
		this.ogType = "website";
		this.ogSiteName = "";
		this.twCard = "summary_large_image";
		this.twSite = "";
		this.twCreator = "";
		this.twTitle = "";
		this.twDescription = "";
		this.twImage = "";
		this.jsonLd = "";
		this.robots = "index, follow";
		this._elements = /* @__PURE__ */ new Map();
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: none;
      }
    }
  `;
	}
	createRenderRoot() {
		return this;
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window === "undefined" || typeof document === "undefined") return;
		this._applyAll();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this._elements.forEach((el) => {
			if (el.parentNode) el.parentNode.removeChild(el);
		});
		this._elements.clear();
	}
	updated(changed) {
		if (typeof window === "undefined" || typeof document === "undefined") return;
		if (changed.has("title")) this._applyTitle();
		if (changed.has("description")) this._applyDescription();
		if (changed.has("canonical")) this._applyCanonical();
		if (changed.has("ogTitle")) this._applyOgTitle();
		if (changed.has("ogDescription")) this._applyOgDescription();
		if (changed.has("ogImage")) this._applyOgImage();
		if (changed.has("ogUrl")) this._applyOgUrl();
		if (changed.has("ogType")) this._applyOgType();
		if (changed.has("ogSiteName")) this._applyOgSiteName();
		if (changed.has("twCard")) this._applyTwCard();
		if (changed.has("twSite")) this._applyTwSite();
		if (changed.has("twCreator")) this._applyTwCreator();
		if (changed.has("twTitle")) this._applyTwTitle();
		if (changed.has("twDescription")) this._applyTwDescription();
		if (changed.has("twImage")) this._applyTwImage();
		if (changed.has("jsonLd")) this._applyJsonLd();
		if (changed.has("robots")) this._applyRobots();
	}
	_applyAll() {
		this._applyTitle();
		this._applyDescription();
		this._applyCanonical();
		this._applyOgTitle();
		this._applyOgDescription();
		this._applyOgImage();
		this._applyOgUrl();
		this._applyOgType();
		this._applyOgSiteName();
		this._applyTwCard();
		this._applyTwSite();
		this._applyTwCreator();
		this._applyTwTitle();
		this._applyTwDescription();
		this._applyTwImage();
		this._applyJsonLd();
		this._applyRobots();
	}
	_applyTitle() {
		document.title = this.title;
	}
	_applyDescription() {
		if (this.description) this._ensureMeta("description", "description");
		else this._removeMeta("description");
	}
	_applyCanonical() {
		if (this.canonical) this._ensureLink("canonical", this.canonical);
		else this._removeLink("canonical");
	}
	_applyOgTitle() {
		if (this.ogTitle) this._ensureMeta("og:title", "og:title");
		else this._removeMeta("og:title");
	}
	_applyOgDescription() {
		if (this.ogDescription) this._ensureMeta("og:description", "og:description");
		else this._removeMeta("og:description");
	}
	_applyOgImage() {
		if (this.ogImage) this._ensureMeta("og:image", "og:image");
		else this._removeMeta("og:image");
	}
	_applyOgUrl() {
		if (this.ogUrl) this._ensureMeta("og:url", "og:url");
		else this._removeMeta("og:url");
	}
	_applyOgType() {
		if (this.ogType) this._ensureMeta("og:type", "og:type");
		else this._removeMeta("og:type");
	}
	_applyOgSiteName() {
		if (this.ogSiteName) this._ensureMeta("og:site_name", "og:site_name");
		else this._removeMeta("og:site_name");
	}
	_applyTwCard() {
		if (this.twCard) this._ensureMeta("twitter:card", "twitter:card");
		else this._removeMeta("twitter:card");
	}
	_applyTwSite() {
		if (this.twSite) this._ensureMeta("twitter:site", "twitter:site");
		else this._removeMeta("twitter:site");
	}
	_applyTwCreator() {
		if (this.twCreator) this._ensureMeta("twitter:creator", "twitter:creator");
		else this._removeMeta("twitter:creator");
	}
	_applyTwTitle() {
		if (this.twTitle) this._ensureMeta("twitter:title", "twitter:title");
		else this._removeMeta("twitter:title");
	}
	_applyTwDescription() {
		if (this.twDescription) this._ensureMeta("twitter:description", "twitter:description");
		else this._removeMeta("twitter:description");
	}
	_applyTwImage() {
		if (this.twImage) this._ensureMeta("twitter:image", "twitter:image");
		else this._removeMeta("twitter:image");
	}
	_applyJsonLd() {
		if (this.jsonLd) this._ensureJsonLd();
		else this._removeJsonLd();
	}
	_applyRobots() {
		if (this.robots) this._ensureMeta("robots", "robots");
		else this._removeMeta("robots");
	}
	_ensureMeta(nameAttr, key) {
		const contentValue = this._getValueForKey(key);
		let el = this._elements.get(key);
		if (!el) el = document.head.querySelector(`meta[name="${nameAttr}"]`);
		if (!el) {
			el = document.createElement("meta");
			el.setAttribute("name", nameAttr);
			el.setAttribute("content", contentValue);
			document.head.appendChild(el);
			this._elements.set(key, el);
		} else {
			el.setAttribute("content", contentValue);
			this._elements.set(key, el);
		}
	}
	_ensureLink(rel, href) {
		let el = this._elements.get(rel);
		if (!el) el = document.head.querySelector(`link[rel="${rel}"]`);
		if (!el) {
			el = document.createElement("link");
			el.setAttribute("rel", rel);
			el.setAttribute("href", href);
			document.head.appendChild(el);
			this._elements.set(rel, el);
		} else {
			el.setAttribute("href", href);
			this._elements.set(rel, el);
		}
	}
	_ensureJsonLd() {
		const key = "json-ld";
		let el = this._elements.get(key);
		if (!el) el = document.head.querySelector("script[type=\"application/ld+json\"]");
		try {
			const parsed = JSON.parse(this.jsonLd);
			const formatted = JSON.stringify(parsed, null, 2);
			if (!el) {
				el = document.createElement("script");
				el.setAttribute("type", "application/ld+json");
				el.textContent = formatted;
				document.head.appendChild(el);
				this._elements.set(key, el);
			} else {
				el.textContent = formatted;
				this._elements.set(key, el);
			}
		} catch {
			if (!el) {
				el = document.createElement("script");
				el.setAttribute("type", "application/ld+json");
				el.textContent = this.jsonLd;
				document.head.appendChild(el);
				this._elements.set(key, el);
			} else {
				el.textContent = this.jsonLd;
				this._elements.set(key, el);
			}
		}
	}
	_getValueForKey(key) {
		switch (key) {
			case "description": return this.description;
			case "og:title": return this.ogTitle;
			case "og:description": return this.ogDescription;
			case "og:image": return this.ogImage;
			case "og:url": return this.ogUrl;
			case "og:type": return this.ogType;
			case "og:site_name": return this.ogSiteName;
			case "twitter:card": return this.twCard;
			case "twitter:site": return this.twSite;
			case "twitter:creator": return this.twCreator;
			case "twitter:title": return this.twTitle;
			case "twitter:description": return this.twDescription;
			case "twitter:image": return this.twImage;
			case "robots": return this.robots;
			default: return "";
		}
	}
	_removeMeta(nameAttr) {
		const key = nameAttr;
		const el = this._elements.get(key);
		if (el && el.parentNode) el.parentNode.removeChild(el);
		this._elements.delete(key);
	}
	_removeLink(rel) {
		const el = this._elements.get(rel);
		if (el && el.parentNode) el.parentNode.removeChild(el);
		this._elements.delete(rel);
	}
	_removeJsonLd() {
		const el = this._elements.get("json-ld");
		if (el && el.parentNode) el.parentNode.removeChild(el);
		this._elements.delete("json-ld");
	}
	render() {
		return html``;
	}
};
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "title", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "description", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "canonical", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "ogTitle", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "ogDescription", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "ogImage", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "ogUrl", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "ogType", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "ogSiteName", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "twCard", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "twSite", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "twCreator", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "twTitle", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "twDescription", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "twImage", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "jsonLd", void 0);
__decorate([property({ type: String })], AuyInternalMetadata.prototype, "robots", void 0);
AuyInternalMetadata = __decorate([customElement("auy-internal-metadata")], AuyInternalMetadata);
//#endregion
//#region src/components/accordion.ts
var AuyAccordion = class AuyAccordion extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.heading = "";
		this.open = false;
		this._open = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      details {
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        overflow: hidden;
        transition: border-color var(--auy-transition);
      }

      details + details {
        margin-block-start: -1px;
        border-radius: 0;
      }

      details:first-of-type {
        border-start-end-radius: var(--auy-radius-md);
        border-start-start-radius: var(--auy-radius-md);
      }

      details:last-of-type {
        border-end-end-radius: var(--auy-radius-md);
        border-end-start-radius: var(--auy-radius-md);
      }

      details[open] {
        border-color: var(--auy-color-primary);
      }

      summary {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        font-weight: 500;
        font-size: var(--auy-text-sm);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        list-style: none;
        -webkit-user-select: none;
      }

      summary::-webkit-details-marker {
        display: none;
      }

      summary::marker {
        display: none;
        content: '';
      }

      summary:hover {
        background: color-mix(in oklch, var(--auy-color-border) 10%, transparent);
      }

      summary:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: -0.125rem;
      }

      .indicator {
        margin-inline-start: auto;
        transition: transform var(--auy-transition);
        font-size: 0.75rem;
        line-height: 1;
        flex-shrink: 0;
      }

      details[open] .indicator {
        transform: rotate(180deg);
      }

      .content {
        padding: var(--auy-space-md);
        padding-block-start: 0;
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
      }

      @media (forced-colors: active) {
        details {
          border: 1px solid ButtonText;
        }
        summary:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: -2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .indicator {
          transition: none;
        }
      }

      @media print {
        details {
          border-color: #000;
        }
        summary {
          font-weight: 700;
        }
      }
    }
  `;
	}
	_toggle(e) {
		const details = e.currentTarget;
		this._open = details.open;
		this.open = details.open;
		this.dispatchEvent(new CustomEvent("toggle", {
			detail: { open: this._open },
			bubbles: true,
			composed: true
		}));
	}
	render() {
		return html`
      <details ?open=${this.open} @toggle=${this._toggle}>
        <summary part="summary">
          <slot name="heading">${this.heading}</slot>
          <span part="indicator" class="indicator" aria-hidden="true">▾</span>
        </summary>
        <div part="content" class="content">
          <slot></slot>
        </div>
      </details>
    `;
	}
};
__decorate([property({ type: String })], AuyAccordion.prototype, "heading", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyAccordion.prototype, "open", void 0);
__decorate([state()], AuyAccordion.prototype, "_open", void 0);
AuyAccordion = __decorate([customElement("auy-accordion")], AuyAccordion);
//#endregion
//#region src/components/dropdown.ts
var AuyDropdown = class AuyDropdown extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.align = "start";
		this.label = "";
		this.open = false;
		this._open = false;
		this._boundKeydown = null;
		this._boundClose = null;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: inline-block;
        position: relative;
        contain: layout style;
      }

      details {
        position: relative;
      }

      summary {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: 0.5rem 0.75rem;
        font-family: inherit;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        line-height: 1.5;
        color: var(--auy-color-text);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        list-style: none;
        -webkit-user-select: none;
        transition: border-color var(--auy-transition-fast), box-shadow var(--auy-transition-fast);
      }

      summary::-webkit-details-marker {
        display: none;
      }

      summary::marker {
        display: none;
        content: '';
      }

      summary:hover {
        border-color: var(--auy-color-text-muted);
      }

      summary:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.0625rem;
      }

      details[open] summary {
        border-color: var(--auy-color-primary);
        border-end-end-radius: 0;
        border-end-start-radius: 0;
      }

      .indicator {
        display: flex;
        align-items: center;
        color: var(--auy-color-text-muted);
        transition: transform var(--auy-transition);
        line-height: 0;
        flex-shrink: 0;
      }

      .indicator svg {
        inline-size: 0.875rem;
        block-size: 0.875rem;
      }

      details[open] .indicator {
        transform: rotate(180deg);
      }

      .menu {
        position: absolute;
        inset-block-start: 100%;
        inset-inline-start: 0;
        min-inline-size: max(100%, 10rem);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-primary);
        border-block-start: none;
        border-radius: 0 0 var(--auy-radius-md) var(--auy-radius-md);
        box-shadow: var(--auy-shadow-lg);
        padding: var(--auy-space-2xs);
        z-index: 100;
        list-style: none;
        margin: 0;
        display: none;
        opacity: 0;
        transform: translateY(-4px);
        transition: display var(--auy-transition, 200ms) allow-discrete,
          opacity var(--auy-transition, 200ms),
          transform var(--auy-transition, 200ms);
        overflow: hidden;
      }

      details[open] .menu {
        display: block;
        opacity: 1;
        transform: translateY(0);
      }

      @starting-style {
        details[open] .menu {
          opacity: 0;
          transform: translateY(-4px);
        }
      }

      :host([align="end"]) .menu {
        inset-inline-start: auto;
        inset-inline-end: 0;
      }

      .menu-items {
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: 0;
        margin: 0;
      }

      .menu ::slotted(*) {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        inline-size: 100%;
        padding: var(--auy-space-sm) var(--auy-space-md);
        font-family: inherit;
        font-size: var(--auy-text-sm);
        line-height: 1.5;
        color: var(--auy-color-text);
        background: none;
        border: none;
        border-radius: var(--auy-radius-sm);
        cursor: pointer;
        text-align: start;
        text-decoration: none;
        transition: background var(--auy-transition-fast);
        touch-action: manipulation;
        box-sizing: border-box;
        white-space: nowrap;
      }

      .menu ::slotted(:hover),
      .menu ::slotted(.highlighted) {
        background: color-mix(in oklch, var(--auy-color-border) 20%, transparent);
        color: var(--auy-color-text);
        text-decoration: none;
      }

      .menu ::slotted(:focus-visible) {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: -0.0625rem;
      }

      .menu ::slotted([aria-current="page"]) {
        background: color-mix(in oklch, var(--auy-color-primary) 10%, transparent);
        color: var(--auy-color-primary);
        font-weight: 600;
      }

      .menu ::slotted([role="separator"]) {
        display: block;
        block-size: 1px;
        padding: 0;
        margin: var(--auy-space-2xs) var(--auy-space-sm);
        background: var(--auy-color-border);
        border: none;
        pointer-events: none;
        inline-size: auto;
        cursor: default;
      }

      .menu ::slotted([role="separator"]):hover {
        background: var(--auy-color-border);
      }

      @media (forced-colors: active) {
        summary {
          border: 1px solid ButtonText;
        }
        .menu {
          border: 1px solid ButtonText;
          border-block-start: none;
        }
        summary:focus-visible,
        .menu ::slotted(:focus-visible) {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .indicator {
          transition: none;
        }
        .menu {
          transition: none;
        }
      }

      @media print {
        .menu {
          display: none !important;
        }
      }
    }
  `;
	}
	_toggle(e) {
		const details = e.currentTarget;
		this._open = details.open;
		this.open = details.open;
		if (this._open) this._openMenu();
		else this._closeMenu();
	}
	_openMenu() {
		this._addOutsideListeners();
		requestAnimationFrame(() => this._focusFirstItem());
	}
	_closeMenu() {
		this._removeOutsideListeners();
	}
	_focusFirstItem() {
		if (!this._menuEl) return;
		const items = this._getItems();
		if (items.length > 0) items[0].focus();
	}
	_getItems() {
		return this._menuEl?.querySelectorAll("a, button, [role=\"menuitem\"], [tabindex]:not([tabindex=\"-1\"])") || new NodeList();
	}
	_navigateItems(direction) {
		const items = Array.from(this._getItems()).filter((el) => el.offsetParent !== null);
		if (items.length === 0) return;
		const currentIdx = items.findIndex((el) => el === document.activeElement);
		items[Math.max(0, Math.min(items.length - 1, currentIdx + direction))]?.focus();
	}
	_addOutsideListeners() {
		if (typeof window === "undefined") return;
		this._boundKeydown = (e) => {
			if (e.key === "Escape") {
				this._close();
				return;
			}
			if (e.key === "ArrowDown" || e.key === "ArrowUp") {
				e.preventDefault();
				this._navigateItems(e.key === "ArrowDown" ? 1 : -1);
			}
		};
		this._boundClose = (e) => {
			if (!e.composedPath().includes(this)) this._close();
		};
		document.addEventListener("keydown", this._boundKeydown);
		document.addEventListener("click", this._boundClose);
	}
	_removeOutsideListeners() {
		if (this._boundKeydown) {
			document.removeEventListener("keydown", this._boundKeydown);
			this._boundKeydown = null;
		}
		if (this._boundClose) {
			document.removeEventListener("click", this._boundClose);
			this._boundClose = null;
		}
	}
	_close() {
		const details = this.shadowRoot?.querySelector("details");
		if (details) {
			details.removeAttribute("open");
			this._open = false;
			this.open = false;
		}
		this._removeOutsideListeners();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this._removeOutsideListeners();
	}
	render() {
		return html`
      <details @toggle=${this._toggle}>
        <summary part="trigger" role="button" aria-haspopup="true" aria-expanded=${this._open ? "true" : "false"}>
          <slot name="trigger">${this.label}</slot>
          <span part="indicator" class="indicator" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
        </summary>
        <div part="menu" class="menu" role="menu">
          <div class="menu-items">
            <slot></slot>
          </div>
        </div>
      </details>
    `;
	}
};
__decorate([property({
	type: String,
	reflect: true
})], AuyDropdown.prototype, "align", void 0);
__decorate([property({ type: String })], AuyDropdown.prototype, "label", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyDropdown.prototype, "open", void 0);
__decorate([state()], AuyDropdown.prototype, "_open", void 0);
__decorate([query(".menu")], AuyDropdown.prototype, "_menuEl", void 0);
AuyDropdown = __decorate([customElement("auy-dropdown")], AuyDropdown);
//#endregion
//#region src/components/nav.ts
var AuyNav = class AuyNav extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.orientation = "horizontal";
		this.variant = "default";
		this.ariaNavLabel = "Navegação";
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      nav {
        display: flex;
        align-items: center;
        gap: var(--auy-space-2xs);
        flex-wrap: wrap;
      }

      :host([variant="tray"]) nav {
        padding: var(--auy-space-2xs);
        background: color-mix(in oklch, var(--auy-color-border) 8%, transparent);
        border-radius: var(--auy-radius-lg);
      }

      :host([orientation="vertical"]) nav {
        flex-direction: column;
        align-items: stretch;
      }

      /* ── Links: navegação textual ── */
      ::slotted(a) {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: 0.5rem 0.75rem;
        font-family: inherit;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        line-height: 1.5;
        color: var(--auy-color-text-muted);
        text-decoration: none;
        border-radius: var(--auy-radius-md);
        white-space: nowrap;
        background: none;
        border: none;
        cursor: pointer;
        touch-action: manipulation;
        transition: background var(--auy-transition-fast), color var(--auy-transition-fast);
      }

      ::slotted(a:hover) {
        background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
        color: var(--auy-color-text);
      }

      ::slotted(a[aria-current="page"]) {
        background: var(--auy-color-surface);
        color: var(--auy-color-primary);
        font-weight: 600;
        box-shadow: 0 1px 3px oklch(0% 0 0 / 0.08);
      }

      :host([variant="tray"]) ::slotted(a[aria-current="page"]) {
        box-shadow: 0 1px 3px oklch(0% 0 0 / 0.1), 0 1px 2px oklch(0% 0 0 / 0.06);
      }

      /* ── Buttons: ação visual destacada ── */
      ::slotted(button) {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-xs);
        padding: 0.5rem 0.875rem;
        font-family: inherit;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        line-height: 1.5;
        color: var(--auy-color-primary);
        text-decoration: none;
        border-radius: var(--auy-radius-md);
        white-space: nowrap;
        background: color-mix(in oklch, var(--auy-color-primary) 8%, transparent);
        border: 1px solid color-mix(in oklch, var(--auy-color-primary) 20%, transparent);
        cursor: pointer;
        touch-action: manipulation;
        transition: background var(--auy-transition-fast), color var(--auy-transition-fast), border-color var(--auy-transition-fast), box-shadow var(--auy-transition-fast);
      }

      ::slotted(button:hover) {
        background: var(--auy-color-primary);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-primary);
        box-shadow: 0 1px 3px oklch(0% 0 0 / 0.12);
      }

      ::slotted(button:active) {
        background: var(--auy-color-primary-active);
        border-color: var(--auy-color-primary-active);
      }

      ::slotted(button[aria-current="page"]) {
        background: var(--auy-color-primary);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-primary);
        box-shadow: 0 1px 3px oklch(0% 0 0 / 0.12);
      }

      /* ── Variante underline: só afeta links ── */
      :host([variant="underline"]) ::slotted(a) {
        border-radius: 0;
        padding: 0.5rem 0.875rem;
        border-block-end: 2px solid transparent;
        margin-block-end: 0;
      }

      :host([variant="underline"]) ::slotted(a:hover) {
        background: none;
        border-block-end-color: var(--auy-color-text-muted);
      }

      :host([variant="underline"]) ::slotted(a[aria-current="page"]) {
        background: none;
        box-shadow: none;
        border-block-end-color: var(--auy-color-primary);
      }

      :host([variant="underline"][orientation="vertical"]) ::slotted(a) {
        border-block-end: none;
        border-inline-start: 2px solid transparent;
        margin-inline-end: 0;
      }

      :host([variant="underline"][orientation="vertical"]) ::slotted(a:hover) {
        border-block-end-color: transparent;
        border-inline-start-color: var(--auy-color-text-muted);
      }

      :host([variant="underline"][orientation="vertical"]) ::slotted(a[aria-current="page"]) {
        border-block-end-color: transparent;
        border-inline-start-color: var(--auy-color-primary);
        background: color-mix(in oklch, var(--auy-color-primary) 6%, transparent);
      }

      ::slotted(a:focus-visible),
      ::slotted(button:focus-visible) {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.0625rem;
      }

      @media (forced-colors: active) {
        ::slotted(a[aria-current="page"]) {
          border: 1px solid Highlight;
        }
        ::slotted(a:focus-visible),
        ::slotted(button:focus-visible) {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media print {
        nav {
          display: flex !important;
        }
      }
    }
  `;
	}
	render() {
		return html`
      <nav part="nav" aria-label=${this.ariaNavLabel}>
        <slot></slot>
      </nav>
    `;
	}
};
__decorate([property({
	type: String,
	reflect: true
})], AuyNav.prototype, "orientation", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyNav.prototype, "variant", void 0);
__decorate([property({
	type: String,
	attribute: "aria-label"
})], AuyNav.prototype, "ariaNavLabel", void 0);
AuyNav = __decorate([customElement("auy-nav")], AuyNav);
//#endregion
//#region src/components/progress.ts
var AuyProgress = class AuyProgress extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.value = 0;
		this.max = 100;
		this.variant = "default";
		this.indeterminate = false;
		this.label = "";
		this.showPercent = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .progress {
        position: relative;
        block-size: 0.5rem;
        border-radius: var(--auy-radius-full);
        background: color-mix(in oklch, var(--auy-color-border) 50%, transparent);
        overflow: hidden;
      }

      .bar {
        block-size: 100%;
        border-radius: var(--auy-radius-full);
        background: var(--auy-color-primary);
        transition: inline-size var(--auy-transition-slow) ease;
        min-inline-size: 0;
      }

      :host([variant="success"]) .bar {
        background: var(--auy-color-success);
      }

      :host([variant="warning"]) .bar {
        background: var(--auy-color-warning);
      }

      :host([variant="error"]) .bar {
        background: var(--auy-color-error);
      }

      :host([indeterminate]) .bar {
        inline-size: 30% !important;
        animation: indeterminate 1.5s ease infinite;
      }

      @keyframes indeterminate {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }

      .label {
        display: flex;
        justify-content: space-between;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        margin-block-end: var(--auy-space-xs);
      }

      @media (forced-colors: active) {
        .progress {
          border: 1px solid ButtonText;
        }
        .bar {
          background: Highlight;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .bar,
        :host([indeterminate]) .bar {
          animation: none;
          transition: none;
        }
      }

      @media print {
        .progress {
          border: 1px solid #000;
          background: none;
        }
        .bar {
          background: #000;
        }
      }
    }
  `;
	}
	render() {
		const pct = this.indeterminate ? 0 : Math.min(100, Math.max(0, this.value / this.max * 100));
		return html`
      ${this.label || this.showPercent ? html`
        <div part="label" class="label">
          ${this.label ? html`<span>${this.label}</span>` : nothing}
          ${this.showPercent && !this.indeterminate ? html`<span>${Math.round(pct)}%</span>` : nothing}
        </div>
      ` : nothing}
      <div part="progress" class="progress" role="progressbar" aria-valuenow=${this.indeterminate ? nothing : this.value} aria-valuemin="0" aria-valuemax=${this.max} aria-label=${this.label || "Progresso"}>
        <div part="bar" class="bar" style=${this.indeterminate ? nothing : `inline-size: ${pct}%`}></div>
      </div>
    `;
	}
};
__decorate([property({ type: Number })], AuyProgress.prototype, "value", void 0);
__decorate([property({ type: Number })], AuyProgress.prototype, "max", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyProgress.prototype, "variant", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyProgress.prototype, "indeterminate", void 0);
__decorate([property({ type: String })], AuyProgress.prototype, "label", void 0);
__decorate([property({ type: Boolean })], AuyProgress.prototype, "showPercent", void 0);
AuyProgress = __decorate([customElement("auy-progress")], AuyProgress);
//#endregion
//#region src/components/container.ts
var AuyContainer = class AuyContainer extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.fluid = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .container {
        max-inline-size: var(--auy-container-max, 75rem);
        margin-inline: auto;
        padding-inline: var(--auy-container-padding, var(--auy-space-lg));
        box-sizing: content-box;
      }

      :host([fluid]) .container {
        max-inline-size: none;
      }
    }
  `;
	}
	render() {
		return html`
      <div part="container" class="container">
        <slot></slot>
      </div>
    `;
	}
};
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyContainer.prototype, "fluid", void 0);
AuyContainer = __decorate([customElement("auy-container")], AuyContainer);
//#endregion
//#region src/components/section.ts
var AuySection = class AuySection extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.heading = "";
		this.description = "";
		this.compact = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      section {
        padding-block: var(--auy-section-padding, var(--auy-space-xl));
      }

      :host([compact]) section {
        padding-block: var(--auy-space-md);
      }

      .header {
        margin-block-end: var(--auy-space-lg);
      }

      h2 {
        font-size: var(--auy-text-xl);
        font-weight: 600;
        color: var(--auy-color-text);
        margin: 0;
      }

      .description {
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        margin-block-start: var(--auy-space-xs);
      }

      .content {
        display: grid;
        gap: var(--auy-space-md);
      }
    }
  `;
	}
	render() {
		return html`
      <section part="section">
        ${this.heading || this.description ? html`
          <div part="header" class="header">
            ${this.heading ? html`<h2 part="heading">${this.heading}</h2>` : nothing}
            ${this.description ? html`<p part="description" class="description">${this.description}</p>` : nothing}
          </div>
        ` : nothing}
        <div part="content" class="content">
          <slot></slot>
        </div>
      </section>
    `;
	}
};
__decorate([property({ type: String })], AuySection.prototype, "heading", void 0);
__decorate([property({ type: String })], AuySection.prototype, "description", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuySection.prototype, "compact", void 0);
AuySection = __decorate([customElement("auy-section")], AuySection);
//#endregion
//#region src/components/file-input.ts
var AuyFileInput = class AuyFileInput extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.multiple = false;
		this.accept = "";
		this.maxSize = 5 * 1024 * 1024;
		this._files = [];
		this._dragover = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      label {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
        margin-block-end: var(--auy-space-xs);
      }

      .dropzone {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-xl);
        border: 2px dashed var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        background: color-mix(in oklch, var(--auy-color-border) 5%, transparent);
        cursor: pointer;
        transition: border-color var(--auy-transition), background var(--auy-transition);
        touch-action: manipulation;
      }

      .dropzone:hover,
      .dropzone.dragover {
        border-color: var(--auy-color-primary);
        background: color-mix(in oklch, var(--auy-color-primary) 5%, transparent);
      }

      .dropzone:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .icon {
        font-size: 2rem;
        line-height: 1;
        opacity: 0.4;
      }

      .text {
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        text-align: center;
      }

      .hint {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        opacity: 0.7;
      }

      input[type="file"] {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
      }

      .files {
        display: grid;
        gap: var(--auy-space-xs);
        margin-block-start: var(--auy-space-sm);
      }

      .file-item {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-xs) var(--auy-space-sm);
        border-radius: var(--auy-radius-sm);
        background: color-mix(in oklch, var(--auy-color-border) 10%, transparent);
        font-size: var(--auy-text-sm);
      }

      .file-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .file-size {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        flex-shrink: 0;
      }

      .remove {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.25rem;
        block-size: 1.25rem;
        border-radius: var(--auy-radius-sm);
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        opacity: 0.5;
        transition: opacity var(--auy-transition-fast);
        touch-action: manipulation;
        flex-shrink: 0;
      }

      .remove:hover {
        opacity: 1;
      }

      .remove:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .dropzone {
          border: 2px solid ButtonText;
        }
        .dropzone:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
        .remove:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media print {
        .file-item {
          display: none;
        }
      }
    }
  `;
	}
	_handleChange(e) {
		const input = e.target;
		if (input.files) this._addFiles(Array.from(input.files));
		input.value = "";
	}
	_handleDrop(e) {
		e.preventDefault();
		this._dragover = false;
		if (e.dataTransfer?.files) this._addFiles(Array.from(e.dataTransfer.files));
	}
	_addFiles(newFiles) {
		const filtered = newFiles.filter((f) => f.size <= this.maxSize);
		if (this.multiple) this._files = [...this._files, ...filtered];
		else this._files = filtered.slice(0, 1);
		this._dispatchChange();
	}
	_removeFile(index) {
		this._files = this._files.filter((_, i) => i !== index);
		this._dispatchChange();
	}
	_dispatchChange() {
		this.dispatchEvent(new CustomEvent("change", {
			detail: { files: this._files },
			bubbles: true,
			composed: true
		}));
	}
	_formatSize(bytes) {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}
	get files() {
		return this._files;
	}
	clear() {
		this._files = [];
		this._dispatchChange();
	}
	render() {
		return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div
        part="dropzone"
        class="dropzone ${this._dragover ? "dragover" : ""}"
        @dragover=${(e) => {
			e.preventDefault();
			this._dragover = true;
		}}
        @dragleave=${() => {
			this._dragover = false;
		}}
        @drop=${this._handleDrop}
      >
        <div part="icon" class="icon" aria-hidden="true">📄</div>
        <div part="text" class="text">Arraste arquivos aqui ou clique para selecionar</div>
        <div part="hint" class="hint">${this.accept ? `Formatos: ${this.accept}` : ""}${this.maxSize ? `${this.accept ? " · " : ""}Max: ${this._formatSize(this.maxSize)}` : ""}</div>
        <input
          type="file"
          ?multiple=${this.multiple}
          accept=${this.accept || nothing}
          @change=${this._handleChange}
          aria-label=${this.label || "Selecionar arquivo"}
        />
      </div>
      ${this._files.length > 0 ? html`
        <div part="files" class="files">
          ${this._files.map((f, i) => html`
            <div part="file-item" class="file-item">
              <span part="file-name" class="file-name">${f.name}</span>
              <span part="file-size" class="file-size">${this._formatSize(f.size)}</span>
              <button part="remove" class="remove" @click=${() => this._removeFile(i)} aria-label="Remover ${f.name}">&times;</button>
            </div>
          `)}
        </div>
      ` : nothing}
    `;
	}
};
__decorate([property({ type: String })], AuyFileInput.prototype, "label", void 0);
__decorate([property({ type: Boolean })], AuyFileInput.prototype, "multiple", void 0);
__decorate([property({ type: String })], AuyFileInput.prototype, "accept", void 0);
__decorate([property({ type: Number })], AuyFileInput.prototype, "maxSize", void 0);
__decorate([state()], AuyFileInput.prototype, "_files", void 0);
__decorate([state()], AuyFileInput.prototype, "_dragover", void 0);
AuyFileInput = __decorate([customElement("auy-file-input")], AuyFileInput);
//#endregion
//#region src/components/range-input.ts
var AuyRangeInput = class AuyRangeInput extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.value = 50;
		this.min = 0;
		this.max = 100;
		this.step = 1;
		this.label = "";
		this.showTicks = false;
		this.showMinMax = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      label {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
        margin-block-end: var(--auy-space-xs);
      }

      .wrapper {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--auy-space-md);
      }

      input[type="range"] {
        flex: 1;
        padding: 0;
        border: none;
        background: none;
        accent-color: var(--auy-color-primary);
        cursor: pointer;
        touch-action: manipulation;
        block-size: 1.5rem;
        margin: 0;
      }

      input[type="range"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
        border-radius: var(--auy-radius-sm);
      }

      .value {
        font-size: var(--auy-text-sm);
        font-weight: 600;
        color: var(--auy-color-text);
        min-inline-size: 2.5rem;
        text-align: end;
        font-variant-numeric: tabular-nums;
      }

      .min,
      .max {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
      }

      .ticks {
        display: flex;
        justify-content: space-between;
        padding-inline: 0;
        margin-block-start: var(--auy-space-2xs);
      }

      .tick {
        inline-size: 1px;
        block-size: 0.375rem;
        background: var(--auy-color-border);
      }

      @media (forced-colors: active) {
        input[type="range"]:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media print {
        input[type="range"] {
          border: 1px solid #000;
        }
      }
    }
  `;
	}
	_handleInput(e) {
		const input = e.target;
		this.value = Number(input.value);
		this.dispatchEvent(new CustomEvent("change", {
			detail: { value: this.value },
			bubbles: true,
			composed: true
		}));
	}
	render() {
		const ticks = this.showTicks ? Array.from({ length: Math.min(11, Math.floor((this.max - this.min) / this.step) + 1) }, (_, i) => i) : null;
		return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div class="wrapper">
        ${this.showMinMax ? html`<span class="min">${this.min}</span>` : nothing}
        <input
          part="input"
          type="range"
          .value=${String(this.value)}
          min=${this.min}
          max=${this.max}
          step=${this.step}
          @input=${this._handleInput}
          aria-label=${this.label || "Selecionar valor"}
        />
        ${this.showMinMax ? html`<span class="max">${this.max}</span>` : nothing}
        <span part="value" class="value">${this.value}</span>
      </div>
      ${ticks ? html`<div class="ticks" aria-hidden="true">${ticks.map(() => html`<span class="tick"></span>`)}</div>` : nothing}
    `;
	}
};
__decorate([property({ type: Number })], AuyRangeInput.prototype, "value", void 0);
__decorate([property({ type: Number })], AuyRangeInput.prototype, "min", void 0);
__decorate([property({ type: Number })], AuyRangeInput.prototype, "max", void 0);
__decorate([property({ type: Number })], AuyRangeInput.prototype, "step", void 0);
__decorate([property({ type: String })], AuyRangeInput.prototype, "label", void 0);
__decorate([property({ type: Boolean })], AuyRangeInput.prototype, "showTicks", void 0);
__decorate([property({ type: Boolean })], AuyRangeInput.prototype, "showMinMax", void 0);
AuyRangeInput = __decorate([customElement("auy-range-input")], AuyRangeInput);
//#endregion
//#region src/components/color-input.ts
function hsvToSrgb(H, S, V) {
	H = (H % 360 + 360) % 360;
	S = Math.max(0, Math.min(1, S));
	V = Math.max(0, Math.min(1, V));
	const c = V * S;
	const x = c * (1 - Math.abs(H / 60 % 2 - 1));
	const m = V - c;
	let r, g, b;
	if (H < 60) {
		r = c;
		g = x;
		b = 0;
	} else if (H < 120) {
		r = x;
		g = c;
		b = 0;
	} else if (H < 180) {
		r = 0;
		g = c;
		b = x;
	} else if (H < 240) {
		r = 0;
		g = x;
		b = c;
	} else if (H < 300) {
		r = x;
		g = 0;
		b = c;
	} else {
		r = c;
		g = 0;
		b = x;
	}
	return [
		r + m,
		g + m,
		b + m
	];
}
function srgbToHsv(r, g, b) {
	const mx = Math.max(r, g, b);
	const d = mx - Math.min(r, g, b);
	let H = 0;
	if (d !== 0) {
		if (mx === r) H = ((g - b) / d + 6) % 6;
		else if (mx === g) H = (b - r) / d + 2;
		else H = (r - g) / d + 4;
		H *= 60;
	}
	const S = mx === 0 ? 0 : d / mx;
	return [
		H,
		S,
		mx
	];
}
function hexToSrgb(hex) {
	const m = hex.replace(/^#/, "").match(/^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
	if (!m) return [
		.23,
		.6,
		.96
	];
	return [
		parseInt(m[1], 16) / 255,
		parseInt(m[2], 16) / 255,
		parseInt(m[3], 16) / 255
	];
}
function hexToHsv(hex) {
	return srgbToHsv(...hexToSrgb(hex));
}
function clamp(v, lo, hi) {
	return Math.max(lo, Math.min(hi, v));
}
function formatHex(H, S, V) {
	const [r, g, b] = hsvToSrgb(H, S, V);
	const toH = (c) => Math.round(clamp(c, 0, 1) * 255).toString(16).padStart(2, "0");
	return `#${toH(r)}${toH(g)}${toH(b)}`.toUpperCase();
}
function formatRgb(H, S, V) {
	const [r, g, b] = hsvToSrgb(H, S, V);
	return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}
function formatHsl(H, S, V) {
	const [r, g, b] = hsvToSrgb(H, S, V);
	const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
	const l = (mx + mn) / 2;
	if (mx === mn) return `hsl(0, 0%, ${Math.round(l * 100)}%)`;
	const d = mx - mn;
	const s = l > .5 ? d / (2 - mx - mn) : d / (mx + mn);
	let h = 0;
	if (mx === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
	else if (mx === g) h = ((b - r) / d + 2) * 60;
	else h = ((r - g) / d + 4) * 60;
	return `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
function formatOklch(H, S, V) {
	const [r, g, b] = hsvToSrgb(H, S, V);
	const [rr, gg, bb] = [
		srgbInv(r),
		srgbInv(g),
		srgbInv(b)
	];
	const l = Math.cbrt(.4122214708 * rr + .5363325363 * gg + .0514459929 * bb);
	const m = Math.cbrt(.2119034982 * rr + .6806995451 * gg + .1073969566 * bb);
	const s = Math.cbrt(.0883024619 * rr + .2817188376 * gg + .6299787005 * bb);
	const L = .2104542553 * l + .793617785 * m - .0040720468 * s;
	const a = 1.9779984951 * l - 2.428592205 * m + .4505937099 * s;
	const cb = .0259040371 * l + .7827717662 * m - .808675766 * s;
	const C = Math.sqrt(a * a + cb * cb);
	let hue = Math.atan2(cb, a) * (180 / Math.PI);
	if (hue < 0) hue += 360;
	return `oklch(${(L * 100).toFixed(1)}% ${(C * 100).toFixed(1)} ${hue.toFixed(0)})`;
}
function srgbInv(c) {
	const a = Math.abs(c);
	return a > .04045 ? Math.sign(c) * Math.pow((a + .055) / 1.055, 2.4) : c / 12.92;
}
var AuyColorInput = class AuyColorInput extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.value = "#3b82f6";
		this.label = "";
		this.showEyedropper = true;
		this._H = 210;
		this._S = .6;
		this._V = .96;
		this._updatingValue = false;
		this._dragTarget = null;
		this._drawPending = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host { display: block; contain: layout style; }

      label {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
        margin-block-end: var(--auy-space-xs);
      }

      .picker {
        display: grid;
        gap: var(--auy-space-md);
        padding: var(--auy-space-md);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-lg);
      }

      /* ── Hue ring + SV triangle ── */
      .hsv-wrap {
        position: relative;
        inline-size: 100%;
        aspect-ratio: 1 / 1;
        max-block-size: 260px;
        margin-inline: auto;
        cursor: crosshair;
        touch-action: none;
      }

      .hsv-wrap canvas {
        display: block;
        inline-size: 100%;
        block-size: 100%;
      }

      .hsv-ring-indicator {
        position: absolute;
        pointer-events: none;
        inline-size: 14px; block-size: 14px;
        border: 2.5px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0,0,0,.35), 0 2px 6px rgba(0,0,0,.2);
        translate: -50% -50%;
        z-index: 2;
      }

      .hsv-tri-crosshair {
        position: absolute;
        pointer-events: none;
        inline-size: 12px; block-size: 12px;
        border: 2px solid #fff;
        border-radius: 50%;
        box-shadow: 0 0 0 1px rgba(0,0,0,.3), 0 2px 6px rgba(0,0,0,.2);
        translate: -50% -50%;
        z-index: 1;
      }

      /* ── Format chips ── */
      .formats { display: flex; flex-wrap: wrap; gap: var(--auy-space-2xs); }

      .format-chip {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: .2em .5em;
        font-family: var(--auy-font-mono);
        font-size: var(--auy-text-xs);
        border-radius: var(--auy-radius-sm);
        border: 1px solid var(--auy-color-border);
        background: var(--auy-color-surface-alt);
        color: var(--auy-color-text-muted);
        cursor: pointer;
        transition: background var(--auy-transition-fast), border-color var(--auy-transition-fast);
        line-height: 1.5; user-select: none;
        touch-action: manipulation; white-space: nowrap;
      }

      .format-chip:hover {
        border-color: var(--auy-color-primary);
        background: color-mix(in oklch, var(--auy-color-primary) 6%, transparent);
      }

      .format-chip:focus-visible {
        outline: .125rem solid var(--auy-color-primary);
        outline-offset: 1px;
      }

      .format-chip.copied {
        border-color: var(--auy-color-success);
        color: var(--auy-color-success);
      }

      /* ── Eyedropper ── */
      .eyedropper {
        display: inline-flex; align-items: center; justify-content: center;
        inline-size: 2rem; block-size: 2rem;
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-sm);
        background: var(--auy-color-surface);
        cursor: pointer; touch-action: manipulation;
        font-size: 1rem; line-height: 1;
        transition: background var(--auy-transition-fast);
        flex-shrink: 0;
      }

      .eyedropper:hover { background: var(--auy-color-surface-alt); }
      .eyedropper:focus-visible { outline: .125rem solid var(--auy-color-primary); outline-offset: 2px; }

      .toolbar { display: flex; gap: var(--auy-space-sm); align-items: center; }
      .toolbar .formats { flex: 1; }

      @media (forced-colors: active) { .picker { border: 1px solid ButtonText; } }
      @media (prefers-reduced-motion: reduce) { .hsv-ring-indicator, .hsv-tri-crosshair { transition: none; } }
    }
  `;
	}
	willUpdate(changed) {
		if (changed.has("value") && !this._updatingValue) {
			if (/^#[0-9a-f]{6}$/i.test(this.value)) {
				const [H, S, V] = hexToHsv(this.value);
				this._H = H;
				this._S = S;
				this._V = V;
				this._scheduleRender();
			}
		}
	}
	firstUpdated() {
		this._draw();
	}
	updated(changed) {
		if (changed.has("_H") || changed.has("_S") || changed.has("_V")) {
			this._draw();
			this._syncValue();
		}
	}
	_syncValue() {
		if (this._updatingValue) return;
		this._updatingValue = true;
		const hex = formatHex(this._H, this._S, this._V);
		this.value = hex;
		this._updatingValue = false;
		this.dispatchEvent(new CustomEvent("change", {
			detail: {
				value: hex,
				hsv: {
					H: this._H,
					S: this._S,
					V: this._V
				}
			},
			bubbles: true,
			composed: true
		}));
	}
	_scheduleRender() {
		if (this._drawPending) return;
		this._drawPending = true;
		requestAnimationFrame(() => {
			this._drawPending = false;
			this._draw();
		});
	}
	_draw() {
		const cvs = this._canvas;
		if (!cvs?.parentElement) return;
		const rect = cvs.parentElement.getBoundingClientRect();
		const dpr = devicePixelRatio || 1;
		const w = Math.round(rect.width * dpr), h = Math.round(rect.height * dpr);
		if (!w || !h) return;
		cvs.width = w;
		cvs.height = h;
		const ctx = cvs.getContext("2d");
		if (!ctx) return;
		const cx = w / 2, cy = h / 2;
		const half = Math.min(cx, cy);
		const rOuter = half * .96;
		const rInner = half * .7;
		const ri = rInner - 1;
		const triTop = [cx, cy - ri * .82];
		const triLeft = [cx - ri * .72, cy + ri * .48];
		const triRight = [cx + ri * .72, cy + ri * .48];
		const triDenom = (triLeft[1] - triRight[1]) * (triTop[0] - triRight[0]) + (triRight[0] - triLeft[0]) * (triTop[1] - triRight[1]);
		const curH = this._H;
		const img = ctx.createImageData(w, h);
		const d = img.data;
		for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
			const dx = x - cx, dy = y - cy;
			const dist = Math.sqrt(dx * dx + dy * dy);
			let r = 0, g = 0, b = 0, a = 0;
			if (dist >= rInner && dist <= rOuter) {
				const H = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
				[r, g, b] = hsvToSrgb(H, 1, 1);
				a = 255;
			}
			if (dist < rInner) {
				const w0 = ((triLeft[1] - triRight[1]) * (x - triRight[0]) + (triRight[0] - triLeft[0]) * (y - triRight[1])) / triDenom;
				const w1 = ((triRight[1] - triTop[1]) * (x - triRight[0]) + (triTop[0] - triRight[0]) * (y - triRight[1])) / triDenom;
				const w2 = 1 - w0 - w1;
				if (w0 >= 0 && w1 >= 0 && w2 >= 0) {
					const S = w1 + w2;
					const V = w0 + w2;
					[r, g, b] = hsvToSrgb(curH, clamp(S, 0, 1), clamp(V, 0, 1));
					a = 255;
				}
			}
			const i = (y * w + x) * 4;
			d[i] = clamp(r * 255, 0, 255);
			d[i + 1] = clamp(g * 255, 0, 255);
			d[i + 2] = clamp(b * 255, 0, 255);
			d[i + 3] = a;
		}
		ctx.clearRect(0, 0, w, h);
		const off = document.createElement("canvas");
		off.width = w;
		off.height = h;
		off.getContext("2d").putImageData(img, 0, 0);
		ctx.save();
		ctx.beginPath();
		ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
		ctx.arc(cx, cy, rInner, 0, Math.PI * 2, true);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(off, 0, 0);
		ctx.restore();
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(triTop[0], triTop[1]);
		ctx.lineTo(triLeft[0], triLeft[1]);
		ctx.lineTo(triRight[0], triRight[1]);
		ctx.closePath();
		ctx.clip();
		ctx.drawImage(off, 0, 0);
		ctx.restore();
		cvs.style.inlineSize = `${rect.width}px`;
		cvs.style.blockSize = `${rect.height}px`;
	}
	_pt(e) {
		return "touches" in e ? e.touches[0] : e;
	}
	_onDown(e) {
		const rect = this._canvas.parentElement.getBoundingClientRect();
		const pt = this._pt(e);
		const cx = rect.width / 2, cy = rect.height / 2;
		const dx = pt.clientX - rect.left - cx, dy = pt.clientY - rect.top - cy;
		const dist = Math.sqrt(dx * dx + dy * dy);
		const half = Math.min(cx, cy);
		const rInner = half * .7;
		const rOuter = half * .96;
		if (dist >= rInner && dist <= rOuter) {
			this._dragTarget = "ring";
			this._updateRing(e);
		} else if (dist < rInner) {
			this._dragTarget = "tri";
			this._updateTri(e);
		} else this._dragTarget = null;
	}
	_onMove(e) {
		if (this._dragTarget === "ring") this._updateRing(e);
		else if (this._dragTarget === "tri") this._updateTri(e);
	}
	_updateRing(e) {
		const rect = this._canvas.parentElement.getBoundingClientRect();
		const pt = this._pt(e);
		const cx = rect.width / 2, cy = rect.height / 2;
		const dx = pt.clientX - rect.left - cx, dy = pt.clientY - rect.top - cy;
		this._H = (Math.atan2(dy, dx) * 180 / Math.PI + 360) % 360;
	}
	_updateTri(e) {
		const rect = this._canvas.parentElement.getBoundingClientRect();
		const pt = this._pt(e);
		const x = pt.clientX - rect.left, y = pt.clientY - rect.top;
		const w = rect.width, h = rect.height;
		const cx = w / 2, cy = h / 2;
		const ri = Math.min(cx, cy) * .7 - 2;
		const triTop = [cx, cy - ri * .82];
		const triLeft = [cx - ri * .72, cy + ri * .48];
		const triRight = [cx + ri * .72, cy + ri * .48];
		const denom = (triLeft[1] - triRight[1]) * (triTop[0] - triRight[0]) + (triRight[0] - triLeft[0]) * (triTop[1] - triRight[1]);
		let w0 = ((triLeft[1] - triRight[1]) * (x - triRight[0]) + (triRight[0] - triLeft[0]) * (y - triRight[1])) / denom;
		let w1 = ((triRight[1] - triTop[1]) * (x - triRight[0]) + (triTop[0] - triRight[0]) * (y - triRight[1])) / denom;
		let w2 = 1 - w0 - w1;
		w0 = clamp(w0, 0, 1);
		w1 = clamp(w1, 0, 1);
		w2 = clamp(w2, 0, 1);
		const sum = w0 + w1 + w2;
		if (sum <= 0) return;
		w0 /= sum;
		w1 /= sum;
		w2 /= sum;
		this._S = clamp(w1 + w2, 0, 1);
		this._V = clamp(w0 + w2, 0, 1);
		if (this._S === 0) this._H = 0;
	}
	_onDragEnd() {
		this._dragTarget = null;
	}
	_ringIndicatorX() {
		const wrap = this._canvas?.parentElement;
		if (!wrap) return 50;
		const rect = wrap.getBoundingClientRect();
		const half = Math.min(rect.width, rect.height) / 2;
		const r = (half * .96 + half * .7) / 2;
		const cx = rect.width / 2;
		const rad = this._H * Math.PI / 180;
		return (cx + r * Math.cos(rad)) / rect.width * 100;
	}
	_ringIndicatorY() {
		const wrap = this._canvas?.parentElement;
		if (!wrap) return 50;
		const rect = wrap.getBoundingClientRect();
		const half = Math.min(rect.width, rect.height) / 2;
		const r = (half * .96 + half * .7) / 2;
		const cy = rect.height / 2;
		const rad = this._H * Math.PI / 180;
		return (cy + r * Math.sin(rad)) / rect.height * 100;
	}
	_triCrosshairX() {
		const wrap = this._canvas?.parentElement;
		if (!wrap) return 50;
		const rect = wrap.getBoundingClientRect();
		const cx = rect.width / 2, cy = rect.height / 2;
		const ri = Math.min(cx, cy) * .7 - 2;
		const S = this._S, V = this._V;
		let w0 = 1 - S, w1 = 1 - V, w2 = S + V - 1;
		const sum = w0 + w1 + w2;
		if (sum <= 0) {
			w0 = 1 / 3;
			w1 = 1 / 3;
			w2 = 1 / 3;
		} else {
			w0 /= sum;
			w1 /= sum;
			w2 /= sum;
		}
		return (w0 * cx + w1 * (cx - ri * .72) + w2 * (cx + ri * .72)) / rect.width * 100;
	}
	_triCrosshairY() {
		const wrap = this._canvas?.parentElement;
		if (!wrap) return 50;
		const rect = wrap.getBoundingClientRect();
		const cx = rect.width / 2, cy = rect.height / 2;
		const ri = Math.min(cx, cy) * .7 - 2;
		const S = this._S, V = this._V;
		let w0 = 1 - S, w1 = 1 - V, w2 = S + V - 1;
		const sum = w0 + w1 + w2;
		if (sum <= 0) {
			w0 = 1 / 3;
			w1 = 1 / 3;
			w2 = 1 / 3;
		} else {
			w0 /= sum;
			w1 /= sum;
			w2 /= sum;
		}
		return (w0 * (cy - ri * .82) + w1 * (cy + ri * .48) + w2 * (cy + ri * .48)) / rect.height * 100;
	}
	_fmt(f) {
		switch (f) {
			case "hex": return formatHex(this._H, this._S, this._V);
			case "rgb": return formatRgb(this._H, this._S, this._V);
			case "hsl": return formatHsl(this._H, this._S, this._V);
			case "oklch": return formatOklch(this._H, this._S, this._V);
		}
	}
	async _copy(f, e) {
		try {
			await navigator.clipboard.writeText(this._fmt(f));
		} catch {}
		e.currentTarget.focus();
		this.dispatchEvent(new CustomEvent("copy-" + f, {
			bubbles: true,
			composed: true
		}));
	}
	async _pickEyedropper() {
		if (!("EyeDropper" in window)) return;
		try {
			const r = await new window.EyeDropper().open();
			if (r?.sRGBHex) {
				const [H, S, V] = hexToHsv(r.sRGBHex);
				this._H = H;
				this._S = S;
				this._V = V;
				this._scheduleRender();
			}
		} catch {}
	}
	render() {
		return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div part="picker" class="picker">
        <div class="hsv-wrap"
          @mousedown=${this._onDown} @mousemove=${this._onMove}
          @mouseup=${this._onDragEnd} @mouseleave=${this._onDragEnd}
          @touchstart=${this._onDown} @touchmove=${this._onMove}
          @touchend=${this._onDragEnd}
        >
          <canvas></canvas>
          <div class="hsv-ring-indicator"
            style="inset-inline-start:${this._ringIndicatorX()}%;inset-block-start:${this._ringIndicatorY()}%;">
          </div>
          <div class="hsv-tri-crosshair"
            style="inset-inline-start:${this._triCrosshairX()}%;inset-block-start:${this._triCrosshairY()}%;">
          </div>
        </div>

        <div class="toolbar">
          <div class="formats">
            ${[
			"hex",
			"rgb",
			"hsl",
			"oklch"
		].map((f) => html`
              <span class="format-chip" @click=${(e) => this._copy(f, e)} role="button" tabindex="0" aria-label="Copiar ${f.toUpperCase()}" title="Clique para copiar">
                <span style="font-weight:600;color:var(--auy-color-text);">${f.toUpperCase()}</span>
                ${this._fmt(f)}
              </span>
            `)}
          </div>
          ${this.showEyedropper && "EyeDropper" in window ? html`
            <button class="eyedropper" @click=${this._pickEyedropper} aria-label="Pipeta" title="Selecionar cor da tela">💉</button>
          ` : nothing}
        </div>
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyColorInput.prototype, "value", void 0);
__decorate([property({ type: String })], AuyColorInput.prototype, "label", void 0);
__decorate([property({ type: Boolean })], AuyColorInput.prototype, "showEyedropper", void 0);
__decorate([state()], AuyColorInput.prototype, "_H", void 0);
__decorate([state()], AuyColorInput.prototype, "_S", void 0);
__decorate([state()], AuyColorInput.prototype, "_V", void 0);
__decorate([query(".hsv-wrap canvas")], AuyColorInput.prototype, "_canvas", void 0);
AuyColorInput = __decorate([customElement("auy-color-input")], AuyColorInput);
//#endregion
//#region src/components/date-input.ts
var AuyDateInput = class AuyDateInput extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.type = "date";
		this.value = "";
		this.min = "";
		this.max = "";
		this.required = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      label {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
        margin-block-end: var(--auy-space-xs);
      }

      input {
        box-sizing: border-box;
        display: block;
        inline-size: 100%;
        padding: var(--auy-space-sm) var(--auy-space-md);
        font-family: inherit;
        font-size: var(--auy-text-sm);
        line-height: 1.5;
        color: var(--auy-color-text);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        transition: border-color var(--auy-transition), box-shadow var(--auy-transition);
        outline: none;
        touch-action: manipulation;
        accent-color: var(--auy-color-primary);
      }

      input:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      input:user-valid {
        border-color: var(--auy-color-success);
      }

      input:user-invalid {
        border-color: var(--auy-color-error);
      }

      @media (forced-colors: active) {
        input {
          border: 1px solid ButtonText;
        }
        input:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        input {
          transition: none;
        }
      }

      @media print {
        input {
          border-color: #000;
        }
      }
    }
  `;
	}
	_handleInput(e) {
		const input = e.target;
		this.value = input.value;
		this.dispatchEvent(new CustomEvent("change", {
			detail: { value: this.value },
			bubbles: true,
			composed: true
		}));
	}
	render() {
		return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <input
        part="input"
        type=${this.type}
        .value=${this.value}
        min=${this.min || nothing}
        max=${this.max || nothing}
        ?required=${this.required}
        @input=${this._handleInput}
        aria-label=${this.label || `Selecionar ${this.type}`}
      />
    `;
	}
};
__decorate([property({ type: String })], AuyDateInput.prototype, "label", void 0);
__decorate([property({ type: String })], AuyDateInput.prototype, "type", void 0);
__decorate([property({ type: String })], AuyDateInput.prototype, "value", void 0);
__decorate([property({ type: String })], AuyDateInput.prototype, "min", void 0);
__decorate([property({ type: String })], AuyDateInput.prototype, "max", void 0);
__decorate([property({ type: Boolean })], AuyDateInput.prototype, "required", void 0);
AuyDateInput = __decorate([customElement("auy-date-input")], AuyDateInput);
//#endregion
//#region src/components/toast-container.ts
var AuyToastContainer = class AuyToastContainer extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.position = "top-right";
		this.defaultDuration = 4e3;
		this._toasts = [];
		this._counter = 0;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        position: fixed;
        z-index: 2;
        display: grid;
        gap: var(--auy-space-sm);
        pointer-events: none;
      }

      :host([position="top-right"]) {
        inset-block-start: var(--auy-space-md);
        inset-inline-end: var(--auy-space-md);
      }

      :host([position="top-left"]) {
        inset-block-start: var(--auy-space-md);
        inset-inline-start: var(--auy-space-md);
      }

      :host([position="bottom-right"]) {
        inset-block-end: var(--auy-space-md);
        inset-inline-end: var(--auy-space-md);
      }

      :host([position="bottom-left"]) {
        inset-block-end: var(--auy-space-md);
        inset-inline-start: var(--auy-space-md);
      }

      :host([position="top-center"]) {
        inset-block-start: var(--auy-space-md);
        inset-inline-start: 50%;
        translate: -50% 0;
      }

      .toast {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-sm) var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
        pointer-events: auto;
        max-inline-size: 24rem;
        animation: toast-in var(--auy-transition, 200ms) ease forwards;
        border-inline-start: 3px solid var(--auy-color-info);
      }

      .toast--success {
        border-inline-start-color: var(--auy-color-success);
      }

      .toast--error {
        border-inline-start-color: var(--auy-color-error);
      }

      .toast--warning {
        border-inline-start-color: var(--auy-color-warning);
      }

      .toast.removing {
        animation: toast-out var(--auy-transition, 200ms) ease forwards;
      }

      @keyframes toast-in {
        from {
          opacity: 0;
          transform: translateX(100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes toast-out {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }

      :host([position*="left"]) .toast {
        animation-name: toast-in-left;
      }

      :host([position*="left"]) .toast.removing {
        animation-name: toast-out-left;
      }

      @keyframes toast-in-left {
        from {
          opacity: 0;
          transform: translateX(-100%);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes toast-out-left {
        from {
          opacity: 1;
          transform: translateX(0);
        }
        to {
          opacity: 0;
          transform: translateX(-100%);
        }
      }

      .dismiss {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.5em;
        block-size: 1.5em;
        flex-shrink: 0;
        border-radius: var(--auy-radius-sm);
        cursor: pointer;
        font-size: 1.2em;
        line-height: 1;
        opacity: 0.7;
        transition: opacity var(--auy-transition-fast);
        touch-action: manipulation;
      }

      .dismiss:hover {
        opacity: 1;
      }

      .dismiss:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .message {
        flex: 1;
        min-inline-size: 0;
      }

      @media (forced-colors: active) {
        .toast {
          border: 1px solid CanvasText;
        }
        .dismiss:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .toast {
          animation: none;
        }
      }
    }
  `;
	}
	show(message, variant = "info", duration) {
		const id = `toast-${++this._counter}`;
		const toast = {
			id,
			message,
			variant,
			duration: duration ?? this.defaultDuration
		};
		this._toasts = [...this._toasts, toast];
		if (toast.duration > 0) setTimeout(() => this.dismiss(id), toast.duration);
		return id;
	}
	dismiss(id) {
		const el = this.shadowRoot?.querySelector(`[data-id="${id}"]`);
		if (el) {
			el.classList.add("removing");
			setTimeout(() => {
				this._toasts = this._toasts.filter((t) => t.id !== id);
			}, 200);
		} else this._toasts = this._toasts.filter((t) => t.id !== id);
	}
	_dismissToast(id) {
		this.dismiss(id);
	}
	_getIcon(variant) {
		switch (variant) {
			case "success": return "✓";
			case "error": return "✕";
			case "warning": return "⚠";
			default: return "ℹ";
		}
	}
	render() {
		if (this._toasts.length === 0) return null;
		return html`
      ${this._toasts.map((t) => html`
        <div
          part="toast"
          class="toast toast--${t.variant}"
          data-id=${t.id}
          role="alert"
          aria-live="polite"
        >
          <span part="icon" aria-hidden="true">${this._getIcon(t.variant)}</span>
          <span part="message" class="message">${t.message}</span>
          <button
            part="dismiss"
            class="dismiss"
            @click=${() => this._dismissToast(t.id)}
            aria-label="Fechar"
          >&times;</button>
        </div>
      `)}
    `;
	}
};
__decorate([property({
	type: String,
	reflect: true
})], AuyToastContainer.prototype, "position", void 0);
__decorate([property({ type: Number })], AuyToastContainer.prototype, "defaultDuration", void 0);
__decorate([state()], AuyToastContainer.prototype, "_toasts", void 0);
AuyToastContainer = __decorate([customElement("auy-toast-container")], AuyToastContainer);
//#endregion
//#region src/layout/skeleton.ts
var AuySkeleton = class AuySkeleton extends LitElement {
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
	createRenderRoot() {
		return this;
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
//#region src/layout/accessibility/top-bar.ts
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
var AuyAccessibilityBar = class AuyAccessibilityBar extends LitElement {
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
	createRenderRoot() {
		return this;
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
        font-size: var(--auy-text-sm, 0.875rem);
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
        font-size: var(--auy-text-sm, 0.875rem);
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
        font-size: var(--auy-text-sm, 0.875rem);
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
        font-size: 1.25rem;
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
        font-size: var(--auy-text-sm, 0.8125rem);
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
//#region src/layout/header/header.ts
var AuyHeader = class AuyHeader extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.pageTitle = "";
		this.sticky = false;
		this.theme = "light";
		this.logoContrast = "";
		this._menuOpen = false;
		this._contrastActive = false;
		this._contrastObserver = null;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      header {
        display: flex;
        align-items: center;
        padding: var(--auy-header-padding, 0.5rem 1rem);
        background: var(--auy-header-bg, var(--color-surface, oklch(100% 0 0)));
        border-block-end: var(--auy-header-border, 1px solid var(--color-border, oklch(0% 0 0 / 0.12)));
        container-type: inline-size;
        position: relative;
      }

      :host([sticky]) header {
        position: sticky;
        inset-block-start: 0;
        z-index: 1;
      }

      :host([theme="dark"]) header {
        background: var(--auy-header-bg-dark, oklch(12% 0.01 260));
        border-block-end-color: var(--auy-header-border-dark, oklch(25% 0.02 260));
        color: var(--auy-header-color-dark, oklch(96% 0.005 260));
      }

      .left {
        display: flex;
        align-items: center;
        gap: var(--auy-header-gap, 1rem);
      }

      .right {
        display: flex;
        align-items: center;
        gap: var(--auy-header-gap, 1rem);
        margin-inline-start: auto;
      }

      .title {
        font-size: var(--auy-header-title-size, 1.25rem);
        font-weight: var(--auy-header-title-weight, 600);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .nav-wrapper {
        display: contents;
      }

      .hamburger {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        color: inherit;
        line-height: 0;
        touch-action: manipulation;
      }

      .hamburger-line {
        display: block;
        inline-size: 1.5rem;
        block-size: 0.125rem;
        background: currentColor;
        margin: 0.25rem 0;
        transition: var(--auy-transition, 200ms ease);
      }

      :host(.nav-open) .hamburger-line:nth-child(1) {
        transform: translateY(6px) rotate(45deg);
      }

      :host(.nav-open) .hamburger-line:nth-child(2) {
        opacity: 0;
      }

      :host(.nav-open) .hamburger-line:nth-child(3) {
        transform: translateY(-6px) rotate(-45deg);
      }

      .hamburger:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .hamburger:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (max-width: 768px) {
        .hamburger {
          display: block;
        }

        .nav-wrapper {
          display: none;
        }

        :host(.nav-open) .nav-wrapper {
          display: block;
          position: absolute;
          inset-block-start: 100%;
          inset-inline-start: 0;
          inset-inline-end: 0;
          z-index: 1;
          background: inherit;
          padding: 1rem;
          box-shadow: 0 4px 12px oklch(0% 0 0 / 0.15);
        }
      }

      @container (max-width: 360px) {
        .title {
          display: none;
        }
      }

      @media print {
        .nav-wrapper,
        .right {
          display: none !important;
        }
      }
    }
  `;
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window !== "undefined") {
			this._contrastActive = document.documentElement.hasAttribute("data-auy-contrast");
			this._contrastObserver = new MutationObserver(() => {
				this._contrastActive = document.documentElement.hasAttribute("data-auy-contrast");
			});
			this._contrastObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["data-auy-contrast"]
			});
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (this._contrastObserver) {
			this._contrastObserver.disconnect();
			this._contrastObserver = null;
		}
	}
	_toggleMenu() {
		this._menuOpen = !this._menuOpen;
		this.classList.toggle("nav-open", this._menuOpen);
		this.dispatchEvent(new CustomEvent("menu-toggle", {
			detail: { open: this._menuOpen },
			bubbles: true,
			composed: true
		}));
	}
	render() {
		return html`
      <header part="header" role="banner">
        <div class="left">
          <slot name="logo" part="logo">
            ${this.logoContrast && this._contrastActive ? html`<img src=${this.logoContrast} alt="" style="inline-size:auto;block-size:2.5rem">` : ""}
          </slot>
          ${this.pageTitle ? html`<span part="title" class="title">${this.pageTitle}</span>` : ""}
          <div class="nav-wrapper" part="nav">
            <slot name="nav"></slot>
          </div>
        </div>
        <div class="right">
          <slot name="search" part="search"></slot>
          <slot name="actions" part="actions"></slot>
        </div>
        <button
          part="hamburger"
          class="hamburger"
          @click=${this._toggleMenu}
          aria-label="${this._menuOpen ? "Fechar menu" : "Abrir menu"}"
          aria-expanded="${this._menuOpen}"
        >
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </header>
    `;
	}
};
__decorate([property({ type: String })], AuyHeader.prototype, "pageTitle", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyHeader.prototype, "sticky", void 0);
__decorate([property({ type: String })], AuyHeader.prototype, "theme", void 0);
__decorate([property({ type: String })], AuyHeader.prototype, "logoContrast", void 0);
__decorate([state()], AuyHeader.prototype, "_menuOpen", void 0);
__decorate([state()], AuyHeader.prototype, "_contrastActive", void 0);
AuyHeader = __decorate([customElement("auy-header")], AuyHeader);
//#endregion
//#region src/layout/base-struct/sidebar.ts
var AuySidebar = class AuySidebar extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.appTitle = "";
		this.collapsed = false;
		this.items = [];
		this.theme = "light";
		this.logoContrast = "";
		this._contrastActive = false;
		this._contrastObserver = null;
		this._handleNavClick = (e) => {
			const href = e.currentTarget.dataset.href;
			if (!href) return;
			const findItem = (items) => {
				for (const item of items) {
					if (item.href === href) return item;
					if (item.children) {
						const found = findItem(item.children);
						if (found) return found;
					}
				}
			};
			const item = findItem(this.items);
			if (item && item.children && item.children.length > 0) {
				e.preventDefault();
				const updateActive = (items) => items.map((i) => i === item ? {
					...i,
					active: !i.active
				} : {
					...i,
					children: i.children ? updateActive(i.children) : void 0
				});
				this.items = updateActive(this.items);
			}
		};
	}
	static {
		this.styles = css`
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
	}
	connectedCallback() {
		super.connectedCallback();
		if (typeof window !== "undefined") {
			this._contrastActive = document.documentElement.hasAttribute("data-auy-contrast");
			this._contrastObserver = new MutationObserver(() => {
				this._contrastActive = document.documentElement.hasAttribute("data-auy-contrast");
			});
			this._contrastObserver.observe(document.documentElement, {
				attributes: true,
				attributeFilter: ["data-auy-contrast"]
			});
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (this._contrastObserver) {
			this._contrastObserver.disconnect();
			this._contrastObserver = null;
		}
	}
	_toggleCollapse() {
		this.collapsed = !this.collapsed;
		this.dispatchEvent(new CustomEvent("toggle-collapse", {
			detail: { collapsed: this.collapsed },
			bubbles: true,
			composed: true
		}));
	}
	_renderItem(item) {
		const hasChildren = item.children && item.children.length > 0;
		return html`
      <li part="item">
        <a
          class="item-link"
          href=${item.href}
          data-href=${item.href}
            aria-current=${item.current ? "page" : nothing}
            aria-expanded=${hasChildren ? item.active ? "true" : "false" : nothing}
            @click=${this._handleNavClick}
          >
            ${item.icon ? html`<span part="item-icon">${item.icon}</span>` : nothing}
            <span part="item-label">${item.label}</span>
          ${hasChildren ? html`<span class=${classMap({
			"item-chevron": true,
			expanded: !!item.active
		})}>❯</span>` : nothing}
        </a>
        ${hasChildren ? html`
            <ul class="sub-items" role="group">
              ${item.children.map((child) => html`
                <li part="item">
                  <a
                    class="item-link"
                    href=${child.href}
                    data-href=${child.href}
                    aria-current=${child.current ? "page" : nothing}
                  >
                    ${child.icon ? html`<span part="item-icon">${child.icon}</span>` : nothing}
                    <span part="item-label">${child.label}</span>
                  </a>
                </li>
              `)}
            </ul>
          ` : nothing}
      </li>
    `;
	}
	render() {
		return html`
      <aside part="sidebar" aria-label="Navegação lateral">
        <div part="header">
          <div class="logo-area">
            <slot name="logo">
              ${this._contrastActive && this.logoContrast ? html`<img src=${this.logoContrast} alt="" style="inline-size:1.5rem;block-size:1.5rem">` : html`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>`}
            </slot>
            <span class="app-title">${this.appTitle}</span>
          </div>
          <button part="toggle" @click=${this._toggleCollapse} aria-label=${this.collapsed ? "Expandir navegação" : "Recolher navegação"}>
            ${this.collapsed ? html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>` : html`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>`}
          </button>
        </div>
        <div class="nav-wrapper">
          <nav part="nav" aria-label="Navegação principal">
            <ul>
              ${this.items.map((item) => this._renderItem(item))}
            </ul>
          </nav>
        </div>
        <slot name="extension" part="extension"></slot>
      </aside>
    `;
	}
};
__decorate([property({ type: String })], AuySidebar.prototype, "appTitle", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuySidebar.prototype, "collapsed", void 0);
__decorate([property({ type: Array })], AuySidebar.prototype, "items", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuySidebar.prototype, "theme", void 0);
__decorate([property({ type: String })], AuySidebar.prototype, "logoContrast", void 0);
__decorate([state()], AuySidebar.prototype, "_contrastActive", void 0);
AuySidebar = __decorate([customElement("auy-sidebar")], AuySidebar);
//#endregion
//#region src/layout/main-section/main-section.ts
var AuyMainSection = class AuyMainSection extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.columns = "single";
		this.header = "";
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: grid;
        contain: layout style;
      }

      main {
        display: grid;
        grid-template-columns: subgrid;
        grid-column: 1 / -1;
        container-type: inline-size;
        background: var(--auy-color-surface, oklch(100% 0 0));
        color: var(--auy-color-text, oklch(20% 0.03 260));
      }

      .section {
        display: grid;
        grid-column: 1 / -1;
        gap: var(--auy-space-lg, 1.5rem);
        padding: var(--auy-space-lg, 1.5rem);
      }

      .section.single {
        grid-template-columns: 1fr;
      }

      .section.left-aside {
        grid-template-columns: 30fr 70fr;
      }

      .section.right-aside {
        grid-template-columns: 70fr 30fr;
      }

      .section.both {
        grid-template-columns: 25fr 50fr 25fr;
      }

      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--auy-space-md, 1rem);
        grid-column: 1 / -1;
        padding: 0 0 var(--auy-space-md, 1rem);
        border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
      }

      h1 {
        font-size: var(--auy-text-2xl, 1.5rem);
        font-weight: 600;
        margin: 0;
        line-height: 1.3;
      }

      @supports not (grid-template-columns: subgrid) {
        main {
          grid-template-columns: 1fr;
        }

        .section.single,
        .section.left-aside,
        .section.right-aside,
        .section.both {
          grid-template-columns: 1fr;
        }
      }

      @container (max-width: 639px) {
        .section.single,
        .section.left-aside,
        .section.right-aside,
        .section.both {
          grid-template-columns: 1fr !important;
        }
      }

      @media print {
        [part='section'] {
          display: block;
          background: none;
          color: #000;
        }

        ::slotted([slot='header-actions']),
        ::slotted([slot='left']),
        ::slotted([slot='right']) {
          display: none !important;
        }

        .section.left-aside,
        .section.right-aside,
        .section.both {
          display: block !important;
        }
      }
    }
  `;
	}
	render() {
		return html`
      <main id="main-content" part="section" role="main">
        ${this.header ? html`
              <header part="header">
                <h1>${this.header}</h1>
                <slot name="header-actions"></slot>
              </header>
            ` : nothing}
        <div class="section ${this.columns}" part="content">
          ${this._renderContent()}
        </div>
      </main>
    `;
	}
	_renderContent() {
		switch (this.columns) {
			case "left-aside": return html`
          <aside part="left"><slot name="left"></slot></aside>
          <div><slot></slot></div>
        `;
			case "right-aside": return html`
          <div><slot></slot></div>
          <aside part="right"><slot name="right"></slot></aside>
        `;
			case "both": return html`
          <aside part="left"><slot name="left"></slot></aside>
          <div><slot></slot></div>
          <aside part="right"><slot name="right"></slot></aside>
        `;
			default: return html`<div><slot></slot></div>`;
		}
	}
};
__decorate([property({ type: String })], AuyMainSection.prototype, "columns", void 0);
__decorate([property({ type: String })], AuyMainSection.prototype, "header", void 0);
AuyMainSection = __decorate([customElement("auy-main-section")], AuyMainSection);
//#endregion
//#region src/layout/footer/footer.ts
var AuyFooter = class AuyFooter extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.copyright = "";
		this.year = (/* @__PURE__ */ new Date()).getFullYear();
		this.columns = 4;
	}
	static {
		this.styles = css`
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
	}
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
};
__decorate([property({ type: String })], AuyFooter.prototype, "copyright", void 0);
__decorate([property({ type: Number })], AuyFooter.prototype, "year", void 0);
__decorate([property({ type: Number })], AuyFooter.prototype, "columns", void 0);
AuyFooter = __decorate([customElement("auy-footer")], AuyFooter);
//#endregion
//#region src/layout/app-layout.ts
var AuyAppLayout = class AuyAppLayout extends LitElement {
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
    @layer components {
      :host {
        display: block;
        font-family: var(--auy-font-sans);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        contain: layout style;
      }

      :host([theme="dark"]) {
        color-scheme: dark;
      }

      :host([theme="light"]) {
        color-scheme: light;
      }

      #layout {
        display: grid;
        min-block-size: 100dvh;
      }

      a[part="skip-link"] {
        position: absolute;
        inline-size: 1px;
        block-size: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
        z-index: 1;
      }

      a[part="skip-link"]:focus {
        inline-size: auto;
        block-size: auto;
        padding: 0.5rem 1rem;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
        background: var(--auy-color-surface);
        color: var(--auy-color-primary);
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
        text-decoration: none;
      }

      @media print {
      nav[part="skip-links"] {
        position: fixed;
        inset-block-start: 0;
        inset-inline-start: 0;
        z-index: 1;
      }

      a[part="skip-link"] {
          display: none;
        }
      }
    }
  `;
	}
	_updatePresence() {
		const hasSidebar = this.querySelector("[slot=\"sidebar\"]") !== null;
		const hasHeader = this.querySelector("[slot=\"header\"]") !== null;
		if (hasSidebar !== this._hasSidebar) this._hasSidebar = hasSidebar;
		if (hasHeader !== this._hasHeader) this._hasHeader = hasHeader;
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
		const hasSidebar = this._hasSidebar;
		const hasHeader = this._hasHeader;
		let areas;
		let columns;
		let rows;
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
      <nav class="skip-links" aria-label="Acessibilidade - Atalhos" part="skip-links">
        ${this.skipLinks.map((link) => html`
          <a
            href=${link.href}
            part="skip-link"
            accesskey=${link.accesskey || ""}
            tabindex="0"
          >${link.label}</a>
        `)}
      </nav>
      <div id="layout" part="layout" style="grid-template-areas: ${areas}; grid-template-columns: ${columns}; grid-template-rows: ${rows};">
        ${hasSidebar ? html`<div part="sidebar" style="grid-area: sidebar;" id="main-nav"><slot name="sidebar"></slot></div>` : ""}
        ${hasHeader ? html`<div part="header" style="grid-area: header;"><slot name="header"></slot></div>` : ""}
        <div id="main-content" part="main" style="grid-area: main;"><slot name="main"></slot></div>
        <div part="footer" style="grid-area: footer;" id="footer"><slot name="footer"></slot></div>
      </div>
      <slot></slot>
    `;
	}
};
__decorate([property({
	type: String,
	reflect: true
})], AuyAppLayout.prototype, "theme", void 0);
__decorate([property({ type: String })], AuyAppLayout.prototype, "sidebarWidth", void 0);
__decorate([property({ type: String })], AuyAppLayout.prototype, "headerHeight", void 0);
__decorate([property({ type: Array })], AuyAppLayout.prototype, "skipLinks", void 0);
__decorate([state()], AuyAppLayout.prototype, "_hasSidebar", void 0);
__decorate([state()], AuyAppLayout.prototype, "_hasHeader", void 0);
AuyAppLayout = __decorate([customElement("auy-app-layout")], AuyAppLayout);
//#endregion
//#region src/layout/footer/footer-transparency.ts
var AuyFooterTransparency = class AuyFooterTransparency extends LitElement {
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
//#region src/layout/print-engine.ts
var AuyInternalPrintEngine = class AuyInternalPrintEngine extends LitElement {
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
__decorate([property({ type: String })], AuyInternalPrintEngine.prototype, "title", void 0);
__decorate([property({ type: Boolean })], AuyInternalPrintEngine.prototype, "showWatermark", void 0);
__decorate([property({ type: String })], AuyInternalPrintEngine.prototype, "watermarkText", void 0);
__decorate([property({ type: Boolean })], AuyInternalPrintEngine.prototype, "showHeader", void 0);
__decorate([property({ type: Boolean })], AuyInternalPrintEngine.prototype, "showFooter", void 0);
__decorate([property({ type: Boolean })], AuyInternalPrintEngine.prototype, "showQR", void 0);
__decorate([state()], AuyInternalPrintEngine.prototype, "_currentDate", void 0);
AuyInternalPrintEngine = __decorate([customElement("auy-internal-print-engine")], AuyInternalPrintEngine);
//#endregion
//#region src/layout/back-to-top.ts
var AuyBackToTop = class AuyBackToTop extends LitElement {
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
//#region src/layout/banner.ts
var AuyBanner = class AuyBanner extends LitElement {
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
        font-size: 1.25rem;
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
//#region src/layout/cms/cms-layout.ts
var AuyCmsLayout = class AuyCmsLayout extends LitElement {
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
        font-size: var(--auy-text-lg, 1.25rem);
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
        font-size: var(--auy-text-lg, 1.25rem);
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
//#region src/layout/cms/cms-login.ts
var AuyCmsLogin = class AuyCmsLogin extends LitElement {
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
        font-size: var(--auy-text-xl, 1.5rem);
        font-weight: 600;
        margin: 0;
        color: var(--auy-color-text, oklch(15% 0.02 260));
      }

      [part="error"] {
        background: oklch(from var(--auy-color-error, oklch(50% 0.24 30)) 95% 0.02 h);
        color: var(--auy-color-error, oklch(50% 0.24 30));
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        border-radius: var(--auy-radius-md, 0.5rem);
        font-size: var(--auy-text-sm, 0.875rem);
        margin-block-end: var(--auy-space-md, 1rem);
      }

      [part="form"] {
        display: grid;
        gap: var(--auy-space-md, 1rem);
      }

      [part="label"] {
        display: grid;
        gap: 0.25rem;
        font-size: var(--auy-text-sm, 0.875rem);
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
        font-size: var(--auy-text-base, 1rem);
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
        font-size: var(--auy-text-base, 1rem);
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
        font-size: var(--auy-text-xs, 0.75rem);
        color: var(--auy-color-text-muted, oklch(55% 0.02 260));
        margin-block-start: var(--auy-space-md, 1rem);
      }

      [part="credits"] {
        text-align: center;
        font-size: var(--auy-text-xs, 0.75rem);
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
//#region src/layout/error/404.ts
var AuyError404 = class AuyError404 extends LitElement {
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
        font-size: clamp(4rem, 12vw, 8rem);
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
//#region src/layout/error/500.ts
var AuyError500 = class AuyError500 extends LitElement {
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
        font-size: clamp(4rem, 12vw, 8rem);
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
//#region src/layout/error/403.ts
var AuyError403 = class AuyError403 extends LitElement {
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
        font-size: clamp(4rem, 12vw, 8rem);
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
//#region src/layout/error/419.ts
var AuyError419 = class AuyError419 extends LitElement {
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
        font-size: clamp(4rem, 12vw, 8rem);
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
//#region src/layout/error/503.ts
var AuyError503 = class AuyError503 extends LitElement {
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
        font-size: clamp(4rem, 12vw, 8rem);
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
//#region src/styles/themes/index.ts
var THEMES = [
	"azure",
	"emerald",
	"ruby",
	"amber",
	"violet"
];
//#endregion
//#region src/utils/aria.ts
/**
* Sets multiple ARIA attributes on an element at once.
* Each key in attrs is prefixed with "aria-" before being set.
*/
function injectAria(el, attrs) {
	for (const [key, value] of Object.entries(attrs)) el.setAttribute(`aria-${key}`, value);
}
/**
* Sets the `role` attribute on an element.
*/
function setRole(el, role) {
	el.setAttribute("role", role);
}
var _liveRegion = null;
/**
* Creates or reuses a live region to announce messages to screen readers.
* Appends a hidden div to the body and sets the message.
*/
function announce(message, priority = "polite") {
	if (!_liveRegion) {
		_liveRegion = document.createElement("div");
		_liveRegion.setAttribute("aria-live", priority);
		_liveRegion.setAttribute("role", priority === "assertive" ? "alert" : "status");
		_liveRegion.setAttribute("aria-atomic", "true");
		_liveRegion.className = "sr-only";
		document.body.appendChild(_liveRegion);
	} else {
		_liveRegion.setAttribute("aria-live", priority);
		_liveRegion.setAttribute("role", priority === "assertive" ? "alert" : "status");
	}
	_liveRegion.textContent = "";
	requestAnimationFrame(() => {
		if (_liveRegion) _liveRegion.textContent = message;
	});
}
var FOCUSABLE_SELECTOR = "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex=\"-1\"]), details, summary, audio[controls], video[controls], [contenteditable]";
function _getFocusable(container) {
	return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));
}
/**
* Traps focus within a container element when active.
* Implements the WAI-ARIA modal focus pattern:
* - Tabs cycle between focusable elements inside the container
* - Shift+Tab reverses the cycle
* - If focus escapes (e.g. by clicking outside), it is re-trapped
* - Returns a cleanup function to remove all listeners
*/
function focusTrap(container, active) {
	if (!active) return () => {};
	let _addedTabindex = false;
	const focusable = _getFocusable(container);
	if (focusable.length > 0) focusable[0].focus();
	else {
		container.setAttribute("tabindex", "-1");
		_addedTabindex = true;
		container.focus();
	}
	const keydown = (e) => {
		if (e.key !== "Tab") return;
		const focusable = _getFocusable(container);
		if (focusable.length === 0) {
			e.preventDefault();
			return;
		}
		const first = focusable[0];
		const last = focusable[focusable.length - 1];
		if (e.shiftKey) {
			if (document.activeElement === first || !container.contains(document.activeElement)) {
				e.preventDefault();
				last.focus();
			}
		} else if (document.activeElement === last || !container.contains(document.activeElement)) {
			e.preventDefault();
			first.focus();
		}
	};
	const reTrap = (e) => {
		if (!container.contains(e.target) && e.target !== container) requestAnimationFrame(() => {
			if (!container.contains(document.activeElement)) {
				const focusable = _getFocusable(container);
				if (focusable.length > 0) focusable[0].focus();
				else {
					container.setAttribute("tabindex", "-1");
					container.focus();
				}
			}
		});
	};
	document.addEventListener("keydown", keydown);
	document.addEventListener("focusin", reTrap);
	return () => {
		document.removeEventListener("keydown", keydown);
		document.removeEventListener("focusin", reTrap);
		if (_addedTabindex) container.removeAttribute("tabindex");
	};
}
/**
* Sets the `aria-expanded` attribute on an element.
*/
function setAriaExpanded(el, expanded) {
	if (expanded === void 0) el.removeAttribute("aria-expanded");
	else el.setAttribute("aria-expanded", String(expanded));
}
/**
* Sets the `aria-selected` attribute on an element.
*/
function setAriaSelected(el, selected) {
	if (selected === void 0) el.removeAttribute("aria-selected");
	else el.setAttribute("aria-selected", String(selected));
}
/**
* Sets the `aria-current` attribute on an element.
* Accepts boolean or specific token values ('page'|'step'|'location'|'date'|'time').
*/
function setAriaCurrent(el, current) {
	const val = typeof current === "boolean" ? String(current) : current;
	el.setAttribute("aria-current", val);
}
/**
* Creates a skip link anchor element with sr-only-focusable class.
* Returns the anchor element without appending it to the DOM.
*/
function injectSkipLink(href, label) {
	const a = document.createElement("a");
	a.href = href;
	a.textContent = label;
	a.className = "sr-only-focusable";
	return a;
}
/**
* Returns whether the user prefers reduced motion.
*/
function prefersReducedMotion() {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
/**
* Returns the user's preferred color scheme: 'light' or 'dark'.
*/
function prefersColorScheme() {
	const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const light = window.matchMedia("(prefers-color-scheme: light)").matches;
	if (!dark && !light) return "no-preference";
	return dark ? "dark" : "light";
}
//#endregion
//#region src/utils/dom.ts
/**
* Observes when an element becomes visible and calls the callback once.
* Disconnects the observer after the first visibility event.
* @param el - Target element
* @param onVisible - Callback when element becomes visible
* @param options - IntersectionObserver options
* @returns Cleanup function that disconnects the observer
*/
function observeVisibility(el, onVisible, options) {
	const observer = new IntersectionObserver(([entry]) => {
		if (entry.isIntersecting) {
			onVisible();
			observer.disconnect();
		}
	}, options);
	observer.observe(el);
	return () => observer.disconnect();
}
/**
* Observes resize events on an element using ResizeObserver.
* @param el - Target element
* @param onResize - Callback with the ResizeObserverEntry
* @returns Cleanup function that disconnects the observer
*/
function observeResize(el, onResize) {
	const observer = new ResizeObserver(([entry]) => onResize(entry));
	observer.observe(el);
	return () => observer.disconnect();
}
/**
* Observes DOM mutations on a node.
* @param el - Target node
* @param onMutate - Callback on mutation
* @param options - MutationObserver options (default: { childList: true, subtree: true })
* @returns Cleanup function that disconnects the observer
*/
function observeMutations(el, onMutate, options) {
	const observer = new MutationObserver(() => onMutate());
	observer.observe(el, {
		childList: true,
		...options
	});
	return () => observer.disconnect();
}
/**
* Returns a debounced version of the function.
* The debounced function delays invoking `fn` until `ms` milliseconds
* have elapsed since the last invocation.
*/
function debounce(fn, ms, options) {
	let timer;
	let leadingCalled = false;
	return function(...args) {
		if (options?.leading && !leadingCalled) {
			leadingCalled = true;
			fn.apply(this, args);
		}
		clearTimeout(timer);
		timer = setTimeout(() => {
			leadingCalled = false;
			fn.apply(this, args);
		}, ms);
	};
}
/**
* Returns a throttled version of the function.
* The throttled function invokes `fn` at most once every `ms` milliseconds.
*/
function throttle(fn, ms) {
	let lastTime = 0;
	let trailingTimer;
	return function(...args) {
		const now = Date.now();
		const remaining = ms - (now - lastTime);
		if (remaining <= 0) {
			if (trailingTimer) {
				clearTimeout(trailingTimer);
				trailingTimer = void 0;
			}
			lastTime = now;
			fn.apply(this, args);
		} else {
			clearTimeout(trailingTimer);
			trailingTimer = setTimeout(() => {
				lastTime = Date.now();
				trailingTimer = void 0;
				fn.apply(this, args);
			}, remaining);
		}
	};
}
/**
* Attaches a delegated event listener to a container.
* Uses `closest(selector)` on the event target to determine if the
* event should be handled.
* @param selector - CSS selector for target elements
* @param eventType - Event type (e.g. 'click')
* @param handler - Event handler receiving the event and matched target
* @param container - Container element (default: document)
* @returns Cleanup function that removes the event listener
*/
function delegateEvent(selector, eventType, handler, container) {
	const listener = (event) => {
		const target = event.target?.closest(selector);
		if (target) handler(event, target);
	};
	container.addEventListener(eventType, listener);
	return () => container.removeEventListener(eventType, listener);
}
/**
* Escapes HTML special characters in a string.
* Converts &, <, >, ", ' to their HTML entity equivalents.
*/
function escapeHtml(str) {
	const map = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		"\"": "&quot;",
		"'": "&#39;",
		"/": "&#47;"
	};
	return str.replace(/[&<>"'/]/g, (ch) => map[ch]);
}
/**
* Creates a minimal state store with get, set, and subscribe.
* @param initial - Initial state
* @returns Store with get(), set(partial), and subscribe(fn) methods
*/
function createStore(initial) {
	let state = { ...initial };
	const subscribers = /* @__PURE__ */ new Set();
	return {
		get: () => state,
		set: (partial) => {
			state = {
				...state,
				...partial
			};
			subscribers.forEach((fn) => fn(state));
		},
		subscribe: (fn) => {
			subscribers.add(fn);
			return () => subscribers.delete(fn);
		}
	};
}
/**
* Creates a Map from an array using a key function.
* Useful for O(1) lookups by key.
* @param items - Array of items
* @param keyFn - Key extraction function
* @returns Map of key → item
*/
function queryMap(items, keyFn) {
	const map = /* @__PURE__ */ new Map();
	for (const item of items) map.set(keyFn(item), item);
	return map;
}
/**
* Groups array items by the result of a key function.
* @param items - Array of items
* @param keyFn - Key extraction function
* @returns Map of key → array of items
*/
function groupBy(items, keyFn) {
	const map = /* @__PURE__ */ new Map();
	for (const item of items) {
		const key = keyFn(item);
		const group = map.get(key);
		if (group) group.push(item);
		else map.set(key, [item]);
	}
	return map;
}
//#endregion
export { AuyAccessibilityBar, AuyAccordion, AuyAppLayout, AuyBackToTop, AuyBanner, AuyButtonGroup, AuyCmsLayout, AuyCmsLogin, AuyColorInput, AuyContainer, AuyDateInput, AuyDropdown, AuyError403, AuyError404, AuyError419, AuyError500, AuyError503, AuyFileInput, AuyFooter, AuyFooterTransparency, AuyHeader, AuyInternalAlert, AuyInternalBadge, AuyInternalBreadcrumb, AuyInternalButton, AuyInternalCard, AuyInternalCheckbox, AuyInternalCodeEditor, AuyInternalFormGroup, AuyInternalMetadata, AuyInternalModal, AuyInternalPagination, AuyInternalPrintEngine, AuyInternalSearch, AuyInternalSpinner, AuyInternalTable, AuyInternalTabs, AuyInternalToast, AuyInternalTooltip, AuyMainSection, AuyNav, AuyProgress, AuyRangeInput, AuySection, AuySidebar, AuySkeleton, AuyToastContainer, ICONS, THEMES, accessibilityStyles, announce, baseStyles, capitalize, createStore, debounce, delegateEvent, escapeHtml, focusTrap, formatCurrency, formatDate, formatNumber, formatRelativeTime, groupBy, injectAria, injectSkipLink, maskCNPJ, maskCPF, maskPhone, observeMutations, observeResize, observeVisibility, pluralize, prefersColorScheme, prefersReducedMotion, queryMap, resetStyles, setAriaCurrent, setAriaExpanded, setAriaSelected, setRole, slugify, stripMask, throttle, tokenStyles, truncate };
