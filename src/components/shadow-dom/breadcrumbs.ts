import { LitElement, html, css, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property } from 'lit/decorators.js';
import { ICONS, type IconName } from '../_internal/icons.js';
import { DataAwareMixin } from '../_internal/data-aware.mixin.ts';
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts';

/** Item de navegação das migalhas */
export interface BreadcrumbItem {
  /** Rótulo exibido */
  label: string;
  /** URL (opcional para o último item não clicável) */
  href?: string;
  /** Nome do ícone (da biblioteca interna) */
  icon?: IconName;
}

/**
 * @element auy-comp-breadcrumbs
 * @csspart nav - Elemento de navegação
 */
@customElement('auy-comp-breadcrumbs')
export class AuyCompBreadcrumbs extends StyleCustomizableMixin(DataAwareMixin(LitElement)) {
  static override styles = css`
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
      min-block-size: 2.75rem;
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

  /** Array de itens */
  @property({ type: Array }) items: BreadcrumbItem[] = [];
  /** Variante visual: default, arrow, depth, solid */
  @property({ type: String, reflect: true }) variant: 'default' | 'arrow' | 'depth' | 'solid' = 'default';
  /** Exibe ícones ao lado do rótulo */
  @property({ type: Boolean }) icons = false;

  protected override _parseResponse(data: unknown): void {
    if (Array.isArray(data)) {
      this.items = data as BreadcrumbItem[];
    }
  }

  private _renderIcon(name: IconName) {
    const svgStr = ICONS[name];
    if (!svgStr) return nothing;
    return html`<span class="item-icon">${unsafeHTML(svgStr)}</span>`;
  }

  private _depthPct(i: number, n: number): number {
    if (n <= 1) return 90;
    return Math.round((0.12 + (i / (n - 1)) * 0.78) * 100);
  }

  private _renderItem(item: BreadcrumbItem, i: number, arr: BreadcrumbItem[]) {
    const isLast = i === arr.length - 1;
    const icon = this.icons && item.icon ? this._renderIcon(item.icon) : nothing;

    let style = '';
    if (this.variant === 'depth') {
      const pct = this._depthPct(i, arr.length);
      style = `background:color-mix(in oklch,var(--auy-color-primary) ${pct}%,transparent);`;
    }

    const content = html`
      ${icon}
      ${item.label}
    `;

    const link = isLast || !item.href
      ? html`<span class="current" aria-current="page" style=${style}>${content}</span>`
      : html`<a href=${item.href} style=${style}>${content}</a>`;

    return html`
      <li>
        ${i > 0 && this.variant !== 'depth' ? this._renderSeparator() : nothing}
        ${link}
      </li>
    `;
  }

  private _renderSeparator() {
    if (this.variant === 'arrow') {
      return html`<span class="sep" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
      </span>`;
    }
    return html`<span class="sep" aria-hidden="true">/</span>`;
  }

  override render() {
    if (!this.items.length) return nothing;

    return html`
      ${this._renderCustomStyles()}
      <nav aria-label="Breadcrumb">
        <ol>
          ${this.items.map((item, i, arr) => this._renderItem(item, i, arr))}
        </ol>
      </nav>
    `;
  }
}