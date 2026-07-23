import { html, css, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { AuyShadowElement } from '../_internal/AuyShadowElement.base.ts'

import { DataAwareMixin } from '../_internal/data-aware.mixin.ts'
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts'

/** Interface para definição de coluna */
export interface Column {
  /** Chave do campo nos dados */
  key: string
  /** Rótulo exibido no cabeçalho */
  label: string
  /** Se a coluna pode ser ordenada */
  sortable?: boolean
  /** Largura CSS da coluna */
  width?: string
  /** Alinhamento do texto */
  align?: 'left' | 'center' | 'right'
  /** Formato de exibição dos dados */
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
export class AuyCompTable extends StyleCustomizableMixin(DataAwareMixin(AuyShadowElement)) {

  static override get observedDataEvents(): string[] {
    return ['sort-change', 'row-select']
  }

  static override styles = css`
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
      max-block-size: 4.5rem;
      opacity: 1;
      margin-block-end: var(--auy-space-sm);
    }

    [part~='filter-wrap'] {
      position: relative;
      display: flex;
      align-items: center;
      background: color-mix(in oklch, var(--auy-color-border) 6%, transparent);
      border: 1px solid var(--auy-color-border);
      border-radius: var(--auy-radius-md);
      transition: border-color var(--auy-transition-fast), box-shadow var(--auy-transition-fast);
    }
    [part~='filter-wrap']:focus-within {
      border-color: var(--auy-color-primary);
      box-shadow: 0 0 0 0.125rem var(--auy-color-primary-focus);
      background: color-mix(in oklch, var(--auy-color-primary) 3%, var(--auy-color-surface));
    }
    [part~='filter-wrap']::before {
      content: '';
      flex-shrink: 0;
      inline-size: 1rem;
      block-size: 1rem;
      margin-inline: 0.75rem;
      background: var(--auy-color-text-muted);
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E") center/contain no-repeat;
      -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='M21 21l-4.35-4.35'/%3E%3C/svg%3E") center/contain no-repeat;
      opacity: 0.5;
    }
    [part~='filter-wrap']:focus-within::before {
      opacity: 0.8;
      background: var(--auy-color-primary);
    }

    [part~='filter-input'] {
      box-sizing: border-box;
      inline-size: 100%;
      padding: 0.5rem 0.75rem 0.5rem 0;
      font-family: inherit;
      font-size: var(--auy-text-sm);
      line-height: 1.5;
      color: var(--auy-color-text);
      background: none;
      border: none;
      outline: none;
      -webkit-appearance: none;
      appearance: none;
      touch-action: manipulation;
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
      block-size: 1.25rem;
      inline-size: 1.25rem;
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
  `

  /** Array de colunas */
  @property({ type: Array }) columns: Column[] = []
  /** Array de linhas */
  @property({ type: Array }) rows: Record<string, unknown>[] = []
  /** Quantidade de linhas por página */
  @property({ type: Number }) pageSize = 20
  /** Página atual */
  @property({ type: Number, reflect: true }) currentPage = 1
  /** Habilita ordenação por coluna */
  @property({ type: Boolean }) sortable = true
  /** Habilita filtro por texto */
  @property({ type: Boolean }) filterable = false
  /** Habilita seleção de linhas */
  @property({ type: Boolean }) selectable = false
  /** Fixa o cabeçalho no topo */
  @property({ type: Boolean }) stickyHeader = true
  /** Mensagem quando não há registros */
  @property({ type: String }) emptyMessage = 'Nenhum registro encontrado'
  /** Estado de carregamento */
  @property({ type: Boolean }) loading = false
  /** Título da tabela */
  @property({ type: String }) title = ''
  /** Exibe linha de total */
  @property({ type: Boolean }) showTotalRow = false
  /** Exibe cabeçalho */
  @property({ type: Boolean }) showHeader = true
  /** Descrição acessível (caption) */
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

  private _nfNumber = new Intl.NumberFormat('pt-BR')
  private _nfCurrency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
  private _dfDate = new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' })

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
      // Server-side total: usado quando data-input esta ativo
      // Recalcula _totalPages baseado no total do servidor
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

  override updated(changed: Map<string, unknown>) {
    if (changed.has('_filterOpen') && this._filterOpen) {
      this.updateComplete.then(() => {
        this.shadowRoot?.querySelector<HTMLInputElement>('[part~="filter-input"]')?.focus()
      })
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
            cmp = String(va ?? '').localeCompare(String(vb ?? ''), 'pt-BR')
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
      const el = this.shadowRoot?.querySelector(`[data-row-index="${this._focusedIndex}"]`) as HTMLElement | null
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
    if (this._sortColumn !== col.key || !this._sortDirection) return 'Clique para ordenar ascendente'
    return this._sortDirection === 'asc'
      ? 'Ordenado ascendente. Clique para ordenar descendente'
      : 'Ordenado descendente. Clique para limpar ordenação'
  }

  private _renderHeaderRow() {
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
        ${this.columns.map(col => {
          const sortable = this.sortable && col.sortable
          const ariaSort = this._getSortAria(col)
          return html`
            <th
              part="th ${sortable ? 'th-sortable' : ''}"
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
              ${sortable ? html`<span part="visually-hidden">${this._getSortDescription(col)}</span>` : nothing}
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
        part="row"
        role="row"
        data-row-index="${globalIndex}"
        aria-selected=${this.selectable ? (isSelected ? 'true' : 'false') : 'false'}
        tabindex=${isFocused ? '0' : '-1'}
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
              @change=${(e: Event) => {
                e.stopPropagation()
                this._handleRowSelect(globalIndex)
              }}
            >
          </td>
        ` : nothing}
        ${this.columns.map(col => html`
          <td
            part="td"
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
      <tr part="total-row" role="row">
        ${this.selectable ? html`<td part="td"></td>` : nothing}
        ${this.columns.map(col => {
          if (col.format === 'number' || col.format === 'currency') {
            const total = this._pagedRows.reduce((sum, row) => sum + (Number(row[col.key]) || 0), 0)
            return html`
              <td part="td" role="gridcell" style=${ifDefined(col.align ? `text-align:${col.align}` : undefined)}>
                ${col.format === 'currency'
                  ? this._nfCurrency.format(total)
                  : this._nfNumber.format(total)
                }
              </td>
            `
          }
          if (col.key === this.columns[0]?.key) {
            return html`<td part="td" role="gridcell">Total</td>`
          }
          return html`<td part="td" role="gridcell"></td>`
        })}
      </tr>
    `
  }

  private _renderEmptyRow() {
    const colCount = this.columns.length + (this.selectable ? 1 : 0)
    return html`
      <tr part="empty-row" role="row">
        <td part="td" role="gridcell" colspan=${colCount}>
          <span part="empty-icon" aria-hidden="true">—</span>
          ${this.emptyMessage}
        </td>
      </tr>
    `
  }

  override render() {
    const pagedRows = this._pagedRows

    const filterIconOpen = this._filterOpen ? 'open' : '';
    return html`
      ${this._renderCustomStyles()}
      <div part="wrapper">
        ${this.title ? html`
          <div
            part="title ${this.filterable ? 'title-filterable' : ''}"
            tabindex=${this.filterable ? '0' : nothing}
            role=${this.filterable ? 'button' : nothing}
            aria-expanded=${this.filterable ? (this._filterOpen ? 'true' : 'false') : nothing}
            aria-label=${this.filterable ? 'Filtrar tabela' : nothing}
            @click=${this.filterable ? (() => this._filterOpen = !this._filterOpen) : undefined}
            @keydown=${this.filterable ? ((e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this._filterOpen = !this._filterOpen; } }) : undefined}
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
          <div part="toolbar" visible=${this._filterOpen ? 'true' : 'false'} .hidden=${!this._filterOpen}>
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
              aria-label=${this.title || 'Tabela de dados'}
              aria-rowcount=${this._processedRows.length}
            >
              ${this.description ? html`<caption>${this.description}</caption>` : nothing}
              ${this.showHeader ? html`
                <thead part="thead">
                  ${this._renderHeaderRow()}
                </thead>
              ` : nothing}
              <tbody part="tbody">
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