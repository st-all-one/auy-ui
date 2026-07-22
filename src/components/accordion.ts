import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { getIcon } from './_internal/icons.ts';
import { DataAwareMixin } from './_internal/data-aware.mixin.ts';

export interface AccordionItem {
  id: string;
  title: string;
  content: string;
  open?: boolean;
}

/**
 * @element auy-comp-accordion
 * @fires toggle - Disparado ao abrir/fechar item
 * @csspart summary - Cabeçalho clicável de cada item
 */
@customElement('auy-comp-accordion')
export class AuyCompAccordion extends DataAwareMixin(LitElement) {
  override createRenderRoot() { return this; }

  static override get observedDataEvents(): string[] {
    return ['toggle']
  }

  @property({ type: Array }) items: AccordionItem[] = [];
  @property({ type: Boolean, reflect: true }) multiple = false;
  @property({ type: String }) icon: 'chevron' | 'plus' = 'chevron';

  protected override _parseResponse(data: unknown): void {
    if (Array.isArray(data)) {
      this.items = data as AccordionItem[];
    }
  }

  @state() private _openMap: Record<string, boolean> = {};

  override willUpdate(changed: Map<string, unknown>) {
    if (changed.has('items')) {
      const map: Record<string, boolean> = {};
      for (const item of this.items) {
        map[item.id] = item.open ?? false;
      }
      this._openMap = map;
    }
  }

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

  private _animateItem(id: string, open: boolean) {
    const content = this.querySelector(`.content[data-item="${id}"]`) as HTMLElement | null;
    if (!content) return;

    const inner = content.querySelector('.content-inner') as HTMLElement | null;
    if (!inner) return;

    const height = inner.scrollHeight;

    if (open) {
      content.style.height = '0px';
      content.offsetHeight;
      content.style.height = `${height}px`;
    } else {
      content.style.height = `${height}px`;
      content.offsetHeight;
      content.style.height = '0px';
    }
  }

  private _toggle(id: string) {
    const willOpen = !this._openMap[id];

    if (willOpen && !this.multiple) {
      for (const key of Object.keys(this._openMap)) {
        if (key !== id) {
          this._animateItem(key, false);
          this._openMap = { ...this._openMap, [key]: false };
        }
      }
    }

    this._openMap = { ...this._openMap, [id]: willOpen };

    this.updateComplete.then(() => {
      this._animateItem(id, willOpen);
    });

    this.dispatchEvent(new CustomEvent('toggle', {
      detail: { id, open: willOpen },
      bubbles: true,
      composed: true,
    }));
  }

  override render() {
    return html`
      <div data-element="accordion">
        ${this.items.map(item => html`
          <details class="accordion-item" ?open=${this._openMap[item.id] ?? false}>
            <summary data-part="summary" @click=${(e: Event) => { e.preventDefault(); this._toggle(item.id); }}>
              <span class="icon icon--${this.icon}" aria-hidden="true">
                ${this.icon === 'chevron' ? unsafeHTML(getIcon('chevronDown')) : unsafeHTML(getIcon('plus'))}
              </span>
              <span class="title-text">${item.title}</span>
            </summary>
            <div class="content" data-item="${item.id}">
              <div class="content-inner">
                <div data-slot="item-${item.id}">${item.content}</div>
              </div>
            </div>
          </details>
        `)}
      </div>
    `;
  }
}
