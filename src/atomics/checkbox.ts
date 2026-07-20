import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * Styled checkbox, radio, or switch toggle.
 *
 * @slot - Label text placed after the control
 */
@customElement('auy-internal-checkbox')
export class AuyInternalCheckbox extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: inline-block;
        contain: layout style;
      }

      label {
        display: inline-flex;
        align-items: center;
        gap: var(--auy-space-sm, 0.5rem);
        cursor: pointer;
        font-size: var(--auy-text-sm, 0.875rem);
        line-height: 1.5;
        color: var(--auy-color-text, oklch(20% 0.03 260));
        touch-action: manipulation;
        user-select: none;
      }

      :host([disabled]) label {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      input {
        position: absolute;
        opacity: 0;
        inline-size: 0;
        block-size: 0;
        pointer-events: none;
      }

      .control {
        flex-shrink: 0;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        transition: background var(--auy-transition, 200ms ease),
          border-color var(--auy-transition, 200ms ease),
          box-shadow var(--auy-transition, 200ms ease);
      }

      input:focus-visible + .control {
        outline: 0.125rem solid var(--auy-color-primary, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      /* Checkbox */
      :host([type='checkbox']) .control {
        inline-size: 1.25em;
        block-size: 1.25em;
        border: 0.125rem solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: var(--auy-radius-sm, 4px);
        background: var(--auy-color-surface, oklch(100% 0 0));
      }

      :host([type='checkbox']) input:checked + .control {
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        border-color: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      :host([type='checkbox']) .check-icon {
        opacity: 0;
        transition: opacity var(--auy-transition, 200ms) ease;
      }

      :host([type='checkbox']) input:checked + .control .check-icon {
        opacity: 1;
      }

      /* Radio */
      :host([type='radio']) .control {
        inline-size: 1.25em;
        block-size: 1.25em;
        border: 0.125rem solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        border-radius: 50%;
        background: var(--auy-color-surface, oklch(100% 0 0));
      }

      :host([type='radio']) input:checked + .control {
        border-color: var(--auy-color-primary, oklch(50% 0.2 250));
        border-width: 0.4em;
      }

      /* Switch */
      :host([type='switch']) .control {
        inline-size: 2.25em;
        block-size: 1.25em;
        border-radius: 1.25em;
        background: var(--auy-color-border, oklch(0% 0 0 / 0.25));
        position: relative;
      }

      :host([type='switch']) .thumb {
        position: absolute;
        inset-block-start: 0.125em;
        inset-inline-start: 0.125em;
        inline-size: calc(1.25em - 0.25em);
        block-size: calc(1.25em - 0.25em);
        border-radius: 50%;
        background: var(--auy-color-surface, oklch(100% 0 0));
        box-shadow: 0 0.0625em 0.1875em oklch(0% 0 0 / 0.2);
        transition: margin var(--auy-transition, 200ms) ease;
      }

      :host([type='switch']) input:checked + .control {
        background: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      :host([type='switch']) input:checked + .control .thumb {
        margin-inline-start: calc(2.25em - 1.25em);
      }

      @media (forced-colors: active) {
        .control {
          border-color: ButtonText;
        }
        input:checked + .control {
          background: Highlight;
          border-color: Highlight;
        }
        :host([type='switch']) input:checked + .control .thumb {
          margin-inline-start: calc(2.25em - 1.25em);
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .control,
        .check-icon,
        .thumb {
          transition: none;
        }
      }
    }
  `;

  @property({ type: String }) type: 'checkbox' | 'radio' | 'switch' = 'checkbox';
  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: Boolean, reflect: true }) checked = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean }) required = false;

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  override render() {
    return html`
      <label>
        <input
          type=${this.type === 'switch' ? 'checkbox' : this.type}
          .checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name}
          .value=${this.value}
          @change=${this._handleChange}
        >
        <span class="control" aria-hidden="true">
          ${this.type === 'checkbox'
            ? html`<svg class="check-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="oklch(100% 0 0)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 6 5 9 10 3"/></svg>`
            : this.type === 'switch'
              ? html`<span class="thumb"></span>`
              : nothing}
        </span>
        <slot></slot>
      </label>
    `;
  }
}
