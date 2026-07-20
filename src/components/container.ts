import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-container')
export class AuyContainer extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .container {
        max-inline-size: var(--auy-container-max, 75rem);
        margin-inline: auto;
        padding-inline: var(--auy-container-padding, var(--auy-space-lg));
        box-sizing: content-box;
      }

      :host([fluid]) .container {
        max-inline-size: none;
      }
    }
  `;

  @property({ type: Boolean, reflect: true }) fluid = false;

  override render() {
    return html`
      <div part="container" class="container">
        <slot></slot>
      </div>
    `;
  }
}
