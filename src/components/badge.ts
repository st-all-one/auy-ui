import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-comp-badge')
export class AuyCompBadge extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String }) text = '';
  @property({ type: String }) variant: 'default' | 'info' | 'success' | 'error' | 'warning' = 'default';
  @property({ type: String, reflect: true }) size: 'sm' | 'md' = 'md';
  @property({ type: Boolean, reflect: true }) outline = false;
  @property({ type: Boolean, reflect: true }) pill = false;

  override firstUpdated() {
    this._moveChildren();
  }

  private _moveChildren() {
    const containers = this.querySelectorAll('[data-slot]');
    Array.from(this.children).forEach(child => {
      const slot = child.getAttribute('slot') || 'default';
      let container = this.querySelector(`[data-slot="${slot}"]`);
      if (!container) container = containers[0];
      if (container) container.appendChild(child);
    });
  }

  override render() {
    return html`
      <span
        data-part="badge"
        data-element="badge"
        data-badge
        data-badge-variant=${this.variant !== 'default' ? this.variant : nothing}
        ?data-badge-pill=${this.pill}
        ?data-badge-outline=${this.outline}
      >
        <span data-slot="default">${this.text}</span>
      </span>
    `;
  }
}
