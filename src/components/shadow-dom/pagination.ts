import { LitElement, html, css, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { DataAwareMixin, type DataEnvelope } from '../_internal/data-aware.mixin.ts'
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts'

/** Componente de paginação com navegação por página, elipse e botões anterior/próximo. */
@customElement('auy-comp-pagination')
export class AuyCompPagination extends StyleCustomizableMixin(DataAwareMixin(LitElement)) {
  static override get observedDataEvents(): string[] {
    return ['page-change']
  }
  static override styles = css`
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
        min-inline-size: 2.75rem;
        block-size: 2.75rem;
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

  /** Página atualmente ativa. */
  @property({ type: Number, reflect: true }) current: number = 1
  /** Número total de itens. */
  @property({ type: Number }) total: number = 1
  /** Itens por página. */
  @property({ type: Number }) perPage: number = 10
  /** Número máximo de botões de página visíveis. */
  @property({ type: Number }) maxVisible: number = 5
  /** Desabilita a navegação. */
  @property({ type: Boolean }) disabled: boolean = false

  /** Total de páginas calculado. */
  @state() private _totalPages = 1
  /** Indica se está na primeira página. */
  @state() private _firstPage = true
  /** Indica se está na última página. */
  @state() private _lastPage = true
  /** Lista de páginas (números ou string "..." para elipse). */
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
    // data-input response: pagination roteia para data-target via mixin
    // O proprio componente nao processa data diretamente
  }

  protected override _applyMeta(meta: Record<string, unknown>): void {
    if (meta.total !== undefined) this.total = Number(meta.total)
    if (meta.perPage !== undefined) this.perPage = Number(meta.perPage)
    if (meta.page !== undefined) this.current = Number(meta.page)
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
      ${this._renderCustomStyles()}
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
        ${pages.map(
          (p) =>
            typeof p === 'string'
              ? html`<button part="btn ellipsis" class="ellipsis" disabled aria-hidden="true"><span aria-hidden="true">${p}</span><span class="visually-hidden">Pular páginas</span></button>`
              : html`
                  <button
                    part="btn page"
                    class=${classMap({ active: p === this.current })}
                    ?disabled=${this.disabled}
                    data-page="${p}"
                    @click=${this._handlePageClick}
                    aria-current=${p === this.current ? 'page' : nothing}
                    aria-label="Ir para página ${p}"
                  >
                    ${p}
                  </button>
                `
        )}
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
    `
  }
}
