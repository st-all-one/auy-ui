import { LitElement, html } from 'lit';
import { customElement, property, query, queryAll } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';

import { DataAwareMixin } from './_internal/data-aware.mixin.ts';

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
 * @csspart tabs - The tablist container.
 * @csspart tab - Each individual tab button.
 * @csspart indicator - The active tab indicator bar.
 * @csspart panel-container - The container for tab panels.
 * @csspart panel - Each individual tab panel.
 */
@customElement('auy-comp-tabs')
export class AuyCompTabs extends DataAwareMixin(LitElement) {
  override createRenderRoot() { return this; }

  static override get observedDataEvents(): string[] {
    return ['tab-change']
  }

  @property({ type: Array }) tabs: Tab[] = [];
  @property({ type: String, reflect: true }) activeTab = '';
  @property({ type: String, reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  @query('[data-part="indicator"]') private _indicator!: HTMLElement;
  @queryAll('[data-part="tab"]') private _tabButtons!: NodeListOf<HTMLElement>;

  protected override _parseResponse(data: unknown): void {
    if (Array.isArray(data)) {
      this.tabs = data as Tab[];
    }
  }

  override firstUpdated() {
    this._moveChildren();
    this._positionIndicator();
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

  override updated(changed: Map<string, unknown>) {
    if (changed.has('activeTab') || changed.has('tabs') || changed.has('orientation')) {
      this.updateComplete.then(() => this._positionIndicator());
    }
  }

  override render() {
    if (this.tabs.length > 0) {
      const activeId = this._selectedId();
      return html`
        <div data-element="tabs">
          <div data-part="tabs" role="tablist" @keydown=${this._onKeyDown}>
            ${keyed(this.tabs, this.tabs.map((tab, i) => {
              const isActive = tab.id === activeId;
              return html`
                <button
                  data-part="tab"
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
            <div data-part="indicator"></div>
          </div>
          <div data-part="panel-container">
            ${keyed(this.tabs, this.tabs.map(tab => {
              const isActive = tab.id === activeId;
              return html`
                <div
                  data-part="panel"
                  role="tabpanel"
                  id="panel-${tab.id}"
                  aria-labelledby="tab-${tab.id}"
                  aria-hidden=${isActive ? 'false' : 'true'}
                ><div data-slot="panel-${tab.id}"></div></div>
              `;
            }))}
          </div>
        </div>
      `;
    }

    return html`
      <div data-element="tabs">
        <div data-part="tabs" role="tablist">
          <div data-slot="tab"></div>
          <div data-part="indicator"></div>
        </div>
        <div data-slot="panel"></div>
      </div>
    `;
  }
}
