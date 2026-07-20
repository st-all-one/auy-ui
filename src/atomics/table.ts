import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { queryAll } from 'lit/decorators/query-all.js';
import { keyed } from 'lit/directives/keyed.js';

@customElement('auy-internal-table')
export class AuyInternalTable extends LitElement {
  static override styles = css`
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

  @property({ type: Array }) columns: { label: string; key: string }[] = [];
  @property({ type: Array }) rows: Record<string, any>[] = [];
  @property({ type: Boolean }) selectable = false;
  @property({ type: String, reflect: true }) theme: 'light' | 'dark' = 'light';

  @state() private _computedColumns: { label: string; key: string }[] = [];
  @state() private _computedGridCols = '';

  @queryAll('[role="row"]')
  private _rows!: NodeListOf<HTMLElement>;

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('selectable') || changed.has('columns')) {
      this._computedColumns = this.selectable
        ? [{ label: '', key: '__select__' }, ...this.columns]
        : this.columns;
      this._computedGridCols = this.selectable
        ? `48px repeat(${this.columns.length}, 1fr)`
        : `repeat(${this.columns.length}, 1fr)`;
    }
  }

  private _onSelectAll(e: Event) {
    const checked = (e.target as HTMLInputElement).checked;
    const checkboxes = Array.from(this._rows)
      .filter(row => row.getAttribute('part') !== 'header')
      .flatMap(row => Array.from(row.querySelectorAll('input[type="checkbox"]')));
    checkboxes.forEach(cb => ((cb as HTMLInputElement).checked = checked));
    this.dispatchEvent(new CustomEvent('select-all', { detail: { checked } }));
  }

  private _onSelect(e: Event) {
    const target = e.target as HTMLInputElement;
    const rowIndex = Number(target.dataset.index);
    const checked = target.checked;
    this.dispatchEvent(
      new CustomEvent('select', {
        detail: { index: rowIndex, checked, row: this.rows[rowIndex] },
      })
    );
  }

  override render() {
    const cols = this._computedColumns;
    const gridCols = this._computedGridCols;

    return html`
      <div part="table" role="table" style="--grid-cols: ${gridCols}">
        <div role="rowgroup">
          <div role="row" part="header">
            ${cols.map(
              col => html`
                <div role="columnheader" part="cell">
                  ${col.key === '__select__'
                    ? html`<input type="checkbox" @change=${this._onSelectAll} />`
                    : col.label}
                </div>
              `
            )}
          </div>
        </div>
        <div role="rowgroup">
          ${keyed(this.rows, this.rows.map(
            (row, rowIndex) => html`
              <div role="row" part="row">
                ${cols.map(
                  col => html`
                    <div
                      role="cell"
                      part="cell"
                      data-label=${col.key !== '__select__' ? col.label : nothing}
                    >
                      ${col.key === '__select__'
                        ? html`<input
                            type="checkbox"
                            data-index=${rowIndex}
                            @change=${this._onSelect}
                          />`
                        : row[col.key] ?? nothing}
                    </div>
                  `
                )}
              </div>
            `
          ))}
        </div>
      </div>
    `;
  }
}
