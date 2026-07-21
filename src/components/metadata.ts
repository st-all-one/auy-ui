import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('auy-comp-metadata')
export class AuyCompMetadata extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: none;
      }
    }
  `;

  override createRenderRoot() {
    return this;
  }

  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: String }) canonical = '';
  @property({ type: String }) ogTitle = '';
  @property({ type: String }) ogDescription = '';
  @property({ type: String }) ogImage = '';
  @property({ type: String }) ogUrl = '';
  @property({ type: String }) ogType = 'website';
  @property({ type: String }) ogSiteName = '';
  @property({ type: String }) twCard = 'summary_large_image';
  @property({ type: String }) twSite = '';
  @property({ type: String }) twCreator = '';
  @property({ type: String }) twTitle = '';
  @property({ type: String }) twDescription = '';
  @property({ type: String }) twImage = '';
  @property({ type: String }) jsonLd = '';
  @property({ type: String }) robots = 'index, follow';

  private _elements = new Map<string, HTMLElement>();

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    this._applyAll();
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    this._elements.forEach((el) => {
      if (el.parentNode) el.parentNode.removeChild(el);
    });
    this._elements.clear();
  }

  override updated(changed: Map<string, unknown>): void {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (changed.has('title')) this._applyTitle();
    if (changed.has('description')) this._applyDescription();
    if (changed.has('canonical')) this._applyCanonical();
    if (changed.has('ogTitle')) this._applyOgTitle();
    if (changed.has('ogDescription')) this._applyOgDescription();
    if (changed.has('ogImage')) this._applyOgImage();
    if (changed.has('ogUrl')) this._applyOgUrl();
    if (changed.has('ogType')) this._applyOgType();
    if (changed.has('ogSiteName')) this._applyOgSiteName();
    if (changed.has('twCard')) this._applyTwCard();
    if (changed.has('twSite')) this._applyTwSite();
    if (changed.has('twCreator')) this._applyTwCreator();
    if (changed.has('twTitle')) this._applyTwTitle();
    if (changed.has('twDescription')) this._applyTwDescription();
    if (changed.has('twImage')) this._applyTwImage();
    if (changed.has('jsonLd')) this._applyJsonLd();
    if (changed.has('robots')) this._applyRobots();
  }

  private _applyAll(): void {
    this._applyTitle();
    this._applyDescription();
    this._applyCanonical();
    this._applyOgTitle();
    this._applyOgDescription();
    this._applyOgImage();
    this._applyOgUrl();
    this._applyOgType();
    this._applyOgSiteName();
    this._applyTwCard();
    this._applyTwSite();
    this._applyTwCreator();
    this._applyTwTitle();
    this._applyTwDescription();
    this._applyTwImage();
    this._applyJsonLd();
    this._applyRobots();
  }

  private _applyTitle(): void {
    document.title = this.title;
  }

  private _applyDescription(): void {
    if (this.description) {
      this._ensureMeta('description', 'description');
    } else {
      this._removeMeta('description');
    }
  }

  private _applyCanonical(): void {
    if (this.canonical) {
      this._ensureLink('canonical', this.canonical);
    } else {
      this._removeLink('canonical');
    }
  }

  private _applyOgTitle(): void {
    if (this.ogTitle) {
      this._ensureMeta('og:title', 'og:title');
    } else {
      this._removeMeta('og:title');
    }
  }

  private _applyOgDescription(): void {
    if (this.ogDescription) {
      this._ensureMeta('og:description', 'og:description');
    } else {
      this._removeMeta('og:description');
    }
  }

  private _applyOgImage(): void {
    if (this.ogImage) {
      this._ensureMeta('og:image', 'og:image');
    } else {
      this._removeMeta('og:image');
    }
  }

  private _applyOgUrl(): void {
    if (this.ogUrl) {
      this._ensureMeta('og:url', 'og:url');
    } else {
      this._removeMeta('og:url');
    }
  }

  private _applyOgType(): void {
    if (this.ogType) {
      this._ensureMeta('og:type', 'og:type');
    } else {
      this._removeMeta('og:type');
    }
  }

  private _applyOgSiteName(): void {
    if (this.ogSiteName) {
      this._ensureMeta('og:site_name', 'og:site_name');
    } else {
      this._removeMeta('og:site_name');
    }
  }

  private _applyTwCard(): void {
    if (this.twCard) {
      this._ensureMeta('twitter:card', 'twitter:card');
    } else {
      this._removeMeta('twitter:card');
    }
  }

  private _applyTwSite(): void {
    if (this.twSite) {
      this._ensureMeta('twitter:site', 'twitter:site');
    } else {
      this._removeMeta('twitter:site');
    }
  }

  private _applyTwCreator(): void {
    if (this.twCreator) {
      this._ensureMeta('twitter:creator', 'twitter:creator');
    } else {
      this._removeMeta('twitter:creator');
    }
  }

  private _applyTwTitle(): void {
    if (this.twTitle) {
      this._ensureMeta('twitter:title', 'twitter:title');
    } else {
      this._removeMeta('twitter:title');
    }
  }

  private _applyTwDescription(): void {
    if (this.twDescription) {
      this._ensureMeta('twitter:description', 'twitter:description');
    } else {
      this._removeMeta('twitter:description');
    }
  }

  private _applyTwImage(): void {
    if (this.twImage) {
      this._ensureMeta('twitter:image', 'twitter:image');
    } else {
      this._removeMeta('twitter:image');
    }
  }

  private _applyJsonLd(): void {
    if (this.jsonLd) {
      this._ensureJsonLd();
    } else {
      this._removeJsonLd();
    }
  }

  private _applyRobots(): void {
    if (this.robots) {
      this._ensureMeta('robots', 'robots');
    } else {
      this._removeMeta('robots');
    }
  }

  private _ensureMeta(nameAttr: string, key: string): void {
    const contentValue = this._getValueForKey(key);
    let el = this._elements.get(key) as HTMLMetaElement | null;
    if (!el) {
      el = document.head.querySelector(`meta[name="${nameAttr}"]`);
    }
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', nameAttr);
      el.setAttribute('content', contentValue);
      document.head.appendChild(el);
      this._elements.set(key, el);
    } else {
      el.setAttribute('content', contentValue);
      this._elements.set(key, el);
    }
  }

  private _ensureLink(rel: string, href: string): void {
    let el = this._elements.get(rel) as HTMLLinkElement | null;
    if (!el) {
      el = document.head.querySelector(`link[rel="${rel}"]`);
    }
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', rel);
      el.setAttribute('href', href);
      document.head.appendChild(el);
      this._elements.set(rel, el);
    } else {
      el.setAttribute('href', href);
      this._elements.set(rel, el);
    }
  }

  private _ensureJsonLd(): void {
    const key = 'json-ld';
    let el = this._elements.get(key) as HTMLScriptElement | null;
    if (!el) {
      el = document.head.querySelector('script[type="application/ld+json"]');
    }
    try {
      const parsed = JSON.parse(this.jsonLd);
      const formatted = JSON.stringify(parsed, null, 2);
      if (!el) {
        el = document.createElement('script');
        el.setAttribute('type', 'application/ld+json');
        el.textContent = formatted;
        document.head.appendChild(el);
        this._elements.set(key, el);
      } else {
        el.textContent = formatted;
        this._elements.set(key, el);
      }
    } catch {
      if (!el) {
        el = document.createElement('script');
        el.setAttribute('type', 'application/ld+json');
        el.textContent = this.jsonLd;
        document.head.appendChild(el);
        this._elements.set(key, el);
      } else {
        el.textContent = this.jsonLd;
        this._elements.set(key, el);
      }
    }
  }

  private _getValueForKey(key: string): string {
    switch (key) {
      case 'description': return this.description;
      case 'og:title': return this.ogTitle;
      case 'og:description': return this.ogDescription;
      case 'og:image': return this.ogImage;
      case 'og:url': return this.ogUrl;
      case 'og:type': return this.ogType;
      case 'og:site_name': return this.ogSiteName;
      case 'twitter:card': return this.twCard;
      case 'twitter:site': return this.twSite;
      case 'twitter:creator': return this.twCreator;
      case 'twitter:title': return this.twTitle;
      case 'twitter:description': return this.twDescription;
      case 'twitter:image': return this.twImage;
      case 'robots': return this.robots;
      default: return '';
    }
  }

  private _removeMeta(nameAttr: string): void {
    const key = nameAttr;
    const el = this._elements.get(key);
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
    this._elements.delete(key);
  }

  private _removeLink(rel: string): void {
    const el = this._elements.get(rel);
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
    this._elements.delete(rel);
  }

  private _removeJsonLd(): void {
    const el = this._elements.get('json-ld');
    if (el && el.parentNode) {
      el.parentNode.removeChild(el);
    }
    this._elements.delete('json-ld');
  }

  override render() {
    return html``;
  }
}
