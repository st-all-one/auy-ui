import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('auy-comp-file-input')
export class AuyCompFileInput extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      label {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text);
        margin-block-end: var(--auy-space-xs);
      }

      .dropzone {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-xl);
        border: 2px dashed var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        background: color-mix(in oklch, var(--auy-color-border) 5%, transparent);
        cursor: pointer;
        transition: border-color var(--auy-transition), background var(--auy-transition);
        touch-action: manipulation;
      }

      .dropzone:hover,
      .dropzone.dragover {
        border-color: var(--auy-color-primary);
        background: color-mix(in oklch, var(--auy-color-primary) 5%, transparent);
      }

      .dropzone:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      .icon {
        font-size: var(--auy-text-4xl);
        line-height: 1;
        opacity: 0.4;
      }

      .text {
        font-size: var(--auy-text-sm);
        color: var(--auy-color-text-muted);
        text-align: center;
      }

      .hint {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        opacity: 0.7;
      }

      input[type="file"] {
        position: absolute;
        inset: 0;
        opacity: 0;
        cursor: pointer;
      }

      .files {
        display: grid;
        gap: var(--auy-space-xs);
        margin-block-start: var(--auy-space-sm);
      }

      .file-item {
        display: flex;
        align-items: center;
        gap: var(--auy-space-sm);
        padding: var(--auy-space-xs) var(--auy-space-sm);
        border-radius: var(--auy-radius-sm);
        background: color-mix(in oklch, var(--auy-color-border) 10%, transparent);
        font-size: var(--auy-text-sm);
      }

      .file-preview {
        inline-size: 2rem; block-size: 2rem; border-radius: var(--auy-radius-sm);
        object-fit: cover; flex-shrink: 0;
      }

      .file-name {
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .file-size {
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted);
        flex-shrink: 0;
      }

      .remove {
        all: unset;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        inline-size: 1.25rem;
        block-size: 1.25rem;
        border-radius: var(--auy-radius-sm);
        cursor: pointer;
        font-size: var(--auy-text-base);
        line-height: 1;
        opacity: 0.5;
        transition: opacity var(--auy-transition-fast);
        touch-action: manipulation;
        flex-shrink: 0;
      }

      .remove:hover {
        opacity: 1;
      }

      .remove:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary);
        outline-offset: 0.125rem;
      }

      @media (forced-colors: active) {
        .dropzone {
          border: 2px solid ButtonText;
        }
        .dropzone:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
        .remove:focus-visible {
          outline: 2px solid Highlight;
          outline-offset: 2px;
        }
      }

      @media print {
        .file-item {
          display: none;
        }
      }
    }
  `;

  static override shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  @property({ type: String }) label = '';
  @property({ type: Boolean }) multiple = false;
  @property({ type: String }) accept = '';
  @property({ type: Number }) maxSize = 5 * 1024 * 1024;
  @property({ type: String }) action = '';
  @property({ type: String }) headers = '';
  @property({ type: Number }) chunkSize = 0;

  @state() private _files: File[] = [];
  private _previewUrls: string[] = [];
  @state() private _dragover = false;

  private _handleChange(e: Event) {
    const input = e.target as HTMLInputElement;
    if (input.files) {
      this._addFiles(Array.from(input.files));
    }
    input.value = '';
  }

  private _handleDrop(e: DragEvent) {
    e.preventDefault();
    this._dragover = false;
    if (e.dataTransfer?.files) {
      this._addFiles(Array.from(e.dataTransfer.files));
    }
  }

  private _addFiles(newFiles: File[]) {
    const filtered = newFiles.filter(f => f.size <= this.maxSize);
    this._previewUrls.forEach(u => this._revokeUrl(u));
    this._previewUrls = [];

    if (this.multiple) {
      this._files = [...this._files, ...filtered];
    } else {
      this._files = filtered.slice(0, 1);
    }

    this._previewUrls = this._files.map(f => {
      if (f.type.startsWith('image/')) {
        return this._getFileUrl(f);
      }
      return '';
    });

    this._dispatchChange();
  }

  private _removeFile(index: number) {
    if (this._previewUrls[index]) this._revokeUrl(this._previewUrls[index]);
    this._previewUrls = this._previewUrls.filter((_, i) => i !== index);
    this._files = this._files.filter((_, i) => i !== index);
    this._dispatchChange();
  }

  private _dispatchChange() {
    this.dispatchEvent(new CustomEvent('change', {
      detail: { files: this._files },
      bubbles: true,
      composed: true,
    }));
  }

  private _formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  private _getFileUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  private _revokeUrl(url: string) {
    URL.revokeObjectURL(url);
  }

  async upload(): Promise<Response | null> {
    if (this._files.length === 0 || !this.action) return null;

    const formData = new FormData();
    for (const file of this._files) {
      formData.append('files', file);
    }

    const headersObj: Record<string, string> = {};
    if (this.headers) {
      try { Object.assign(headersObj, JSON.parse(this.headers)); } catch { /* ignore */ }
    }

    try {
      const res = await fetch(this.action, {
        method: 'POST',
        headers: headersObj,
        body: formData,
      });

      this.dispatchEvent(new CustomEvent('upload-complete', {
        detail: { response: res, ok: res.ok },
        bubbles: true, composed: true,
      }));

      return res;
    } catch (err) {
      this.dispatchEvent(new CustomEvent('upload-error', {
        detail: { error: err },
        bubbles: true, composed: true,
      }));
      return null;
    }
  }

  get files(): File[] {
    return this._files;
  }

  clear() {
    this._previewUrls.forEach(u => this._revokeUrl(u));
    this._previewUrls = [];
    this._files = [];
    this._dispatchChange();
  }

  override render() {
    return html`
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div
        part="dropzone"
        class="dropzone ${this._dragover ? 'dragover' : ''}"
        @dragover=${(e: DragEvent) => { e.preventDefault(); this._dragover = true; }}
        @dragleave=${() => { this._dragover = false; }}
        @drop=${this._handleDrop}
      >
        <div part="icon" class="icon" aria-hidden="true">📄</div>
        <div part="text" class="text">Arraste arquivos aqui ou clique para selecionar</div>
        <div part="hint" class="hint">${this.accept ? `Formatos: ${this.accept}` : ''}${this.maxSize ? `${this.accept ? ' · ' : ''}Max: ${this._formatSize(this.maxSize)}` : ''}</div>
        <input
          type="file"
          ?multiple=${this.multiple}
          accept=${this.accept || nothing}
          @change=${this._handleChange}
          aria-label=${this.label || 'Selecionar arquivo'}
        />
      </div>
      ${this._files.length > 0 ? html`
        <div part="files" class="files">
          ${this._files.map((f, i) => html`
            <div part="file-item" class="file-item">
              ${this._previewUrls[i] ? html`<img part="file-preview" class="file-preview" src=${this._previewUrls[i]} alt="">` : nothing}
              <span part="file-name" class="file-name">${f.name}</span>
              <span part="file-size" class="file-size">${this._formatSize(f.size)}</span>
              <button part="remove" class="remove" @click=${() => this._removeFile(i)} aria-label="Remover ${f.name}">&times;</button>
            </div>
          `)}
        </div>
      ` : nothing}
    `;
  }
}
