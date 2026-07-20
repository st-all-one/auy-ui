import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @slot - Default slot for button content
 */
@customElement('auy-internal-button')
export class AuyInternalButton extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: inline-block;
      }

      button {
        all: unset;
        box-sizing: border-box;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-xs, 6px);
        font-family: inherit;
        font-size: var(--auy-text-sm, 0.875rem);
        font-weight: 500;
        line-height: 1.5;
        border-start-start-radius: var(--_radius-start, var(--auy-radius-md, 6px));
        border-start-end-radius: var(--_radius-end, var(--auy-radius-md, 6px));
        border-end-start-radius: var(--_radius-start, var(--auy-radius-md, 6px));
        border-end-end-radius: var(--_radius-end, var(--auy-radius-md, 6px));
        padding: 0.625rem 1rem;
        cursor: pointer;
        transition: background-color var(--auy-transition, 200ms ease),
          border-color var(--auy-transition, 200ms ease),
          color var(--auy-transition, 200ms ease),
          box-shadow var(--auy-transition, 200ms ease);
        user-select: none;
        -webkit-user-select: none;
        -ms-touch-action: manipulation;
        touch-action: manipulation;

        &:where([size='sm']) {
          padding: 0.375rem 0.75rem;
          font-size: var(--auy-text-xs, 0.75rem);
          border-start-start-radius: var(--_radius-start, var(--auy-radius-sm, 4px));
          border-start-end-radius: var(--_radius-end, var(--auy-radius-sm, 4px));
          border-end-start-radius: var(--_radius-start, var(--auy-radius-sm, 4px));
          border-end-end-radius: var(--_radius-end, var(--auy-radius-sm, 4px));
        }

        &:where([size='lg']) {
          padding: 0.75rem 1.5rem;
          font-size: var(--auy-text-base, 1rem);
          border-start-start-radius: var(--_radius-start, var(--auy-radius-lg, 8px));
          border-start-end-radius: var(--_radius-end, var(--auy-radius-lg, 8px));
          border-end-start-radius: var(--_radius-start, var(--auy-radius-lg, 8px));
          border-end-end-radius: var(--_radius-end, var(--auy-radius-lg, 8px));
        }

        &:where([variant='primary']) {
          background-color: var(--auy-color-primary, oklch(50% 0.2 250));
          color: var(--auy-color-primary-inverse, oklch(100% 0 0));

          &:hover {
            background-color: var(--auy-color-primary-hover, oklch(45% 0.2 250));
          }

          &:active {
            background-color: var(--auy-color-primary-active, oklch(42% 0.22 250));
          }
        }

        &:where([variant='secondary']) {
          background-color: transparent;
          color: var(--auy-color-text, oklch(20% 0.03 260));
          border: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));

          &:hover {
            background-color: oklch(0% 0 0 / 0.06);
          }

          &:active {
            background-color: oklch(0% 0 0 / 0.1);
          }
        }

        &:where([variant='ghost']) {
          background-color: transparent;
          color: var(--auy-color-text, oklch(20% 0.03 260));

          &:hover {
            background-color: oklch(0% 0 0 / 0.06);
          }

          &:active {
            background-color: oklch(0% 0 0 / 0.1);
          }
        }

        &:where([variant='danger']) {
          background-color: var(--auy-color-error, oklch(55% 0.22 30));
          color: oklch(100% 0 0);

          &:hover {
            background-color: oklch(50% 0.22 30);
          }

          &:active {
            background-color: oklch(45% 0.22 30);
          }
        }

        &:where([variant='contrast']) {
          background-color: oklch(20% 0.03 260);
          color: oklch(100% 0 0);

          &:hover {
            background-color: oklch(0% 0 0);
          }

          &:active {
            background-color: oklch(15% 0.03 260);
          }
        }

        &:focus-visible {
          outline: none;
          box-shadow: 0 0 0 0.125rem var(--auy-color-primary-focus, oklch(55% 0.25 250 / 0.35));
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          pointer-events: none;
        }

        @media (forced-colors: active) {
          border: 1px solid ButtonText;

          &:focus-visible {
            outline: 2px solid Highlight;
            outline-offset: 2px;
            box-shadow: none;
          }

          &:disabled {
            border-color: GrayText;
            color: GrayText;
          }

          .spinner {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          transition: none;

          &:active {
            transform: none;
          }
        }
      }

      .spinner {
        display: inline-flex;
      }
    }
  `;

  @property({ type: String }) variant: 'primary' | 'secondary' | 'ghost' | 'danger' | 'contrast' = 'primary';
  @property({ type: String }) size: 'sm' | 'md' | 'lg' = 'md';
  @property({ type: Boolean, reflect: true }) loading = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: String }) type: 'button' | 'submit' = 'button';

  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null;
  @property({ type: String, attribute: 'aria-expanded' }) override ariaExpanded: string | null = null;

  override render() {
    return html`
      <button
        part="button"
        type=${this.type}
        variant=${this.variant}
        size=${this.size}
        aria-label=${this.ariaLabel || nothing}
        aria-expanded=${this.ariaExpanded || nothing}
        ?disabled=${this.disabled || this.loading}
        ?aria-disabled=${this.loading || nothing}
      >
        ${this.loading ? html`<span class="spinner"><auy-internal-spinner size="14"></auy-internal-spinner></span>` : ''}
        <slot></slot>
      </button>
    `;
  }
}
