import { LitElement, html, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property } from 'lit/decorators.js';
import { getIcon, type IconName } from './_internal/icons.ts';
import { DataAwareMixin } from './_internal/data-aware.mixin.ts';
import { t } from './_internal/locale.ts';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: IconName;
}

@customElement('auy-comp-breadcrumbs')
export class AuyCompBreadcrumbs extends DataAwareMixin(LitElement) {
  override createRenderRoot() { return this; }

  @property({ type: Array }) items: BreadcrumbItem[] = [];
  @property({ type: String, reflect: true }) variant: 'default' | 'arrow' | 'depth' | 'solid' = 'default';
  @property({ type: Boolean }) icons = false;

  protected override _parseResponse(data: unknown): void {
    if (Array.isArray(data)) {
      this.items = data as BreadcrumbItem[];
    }
  }

  private _renderIcon(name: IconName) {
    const svgStr = getIcon(name);
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
      <nav data-element="breadcrumbs" aria-label=${t('breadcrumbLabel')}>
        <ol>
          ${this.items.map((item, i, arr) => this._renderItem(item, i, arr))}
        </ol>
      </nav>
    `;
  }
}
