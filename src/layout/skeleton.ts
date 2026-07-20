import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * @slot default - Page content rendered inside the HTML skeleton
 */
@customElement('auy-skeleton')
export class AuySkeleton extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: contents;
      }
    }
  `;

  override createRenderRoot() {
    return this;
  }

  @property({ type: String }) lang = 'pt-BR';
  @property({ type: String }) title = '';
  @property({ type: String }) charset = 'UTF-8';
  @property({ type: String }) viewport = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
  @property({ type: String }) themeColor = '';
  @property({ type: String }) description = '';
  @property({ type: String }) colorScheme = 'light dark';
  @property({ type: String }) fontsUrl = '';

  private _metaElements = new Map<string, HTMLElement>();

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._metaElements.forEach((el) => {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    this._metaElements.clear();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window === 'undefined') return;
    document.documentElement.lang = this.lang;
    this._ensureMeta('charset', 'meta[charset]', 'charset', this.charset);
    this._ensureMeta('viewport', 'meta[name="viewport"]', 'name', 'viewport', 'content', this.viewport);
    this._ensureMeta('description', 'meta[name="description"]', 'name', 'description', 'content', this.description);
    this._ensureMeta('theme-color', 'meta[name="theme-color"]', 'name', 'theme-color', 'content', this.themeColor);
    this._ensureMeta('color-scheme', 'meta[name="color-scheme"]', 'name', 'color-scheme', 'content', this.colorScheme);
    this._ensureTitle();
    if (this.fontsUrl) {
      this._ensureFontPreconnect();
    }
  }

  override updated(changed: Map<string, unknown>): void {
    if (typeof window === 'undefined') return;
    if (changed.has('lang')) {
      document.documentElement.lang = this.lang;
    }
    if (changed.has('title')) {
      this._ensureTitle();
    }
    if (changed.has('charset')) {
      this._updateMetaContent('charset', this.charset);
    }
    if (changed.has('viewport')) {
      this._updateMetaContent('viewport', this.viewport);
    }
    if (changed.has('description')) {
      this._updateMetaContent('description', this.description);
    }
    if (changed.has('themeColor')) {
      this._updateMetaContent('theme-color', this.themeColor);
    }
    if (changed.has('colorScheme')) {
      this._updateMetaContent('color-scheme', this.colorScheme);
    }
    if (changed.has('fontsUrl')) {
      if (this.fontsUrl) {
        this._ensureFontPreconnect();
      } else {
        this._removeFontPreconnect();
      }
    }
  }

  private _ensureMeta(
    key: string,
    selector: string,
    attr1: string,
    val1?: string,
    attr2?: string,
    val2?: string
  ): void {
    let el = this._metaElements.get(key) as HTMLElement | null;
    if (!el) {
      el = document.head.querySelector(selector) as HTMLElement | null;
    }
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr1, val1 ?? '');
      if (attr2 && val2 !== undefined) {
        el.setAttribute(attr2, val2);
      }
      document.head.appendChild(el);
      this._metaElements.set(key, el);
    } else {
      if (attr2 && val2 !== undefined) {
        el.setAttribute(attr2, val2);
      }
      this._metaElements.set(key, el);
    }
  }

  private _ensureTitle(): void {
    let el = document.head.querySelector('title');
    if (!el) {
      el = document.createElement('title');
      document.head.appendChild(el);
    }
    el.textContent = this.title;
  }

  private _updateMetaContent(key: string, value: string): void {
    const el = this._metaElements.get(key);
    if (el) {
      if (key === 'charset') {
        el.setAttribute('charset', value);
      } else {
        el.setAttribute('content', value);
      }
    }
  }

  private _ensureFontPreconnect(): void {
    if (!this.fontsUrl) return;
    const key = 'fonts-preconnect';
    let el = this._metaElements.get(key) as HTMLLinkElement | null;
    if (!el) {
      el = document.head.querySelector(`link[rel="preconnect"][href="${this.fontsUrl}"]`) as HTMLLinkElement | null;
    }
    if (!el) {
      el = document.createElement('link');
      el.rel = 'preconnect';
      el.href = this.fontsUrl;
      el.crossOrigin = 'anonymous';
      document.head.appendChild(el);
      this._metaElements.set(key, el);
    } else if (el.href !== this.fontsUrl) {
      el.href = this.fontsUrl;
    }
  }

  private _removeFontPreconnect(): void {
    const el = this._metaElements.get('fonts-preconnect');
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
    this._metaElements.delete('fonts-preconnect');
  }

  setTheme(theme: 'light' | 'dark'): void {
    document.documentElement.setAttribute('data-theme', theme);
    this.colorScheme = theme;
    this._updateMetaContent('color-scheme', theme);
  }

  override render() {
    return html`<slot></slot>`;
  }
}
