import { LitElement, html, css, nothing } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, state } from 'lit/decorators.js';
import { DataAwareMixin } from '../_internal/data-aware.mixin.ts';

const FILE_ICONS: Record<string, string> = {
  pdf: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="11" x2="12" y2="11"/></svg>',
  image: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
  zip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8l6 6v6"/><path d="M21 15v4a2 2 0 0 1-2 2h-2"/><polyline points="17 11 19 13 21 11"/><polyline points="17 17 19 19 21 17"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
  word: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/><line x1="7" y1="9" x2="9.5" y2="9"/></svg>',
  sheet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/><line x1="8" y1="9" x2="10" y2="9"/></svg>',
  audio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/></svg>',
  file: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>',
};

function getFileIcon(name: string, type: string): string {
  if (type.startsWith('image/')) return FILE_ICONS.image;
  if (type.startsWith('audio/')) return FILE_ICONS.audio;
  if (type.startsWith('video/')) return FILE_ICONS.video;
  const ext = name.split('.').pop()?.toLowerCase() ?? '';
  if (['zip','rar','7z','tar','gz'].includes(ext)) return FILE_ICONS.zip;
  if (['pdf'].includes(ext)) return FILE_ICONS.pdf;
  if (['doc','docx','odt','rtf'].includes(ext)) return FILE_ICONS.word;
  if (['xls','xlsx','csv','ods'].includes(ext)) return FILE_ICONS.sheet;
  if (['js','ts','jsx','tsx','py','java','c','cpp','h','css','html','php','rb','go','rs','swift','kt','sql','sh','yaml','json','xml','md'].includes(ext)) return FILE_ICONS.code;
  return FILE_ICONS.file;
}

const fiStyles = css`
  label {
    display: block;
    font-size: var(--auy-text-sm);
    font-weight: var(--auy-font-weight-medium);
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
    padding: var(--auy-space-lg);
    border: 2px dashed var(--auy-color-border);
    border-radius: var(--auy-radius-md);
    background: color-mix(in oklch, var(--auy-color-border) 5%, transparent);
    cursor: pointer;
    transition: border-color var(--auy-transition), background var(--auy-transition);
    touch-action: manipulation;
    min-block-size: 8rem;
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

  .dropzone.has-files {
    padding: var(--auy-space-md);
    align-items: stretch;
  }

  .empty-icon { font-size: var(--auy-text-4xl); line-height: 1; opacity: 0.4; }

  .empty-text { font-size: var(--auy-text-sm); color: var(--auy-color-text-muted); text-align: center; }

  .hint { font-size: var(--auy-text-xs); color: var(--auy-color-text-muted); opacity: 0.7; }

  input[type="file"] {
    position: absolute; inset: 0; opacity: 0; cursor: pointer;
  }

  .file-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
    gap: var(--auy-space-sm);
    inline-size: 100%;
  }

  .file-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--auy-space-2xs);
    padding: var(--auy-space-sm) var(--auy-space-xs);
    border-radius: var(--auy-radius-sm);
    background: color-mix(in oklch, var(--auy-color-border) 10%, transparent);
    position: relative;
    min-inline-size: 0;
  }

  .file-card:hover {
    background: color-mix(in oklch, var(--auy-color-border) 18%, transparent);
  }

  .file-card-thumb {
    inline-size: 3rem;
    block-size: 3rem;
    border-radius: var(--auy-radius-sm);
    object-fit: cover;
    flex-shrink: 0;
    background: color-mix(in oklch, var(--auy-color-border) 8%, transparent);
  }

  .file-card-icon {
    inline-size: 2.5rem;
    block-size: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--auy-color-text-muted);
  }

  .file-card-icon svg {
    inline-size: 100%;
    block-size: 100%;
  }

  .file-card-name {
    font-size: var(--auy-text-xs);
    color: var(--auy-color-text);
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-inline-size: 100%;
    line-height: 1.3;
  }

  .file-card-size {
    font-size: var(--auy-text-2xs);
    color: var(--auy-color-text-muted);
    opacity: 0.7;
  }

  .file-card-remove {
    all: unset;
    position: absolute;
    inset-block-start: 0.125rem;
    inset-inline-end: 0.125rem;
    inline-size: 2rem;
    block-size: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--auy-radius-full);
    background: color-mix(in oklch, var(--auy-color-border) 40%, transparent);
    cursor: pointer;
    font-size: var(--auy-text-sm);
    line-height: 1;
    color: var(--auy-color-text-muted);
    opacity: 0;
    transition: opacity var(--auy-transition-fast), background var(--auy-transition-fast);
    touch-action: manipulation;
  }

  .file-card:hover .file-card-remove,
  .file-card-remove:focus-visible {
    opacity: 1;
  }

  .file-card-remove:hover {
    background: var(--auy-color-error);
    color: oklch(100% 0 0);
  }

  .file-card-remove:focus-visible {
    outline: 0.125rem solid var(--auy-color-primary);
    outline-offset: 0.125rem;
    opacity: 1;
  }

  .add-more {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--auy-space-2xs);
    padding: var(--auy-space-sm) var(--auy-space-xs);
    border-radius: var(--auy-radius-sm);
    border: 1px dashed var(--auy-color-border);
    color: var(--auy-color-text-muted);
    font-size: var(--auy-text-xs);
    min-block-size: 6rem;
    cursor: pointer;
    transition: border-color var(--auy-transition), background var(--auy-transition);
  }
  .add-more:hover {
    border-color: var(--auy-color-primary);
    background: color-mix(in oklch, var(--auy-color-primary) 4%, transparent);
  }

  .add-more-icon {
    inline-size: 1.5rem;
    block-size: 1.5rem;
    opacity: 0.5;
  }
  .add-more-icon svg { inline-size: 100%; block-size: 100%; }

  @media (forced-colors: active) {
    .dropzone { border: 2px solid ButtonText; }
    .dropzone:focus-visible { outline: 2px solid Highlight; outline-offset: 2px; }
    .file-card-remove:focus-visible { outline: 2px solid Highlight; outline-offset: 2px; }
  }
  @media print { .file-card { display: none; } }
`;

/** Componente de upload de arquivos com drag-and-drop, preview e envio. */
@customElement('auy-comp-file-input')
export class AuyCompFileInput extends DataAwareMixin(LitElement) {
  static override get observedDataEvents(): string[] {
    return ['change', 'upload-complete', 'upload-error']
  }

  override createRenderRoot() {
    return this;
  }

  /** Rótulo do campo de upload. */
  @property({ type: String }) label = '';
  /** Permite selecionar múltiplos arquivos. */
  @property({ type: Boolean }) multiple = false;
  /** Tipos de arquivo aceitos (atributo accept do input). */
  @property({ type: String }) accept = '';
  /** Tamanho máximo por arquivo em bytes. */
  @property({ type: Number }) maxSize = 5 * 1024 * 1024;
  /** URL de destino para o upload via fetch. */
  @property({ type: String }) action = '';
  /** Headers adicionais para a requisição de upload em JSON. */
  @property({ type: String }) headers = '';
  /** Tamanho do chunk para upload particionado (0 = desabilitado). */
  @property({ type: Number }) chunkSize = 0;

  protected override _parseResponse(data: unknown): void {
    const d = data as Record<string, unknown>
    if (d.action) this.action = String(d.action)
    if (d.accept) this.accept = String(d.accept)
    if (d.maxSize !== undefined) this.maxSize = Number(d.maxSize)
    if (d.headers) this.headers = String(d.headers)
  }

  @state() private _files: File[] = [];
  private _previewUrls: string[] = [];
  @state() private _dragover = false;

  get files(): File[] {
    return this._files;
  }

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

  /** Limpa todos os arquivos selecionados e revoga as URLs de preview. */
  clear() {
    this._previewUrls.forEach(u => this._revokeUrl(u));
    this._previewUrls = [];
    this._files = [];
    this._dispatchChange();
  }

  /** Envia os arquivos via fetch para a URL definida em `action`. */
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

  private _renderFilePreview(f: File, i: number) {
    if (this._previewUrls[i]) {
      return html`<img class="file-card-thumb" src=${this._previewUrls[i]} alt="" />`;
    }
    return html`
      <div class="file-card-icon">${unsafeHTML(getFileIcon(f.name, f.type))}</div>
    `;
  }

  override render() {
    const hasFiles = this._files.length > 0;

    return html`
      <style>${fiStyles}</style>
      ${this.label ? html`<label part="label">${this.label}</label>` : nothing}
      <div
        part="dropzone"
        class="dropzone ${this._dragover ? 'dragover' : ''} ${hasFiles ? 'has-files' : ''}"
        @dragover=${(e: DragEvent) => { e.preventDefault(); this._dragover = true; }}
        @dragleave=${() => { this._dragover = false; }}
        @drop=${this._handleDrop}
      >
        ${hasFiles ? html`
          <div class="file-grid">
            ${this._files.map((f, i) => html`
              <div class="file-card">
                ${this._renderFilePreview(f, i)}
                <span class="file-card-name" title=${f.name}>${f.name}</span>
                <span class="file-card-size">${this._formatSize(f.size)}</span>
                <button class="file-card-remove" @click=${(e: Event) => { e.stopPropagation(); this._removeFile(i); }} aria-label="Remover ${f.name}">&times;</button>
              </div>
            `)}
            ${this.multiple ? html`
              <div class="add-more">
                <div class="add-more-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </div>
                <span>Adicionar mais</span>
              </div>
            ` : nothing}
          </div>
        ` : html`
          <div class="empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="inline-size:2rem;block-size:2rem;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          </div>
          <div class="empty-text">Arraste arquivos aqui ou clique para selecionar</div>
        `}
        <div class="hint">${this.accept ? `Formatos: ${this.accept}` : ''}${this.maxSize && !this.accept ? `Tamanho máximo: ${this._formatSize(this.maxSize)}` : ''}${this.maxSize && this.accept ? ` · Máx: ${this._formatSize(this.maxSize)}` : ''}</div>
        <input
          type="file"
          ?multiple=${this.multiple}
          accept=${this.accept || nothing}
          @change=${this._handleChange}
          aria-label=${this.label || 'Selecionar arquivo'}
        />
      </div>
    `;
  }
}