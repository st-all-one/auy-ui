import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { DataAwareMixin } from './_internal/data-aware.mixin.ts'
import { t } from './_internal/locale.ts'

export interface Column {
  key: string
  label: string
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  format?: 'text' | 'number' | 'date' | 'currency'
}

/**
 * @element auy-comp-table
 * @fires sort-change - Disparado ao ordenar coluna
 * @fires row-select - Disparado ao selecionar linha(s)
 * @csspart wrapper - Container externo
 * @csspart title - Título da tabela
 * @csspart table - Elemento `<table>`
 * @csspart thead - Cabeçalho
 * @csspart tbody - Corpo da tabela
 * @csspart th - Célula de cabeçalho
 * @csspart td - Célula de dados
 * @csspart row - Linha
 * @csspart checkbox - Checkbox de seleção
 * @csspart filter-input - Input de filtro
 * @csspart loading - Estado de carregamento
 */
@customElement('auy-comp-table')
export class AuyCompTable extends DataAwareMixin(LitElement) {
  override createRenderRoot() { return this; }

  static override get observedDataEvents(): string[] {
    return ['sort-change', 'row-select']
  }

  @property({ type: Array }) columns: Column[] = []
  @property({ type: Array }) rows: Record<string, unknown>[] = []
  @property({ type: Number }) pageSize = 20
  @property({ type: Number, reflect: true }) currentPage = 1
  @property({ type: Boolean }) sortable = true
  @property({ type: Boolean }) filterable = false
  @property({ type: Boolean }) selectable = false
  @property({ type: Boolean }) stickyHeader = true
  @property({ type: String }) emptyMessage = ''
  @property({ type: Boolean }) loading = false
  @property({ type: String }) title = ''
  @property({ type: Boolean }) showTotalRow = false
  @property({ type: Boolean }) showHeader = true
  @property({ type: String }) description = ''

  @state() private _filterOpen = false

  @state() private _sortColumn = ''
  @state() private _sortDirection: 'asc' | 'desc' | null = null
  @state() private _filterText = ''
  @state() private _selectedIndices = new Set<number>()
  @state() private _focusedIndex = -1
  @state() private _processedRows: Record<string, unknown>[] = []
  @state() private _totalPages = 1
  @state() private _allSelected = false

  private _nfNumber = new Intl.NumberFormat(t('tableLocale'))
  private _nfCurrency = new Intl.NumberFormat(t('tableLocale'), { style: 'currency', currency: t('tableCurrency') })
  private _dfDate = new Intl.DateTimeFormat(t('tableLocale'), { timeZone: 'UTC' })

  protected override _parseResponse(data: unknown): void {
    const d = data as Record<string, unknown>
    if (d.columns) this.columns = d.columns as Column[]
    if (d.rows) this.rows = d.rows as Record<string, unknown>[]
  }

  protected override _getDefaultParams(): URLSearchParams {
    const params = new URLSearchParams()
    params.set('page', String(this.currentPage))
    params.set('perPage', String(this.pageSize))
    if (this._sortColumn) params.set('sort', this._sortColumn)
    if (this._sortDirection) params.set('dir', this._sortDirection)
    return params
  }

  protected override _applyMeta(meta: Record<string, unknown>): void {
    if (meta.total !== undefined) {
      const total = Number(meta.total)
      this._totalPages = Math.max(1, Math.ceil(total / this.pageSize))
    }
  }

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('rows') || changed.has('_filterText') || changed.has('_sortColumn') || changed.has('_sortDirection')) {
      this._processRows()
    }
    if (changed.has('pageSize') || changed.has('_processedRows') || changed.has('currentPage')) {
      this._updatePagination()
    }
    if (changed.has('rows')) {
      this._selectedIndices.clear()
      this._allSelected = false
    }
    if (changed.has('_processedRows') || changed.has('currentPage')) {
      this._clampFocus()
    }
  }

  private _processRows() {
    let result = this.rows.slice()
    if (this._filterText && this.columns.length > 0) {
      const lower = this._filterText.toLowerCase()
      result = result.filter(row =>
        this.columns.some(col => {
          const val = row[col.key]
          return val != null && String(val).toLowerCase().includes(lower)
        })
      )
    }
    if (this._sortColumn && this._sortDirection) {
      const col = this.columns.find(c => c.key === this._sortColumn)
      const fmt = col?.format ?? 'text'
      result = result.slice().sort((a, b) => {
        const va = a[this._sortColumn]
        const vb = b[this._sortColumn]
        let cmp = 0
        switch (fmt) {
          case 'number':
          case 'currency':
            cmp = (Number(va) || 0) - (Number(vb) || 0)
            break
          case 'date':
            cmp = new Date(va as string).getTime() - new Date(vb as string).getTime()
            break
          default:
            cmp = String(va ?? '').localeCompare(String(vb ?? ''), t('tableLocale'))
        }
        return this._sortDirection === 'desc' ? -cmp : cmp
      })
    }
    this._processedRows = result
  }

  private _updatePagination() {
    this._totalPages = Math.max(1, Math.ceil(this._processedRows.length / this.pageSize))
    if (this.currentPage > this._totalPages) {
      this.currentPage = this._totalPages
    }
  }

  private get _pagedRows(): Record<string, unknown>[] {
    const start = (this.currentPage - 1) * this.pageSize
    return this._processedRows.slice(start, start + this.pageSize)
  }

  private get _pageStart(): number {
    return (this.currentPage - 1) * this.pageSize
  }

  private _clampFocus() {
    const len = this._pagedRows.length
    if (len === 0) {
      this._focusedIndex = -1
      return
    }
    const start = this._pageStart
    const end = start + len - 1
    if (this._focusedIndex < start || this._focusedIndex > end) {
      this._focusedIndex = start
    }
  }

  private _handleSort(col: Column) {
    if (!this.sortable || !col.sortable) return
    if (this._sortColumn === col.key) {
      if (this._sortDirection === 'asc') {
        this._sortDirection = 'desc'
      } else if (this._sortDirection === 'desc') {
        this._sortColumn = ''
        this._sortDirection = null
      } else {
        this._sortDirection = 'asc'
      }
    } else {
      this._sortColumn = col.key
      this._sortDirection = 'asc'
    }
    this.dispatchEvent(new CustomEvent('sort-change', {
      detail: { column: this._sortColumn, direction: this._sortDirection },
      bubbles: true,
      composed: true,
    }))
    if (this.dataInput) {
      this._fetchData(this._getDefaultParams())
    }
  }

  private readonly _handleFilterInput = (e: Event) => {
    this._filterText = (e.target as HTMLInputElement).value
    this.currentPage = 1
  }

  private readonly _handleRowSelect = (idx: number) => {
    if (!this.selectable) return
    if (this._selectedIndices.has(idx)) {
      this._selectedIndices.delete(idx)
    } else {
      this._selectedIndices.add(idx)
    }
    this._emitRowSelect()
  }

  private readonly _handleSelectAll = () => {
    if (this._allSelected) {
      this._selectedIndices.clear()
    } else {
      this._selectedIndices = new Set(this._processedRows.map((_, i) => i))
    }
    this._emitRowSelect()
  }

  private _emitRowSelect() {
    const selectedRows = this._processedRows.filter((_, i) => this._selectedIndices.has(i))
    this._allSelected = this._processedRows.length > 0 && this._selectedIndices.size === this._processedRows.length
    this.dispatchEvent(new CustomEvent('row-select', {
      detail: { rows: selectedRows, allSelected: this._allSelected },
      bubbles: true,
      composed: true,
    }))
  }

  private readonly _handleRowKeyDown = (e: KeyboardEvent) => {
    const len = this._pagedRows.length
    if (len === 0) return
    const start = this._pageStart
    const end = start + len - 1

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this._focusedIndex = Math.min(this._focusedIndex + 1, end)
        break
      case 'ArrowUp':
        e.preventDefault()
        this._focusedIndex = Math.max(start, this._focusedIndex - 1)
        break
      case 'Home':
        e.preventDefault()
        this._focusedIndex = start
        break
      case 'End':
        e.preventDefault()
        this._focusedIndex = end
        break
      case ' ':
        e.preventDefault()
        if (this.selectable && this._focusedIndex >= 0) {
          this._handleRowSelect(this._focusedIndex)
        }
        return
      default:
        return
    }
    this.updateComplete.then(() => {
      const el = this.querySelector(`[data-row-index="${this._focusedIndex}"]`) as HTMLElement | null
      el?.focus()
    })
  }

  private _formatCell(col: Column, row: Record<string, unknown>): unknown {
    const val = row[col.key]
    if (val == null || val === '') return nothing
    switch (col.format) {
      case 'number':
        return this._nfNumber.format(Number(val))
      case 'currency':
        return this._nfCurrency.format(Number(val))
      case 'date':
        return this._dfDate.format(new Date(val as string))
      default:
        return String(val)
    }
  }

  private _getSortAria(col: Column): string | undefined {
    if (!this.sortable || !col.sortable) return undefined
    if (this._sortColumn !== col.key) return 'none'
    return this._sortDirection === 'asc' ? 'ascending' : 'descending'
  }

  private _getSortDescription(col: Column): string {
    if (this._sortColumn !== col.key || !this._sortDirection) return t('tableSortAsc')
    return this._sortDirection === 'asc'
      ? t('tableSortAscActive')
      : t('tableSortDescActive')
  }

  private _renderHeaderRow() {
    return html`
      <tr data-part="header-row" role="row">
        ${this.selectable ? html`
          <th data-part="th th-checkbox" role="columnheader" scope="col" aria-label=${t('tableSelectAll')}>
            <input
              data-part="checkbox"
              type="checkbox"
              aria-label=${t('tableSelectAll')}
              .checked=${this._allSelected && this._processedRows.length > 0}
              @change=${this._handleSelectAll}
            >
          </th>
        ` : nothing}
        ${this.columns.map(col => {
          const sortable = this.sortable && col.sortable
          const ariaSort = this._getSortAria(col)
          return html`
            <th
              data-part="th ${sortable ? 'th-sortable' : ''}"
              role="columnheader"
              scope="col"
              style=${ifDefined(col.width ? `width:${col.width}` : undefined)}
              aria-sort=${ifDefined(ariaSort)}
              tabindex=${sortable ? '0' : nothing}
              @click=${() => this._handleSort(col)}
              @keydown=${(e: KeyboardEvent) => {
                if (sortable && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault()
                  this._handleSort(col)
                }
              }}
            >
              ${col.label}
              ${sortable ? html`<span data-part="visually-hidden">${this._getSortDescription(col)}</span>` : nothing}
            </th>
          `
        })}
      </tr>
    `
  }

  private _renderRow(row: Record<string, unknown>, pageRowIndex: number) {
    const globalIndex = this._pageStart + pageRowIndex
    const isSelected = this._selectedIndices.has(globalIndex)
    const isFocused = this._focusedIndex === globalIndex
    return html`
      <tr
        data-part="row"
        role="row"
        data-row-index="${globalIndex}"
        aria-selected=${this.selectable ? (isSelected ? 'true' : 'false') : 'false'}
        tabindex=${isFocused ? '0' : '-1'}
        @click=${() => this._handleRowSelect(globalIndex)}
        @keydown=${this._handleRowKeyDown}
      >
        ${this.selectable ? html`
          <td data-part="td td-checkbox" role="gridcell">
            <input
              data-part="checkbox"
              type="checkbox"
              aria-label=${t('tableSelectRow')}
              .checked=${isSelected}
              @change=${(e: Event) => {
                e.stopPropagation()
                this._handleRowSelect(globalIndex)
              }}
            >
          </td>
        ` : nothing}
        ${this.columns.map(col => html`
          <td
            data-part="td"
            role="gridcell"
            style=${ifDefined(col.align ? `text-align:${col.align}` : undefined)}
            data-label=${col.label}
          >${this._formatCell(col, row)}</td>
        `)}
      </tr>
    `
  }

  private _renderTotalRow() {
    return html`
      <tr data-part="total-row" role="row">
        ${this.selectable ? html`<td data-part="td"></td>` : nothing}
        ${this.columns.map(col => {
          if (col.format === 'number' || col.format === 'currency') {
            const total = this._pagedRows.reduce((sum, row) => sum + (Number(row[col.key]) || 0), 0)
            return html`
              <td data-part="td" role="gridcell" style=${ifDefined(col.align ? `text-align:${col.align}` : undefined)}>
                ${col.format === 'currency'
                  ? this._nfCurrency.format(total)
                  : this._nfNumber.format(total)
                }
              </td>
            `
          }
          if (col.key === this.columns[0]?.key) {
            return html`<td data-part="td" role="gridcell">${t('tableTotal')}</td>`
          }
          return html`<td data-part="td" role="gridcell"></td>`
        })}
      </tr>
    `
  }

  private _renderEmptyRow() {
    const colCount = this.columns.length + (this.selectable ? 1 : 0)
    return html`
      <tr data-part="empty-row" role="row">
        <td data-part="td" role="gridcell" colspan=${colCount}>
          <span data-part="empty-icon" aria-hidden="true">—</span>
          ${this.emptyMessage || t('tableEmpty')}
        </td>
      </tr>
    `
  }

  override render() {
    const pagedRows = this._pagedRows

    const filterIconOpen = this._filterOpen ? 'open' : '';
    return html`
      <div data-element="table" data-part="wrapper">
        ${this.title ? html`
          <div
            data-part="title ${this.filterable ? 'title-filterable' : ''}"
            tabindex=${this.filterable ? '0' : nothing}
            role=${this.filterable ? 'button' : nothing}
            aria-expanded=${this.filterable ? (this._filterOpen ? 'true' : 'false') : nothing}
            aria-label=${this.filterable ? t('tableFilterLabel') : nothing}
            @click=${this.filterable ? (() => this._filterOpen = !this._filterOpen) : undefined}
            @keydown=${this.filterable ? ((e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._filterOpen = !this._filterOpen; } }) : undefined}
          >
            <span>${this.title}</span>
            ${this.filterable ? html`
              <span data-part="title-icon" .open=${filterIconOpen} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </span>
            ` : nothing}
          </div>
        ` : nothing}

        ${this.filterable ? html`
          <div data-part="toolbar" visible=${this._filterOpen ? 'true' : 'false'} .hidden=${!this._filterOpen}>
            <div data-part="filter-wrap">
              <input
                data-part="filter-input"
                type="search"
                .value=${this._filterText}
                @input=${this._handleFilterInput}
                placeholder=${t('tableFilterPlaceholder')}
                aria-label=${t('tableFilterLabel')}
              >
            </div>
          </div>
        ` : nothing}

        ${this.loading ? html`
          <div data-part="loading" role="status" aria-live="polite">${t('tableLoading')}</div>
        ` : html`
          <div data-part="table-scroll">
            <table
              data-part="table"
              role="grid"
              aria-label=${this.title || t('tableDataLabel')}
              aria-rowcount=${this._processedRows.length}
            >
              ${this.description ? html`<caption>${this.description}</caption>` : nothing}
              ${this.showHeader ? html`
                <thead data-part="thead">
                  ${this._renderHeaderRow()}
                </thead>
              ` : nothing}
              <tbody data-part="tbody">
                ${pagedRows.length > 0
                  ? html`
                    ${pagedRows.map((row, i) => this._renderRow(row, i))}
                    ${this.showTotalRow ? this._renderTotalRow() : nothing}
                  `
                  : this._renderEmptyRow()
                }
              </tbody>
            </table>
          </div>
        `}
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'auy-comp-table': AuyCompTable
  }
}
