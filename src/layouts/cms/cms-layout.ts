import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

/**
 * @slot search - Search component in the header
 * @slot user - User menu in the header
 * @slot sidebar - Sidebar content
 * @slot breadcrumb - Breadcrumb navigation in the main area
 * @slot page-title - Page title in the main area
 * @slot default - Main page content
 */
@customElement('auy-cms-layout')
export class AuyCmsLayout extends AuyLightElement {
  @property({ type: String, reflect: true }) theme: 'light' | 'dark' = 'light';
  @property({ type: String }) appTitle: string = '';
  @property({ type: Boolean, reflect: true }) sidebarCollapsed: boolean = false;

  get _activeTheme() {
    if (typeof window === 'undefined') return 'light';
    return document.documentElement.getAttribute('data-theme') || 'light';
  }

  _toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
    this.dispatchEvent(new CustomEvent('sidebar-toggle', {
      detail: { collapsed: this.sidebarCollapsed },
      bubbles: true,
      composed: true,
    }));
  }

  static override styles = css`
    @layer components {
      :host {
        display: grid;
        grid-template-rows: auto 1fr;
        block-size: 100dvh;
        color-scheme: light;
        container-type: inline-size;
      }
      :host([theme="dark"]) {
        color-scheme: dark;
      }

      [part="header"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-md, 1rem);
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        border-block-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.12));
        background: var(--auy-color-surface, oklch(100% 0 0));
        position: sticky;
        inset-block-start: 0;
        z-index: 1;
      }
      :host([theme="dark"]) [part="header"] {
        background: var(--auy-color-surface-dark, oklch(13% 0.01 260));
        border-block-end-color: var(--auy-color-border-dark, oklch(25% 0.02 260));
      }

      [part="hamburger"] {
        background: none;
        border: none;
        cursor: pointer;
        touch-action: manipulation;
        font-size: var(--auy-text-lg);
        padding: 0.25rem;
        border-radius: var(--auy-radius-sm, 0.25rem);
        color: var(--auy-color-text, oklch(15% 0.02 260));
        display: flex;
        align-items: center;
        justify-content: center;
      }
      [part="hamburger"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary, oklch(45% 0.25 250));
        outline-offset: 0.125rem;
      }

      [part="app-title"] {
        font-size: var(--auy-text-lg);
        font-weight: 600;
        color: var(--auy-color-text, oklch(15% 0.02 260));
      }
      :host([theme="dark"]) [part="app-title"] {
        color: var(--auy-color-text-dark, oklch(95% 0.005 260));
      }

      [part="header-right"] {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm, 0.5rem);
        margin-inline-start: auto;
      }

      [part="body"] {
        display: flex;
        flex: 1;
        overflow: hidden;
      }

      [part="sidebar"] {
        inline-size: 15.625rem;
        overflow-y: auto;
        overflow-x: hidden;
        transition: var(--auy-transition, 200ms ease);
        border-inline-end: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.12));
        flex-shrink: 0;
        background: var(--auy-color-surface-secondary, oklch(97% 0.01 260));
        box-sizing: border-box;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
      }
      :host([theme="dark"]) [part="sidebar"] {
        background: var(--auy-color-surface-dark-secondary, oklch(10% 0.01 260));
        border-inline-end-color: var(--auy-color-border-dark, oklch(25% 0.02 260));
      }

      [part="sidebar"].collapsed {
        inline-size: 0;
        overflow: hidden;
        padding: 0;
        border: none;
      }

      [part="main"] {
        flex: 1;
        overflow-y: auto;
        padding: var(--auy-space-lg, 1.5rem);
        display: grid;
        gap: var(--auy-space-md, 1rem);
        align-content: start;
        background: var(--auy-color-bg, oklch(97% 0.003 260));
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
      }
      :host([theme="dark"]) [part="main"] {
        background: var(--auy-color-bg-dark, oklch(8% 0.01 260));
      }

      [part="backdrop"] {
        display: none;
      }

      @container (max-width: 768px) {
        [part="sidebar"] {
          position: fixed;
          inset-block-start: 0;
          inset-inline-start: 0;
          block-size: 100dvh;
          inline-size: 15.625rem;
        }
        [part="sidebar"].collapsed {
          inline-size: 0;
          overflow: hidden;
          padding: 0;
          border: none;
        }
        [part="backdrop"] {
          display: block;
          position: fixed;
          inset: 0;
          background: var(--auy-color-overlay, oklch(0% 0 0 / 0.4));
          z-index: 1;
        }
        [part="backdrop"].hidden {
          display: none;
        }
      }

      @media print {
        [part="sidebar"],
        [part="header"] {
          display: none;
        }
      }

      @media (forced-colors: active) {
        [part="hamburger"]:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [part="sidebar"] {
          transition: none;
        }
      }
    }
  `;

  render() {
    return html`
      <header part="header">
        <button @click=${this._toggleSidebar} part="hamburger" aria-label="Menu">☰</button>
        <span part="app-title">${this.appTitle}</span>
        <div part="header-right">
          <slot name="search"></slot>
          <slot name="user"></slot>
        </div>
      </header>
      <div part="body">
        <aside part="sidebar" class=${this.sidebarCollapsed ? 'collapsed' : ''}>
          <slot name="sidebar"></slot>
        </aside>
        <div part="backdrop" class=${this.sidebarCollapsed ? 'hidden' : ''} @click=${this._toggleSidebar}></div>
        <main part="main" id="cms-main">
          <slot name="breadcrumb"></slot>
          <slot name="page-title"></slot>
          <slot></slot>
        </main>
      </div>
    `;
  }
}
