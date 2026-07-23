import { html, css, nothing } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { DataAwareMixin } from '../_internal/data-aware.mixin.ts';
import { AuyLightElement } from '../_internal/AuyLightElement.base.ts';

let selectIdCounter = 0;

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const styles = css`
  [data-auy-part="trigger"] {
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
    min-block-size: 2.75rem;
  }

  [data-auy-part="trigger"]:hover {
    border-color: var(--auy-color-primary-hover);
  }

  [data-auy-part="trigger"]:focus-visible {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: 0.125rem;
  }

  [data-auy-part="trigger"][aria-expanded="true"] {
    border-color: var(--auy-color-primary);
  }

  [data-auy-part="trigger"][data-auy-state="placeholder"] {
    color: var(--auy-color-text-muted);
  }

  [data-auy-part="arrow"] {
    flex-shrink: 0;
    font-size: var(--auy-text-xs);
    transition: transform var(--auy-transition);
    color: var(--auy-color-text-muted);
  }

  [data-auy-part="arrow"][data-auy-state="open"] {
    transform: rotate(180deg);
  }

  [data-auy-part="dropdown"] {
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

  [data-auy-part="dropdown"][data-auy-state="open"] {
    display: block;
  }

  [data-auy-part="search-input"] {
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

  [data-auy-part="search-input"]:focus-visible {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: -0.125rem;
  }

  [data-auy-part="option-list"] {
    list-style: none;
    margin: 0;
    padding: var(--auy-space-2xs);
  }

  [data-auy-part="option"] {
    padding: var(--auy-space-sm) var(--auy-space-md);
    border-radius: var(--auy-radius-sm);
    cursor: pointer;
    font-size: var(--auy-text-sm);
    color: var(--auy-color-text);
    touch-action: manipulation;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  [data-auy-part="option"]:hover {
    background: color-mix(in oklch, var(--auy-color-primary) 8%, transparent);
  }

  [data-auy-part="option"][aria-selected="true"] {
    background: color-mix(in oklch, var(--auy-color-primary) 15%, transparent);
    font-weight: var(--auy-font-weight-medium);
  }

  [data-auy-part="option"][data-auy-state="focused"] {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: -0.125rem;
  }

  [data-auy-part="option"][aria-disabled="true"] {
    opacity: 0.4;
    cursor: not-allowed;
  }

  [data-auy-part="no-results"] {
    padding: var(--auy-space-md);
    text-align: center;
    font-size: var(--auy-text-sm);
    color: var(--auy-color-text-muted);
  }

  [data-auy-part="wrap"] {
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
    [data-auy-part="trigger"], [data-auy-part="dropdown"] { border: 1px solid ButtonText; }
    [data-auy-part="option"]:hover, [data-auy-part="option"][aria-selected="true"] { outline: 2px solid Highlight; }
  }

  @media (prefers-reduced-motion: reduce) {
    [data-auy-part="trigger"], [data-auy-part="arrow"] { transition: none; }
  }

  @media print {
    [data-auy-part="dropdown"] { display: none !important; }
    [data-auy-part="trigger"] { border: 1px solid CanvasText; }
  }
`;

/** Componente de seleção (combobox) com suporte a busca e teclado. */
@customElement('auy-comp-select')
export class AuyCompSelect extends DataAwareMixin(AuyLightElement) {
  static override get observedDataEvents(): string[] {
    return ['change']
  }

  // Styles rendered inline via template for Light DOM support

  /** Lista de opções disponíveis. */
  @property({ type: Array }) options: SelectOption[] = [];
  /** Valor selecionado (value da opção). */
  @property({ type: String }) value = '';
  /** Rótulo exibido acima do campo. */
  @property({ type: String }) label = '';
  /** Texto exibido quando nenhuma opção está selecionada. */
  @property({ type: String }) placeholder = 'Selecione...';
  /** Habilita o campo de busca dentro do dropdown. */
  @property({ type: Boolean }) searchable = true;
  /** Desabilita o select. */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Torna o campo obrigatório. */
  @property({ type: Boolean, reflect: true }) required = false;
  /** Atributo name do input oculto. */
  @property({ type: String }) name = '';
  /** Permite seleção múltipla (reservado para uso futuro). */
  @property({ type: Boolean }) multiple = false;

  @state() private _open = false;
  @state() private _query = '';
  @state() private _focusedIndex = 0;

  @query('[data-auy-part="trigger"]') private _trigger!: HTMLElement;
  @query('[data-auy-part="search-input"]') private _searchInput!: HTMLInputElement;

  protected override _parseResponse(data: unknown): void {
    if (Array.isArray(data)) {
      this.options = data as SelectOption[];
    }
  }

  private _selectId = `auy-select-${++selectIdCounter}`;
  private _listboxId = `auy-select-listbox-${selectIdCounter}`;

  get _selectedOption(): SelectOption | undefined {
    return this.options.find(o => o.value === this.value);
  }

  get _filteredOptions(): SelectOption[] {
    if (!this._query) return this.options;
    const q = this._query.toLowerCase();
    return this.options.filter(o => o.label.toLowerCase().includes(q));
  }

  private _toggle() {
    if (this.disabled) return;
    this._open = !this._open;
    if (this._open) {
      this._focusedIndex = this._filteredOptions.findIndex(o => o.value === this.value);
      if (this._focusedIndex < 0) this._focusedIndex = 0;
      requestAnimationFrame(() => {
        if (this.searchable) {
          this._searchInput?.focus();
        }
        this._focusOption(this._focusedIndex);
      });
    }
  }

  private _close() {
    this._open = false;
    this._query = '';
    this._trigger?.focus();
  }

  private _select(option: SelectOption) {
    if (option.disabled) return;
    this.value = option.value;
    this._close();
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: option.value, label: option.label },
      bubbles: true,
      composed: true,
    }));
  }

  private _onSearch(e: InputEvent) {
    this._query = (e.target as HTMLInputElement).value;
    this._focusedIndex = 0;
  }

  private _onKeydown(e: KeyboardEvent) {
    if (!this._open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        this._toggle();
      }
      return;
    }

    const filtered = this._filteredOptions;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        this._focusedIndex = Math.min(this._focusedIndex + 1, filtered.length - 1);
        this._focusOption(this._focusedIndex);
        break;
      case 'ArrowUp':
        e.preventDefault();
        this._focusedIndex = Math.max(this._focusedIndex - 1, 0);
        this._focusOption(this._focusedIndex);
        break;
      case 'Enter':
        e.preventDefault();
        if (filtered[this._focusedIndex]) {
          this._select(filtered[this._focusedIndex]);
        }
        break;
      case 'Escape':
        e.preventDefault();
        this._close();
        break;
      case 'Tab':
        this._close();
        break;
    }
  }

  private _focusOption(index: number) {
    const el = this.querySelector<HTMLElement>(`[data-index="${index}"]`);
    el?.focus();
  }

  private _onBlur(e: FocusEvent) {
    if (this.disabled) return;
    const related = e.relatedTarget as HTMLElement;
    if (related && this.contains(related)) return;
    this._close();
  }

  private _clickOutside(e: MouseEvent) {
    if (this._open && !this.contains(e.target as HTMLElement)) {
      this._close();
    }
  }

  /** Registra o listener para fechar o dropdown ao clicar fora. */
  override connectedCallback() {
    super.connectedCallback();
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', this._clickOutside);
    }
  }

  /** Remove o listener de clique externo. */
  override disconnectedCallback() {
    super.disconnectedCallback();
    if (typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this._clickOutside);
    }
  }

  override render() {
    const selected = this._selectedOption;
    const filtered = this._filteredOptions;

    return html`
      <style>${styles}</style>
      <input type="hidden" name=${this.name || nothing} .value=${this.value} aria-hidden="true" />
      ${this.label ? html`<label for=${this._selectId}>${this.label}</label>` : nothing}
      <div data-auy-part="wrap">
        <div
          id=${this._selectId}
          data-auy-part="trigger" data-auy-state=${!selected ? 'placeholder' : nothing}
          role="combobox"
          aria-expanded=${this._open ? 'true' : 'false'}
          aria-controls=${this._listboxId}
          aria-haspopup="listbox"
          aria-label=${this.label || nothing}
          tabindex=${this.disabled ? '-1' : '0'}
          ?disabled=${this.disabled}
          @click=${this._toggle}
          @keydown=${this._onKeydown}
          @blur=${this._onBlur}
        >
          <span>${selected ? selected.label : this.placeholder}</span>
          <span data-auy-part="arrow" data-auy-state=${this._open ? 'open' : nothing}>▼</span>
        </div>
        <div data-auy-part="dropdown" data-auy-state=${this._open ? 'open' : nothing}>
          ${this.searchable ? html`
            <input
              data-auy-part="search-input"
              type="text"
              .value=${this._query}
              @input=${this._onSearch}
              placeholder="Buscar..."
              aria-label="Buscar opção"
            />
          ` : nothing}
          ${filtered.length > 0 ? html`
            <ul data-auy-part="option-list" id=${this._listboxId} role="listbox">
              ${filtered.map((opt, i) => html`
                <li
                  data-auy-part="option" data-auy-state=${i === this._focusedIndex ? 'focused' : nothing}
                  role="option"
                  data-index="${i}"
                  aria-selected=${opt.value === this.value ? 'true' : 'false'}
                  aria-disabled=${opt.disabled ? 'true' : nothing}
                  tabindex=${i === this._focusedIndex ? '0' : '-1'}
                  @click=${() => this._select(opt)}
                  @keydown=${(e: KeyboardEvent) => { if (e.key === 'Enter') this._select(opt); }}
                >${opt.label}</li>
              `)}
            </ul>
          ` : html`
            <div data-auy-part="no-results">Nenhum resultado encontrado</div>
          `}
        </div>
      </div>
    `;
  }
}
