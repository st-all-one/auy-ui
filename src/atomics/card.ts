import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

/**
 * @slot media - Media content area
 * @slot title - Card title
 * @slot description - Card description
 * @slot - Default slot for main content
 * @slot footer - Card footer actions
 */
@customElement('auy-internal-card')
export class AuyInternalCard extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .card {
        display: grid;
        grid-template-rows: auto 1fr;
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        overflow: hidden;
      }

      .variant-elevated {
        box-shadow: var(--auy-shadow-sm);
      }

      .variant-outlined {
        border: 1px solid var(--auy-border-color, currentColor);
      }

      slot[name="media"] {
        grid-row: 1;
      }

      slot[name="media"]::slotted(*) {
        display: block;
        inline-size: 100%;
      }

      .body {
        grid-row: 2;
        display: flex;
        flex-direction: column;
        gap: var(--auy-space-md);
        padding: var(--auy-space-md);
      }

      .card-link {
        text-decoration: none;
        color: inherit;
        cursor: pointer;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      .card-link:hover {
        scale: 1.02;
        transform-origin: center center;
      }

      .card-link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .card-link {
          border: 1px solid ButtonText;
        }
      }

      @media (prefers-reduced-motion: no-preference) {
        .card-link {
          transition: scale var(--auy-transition, 200ms ease);
        }
      }

      @media print {
        .card {
          break-inside: avoid;
        }

        .card-link::after {
          content: " (" attr(href) ")";
          font-size: 0.8em;
          opacity: 0.7;
        }
      }
    }
  `;

  @property({ type: String }) variant: 'default' | 'elevated' | 'outlined' = 'default';

  @property({ type: String }) href?: string;

  override render() {
    const classes = {
      card: true,
      'card-link': !!this.href,
      'variant-elevated': this.variant === 'elevated',
      'variant-outlined': this.variant === 'outlined',
    };

    const content = html`
      <slot name="media" part="media"></slot>
      <div class="body" part="body">
        <slot name="title" part="title"></slot>
        <slot name="description" part="description"></slot>
        <slot></slot>
        <slot name="footer" part="footer"></slot>
      </div>
    `;

    if (this.href) {
      return html`
        <a
          href=${this.href}
          class=${classMap(classes)}
          part="card"
        >
          ${content}
        </a>
      `;
    }

    return html`
      <div class=${classMap(classes)} part="card">
        ${content}
      </div>
    `;
  }
}
