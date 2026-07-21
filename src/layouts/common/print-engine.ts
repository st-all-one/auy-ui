import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

@customElement('auy-print-engine')
export class AuyPrintEngine extends AuyLightElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      .toolbar {
        position: sticky;
        top: 0;
        z-index: 1;
        display: flex;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: var(--auy-color-surface);
        border-block-end: 1px solid var(--auy-color-border);
      }

      .toolbar button {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 0.25rem;
        background: var(--auy-color-primary);
        color: #fff;
        cursor: pointer;
        touch-action: manipulation;
        font: inherit;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }

      .toolbar button:hover {
        opacity: 0.9;
      }

      .toolbar button:active {
        opacity: 0.8;
      }

      .toolbar button:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .toolbar .info {
        margin-inline-start: auto;
        font-size: 0.8rem;
        color: var(--auy-color-text-muted);
        display: flex;
        align-items: center;
      }

      .print-area {
        position: relative;
        max-inline-size: 210mm;
        margin: 0 auto;
        padding: 15mm;
        background: #fff;
        color: #000;
        min-block-size: 297mm;
        box-shadow: var(--auy-shadow-md);
      }

      .print-area .watermark {
        position: fixed;
        inset-block-start: 50%;
        inset-inline-start: 50%;
        translate: -50% -50%;
        font-size: 80px;
        opacity: 0.04;
        color: #000;
        font-weight: 900;
        pointer-events: none;
        white-space: nowrap;
        rotate: -30deg;
        user-select: none;
      }

      .print-area .print-header {
        border-block-end: 2px solid #000;
        padding-block-end: 1rem;
        margin-block-end: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .print-area .print-content {
        position: relative;
        min-block-size: 60dvh;
      }

      .print-area .print-footer {
        border-block-start: 1px solid #ccc;
        padding-block-start: 1rem;
        margin-block-start: 2rem;
        display: flex;
        justify-content: space-between;
        font-size: 0.8rem;
        color: #666;
      }

      .print-footer .qr-code {
        display: inline-block;
        vertical-align: middle;
        inline-size: 32px;
        block-size: 32px;
      }

      .preview-mode .print-area {
        box-shadow: var(--auy-shadow-lg);
        outline: 2px solid var(--auy-color-primary);
        outline-offset: 2px;
      }

      @media print {
        .toolbar {
          display: none !important;
        }

        .print-area {
          box-shadow: none;
          padding: 0;
          max-inline-size: none;
          margin: 0;
          min-block-size: auto;
        }

        .print-area .watermark {
          opacity: 0.03;
        }

        .print-footer .qr-code {
          inline-size: 60px;
          block-size: 60px;
        }

        a[href]:after {
          content: ' (' attr(href) ')';
        }
      }

      @media (forced-colors: active) {
        .toolbar button:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        * {
          transition: none !important;
        }
      }
    }

    @page {
      size: A4;
      margin: 15mm;
    }

    @page :first {
      margin-top: 25mm;
    }
  `;

  @property({ type: String }) title = '';
  @property({ type: Boolean }) showWatermark = true;
  @property({ type: String }) watermarkText = 'CÓPIA CONTROLADA';
  @property({ type: Boolean }) showHeader = true;
  @property({ type: Boolean }) showFooter = true;
  @property({ type: Boolean }) showQR = false;

  private _originalTitle: string | null = null;

  @state() private _currentDate = new Date();
  private _dateInterval: ReturnType<typeof setInterval> | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    if (typeof window !== 'undefined') {
      this._originalTitle = document.title;
      this._dateInterval = setInterval(() => {
        this._currentDate = new Date();
      }, 30000);
    }
  }

  override disconnectedCallback(): void {
    if (typeof window !== 'undefined') {
      if (this._originalTitle !== null) {
        document.title = this._originalTitle;
        this._originalTitle = null;
      }
      if (this._dateInterval !== null) {
        clearInterval(this._dateInterval);
        this._dateInterval = null;
      }
    }
    super.disconnectedCallback();
  }

  private _print(): void {
    if (typeof window === 'undefined') return;
    if (this.title) {
      document.title = this.title;
    }
    window.print();
    if (this._originalTitle !== null) {
      document.title = this._originalTitle;
    }
  }

  private _preview(): void {
    this.classList.toggle('preview-mode');
  }

  private _renderHeader() {
    if (!this.showHeader) return '';
    return html`
      <span part="header-title">${this.title}</span>
      <span part="header-date">${this._currentDate.toLocaleDateString()}</span>
    `;
  }

  private _renderFooter() {
    if (!this.showFooter) return '';
    return html`
      <span part="footer-url">${typeof window !== 'undefined' ? window.location.href : ''}</span>
      <span part="footer-timestamp">${this._currentDate.toLocaleString()}</span>
      ${this.showQR ? html`
        <span part="footer-qr">${this._generateQR(typeof window !== 'undefined' ? window.location.href : '')}</span>
      ` : ''}
    `;
  }

  private _generateQR(_text: string) {
    const dim = 32;
    return html`
      <svg class="qr-code" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${dim} ${dim}" width="${dim}" height="${dim}" aria-hidden="true" focusable="false" role="img">
        <title>QR Code</title>
        <rect width="${dim}" height="${dim}" fill="transparent"/>
        <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-size="6" fill="#666">QR</text>
      </svg>
    `;
  }

  override render() {
    return html`
      <div part="toolbar" class="toolbar">
        <button @click=${this._print} part="btn">Imprimir</button>
        <button @click=${this._preview} part="btn">Visualizar</button>
        <span part="info" class="info">${this._currentDate.toLocaleString()}</span>
      </div>
      <div part="print-area" class="print-area">
        ${this.showWatermark ? html`<div part="watermark" class="watermark" aria-hidden="true">${this.watermarkText}</div>` : ''}
        <div part="print-header" class="print-header">${this._renderHeader()}</div>
        <div part="print-content" class="print-content">
          <slot></slot>
        </div>
        <div part="print-footer" class="print-footer">${this._renderFooter()}</div>
      </div>
    `;
  }
}
