import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-range-input')
export class AuyRangeInput extends LitElement {
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

      .wrapper {
        position: relative;
        display: flex;
        align-items: center;
        gap: var(--auy-space-md);
      }

      input[type="range"] {
        flex: 1;
        padding: 0;
        border: none;
        background: none;
        accent-color: var(--auy-color-primary);
        cursor: pointer;
        touch-action: manipulation;
        block-size: 1.5rem;
        margin: 0;
      }

      input[type="range"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
        border-radius: var(--auy-radius-sm);
      }

      .value {
        font-size: var(--auy-text-sm);
        font-weight: 600;
        color: var(--auy-color-text);
        min-inline-size: 2.5rem;
        text-align: end;
        font-variant-numeric: tabular-nums;
      }

      .min,
      .max {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
      }

      .ticks {
        display: flex;
        justify-content: space-between;
        padding-inline: 0;
        margin-block-start: var(--auy-space-2xs);
      }

      .tick {
        inline-size: 1px;
        block-size: 0.375rem;
        background: var(--auy-color-border);
      }

      @media (forced-colors: active) {
        input[type="range"]:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media print {
        input[type="range"] {
          border: 1px solid #000;
        }
      }
    }
  `;

  @property({ type: Number }) value = 50;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: String }) label = '';
  @property({ type: Boolean }) showTicks = false;
  @property({ type: Boolean }) showMinMax = false;

  private _handleInput(e: Event) {
    const input = e.target as HTMLInputElement;
    this.value = Number(input.value);
    this.dispatchEvent(new CustomEvent('change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    const ticks = this.showTicks
      ? Array.from({ length: Math.min(11, Math.floor((this.max - this.min) / this.step) + 1) }, (_, i) => i)
      : null;

    return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div class="wrapper">
        ${this.showMinMax ? html`<span class="min">${this.min}</span>` : nothing}
        <input
          part="input"
          type="range"
          .value=${String(this.value)}
          min=${this.min}
          max=${this.max}
          step=${this.step}
          @input=${this._handleInput}
          aria-label=${this.label || 'Selecionar valor'}
        />
        ${this.showMinMax ? html`<span class="max">${this.max}</span>` : nothing}
        <span part="value" class="value">${this.value}</span>
      </div>
      ${ticks ? html`<div class="ticks" aria-hidden="true">${ticks.map(() => html`<span class="tick"></span>`)}</div>` : nothing}
    `;
  }
}
