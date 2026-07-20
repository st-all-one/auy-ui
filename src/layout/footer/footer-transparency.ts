import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface TransparencyItem {
  label: string;
  href: string;
  icon?: string;
}

/**
 * @slot default - No named slots; content is rendered via properties
 */
@customElement('auy-footer-transparency')
export class AuyFooterTransparency extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .panel {
        display: grid;
        gap: var(--auy-space-md);
        padding: var(--auy-space-lg);
        background: color-mix(in oklch, var(--auy-color-primary) 4%, transparent);
        border-radius: var(--auy-radius-md);
      }

      h3 {
        font-size: var(--auy-text-base);
        font-weight: 600;
        color: var(--auy-color-text);
        margin: 0;
      }

      p {
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        margin: 0;
      }

      .grid {
        display: grid;
        grid-template-columns: repeat(var(--columns, 4), 1fr);
        gap: var(--auy-space-sm);
        container-type: inline-size;
      }

      .link {
        display: flex;
        align-items: center;
        gap: var(--auy-space-xs);
        padding: var(--auy-space-sm);
        border-radius: var(--auy-radius-sm);
        text-decoration: none;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-primary);
        transition: background var(--auy-transition-fast);
        line-height: var(--auy-line-height-sm);
        touch-action: manipulation;
      }

      .link:hover {
        background: color-mix(in oklch, var(--auy-color-primary) 8%, transparent);
        text-decoration: underline;
      }

      .link:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .link:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @container (max-width: 600px) {
        .grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @container (max-width: 400px) {
        .grid {
          grid-template-columns: 1fr;
        }
      }

      @media print {
        .panel {
          display: none;
        }
      }
    }
  `;

  @property({ type: String }) title = 'Transparência';

  @property({ type: String }) description = '';

  @property({ type: Array })
  items: TransparencyItem[] = [
    { label: 'Lei de Acesso à Informação', href: '#' },
    { label: 'Perguntas Frequentes', href: '#' },
    { label: 'Dados Abertos', href: '#' },
    { label: 'Relatório de Gestão', href: '#' },
    { label: 'Contrato de Gestão', href: '#' },
    { label: 'SIC Físico', href: '#' },
    { label: 'e-SIC', href: '#' },
    { label: 'Serviço de Informação', href: '#' },
  ];

  @property({ type: Number }) columns = 4;

  override render() {
    return html`
      <div part="panel" class="panel">
        ${this.title
          ? html`<h3 part="title">${this.title}</h3>`
          : ''}
        ${this.description
          ? html`<p part="desc">${this.description}</p>`
          : ''}
        <div part="grid" class="grid" style="--columns: ${this.columns}">
          ${this.items.map(
            (item) => html`
              <a part="link" href=${item.href} class="link">
                ${item.icon
                  ? html`<span part="link-icon">${item.icon}</span>`
                  : ''}
                <span part="link-label">${item.label}</span>
              </a>
            `
          )}
        </div>
      </div>
    `;
  }
}
