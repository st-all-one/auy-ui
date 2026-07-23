import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { DataAwareMixin } from '../_internal/data-aware.mixin.ts';
import { AuyLightElement } from '../_internal/AuyLightElement.base.ts';

let dateInputIdCounter = 0;

const diStyles = css`
  label {
    display: block;
    font-size: var(--auy-text-sm);
    font-weight: var(--auy-font-weight-medium);
    color: var(--auy-color-text);
    margin-block-end: var(--auy-space-xs);
  }

  [data-auy-part="required-star"] {
    color: var(--auy-color-error);
  }

  input[type="date"] {
    box-sizing: border-box;
    inline-size: 100%;
    padding: var(--auy-space-sm) var(--auy-space-md);
    font-family: inherit;
    font-size: var(--auy-text-sm);
    line-height: 1.5;
    color: var(--auy-color-text);
    background: var(--auy-color-surface);
    border: 1px solid var(--auy-color-border);
    border-radius: var(--auy-radius-md);
    transition: border-color var(--auy-transition), box-shadow var(--auy-transition);
    touch-action: manipulation;
  }

  input[type="date"]:hover {
    border-color: var(--auy-color-primary-hover);
  }

  input[type="date"]:focus-visible {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: 0.125rem;
  }

  input[type="date"]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  input[type="date"]:user-invalid {
    border-color: var(--auy-color-error);
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
    padding: 0;
    margin: 0;
    inline-size: 1.25rem;
    block-size: 1.25rem;
    opacity: 0.5;
    cursor: pointer;
    transition: opacity var(--auy-transition-fast);
  }
  input[type="date"]::-webkit-calendar-picker-indicator:hover {
    opacity: 1;
  }

  input[type="date"]::-webkit-datetime-edit {
    display: flex;
    gap: 0.125rem;
  }

  input[type="date"]::-webkit-datetime-edit-text {
    color: var(--auy-color-text-muted);
    opacity: 0.5;
  }

  input[type="date"]::-webkit-inner-spin-button {
    display: none;
  }

  @media (forced-colors: active) {
    input[type="date"] { border: 1px solid ButtonText; }
    input[type="date"]:focus-visible { outline: 0.125rem solid Highlight; outline-offset: 0.125rem; }
  }
  @media (prefers-reduced-motion: reduce) { input[type="date"] { transition: none; } }
  @media print { input[type="date"] { border: 1px solid CanvasText; } }
`;

/** Componente de input de data nativo com label e estilos customizados. */
@customElement('auy-comp-date-input')
export class AuyCompDateInput extends DataAwareMixin(AuyLightElement) {
  static override get observedDataEvents(): string[] {
    return ['change']
  }

  // Styles via inline <style> for Light DOM support

  /** Valor atual do input de data. */
  @property({ type: String }) value = '';
  /** Rótulo exibido acima do campo. */
  @property({ type: String }) label = '';
  /** Data mínima aceitável (AAAA-MM-DD). */
  @property({ type: String }) min = '';
  /** Data máxima aceitável (AAAA-MM-DD). */
  @property({ type: String }) max = '';
  /** Desabilita o input. */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Torna o campo obrigatório. */
  @property({ type: Boolean, reflect: true }) required = false;
  /** Atributo name do input nativo. */
  @property({ type: String }) name = '';

  protected override _parseResponse(data: unknown): void {
    const d = data as Record<string, string>
    if (d.value !== undefined) this.value = d.value
    if (d.min) this.min = d.min
    if (d.max) this.max = d.max
  }

  private _inputId = `auy-date-input-${++dateInputIdCounter}`;

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <style>${diStyles}</style>
      ${this.label ? html`<label for=${this._inputId}>${this.label}${this.required ? html`<span data-auy-part="required-star" aria-hidden="true"> *</span>` : nothing}</label>` : nothing}
      <input
        type="date"
        id=${this._inputId}
        .value=${this.value}
        ?disabled=${this.disabled}
        ?required=${this.required}
        name=${this.name || nothing}
        min=${this.min || nothing}
        max=${this.max || nothing}
        aria-label=${this.label || nothing}
        aria-required=${this.required ? 'true' : nothing}
        @change=${this._handleChange}
      />
    `;
  }
}
