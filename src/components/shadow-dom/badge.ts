import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-comp-badge')
export class AuyCompBadge extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: inline-flex;
        contain: content;
      }

      [part="badge"] {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.3em;
        padding: 0.25em 0.75em;
        font-size: var(--auy-text-sm);
        font-weight: var(--auy-font-weight-semibold);
        line-height: 1.3;
        border-radius: var(--auy-radius-sm);
        color: var(--auy-color-primary-inverse);
        background: var(--auy-color-primary);
        white-space: nowrap;
        user-select: none;
        border: 1px solid transparent;
        vertical-align: middle;
      }

      :host([size="sm"]) [part="badge"] {
        font-size: var(--auy-text-xs);
        padding: 0.15em 0.5em;
      }

      [data-badge-pill] {
        border-radius: var(--auy-radius-full);
        padding-inline: 0.8em;
      }

      [data-badge-variant="success"] { background: var(--auy-color-success); color: var(--auy-color-primary-inverse); }
      [data-badge-variant="error"] { background: var(--auy-color-error); color: var(--auy-color-primary-inverse); }
      [data-badge-variant="warning"] { background: var(--auy-color-warning); color: var(--auy-color-text); }
      [data-badge-variant="info"] { background: var(--auy-color-info); color: var(--auy-color-primary-inverse); }

      [data-badge-outline] {
        background: transparent;
        border-color: var(--auy-color-primary);
        color: var(--auy-color-primary);
      }
      [data-badge-outline][data-badge-variant="success"] { border-color: var(--auy-color-success); color: var(--auy-color-success); }
      [data-badge-outline][data-badge-variant="error"] { border-color: var(--auy-color-error); color: var(--auy-color-error); }
      [data-badge-outline][data-badge-variant="warning"] { border-color: var(--auy-color-warning); color: var(--auy-color-warning); }
      [data-badge-outline][data-badge-variant="info"] { border-color: var(--auy-color-info); color: var(--auy-color-info); }

      @media (forced-colors: active) {
        [part="badge"] { border: 1px solid ButtonText; }
      }

      @media print {
        [part="badge"] { display: none !important; }
      }
    }
  `;

/** Texto exibido quando não há slot */
  @property({ type: String }) text = '';
  /** Variante: default, info, success, error, warning */
  @property({ type: String }) variant: 'default' | 'info' | 'success' | 'error' | 'warning' = 'default';
  /** Tamanho: sm, md */
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
  /** Modo outline (borda visível, fundo transparente) */
  @property({ type: Boolean, reflect: true }) outline = false;
  /** Formato pill (arredondamento total) */
  @property({ type: Boolean, reflect: true }) pill = false;

  override render() {
    return html`
      <span
        part="badge"
        data-badge
        data-badge-variant=${this.variant !== 'default' ? this.variant : nothing}
        ?data-badge-pill=${this.pill}
        ?data-badge-outline=${this.outline}
      >
        <slot>${this.text}</slot>
      </span>
    `;
  }
}
