import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { DataAwareMixin } from './_internal/data-aware.mixin.ts'
import { t } from './_internal/locale.ts'

@customElement('auy-comp-pagination')
export class AuyCompPagination extends DataAwareMixin(LitElement) {
  override createRenderRoot() { return this; }
  static override get observedDataEvents(): string[] {
    return ['page-change']
  }

  @property({ type: Number, reflect: true }) current: number = 1
  @property({ type: Number }) total: number = 1
  @property({ type: Number }) perPage: number = 10
  @property({ type: Number }) maxVisible: number = 5
  @property({ type: Boolean }) disabled: boolean = false

  @state() private _totalPages = 1
  @state() private _firstPage = true
  @state() private _lastPage = true
  @state() private _pages: (number | string)[] = []

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('total') || changed.has('perPage') || changed.has('current') || changed.has('maxVisible') || changed.has('disabled')) {
      this._totalPages = Math.ceil(this.total / this.perPage)
      this._firstPage = this.current <= 1 || this.disabled
      this._lastPage = this.current >= this._totalPages || this.disabled
      this._pages = this._generatePages()
    }
  }

  protected override _parseResponse(_data: unknown): void {
  }

  protected override _applyMeta(meta: Record<string, unknown>): void {
    if (meta.total !== undefined) this.total = Number(meta.total)
    if (meta.perPage !== undefined) this.perPage = Number(meta.perPage)
    if (meta.page !== undefined) this.current = Number(meta.page)
  }

  override firstUpdated() {
    this._moveChildren();
  }

  private _moveChildren() {
    const containers = this.querySelectorAll('[data-slot]');
    Array.from(this.children).forEach(child => {
      const slot = child.getAttribute('slot') || 'default';
      let container = this.querySelector(`[data-slot="${slot}"]`);
      if (!container) container = containers[0];
      if (container) container.appendChild(child);
    });
  }

  private _goTo(page: number): void {
    if (this.disabled) return
    if (page < 1 || page > this._totalPages) return
    if (page === this.current) return
    this.current = page
    this.dispatchEvent(
      new CustomEvent('page-change', {
        detail: { page: this.current, perPage: this.perPage },
        bubbles: true,
        composed: true,
      })
    )
    if (this.dataInput) {
      const params = new URLSearchParams()
      params.set('page', String(this.current))
      params.set('perPage', String(this.perPage))
      this._fetchData(params)
    }
  }

  private readonly _handlePageClick = (e: Event) => {
    const page = Number((e.currentTarget as HTMLElement).dataset.page);
    this._goTo(page);
  };

  private _goPrev(): void {
    if (this.current > 1) this._goTo(this.current - 1)
  }

  private _goNext(): void {
    if (this.current < this._totalPages) this._goTo(this.current + 1)
  }

  private _generatePages(): (number | string)[] {
    const total = this._totalPages
    const current = this.current
    const visible = this.maxVisible

    if (total <= visible + 2) {
      return Array.from({ length: total }, (_, i) => i + 1)
    }

    const pages: (number | string)[] = [1]

    let start = Math.max(2, current - Math.floor(visible / 2))
    let end = Math.min(total - 1, start + visible - 1)

    if (end - start < visible - 1) {
      start = Math.max(2, end - visible + 1)
    }

    if (start > 2) pages.push('...')
    for (let i = start; i <= end; i++) pages.push(i)
    if (end < total - 1) pages.push('...')

    pages.push(total)
    return pages
  }

  override render() {
    const pages = this._pages

    return html`
      <nav data-part="nav" data-element="pagination" aria-label=${t('paginationLabel')}>
        <button
          data-part="btn prev"
          rel="prev"
          ?disabled=${this._firstPage}
          @click=${this._goPrev}
          aria-label=${t('paginationPrev')}
        >
          <span data-slot="prev-icon">‹</span>
        </button>
        ${pages.map(
          (p) =>
            typeof p === 'string'
              ? html`<button data-part="btn ellipsis" class="ellipsis" disabled aria-hidden="true"><span aria-hidden="true">${p}</span><span class="visually-hidden">${t('paginationSkip')}</span></button>`
              : html`
                  <button
                    data-part="btn page"
                    class=${classMap({ active: p === this.current })}
                    ?disabled=${this.disabled}
                    data-page="${p}"
                    @click=${this._handlePageClick}
                    aria-current=${p === this.current ? 'page' : nothing}
                    aria-label=${t('paginationGoTo', { page: String(p) })}
                  >
                    ${p}
                  </button>
                `
        )}
        <button
          data-part="btn next"
          rel="next"
          ?disabled=${this._lastPage}
          @click=${this._goNext}
          aria-label=${t('paginationNext')}
        >
          <span data-slot="next-icon">›</span>
        </button>
      </nav>
    `
  }
}
