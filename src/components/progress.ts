import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-progress')
export class AuyProgress extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .progress {
        position: relative;
        block-size: 0.5rem;
        border-radius: var(--auy-radius-full);
        background: color-mix(in oklch, var(--auy-color-border) 50%, transparent);
        overflow: hidden;
      }

      .bar {
        block-size: 100%;
        border-radius: var(--auy-radius-full);
        background: var(--auy-color-primary);
        transition: inline-size var(--auy-transition-slow) ease;
        min-inline-size: 0;
      }

      :host([variant="success"]) .bar {
        background: var(--auy-color-success);
      }

      :host([variant="warning"]) .bar {
        background: var(--auy-color-warning);
      }

      :host([variant="error"]) .bar {
        background: var(--auy-color-error);
      }

      :host([indeterminate]) .bar {
        inline-size: 30% !important;
        animation: indeterminate 1.5s ease infinite;
      }

      @keyframes indeterminate {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(400%); }
      }

      .label {
        display: flex;
        justify-content: space-between;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        margin-block-end: var(--auy-space-xs);
      }

      @media (forced-colors: active) {
        .progress {
          border: 1px solid ButtonText;
        }
        .bar {
          background: Highlight;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .bar,
        :host([indeterminate]) .bar {
          animation: none;
          transition: none;
        }
      }

      @media print {
        .progress {
          border: 1px solid #000;
          background: none;
        }
        .bar {
          background: #000;
        }
      }
    }
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) max = 100;
  @property({ type: String, reflect: true }) variant: 'default' | 'success' | 'warning' | 'error' = 'default';
  @property({ type: Boolean, reflect: true }) indeterminate = false;
  @property({ type: String }) label = '';
  @property({ type: Boolean }) showPercent = false;

  override render() {
    const pct = this.indeterminate ? 0 : Math.min(100, Math.max(0, (this.value / this.max) * 100));
    return html`
      ${this.label || this.showPercent ? html`
        <div part="label" class="label">
          ${this.label ? html`<span>${this.label}</span>` : nothing}
          ${this.showPercent && !this.indeterminate ? html`<span>${Math.round(pct)}%</span>` : nothing}
        </div>
      ` : nothing}
      <div part="progress" class="progress" role="progressbar" aria-valuenow=${this.indeterminate ? nothing : this.value} aria-valuemin="0" aria-valuemax=${this.max} aria-label=${this.label || 'Progresso'}>
        <div part="bar" class="bar" style=${this.indeterminate ? nothing : `inline-size: ${pct}%`}></div>
      </div>
    `;
  }
}
