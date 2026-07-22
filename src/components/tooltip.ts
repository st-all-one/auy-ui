import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';

let tooltipIdCounter = 0;

@customElement('auy-comp-tooltip')
export class AuyCompTooltip extends LitElement {
  override createRenderRoot() { return this; }

  @property({ type: String })
  text = '';

  @property({ type: String })
  position: 'top' | 'bottom' | 'left' | 'right' = 'top';

  @property({ type: Number })
  delay = 300;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @state()
  private _visible = false;

  @state()
  private _active = false;

  @query('.tooltip')
  private _tooltipEl!: HTMLElement;

  private _timer: ReturnType<typeof setTimeout> | null = null;
  private _tooltipId = `auy-tooltip-${++tooltipIdCounter}`;

  private _getTrigger(): HTMLElement | null {
    const container = this.querySelector('[data-slot="default"]');
    return container?.firstElementChild as HTMLElement ?? null;
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

  private _onToggle() {
    if (this.disabled || !this.text) return;
    this._clearTimer();
    if (this._visible) {
      this._onHide();
    } else {
      this._show();
      this.updateComplete.then(() => {
        this._position();
        requestAnimationFrame(() => {
          this._active = true;
        });
      });
    }
  }

  private _clearTimer() {
    if (this._timer !== null) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }

  override firstUpdated() {
    this._moveChildren();
    this._updateTriggerAria();
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
      <div data-element="tooltip">
        <span data-part="trigger" class="trigger"
          @mouseenter=${this._onShow}
          @mouseleave=${this._onHide}
          @focusin=${this._onShow}
          @focusout=${this._onHide}
          @click=${this._onToggle}
          @touchenter=${this._onShow}
        >
          <span data-slot="default"></span>
        </span>
        <div
          data-part="tooltip"
          class="tooltip tooltip--${this.position}${this._active ? ' tooltip--active' : ''}"
          role="tooltip"
          id=${this._tooltipId}
          ?hidden=${!this._visible}
        >
          ${this.text}
          <span data-part="arrow" class="arrow"></span>
        </div>
      </div>
    `;
  }
}
