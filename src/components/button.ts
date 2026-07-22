import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getIcon, type IconName } from './_internal/icons.ts';
import { t } from './_internal/locale.ts';

@customElement('auy-comp-button')
export class AuyCompButton extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String })
  variant: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'ghost' | 'link' = 'primary';

  @property({ type: String })
  size: 'sm' | 'md' | 'lg' | 'icon' = 'md';

  @property({ type: Boolean, reflect: true })
  loading = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String })
  type: 'button' | 'submit' | 'reset' = 'button';

  @property({ type: String })
  href = '';

  @property({ type: String })
  target = '';

  @property({ type: Boolean, reflect: true })
  fullWidth = false;

  @property({ type: String })
  icon = '';

  @property({ type: String })
  iconPosition: 'left' | 'right' = 'left';

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

  private _handleClick(e: Event) {
    if (this.loading || this.disabled) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  override render() {
    const isLink = !!this.href;
    const isDisabled = this.loading || this.disabled;
    const showIcon = !this.loading && !!this.icon;

    const btnClasses = {
      btn: true,
      [`btn--${this.variant}`]: true,
      [`btn--${this.size}`]: true,
      'btn--loading': this.loading,
    };

    const iconContent = showIcon ? html`
      <span data-part="icon" class="icon">
        <span data-slot="icon">${unsafeHTML(getIcon(this.icon as IconName))}</span>
      </span>
    ` : nothing;

    const spinnerContent = this.loading ? html`
      <span data-part="spinner" class="spinner" aria-hidden="true"></span>
    ` : nothing;

    const content = html`
      ${this.iconPosition === 'left' ? iconContent : nothing}
      ${spinnerContent}
      <span data-slot="default"></span>
      ${this.iconPosition === 'right' ? iconContent : nothing}
    `;

    if (isLink) {
      return html`
        <a
          data-part="link"
          data-element="button"
          class=${classMap(btnClasses)}
          href=${isDisabled ? nothing : this.href}
          target=${ifDefined(this.target || undefined)}
          rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
          role="button"
          aria-disabled=${isDisabled ? 'true' : nothing}
          aria-busy=${this.loading ? 'true' : nothing}
          aria-label=${this.loading ? t('buttonLoading') : nothing}
          @click=${this._handleClick}
        >
          ${content}
        </a>
      `;
    }

    return html`
      <button
        data-part="button"
        data-element="button"
        class=${classMap(btnClasses)}
        type=${this.type}
        ?disabled=${isDisabled}
        aria-busy=${this.loading ? 'true' : nothing}
        aria-label=${this.loading ? t('buttonLoading') : nothing}
        @click=${this._handleClick}
      >
        ${content}
      </button>
    `;
  }
}
