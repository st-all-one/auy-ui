import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface Crumb {
  label: string;
  href?: string;
  icon?: string;
}

@customElement('auy-internal-breadcrumb')
export class AuyInternalBreadcrumb extends LitElement {
  static override styles = css`
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

  @property({ type: Array }) crumbs: Crumb[] = [];
  @property({ type: Boolean }) generateJsonLd = true;
  @property({ type: Boolean }) showHomeIcon = true;

  private _jsonLdScript() {
    if (!this.generateJsonLd || this.crumbs.length === 0) return nothing;
    const items = this.crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: crumb.href } : {}),
    }));
    const json = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    };
    return html`<script type="application/ld+json">${JSON.stringify(json)}</script>`;
  }

  private _chevron() {
    return html`
      <span class="separator" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </span>
    `;
  }

  private _renderLabel(crumb: Crumb, i: number) {
    if (i === 0 && this.showHomeIcon && crumb.href === '/') {
      return html`
        <span class="home-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="inline-size:1em;block-size:1em;">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </span>
      `;
    }
    return html`
      ${crumb.icon ? html`<span aria-hidden="true">${crumb.icon}</span>` : nothing}
      <span class="label">${crumb.label}</span>
    `;
  }

  override render() {
    return html`
      <nav aria-label="Breadcrumb">
        <ol>
          ${this.crumbs.length > 0
            ? this.crumbs.map(
                (crumb, i) => html`
                  ${i > 0 ? this._chevron() : nothing}
                  <li>
                    ${crumb.href
                      ? html`
                          <a href=${crumb.href} aria-label=${i === 0 && this.showHomeIcon && crumb.href === '/' ? 'Início' : nothing}>
                            ${this._renderLabel(crumb, i)}
                          </a>
                        `
                      : html`
                          <span class="current" aria-current="page">
                            ${this._renderLabel(crumb, i)}
                          </span>
                        `}
                  </li>
                `
              )
            : html`<li><slot></slot></li>`}
        </ol>
        ${this._jsonLdScript()}
      </nav>
    `;
  }
}
