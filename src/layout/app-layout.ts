import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export interface SkipLink {
  href: string;
  label: string;
  accesskey?: string;
}

/**
 * @slot sidebar - Sidebar content
 * @slot header - Header content
 * @slot main - Main content area
 * @slot footer - Footer content
 * @slot default - Default fallback content
 */
@customElement('auy-app-layout')
export class AuyAppLayout extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        font-family: var(--auy-font-sans);
        background: var(--auy-color-surface);
        color: var(--auy-color-text);
        contain: layout style;
      }

      :host([theme="dark"]) {
        color-scheme: dark;
      }

      :host([theme="light"]) {
        color-scheme: light;
      }

      #layout {
        display: grid;
        min-block-size: 100dvh;
      }

      a[part="skip-link"] {
        position: absolute;
        inline-size: 1px;
        block-size: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
        z-index: 1;
      }

      a[part="skip-link"]:focus {
        inline-size: auto;
        block-size: auto;
        padding: 0.5rem 1rem;
        margin: 0;
        overflow: visible;
        clip: auto;
        white-space: normal;
        background: var(--auy-color-surface);
        color: var(--auy-color-primary);
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
        text-decoration: none;
      }

      @media print {
      nav[part="skip-links"] {
        position: fixed;
        inset-block-start: 0;
        inset-inline-start: 0;
        z-index: 1;
      }

      a[part="skip-link"] {
          display: none;
        }
      }
    }
  `;

  @property({ type: String, reflect: true }) theme: 'light' | 'dark' = 'light';
  @property({ type: String }) sidebarWidth = '17.5rem';
  @property({ type: String }) headerHeight = 'auto';
  @property({ type: Array }) skipLinks: SkipLink[] = [
    { href: '#main-content', label: 'Ir para o conteúdo principal', accesskey: '1' },
    { href: '#main-nav', label: 'Ir para a navegação', accesskey: '2' },
    { href: '#footer', label: 'Ir para o rodapé', accesskey: '3' },
  ];

  @state() private _hasSidebar = false;
  @state() private _hasHeader = false;

  private _observer: MutationObserver | null = null;

  private _updatePresence(): void {
    const hasSidebar = this.querySelector('[slot="sidebar"]') !== null;
    const hasHeader = this.querySelector('[slot="header"]') !== null;
    if (hasSidebar !== this._hasSidebar) {
      this._hasSidebar = hasSidebar;
    }
    if (hasHeader !== this._hasHeader) {
      this._hasHeader = hasHeader;
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', this.theme);
      this._updatePresence();
      this._observer = new MutationObserver(() => this._updatePresence());
      this._observer.observe(this, { childList: true, subtree: true });
    }
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (typeof window !== 'undefined') {
      document.documentElement.removeAttribute('data-theme');
    }
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('theme') && typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', this.theme);
    }
  }

  override render() {
    const hasSidebar = this._hasSidebar;
    const hasHeader = this._hasHeader;

    let areas: string;
    let columns: string;
    let rows: string;

    if (hasSidebar && hasHeader) {
      areas = '"sidebar header" "sidebar main" "sidebar footer"';
      columns = `${this.sidebarWidth} 1fr`;
      rows = `${this.headerHeight} 1fr auto`;
    } else if (hasSidebar) {
      areas = '"sidebar" "main" "footer"';
      columns = `${this.sidebarWidth} 1fr`;
      rows = '1fr auto';
    } else if (hasHeader) {
      areas = '"header" "main" "footer"';
      columns = '1fr';
      rows = `${this.headerHeight} 1fr auto`;
    } else {
      areas = '"main" "footer"';
      columns = '1fr';
      rows = '1fr auto';
    }

    return html`
      <nav class="skip-links" aria-label="Acessibilidade - Atalhos" part="skip-links">
        ${this.skipLinks.map(link => html`
          <a
            href=${link.href}
            part="skip-link"
            accesskey=${link.accesskey || ''}
            tabindex="0"
          >${link.label}</a>
        `)}
      </nav>
      <div id="layout" part="layout" style="grid-template-areas: ${areas}; grid-template-columns: ${columns}; grid-template-rows: ${rows};">
        ${hasSidebar ? html`<div part="sidebar" style="grid-area: sidebar;" id="main-nav"><slot name="sidebar"></slot></div>` : ''}
        ${hasHeader ? html`<div part="header" style="grid-area: header;"><slot name="header"></slot></div>` : ''}
        <div id="main-content" part="main" style="grid-area: main;"><slot name="main"></slot></div>
        <div part="footer" style="grid-area: footer;" id="footer"><slot name="footer"></slot></div>
      </div>
      <slot></slot>
    `;
  }
}
