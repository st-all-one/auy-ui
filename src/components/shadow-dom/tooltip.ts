import { LitElement, html, css } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

let tooltipIdCounter = 0;

/**
 * @element auy-comp-tooltip
 * @slot - Elemento gatilho (trigger)
 * @csspart trigger - Container do gatilho
 * @csspart tooltip - Balão da dica
 * @csspart arrow - Seta apontando para o gatilho
 */
@customElement('auy-comp-tooltip')
export class AuyCompTooltip extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: inline-block;
      }

      .trigger {
        display: inline-flex;
      }

      .tooltip {
        position: fixed;
        z-index: var(--auy-z-tooltip);
        padding: var(--auy-space-xs) var(--auy-space-sm);
        border-radius: var(--auy-radius-md);
        background: var(--auy-color-text);
        color: var(--auy-color-surface);
        font-size: var(--auy-text-xs);
        line-height: 1.4;
        white-space: nowrap;
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--auy-transition-fast);
        max-inline-size: min(90vw, 20rem);
      }

      .tooltip--active {
        opacity: 1;
      }

      .arrow {
        position: absolute;
        inline-size: 0;
        block-size: 0;
        border-style: solid;
      }

      .tooltip--top .arrow {
        inset-block-start: 100%;
        inset-inline-start: 50%;
        translate: -50% 0;
        border-width: 0.375rem 0.375rem 0 0.375rem;
        border-color: var(--auy-color-text) transparent transparent transparent;
      }

      .tooltip--bottom .arrow {
        inset-block-end: 100%;
        inset-inline-start: 50%;
        translate: -50% 0;
        border-width: 0 0.375rem 0.375rem 0.375rem;
        border-color: transparent transparent var(--auy-color-text) transparent;
      }

      .tooltip--left .arrow {
        inset-inline-start: 100%;
        inset-block-start: 50%;
        translate: 0 -50%;
        border-width: 0.375rem 0 0.375rem 0.375rem;
        border-color: transparent transparent transparent var(--auy-color-text);
      }

      .tooltip--right .arrow {
        inset-inline-end: 100%;
        inset-block-start: 50%;
        translate: 0 -50%;
        border-width: 0.375rem 0.375rem 0.375rem 0;
        border-color: transparent var(--auy-color-text) transparent transparent;
      }

      @media (prefers-reduced-motion: reduce) {
        .tooltip { transition: none; }
      }

      @media (forced-colors: active) {
        .tooltip {
          border: 1px solid CanvasText;
          background: Canvas;
          color: CanvasText;
        }
        .tooltip--top .arrow { border-top-color: CanvasText; }
        .tooltip--bottom .arrow { border-bottom-color: CanvasText; }
        .tooltip--left .arrow { border-left-color: CanvasText; }
        .tooltip--right .arrow { border-right-color: CanvasText; }
      }

      @media print {
        .tooltip { display: none !important; }
      }
    }
  `;

  /** Texto exibido no tooltip */
  @property({ type: String })
  text = '';

  /** Posição relativa ao gatilho: top, bottom, left, right */
  @property({ type: String })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  /** Atraso em ms para exibir */
  @property({ type: Number })
  delay = 300;

  /** Desabilita o tooltip */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private _visible = false;

  @state()
  private _active = false;

  @query('slot')
  private _slot!: HTMLSlotElement;

  @query('.tooltip')
  private _tooltipEl!: HTMLElement;

  private _timer: ReturnType<typeof setTimeout> | null = null;
  private _tooltipId = `auy-tooltip-${++tooltipIdCounter}`;

  private _getTrigger(): HTMLElement | null {
    const assigned = this._slot?.assignedElements() ?? [];
    return (assigned[0] as HTMLElement) ?? null;
  }

  private _updateTriggerAria() {
    const trigger = this._getTrigger();
    if (trigger && this.text) {
      trigger.setAttribute('aria-describedby', this._tooltipId);
    } else if (trigger) {
      trigger.removeAttribute('aria-describedby');
    }
  }

  private _show() {
    if (this.disabled || !this.text) return;
    this._visible = true;
    this._active = false;
  }

  private _position() {
    const trigger = this._getTrigger();
    const tooltip = this._tooltipEl;
    if (!trigger || !tooltip) return;

    const triggerRect = trigger.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const gap = 6;

    let left = 0;
    let top = 0;

    switch (this.position) {
      case 'top':
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        top = triggerRect.top - tooltipRect.height - gap;
        break;
      case 'bottom':
        left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2;
        top = triggerRect.bottom + gap;
        break;
      case 'left':
        left = triggerRect.left - tooltipRect.width - gap;
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'right':
        left = triggerRect.right + gap;
        top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2;
        break;
    }

    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
  }

  private _onShow() {
    this._clearTimer();
    this._timer = setTimeout(() => {
      this._show();
      this.updateComplete.then(() => {
        this._position();
        requestAnimationFrame(() => {
          this._active = true;
        });
      });
    }, this.delay);
  }

  private _onHide() {
    this._clearTimer();
    this._visible = false;
    this._active = false;
  }

  private _clearTimer() {
    if (this._timer !== null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  override firstUpdated() {
    this._updateTriggerAria();
  }

  override updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('text') || changedProperties.has('disabled')) {
      this._updateTriggerAria();
    }
    if (changedProperties.has('position') && this._visible) {
      this._position();
    }
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this._clearTimer();
  }

  override render() {
    return html`
      <span part="trigger" class="trigger"
        @mouseenter=${this._onShow}
        @mouseleave=${this._onHide}
        @focusin=${this._onShow}
        @focusout=${this._onHide}
      >
        <slot @slotchange=${this._updateTriggerAria}></slot>
      </span>
      <div
        part="tooltip"
        class="tooltip tooltip--${this.position}${this._active ? ' tooltip--active' : ''}"
        role="tooltip"
        id=${this._tooltipId}
        ?hidden=${!this._visible}
      >
        ${this.text}
        <span part="arrow" class="arrow"></span>
      </div>
    `;
  }
}
