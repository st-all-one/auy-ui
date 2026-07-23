import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { AuyShadowElement } from '../_internal/AuyShadowElement.base.ts';
import { ICONS } from '../_internal/icons.ts';
import { DataAwareMixin } from '../_internal/data-aware.mixin.ts';
import { StyleCustomizableMixin } from '../_internal/style-customizable.mixin.ts';

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
export class AuyCompAccordion extends StyleCustomizableMixin(DataAwareMixin(AuyShadowElement)) {

  static override get observedDataEvents(): string[] {
    return ['toggle']
  }

  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
        container-type: inline-size;
      }

      [data-auy-part="accordion-item"] {
        border-block-end: 1px solid var(--auy-color-border);
      }

      [data-auy-part="accordion-item"]:first-child {
        border-block-start: 1px solid var(--auy-color-border);
      }

      summary {
        all: unset;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-md);
        min-block-size: 2.75rem;
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

      [data-auy-part="title-text"] {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      @container (max-width: 300px) {
        [data-auy-part="title-text"] {
          max-inline-size: 15ch;
        }
      }

      [data-auy-part="icon"] {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.25em;
        block-size: 1.25em;
        flex-shrink: 0;
        transition: transform var(--auy-transition-fast);
      }

      [data-auy-part="icon"] svg {
        inline-size: 100%;
        block-size: 100%;
        fill: none;
        stroke: currentColor;
      }

      [data-auy-part="icon"][data-auy-variant="chevron"] {
        transform: rotate(0deg);
      }

      details[open] [data-auy-part="icon"][data-auy-variant="chevron"] {
        transform: rotate(180deg);
      }

      details[open] [data-auy-part="icon"][data-auy-variant="plus"] {
        transform: rotate(45deg);
      }

      [data-auy-part="content"] {
        height: 0;
        overflow: hidden;
        transition: height var(--auy-transition);
      }

      [data-auy-part="content-inner"] {
        padding: 0 var(--auy-space-md) var(--auy-space-md);
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        line-height: var(--auy-line-height);
      }

      @media (prefers-reduced-motion: reduce) {
        [data-auy-part="icon"] { transition: none; }
        [data-auy-part="content"] { transition: none; }
      }

      @media (forced-colors: active) {
        [data-auy-part="accordion-item"] {
          border: 1px solid ButtonText;
          border-block-end: none;
        }
        [data-auy-part="accordion-item"]:last-child {
          border-block-end: 1px solid ButtonText;
        }
        summary:focus-visible {
          outline: 0.125rem solid Highlight;
          outline-offset: -0.125rem;
        }
      }

      @media print {
        [data-auy-part="accordion-item"] {
          break-inside: avoid;
        }
        [data-auy-part="content"] {
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

  private _animateItem(id: string, open: boolean) {
    const content = this.shadowRoot?.querySelector(`[data-auy-part="content"][data-item="${id}"]`) as HTMLElement | null;
    if (!content) return;

    const inner = content.querySelector('[data-auy-part="content-inner"]') as HTMLElement | null;
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
      ${this._renderCustomStyles()}
      ${this.items.map(item => html`
        <details data-auy-part="accordion-item" ?open=${this._openMap[item.id] ?? false}>
          <summary part="summary" @click=${(e: Event) => { e.preventDefault(); this._toggle(item.id); }}>
            <span data-auy-part="icon" data-auy-variant=${this.icon} aria-hidden="true">
              ${this.icon === 'chevron' ? unsafeHTML(ICONS.chevronDown) : unsafeHTML(ICONS.plus)}
            </span>
            <span data-auy-part="title-text">${item.title}</span>
          </summary>
          <div data-auy-part="content" data-item="${item.id}">
            <div data-auy-part="content-inner">
              <slot name="item-${item.id}">${item.content}</slot>
            </div>
          </div>
        </details>
      `)}
    `;
  }
}
