import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @slot header-actions - Actions displayed next to the header title
 * @slot left - Left sidebar content (when columns is "left-aside" or "both")
 * @slot right - Right sidebar content (when columns is "right-aside" or "both")
 * @slot default - Main content area
 */
@customElement('auy-main-section')
export class AuyMainSection extends LitElement {
  static override styles = css`
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

  @property({ type: String }) columns: 'single' | 'left-aside' | 'right-aside' | 'both' = 'single';
  @property({ type: String }) header = '';

  override render() {
    return html`
      <main id="main-content" part="section" role="main">
        ${this.header
          ? html`
              <header part="header">
                <h1>${this.header}</h1>
                <slot name="header-actions"></slot>
              </header>
            `
          : nothing}
        <div class="section ${this.columns}" part="content">
          ${this._renderContent()}
        </div>
      </main>
    `;
  }

  private _renderContent() {
    switch (this.columns) {
      case 'left-aside':
        return html`
          <aside part="left"><slot name="left"></slot></aside>
          <div><slot></slot></div>
        `;
      case 'right-aside':
        return html`
          <div><slot></slot></div>
          <aside part="right"><slot name="right"></slot></aside>
        `;
      case 'both':
        return html`
          <aside part="left"><slot name="left"></slot></aside>
          <div><slot></slot></div>
          <aside part="right"><slot name="right"></slot></aside>
        `;
      case 'single':
      default:
        return html`<div><slot></slot></div>`;
    }
  }
}
