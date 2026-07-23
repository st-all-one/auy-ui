import { html, css } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { AuyShadowElement } from '../_internal/AuyShadowElement.base.ts';

import { DataAwareMixin } from '../_internal/data-aware.mixin.ts';
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts';

/**
 * Represents a single tab item.
 *
 * @interface Tab
 * @property {string} label - The display label for the tab.
 * @property {string} id - A unique identifier for the tab.
 */
export interface Tab {
  label: string;
  id: string;
}

/**
 * Tabs component for switching between panels.
 *
 * @element auy-comp-tabs
 *
 * @property {Tab[]} tabs - Array of tab definitions.
 * @property {string} activeTab - ID of the currently active tab. Reflected as attribute.
 * @property {'horizontal'|'vertical'} orientation - Layout orientation of the tabs. Reflected as attribute.
 *
 * @fires {CustomEvent} tab-change - Dispatched when the active tab changes. Detail: `{ id: string }`.
 *
 * @slot - Default slot for tab panels (used when `tabs` array is empty).
 * @slot tab - Named slot for custom tab triggers (used when `tabs` array is empty).
 * @slot panel - Named slot for custom tab panels (used when `tabs` array is empty).
 * @slot panel-{id} - Named slot for each panel keyed by tab ID (used when `tabs` array is populated).
 *
 * @csspart tabs - The tablist container.
 * @csspart tab - Each individual tab button.
 * @csspart indicator - The active tab indicator bar.
 * @csspart panel-container - The container for tab panels.
 * @csspart panel - Each individual tab panel.
 */
@customElement('auy-comp-tabs')
export class AuyCompTabs extends StyleCustomizableMixin(DataAwareMixin(AuyShadowElement)) {
  static override get observedDataEvents(): string[] {
    return ['tab-change']
  }

  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      :host([orientation='vertical']) {
        display: flex;
        flex-direction: row;
      }

      [part='tabs'] {
        display: flex;
        position: relative;
        gap: var(--auy-space-xs, 6px);
        border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        overflow-x: auto;
        scroll-snap-type: x mandatory;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
      }
      [part='tabs']::-webkit-scrollbar { block-size: 0.25rem; }
      [part='tabs']::-webkit-scrollbar-thumb { background: var(--auy-color-border); border-radius: var(--auy-radius-full); }

      :host([orientation='vertical']) [part='tabs'] {
        flex-direction: column;
        border-block-end: none;
        border-inline-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.15));
        gap: 0;
      }

      [part='tab'] {
        all: unset;
        box-sizing: border-box;
        padding: var(--auy-space-sm, 8px) var(--auy-space-md, 16px);
        font-family: inherit;
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted, oklch(45% 0.03 260));
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
        white-space: nowrap;
        scroll-snap-align: start;
        flex-shrink: 0;
        transition: color var(--auy-transition-fast, 150ms) ease;
        -ms-touch-action: manipulation;
        touch-action: manipulation;
      }

      [part='tab']:hover {
        color: var(--auy-color-text, oklch(20% 0.03 260));
      }

      [part='tab'][aria-selected='true'] {
        color: var(--auy-color-primary, oklch(50% 0.2 250));
      }

      [part='tab']:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary, oklch(50% 0.2 250));
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        [part='tab'] {
          border: 1px solid ButtonText;
        }
      }

      [part='indicator'] {
        position: absolute;
        inset-block-end: 0;
        inset-inline-start: 0;
        block-size: 2px;
        background: var(--auy-color-primary, oklch(50% 0.2 250));
        transition: transform var(--auy-transition-slow, 250ms) ease,
          inline-size var(--auy-transition-slow, 250ms) ease;
        will-change: transform, inline-size;
      }

      :host([orientation='vertical']) [part='indicator'] {
        inset-block-end: auto;
        inset-inline-end: 0;
        inset-block-start: 0;
        inset-inline-start: auto;
        inline-size: 2px;
        block-size: 0;
        transition: transform var(--auy-transition-slow, 250ms) ease,
          block-size var(--auy-transition-slow, 250ms) ease;
      }

      [part='panel-container'] {
        display: grid;
      }

      [part='panel'] {
        grid-area: 1 / 1;
        padding: var(--auy-space-md, 16px);
        opacity: 0;
        transform: translateY(0.375rem);
        pointer-events: none;
        transition: opacity var(--auy-transition), transform var(--auy-transition);
        visibility: hidden;
      }

      [part='panel']:not([aria-hidden='true']) {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
        visibility: visible;
      }

      :host([orientation='vertical']) [part='panel'] {
        flex: 1;
      }

      @media print {
        [part='panel-container'] {
          display: block;
        }
        [part='panel'] {
          display: block !important;
          opacity: 1 !important;
          transform: none !important;
          visibility: visible !important;
          pointer-events: auto !important;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [part='indicator'] {
          transition: none;
        }
      }
    }
  `;

  /** Array of tab definitions. */
  @property({ type: Array }) tabs: Tab[] = [];
  /** ID of the currently active tab. */
  @property({ type: String, reflect: true }) activeTab = '';
  /** Layout orientation of the tabs. */
  @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** The active indicator bar element. */
  @query('[part="indicator"]') private _indicator!: HTMLElement;
  /** All tab button elements. */
  @queryAll('[part="tab"]') private _tabButtons!: NodeListOf<HTMLElement>;

  protected override _parseResponse(data: unknown): void {
    if (Array.isArray(data)) {
      this.tabs = data as Tab[];
    }
  }

  private _selectedId(): string {
    if (this.activeTab && this.tabs.some(t => t.id === this.activeTab)) {
      return this.activeTab;
    }
    return this.tabs[0]?.id ?? '';
  }

  private _selectTab(id: string) {
    if (id === this.activeTab) return;
    this.activeTab = id;
    this.dispatchEvent(new CustomEvent('tab-change', { detail: { id }, bubbles: true, composed: true }));
  }

  private _positionIndicator() {
    if (!this._indicator || !this._tabButtons.length) return;
    const activeId = this._selectedId();
    const activeEl = Array.from(this._tabButtons).find(
      el => el.dataset.tabId === activeId
    );
    if (!activeEl) {
      this._indicator.style.transform = '';
      this._indicator.style.width = '';
      this._indicator.style.height = '';
      return;
    }
    if (this.orientation === 'horizontal') {
      this._indicator.style.transform = `translateX(${activeEl.offsetLeft}px)`;
      this._indicator.style.width = `${activeEl.offsetWidth}px`;
    } else {
      this._indicator.style.transform = `translateY(${activeEl.offsetTop}px)`;
      this._indicator.style.height = `${activeEl.offsetHeight}px`;
    }
  }

  private _onKeyDown(e: KeyboardEvent) {
    if (!this.tabs.length) return;
    const idx = this.tabs.findIndex(t => t.id === this._selectedId());
    let next = idx;

    switch (e.key) {
      case 'ArrowRight':
        if (this.orientation === 'horizontal') next = (idx + 1) % this.tabs.length;
        break;
      case 'ArrowLeft':
        if (this.orientation === 'horizontal') next = (idx - 1 + this.tabs.length) % this.tabs.length;
        break;
      case 'ArrowDown':
        if (this.orientation === 'vertical') next = (idx + 1) % this.tabs.length;
        break;
      case 'ArrowUp':
        if (this.orientation === 'vertical') next = (idx - 1 + this.tabs.length) % this.tabs.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = this.tabs.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    const el = this._tabButtons[next];
    if (el) el.focus();
    this._selectTab(this.tabs[next].id);
  }

  private readonly _handleTabClick = (e: Event) => {
    const idx = Number((e.currentTarget as HTMLElement).dataset.index);
    this._selectTab(this.tabs[idx].id);
  };

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('tabs')) {
      const valid = this.tabs.some(t => t.id === this.activeTab);
      if (!valid && this.tabs.length > 0) {
        this.activeTab = this.tabs[0].id;
      }
    }
  }

  override firstUpdated() {
    this._positionIndicator();
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('activeTab') || changed.has('tabs') || changed.has('orientation')) {
      this.updateComplete.then(() => this._positionIndicator());
    }
  }

  override render() {
    if (this.tabs.length > 0) {
      const activeId = this._selectedId();
      return html`
        ${this._renderCustomStyles()}
        <div part="tabs" role="tablist" @keydown=${this._onKeyDown}>
          ${keyed(this.tabs, this.tabs.map((tab, i) => {
            const isActive = tab.id === activeId;
            return html`
              <button
                part="tab"
                role="tab"
                id="tab-${tab.id}"
                data-tab-id=${tab.id}
                data-index="${i}"
                aria-selected=${isActive ? 'true' : 'false'}
                aria-controls="panel-${tab.id}"
                tabindex=${isActive ? '0' : '-1'}
                @click=${this._handleTabClick}
              >${tab.label}</button>
            `;
          }))}
          <div part="indicator"></div>
        </div>
        <div part="panel-container">
          ${keyed(this.tabs, this.tabs.map(tab => {
            const isActive = tab.id === activeId;
            return html`
              <div
                part="panel"
                role="tabpanel"
                id="panel-${tab.id}"
                aria-labelledby="tab-${tab.id}"
                aria-hidden=${isActive ? 'false' : 'true'}
              ><slot name="panel-${tab.id}"></slot></div>
            `;
          }))}
        </div>
      `;
    }

    return html`
      ${this._renderCustomStyles()}
      <div part="tabs" role="tablist">
        <slot name="tab"></slot>
        <div part="indicator"></div>
      </div>
      <slot name="panel"></slot>
    `;
  }
}
