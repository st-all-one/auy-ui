import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-section')
export class AuySection extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      section {
        padding-block: var(--auy-section-padding, var(--auy-space-xl));
      }

      :host([compact]) section {
        padding-block: var(--auy-space-md);
      }

      .header {
        margin-block-end: var(--auy-space-lg);
      }

      h2 {
        font-size: var(--auy-text-xl);
        font-weight: 600;
        color: var(--auy-color-text);
        margin: 0;
      }

      .description {
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        margin-block-start: var(--auy-space-xs);
      }

      .content {
        display: grid;
        gap: var(--auy-space-md);
      }
    }
  `;

  @property({ type: String }) heading = '';
  @property({ type: String }) description = '';
  @property({ type: Boolean, reflect: true }) compact = false;

  override render() {
    return html`
      <section part="section">
        ${this.heading || this.description ? html`
          <div part="header" class="header">
            ${this.heading ? html`<h2 part="heading">${this.heading}</h2>` : nothing}
            ${this.description ? html`<p part="description" class="description">${this.description}</p>` : nothing}
          </div>
        ` : nothing}
        <div part="content" class="content">
          <slot></slot>
        </div>
      </section>
    `;
  }
}
