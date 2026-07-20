import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-date-input')
export class AuyDateInput extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      label {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
        margin-block-end: var(--auy-space-xs);
      }

      input {
        box-sizing: border-box;
        display: block;
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
        outline: none;
        touch-action: manipulation;
        accent-color: var(--auy-color-primary);
      }

      input:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      input:user-valid {
        border-color: var(--auy-color-success);
      }

      input:user-invalid {
        border-color: var(--auy-color-error);
      }

      @media (forced-colors: active) {
        input {
          border: 1px solid ButtonText;
        }
        input:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        input {
          transition: none;
        }
      }

      @media print {
        input {
          border-color: #000;
        }
      }
    }
  `;

  @property({ type: String }) label = '';
  @property({ type: String }) type: 'date' | 'datetime-local' | 'month' | 'time' | 'week' = 'date';
  @property({ type: String }) value = '';
  @property({ type: String }) min = '';
  @property({ type: String }) max = '';
  @property({ type: Boolean }) required = false;

  private _handleInput(e: Event) {
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
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <input
        part="input"
        type=${this.type}
        .value=${this.value}
        min=${this.min || nothing}
        max=${this.max || nothing}
        ?required=${this.required}
        @input=${this._handleInput}
        aria-label=${this.label || `Selecionar ${this.type}`}
      />
    `;
  }
}
