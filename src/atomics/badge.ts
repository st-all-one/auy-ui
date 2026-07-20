import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-internal-badge')
export class AuyInternalBadge extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: inline-flex;
        vertical-align: middle;
      }

      .badge {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.3em;
        padding: 0.25em 0.75em;
        font-size: 0.8125rem;
        font-weight: 600;
        line-height: 1.3;
        border-radius: var(--auy-radius-sm);
        color: oklch(100% 0 0);
        background: var(--auy-color-primary);
        white-space: nowrap;
        user-select: none;
        border: 1px solid transparent;
      }

      .badge--pill {
        border-radius: var(--auy-radius-full);
        padding-inline: 0.8em;
        padding-block: 0.25em;
      }

      .badge--success {
        background: var(--auy-color-success);
      }

      .badge--error {
        background: var(--auy-color-error);
      }

      .badge--warning {
        background: var(--auy-color-warning);
        color: oklch(15% 0.02 260);
      }

      .badge--info {
        background: var(--auy-color-info);
      }

      .badge--neutral {
        background: color-mix(in oklch, var(--auy-color-border) 60%, transparent);
        color: var(--auy-color-text);
      }

      /* Outline variants */
      .badge--outline {
        background: transparent;
        border-color: var(--auy-color-primary);
        color: var(--auy-color-primary);
      }

      .badge--outline.badge--success {
        border-color: var(--auy-color-success);
        color: var(--auy-color-success);
      }

      .badge--outline.badge--error {
        border-color: var(--auy-color-error);
        color: var(--auy-color-error);
      }

      .badge--outline.badge--warning {
        border-color: var(--auy-color-warning);
        color: oklch(45% 0.15 85);
      }

      .badge--outline.badge--info {
        border-color: var(--auy-color-info);
        color: var(--auy-color-info);
      }

      .badge--outline.badge--neutral {
        border-color: var(--auy-color-text-muted);
        color: var(--auy-color-text-muted);
      }

      /* Count badge */
      .badge--count {
        min-inline-size: 1.5em;
        border-radius: var(--auy-radius-full);
        padding: 0.15em 0.4em;
        font-size: 0.75rem;
        font-weight: 700;
        background: var(--auy-color-primary);
        color: oklch(100% 0 0);
      }

      .badge--dot {
        inline-size: 0.625rem;
        block-size: 0.625rem;
        padding: 0;
        border-radius: 50%;
        min-inline-size: 0;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        font-size: 0.9em;
        line-height: 1;
      }

      @media (forced-colors: active) {
        .badge {
          border: 1px solid ButtonText;
        }
      }

      @media print {
        :host {
          display: none !important;
        }
      }
    }
  `;

  @property({ type: String })
  variant: 'default' | 'success' | 'error' | 'warning' | 'info' | 'neutral' = 'default';

  @property({ type: Boolean, reflect: true })
  outline = false;

  @property({ type: Boolean, reflect: true })
  pill = false;

  @property({ type: Boolean, reflect: true })
  dot = false;

  @property({ type: Number })
  count?: number;

  @property({ type: Number })
  max = 99;

  @property({ type: String })
  icon = '';

  override render() {
    const isDot = this.dot;
    const rawCount = this.count;
    const isCount = !isDot && rawCount !== undefined && rawCount !== null;
    const displayCount = isCount
      ? rawCount > this.max ? `${this.max}+` : `${rawCount}`
      : null;

    const varCls = !isCount && !isDot && this.variant !== 'default' ? `badge--${this.variant}` : '';
    const outlineCls = this.outline ? 'badge--outline' : '';
    const classes = [
      'badge',
      this.pill || isCount ? 'badge--pill' : '',
      isCount ? 'badge--count' : '',
      isDot ? 'badge--dot' : '',
      varCls,
      outlineCls,
    ].filter(Boolean).join(' ');

    return html`
      <span part="badge" class=${classes} role="status">
        ${isDot ? nothing : isCount ? html`${displayCount}` : html`
          ${this.icon ? html`<span part="icon" class="icon">${this.icon}</span>` : nothing}
          <slot></slot>
        `}
      </span>
    `;
  }
}
