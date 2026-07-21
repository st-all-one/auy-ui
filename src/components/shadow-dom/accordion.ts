import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { ICONS } from '../_internal/icons.ts';

/** Item do acordeão */
export interface AccordionItem {
  /** Identificador único */
  id: string;
  /** Título exibido no sumário */
  title: string;
  /** Conteúdo HTML */
  content: string;
  /** Se inicia aberto */
  open?: boolean;
}

/**
 * @element auy-comp-accordion
 * @fires toggle - Disparado ao abrir/fechar item
 * @csspart summary - Cabeçalho clicável de cada item
 */
@customElement('auy-comp-accordion')
export class AuyCompAccordion extends LitElement {
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .accordion-item {
        border-block-end: 1px solid var(--auy-color-border);
      }

      .accordion-item:first-child {
        border-block-start: 1px solid var(--auy-color-border);
      }

      summary {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        font-family: inherit;
        font-size: var(--auy-text-sm);
        font-weight: var(--auy-font-weight-medium);
        color: var(--auy-color-text);
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
      }

      summary::-webkit-details-marker {
        display: none;
      }

      summary:hover {
        background: color-mix(in oklch, var(--auy-color-border) 8%, transparent);
      }

      summary:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: -0.125rem;
      }

      .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.25em;
        block-size: 1.25em;
        flex-shrink: 0;
        transition: transform var(--auy-transition-fast);
      }

      .icon svg {
        inline-size: 100%;
        block-size: 100%;
        fill: none;
        stroke: currentColor;
      }

      .icon--chevron {
        transform: rotate(0deg);
      }

      details[open] .icon--chevron {
        transform: rotate(180deg);
      }

      details[open] .icon--plus {
        transform: rotate(45deg);
      }

      .content {
        height: 0;
        overflow: hidden;
        transition: height var(--auy-transition);
      }

      .content-inner {
        padding: 0 var(--auy-space-md) var(--auy-space-md);
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        line-height: var(--auy-line-height);
      }

      @media (prefers-reduced-motion: reduce) {
        .icon { transition: none; }
        .content { transition: none; }
      }

      @media (forced-colors: active) {
        .accordion-item {
          border: 1px solid ButtonText;
          border-block-end: none;
        }
        .accordion-item:last-child {
          border-block-end: 1px solid ButtonText;
        }
        summary:focus-visible {
          outline: 0.125rem solid Highlight;
          outline-offset: -0.125rem;
        }
      }

      @media print {
        .accordion-item {
          break-inside: avoid;
        }
        .content {
          height: auto !important;
        }
      }
    }
  `;

  /** Array de itens do acordeão */
  @property({ type: Array }) items: AccordionItem[] = [];
  /** Permite múltiplos itens abertos simultaneamente */
  @property({ type: Boolean, reflect: true }) multiple = false;
  /** Ícone do indicador: chevron | plus */
  @property({ type: String }) icon: 'chevron' | 'plus' = 'chevron';

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

  private _animateItem(id: string, open: boolean) {
    const content = this.shadowRoot?.querySelector(`.content[data-item="${id}"]`) as HTMLElement | null;
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
      ${this.items.map(item => html`
        <details class="accordion-item" ?open=${this._openMap[item.id] ?? false}>
          <summary part="summary" @click=${(e: Event) => { e.preventDefault(); this._toggle(item.id); }}>
            <span class="icon icon--${this.icon}" aria-hidden="true">
              ${this.icon === 'chevron' ? unsafeHTML(ICONS.chevronDown) : unsafeHTML(ICONS.plus)}
            </span>
            <span>${item.title}</span>
          </summary>
          <div class="content" data-item="${item.id}">
            <div class="content-inner">
              <slot name="item-${item.id}">${item.content}</slot>
            </div>
          </div>
        </details>
      `)}
    `;
  }
}
