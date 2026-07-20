import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @slot - Default slot for trigger content
 */
@customElement('auy-internal-tooltip')
export class AuyInternalTooltip extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        position: relative;
        display: inline-block;
      }

      .tooltip {
        position: absolute;
        z-index: 1;
        inset-block-end: calc(100% + 0.375rem);
        inset-inline-start: 50%;
        translate: -50% 0;
        padding: var(--auy-space-xs) var(--auy-space-sm);
        font-size: var(--auy-text-xs);
        font-weight: 500;
        line-height: 1.3;
        white-space: nowrap;
        border-radius: var(--auy-radius-sm);
        background: oklch(20% 0.03 260);
        color: oklch(95% 0 0);
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--auy-transition, 200ms) ease, visibility 0s linear 0.2s;
        visibility: hidden;
      }

      .tooltip--visible {
        opacity: 1;
        visibility: visible;
        transition: opacity var(--auy-transition, 200ms) ease, visibility 0s linear 0s;
      }

      .tooltip--bottom {
        inset-block-end: auto;
        inset-block-start: calc(100% + 0.375rem);
      }

      .tooltip--left {
        inset-block-end: auto;
        inset-block-start: 50%;
        inset-inline-end: calc(100% + 0.375rem);
        inset-inline-start: auto;
        translate: 0 -50%;
      }

      .tooltip--right {
        inset-block-end: auto;
        inset-block-start: 50%;
        inset-inline-start: calc(100% + 0.375rem);
        translate: 0 -50%;
      }

      @media (prefers-reduced-motion: reduce) {
        .tooltip {
          transition: none;
        }
      }

      @media print {
        .tooltip {
          display: none;
        }
      }
    }
  `;

  @property({ type: String }) text = '';
  @property({ type: String }) position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @property({ type: Boolean, reflect: true }) visible = false;

  private _hideTimer: ReturnType<typeof setTimeout> | null = null;

  private _show = () => {
    if (this._hideTimer) clearTimeout(this._hideTimer);
    this.visible = true;
  };

  private _hide = () => {
    this._hideTimer = setTimeout(() => { this.visible = false; }, 150);
  };

  override render() {
    const cls = `tooltip ${this.visible ? 'tooltip--visible' : ''} ${this.position === 'bottom' ? 'tooltip--bottom' : this.position === 'left' ? 'tooltip--left' : this.position === 'right' ? 'tooltip--right' : ''}`;
    return html`
      <span part="trigger" @mouseenter=${this._show} @mouseleave=${this._hide} @focusin=${this._show} @focusout=${this._hide} style="display:inline-flex">
        <slot></slot>
      </span>
      <span part="tooltip" class=${cls} role="tooltip">${this.text}</span>
    `;
  }
}
