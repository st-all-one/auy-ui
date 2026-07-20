import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-button-group')
export class AuyButtonGroup extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: inline-flex;
      }

      [part="group"] {
        display: inline-flex;
        flex: 1;
      }

      ::slotted(*) {
        flex: 1 1 auto;
        position: relative;
        min-inline-size: 0;
      }

      ::slotted(:not(:first-child)) {
        margin-inline-start: -1px;
        --_radius-start: 0px;
      }

      ::slotted(:not(:last-child)) {
        --_radius-end: 0px;
      }

      ::slotted(:focus-visible) {
        z-index: 1;
      }

      @media (forced-colors: active) {
        ::slotted(*) {
          border: 1px solid ButtonText;
        }
        ::slotted(:focus-visible) {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }
    }
  `;

  @property({ type: String }) ariaLabel = '';

  override render() {
    return html`
      <div part="group" role="group" aria-label=${this.ariaLabel || 'Grupo de botões'}>
        <slot></slot>
      </div>
    `;
  }
}
