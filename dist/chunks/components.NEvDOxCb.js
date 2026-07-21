import { t as __decorate } from "./decorate.BeMZb0KT.js";
import { LitElement, css, html, nothing, svg } from "lit";
import { customElement, property, query, queryAll, queryAssignedElements, state } from "lit/decorators.js";
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { keyed } from "lit/directives/keyed.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
//#region src/components/_internal/format.ts
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
function stripMask$1(value) {
	return value.replace(/\D/g, "");
}
/**
* Formats a string as a Brazilian CPF (XXX.XXX.XXX-XX).
*
* @example maskCPF('12345678900') // "123.456.789-00"
* @example maskCPF('123.456.789-00') // "123.456.789-00"
*/
function maskCPF(value) {
	const digits = stripMask$1(value).slice(0, 11);
	if (digits.length !== 11) return value;
	return digits.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
/**
* Formats a string as a Brazilian CNPJ (XX.XXX.XXX/XXXX-XX).
*
* @example maskCNPJ('11222333000181') // "11.222.333/0001-81"
*/
function maskCNPJ(value) {
	const digits = stripMask$1(value).slice(0, 14);
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
	const digits = stripMask$1(value).slice(0, 11);
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
//#region src/components/light-dom/metadata.ts
var metaStyles = css`
  :host { display: none; }
`;
var AuyCompMetadata = class AuyCompMetadata extends LitElement {
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
		return html`<style>${metaStyles}</style>`;
	}
};
__decorate([property({ type: String })], AuyCompMetadata.prototype, "title", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "description", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "canonical", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogTitle", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogDescription", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogImage", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogUrl", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogType", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "ogSiteName", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twCard", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twSite", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twCreator", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twTitle", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twDescription", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "twImage", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "jsonLd", void 0);
__decorate([property({ type: String })], AuyCompMetadata.prototype, "robots", void 0);
AuyCompMetadata = __decorate([customElement("auy-comp-metadata")], AuyCompMetadata);
//#endregion
//#region src/components/light-dom/file-input.ts
var FILE_ICONS = {
	pdf: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"9\" y1=\"15\" x2=\"15\" y2=\"15\"/><line x1=\"9\" y1=\"11\" x2=\"12\" y2=\"11\"/></svg>",
	image: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" ry=\"2\"/><circle cx=\"8.5\" cy=\"8.5\" r=\"1.5\"/><polyline points=\"21 15 16 10 5 21\"/></svg>",
	zip: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v6\"/><path d=\"M21 15v4a2 2 0 0 1-2 2h-2\"/><polyline points=\"17 11 19 13 21 11\"/><polyline points=\"17 17 19 19 21 17\"/></svg>",
	code: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polyline points=\"16 18 22 12 16 6\"/><polyline points=\"8 6 2 12 8 18\"/></svg>",
	word: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"9\" y1=\"13\" x2=\"15\" y2=\"13\"/><line x1=\"9\" y1=\"17\" x2=\"13\" y2=\"17\"/><line x1=\"7\" y1=\"9\" x2=\"9.5\" y2=\"9\"/></svg>",
	sheet: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\"/><polyline points=\"14 2 14 8 20 8\"/><line x1=\"8\" y1=\"13\" x2=\"16\" y2=\"13\"/><line x1=\"8\" y1=\"17\" x2=\"16\" y2=\"17\"/><line x1=\"8\" y1=\"9\" x2=\"10\" y2=\"9\"/></svg>",
	audio: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M9 18V5l12-2v13\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><circle cx=\"18\" cy=\"16\" r=\"3\"/></svg>",
	video: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"23 7 16 12 23 17 23 7\"/><rect x=\"1\" y=\"5\" width=\"15\" height=\"14\" rx=\"2\" ry=\"2\"/></svg>",
	file: "<svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z\"/><polyline points=\"13 2 13 9 20 9\"/></svg>"
};
function getFileIcon(name, type) {
	if (type.startsWith("image/")) return FILE_ICONS.image;
	if (type.startsWith("audio/")) return FILE_ICONS.audio;
	if (type.startsWith("video/")) return FILE_ICONS.video;
	const ext = name.split(".").pop()?.toLowerCase() ?? "";
	if ([
		"zip",
		"rar",
		"7z",
		"tar",
		"gz"
	].includes(ext)) return FILE_ICONS.zip;
	if (["pdf"].includes(ext)) return FILE_ICONS.pdf;
	if ([
		"doc",
		"docx",
		"odt",
		"rtf"
	].includes(ext)) return FILE_ICONS.word;
	if ([
		"xls",
		"xlsx",
		"csv",
		"ods"
	].includes(ext)) return FILE_ICONS.sheet;
	if ([
		"js",
		"ts",
		"jsx",
		"tsx",
		"py",
		"java",
		"c",
		"cpp",
		"h",
		"css",
		"html",
		"php",
		"rb",
		"go",
		"rs",
		"swift",
		"kt",
		"sql",
		"sh",
		"yaml",
		"json",
		"xml",
		"md"
	].includes(ext)) return FILE_ICONS.code;
	return FILE_ICONS.file;
}
var fiStyles = css`
  label {
    display: block;
    font-size: var(--auy-text-sm);
    font-weight: var(--auy-font-weight-medium);
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
    padding: var(--auy-space-lg);
    border: 2px dashed var(--auy-color-border);
    border-radius: var(--auy-radius-md);
    background: color-mix(in oklch, var(--auy-color-border) 5%, transparent);
    cursor: pointer;
    transition: border-color var(--auy-transition), background var(--auy-transition);
    touch-action: manipulation;
    min-block-size: 8rem;
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

  .dropzone.has-files {
    padding: var(--auy-space-md);
    align-items: stretch;
  }

  .empty-icon { font-size: var(--auy-text-4xl); line-height: 1; opacity: 0.4; }

  .empty-text { font-size: var(--auy-text-sm); color: var(--auy-color-text-muted); text-align: center; }

  .hint { font-size: var(--auy-text-xs); color: var(--auy-color-text-muted); opacity: 0.7; }

  input[type="file"] {
    position: absolute; inset: 0; opacity: 0; cursor: pointer;
  }

  .file-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
    gap: var(--auy-space-sm);
    inline-size: 100%;
  }

  .file-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--auy-space-2xs);
    padding: var(--auy-space-sm) var(--auy-space-xs);
    border-radius: var(--auy-radius-sm);
    background: color-mix(in oklch, var(--auy-color-border) 10%, transparent);
    position: relative;
    min-inline-size: 0;
  }

  .file-card:hover {
    background: color-mix(in oklch, var(--auy-color-border) 18%, transparent);
  }

  .file-card-thumb {
    inline-size: 3rem;
    block-size: 3rem;
    border-radius: var(--auy-radius-sm);
    object-fit: cover;
    flex-shrink: 0;
    background: color-mix(in oklch, var(--auy-color-border) 8%, transparent);
  }

  .file-card-icon {
    inline-size: 2.5rem;
    block-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--auy-color-text-muted);
  }

  .file-card-icon svg {
    inline-size: 100%;
    block-size: 100%;
  }

  .file-card-name {
    font-size: var(--auy-text-xs);
    color: var(--auy-color-text);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-inline-size: 100%;
    line-height: 1.3;
  }

  .file-card-size {
    font-size: var(--auy-text-2xs);
    color: var(--auy-color-text-muted);
    opacity: 0.7;
  }

  .file-card-remove {
    all: unset;
    position: absolute;
    inset-block-start: 0.125rem;
    inset-inline-end: 0.125rem;
    inline-size: 1.25rem;
    block-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--auy-radius-full);
    background: color-mix(in oklch, var(--auy-color-border) 40%, transparent);
    cursor: pointer;
    font-size: var(--auy-text-xs);
    line-height: 1;
    color: var(--auy-color-text-muted);
    opacity: 0;
    transition: opacity var(--auy-transition-fast), background var(--auy-transition-fast);
    touch-action: manipulation;
  }

  .file-card:hover .file-card-remove,
  .file-card-remove:focus-visible {
    opacity: 1;
  }

  .file-card-remove:hover {
    background: var(--auy-color-error);
    color: oklch(100% 0 0);
  }

  .file-card-remove:focus-visible {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: 0.125rem;
    opacity: 1;
  }

  .add-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--auy-space-2xs);
    padding: var(--auy-space-sm) var(--auy-space-xs);
    border-radius: var(--auy-radius-sm);
    border: 1px dashed var(--auy-color-border);
    color: var(--auy-color-text-muted);
    font-size: var(--auy-text-xs);
    min-block-size: 6rem;
    cursor: pointer;
    transition: border-color var(--auy-transition), background var(--auy-transition);
  }
  .add-more:hover {
    border-color: var(--auy-color-primary);
    background: color-mix(in oklch, var(--auy-color-primary) 4%, transparent);
  }

  .add-more-icon {
    inline-size: 1.5rem;
    block-size: 1.5rem;
    opacity: 0.5;
  }
  .add-more-icon svg { inline-size: 100%; block-size: 100%; }

  @media (forced-colors: active) {
    .dropzone { border: 2px solid ButtonText; }
    .dropzone:focus-visible { outline: 2px solid Highlight; outline-offset: 2px; }
    .file-card-remove:focus-visible { outline: 2px solid Highlight; outline-offset: 2px; }
  }
  @media print { .file-card { display: none; } }
`;
var AuyCompFileInput = class AuyCompFileInput extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.multiple = false;
		this.accept = "";
		this.maxSize = 5 * 1024 * 1024;
		this.action = "";
		this.headers = "";
		this.chunkSize = 0;
		this._files = [];
		this._previewUrls = [];
		this._dragover = false;
	}
	createRenderRoot() {
		return this;
	}
	get files() {
		return this._files;
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
		this._previewUrls.forEach((u) => this._revokeUrl(u));
		this._previewUrls = [];
		if (this.multiple) this._files = [...this._files, ...filtered];
		else this._files = filtered.slice(0, 1);
		this._previewUrls = this._files.map((f) => {
			if (f.type.startsWith("image/")) return this._getFileUrl(f);
			return "";
		});
		this._dispatchChange();
	}
	_removeFile(index) {
		if (this._previewUrls[index]) this._revokeUrl(this._previewUrls[index]);
		this._previewUrls = this._previewUrls.filter((_, i) => i !== index);
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
	_getFileUrl(file) {
		return URL.createObjectURL(file);
	}
	_revokeUrl(url) {
		URL.revokeObjectURL(url);
	}
	/** Limpa todos os arquivos selecionados e revoga as URLs de preview. */
	clear() {
		this._previewUrls.forEach((u) => this._revokeUrl(u));
		this._previewUrls = [];
		this._files = [];
		this._dispatchChange();
	}
	/** Envia os arquivos via fetch para a URL definida em `action`. */
	async upload() {
		if (this._files.length === 0 || !this.action) return null;
		const formData = new FormData();
		for (const file of this._files) formData.append("files", file);
		const headersObj = {};
		if (this.headers) try {
			Object.assign(headersObj, JSON.parse(this.headers));
		} catch {}
		try {
			const res = await fetch(this.action, {
				method: "POST",
				headers: headersObj,
				body: formData
			});
			this.dispatchEvent(new CustomEvent("upload-complete", {
				detail: {
					response: res,
					ok: res.ok
				},
				bubbles: true,
				composed: true
			}));
			return res;
		} catch (err) {
			this.dispatchEvent(new CustomEvent("upload-error", {
				detail: { error: err },
				bubbles: true,
				composed: true
			}));
			return null;
		}
	}
	_renderFilePreview(f, i) {
		if (this._previewUrls[i]) return html`<img class="file-card-thumb" src=${this._previewUrls[i]} alt="" />`;
		return html`
      <div class="file-card-icon">${unsafeHTML(getFileIcon(f.name, f.type))}</div>
    `;
	}
	render() {
		const hasFiles = this._files.length > 0;
		return html`
      <style>${fiStyles}</style>
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div
        part="dropzone"
        class="dropzone ${this._dragover ? "dragover" : ""} ${hasFiles ? "has-files" : ""}"
        @dragover=${(e) => {
			e.preventDefault();
			this._dragover = true;
		}}
        @dragleave=${() => {
			this._dragover = false;
		}}
        @drop=${this._handleDrop}
      >
        ${hasFiles ? html`
          <div class="file-grid">
            ${this._files.map((f, i) => html`
              <div class="file-card">
                ${this._renderFilePreview(f, i)}
                <span class="file-card-name" title=${f.name}>${f.name}</span>
                <span class="file-card-size">${this._formatSize(f.size)}</span>
                <button class="file-card-remove" @click=${(e) => {
			e.stopPropagation();
			this._removeFile(i);
		}} aria-label="Remover ${f.name}">&times;</button>
              </div>
            `)}
            ${this.multiple ? html`
              <div class="add-more">
                <div class="add-more-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span>Adicionar mais</span>
              </div>
            ` : nothing}
          </div>
        ` : html`
          <div class="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="inline-size:2rem;block-size:2rem;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <div class="empty-text">Arraste arquivos aqui ou clique para selecionar</div>
        `}
        <div class="hint">${this.accept ? `Formatos: ${this.accept}` : ""}${this.maxSize && !this.accept ? `Tamanho máximo: ${this._formatSize(this.maxSize)}` : ""}${this.maxSize && this.accept ? ` · Máx: ${this._formatSize(this.maxSize)}` : ""}</div>
        <input
          type="file"
          ?multiple=${this.multiple}
          accept=${this.accept || nothing}
          @change=${this._handleChange}
          aria-label=${this.label || "Selecionar arquivo"}
        />
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyCompFileInput.prototype, "label", void 0);
__decorate([property({ type: Boolean })], AuyCompFileInput.prototype, "multiple", void 0);
__decorate([property({ type: String })], AuyCompFileInput.prototype, "accept", void 0);
__decorate([property({ type: Number })], AuyCompFileInput.prototype, "maxSize", void 0);
__decorate([property({ type: String })], AuyCompFileInput.prototype, "action", void 0);
__decorate([property({ type: String })], AuyCompFileInput.prototype, "headers", void 0);
__decorate([property({ type: Number })], AuyCompFileInput.prototype, "chunkSize", void 0);
__decorate([state()], AuyCompFileInput.prototype, "_files", void 0);
__decorate([state()], AuyCompFileInput.prototype, "_dragover", void 0);
AuyCompFileInput = __decorate([customElement("auy-comp-file-input")], AuyCompFileInput);
//#endregion
//#region src/components/light-dom/date-input.ts
var dateInputIdCounter = 0;
var diStyles = css`
  label {
    display: block;
    font-size: var(--auy-text-sm);
    font-weight: var(--auy-font-weight-medium);
    color: var(--auy-color-text);
    margin-block-end: var(--auy-space-xs);
  }

  .required-star {
    color: var(--auy-color-error);
  }

  input[type="date"] {
    box-sizing: border-box;
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
    touch-action: manipulation;
  }

  input[type="date"]:hover {
    border-color: var(--auy-color-primary-hover);
  }

  input[type="date"]:focus-visible {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: 0.125rem;
  }

  input[type="date"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input[type="date"]:user-invalid {
    border-color: var(--auy-color-error);
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    padding: 0;
    margin: 0;
    inline-size: 1.25rem;
    block-size: 1.25rem;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity var(--auy-transition-fast);
  }
  input[type="date"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
  }

  input[type="date"]::-webkit-datetime-edit {
    display: flex;
    gap: 0.125rem;
  }

  input[type="date"]::-webkit-datetime-edit-text {
    color: var(--auy-color-text-muted);
    opacity: 0.5;
  }

  input[type="date"]::-webkit-inner-spin-button {
    display: none;
  }

  @media (forced-colors: active) {
    input[type="date"] { border: 1px solid ButtonText; }
    input[type="date"]:focus-visible { outline: 0.125rem solid Highlight; outline-offset: 0.125rem; }
  }
  @media (prefers-reduced-motion: reduce) { input[type="date"] { transition: none; } }
  @media print { input[type="date"] { border: 1px solid CanvasText; } }
`;
var AuyCompDateInput = class AuyCompDateInput extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.value = "";
		this.label = "";
		this.min = "";
		this.max = "";
		this.disabled = false;
		this.required = false;
		this.name = "";
		this._inputId = `auy-date-input-${++dateInputIdCounter}`;
	}
	createRenderRoot() {
		return this;
	}
	_handleChange(e) {
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
      <style>${diStyles}</style>
      ${this.label ? html`<label for=${this._inputId}>${this.label}${this.required ? html`<span class="required-star" aria-hidden="true"> *</span>` : nothing}</label>` : nothing}
      <input
        type="date"
        id=${this._inputId}
        .value=${this.value}
        ?disabled=${this.disabled}
        ?required=${this.required}
        name=${this.name || nothing}
        min=${this.min || nothing}
        max=${this.max || nothing}
        aria-label=${this.label || nothing}
        aria-required=${this.required ? "true" : nothing}
        @change=${this._handleChange}
      />
    `;
	}
};
__decorate([property({ type: String })], AuyCompDateInput.prototype, "value", void 0);
__decorate([property({ type: String })], AuyCompDateInput.prototype, "label", void 0);
__decorate([property({ type: String })], AuyCompDateInput.prototype, "min", void 0);
__decorate([property({ type: String })], AuyCompDateInput.prototype, "max", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompDateInput.prototype, "disabled", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompDateInput.prototype, "required", void 0);
__decorate([property({ type: String })], AuyCompDateInput.prototype, "name", void 0);
AuyCompDateInput = __decorate([customElement("auy-comp-date-input")], AuyCompDateInput);
//#endregion
//#region src/components/light-dom/form-group.ts
var formGroupIdCounter = 0;
var MASK_PATTERNS = {
	cpf: "000.000.000-00",
	cnpj: "00.000.000/0000-00",
	phone: "(00) 00000-0000",
	cep: "00000-000",
	date: "00/00/0000"
};
function applyMask(raw, pattern) {
	let result = "";
	let ri = 0;
	const digits = raw.replace(/\D/g, "");
	for (let pi = 0; pi < pattern.length && ri < digits.length; pi++) if (pattern[pi] === "0") result += digits[ri++];
	else result += pattern[pi];
	return result;
}
function stripMask(value) {
	return value.replace(/\D/g, "");
}
function isValidCPF(v) {
	const d = stripMask(v);
	if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
	let s = 0;
	for (let i = 0; i < 9; i++) s += +d[i] * (10 - i);
	let r = s * 10 % 11;
	if (r === 10) r = 0;
	if (r !== +d[9]) return false;
	s = 0;
	for (let i = 0; i < 10; i++) s += +d[i] * (11 - i);
	r = s * 10 % 11;
	if (r === 10) r = 0;
	return r === +d[10];
}
function isValidCNPJ(v) {
	const d = stripMask(v);
	if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
	const w1 = [
		5,
		4,
		3,
		2,
		9,
		8,
		7,
		6,
		5,
		4,
		3,
		2
	];
	const w2 = [
		6,
		5,
		4,
		3,
		2,
		9,
		8,
		7,
		6,
		5,
		4,
		3,
		2
	];
	let s = 0;
	for (let i = 0; i < 12; i++) s += +d[i] * w1[i];
	let r = s % 11 < 2 ? 0 : 11 - s % 11;
	if (r !== +d[12]) return false;
	s = 0;
	for (let i = 0; i < 13; i++) s += +d[i] * w2[i];
	r = s % 11 < 2 ? 0 : 11 - s % 11;
	return r === +d[13];
}
function isValidEmail(v) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
var VALIDATORS = {
	required: (v) => !v.trim() ? "Campo obrigatório" : null,
	cpf: (v) => {
		const d = stripMask(v);
		return d.length > 0 && !isValidCPF(d) ? "CPF inválido" : null;
	},
	cnpj: (v) => {
		const d = stripMask(v);
		return d.length > 0 && !isValidCNPJ(d) ? "CNPJ inválido" : null;
	},
	email: (v) => !!v && !isValidEmail(v) ? "E-mail inválido" : null,
	minLength: (v, p) => v.length < +(p ?? 0) ? `Mínimo ${p} caracteres` : null,
	maxLength: (v, p) => v.length > +(p ?? 0) ? `Máximo ${p} caracteres` : null,
	pattern: (v, p) => {
		if (!p || !v) return null;
		return new RegExp(p).test(v) ? null : "Formato inválido";
	},
	strongPassword: (v) => {
		if (!v) return null;
		const errors = [];
		if (v.length < 8) errors.push("mínimo 8 caracteres");
		if (!/[A-Z]/.test(v)) errors.push("uma letra maiúscula");
		if (!/[a-z]/.test(v)) errors.push("uma letra minúscula");
		if (!/\d/.test(v)) errors.push("um número");
		if (!/[^A-Za-z0-9]/.test(v)) errors.push("um caractere especial");
		return errors.length ? "Requer " + errors.join(", ") : null;
	}
};
function parseRules(rules) {
	return rules.split(",").map((r) => r.trim()).filter(Boolean).map((r) => {
		const [key, ...rest] = r.split(":");
		return {
			key,
			param: rest.join(":") || void 0
		};
	});
}
function findInput(root) {
	return root.querySelector("input:not([type=\"hidden\"]), textarea, select") ?? null;
}
var fgStyles = css`
  .fg-wrap {
    display: block;
  }
  .fg-wrap[inline] {
    display: flex;
    align-items: flex-start;
    gap: var(--auy-space-md);
  }
  .fg-wrap[inline] .label-wrap {
    padding-block-start: var(--auy-space-sm);
    min-inline-size: 8rem;
  }

  label {
    display: block;
    font-size: var(--auy-text-sm);
    font-weight: var(--auy-font-weight-medium);
    color: var(--auy-color-text);
    margin-block-end: var(--auy-space-2xs);
  }

  .required-star {
    color: var(--auy-color-error);
    margin-inline-start: 0.125em;
  }

  .hint {
    font-size: var(--auy-text-xs);
    color: var(--auy-color-text-muted);
    margin-block-start: var(--auy-space-2xs);
  }

  .error {
    font-size: var(--auy-text-xs);
    color: var(--auy-color-error);
    margin-block-start: var(--auy-space-2xs);
    display: flex;
    align-items: center;
    gap: var(--auy-space-2xs);
  }

  slot:not([name]) {
    display: none;
  }

  @media (forced-colors: active) {
    .error {
      border: 1px solid ButtonText;
      padding: var(--auy-space-2xs) var(--auy-space-xs);
    }
  }

  @media print {
    .hint, .error {
      display: none;
    }
  }
`;
var AuyCompFormGroup = class AuyCompFormGroup extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.label = "";
		this.hint = "";
		this.error = "";
		this.required = false;
		this.for = "";
		this.inline = false;
		this.mask = "";
		this.validate = "";
		this._hintId = `auy-fg-hint-${++formGroupIdCounter}`;
		this._errorId = `auy-fg-error-${formGroupIdCounter}`;
		this._input = null;
		this._validationRules = [];
		this._maskPattern = "";
		this._onInput = (e) => {
			const el = e.target;
			if (this._maskPattern) {
				const raw = el.value;
				const masked = applyMask(raw, this._maskPattern);
				if (masked !== raw) {
					const pos = el.selectionStart ?? raw.length;
					el.value = masked;
					const newPos = Math.max(pos - (raw.length - masked.length), 0);
					el.setSelectionRange(newPos, newPos);
				}
			}
			this._runValidation();
		};
		this._onBlur = () => {
			this._runValidation();
		};
	}
	createRenderRoot() {
		return this;
	}
	_runValidation() {
		if (!this._input || this._validationRules.length === 0) return;
		const value = this._input.value;
		for (const rule of this._validationRules) {
			const fn = VALIDATORS[rule.key];
			if (fn) {
				const err = fn(value, rule.param);
				if (err) {
					this.error = err;
					this._input.setAttribute("aria-invalid", "true");
					this.requestUpdate();
					return;
				}
			}
		}
		if (this.error) {
			this.error = "";
			this._input.removeAttribute("aria-invalid");
			this.requestUpdate();
		}
	}
	_setupInput() {
		this._input = findInput(this);
		if (!this._input) return;
		this._input.removeEventListener("input", this._onInput);
		this._input.removeEventListener("blur", this._onBlur);
		this._maskPattern = MASK_PATTERNS[this.mask] ?? this.mask;
		this._validationRules = this.validate ? parseRules(this.validate) : [];
		if (this.required && !this._validationRules.some((r) => r.key === "required")) this._validationRules.unshift({ key: "required" });
		if (this.for && !this._input.id) this._input.id = this.for;
		if (this.required) this._input.toggleAttribute("required", true);
		this._input.addEventListener("input", this._onInput);
		this._input.addEventListener("blur", this._onBlur);
	}
	connectedCallback() {
		super.connectedCallback();
	}
	/** Configura o input e a validação após a primeira renderização. */
	firstUpdated() {
		this._moveInputIntoContent();
		this._setupInput();
	}
	/** Reconfigura máscara/validação quando as propriedades mudam. */
	updated(changed) {
		if (changed.has("mask") || changed.has("validate") || changed.has("required")) this._setupInput();
	}
	_moveInputIntoContent() {
		const input = this.querySelector("input:not([type=\"hidden\"]), textarea, select");
		const content = this.querySelector("[part=\"content\"]");
		if (input && content) content.insertBefore(input, content.querySelector("slot"));
	}
	/** Remove os listeners de input e blur ao desconectar. */
	disconnectedCallback() {
		if (this._input) {
			this._input.removeEventListener("input", this._onInput);
			this._input.removeEventListener("blur", this._onBlur);
		}
		super.disconnectedCallback();
	}
	render() {
		const descIds = [this.hint ? this._hintId : "", this.error ? this._errorId : ""].filter(Boolean).join(" ");
		return html`
      <style>${fgStyles}</style>
      <div class="fg-wrap" ?inline=${this.inline}>
        ${this.label ? html`
          <div class="label-wrap">
            <label for=${this.for || nothing}>
              <slot name="label">${this.label}</slot>
              ${this.required ? html`<span class="required-star" aria-hidden="true">*</span>` : nothing}
            </label>
          </div>
        ` : nothing}
        <div part="content">
          <slot
            aria-describedby=${descIds || nothing}
            aria-invalid=${this.error ? "true" : nothing}
          ></slot>
          ${this.hint ? html`<div class="hint" id=${this._hintId}>${this.hint}</div>` : nothing}
          ${this.error ? html`<div class="error" id=${this._errorId} role="alert" aria-live="polite">${this.error}</div>` : nothing}
        </div>
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyCompFormGroup.prototype, "label", void 0);
__decorate([property({ type: String })], AuyCompFormGroup.prototype, "hint", void 0);
__decorate([property({ type: String })], AuyCompFormGroup.prototype, "error", void 0);
__decorate([property({ type: Boolean })], AuyCompFormGroup.prototype, "required", void 0);
__decorate([property({ type: String })], AuyCompFormGroup.prototype, "for", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompFormGroup.prototype, "inline", void 0);
__decorate([property({ type: String })], AuyCompFormGroup.prototype, "mask", void 0);
__decorate([property({ type: String })], AuyCompFormGroup.prototype, "validate", void 0);
AuyCompFormGroup = __decorate([customElement("auy-comp-form-group")], AuyCompFormGroup);
//#endregion
//#region src/components/light-dom/search.ts
function highlight(text, query) {
	if (!query) return [text];
	const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	return text.split(new RegExp(`(${escaped})`, "gi")).map((part, i) => i % 2 === 1 ? html`<mark style="background:var(--auy-color-primary);color:var(--auy-color-on-primary);border-radius:2px;padding:0 2px">${part}</mark>` : part);
}
var searchStyles = `
  auy-comp-search { display: block; }

  .overlay {
    position: fixed;
    inset: 0;
    z-index: var(--auy-z-overlay);
    background: var(--auy-color-overlay, oklch(0% 0 0 / 0.4));
    display: none;
    align-items: flex-start;
    justify-content: center;
    padding-block-start: 15dvh;
    animation: overlay-in 200ms ease both;
  }
  .overlay.open { display: flex; }

  auy-comp-search[position="center"] .overlay {
    align-items: center;
    padding-block-start: 0;
  }
  auy-comp-search[position="top"] .overlay {
    align-items: flex-start;
    padding-block-start: 5dvh;
  }

  @keyframes overlay-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .panel {
    background: var(--auy-color-surface);
    border-radius: var(--auy-radius-lg);
    box-shadow: var(--auy-shadow-lg);
    inline-size: min(40rem, 90dvw);
    max-block-size: 60dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  auy-comp-search[size="sm"] .panel { inline-size: min(28rem, 90dvw); }
  auy-comp-search[size="lg"] .panel { inline-size: min(52rem, 90dvw); }
  auy-comp-search[size="full"] .panel { inline-size: min(60rem, 94dvw); max-block-size: 80dvh; }

  auy-comp-search[variant="elevated"] .panel {
    box-shadow: 0 1rem 3rem color-mix(in oklch, var(--auy-color-border) 40%, transparent);
  }

  auy-comp-search[variant="bordered"] .panel {
    box-shadow: none;
    border: 1px solid var(--auy-color-border);
  }

  auy-comp-search[variant="bordered"] .overlay {
    background: var(--auy-color-overlay, oklch(0% 0 0 / 0.25));
  }

  .input-wrap {
    display: flex;
    align-items: center;
    gap: var(--auy-space-sm);
    padding: var(--auy-space-md);
    border-block-end: 1px solid var(--auy-color-border);
  }

  .input-wrap input {
    flex: 1;
    border: none;
    outline: none;
    font-size: var(--auy-text-lg);
    background: transparent;
    color: var(--auy-color-text);
    font-family: inherit;
    touch-action: manipulation;
  }

  .icon {
    display: inline-flex;
    align-items: center;
    color: var(--auy-color-text-muted);
    opacity: 0.5;
  }
  .icon svg { inline-size: 1.25rem; block-size: 1.25rem; }

  .close-btn {
    all: unset;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    inline-size: 2rem;
    block-size: 2rem;
    border-radius: var(--auy-radius-lg);
    cursor: pointer;
    font-size: var(--auy-text-xl);
    line-height: 1;
    color: inherit;
    flex-shrink: 0;
    touch-action: manipulation;
  }
  .close-btn:hover { background: color-mix(in srgb, currentColor 10%, transparent); }
  .close-btn:focus-visible {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: 0.125rem;
  }

  .hint {
    display: inline-flex;
    align-items: center;
    padding: 0.125rem 0.375rem;
    border: 1px solid var(--auy-color-border);
    border-radius: 0.25rem;
    font-size: var(--auy-text-xs);
    font-family: inherit;
    color: var(--auy-color-text-muted);
  }

  .results {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;
    padding: var(--auy-space-xs);
    list-style: none;
    margin: 0;
  }

  .result-item {
    display: flex;
    align-items: center;
    gap: var(--auy-space-sm);
    padding: var(--auy-space-sm) var(--auy-space-md);
    border-radius: var(--auy-radius-md);
    cursor: pointer;
    touch-action: manipulation;
  }
  .result-item.sel { background: color-mix(in oklch, var(--auy-color-primary) 10%, transparent); }

  .result-content { flex: 1; display: grid; gap: 0.125rem; }
  .result-label { font-size: var(--auy-text-sm); font-weight: var(--auy-font-weight-medium); color: var(--auy-color-text); }
  .result-desc { font-size: var(--auy-text-xs); color: var(--auy-color-text-muted); }
  .result-cat { font-size: var(--auy-text-xs); color: var(--auy-color-primary); }

  .empty {
    padding: var(--auy-space-xl);
    text-align: center;
    color: var(--auy-color-text-muted);
  }

  .footer {
    display: flex;
    gap: var(--auy-space-md);
    padding: var(--auy-space-sm) var(--auy-space-md);
    border-block-start: 1px solid var(--auy-color-border);
    font-size: var(--auy-text-xs);
    color: var(--auy-color-text-muted);
    justify-content: center;
  }

  search { display: contents; }

  @media (forced-colors: active) {
    .overlay { background: Canvas; }
    .close-btn:focus-visible { outline: 2px solid Highlight; outline-offset: 2px; }
    .result-item.sel { background: Highlight; color: HighlightText; }
  }
  @media (prefers-reduced-motion: reduce) { .overlay { animation: none; } }
  @media print { .overlay { background: transparent; } }
`;
var AuyCompSearch = class AuyCompSearch extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.items = [];
		this.placeholder = "Buscar...";
		this.open = false;
		this.shortcut = "k";
		this.src = "";
		this.debounceMs = 300;
		this.variant = "default";
		this.size = "md";
		this.position = "default";
		this._query = "";
		this._selectedIndex = 0;
		this._filtered = [];
		this._debounceTimer = null;
		this._fetchController = null;
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
	createRenderRoot() {
		return this;
	}
	willUpdate(changed) {
		if (changed.has("items") || changed.has("_query")) this._filtered = this._filterItems();
	}
	/** Registra o listener global de teclado para o atalho de busca. */
	connectedCallback() {
		super.connectedCallback();
		if (typeof window !== "undefined") document.addEventListener("keydown", this._onGlobalKeydown);
	}
	/** Remove o listener global de teclado. */
	disconnectedCallback() {
		super.disconnectedCallback();
		if (typeof window !== "undefined") document.removeEventListener("keydown", this._onGlobalKeydown);
	}
	updated(changed) {
		if (changed.has("open") && this.open) requestAnimationFrame(() => {
			this.querySelector("input")?.focus();
		});
	}
	_filterItems() {
		if (!this._query) return this.items.slice(0, 10);
		const q = this._query.toLowerCase();
		return this.items.filter((item) => item.label.toLowerCase().includes(q) || item.description && item.description.toLowerCase().includes(q));
	}
	async _fetchResults(query) {
		if (!this.src) return;
		this._fetchController?.abort();
		this._fetchController = new AbortController();
		try {
			const url = new URL(this.src, window.location.href);
			url.searchParams.set("q", query);
			const res = await fetch(url.toString(), { signal: this._fetchController.signal });
			if (!res.ok) throw new Error("Search failed");
			const data = await res.json();
			if (Array.isArray(data)) this.items = data;
			else if (data.results) this.items = data.results;
		} catch (e) {
			if (e instanceof DOMException && e.name === "AbortError") return;
			this.items = [];
		}
	}
	_onInput(e) {
		this._query = e.target.value;
		this._selectedIndex = 0;
		if (this.src) {
			clearTimeout(this._debounceTimer);
			this._debounceTimer = window.setTimeout(() => this._fetchResults(this._query), this.debounceMs);
		}
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
		if (e.target.classList.contains("overlay")) this._close();
	}
	render() {
		const filtered = this._filtered;
		return html`
      <style>${searchStyles}</style>
      <div class="overlay ${this.open ? "open" : ""}" @click=${this._closeOnOverlay}>
        <div class="panel" role="dialog" aria-modal="true" aria-label="Busca">
          <search>
          <div class="input-wrap">
            <span class="icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg></span>
            <input
              .value=${this._query}
              @input=${this._onInput}
              @keydown=${this._onKeydown}
              placeholder=${this.placeholder}
              aria-label="Buscar"
              ?autofocus=${this.open}
            />
            <button class="close-btn" @click=${this._close} aria-label="Fechar busca">×</button>
            <kbd class="hint">ESC</kbd>
          </div>
          ${filtered.length > 0 ? html`
            <ul class="results" role="listbox">
              ${keyed(this._filtered, filtered.map((item, idx) => html`
                <li
                  class="result-item ${this._selectedIndex === idx ? "sel" : ""}"
                  role="option"
                  data-index="${idx}"
                  aria-selected=${this._selectedIndex === idx ? "true" : "false"}
                  @click=${this._handleSelect}
                  @mouseenter=${this._handleMouseEnter}
                >
                  ${item.icon ? html`<span style="flex-shrink:0;inline-size:1.25rem;block-size:1.25rem;">${item.icon}</span>` : ""}
                  <div class="result-content">
                    <span class="result-label">${highlight(item.label, this._query)}</span>
                    ${item.description ? html`<span class="result-desc">${highlight(item.description, this._query)}</span>` : ""}
                  </div>
                  ${item.category ? html`<span class="result-cat">${item.category}</span>` : ""}
                </li>
              `))}
            </ul>
          ` : html`
            <div class="empty">Nenhum resultado encontrado</div>
          `}
          <div class="footer">
            <span>↑↓ Navegar</span>
            <span>↵ Selecionar</span>
            <span>ESC Fechar</span>
          </div>
          </search>
        </div>
      </div>
    `;
	}
};
__decorate([property({ type: Array })], AuyCompSearch.prototype, "items", void 0);
__decorate([property({ type: String })], AuyCompSearch.prototype, "placeholder", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompSearch.prototype, "open", void 0);
__decorate([property({ type: String })], AuyCompSearch.prototype, "shortcut", void 0);
__decorate([property({ type: String })], AuyCompSearch.prototype, "src", void 0);
__decorate([property({ type: Number })], AuyCompSearch.prototype, "debounceMs", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyCompSearch.prototype, "variant", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyCompSearch.prototype, "size", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyCompSearch.prototype, "position", void 0);
__decorate([state()], AuyCompSearch.prototype, "_query", void 0);
__decorate([state()], AuyCompSearch.prototype, "_selectedIndex", void 0);
__decorate([state()], AuyCompSearch.prototype, "_filtered", void 0);
__decorate([state()], AuyCompSearch.prototype, "_debounceTimer", void 0);
AuyCompSearch = __decorate([customElement("auy-comp-search")], AuyCompSearch);
//#endregion
//#region src/components/light-dom/select.ts
var selectIdCounter = 0;
var styles = css`
  .trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    inline-size: 100%;
    box-sizing: border-box;
    padding: var(--auy-space-sm) var(--auy-space-md);
    font-family: inherit;
    font-size: var(--auy-text-sm);
    color: var(--auy-color-text);
    background: var(--auy-color-surface);
    border: 1px solid var(--auy-color-border);
    border-radius: var(--auy-radius-md);
    cursor: pointer;
    transition: border-color var(--auy-transition);
    touch-action: manipulation;
    text-align: start;
    gap: var(--auy-space-sm);
    min-block-size: 2.5rem;
  }

  .trigger:hover {
    border-color: var(--auy-color-primary-hover);
  }

  .trigger:focus-visible {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: 0.125rem;
  }

  .trigger[aria-expanded="true"] {
    border-color: var(--auy-color-primary);
  }

  .trigger.placeholder {
    color: var(--auy-color-text-muted);
  }

  .arrow {
    flex-shrink: 0;
    font-size: var(--auy-text-xs);
    transition: transform var(--auy-transition);
    color: var(--auy-color-text-muted);
  }

  .arrow.open {
    transform: rotate(180deg);
  }

  .dropdown {
    position: absolute;
    inset-block-start: calc(100% + var(--auy-space-2xs));
    inset-inline-start: 0;
    inline-size: 100%;
    background: var(--auy-color-surface);
    border: 1px solid var(--auy-color-border);
    border-radius: var(--auy-radius-md);
    box-shadow: var(--auy-shadow-md);
    max-block-size: 16rem;
    overflow-y: auto;
    display: none;
    z-index: var(--auy-z-dropdown, 10);
  }

  .dropdown.open {
    display: block;
  }

  .search-input {
    box-sizing: border-box;
    inline-size: 100%;
    padding: var(--auy-space-sm) var(--auy-space-md);
    border: none;
    border-block-end: 1px solid var(--auy-color-border);
    font-family: inherit;
    font-size: var(--auy-text-sm);
    background: transparent;
    color: var(--auy-color-text);
    outline: none;
  }

  .search-input:focus-visible {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: -0.125rem;
  }

  .option-list {
    list-style: none;
    margin: 0;
    padding: var(--auy-space-2xs);
  }

  .option {
    padding: var(--auy-space-sm) var(--auy-space-md);
    border-radius: var(--auy-radius-sm);
    cursor: pointer;
    font-size: var(--auy-text-sm);
    color: var(--auy-color-text);
    touch-action: manipulation;
  }

  .option:hover {
    background: color-mix(in oklch, var(--auy-color-primary) 8%, transparent);
  }

  .option[aria-selected="true"] {
    background: color-mix(in oklch, var(--auy-color-primary) 15%, transparent);
    font-weight: var(--auy-font-weight-medium);
  }

  .option.focused {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: -0.125rem;
  }

  .option[aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .no-results {
    padding: var(--auy-space-md);
    text-align: center;
    font-size: var(--auy-text-sm);
    color: var(--auy-color-text-muted);
  }

  .wrap {
    position: relative;
  }

  label {
    display: block;
    font-size: var(--auy-text-sm);
    font-weight: var(--auy-font-weight-medium);
    color: var(--auy-color-text);
    margin-block-end: var(--auy-space-2xs);
  }

  @media (forced-colors: active) {
    .trigger, .dropdown { border: 1px solid ButtonText; }
    .option:hover, .option[aria-selected="true"] { outline: 2px solid Highlight; }
  }

  @media (prefers-reduced-motion: reduce) {
    .trigger, .arrow { transition: none; }
  }

  @media print {
    .dropdown { display: none !important; }
    .trigger { border: 1px solid CanvasText; }
  }
`;
var AuyCompSelect = class AuyCompSelect extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.options = [];
		this.value = "";
		this.label = "";
		this.placeholder = "Selecione...";
		this.searchable = true;
		this.disabled = false;
		this.required = false;
		this.name = "";
		this.multiple = false;
		this._open = false;
		this._query = "";
		this._focusedIndex = 0;
		this._selectId = `auy-select-${++selectIdCounter}`;
		this._listboxId = `auy-select-listbox-${selectIdCounter}`;
	}
	createRenderRoot() {
		return this;
	}
	get _selectedOption() {
		return this.options.find((o) => o.value === this.value);
	}
	get _filteredOptions() {
		if (!this._query) return this.options;
		const q = this._query.toLowerCase();
		return this.options.filter((o) => o.label.toLowerCase().includes(q));
	}
	_toggle() {
		if (this.disabled) return;
		this._open = !this._open;
		if (this._open) {
			this._focusedIndex = this._filteredOptions.findIndex((o) => o.value === this.value);
			if (this._focusedIndex < 0) this._focusedIndex = 0;
			requestAnimationFrame(() => {
				if (this.searchable) this._searchInput?.focus();
				this._focusOption(this._focusedIndex);
			});
		}
	}
	_close() {
		this._open = false;
		this._query = "";
		this._trigger?.focus();
	}
	_select(option) {
		if (option.disabled) return;
		this.value = option.value;
		this._close();
		this.dispatchEvent(new CustomEvent("change", {
			detail: {
				value: option.value,
				label: option.label
			},
			bubbles: true,
			composed: true
		}));
	}
	_onSearch(e) {
		this._query = e.target.value;
		this._focusedIndex = 0;
	}
	_onKeydown(e) {
		if (!this._open) {
			if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
				e.preventDefault();
				this._toggle();
			}
			return;
		}
		const filtered = this._filteredOptions;
		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				this._focusedIndex = Math.min(this._focusedIndex + 1, filtered.length - 1);
				this._focusOption(this._focusedIndex);
				break;
			case "ArrowUp":
				e.preventDefault();
				this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
				this._focusOption(this._focusedIndex);
				break;
			case "Enter":
				e.preventDefault();
				if (filtered[this._focusedIndex]) this._select(filtered[this._focusedIndex]);
				break;
			case "Escape":
				e.preventDefault();
				this._close();
				break;
			case "Tab":
				this._close();
				break;
		}
	}
	_focusOption(index) {
		this.querySelector(`[data-index="${index}"]`)?.focus();
	}
	_onBlur(e) {
		if (this.disabled) return;
		const related = e.relatedTarget;
		if (related && this.contains(related)) return;
		this._close();
	}
	_clickOutside(e) {
		if (this._open && !this.contains(e.target)) this._close();
	}
	/** Registra o listener para fechar o dropdown ao clicar fora. */
	connectedCallback() {
		super.connectedCallback();
		if (typeof document !== "undefined") document.addEventListener("mousedown", this._clickOutside);
	}
	/** Remove o listener de clique externo. */
	disconnectedCallback() {
		super.disconnectedCallback();
		if (typeof document !== "undefined") document.removeEventListener("mousedown", this._clickOutside);
	}
	render() {
		const selected = this._selectedOption;
		const filtered = this._filteredOptions;
		return html`
      <style>${styles}</style>
      <input type="hidden" name=${this.name || nothing} .value=${this.value} aria-hidden="true" />
      ${this.label ? html`<label for=${this._selectId}>${this.label}</label>` : nothing}
      <div class="wrap">
        <div
          id=${this._selectId}
          class="trigger ${selected ? "" : "placeholder"}"
          role="combobox"
          aria-expanded=${this._open ? "true" : "false"}
          aria-controls=${this._listboxId}
          aria-haspopup="listbox"
          aria-label=${this.label || nothing}
          tabindex=${this.disabled ? "-1" : "0"}
          ?disabled=${this.disabled}
          @click=${this._toggle}
          @keydown=${this._onKeydown}
          @blur=${this._onBlur}
        >
          <span>${selected ? selected.label : this.placeholder}</span>
          <span class="arrow ${this._open ? "open" : ""}">▼</span>
        </div>
        <div class="dropdown ${this._open ? "open" : ""}">
          ${this.searchable ? html`
            <input
              class="search-input"
              type="text"
              .value=${this._query}
              @input=${this._onSearch}
              placeholder="Buscar..."
              aria-label="Buscar opção"
            />
          ` : nothing}
          ${filtered.length > 0 ? html`
            <ul class="option-list" id=${this._listboxId} role="listbox">
              ${filtered.map((opt, i) => html`
                <li
                  class="option ${classMap({ focused: i === this._focusedIndex })}"
                  role="option"
                  data-index="${i}"
                  aria-selected=${opt.value === this.value ? "true" : "false"}
                  aria-disabled=${opt.disabled ? "true" : nothing}
                  tabindex=${i === this._focusedIndex ? "0" : "-1"}
                  @click=${() => this._select(opt)}
                  @keydown=${(e) => {
			if (e.key === "Enter") this._select(opt);
		}}
                >${opt.label}</li>
              `)}
            </ul>
          ` : html`
            <div class="no-results">Nenhum resultado encontrado</div>
          `}
        </div>
      </div>
    `;
	}
};
__decorate([property({ type: Array })], AuyCompSelect.prototype, "options", void 0);
__decorate([property({ type: String })], AuyCompSelect.prototype, "value", void 0);
__decorate([property({ type: String })], AuyCompSelect.prototype, "label", void 0);
__decorate([property({ type: String })], AuyCompSelect.prototype, "placeholder", void 0);
__decorate([property({ type: Boolean })], AuyCompSelect.prototype, "searchable", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompSelect.prototype, "disabled", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompSelect.prototype, "required", void 0);
__decorate([property({ type: String })], AuyCompSelect.prototype, "name", void 0);
__decorate([property({ type: Boolean })], AuyCompSelect.prototype, "multiple", void 0);
__decorate([state()], AuyCompSelect.prototype, "_open", void 0);
__decorate([state()], AuyCompSelect.prototype, "_query", void 0);
__decorate([state()], AuyCompSelect.prototype, "_focusedIndex", void 0);
__decorate([query(".trigger")], AuyCompSelect.prototype, "_trigger", void 0);
__decorate([query(".search-input")], AuyCompSelect.prototype, "_searchInput", void 0);
AuyCompSelect = __decorate([customElement("auy-comp-select")], AuyCompSelect);
//#endregion
//#region src/components/shadow-dom/tabs.ts
var AuyCompTabs = class AuyCompTabs extends LitElement {
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
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
      }
      [part='tabs']::-webkit-scrollbar { block-size: 0.25rem; }
      [part='tabs']::-webkit-scrollbar-thumb { background: var(--auy-color-border); border-radius: var(--auy-radius-full); }

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
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted, oklch(45% 0.03 260));
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        white-space: nowrap;
        scroll-snap-align: start;
        flex-shrink: 0;
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

      [part='panel-container'] {
        display: grid;
      }

      [part='panel'] {
        grid-area: 1 / 1;
        padding: var(--auy-space-md, 16px);
        opacity: 0;
        transform: translateY(0.375rem);
        pointer-events: none;
        transition: opacity var(--auy-transition), transform var(--auy-transition);
        visibility: hidden;
      }

      [part='panel']:not([aria-hidden='true']) {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
        visibility: visible;
      }

      :host([orientation='vertical']) [part='panel'] {
        flex: 1;
      }

      @media print {
        [part='panel-container'] {
          display: block;
        }
        [part='panel'] {
          display: block !important;
          opacity: 1 !important;
          transform: none !important;
          visibility: visible !important;
          pointer-events: auto !important;
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
        <div part="panel-container">
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
        </div>
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
__decorate([property({ type: Array })], AuyCompTabs.prototype, "tabs", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyCompTabs.prototype, "activeTab", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyCompTabs.prototype, "orientation", void 0);
__decorate([query("[part=\"indicator\"]")], AuyCompTabs.prototype, "_indicator", void 0);
__decorate([queryAll("[part=\"tab\"]")], AuyCompTabs.prototype, "_tabButtons", void 0);
AuyCompTabs = __decorate([customElement("auy-comp-tabs")], AuyCompTabs);
//#endregion
//#region src/components/shadow-dom/toast.ts
var AuyCompToast = class AuyCompToast extends LitElement {
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
        background: oklch(from var(--auy-color-info) 95% 0.04 h);
      }

      .toast--success {
        border-inline-start: 3px solid var(--auy-color-success);
        background: oklch(from var(--auy-color-success) 95% 0.04 h);
      }

      .toast--error {
        border-inline-start: 3px solid var(--auy-color-error);
        background: oklch(from var(--auy-color-error) 95% 0.04 h);
      }

      .toast--warning {
        border-inline-start: 3px solid var(--auy-color-warning);
        background: oklch(from var(--auy-color-warning) 95% 0.04 h);
      }

      @media (prefers-color-scheme: dark) {
        .toast--info { background: oklch(from var(--auy-color-info) 25% 0.06 h); }
        .toast--success { background: oklch(from var(--auy-color-success) 25% 0.06 h); }
        .toast--error { background: oklch(from var(--auy-color-error) 25% 0.06 h); }
        .toast--warning { background: oklch(from var(--auy-color-warning) 25% 0.06 h); }
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
        aria-atomic="true"
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
__decorate([property({ type: String })], AuyCompToast.prototype, "variant", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompToast.prototype, "open", void 0);
__decorate([property({ type: Number })], AuyCompToast.prototype, "duration", void 0);
__decorate([property({ type: Boolean })], AuyCompToast.prototype, "dismissible", void 0);
AuyCompToast = __decorate([customElement("auy-comp-toast")], AuyCompToast);
//#endregion
//#region src/components/shadow-dom/toast-container.ts
var AuyCompToastContainer = class AuyCompToastContainer extends LitElement {
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
        z-index: var(--auy-z-toast);
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
        background: oklch(from var(--auy-color-info) 95% 0.04 h);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
        pointer-events: auto;
        max-inline-size: 24rem;
        animation: toast-in var(--auy-transition, 200ms) ease forwards;
        border-inline-start: 3px solid var(--auy-color-info);
      }

      .toast--info {
        background: oklch(from var(--auy-color-info) 95% 0.04 h);
        border-inline-start-color: var(--auy-color-info);
      }

      .toast--success {
        background: oklch(from var(--auy-color-success) 95% 0.04 h);
        border-inline-start-color: var(--auy-color-success);
      }

      .toast--error {
        background: oklch(from var(--auy-color-error) 95% 0.04 h);
        border-inline-start-color: var(--auy-color-error);
      }

      .toast--warning {
        background: oklch(from var(--auy-color-warning) 95% 0.04 h);
        border-inline-start-color: var(--auy-color-warning);
      }

      @media (prefers-color-scheme: dark) {
        .toast--info { background: oklch(from var(--auy-color-info) 25% 0.06 h); }
        .toast--success { background: oklch(from var(--auy-color-success) 25% 0.06 h); }
        .toast--error { background: oklch(from var(--auy-color-error) 25% 0.06 h); }
        .toast--warning { background: oklch(from var(--auy-color-warning) 25% 0.06 h); }
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
          transform: translateX(-100%);
        }
        to {
          opacity: 0;
          transform: translateX(0);
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
        font-size: var(--auy-text-lg);
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
	/** Exibe um novo toast e retorna seu ID. */
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
	/** Remove um toast pelo ID com animação de saída. */
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
})], AuyCompToastContainer.prototype, "position", void 0);
__decorate([property({ type: Number })], AuyCompToastContainer.prototype, "defaultDuration", void 0);
__decorate([state()], AuyCompToastContainer.prototype, "_toasts", void 0);
AuyCompToastContainer = __decorate([customElement("auy-comp-toast-container")], AuyCompToastContainer);
//#endregion
//#region src/components/shadow-dom/pagination.ts
var AuyCompPagination = class AuyCompPagination extends LitElement {
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
        color: var(--auy-color-primary-inverse);
        font-weight: var(--auy-font-weight-semibold);
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

      .visually-hidden {
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
          rel="prev"
          ?disabled=${this._firstPage}
          @click=${this._goPrev}
          aria-label="Página anterior"
        >
          <slot name="prev-icon">‹</slot>
        </button>
        ${pages.map((p) => typeof p === "string" ? html`<button part="btn ellipsis" class="ellipsis" disabled aria-hidden="true"><span aria-hidden="true">${p}</span><span class="visually-hidden">Pular páginas</span></button>` : html`
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
          rel="next"
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
})], AuyCompPagination.prototype, "current", void 0);
__decorate([property({ type: Number })], AuyCompPagination.prototype, "total", void 0);
__decorate([property({ type: Number })], AuyCompPagination.prototype, "perPage", void 0);
__decorate([property({ type: Number })], AuyCompPagination.prototype, "maxVisible", void 0);
__decorate([property({ type: Boolean })], AuyCompPagination.prototype, "disabled", void 0);
__decorate([state()], AuyCompPagination.prototype, "_totalPages", void 0);
__decorate([state()], AuyCompPagination.prototype, "_firstPage", void 0);
__decorate([state()], AuyCompPagination.prototype, "_lastPage", void 0);
__decorate([state()], AuyCompPagination.prototype, "_pages", void 0);
AuyCompPagination = __decorate([customElement("auy-comp-pagination")], AuyCompPagination);
//#endregion
//#region src/components/shadow-dom/code-editor.ts
var AuyCompCodeEditor = class AuyCompCodeEditor extends LitElement {
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
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "value", void 0);
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "language", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompCodeEditor.prototype, "readonly", void 0);
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "theme", void 0);
__decorate([property({ type: Boolean })], AuyCompCodeEditor.prototype, "lineNumbers", void 0);
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "height", void 0);
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "placeholder", void 0);
__decorate([property({ type: String })], AuyCompCodeEditor.prototype, "cmOptions", void 0);
__decorate([state()], AuyCompCodeEditor.prototype, "_lines", void 0);
__decorate([state()], AuyCompCodeEditor.prototype, "_cmLoaded", void 0);
__decorate([query("textarea")], AuyCompCodeEditor.prototype, "_textarea", void 0);
__decorate([query(".gutter")], AuyCompCodeEditor.prototype, "_gutter", void 0);
__decorate([query(".cm-host")], AuyCompCodeEditor.prototype, "_cmHost", void 0);
AuyCompCodeEditor = __decorate([customElement("auy-comp-code-editor")], AuyCompCodeEditor);
//#endregion
//#region src/components/shadow-dom/audio.ts
var ICONS$1 = {
	play: html`<svg viewBox="0 0 24 24" fill="currentColor" style="inline-size:1.25rem;block-size:1.25rem;"><path d="M8 5.14v14.72a1 1 0 0 0 1.5.86l11-7.36a1 1 0 0 0 0-1.72l-11-7.36A1 1 0 0 0 8 5.14z"/></svg>`,
	pause: html`<svg viewBox="0 0 24 24" fill="currentColor" style="inline-size:1.25rem;block-size:1.25rem;"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`,
	skipBack: html`<svg viewBox="0 0 24 24" fill="currentColor" style="inline-size:1rem;block-size:1rem;"><path d="M17 5l-9 7 9 7V5z"/><path d="M11 5l-9 7 9 7V5z"/></svg>`,
	skipForward: html`<svg viewBox="0 0 24 24" fill="currentColor" style="inline-size:1rem;block-size:1rem;"><path d="M7 19l9-7-9-7v14z"/><path d="M13 19l9-7-9-7v14z"/></svg>`,
	volumeHigh: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="inline-size:1rem;block-size:1rem;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
	volumeLow: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="inline-size:1rem;block-size:1rem;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`,
	volumeMute: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="inline-size:1rem;block-size:1rem;"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
	download: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="inline-size:1rem;block-size:1rem;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
	chevronDown: html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="inline-size:0.75rem;block-size:0.75rem;"><polyline points="6 9 12 15 18 9"/></svg>`
};
var AuyCompAudio = class AuyCompAudio extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.src = "";
		this.title = "";
		this.showDownload = true;
		this.showTranscript = false;
		this._playing = false;
		this._currentTime = 0;
		this._duration = 0;
		this._volume = 1;
		this._muted = false;
		this._speed = 1;
		this._speedOpen = false;
		this._audio = null;
		this._waveInterval = null;
		this._seeking = false;
	}
	static {
		this.styles = css`
    :host {
      display: block;
      contain: layout style;
    }

    .player {
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-lg);
      background: var(--auy-color-surface);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--auy-space-sm);
      padding: var(--auy-space-md) var(--auy-space-md) 0;
    }

    .title {
      font-size: var(--auy-text-sm);
      font-weight: var(--auy-font-weight-semibold);
      color: var(--auy-color-text);
      display: flex;
      align-items: center;
      gap: var(--auy-space-2xs);
    }

    .wave {
      display: flex;
      align-items: flex-end;
      gap: 2px;
      block-size: 1.25rem;
    }
    .wave span {
      display: inline-block;
      inline-size: 3px;
      background: var(--auy-color-primary);
      border-radius: 2px;
      block-size: 5px;
      transition: block-size 0.15s;
    }

    .body {
      padding: var(--auy-space-md);
      display: flex;
      flex-direction: column;
      gap: var(--auy-space-sm);
    }

    .progress-row {
      display: flex;
      align-items: center;
      gap: var(--auy-space-sm);
    }

    .progress-track {
      flex: 1;
      position: relative;
      cursor: pointer;
    }
    .progress-track input[type="range"] {
      display: block;
      inline-size: 100%;
      margin: 0;
      accent-color: var(--auy-color-primary);
      cursor: pointer;
    }

    .time {
      display: flex;
      justify-content: space-between;
      font-size: var(--auy-text-xs);
      color: var(--auy-color-text-muted);
      font-variant-numeric: tabular-nums;
      margin-block-start: var(--auy-space-2xs);
    }

    .controls {
      display: flex;
      align-items: center;
      gap: var(--auy-space-xs);
      flex-wrap: wrap;
    }

    .icon-btn {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 2.5rem;
      block-size: 2.5rem;
      border-radius: var(--auy-radius-full);
      cursor: pointer;
      touch-action: manipulation;
      transition: background var(--auy-transition-fast), transform var(--auy-transition-fast);
      flex-shrink: 0;
      color: var(--auy-color-text-muted);
    }
    .icon-btn:hover {
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
      color: var(--auy-color-text);
    }
    .icon-btn:active {
      transform: scale(0.92);
    }
    .icon-btn:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.125rem;
    }

    .icon-btn--play {
      inline-size: 2.75rem;
      block-size: 2.75rem;
      background: var(--auy-color-primary);
      color: var(--auy-color-primary-inverse);
      box-shadow: 0 0.125rem 0.375rem color-mix(in oklch, var(--auy-color-primary) 25%, transparent);
    }
    .icon-btn--play:hover {
      background: var(--auy-color-primary);
      color: var(--auy-color-primary-inverse);
      transform: scale(1.06);
    }
    .icon-btn--play:active {
      transform: scale(0.94);
    }

    .vol-wrap {
      display: flex;
      align-items: center;
      gap: var(--auy-space-2xs);
      margin-inline-start: auto;
    }
    .vol-bar {
      inline-size: 3.75rem;
      accent-color: var(--auy-color-primary);
      cursor: pointer;
      margin: 0;
    }

    .speed-wrap {
      position: relative;
    }

    .speed-btn {
      all: unset;
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.5rem;
      font-size: var(--auy-text-xs);
      font-weight: var(--auy-font-weight-medium);
      font-family: inherit;
      color: var(--auy-color-text-muted);
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-sm);
      cursor: pointer;
      touch-action: manipulation;
      transition: border-color var(--auy-transition-fast), color var(--auy-transition-fast);
      line-height: 1;
    }
    .speed-btn:hover {
      border-color: var(--auy-color-primary);
      color: var(--auy-color-primary);
    }
    .speed-btn:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.0625rem;
    }

    .speed-menu {
      position: absolute;
      inset-block-start: 100%;
      inset-inline-end: 0;
      z-index: var(--auy-z-dropdown, 100);
      background: var(--auy-color-surface);
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-md);
      box-shadow: var(--auy-shadow-md);
      padding: var(--auy-space-2xs);
      list-style: none;
      margin: var(--auy-space-2xs) 0 0;
      display: none;
      min-inline-size: 8rem;
    }
    .speed-menu--open {
      display: block;
    }

    .speed-opt {
      all: unset;
      display: block;
      inline-size: 100%;
      padding: var(--auy-space-2xs) var(--auy-space-sm);
      font-size: var(--auy-text-xs);
      border-radius: var(--auy-radius-sm);
      cursor: pointer;
      box-sizing: border-box;
      text-align: start;
      white-space: nowrap;
      color: var(--auy-color-text);
    }
    .speed-opt:hover {
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
    }
    .speed-opt:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.0625rem;
    }
    .speed-opt--active {
      color: var(--auy-color-primary);
      font-weight: var(--auy-font-weight-semibold);
    }

    .dload {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      inline-size: 2.5rem;
      block-size: 2.5rem;
      border-radius: var(--auy-radius-full);
      color: var(--auy-color-text-muted);
      text-decoration: none;
      transition: background var(--auy-transition-fast), color var(--auy-transition-fast);
    }
    .dload:hover {
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
      color: var(--auy-color-primary);
    }
    .dload:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.125rem;
    }

    .transcript {
      border-block-start: 1px solid var(--auy-color-border);
      padding: var(--auy-space-md);
      padding-block-start: var(--auy-space-sm);
    }

    .spacer { flex: 1; }

    @media (forced-colors: active) {
      .icon-btn--play { border: 1px solid ButtonText; }
    }
    @media (prefers-reduced-motion: reduce) {
      .wave span { transition: none; }
      .icon-btn { transition: none; }
      .icon-btn:hover { transform: none; }
      .icon-btn:active { transform: none; }
    }
    @media print {
      .icon-btn--play { display: none; }
    }
  `;
	}
	_formatTime(s) {
		if (isNaN(s) || !isFinite(s)) return "0:00";
		return `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;
	}
	_onLoaded() {
		if (!this._audio) return;
		this._duration = this._audio.duration;
	}
	_togglePlay() {
		if (!this._audio) return;
		if (this._audio.paused) {
			const p = this._audio.play();
			if (p) p.catch(() => {});
		} else this._audio.pause();
	}
	_onPlay() {
		this._playing = true;
		this._startWave();
	}
	_onPause() {
		this._playing = false;
		this._stopWave();
	}
	_onEnded() {
		this._playing = false;
		this._currentTime = 0;
		this._stopWave();
		this.dispatchEvent(new CustomEvent("ended", {
			bubbles: true,
			composed: true
		}));
	}
	_onTimeUpdate() {
		if (!this._seeking && this._audio) this._currentTime = this._audio.currentTime;
	}
	_onSeekStart() {
		this._seeking = true;
	}
	_onSeek(e) {
		const val = Number(e.target.value);
		this._currentTime = val;
	}
	_onSeekEnd(e) {
		this._seeking = false;
		if (this._audio) this._audio.currentTime = Number(e.target.value);
	}
	_skip(sec) {
		if (!this._audio) return;
		this._audio.currentTime = Math.max(0, Math.min(this._audio.duration, this._audio.currentTime + sec));
	}
	_toggleMute() {
		if (!this._audio) return;
		this._audio.muted = !this._audio.muted;
		this._muted = this._audio.muted;
	}
	_onVolume(e) {
		if (!this._audio) return;
		const val = Number(e.target.value);
		this._audio.volume = val;
		this._volume = val;
		if (val === 0) {
			this._audio.muted = true;
			this._muted = true;
		} else if (this._muted) {
			this._audio.muted = false;
			this._muted = false;
		}
	}
	_setSpeed(speed) {
		if (this._audio) this._audio.playbackRate = speed;
		this._speed = speed;
		this._speedOpen = false;
	}
	_startWave() {
		this._stopWave();
		this._waveInterval = setInterval(() => {
			const spans = this.shadowRoot?.querySelectorAll(".wave span");
			if (!spans) return;
			spans.forEach((s) => {
				s.style.blockSize = `${Math.floor(Math.random() * 14) + 5}px`;
			});
		}, 150);
	}
	_stopWave() {
		if (this._waveInterval) {
			clearInterval(this._waveInterval);
			this._waveInterval = null;
		}
		const spans = this.shadowRoot?.querySelectorAll(".wave span");
		if (spans) spans.forEach((s) => {
			s.style.blockSize = "5px";
		});
	}
	_handleKey(e) {
		if (e.key === " " || e.key === "Space") {
			e.preventDefault();
			this._togglePlay();
		}
	}
	_volumeIcon() {
		if (this._muted || this._volume === 0) return ICONS$1.volumeMute;
		return this._volume < .5 ? ICONS$1.volumeLow : ICONS$1.volumeHigh;
	}
	render() {
		return html`
      <div class="player" @keydown=${this._handleKey}>
        <div class="header">
          <span class="title">${this.title || "Player de Áudio"}</span>
          <div class="wave" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
        </div>

        <audio
          src=${this.src}
          @loadedmetadata=${this._onLoaded}
          @loadeddata=${this._onLoaded}
          @play=${this._onPlay}
          @pause=${this._onPause}
          @ended=${this._onEnded}
          @timeupdate=${this._onTimeUpdate}
          preload="metadata"
          style="display:none"
        ></audio>

        <div class="body">
          <div class="progress-row">
            <div class="progress-track">
              <input
                type="range"
                min="0"
                max=${this._duration || 0}
                .value=${this._currentTime}
                @input=${this._onSeek}
                @change=${this._onSeekEnd}
                @mousedown=${this._onSeekStart}
                @touchstart=${this._onSeekStart}
                aria-label="Progresso da reprodução"
                step="0.1"
              />
              <div class="time">
                <span>${this._formatTime(this._currentTime)}</span>
                <span>${this._formatTime(this._duration)}</span>
              </div>
            </div>
          </div>

          <div class="controls">
            <button
              class="icon-btn icon-btn--play"
              @click=${this._togglePlay}
              aria-label=${this._playing ? "Pausar áudio" : "Reproduzir áudio"}
              title=${this._playing ? "Pausar" : "Reproduzir"}
            >${this._playing ? ICONS$1.pause : ICONS$1.play}</button>

            <button class="icon-btn" @click=${() => this._skip(-10)} aria-label="Voltar 10 segundos" title="-10s">${ICONS$1.skipBack}</button>
            <button class="icon-btn" @click=${() => this._skip(10)} aria-label="Avançar 10 segundos" title="+10s">${ICONS$1.skipForward}</button>

            <div class="spacer"></div>

            <div class="speed-wrap">
              <button class="speed-btn" @click=${() => {
			this._speedOpen = !this._speedOpen;
		}} aria-haspopup="true" aria-expanded=${this._speedOpen} aria-label="Velocidade de reprodução">
                ${this._speed}x ${ICONS$1.chevronDown}
              </button>
              <div class="speed-menu ${this._speedOpen ? "speed-menu--open" : ""}" role="menu">
                ${[
			.5,
			.75,
			1,
			1.25,
			1.5,
			2
		].map((s) => html`
                  <button
                    class="speed-opt ${s === this._speed ? "speed-opt--active" : ""}"
                    @click=${() => this._setSpeed(s)}
                    role="menuitem"
                  >${s}x${s === 1 ? " (Normal)" : s < 1 ? " (Mais lento)" : " (Mais rápido)"}</button>
                `)}
              </div>
            </div>

            <div class="vol-wrap">
              <button class="icon-btn" @click=${this._toggleMute} aria-label=${this._muted ? "Ativar som" : "Mutar áudio"} title=${this._muted ? "Ativar" : "Mutar"}>${this._volumeIcon()}</button>
              <input
                type="range"
                class="vol-bar"
                min="0" max="1" step="0.05"
                .value=${this._muted ? 0 : this._volume}
                @input=${this._onVolume}
                aria-label="Volume"
              />
            </div>

            ${this.showDownload && this.src ? html`
              <a href=${this.src} class="dload" download aria-label="Baixar áudio" title="Download">${ICONS$1.download}</a>
            ` : nothing}
          </div>
        </div>

        ${this.showTranscript ? html`
          <div class="transcript">
            <slot name="transcript">
              <details>
                <summary>Exibir texto da narração</summary>
                <p style="font-size:var(--auy-text-sm);color:var(--auy-color-text-muted);margin:var(--auy-space-sm) 0 0">
                  <slot name="transcript-text">Transcrição não disponível.</slot>
                </p>
              </details>
            </slot>
          </div>
        ` : nothing}
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyCompAudio.prototype, "src", void 0);
__decorate([property({ type: String })], AuyCompAudio.prototype, "title", void 0);
__decorate([property({ type: Boolean })], AuyCompAudio.prototype, "showDownload", void 0);
__decorate([property({ type: Boolean })], AuyCompAudio.prototype, "showTranscript", void 0);
__decorate([state()], AuyCompAudio.prototype, "_playing", void 0);
__decorate([state()], AuyCompAudio.prototype, "_currentTime", void 0);
__decorate([state()], AuyCompAudio.prototype, "_duration", void 0);
__decorate([state()], AuyCompAudio.prototype, "_volume", void 0);
__decorate([state()], AuyCompAudio.prototype, "_muted", void 0);
__decorate([state()], AuyCompAudio.prototype, "_speed", void 0);
__decorate([state()], AuyCompAudio.prototype, "_speedOpen", void 0);
AuyCompAudio = __decorate([customElement("auy-comp-audio")], AuyCompAudio);
//#endregion
//#region src/components/shadow-dom/color-input.ts
function hsvToSrgb(H, S, V) {
	H = (H % 360 + 360) % 360;
	S = Math.max(0, Math.min(1, S));
	V = Math.max(0, Math.min(1, V));
	if (S === 0) return [
		V,
		V,
		V
	];
	const c = V * S;
	const x = c * (1 - Math.abs(H / 60 % 2 - 1));
	const m = V - c;
	const h = H / 60;
	if (h < 1) return [
		c + m,
		x + m,
		m
	];
	if (h < 2) return [
		x + m,
		c + m,
		m
	];
	if (h < 3) return [
		m,
		c + m,
		x + m
	];
	if (h < 4) return [
		m,
		x + m,
		c + m
	];
	if (h < 5) return [
		x + m,
		m,
		c + m
	];
	return [
		c + m,
		m,
		x + m
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
function toHex(c) {
	return Math.round(clamp(c, 0, 1) * 255).toString(16).padStart(2, "0");
}
function formatHex(H, S, V) {
	const [r, g, b] = hsvToSrgb(H, S, V);
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
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
function srgbInv(c) {
	const a = Math.abs(c);
	return a > .04045 ? Math.sign(c) * Math.pow((a + .055) / 1.055, 2.4) : c / 12.92;
}
function srgbFwd(c) {
	const a = Math.abs(c);
	return a > .0031308 ? Math.sign(c) * (1.055 * Math.pow(a, 1 / 2.4) - .055) : c * 12.92;
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
	return `oklch(${(L * 100).toFixed(1)}% ${(C * 100).toFixed(2)} ${hue.toFixed(0)})`;
}
function parseOklch(s) {
	const m = s.match(/oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)/);
	if (!m) return null;
	return {
		L: parseFloat(m[1]) / 100,
		C: parseFloat(m[2]) / 100,
		H: parseFloat(m[3])
	};
}
function oklchToSrgb(L, C, H) {
	const a = C * Math.cos(H * Math.PI / 180);
	const b = C * Math.sin(H * Math.PI / 180);
	const l_ = L + .3963377774 * a + .2158037573 * b;
	const m_ = L - .1055613458 * a - .0638541728 * b;
	const s_ = L - .0894841775 * a - 1.291485548 * b;
	const ll = l_ * l_ * l_;
	const mm = m_ * m_ * m_;
	const ss = s_ * s_ * s_;
	const r = 4.0767416621 * ll - 3.3077115913 * mm + .2309699292 * ss;
	const g = -1.2684380046 * ll + 2.6097574011 * mm - .3413193965 * ss;
	const b_ = -.0041960863 * ll - .7034186147 * mm + 1.707614701 * ss;
	return [
		srgbFwd(r),
		srgbFwd(g),
		srgbFwd(b_)
	];
}
var AuyCompColorInput = class AuyCompColorInput extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.value = "#3B82F6";
		this.label = "";
		this.showEyedropper = true;
		this.showAlpha = true;
		this.showRecent = true;
		this.recentCount = 8;
		this._H = hexToHsv("#3B82F6")[0];
		this._S = hexToHsv("#3B82F6")[1];
		this._V = hexToHsv("#3B82F6")[2];
		this._alpha = 1;
		this._copiedFormat = null;
		this._recent = [];
		this._prevValue = "";
		this._dragTarget = null;
		this._pendingRecent = null;
		this._updatingValue = false;
		this._schedulePending = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host { display: block; }

      label {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: var(--auy-font-weight-medium);
        color: var(--auy-color-text);
        margin-block-end: var(--auy-space-xs);
      }

      .picker {
        display: grid;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-lg);
        box-sizing: border-box;
      }

      .hsv-wrap {
        position: relative;
        inline-size: min(100%, 260px);
        aspect-ratio: 1 / 1;
        margin-inline: auto;
        cursor: crosshair;
        touch-action: none;
      }

      .hsv-wrap canvas {
        display: block;
        inline-size: 100%;
        block-size: 100%;
        border-radius: var(--auy-radius-md);
      }

      .ring-indicator {
        position: absolute;
        pointer-events: none;
        inline-size: 14px; block-size: 14px;
        border: 2.5px solid #fff;
        border-radius: 50%;
        box-shadow:
          0 0 0 1px rgba(0,0,0,.3),
          0 0 8px var(--_ring-glow, rgba(0,0,0,.3));
        translate: -50% -50%;
        transition: box-shadow 0.2s;
      }

      .tri-indicator {
        position: absolute;
        pointer-events: none;
        inline-size: 14px; block-size: 14px;
        border: 2.5px solid #fff;
        border-radius: 50%;
        box-shadow:
          0 0 0 1px rgba(0,0,0,.3),
          0 0 6px rgba(0,0,0,.15);
        translate: -50% -50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .tri-indicator::after {
        content: '';
        display: block;
        inline-size: 5px; block-size: 5px;
        border-radius: 50%;
        background: var(--_tri-dot);
        box-shadow: 0 0 0 1px rgba(255,255,255,.6);
      }

      .preview-row {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
      }

      .preview-stack {
        display: flex;
        border-radius: var(--auy-radius-sm);
        overflow: hidden;
        flex-shrink: 0;
        box-shadow: inset 0 0 0 1px rgba(0,0,0,.08);
      }

      .preview-swatch {
        inline-size: 28px; block-size: 22px;
        transition: background 0.15s;
      }

      .preview-swatch.old {
        border-inline-end: 1px solid rgba(0,0,0,.06);
      }

      .preview-swatch + .preview-swatch {
        border-inline-start: 1px solid rgba(255,255,255,.15);
      }

      .hex-input {
        flex: 1;
        font-family: var(--auy-font-mono);
        font-size: var(--auy-text-sm);
        border: none;
        background: transparent;
        color: var(--auy-color-text);
        padding: var(--auy-space-2xs) 0;
        outline: none;
        border-block-end: 1.5px solid var(--auy-color-border);
        transition: border-color 0.15s;
        min-inline-size: 0;
      }

      .hex-input:focus {
        border-block-end-color: var(--auy-color-primary);
      }

      .hex-input::placeholder {
        color: var(--auy-color-text-muted);
      }

      .alpha-row {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        position: relative;
      }

      .alpha-track-wrap {
        flex: 1;
        min-inline-size: 0;
        position: relative;
        block-size: 6px;
        border-radius: 3px;
        overflow: hidden;
      }

      .alpha-track-wrap::before {
        content: '';
        position: absolute; inset: 0;
        background: repeating-conic-gradient(rgba(0,0,0,.08) 0% 25%, transparent 0% 50%) 0 0 / 8px 8px;
        z-index: 0;
        border-radius: inherit;
      }

      .alpha-track-bg {
        position: absolute; inset: 0;
        z-index: 1;
        border-radius: inherit;
      }

      .alpha-range {
        -webkit-appearance: none;
        appearance: none;
        display: block;
        inline-size: calc(100% + 16px);
        block-size: 16px;
        margin: -5px -8px;
        outline: none;
        cursor: pointer;
        position: relative;
        z-index: 2;
        background: transparent;
      }

      .alpha-range::-webkit-slider-runnable-track {
        block-size: 6px;
        border-radius: 3px;
      }

      .alpha-range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        inline-size: 16px; block-size: 16px;
        border-radius: 50%;
        background: var(--auy-color-surface);
        border: 2px solid #fff;
        box-shadow: 0 1px 4px rgba(0,0,0,.25);
        margin-block-start: -5px;
        cursor: pointer;
      }

      .alpha-range::-moz-range-track {
        block-size: 6px;
        border-radius: 3px;
      }

      .alpha-range::-moz-range-thumb {
        inline-size: 16px; block-size: 16px;
        border-radius: 50%;
        background: var(--auy-color-surface);
        border: 2px solid #fff;
        box-shadow: 0 1px 4px rgba(0,0,0,.25);
        cursor: pointer;
      }

      .alpha-label {
        font-family: var(--auy-font-mono);
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        min-inline-size: 3ch;
        text-align: end;
        flex-shrink: 0;
      }

      .formats { display: flex; flex-wrap: wrap; gap: var(--auy-space-2xs); }

      .format-chip {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-2xs);
        padding: .25em .55em;
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

      .format-chip .chip-swatch {
        display: inline-block;
        inline-size: 8px; block-size: 8px;
        border-radius: 2px;
        flex-shrink: 0;
        box-shadow: inset 0 0 0 1px rgba(0,0,0,.1);
      }

      .format-chip .chip-label {
        font-weight: var(--auy-font-weight-semibold);
        color: var(--auy-color-text);
      }

      .format-chip.copied {
        border-color: var(--auy-color-success);
        color: var(--auy-color-success);
      }

      .format-chip.copied .chip-label,
      .format-chip.copied .chip-value {
        color: var(--auy-color-success);
      }

      .format-chip.oklch-chip {
        border-color: color-mix(in oklch, var(--auy-color-primary) 35%, transparent);
        background: color-mix(in oklch, var(--auy-color-primary) 8%, transparent);
      }

      .format-chip.oklch-chip:hover {
        border-color: var(--auy-color-primary);
        background: color-mix(in oklch, var(--auy-color-primary) 12%, transparent);
      }

      .toolbar {
        display: flex;
        gap: var(--auy-space-sm);
        align-items: center;
      }

      .toolbar .formats { flex: 1; }

      .eyedropper {
        display: inline-flex; align-items: center; justify-content: center;
        inline-size: 2rem; block-size: 2rem;
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-sm);
        background: var(--auy-color-surface);
        cursor: pointer; touch-action: manipulation;
        transition: background var(--auy-transition-fast);
        flex-shrink: 0;
        padding: 0;
      }

      .eyedropper:hover { background: var(--auy-color-surface-alt); }
      .eyedropper:focus-visible { outline: .125rem solid var(--auy-color-primary); outline-offset: 2px; }

      .recent-row {
        display: flex;
        gap: var(--auy-space-2xs);
        padding-block-start: var(--auy-space-xs);
        border-block-start: 1px solid color-mix(in oklch, var(--auy-color-border) 50%, transparent);
      }

      .recent-swatch {
        inline-size: 20px; block-size: 20px;
        border-radius: var(--auy-radius-sm);
        cursor: pointer;
        border: 1.5px solid transparent;
        transition: border-color 0.15s, transform 0.15s;
        flex-shrink: 0;
      }

      .recent-swatch:hover {
        border-color: var(--auy-color-text);
        transform: scale(1.15);
      }

      .recent-swatch:focus-visible {
        outline: .125rem solid var(--auy-color-primary);
        outline-offset: 1px;
      }

      .recent-label {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        margin-inline-end: auto;
        display: flex;
        align-items: center;
      }

      @media (forced-colors: active) { .picker { border: 1px solid ButtonText; } }
    }
  `;
	}
	willUpdate(changed) {
		if (changed.has("value") && !this._updatingValue) {
			const parsed = this._parseValue(this.value);
			if (parsed) {
				this._H = parsed.H;
				this._S = parsed.S;
				this._V = parsed.V;
				this._prevValue = this._fmtHex();
				this._scheduleDraw();
			}
		}
	}
	_parseValue(val) {
		if (/^#[0-9a-f]{6}$/i.test(val)) {
			const [H, S, V] = hexToHsv(val);
			return {
				H,
				S,
				V
			};
		}
		const oklch = parseOklch(val);
		if (oklch) {
			const [r, g, b] = oklchToSrgb(oklch.L, oklch.C, oklch.H);
			const [H, S, V] = srgbToHsv(clamp(r, 0, 1), clamp(g, 0, 1), clamp(b, 0, 1));
			return {
				H,
				S,
				V
			};
		}
		return null;
	}
	firstUpdated() {
		this._prevValue = this._fmtHex();
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
		const hex = this._fmtHex();
		if (this.value === hex) return;
		this._updatingValue = true;
		this.value = hex;
		this._updatingValue = false;
		this._prevValue = hex;
		this._pendingRecent = hex;
		this.dispatchEvent(new CustomEvent("change", {
			detail: {
				hex,
				oklch: this._fmtOklch(),
				rgb: this._fmtRgb(),
				hsl: this._fmtHsl(),
				hsv: {
					H: this._H,
					S: this._S,
					V: this._V
				},
				alpha: this._alpha
			},
			bubbles: true,
			composed: true
		}));
	}
	_scheduleDraw() {
		if (this._schedulePending) return;
		this._schedulePending = true;
		requestAnimationFrame(() => {
			this._schedulePending = false;
			this._draw();
		});
	}
	_draw() {
		const cvs = this._canvas;
		if (!cvs?.parentElement) return;
		const rect = cvs.parentElement.getBoundingClientRect();
		const dpr = devicePixelRatio || 1;
		const w = Math.round(rect.width * dpr);
		const h = Math.round(rect.height * dpr);
		if (!w || !h) return;
		cvs.width = w;
		cvs.height = h;
		const ctx = cvs.getContext("2d");
		if (!ctx) return;
		const cx = w / 2, cy = h / 2;
		const half = Math.min(cx, cy);
		const rOuter = half * .96;
		const rInner = half * .7;
		const ri = rInner - 2;
		ctx.imageSmoothingEnabled = true;
		ctx.save();
		ctx.beginPath();
		ctx.arc(cx, cy, rOuter, 0, Math.PI * 2);
		ctx.arc(cx, cy, rInner, 0, Math.PI * 2, true);
		ctx.closePath();
		const cg = ctx.createConicGradient(0, cx, cy);
		for (let h = 0; h <= 360; h += 30) {
			const [r, g, b] = hsvToSrgb(h, 1, 1);
			cg.addColorStop(h / 360, `rgb(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)})`);
		}
		ctx.fillStyle = cg;
		ctx.fill();
		ctx.restore();
		const triTop = [cx, cy - ri * .82];
		const triLeft = [cx - ri * .72, cy + ri * .48];
		const triRight = [cx + ri * .72, cy + ri * .48];
		const triDenom = (triLeft[1] - triRight[1]) * (triTop[0] - triRight[0]) + (triRight[0] - triLeft[0]) * (triTop[1] - triRight[1]);
		const curH = this._H;
		const featherPx = 1.2 * dpr;
		const triHeight = ri * 1.3;
		const img = ctx.createImageData(w, h);
		const d = img.data;
		for (let x = 0; x < w; x++) for (let y = 0; y < h; y++) {
			const dx = x - cx, dy = y - cy;
			const dist = Math.sqrt(dx * dx + dy * dy);
			let pr = 0, pg = 0, pb = 0, pa = 0;
			if (dist < rInner) {
				const w0 = ((triLeft[1] - triRight[1]) * (x - triRight[0]) + (triRight[0] - triLeft[0]) * (y - triRight[1])) / triDenom;
				const w1 = ((triRight[1] - triTop[1]) * (x - triRight[0]) + (triTop[0] - triRight[0]) * (y - triRight[1])) / triDenom;
				const w2 = 1 - w0 - w1;
				const edgeDist = Math.min(w0, w1, w2) * triHeight;
				if (edgeDist > -featherPx) {
					let alpha = 255;
					if (edgeDist < featherPx) alpha = Math.round(clamp((edgeDist + featherPx) / (2 * featherPx), 0, 1) * 255);
					if (alpha > 0) {
						const S = clamp(w1 + w2, 0, 1);
						const V = clamp(w0 + w2, 0, 1);
						[pr, pg, pb] = hsvToSrgb(curH, S, V);
						pa = alpha;
					}
				}
			}
			const i = (y * w + x) * 4;
			d[i] = clamp(pr * 255, 0, 255);
			d[i + 1] = clamp(pg * 255, 0, 255);
			d[i + 2] = clamp(pb * 255, 0, 255);
			d[i + 3] = pa;
		}
		const off = document.createElement("canvas");
		off.width = w;
		off.height = h;
		off.getContext("2d").putImageData(img, 0, 0);
		ctx.drawImage(off, 0, 0);
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
	_onDragEnd() {
		this._dragTarget = null;
		if (this._pendingRecent) {
			const hex = this._fmtHex();
			if (this._prevValue && this._prevValue !== hex) this._addRecent(this._prevValue);
			this._prevValue = hex;
			this._pendingRecent = null;
		}
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
	_ringIndicatorPct() {
		const wrap = this._canvas?.parentElement;
		if (!wrap) return [50, 50];
		const rect = wrap.getBoundingClientRect();
		const half = Math.min(rect.width, rect.height) / 2;
		const r = (half * .96 + half * .7) / 2;
		const rad = this._H * Math.PI / 180;
		return [(rect.width / 2 + r * Math.cos(rad)) / rect.width * 100, (rect.height / 2 + r * Math.sin(rad)) / rect.height * 100];
	}
	_triIndicatorPct() {
		const wrap = this._canvas?.parentElement;
		if (!wrap) return [50, 50];
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
		return [(w0 * cx + w1 * (cx - ri * .72) + w2 * (cx + ri * .72)) / rect.width * 100, (w0 * (cy - ri * .82) + w1 * (cy + ri * .48) + w2 * (cy + ri * .48)) / rect.height * 100];
	}
	_fmtHex() {
		return formatHex(this._H, this._S, this._V);
	}
	_fmtRgb() {
		return formatRgb(this._H, this._S, this._V);
	}
	_fmtHsl() {
		return formatHsl(this._H, this._S, this._V);
	}
	_fmtOklch() {
		return formatOklch(this._H, this._S, this._V);
	}
	_fmt(f) {
		switch (f) {
			case "hex": return this._fmtHex();
			case "rgb": return this._fmtRgb();
			case "hsl": return this._fmtHsl();
			case "oklch": return this._fmtOklch();
		}
	}
	async _copy(f, e) {
		const target = e.currentTarget;
		try {
			await navigator.clipboard.writeText(this._fmt(f));
		} catch {}
		target?.focus();
		this._copiedFormat = f;
		setTimeout(() => {
			if (this._copiedFormat === f) this._copiedFormat = null;
		}, 1400);
	}
	async _pickEyedropper() {
		if (!("EyeDropper" in window)) return;
		try {
			const r = await new window.EyeDropper().open();
			if (r?.sRGBHex) {
				const hex = r.sRGBHex.toUpperCase();
				if (this._prevValue && this._prevValue !== hex) this._addRecent(this._prevValue);
				const [H, S, V] = hexToHsv(hex);
				this._H = H;
				this._S = S;
				this._V = V;
				this._prevValue = hex;
				this._scheduleDraw();
			}
		} catch {}
	}
	_onHexInput(e) {
		const clean = e.target.value.replace(/[^0-9a-fA-F]/g, "").slice(0, 6);
		if (clean.length === 6) {
			const hex = "#" + clean.toUpperCase();
			if (this._prevValue && this._prevValue !== hex) this._addRecent(this._prevValue);
			const [H, S, V] = hexToHsv(hex);
			this._H = H;
			this._S = S;
			this._V = V;
			this._prevValue = hex;
			this._scheduleDraw();
		}
	}
	_onAlphaRange(e) {
		this._alpha = parseFloat(e.target.value);
	}
	_addRecent(hex) {
		const idx = this._recent.indexOf(hex);
		if (idx >= 0) {
			this._recent = [
				hex,
				...this._recent.slice(0, idx),
				...this._recent.slice(idx + 1)
			];
			return;
		}
		this._recent = [hex, ...this._recent.slice(0, this.recentCount - 1)];
	}
	_selectRecent(hex) {
		if (this._prevValue && this._prevValue !== hex) this._addRecent(this._prevValue);
		const [H, S, V] = hexToHsv(hex);
		this._H = H;
		this._S = S;
		this._V = V;
		this._prevValue = hex;
		this._scheduleDraw();
	}
	render() {
		const chips = [
			"oklch",
			"hex",
			"rgb",
			"hsl"
		];
		const hex = this._fmtHex();
		const [rr, gg, bb] = hexToSrgb(hex);
		const rgbaColor = `rgba(${Math.round(rr * 255)},${Math.round(gg * 255)},${Math.round(bb * 255)},${this._alpha})`;
		const [rx, ry] = this._ringIndicatorPct();
		const [tx, ty] = this._triIndicatorPct();
		const alphaPct = Math.round(this._alpha * 100);
		return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div part="picker" class="picker" style="--_tri-dot:${hex};--_ring-glow:${hex}40;">

        <div class="hsv-wrap"
          @mousedown=${this._onDown} @mousemove=${this._onMove}
          @mouseup=${this._onDragEnd} @mouseleave=${this._onDragEnd}
          @touchstart=${this._onDown} @touchmove=${this._onMove}
          @touchend=${this._onDragEnd}
        >
          <canvas></canvas>
          <div class="ring-indicator"
            style="inset-inline-start:${rx}%;inset-block-start:${ry}%;">
          </div>
          <div class="tri-indicator"
            style="inset-inline-start:${tx}%;inset-block-start:${ty}%;">
          </div>
        </div>

        <div class="preview-row">
          <div class="preview-stack">
            <div class="preview-swatch old" style="background:${this._prevValue || hex}"></div>
            <div class="preview-swatch" style="background:${rgbaColor}"></div>
          </div>
          <input class="hex-input"
            .value=${hex}
            @input=${this._onHexInput}
            placeholder="#000000"
            spellcheck="false"
            autocomplete="off"
            aria-label="Hex value"
          />
        </div>

        ${this.showAlpha ? html`
          <div class="alpha-row">
            <div class="alpha-track-wrap">
              <div class="alpha-track-bg" style="background:linear-gradient(to right, transparent, ${hex})"></div>
              <input class="alpha-range" type="range" min="0" max="1" step="0.01" .value=${this._alpha} @input=${this._onAlphaRange} aria-label="Alpha" />
            </div>
            <span class="alpha-label">${alphaPct}%</span>
          </div>
        ` : nothing}

        <div class="toolbar">
          <div class="formats">
            ${chips.map((f) => html`
              <span class="format-chip ${f === "oklch" ? "oklch-chip" : ""} ${this._copiedFormat === f ? "copied" : ""}"
                @click=${(e) => this._copy(f, e)}
                role="button" tabindex="0"
                aria-label="Copiar ${f.toUpperCase()}"
                title="Clique para copiar"
              >
                <span class="chip-swatch" style="background:${hex}"></span>
                <span class="chip-label">${this._copiedFormat === f ? "✓" : f.toUpperCase()}</span>
                <span class="chip-value">${this._copiedFormat === f ? "Copiado!" : this._fmt(f)}</span>
              </span>
            `)}
          </div>
          ${this.showEyedropper && "EyeDropper" in window ? html`
            <button class="eyedropper" @click=${this._pickEyedropper} aria-label="Pipeta" title="Selecionar cor da tela">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 22l1-1h3l9-9"/>
                <path d="M3 21l9-9"/>
                <path d="M15 7.5l1.5-1.5a2.5 2.5 0 013.5 3.5L14 16h-3l-2-2 6-6.5z"/>
                <path d="M18.5 5.5L21 3"/>
              </svg>
            </button>
          ` : nothing}
        </div>

        ${this.showRecent && this._recent.length ? html`
          <div class="recent-row">
            <span class="recent-label">Recentes</span>
            ${this._recent.slice(0, this.recentCount).map((c) => html`
              <button class="recent-swatch" style="background:${c}" @click=${() => this._selectRecent(c)} aria-label=${c} title=${c}></button>
            `)}
          </div>
        ` : nothing}
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyCompColorInput.prototype, "value", void 0);
__decorate([property({ type: String })], AuyCompColorInput.prototype, "label", void 0);
__decorate([property({ type: Boolean })], AuyCompColorInput.prototype, "showEyedropper", void 0);
__decorate([property({ type: Boolean })], AuyCompColorInput.prototype, "showAlpha", void 0);
__decorate([property({ type: Boolean })], AuyCompColorInput.prototype, "showRecent", void 0);
__decorate([property({ type: Number })], AuyCompColorInput.prototype, "recentCount", void 0);
__decorate([state()], AuyCompColorInput.prototype, "_H", void 0);
__decorate([state()], AuyCompColorInput.prototype, "_S", void 0);
__decorate([state()], AuyCompColorInput.prototype, "_V", void 0);
__decorate([state()], AuyCompColorInput.prototype, "_alpha", void 0);
__decorate([state()], AuyCompColorInput.prototype, "_copiedFormat", void 0);
__decorate([state()], AuyCompColorInput.prototype, "_recent", void 0);
__decorate([query(".hsv-wrap canvas")], AuyCompColorInput.prototype, "_canvas", void 0);
AuyCompColorInput = __decorate([customElement("auy-comp-color-input")], AuyCompColorInput);
//#endregion
//#region src/components/shadow-dom/table.ts
var AuyCompTable = class AuyCompTable extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.columns = [];
		this.rows = [];
		this.pageSize = 20;
		this.currentPage = 1;
		this.sortable = true;
		this.filterable = false;
		this.selectable = false;
		this.stickyHeader = true;
		this.emptyMessage = "Nenhum registro encontrado";
		this.loading = false;
		this.title = "";
		this.showTotalRow = false;
		this.showHeader = true;
		this.description = "";
		this._filterOpen = false;
		this._sortColumn = "";
		this._sortDirection = null;
		this._filterText = "";
		this._selectedIndices = /* @__PURE__ */ new Set();
		this._focusedIndex = -1;
		this._processedRows = [];
		this._totalPages = 1;
		this._allSelected = false;
		this._nfNumber = new Intl.NumberFormat("pt-BR");
		this._nfCurrency = new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL"
		});
		this._dfDate = new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" });
		this._handleFilterInput = (e) => {
			this._filterText = e.target.value;
			this.currentPage = 1;
		};
		this._handleRowSelect = (idx) => {
			if (!this.selectable) return;
			if (this._selectedIndices.has(idx)) this._selectedIndices.delete(idx);
			else this._selectedIndices.add(idx);
			this._emitRowSelect();
		};
		this._handleSelectAll = () => {
			if (this._allSelected) this._selectedIndices.clear();
			else this._selectedIndices = new Set(this._processedRows.map((_, i) => i));
			this._emitRowSelect();
		};
		this._handleRowKeyDown = (e) => {
			const len = this._pagedRows.length;
			if (len === 0) return;
			const start = this._pageStart;
			const end = start + len - 1;
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					this._focusedIndex = Math.min(this._focusedIndex + 1, end);
					break;
				case "ArrowUp":
					e.preventDefault();
					this._focusedIndex = Math.max(start, this._focusedIndex - 1);
					break;
				case "Home":
					e.preventDefault();
					this._focusedIndex = start;
					break;
				case "End":
					e.preventDefault();
					this._focusedIndex = end;
					break;
				case " ":
					e.preventDefault();
					if (this.selectable && this._focusedIndex >= 0) this._handleRowSelect(this._focusedIndex);
					return;
				default: return;
			}
			this.updateComplete.then(() => {
				(this.shadowRoot?.querySelector(`[data-row-index="${this._focusedIndex}"]`))?.focus();
			});
		};
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	static {
		this.styles = css`
    :host {
      display: block;
      contain: layout style;
    }

    [part~='wrapper'] {
      position: relative;
    }

    [part~='title'] {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--auy-space-sm);
      font-size: var(--auy-text-lg);
      font-weight: var(--auy-font-weight-semibold);
      color: var(--auy-color-text);
    }

    [part~='title-filterable'] {
      cursor: pointer;
      touch-action: manipulation;
      user-select: none;
      transition: color var(--auy-transition-fast);
    }
    [part~='title-filterable']:hover {
      color: var(--auy-color-primary);
    }
    [part~='title-filterable']:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.125rem;
      border-radius: var(--auy-radius-sm);
    }

    [part~='title-icon'] {
      display: inline-flex;
      align-items: center;
      opacity: 0.5;
      transition: opacity var(--auy-transition-fast);
    }
    [part~='title-icon'] svg {
      inline-size: 1.1em;
      block-size: 1.1em;
    }
    [part~='title-filterable']:hover [part~='title-icon'] {
      opacity: 0.8;
    }
    [part~='title-icon'][open] { opacity: 0.8; color: var(--auy-color-primary); }

    [part~='toolbar'] {
      overflow: hidden;
      transition: max-block-size var(--auy-transition), opacity var(--auy-transition), margin var(--auy-transition);
    }
    [part~='toolbar'][hidden] {
      max-block-size: 0;
      opacity: 0;
      margin-block-end: 0;
    }
    [part~='toolbar'][visible] {
      max-block-size: 4rem;
      opacity: 1;
      margin-block-end: var(--auy-space-sm);
    }

    [part~='filter-input'] {
      box-sizing: border-box;
      inline-size: 100%;
      padding: var(--auy-space-xs) var(--auy-space-sm) var(--auy-space-xs) 2.25rem;
      font-family: inherit;
      font-size: var(--auy-text-sm);
      line-height: 1.5;
      color: var(--auy-color-text);
      background: var(--auy-color-surface);
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-md);
      outline: none;
      -webkit-appearance: none;
      appearance: none;
      touch-action: manipulation;
      transition: border-color var(--auy-transition-fast), box-shadow var(--auy-transition-fast);
    }

    [part~='filter-wrap'] {
      position: relative;
    }
    [part~='filter-wrap']::before {
      content: '';
      position: absolute;
      inset-inline-start: 0.625rem;
      inset-block-start: 50%;
      translate: 0 -50%;
      inline-size: 1rem;
      block-size: 1rem;
      background: currentColor;
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E") center/contain no-repeat;
      -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E") center/contain no-repeat;
      color: var(--auy-color-text-muted);
      pointer-events: none;
      opacity: 0.5;
    }

    [part~='filter-input']:focus-visible {
      border-color: var(--auy-color-primary);
      box-shadow: 0 0 0 0.125rem var(--auy-color-primary-focus);
    }
    [part~='filter-input']:focus-visible + [part~='filter-input'] {
      border-color: var(--auy-color-primary);
    }
    [part~='filter-input']::placeholder {
      color: var(--auy-color-text-muted);
      opacity: 0.5;
    }

    [part~='table-scroll'] {
      overflow-x: auto;
      -webkit-overflow-scrolling: touch;
    }

    table {
      inline-size: 100%;
      border-collapse: collapse;
      font-size: var(--auy-text-sm);
      line-height: 1.5;
      container-type: inline-size;
    }

    caption {
      caption-side: bottom;
      padding-block-start: 0.5em;
      font-size: var(--auy-text-sm);
      color: var(--auy-color-text-muted);
      text-align: start;
    }

    th, td {
      padding: 0.625rem 1rem;
      text-align: start;
      border-block-end: 1px solid var(--auy-color-border);
    }

    th {
      font-weight: var(--auy-font-weight-semibold);
      color: var(--auy-color-text-muted);
      font-size: 0.85em;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
    }

    [part~='th'] {
      position: relative;
      user-select: none;
    }

    [part~='th-sortable'] {
      cursor: pointer;
      padding-inline-start: 1.5em;
      touch-action: manipulation;
    }

    [part~='th-sortable']:hover {
      color: var(--auy-color-primary);
    }

    [part~='th-sortable']::before {
      position: absolute;
      inset-inline-start: 0.5em;
      inset-block-start: 50%;
      translate: 0 -50%;
      font-size: 0.7em;
      line-height: 1;
      color: var(--auy-color-text-muted);
    }

    [part~='th-sortable'][aria-sort='ascending']::before {
      content: '▲';
      color: var(--auy-color-primary);
    }

    [part~='th-sortable'][aria-sort='descending']::before {
      content: '▼';
      color: var(--auy-color-primary);
    }

    [part~='th-sortable'][aria-sort='none']::before {
      content: '⇅';
      opacity: 0.4;
    }

    th[scope='col'] {
      position: sticky;
      inset-block-start: 0;
      z-index: var(--auy-z-sticky, 1);
    }

    tr:hover td {
      background: color-mix(in oklch, var(--auy-color-border) 10%, transparent);
    }

    tr:nth-child(even) td {
      background: color-mix(in oklch, var(--auy-color-border) 5%, transparent);
    }

    tr:nth-child(even):hover td {
      background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
    }

    [part~='row'] {
      outline: none;
    }

    [part~='row']:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: -0.125rem;
    }

    [part~='row'][aria-selected='true'] td {
      background: color-mix(in oklch, var(--auy-color-primary) 10%, transparent);
    }

    [part~='row'][aria-selected='true']:hover td {
      background: color-mix(in oklch, var(--auy-color-primary) 18%, transparent);
    }

    [part~='row'][aria-selected='true']:nth-child(even) td {
      background: color-mix(in oklch, var(--auy-color-primary) 12%, transparent);
    }

    [part~='total-row'] td {
      font-weight: var(--auy-font-weight-semibold);
      background: color-mix(in oklch, var(--auy-color-border) 8%, transparent);
      border-block-start: 2px solid var(--auy-color-border);
    }

    [part~='checkbox'] {
      -ms-touch-action: manipulation;
      touch-action: manipulation;
      cursor: pointer;
      accent-color: var(--auy-color-primary);
      block-size: 1rem;
      inline-size: 1rem;
    }

    [part~='th-checkbox'],
    [part~='td-checkbox'] {
      inline-size: 1px;
      padding-inline-end: 0.5rem;
      text-align: center;
    }

    [part~='loading'] {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--auy-space-xl) var(--auy-space-md);
      color: var(--auy-color-text-muted);
      font-size: var(--auy-text-sm);
    }

    [part~='empty-row'] td {
      text-align: center;
      padding: var(--auy-space-xl) var(--auy-space-md);
      color: var(--auy-color-text-muted);
      font-size: var(--auy-text-sm);
    }

    [part~='empty-icon'] {
      display: block;
      margin-block-end: var(--auy-space-sm);
      opacity: 0.4;
      line-height: 1;
    }

    [part~='th']:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: -0.125rem;
    }

    [part~='visually-hidden'] {
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

    @container (max-width: 600px) {
      thead {
        display: none;
      }
      tr {
        display: flex;
        flex-direction: column;
        padding: 0.5rem 0;
        border-block-end: 1px solid var(--auy-color-border);
      }
      td {
        display: flex;
        padding: 0.25rem 1rem;
        border-block-end: none;
      }
      td::before {
        content: attr(data-label);
        font-weight: var(--auy-font-weight-semibold);
        color: var(--auy-color-text-muted);
        font-size: var(--auy-text-xs);
        min-inline-size: 7.5rem;
        flex-shrink: 0;
      }
    }

    @media (forced-colors: active) {
      th, td {
        border-color: CanvasText;
      }
      [part~='row'][aria-selected='true'] td {
        background: Highlight;
        color: HighlightText;
      }
      [part~='th-sortable']::before {
        color: CanvasText;
      }
      [part~='th-sortable'][aria-sort='ascending']::before,
      [part~='th-sortable'][aria-sort='descending']::before {
        color: CanvasText;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      * { transition: none; }
    }

    @media print {
      [part~='toolbar'] { display: none; }
      th { background: none; border-block-end: 2px solid #000; }
      td { border-block-end: 1px solid #ccc; }
      tr { break-inside: avoid; }
    }
  `;
	}
	willUpdate(changed) {
		if (changed.has("rows") || changed.has("_filterText") || changed.has("_sortColumn") || changed.has("_sortDirection")) this._processRows();
		if (changed.has("pageSize") || changed.has("_processedRows") || changed.has("currentPage")) this._updatePagination();
		if (changed.has("rows")) {
			this._selectedIndices.clear();
			this._allSelected = false;
		}
		if (changed.has("_processedRows") || changed.has("currentPage")) this._clampFocus();
	}
	_processRows() {
		let result = this.rows.slice();
		if (this._filterText && this.columns.length > 0) {
			const lower = this._filterText.toLowerCase();
			result = result.filter((row) => this.columns.some((col) => {
				const val = row[col.key];
				return val != null && String(val).toLowerCase().includes(lower);
			}));
		}
		if (this._sortColumn && this._sortDirection) {
			const fmt = this.columns.find((c) => c.key === this._sortColumn)?.format ?? "text";
			result = result.slice().sort((a, b) => {
				const va = a[this._sortColumn];
				const vb = b[this._sortColumn];
				let cmp = 0;
				switch (fmt) {
					case "number":
					case "currency":
						cmp = (Number(va) || 0) - (Number(vb) || 0);
						break;
					case "date":
						cmp = new Date(va).getTime() - new Date(vb).getTime();
						break;
					default: cmp = String(va ?? "").localeCompare(String(vb ?? ""), "pt-BR");
				}
				return this._sortDirection === "desc" ? -cmp : cmp;
			});
		}
		this._processedRows = result;
	}
	_updatePagination() {
		this._totalPages = Math.max(1, Math.ceil(this._processedRows.length / this.pageSize));
		if (this.currentPage > this._totalPages) this.currentPage = this._totalPages;
	}
	get _pagedRows() {
		const start = (this.currentPage - 1) * this.pageSize;
		return this._processedRows.slice(start, start + this.pageSize);
	}
	get _pageStart() {
		return (this.currentPage - 1) * this.pageSize;
	}
	_clampFocus() {
		const len = this._pagedRows.length;
		if (len === 0) {
			this._focusedIndex = -1;
			return;
		}
		const start = this._pageStart;
		const end = start + len - 1;
		if (this._focusedIndex < start || this._focusedIndex > end) this._focusedIndex = start;
	}
	_handleSort(col) {
		if (!this.sortable || !col.sortable) return;
		if (this._sortColumn === col.key) if (this._sortDirection === "asc") this._sortDirection = "desc";
		else if (this._sortDirection === "desc") {
			this._sortColumn = "";
			this._sortDirection = null;
		} else this._sortDirection = "asc";
		else {
			this._sortColumn = col.key;
			this._sortDirection = "asc";
		}
		this.dispatchEvent(new CustomEvent("sort-change", {
			detail: {
				column: this._sortColumn,
				direction: this._sortDirection
			},
			bubbles: true,
			composed: true
		}));
	}
	_emitRowSelect() {
		const selectedRows = this._processedRows.filter((_, i) => this._selectedIndices.has(i));
		this._allSelected = this._processedRows.length > 0 && this._selectedIndices.size === this._processedRows.length;
		this.dispatchEvent(new CustomEvent("row-select", {
			detail: {
				rows: selectedRows,
				allSelected: this._allSelected
			},
			bubbles: true,
			composed: true
		}));
	}
	_formatCell(col, row) {
		const val = row[col.key];
		if (val == null || val === "") return nothing;
		switch (col.format) {
			case "number": return this._nfNumber.format(Number(val));
			case "currency": return this._nfCurrency.format(Number(val));
			case "date": return this._dfDate.format(new Date(val));
			default: return String(val);
		}
	}
	_getSortAria(col) {
		if (!this.sortable || !col.sortable) return void 0;
		if (this._sortColumn !== col.key) return "none";
		return this._sortDirection === "asc" ? "ascending" : "descending";
	}
	_getSortDescription(col) {
		if (this._sortColumn !== col.key || !this._sortDirection) return "Clique para ordenar ascendente";
		return this._sortDirection === "asc" ? "Ordenado ascendente. Clique para ordenar descendente" : "Ordenado descendente. Clique para limpar ordenação";
	}
	_renderHeaderRow() {
		return html`
      <tr part="header-row" role="row">
        ${this.selectable ? html`
          <th part="th th-checkbox" role="columnheader" scope="col" aria-label="Selecionar todos">
            <input
              part="checkbox"
              type="checkbox"
              aria-label="Selecionar todos"
              .checked=${this._allSelected && this._processedRows.length > 0}
              @change=${this._handleSelectAll}
            >
          </th>
        ` : nothing}
        ${this.columns.map((col) => {
			const sortable = this.sortable && col.sortable;
			const ariaSort = this._getSortAria(col);
			return html`
            <th
              part="th ${sortable ? "th-sortable" : ""}"
              role="columnheader"
              scope="col"
              style=${ifDefined(col.width ? `width:${col.width}` : void 0)}
              aria-sort=${ifDefined(ariaSort)}
              tabindex=${sortable ? "0" : nothing}
              @click=${() => this._handleSort(col)}
              @keydown=${(e) => {
				if (sortable && (e.key === "Enter" || e.key === " ")) {
					e.preventDefault();
					this._handleSort(col);
				}
			}}
            >
              ${col.label}
              ${sortable ? html`<span part="visually-hidden">${this._getSortDescription(col)}</span>` : nothing}
            </th>
          `;
		})}
      </tr>
    `;
	}
	_renderRow(row, pageRowIndex) {
		const globalIndex = this._pageStart + pageRowIndex;
		const isSelected = this._selectedIndices.has(globalIndex);
		const isFocused = this._focusedIndex === globalIndex;
		return html`
      <tr
        part="row"
        role="row"
        data-row-index="${globalIndex}"
        aria-selected=${this.selectable ? isSelected ? "true" : "false" : "false"}
        tabindex=${isFocused ? "0" : "-1"}
        @click=${() => this._handleRowSelect(globalIndex)}
        @keydown=${this._handleRowKeyDown}
      >
        ${this.selectable ? html`
          <td part="td td-checkbox" role="gridcell">
            <input
              part="checkbox"
              type="checkbox"
              aria-label="Selecionar linha"
              .checked=${isSelected}
              @change=${(e) => {
			e.stopPropagation();
			this._handleRowSelect(globalIndex);
		}}
            >
          </td>
        ` : nothing}
        ${this.columns.map((col) => html`
          <td
            part="td"
            role="gridcell"
            style=${ifDefined(col.align ? `text-align:${col.align}` : void 0)}
            data-label=${col.label}
          >${this._formatCell(col, row)}</td>
        `)}
      </tr>
    `;
	}
	_renderTotalRow() {
		return html`
      <tr part="total-row" role="row">
        ${this.selectable ? html`<td part="td"></td>` : nothing}
        ${this.columns.map((col) => {
			if (col.format === "number" || col.format === "currency") {
				const total = this._pagedRows.reduce((sum, row) => sum + (Number(row[col.key]) || 0), 0);
				return html`
              <td part="td" role="gridcell" style=${ifDefined(col.align ? `text-align:${col.align}` : void 0)}>
                ${col.format === "currency" ? this._nfCurrency.format(total) : this._nfNumber.format(total)}
              </td>
            `;
			}
			if (col.key === this.columns[0]?.key) return html`<td part="td" role="gridcell">Total</td>`;
			return html`<td part="td" role="gridcell"></td>`;
		})}
      </tr>
    `;
	}
	_renderEmptyRow() {
		return html`
      <tr part="empty-row" role="row">
        <td part="td" role="gridcell" colspan=${this.columns.length + (this.selectable ? 1 : 0)}>
          <span part="empty-icon" aria-hidden="true">—</span>
          ${this.emptyMessage}
        </td>
      </tr>
    `;
	}
	render() {
		const pagedRows = this._pagedRows;
		const filterIconOpen = this._filterOpen ? "open" : "";
		return html`
      <div part="wrapper">
        ${this.title ? html`
          <div
            part="title ${this.filterable ? "title-filterable" : ""}"
            tabindex=${this.filterable ? "0" : nothing}
            role=${this.filterable ? "button" : nothing}
            aria-expanded=${this.filterable ? this._filterOpen ? "true" : "false" : nothing}
            aria-label=${this.filterable ? "Filtrar tabela" : nothing}
            @click=${this.filterable ? (() => this._filterOpen = !this._filterOpen) : void 0}
            @keydown=${this.filterable ? ((e) => {
			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				this._filterOpen = !this._filterOpen;
			}
		}) : void 0}
          >
            <span>${this.title}</span>
            ${this.filterable ? html`
              <span part="title-icon" .open=${filterIconOpen} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </span>
            ` : nothing}
          </div>
        ` : nothing}

        ${this.filterable ? html`
          <div part="toolbar" visible=${this._filterOpen ? "true" : "false"} .hidden=${!this._filterOpen}>
            <div part="filter-wrap">
              <input
                part="filter-input"
                type="search"
                .value=${this._filterText}
                @input=${this._handleFilterInput}
                placeholder="Filtrar por qualquer campo…"
                aria-label="Filtrar tabela"
              >
            </div>
          </div>
        ` : nothing}

        ${this.loading ? html`
          <div part="loading" role="status" aria-live="polite">Carregando...</div>
        ` : html`
          <div part="table-scroll">
            <table
              part="table"
              role="grid"
              aria-label=${this.title || "Tabela de dados"}
              aria-rowcount=${this._processedRows.length}
            >
              ${this.description ? html`<caption>${this.description}</caption>` : nothing}
              ${this.showHeader ? html`
                <thead part="thead">
                  ${this._renderHeaderRow()}
                </thead>
              ` : nothing}
              <tbody part="tbody">
                ${pagedRows.length > 0 ? html`
                    ${pagedRows.map((row, i) => this._renderRow(row, i))}
                    ${this.showTotalRow ? this._renderTotalRow() : nothing}
                  ` : this._renderEmptyRow()}
              </tbody>
            </table>
          </div>
        `}
      </div>
    `;
	}
};
__decorate([property({ type: Array })], AuyCompTable.prototype, "columns", void 0);
__decorate([property({ type: Array })], AuyCompTable.prototype, "rows", void 0);
__decorate([property({ type: Number })], AuyCompTable.prototype, "pageSize", void 0);
__decorate([property({
	type: Number,
	reflect: true
})], AuyCompTable.prototype, "currentPage", void 0);
__decorate([property({ type: Boolean })], AuyCompTable.prototype, "sortable", void 0);
__decorate([property({ type: Boolean })], AuyCompTable.prototype, "filterable", void 0);
__decorate([property({ type: Boolean })], AuyCompTable.prototype, "selectable", void 0);
__decorate([property({ type: Boolean })], AuyCompTable.prototype, "stickyHeader", void 0);
__decorate([property({ type: String })], AuyCompTable.prototype, "emptyMessage", void 0);
__decorate([property({ type: Boolean })], AuyCompTable.prototype, "loading", void 0);
__decorate([property({ type: String })], AuyCompTable.prototype, "title", void 0);
__decorate([property({ type: Boolean })], AuyCompTable.prototype, "showTotalRow", void 0);
__decorate([property({ type: Boolean })], AuyCompTable.prototype, "showHeader", void 0);
__decorate([property({ type: String })], AuyCompTable.prototype, "description", void 0);
__decorate([state()], AuyCompTable.prototype, "_filterOpen", void 0);
__decorate([state()], AuyCompTable.prototype, "_sortColumn", void 0);
__decorate([state()], AuyCompTable.prototype, "_sortDirection", void 0);
__decorate([state()], AuyCompTable.prototype, "_filterText", void 0);
__decorate([state()], AuyCompTable.prototype, "_selectedIndices", void 0);
__decorate([state()], AuyCompTable.prototype, "_focusedIndex", void 0);
__decorate([state()], AuyCompTable.prototype, "_processedRows", void 0);
__decorate([state()], AuyCompTable.prototype, "_totalPages", void 0);
__decorate([state()], AuyCompTable.prototype, "_allSelected", void 0);
AuyCompTable = __decorate([customElement("auy-comp-table")], AuyCompTable);
//#endregion
//#region src/components/shadow-dom/modal.ts
var VARIANT_ICONS = {
	default: "",
	info: "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15v-2h2v2zm2-4h-2V7h2v6z\"/></svg>",
	success: "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z\"/></svg>",
	warning: "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z\"/></svg>",
	error: "<svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z\"/></svg>"
};
var AuyCompModal = class AuyCompModal extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.open = false;
		this.title = "";
		this.description = "";
		this.variant = "default";
		this.size = "md";
		this.closable = true;
		this.closeOnOverlay = true;
		this.closeOnEscape = true;
		this.preventBodyScroll = true;
		this._previousFocus = null;
	}
	static {
		this.shadowRootOptions = {
			mode: "open",
			delegatesFocus: true
		};
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      dialog {
        border: none;
        border-radius: var(--auy-radius-lg);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        box-shadow: var(--auy-shadow-lg);
        inline-size: min(calc(100% - 2rem), 32rem);
        margin: auto;
        padding: 0;
        max-block-size: 85dvh;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        opacity: 0;
        transform: scale(0.95) translateY(0.5rem);
        transition: opacity 0.2s ease, transform 0.2s ease, overlay 0.2s ease allow-discrete, display 0.2s ease allow-discrete;
      }

      dialog[open] {
        opacity: 1;
        transform: scale(1) translateY(0);
      }

      @starting-style {
        dialog[open] {
          opacity: 0;
          transform: scale(0.95) translateY(0.5rem);
        }
      }

      dialog::backdrop {
        background: color-mix(in oklch, var(--auy-color-overlay) 50%, transparent);
        backdrop-filter: blur(4px);
        transition: background 0.2s ease;
      }

      dialog[data-size="sm"] {
        inline-size: min(calc(100% - 2rem), 24rem);
      }

      dialog[data-size="lg"] {
        inline-size: min(calc(100% - 2rem), 48rem);
      }

      dialog[data-size="xl"] {
        inline-size: min(calc(100% - 2rem), 64rem);
      }

      dialog[data-size="full"] {
        inline-size: min(calc(100% - 2rem), calc(100% - 2rem));
        block-size: min(calc(100dvh - 2rem), 90dvh);
        border-radius: var(--auy-radius-md);
        max-block-size: calc(100dvh - 2rem);
      }

      .head {
        display: flex;
        align-items: flex-start;
        gap: var(--auy-space-md);
        padding: var(--auy-space-lg);
        padding-block-end: var(--auy-space-sm);
      }

      .head-icon {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.75rem;
        block-size: 1.75rem;
        margin-block-start: 0.125rem;
      }
      .head-icon svg {
        inline-size: 100%;
        block-size: 100%;
      }

      .head-icon--info { color: var(--auy-color-info); }
      .head-icon--success { color: var(--auy-color-success); }
      .head-icon--warning { color: var(--auy-color-warning); }
      .head-icon--error { color: var(--auy-color-error); }

      .head-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: var(--auy-space-xs);
      }

      .title {
        font-size: var(--auy-text-lg);
        font-weight: var(--auy-font-weight-semibold);
        line-height: 1.4;
        color: var(--auy-color-text);
        margin: 0;
      }

      .description {
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        line-height: 1.5;
        margin: 0;
      }

      .close {
        flex-shrink: 0;
        inline-size: 2rem;
        block-size: 2rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        border: none;
        border-radius: var(--auy-radius-sm);
        background: transparent;
        color: var(--auy-color-text-muted);
        cursor: pointer;
        font-size: var(--auy-text-lg);
        line-height: 1;
        opacity: 0.6;
        touch-action: manipulation;
        transition: opacity var(--auy-transition-fast), background var(--auy-transition-fast), color var(--auy-transition-fast);
      }
      .close:hover {
        opacity: 1;
        background: color-mix(in oklch, var(--auy-color-border) 15%, transparent);
        color: var(--auy-color-text);
      }
      .close:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .divider {
        border: none;
        border-block-start: 1px solid var(--auy-color-border);
        margin: 0;
      }

      .body {
        padding: var(--auy-space-sm) var(--auy-space-lg) var(--auy-space-lg);
      }

      .body--no-title {
        padding-block-start: var(--auy-space-lg);
      }

      .footer {
        padding: var(--auy-space-lg);
        padding-block-start: var(--auy-space-md);
        display: flex;
        justify-content: flex-end;
        gap: var(--auy-space-sm);
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
        .close {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        dialog {
          display: block !important;
          position: static !important;
          opacity: 1 !important;
          transform: none !important;
          box-shadow: none !important;
          border: 1px solid CanvasText !important;
        }
        dialog::backdrop {
          display: none !important;
        }
      }
    }
  `;
	}
	_getDialog() {
		return this.shadowRoot?.querySelector("dialog") ?? null;
	}
	updated(changedProperties) {
		if (changedProperties.has("open")) {
			const dialog = this._getDialog();
			if (!dialog) return;
			if (this.open) {
				this._previousFocus = document.activeElement ?? null;
				if (this.preventBodyScroll) dialog.showModal();
				else dialog.show();
				this.dispatchEvent(new CustomEvent("open", {
					bubbles: true,
					composed: true
				}));
			} else {
				dialog.close();
				this._returnFocus();
				this.dispatchEvent(new CustomEvent("close", {
					bubbles: true,
					composed: true
				}));
			}
		}
	}
	_handleDialogClose() {
		if (this.open) this.open = false;
	}
	_handleCancel(e) {
		if (!this.closeOnEscape) e.preventDefault();
	}
	_handleOverlayClick(e) {
		if (!this.closeOnOverlay) return;
		const dialog = this._getDialog();
		if (!dialog) return;
		if (e.target === dialog) this.open = false;
	}
	_close() {
		this.open = false;
	}
	_returnFocus() {
		if (this._previousFocus && typeof this._previousFocus.focus === "function") this._previousFocus.focus();
		this._previousFocus = null;
	}
	_renderIcon() {
		const icon = VARIANT_ICONS[this.variant];
		if (!icon) return nothing;
		return html`
      <span part="icon" class="head-icon head-icon--${this.variant}">${unsafeHTML(icon)}</span>
    `;
	}
	render() {
		const hasHeader = this.title || this.variant !== "default" || !!this.closable;
		return html`
      <dialog
        role="dialog"
        aria-modal="true"
        aria-label=${this.title || nothing}
        data-size=${this.size}
        @close=${this._handleDialogClose}
        @cancel=${this._handleCancel}
        @click=${this._handleOverlayClick}
      >
        ${hasHeader ? html`
          <div part="header" class="head">
            ${this._renderIcon()}
            <div class="head-body">
              <slot name="header">
                <h2 class="title" part="title">${this.title}</h2>
                ${this.description ? html`
                  <p class="description" part="description">${this.description}</p>
                ` : ""}
              </slot>
            </div>
            ${this.closable ? html`
              <button part="close-button" class="close" aria-label="Fechar" @click=${this._close}>&times;</button>
            ` : ""}
          </div>
          <hr class="divider" part="divider" />
        ` : ""}
        <div part="body" class="body ${hasHeader ? "" : "body--no-title"}">
          <slot></slot>
        </div>
        <hr class="divider" part="divider" />
        <div part="footer" class="footer">
          <slot name="footer"></slot>
        </div>
      </dialog>
    `;
	}
};
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompModal.prototype, "open", void 0);
__decorate([property({ type: String })], AuyCompModal.prototype, "title", void 0);
__decorate([property({ type: String })], AuyCompModal.prototype, "description", void 0);
__decorate([property({ type: String })], AuyCompModal.prototype, "variant", void 0);
__decorate([property({ type: String })], AuyCompModal.prototype, "size", void 0);
__decorate([property({ type: Boolean })], AuyCompModal.prototype, "closable", void 0);
__decorate([property({
	type: Boolean,
	attribute: "closeonoverlay"
})], AuyCompModal.prototype, "closeOnOverlay", void 0);
__decorate([property({
	type: Boolean,
	attribute: "closeonescape"
})], AuyCompModal.prototype, "closeOnEscape", void 0);
__decorate([property({
	type: Boolean,
	attribute: "preventscroll"
})], AuyCompModal.prototype, "preventBodyScroll", void 0);
AuyCompModal = __decorate([customElement("auy-comp-modal")], AuyCompModal);
//#endregion
//#region src/components/_internal/AuyShadowElement.base.ts
/** Classe base para componentes Shadow DOM que herdarem delegatesFocus: true */
var AuyShadowElement = class extends LitElement {
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
};
//#endregion
//#region src/components/_internal/icons.ts
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
svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Informação</title><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`, svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Sucesso</title><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`, svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Aviso</title><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`, svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false" role="img" aria-hidden="true"><title>Erro</title><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
//#endregion
//#region src/components/shadow-dom/button.ts
var AuyCompButton = class AuyCompButton extends AuyShadowElement {
	constructor(..._args) {
		super(..._args);
		this.variant = "primary";
		this.size = "md";
		this.loading = false;
		this.disabled = false;
		this.type = "button";
		this.href = "";
		this.target = "";
		this.fullWidth = false;
		this.icon = "";
		this.iconPosition = "left";
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: inline-block;
        contain: content;
      }

      :host([fullWidth]) {
        display: flex;
      }

      .btn {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-xs);
        inline-size: 100%;
        font-family: inherit;
        font-weight: var(--auy-font-weight-medium);
        line-height: 1.5;
        text-align: center;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: var(--auy-radius-md);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        transition: background-color var(--auy-transition), border-color var(--auy-transition), color var(--auy-transition), box-shadow var(--auy-transition);
      }

      .btn--sm {
        min-block-size: 2.25rem;
        padding: 0.375rem 0.75rem;
        font-size: var(--auy-text-sm);
      }

      .btn--md {
        min-block-size: 2.5rem;
        padding: 0.5rem 1rem;
        font-size: var(--auy-text-sm);
      }

      .btn--lg {
        min-block-size: 3rem;
        padding: 0.625rem 1.5rem;
        font-size: var(--auy-text-base);
      }

      .btn--icon {
        min-block-size: 2.25rem;
        min-inline-size: 2.25rem;
        padding: 0.375rem;
        font-size: var(--auy-text-base);
      }

      .btn--primary {
        background-color: var(--auy-color-primary);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-primary);
      }

      .btn--primary:hover {
        background-color: var(--auy-color-primary-hover);
        border-color: var(--auy-color-primary-hover);
      }

      .btn--primary:active {
        background-color: var(--auy-color-primary-active);
        border-color: var(--auy-color-primary-active);
      }

      .btn--secondary {
        background-color: var(--auy-color-secondary);
        color: var(--auy-color-secondary-inverse);
        border-color: var(--auy-color-secondary);
      }

      .btn--secondary:hover {
        background-color: var(--auy-color-secondary-hover);
        border-color: var(--auy-color-secondary-hover);
      }

      .btn--secondary:active {
        background-color: var(--auy-color-secondary-active);
        border-color: var(--auy-color-secondary-active);
      }

      .btn--success {
        background-color: var(--auy-color-success);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-success);
      }

      .btn--success:hover {
        background-color: color-mix(in oklch, var(--auy-color-success) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-success) 85%, var(--auy-color-text));
      }

      .btn--success:active {
        background-color: color-mix(in oklch, var(--auy-color-success) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-success) 75%, var(--auy-color-text));
      }

      .btn--error {
        background-color: var(--auy-color-error);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-error);
      }

      .btn--error:hover {
        background-color: color-mix(in oklch, var(--auy-color-error) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-error) 85%, var(--auy-color-text));
      }

      .btn--error:active {
        background-color: color-mix(in oklch, var(--auy-color-error) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-error) 75%, var(--auy-color-text));
      }

      .btn--warning {
        background-color: var(--auy-color-warning);
        color: var(--auy-color-text);
        border-color: var(--auy-color-warning);
      }

      .btn--warning:hover {
        background-color: color-mix(in oklch, var(--auy-color-warning) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-warning) 85%, var(--auy-color-text));
      }

      .btn--warning:active {
        background-color: color-mix(in oklch, var(--auy-color-warning) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-warning) 75%, var(--auy-color-text));
      }

      .btn--info {
        background-color: var(--auy-color-info);
        color: var(--auy-color-primary-inverse);
        border-color: var(--auy-color-info);
      }

      .btn--info:hover {
        background-color: color-mix(in oklch, var(--auy-color-info) 85%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-info) 85%, var(--auy-color-text));
      }

      .btn--info:active {
        background-color: color-mix(in oklch, var(--auy-color-info) 75%, var(--auy-color-text));
        border-color: color-mix(in oklch, var(--auy-color-info) 75%, var(--auy-color-text));
      }

      .btn--ghost {
        background-color: transparent;
        color: var(--auy-color-text);
        border-color: transparent;
      }

      .btn--ghost:hover {
        background-color: color-mix(in oklch, var(--auy-color-border) 20%, transparent);
      }

      .btn--ghost:active {
        background-color: color-mix(in oklch, var(--auy-color-border) 35%, transparent);
      }

      .btn--link {
        background-color: transparent;
        color: var(--auy-color-primary);
        padding-inline: 0;
        border: none;
        text-decoration: none;
      }

      .btn--link:hover {
        color: var(--auy-color-primary-hover);
        text-decoration: underline;
      }

      .btn--link:active {
        color: var(--auy-color-primary-active);
      }

      .btn:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .btn:disabled,
      .btn[aria-disabled="true"] {
        opacity: 0.45;
        filter: saturate(0.3);
        cursor: not-allowed;
        pointer-events: none;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        inline-size: 1em;
        block-size: 1em;
      }

      .icon svg {
        inline-size: 100%;
        block-size: 100%;
        fill: currentColor;
        stroke: currentColor;
      }

      .spinner {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        inline-size: 1.25em;
        block-size: 1.25em;
        line-height: 0;
      }

      .spinner::after {
        content: '';
        display: block;
        box-sizing: border-box;
        inline-size: 100%;
        block-size: 100%;
        border: 0.125em solid color-mix(in oklch, currentColor 25%, transparent);
        border-block-start-color: currentColor;
        border-radius: 50%;
        animation: auy-button-spin 0.6s linear infinite;
      }

      @keyframes auy-button-spin {
        to { transform: rotate(360deg); }
      }

      .btn--loading {
        opacity: 0.7;
        filter: saturate(0.45);
        pointer-events: none;
      }

      @media (prefers-reduced-motion: reduce) {
        .btn {
          transition: none;
        }

        .spinner::after {
          animation: none;
        }
      }

      @media (forced-colors: active) {
        .btn {
          border: 1px solid ButtonText;
        }

        .btn--link {
          border: none;
        }

        .btn:focus-visible {
          outline: 0.125rem solid Highlight;
          outline-offset: 0.125rem;
        }
      }

      @media print {
        .btn {
          background-color: transparent !important;
          color: CanvasText !important;
          border-color: CanvasText !important;
        }

        .btn--link {
          text-decoration: underline;
        }
      }
    }
  `;
	}
	_handleClick(e) {
		if (this.loading || this.disabled) {
			e.preventDefault();
			e.stopPropagation();
		}
	}
	render() {
		const isLink = !!this.href;
		const isDisabled = this.loading || this.disabled;
		const showIcon = !this.loading && !!this.icon;
		const btnClasses = {
			btn: true,
			[`btn--${this.variant}`]: true,
			[`btn--${this.size}`]: true,
			"btn--loading": this.loading
		};
		const iconContent = showIcon ? html`
      <span part="icon" class="icon">
        <slot name="icon">${unsafeHTML(ICONS[this.icon])}</slot>
      </span>
    ` : nothing;
		const spinnerContent = this.loading ? html`
      <span part="spinner" class="spinner" aria-hidden="true"></span>
    ` : nothing;
		const content = html`
      ${this.iconPosition === "left" ? iconContent : nothing}
      ${spinnerContent}
      <slot></slot>
      ${this.iconPosition === "right" ? iconContent : nothing}
    `;
		if (isLink) return html`
        <a
          part="link"
          class=${classMap(btnClasses)}
          href=${isDisabled ? nothing : this.href}
          target=${ifDefined(this.target || void 0)}
          rel=${this.target === "_blank" ? "noopener noreferrer" : nothing}
          role="button"
          aria-disabled=${isDisabled ? "true" : nothing}
          aria-busy=${this.loading ? "true" : nothing}
          aria-label=${this.loading ? "Carregando" : nothing}
          @click=${this._handleClick}
        >
          ${content}
        </a>
      `;
		return html`
      <button
        part="button"
        class=${classMap(btnClasses)}
        type=${this.type}
        ?disabled=${isDisabled}
        aria-busy=${this.loading ? "true" : nothing}
        aria-label=${this.loading ? "Carregando" : nothing}
        @click=${this._handleClick}
      >
        ${content}
      </button>
    `;
	}
};
__decorate([property({ type: String })], AuyCompButton.prototype, "variant", void 0);
__decorate([property({ type: String })], AuyCompButton.prototype, "size", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompButton.prototype, "loading", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompButton.prototype, "disabled", void 0);
__decorate([property({ type: String })], AuyCompButton.prototype, "type", void 0);
__decorate([property({ type: String })], AuyCompButton.prototype, "href", void 0);
__decorate([property({ type: String })], AuyCompButton.prototype, "target", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompButton.prototype, "fullWidth", void 0);
__decorate([property({ type: String })], AuyCompButton.prototype, "icon", void 0);
__decorate([property({ type: String })], AuyCompButton.prototype, "iconPosition", void 0);
AuyCompButton = __decorate([customElement("auy-comp-button")], AuyCompButton);
//#endregion
//#region src/components/shadow-dom/alert.ts
var AuyCompAlert = class AuyCompAlert extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.variant = "info";
		this.open = true;
		this.dismissible = true;
		this.title = "";
		this.icon = true;
		this.timeout = 0;
		this._timer = null;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .alert {
        display: flex;
        align-items: flex-start;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        border-radius: var(--auy-radius-md);
        font-size: var(--auy-text-sm);
        line-height: var(--auy-line-height);
        background: oklch(from var(--auy-color-info) 95% 0.02 h);
        border-inline-start: 3px solid var(--auy-color-info);
        transition: opacity var(--auy-transition-base), transform var(--auy-transition-base);
      }

      .alert--success {
        background: oklch(from var(--auy-color-success) 95% 0.02 h);
        border-inline-start-color: var(--auy-color-success);
      }

      .alert--warning {
        background: oklch(from var(--auy-color-warning) 95% 0.02 h);
        border-inline-start-color: var(--auy-color-warning);
      }

      .alert--error {
        background: oklch(from var(--auy-color-error) 95% 0.02 h);
        border-inline-start-color: var(--auy-color-error);
      }

      @starting-style {
        .alert {
          opacity: 0;
          transform: translateY(-0.5rem);
        }
      }

      .alert__icon {
        display: inline-flex;
        align-items: center;
        flex-shrink: 0;
        inline-size: 1.25em;
        block-size: 1.25em;
        margin-block-start: 1px;
      }

      .alert__icon svg {
        inline-size: 100%;
        block-size: 100%;
        fill: currentColor;
      }

      .alert__content {
        flex: 1;
        display: grid;
        gap: 0.25rem;
        min-inline-size: 0;
      }

      .alert__title {
        font-weight: var(--auy-font-weight-semibold);
      }

      .alert__actions {
        display: flex;
        gap: var(--auy-space-sm);
        margin-block-start: var(--auy-space-xs);
      }

      .alert__dismiss {
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
        touch-action: manipulation;
      }

      .alert__dismiss:hover {
        opacity: 1;
      }

      .alert__dismiss:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (prefers-color-scheme: dark) {
        .alert {
          background: oklch(from var(--auy-color-info) 25% 0.06 h);
          color: oklch(from var(--auy-color-info) 85% 0.1 h);
        }

        .alert--success {
          background: oklch(from var(--auy-color-success) 25% 0.06 h);
          color: oklch(from var(--auy-color-success) 85% 0.1 h);
        }

        .alert--warning {
          background: oklch(from var(--auy-color-warning) 25% 0.06 h);
          color: oklch(from var(--auy-color-warning) 85% 0.12 h);
        }

        .alert--error {
          background: oklch(from var(--auy-color-error) 25% 0.06 h);
          color: oklch(from var(--auy-color-error) 85% 0.1 h);
        }
      }

      @media (forced-colors: active) {
        .alert {
          border: 1px solid CanvasText;
        }

        .alert__dismiss {
          border: 1px solid ButtonText;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .alert {
          transition: none;
        }
      }

      @media print {
        .alert {
          break-inside: avoid;
        }
      }
    }
  `;
	}
	get _hasActions() {
		return this._actionSlotEls.length > 0;
	}
	get _role() {
		return this._hasActions ? "alertdialog" : "alert";
	}
	get _ariaLive() {
		return this.variant === "error" || this.variant === "warning" ? "assertive" : "polite";
	}
	_startTimer() {
		this._clearTimer();
		if (this.timeout > 0 && typeof window !== "undefined") this._timer = window.setTimeout(() => {
			this.open = false;
		}, this.timeout);
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
	_dispatchDismiss() {
		this.dispatchEvent(new CustomEvent("dismiss", {
			bubbles: true,
			composed: true
		}));
	}
	_handleDismiss() {
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
	updated(changedProperties) {
		if (changedProperties.has("open")) if (this.open) {
			this._startTimer();
			this._dispatchShow();
		} else {
			this._clearTimer();
			this._dispatchDismiss();
		}
		if (changedProperties.has("timeout") && this.open) this._startTimer();
	}
	render() {
		if (!this.open) return html``;
		return html`
      <div
        part="alert"
        class=${classMap({
			alert: true,
			"alert--info": this.variant === "info",
			"alert--success": this.variant === "success",
			"alert--error": this.variant === "error",
			"alert--warning": this.variant === "warning"
		})}
        role=${this._role}
        aria-live=${this._ariaLive}
        aria-atomic="true"
      >
        ${this.icon ? html`<span part="icon" class="alert__icon">${this._renderIcon()}</span>` : ""}
        <div part="content" class="alert__content">
          <div part="title" class="alert__title">
            <slot name="title">${this.title}</slot>
          </div>
          <div part="description">
            <slot></slot>
          </div>
          <div part="actions" class="alert__actions">
            <slot name="action"></slot>
          </div>
        </div>
        ${this.dismissible ? html`<button part="dismiss" class="alert__dismiss" aria-label="Fechar" @click=${this._handleDismiss}>&times;</button>` : ""}
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
__decorate([property({ type: String })], AuyCompAlert.prototype, "variant", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompAlert.prototype, "open", void 0);
__decorate([property({ type: Boolean })], AuyCompAlert.prototype, "dismissible", void 0);
__decorate([property({ type: String })], AuyCompAlert.prototype, "title", void 0);
__decorate([property({ type: Boolean })], AuyCompAlert.prototype, "icon", void 0);
__decorate([property({ type: Number })], AuyCompAlert.prototype, "timeout", void 0);
__decorate([queryAssignedElements({ slot: "action" })], AuyCompAlert.prototype, "_actionSlotEls", void 0);
AuyCompAlert = __decorate([customElement("auy-comp-alert")], AuyCompAlert);
//#endregion
//#region src/components/shadow-dom/tooltip.ts
var tooltipIdCounter = 0;
var AuyCompTooltip = class AuyCompTooltip extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.text = "";
		this.position = "top";
		this.delay = 300;
		this.disabled = false;
		this._visible = false;
		this._active = false;
		this._timer = null;
		this._tooltipId = `auy-tooltip-${++tooltipIdCounter}`;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: inline-block;
      }

      .trigger {
        display: inline-flex;
      }

      .tooltip {
        position: fixed;
        z-index: var(--auy-z-tooltip);
        padding: var(--auy-space-xs) var(--auy-space-sm);
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-text);
        color: var(--auy-color-surface);
        font-size: var(--auy-text-xs);
        line-height: 1.4;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--auy-transition-fast);
        max-inline-size: min(90vw, 20rem);
      }

      .tooltip--active {
        opacity: 1;
      }

      .arrow {
        position: absolute;
        inline-size: 0;
        block-size: 0;
        border-style: solid;
      }

      .tooltip--top .arrow {
        inset-block-start: 100%;
        inset-inline-start: 50%;
        translate: -50% 0;
        border-width: 0.375rem 0.375rem 0 0.375rem;
        border-color: var(--auy-color-text) transparent transparent transparent;
      }

      .tooltip--bottom .arrow {
        inset-block-end: 100%;
        inset-inline-start: 50%;
        translate: -50% 0;
        border-width: 0 0.375rem 0.375rem 0.375rem;
        border-color: transparent transparent var(--auy-color-text) transparent;
      }

      .tooltip--left .arrow {
        inset-inline-start: 100%;
        inset-block-start: 50%;
        translate: 0 -50%;
        border-width: 0.375rem 0 0.375rem 0.375rem;
        border-color: transparent transparent transparent var(--auy-color-text);
      }

      .tooltip--right .arrow {
        inset-inline-end: 100%;
        inset-block-start: 50%;
        translate: 0 -50%;
        border-width: 0.375rem 0.375rem 0.375rem 0;
        border-color: transparent var(--auy-color-text) transparent transparent;
      }

      @media (prefers-reduced-motion: reduce) {
        .tooltip { transition: none; }
      }

      @media (forced-colors: active) {
        .tooltip {
          border: 1px solid CanvasText;
          background: Canvas;
          color: CanvasText;
        }
        .tooltip--top .arrow { border-top-color: CanvasText; }
        .tooltip--bottom .arrow { border-bottom-color: CanvasText; }
        .tooltip--left .arrow { border-left-color: CanvasText; }
        .tooltip--right .arrow { border-right-color: CanvasText; }
      }

      @media print {
        .tooltip { display: none !important; }
      }
    }
  `;
	}
	_getTrigger() {
		return (this._slot?.assignedElements() ?? [])[0] ?? null;
	}
	_updateTriggerAria() {
		const trigger = this._getTrigger();
		if (trigger && this.text) trigger.setAttribute("aria-describedby", this._tooltipId);
		else if (trigger) trigger.removeAttribute("aria-describedby");
	}
	_show() {
		if (this.disabled || !this.text) return;
		this._visible = true;
		this._active = false;
	}
	_position() {
		const trigger = this._getTrigger();
		const tooltip = this._tooltipEl;
		if (!trigger || !tooltip) return;
		const triggerRect = trigger.getBoundingClientRect();
		const tooltipRect = tooltip.getBoundingClientRect();
		const gap = 6;
		let left = 0;
		let top = 0;
		switch (this.position) {
			case "top":
				left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
				top = triggerRect.top - tooltipRect.height - gap;
				break;
			case "bottom":
				left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
				top = triggerRect.bottom + gap;
				break;
			case "left":
				left = triggerRect.left - tooltipRect.width - gap;
				top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
				break;
			case "right":
				left = triggerRect.right + gap;
				top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
				break;
		}
		tooltip.style.left = `${left}px`;
		tooltip.style.top = `${top}px`;
	}
	_onShow() {
		this._clearTimer();
		this._timer = setTimeout(() => {
			this._show();
			this.updateComplete.then(() => {
				this._position();
				requestAnimationFrame(() => {
					this._active = true;
				});
			});
		}, this.delay);
	}
	_onHide() {
		this._clearTimer();
		this._visible = false;
		this._active = false;
	}
	_clearTimer() {
		if (this._timer !== null) {
			clearTimeout(this._timer);
			this._timer = null;
		}
	}
	firstUpdated() {
		this._updateTriggerAria();
	}
	updated(changedProperties) {
		if (changedProperties.has("text") || changedProperties.has("disabled")) this._updateTriggerAria();
		if (changedProperties.has("position") && this._visible) this._position();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this._clearTimer();
	}
	render() {
		return html`
      <span part="trigger" class="trigger"
        @mouseenter=${this._onShow}
        @mouseleave=${this._onHide}
        @focusin=${this._onShow}
        @focusout=${this._onHide}
      >
        <slot @slotchange=${this._updateTriggerAria}></slot>
      </span>
      <div
        part="tooltip"
        class="tooltip tooltip--${this.position}${this._active ? " tooltip--active" : ""}"
        role="tooltip"
        id=${this._tooltipId}
        ?hidden=${!this._visible}
      >
        ${this.text}
        <span part="arrow" class="arrow"></span>
      </div>
    `;
	}
};
__decorate([property({ type: String })], AuyCompTooltip.prototype, "text", void 0);
__decorate([property({ type: String })], AuyCompTooltip.prototype, "position", void 0);
__decorate([property({ type: Number })], AuyCompTooltip.prototype, "delay", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompTooltip.prototype, "disabled", void 0);
__decorate([state()], AuyCompTooltip.prototype, "_visible", void 0);
__decorate([state()], AuyCompTooltip.prototype, "_active", void 0);
__decorate([query("slot")], AuyCompTooltip.prototype, "_slot", void 0);
__decorate([query(".tooltip")], AuyCompTooltip.prototype, "_tooltipEl", void 0);
AuyCompTooltip = __decorate([customElement("auy-comp-tooltip")], AuyCompTooltip);
//#endregion
//#region src/components/shadow-dom/accordion.ts
var AuyCompAccordion = class AuyCompAccordion extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.items = [];
		this.multiple = false;
		this.icon = "chevron";
		this._openMap = {};
	}
	static {
		this.shadowRootOptions = {
			...LitElement.shadowRootOptions,
			delegatesFocus: true
		};
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .accordion-item {
        border-block-end: 1px solid var(--auy-color-border);
      }

      .accordion-item:first-child {
        border-block-start: 1px solid var(--auy-color-border);
      }

      summary {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        font-family: inherit;
        font-size: var(--auy-text-sm);
        font-weight: var(--auy-font-weight-medium);
        color: var(--auy-color-text);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
      }

      summary::-webkit-details-marker {
        display: none;
      }

      summary:hover {
        background: color-mix(in oklch, var(--auy-color-border) 8%, transparent);
      }

      summary:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: -0.125rem;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.25em;
        block-size: 1.25em;
        flex-shrink: 0;
        transition: transform var(--auy-transition-fast);
      }

      .icon svg {
        inline-size: 100%;
        block-size: 100%;
        fill: none;
        stroke: currentColor;
      }

      .icon--chevron {
        transform: rotate(0deg);
      }

      details[open] .icon--chevron {
        transform: rotate(180deg);
      }

      details[open] .icon--plus {
        transform: rotate(45deg);
      }

      .content {
        height: 0;
        overflow: hidden;
        transition: height var(--auy-transition);
      }

      .content-inner {
        padding: 0 var(--auy-space-md) var(--auy-space-md);
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        line-height: var(--auy-line-height);
      }

      @media (prefers-reduced-motion: reduce) {
        .icon { transition: none; }
        .content { transition: none; }
      }

      @media (forced-colors: active) {
        .accordion-item {
          border: 1px solid ButtonText;
          border-block-end: none;
        }
        .accordion-item:last-child {
          border-block-end: 1px solid ButtonText;
        }
        summary:focus-visible {
          outline: 0.125rem solid Highlight;
          outline-offset: -0.125rem;
        }
      }

      @media print {
        .accordion-item {
          break-inside: avoid;
        }
        .content {
          height: auto !important;
        }
      }
    }
  `;
	}
	willUpdate(changed) {
		if (changed.has("items")) {
			const map = {};
			for (const item of this.items) map[item.id] = item.open ?? false;
			this._openMap = map;
		}
	}
	_animateItem(id, open) {
		const content = this.shadowRoot?.querySelector(`.content[data-item="${id}"]`);
		if (!content) return;
		const inner = content.querySelector(".content-inner");
		if (!inner) return;
		const height = inner.scrollHeight;
		if (open) {
			content.style.height = "0px";
			content.offsetHeight;
			content.style.height = `${height}px`;
		} else {
			content.style.height = `${height}px`;
			content.offsetHeight;
			content.style.height = "0px";
		}
	}
	_toggle(id) {
		const willOpen = !this._openMap[id];
		if (willOpen && !this.multiple) {
			for (const key of Object.keys(this._openMap)) if (key !== id) {
				this._animateItem(key, false);
				this._openMap = {
					...this._openMap,
					[key]: false
				};
			}
		}
		this._openMap = {
			...this._openMap,
			[id]: willOpen
		};
		this.updateComplete.then(() => {
			this._animateItem(id, willOpen);
		});
		this.dispatchEvent(new CustomEvent("toggle", {
			detail: {
				id,
				open: willOpen
			},
			bubbles: true,
			composed: true
		}));
	}
	render() {
		return html`
      ${this.items.map((item) => html`
        <details class="accordion-item" ?open=${this._openMap[item.id] ?? false}>
          <summary part="summary" @click=${(e) => {
			e.preventDefault();
			this._toggle(item.id);
		}}>
            <span class="icon icon--${this.icon}" aria-hidden="true">
              ${this.icon === "chevron" ? unsafeHTML(ICONS.chevronDown) : unsafeHTML(ICONS.plus)}
            </span>
            <span>${item.title}</span>
          </summary>
          <div class="content" data-item="${item.id}">
            <div class="content-inner">
              <slot name="item-${item.id}">${item.content}</slot>
            </div>
          </div>
        </details>
      `)}
    `;
	}
};
__decorate([property({ type: Array })], AuyCompAccordion.prototype, "items", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompAccordion.prototype, "multiple", void 0);
__decorate([property({ type: String })], AuyCompAccordion.prototype, "icon", void 0);
__decorate([state()], AuyCompAccordion.prototype, "_openMap", void 0);
AuyCompAccordion = __decorate([customElement("auy-comp-accordion")], AuyCompAccordion);
//#endregion
//#region src/components/shadow-dom/badge.ts
var AuyCompBadge = class AuyCompBadge extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.text = "";
		this.variant = "default";
		this.size = "md";
		this.outline = false;
		this.pill = false;
	}
	static {
		this.styles = css`
    @layer components {
      :host {
        display: inline-flex;
        contain: content;
      }

      [part="badge"] {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.3em;
        padding: 0.25em 0.75em;
        font-size: var(--auy-text-sm);
        font-weight: var(--auy-font-weight-semibold);
        line-height: 1.3;
        border-radius: var(--auy-radius-sm);
        color: var(--auy-color-primary-inverse);
        background: var(--auy-color-primary);
        white-space: nowrap;
        user-select: none;
        border: 1px solid transparent;
        vertical-align: middle;
      }

      :host([size="sm"]) [part="badge"] {
        font-size: var(--auy-text-xs);
        padding: 0.15em 0.5em;
      }

      [data-badge-pill] {
        border-radius: var(--auy-radius-full);
        padding-inline: 0.8em;
      }

      [data-badge-variant="success"] { background: var(--auy-color-success); color: var(--auy-color-primary-inverse); }
      [data-badge-variant="error"] { background: var(--auy-color-error); color: var(--auy-color-primary-inverse); }
      [data-badge-variant="warning"] { background: var(--auy-color-warning); color: var(--auy-color-text); }
      [data-badge-variant="info"] { background: var(--auy-color-info); color: var(--auy-color-primary-inverse); }

      [data-badge-outline] {
        background: transparent;
        border-color: var(--auy-color-primary);
        color: var(--auy-color-primary);
      }
      [data-badge-outline][data-badge-variant="success"] { border-color: var(--auy-color-success); color: var(--auy-color-success); }
      [data-badge-outline][data-badge-variant="error"] { border-color: var(--auy-color-error); color: var(--auy-color-error); }
      [data-badge-outline][data-badge-variant="warning"] { border-color: var(--auy-color-warning); color: var(--auy-color-warning); }
      [data-badge-outline][data-badge-variant="info"] { border-color: var(--auy-color-info); color: var(--auy-color-info); }

      @media (forced-colors: active) {
        [part="badge"] { border: 1px solid ButtonText; }
      }

      @media print {
        [part="badge"] { display: none !important; }
      }
    }
  `;
	}
	render() {
		return html`
      <span
        part="badge"
        data-badge
        data-badge-variant=${this.variant !== "default" ? this.variant : nothing}
        ?data-badge-pill=${this.pill}
        ?data-badge-outline=${this.outline}
      >
        <slot>${this.text}</slot>
      </span>
    `;
	}
};
__decorate([property({ type: String })], AuyCompBadge.prototype, "text", void 0);
__decorate([property({ type: String })], AuyCompBadge.prototype, "variant", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyCompBadge.prototype, "size", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompBadge.prototype, "outline", void 0);
__decorate([property({
	type: Boolean,
	reflect: true
})], AuyCompBadge.prototype, "pill", void 0);
AuyCompBadge = __decorate([customElement("auy-comp-badge")], AuyCompBadge);
//#endregion
//#region src/components/shadow-dom/breadcrumbs.ts
var AuyCompBreadcrumbs = class AuyCompBreadcrumbs extends LitElement {
	constructor(..._args) {
		super(..._args);
		this.items = [];
		this.variant = "default";
		this.icons = false;
	}
	static {
		this.styles = css`
    :host {
      display: block;
      contain: layout style;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: var(--auy-text-xs);
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
      gap: var(--auy-space-2xs);
    }

    li + li {
      margin-inline-start: 0;
    }

    .sep {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--auy-color-border);
      flex-shrink: 0;
      line-height: 0;
      margin-inline: var(--auy-space-2xs);
      user-select: none;
    }

    .sep svg {
      inline-size: 1em;
      block-size: 1em;
    }

    a, .current {
      display: inline-flex;
      align-items: center;
      gap: var(--auy-space-2xs);
      padding: var(--auy-space-2xs) var(--auy-space-xs);
      border-radius: var(--auy-radius-sm);
      white-space: nowrap;
      touch-action: manipulation;
      text-decoration: none;
      transition: background var(--auy-transition-fast), color var(--auy-transition-fast);
    }

    .item-icon {
      display: inline-flex;
      align-items: center;
      inline-size: 1em;
      block-size: 1em;
      flex-shrink: 0;
      opacity: 0.7;
    }
    .item-icon svg {
      inline-size: 100%;
      block-size: 100%;
    }

    a {
      color: var(--auy-color-text-muted);
      font-weight: var(--auy-font-weight-medium);
    }
    a:hover {
      background: color-mix(in oklch, var(--auy-color-border) 20%, transparent);
      color: var(--auy-color-text);
    }
    a:focus-visible {
      outline: 0.125rem solid var(--auy-color-primary);
      outline-offset: 0.0625rem;
    }

    .current {
      color: var(--auy-color-text);
      font-weight: var(--auy-font-weight-semibold);
      overflow: hidden;
      text-overflow: ellipsis;
      max-inline-size: 20ch;
    }

    @container (max-width: 400px) {
      li:not(:last-of-type) a { max-inline-size: 10ch; overflow: hidden; text-overflow: ellipsis; }
    }

    /* arrow */
    :host([variant="arrow"]) .sep { margin-inline: var(--auy-space-xs); color: var(--auy-color-text-muted); opacity: 0.5; }
    :host([variant="arrow"]) a:hover { background: transparent; }

    /* depth — ohmyzsh-style: solid segments with interlocking > cuts */
    :host([variant="depth"]) nav { padding-block: 0; overflow: visible; }
    :host([variant="depth"]) ol { gap: 0; }
    :host([variant="depth"]) li { gap: 0; overflow: visible; }
    :host([variant="depth"]) .sep { display: none; }
    :host([variant="depth"]) a, :host([variant="depth"]) .current {
      position: relative;
      z-index: 1;
      display: inline-flex;
      align-items: center;
      gap: var(--auy-space-2xs);
      padding: var(--auy-space-xs) calc(var(--auy-space-sm) + 0.75rem) var(--auy-space-xs) var(--auy-space-sm);
      font-weight: var(--auy-font-weight-medium);
      text-decoration: none;
      clip-path: polygon(0 0, calc(100% - 0.75rem) 0, 100% 50%, calc(100% - 0.75rem) 100%, 0 100%);
      margin-inline-end: -0.75rem;
      outline-offset: -0.0625rem;
    }
    :host([variant="depth"]) a { color: var(--auy-color-text); }
    :host([variant="depth"]) a:hover { filter: brightness(0.92); }
    :host([variant="depth"]) .current { color: white; z-index: 2; }
    :host([variant="depth"]) li:last-child a,
    :host([variant="depth"]) li:last-child .current {
      clip-path: none;
      margin-inline-end: 0;
      border-radius: 0 var(--auy-radius-sm) var(--auy-radius-sm) 0;
      padding-inline-end: var(--auy-space-sm);
    }
    :host([variant="depth"]) li:first-child a,
    :host([variant="depth"]) li:first-child .current {
      border-radius: var(--auy-radius-sm) 0 0 var(--auy-radius-sm);
    }

    /* solid */
    :host([variant="solid"]) nav {
      background: var(--auy-color-surface-alt);
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-md);
      padding: var(--auy-space-xs) var(--auy-space-sm);
    }
    :host([variant="solid"]) a {
      color: var(--auy-color-text-muted);
    }
    :host([variant="solid"]) a:hover {
      background: color-mix(in oklch, var(--auy-color-border) 25%, transparent);
    }
    :host([variant="solid"]) .current {
      color: var(--auy-color-primary);
      font-weight: var(--auy-font-weight-bold);
    }

    @media (forced-colors: active) {
      a { border: 1px solid transparent; }
      a:hover { border-color: ButtonText; }
      a:focus-visible { outline: 2px solid Highlight; outline-offset: 2px; }
    }
    @media print { nav { display: flex; } }
  `;
	}
	_renderIcon(name) {
		const svgStr = ICONS[name];
		if (!svgStr) return nothing;
		return html`<span class="item-icon">${unsafeHTML(svgStr)}</span>`;
	}
	_depthPct(i, n) {
		if (n <= 1) return 90;
		return Math.round((.12 + i / (n - 1) * .78) * 100);
	}
	_renderItem(item, i, arr) {
		const isLast = i === arr.length - 1;
		const icon = this.icons && item.icon ? this._renderIcon(item.icon) : nothing;
		let style = "";
		if (this.variant === "depth") style = `background:color-mix(in oklch,var(--auy-color-primary) ${this._depthPct(i, arr.length)}%,transparent);`;
		const content = html`
      ${icon}
      ${item.label}
    `;
		const link = isLast || !item.href ? html`<span class="current" aria-current="page" style=${style}>${content}</span>` : html`<a href=${item.href} style=${style}>${content}</a>`;
		return html`
      <li>
        ${i > 0 && this.variant !== "depth" ? this._renderSeparator() : nothing}
        ${link}
      </li>
    `;
	}
	_renderSeparator() {
		if (this.variant === "arrow") return html`<span class="sep" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </span>`;
		return html`<span class="sep" aria-hidden="true">/</span>`;
	}
	render() {
		if (!this.items.length) return nothing;
		return html`
      <nav aria-label="Breadcrumb">
        <ol>
          ${this.items.map((item, i, arr) => this._renderItem(item, i, arr))}
        </ol>
      </nav>
    `;
	}
};
__decorate([property({ type: Array })], AuyCompBreadcrumbs.prototype, "items", void 0);
__decorate([property({
	type: String,
	reflect: true
})], AuyCompBreadcrumbs.prototype, "variant", void 0);
__decorate([property({ type: Boolean })], AuyCompBreadcrumbs.prototype, "icons", void 0);
AuyCompBreadcrumbs = __decorate([customElement("auy-comp-breadcrumbs")], AuyCompBreadcrumbs);
//#endregion
export { maskPhone as A, capitalize as C, formatRelativeTime as D, formatNumber as E, slugify as M, stripMask$1 as N, maskCNPJ as O, truncate as P, AuyCompMetadata as S, formatDate as T, AuyCompSelect as _, AuyCompAlert as a, AuyCompDateInput as b, AuyCompModal as c, AuyCompAudio as d, AuyCompCodeEditor as f, AuyCompTabs as g, AuyCompToast as h, AuyCompTooltip as i, pluralize as j, maskCPF as k, AuyCompTable as l, AuyCompToastContainer as m, AuyCompBadge as n, AuyCompButton as o, AuyCompPagination as p, AuyCompAccordion as r, ICONS as s, AuyCompBreadcrumbs as t, AuyCompColorInput as u, AuyCompSearch as v, formatCurrency as w, AuyCompFileInput as x, AuyCompFormGroup as y };
