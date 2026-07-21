import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

export interface SkipLink {
  href: string;
  label: string;
  accesskey?: string;
}

@customElement('auy-admin-layout')
export class AuyAdminLayout extends AuyLightElement {
  static override styles = css`
    :host { display: block; font-family: var(--auy-font-sans, system-ui); background: var(--auy-color-surface, #fff); color: var(--auy-color-text, #1a1a1a); }
    :host([theme="dark"]) { color-scheme: dark; }
    :host([theme="light"]) { color-scheme: light; }

    nav.skip-links { position: absolute; z-index: 1000; }
    .skip-link { position: absolute; inline-size: 1px; block-size: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
    .skip-link:focus { inline-size: auto; block-size: auto; padding: 0.5rem 1rem; margin: 0; overflow: visible; clip: auto; white-space: normal; background: var(--auy-color-surface, #fff); color: var(--auy-color-primary, #3b82f6); outline: 0.125rem solid var(--auy-color-primary, #3b82f6); text-decoration: none; }

    #layout { display: grid; min-block-size: 100dvh; }

    @media print {
      nav.skip-links { position: fixed; inset-block-start: 0; inset-inline-start: 0; z-index: 1; }
      .skip-link { display: none; }
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
    this._hasSidebar = this.querySelector('[slot="sidebar"]') !== null;
    this._hasHeader = this.querySelector('[slot="header"]') !== null;
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
    if (typeof window !== 'undefined') document.documentElement.removeAttribute('data-theme');
    if (this._observer) { this._observer.disconnect(); this._observer = null; }
  }

  override updated(changed: Map<string, unknown>): void {
    if (changed.has('theme') && typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', this.theme);
    }
  }

  override render() {
    const { _hasSidebar: hasSidebar, _hasHeader: hasHeader } = this;
    let areas: string, columns: string, rows: string;

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
      <nav class="skip-links" aria-label="Pular para">
        ${this.skipLinks.map(link => html`<a class="skip-link" href=${link.href} accesskey=${link.accesskey || ''} aria-keyshortcuts=${link.accesskey ? `Shift+Alt+${link.accesskey}` : ''}>${link.label}</a>`)}
      </nav>
      <div id="layout" style="grid-template-areas: ${areas}; grid-template-columns: ${columns}; grid-template-rows: ${rows};">
        ${hasSidebar ? html`<div style="grid-area: sidebar;" id="main-nav"><slot name="sidebar"></slot></div>` : ''}
        ${hasHeader ? html`<div style="grid-area: header;" role="banner"><slot name="header"></slot></div>` : ''}
        <div id="main-content" style="grid-area: main;" role="main"><slot name="main"></slot></div>
        <div style="grid-area: footer;" id="footer" role="contentinfo"><slot name="footer"></slot></div>
      </div>
      <slot></slot>
    `;
  }
}
