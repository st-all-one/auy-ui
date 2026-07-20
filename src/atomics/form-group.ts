import { LitElement, html, css, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { live } from 'lit/directives/live.js';
import { maskCPF, maskCNPJ, maskPhone } from '../utils/format.js';

@customElement('auy-internal-form-group')
export class AuyInternalFormGroup extends LitElement {
  static override styles = css`
    @layer components {
      :host {
        display: block;
        contain: layout style;
      }

      :host([disabled]) {
        opacity: 0.5;
        pointer-events: none;
      }

      /* ── Label ── */
      [part='label'] {
        display: block;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        margin-block-end: 0.25rem;
        color: var(--auy-color-text);
      }

      .required {
        color: var(--auy-color-error);
        margin-inline-start: 0.125rem;
      }

      /* ── Wrapper ── */
      [part='input-wrapper'] {
        position: relative;
        display: flex;
        align-items: center;
      }

      /* ── Input base ── */
      [part='input'] {
        box-sizing: border-box;
        display: block;
        inline-size: 100%;
        padding: var(--auy-space-sm) var(--auy-space-md);
        padding-inline-end: 2.25rem;
        font-family: inherit;
        font-size: var(--auy-text-sm);
        line-height: 1.5;
        color: var(--auy-color-text);
        background: var(--auy-color-surface);
        border: 1px solid var(--auy-color-border);
        border-radius: var(--auy-radius-md);
        transition: border-color var(--auy-transition), box-shadow var(--auy-transition);
        outline: none;
        touch-action: manipulation;
      }

      [part='input']::placeholder {
        color: var(--auy-color-text-muted);
        opacity: 0.7;
      }

      /* ── Focus ── */
      [part='input']:focus-visible {
        border-color: var(--auy-color-primary);
        box-shadow: 0 0 0 0.125rem color-mix(in oklch, var(--auy-color-primary) 25%, transparent);
      }

      /* ── State-driven validation (no :user-valid/:user-invalid) ── */
      :host([data-valid]) [part='input'] {
        border-color: var(--auy-color-success);
      }

      :host([data-valid]) [part='input']:focus-visible {
        box-shadow: 0 0 0 0.125rem color-mix(in oklch, var(--auy-color-success) 25%, transparent);
      }

      :host([data-invalid]) [part='input'] {
        border-color: var(--auy-color-error);
      }

      :host([data-invalid]) [part='input']:focus-visible {
        box-shadow: 0 0 0 0.125rem color-mix(in oklch, var(--auy-color-error) 25%, transparent);
      }

      /* ── Validation icons ── */
      .icon {
        position: absolute;
        inset-inline-end: 0.5rem;
        inset-block-start: 50%;
        translate: 0 -50%;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        opacity: 0;
        transition: opacity var(--auy-transition), transform var(--auy-transition);
        transform: scale(0.8);
      }

      .icon--visible {
        opacity: 1;
        transform: scale(1);
      }

      .icon svg {
        inline-size: 1rem;
        block-size: 1rem;
      }

      .icon--success {
        color: var(--auy-color-success);
      }

      .icon--error {
        color: var(--auy-color-error);
      }

      /* ── Messages ── */
      [part='help'],
      [part='error'] {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: var(--auy-text-xs);
        margin-block-start: 0.25rem;
        overflow: hidden;
      }

      [part='help'] {
        color: var(--auy-color-text-muted);
      }

      [part='error'] {
        color: var(--auy-color-error);
      }

      /* ── Textarea ── */
      textarea[part='input'] {
        resize: vertical;
        min-block-size: 5rem;
      }

      /* ── Select ── */
      select[part='input'] {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        padding-inline-end: var(--auy-space-xl);
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3E%3Cpath fill='%236b7280' d='M4.646 5.646a.5.5 0 0 1 .708 0L8 8.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right var(--auy-space-sm) center;
        background-size: 16px;
        cursor: pointer;
        touch-action: manipulation;
      }

      @media (prefers-reduced-motion: reduce) {
        [part='input'],
        .icon {
          transition: none;
        }
      }

      @media (forced-colors: active) {
        [part='input'] {
          border: 1px solid ButtonText;
        }
        [part='input']:focus-visible {
          outline: 0.125rem solid Highlight;
          outline-offset: 0.125rem;
        }
      }

      @media print {
        [part='error'],
        [part='help'] {
          display: none;
        }
      }
    }
  `;

  @property({ type: String }) label = '';
  @property({ type: String }) name = '';
  @property({ type: String }) type: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select' = 'text';
  @property({ type: String }) value = '';
  @property({ type: String }) placeholder = '';
  @property({ type: Boolean, reflect: true }) required = false;
  @property({ type: Boolean, reflect: true }) disabled = false;
  @property({ type: Boolean, reflect: true }) readonly = false;
  @property({ type: String, reflect: true }) error = '';
  @property({ type: String }) helpText = '';
  @property({ type: Array }) options: { label: string; value: string }[] = [];
  @property({ type: Number }) maxlength = 0;
  @property({ type: String }) mask: 'phone' | 'cpf' | 'cnpj' | 'cep' | 'numbers' | '' = '';

  @state() private _charCount = 0;
  @state() private _touched = false;
  @state() private _nativeValid = false;

  private _inputEl?: HTMLInputElement | HTMLTextAreaElement;

  private _applyMask(raw: string): string {
    switch (this.mask) {
      case 'phone': return maskPhone(raw);
      case 'cpf': return maskCPF(raw);
      case 'cnpj': return maskCNPJ(raw);
      case 'cep': {
        const digits = raw.replace(/\D/g, '').slice(0, 8);
        return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
      }
      case 'numbers': return raw.replace(/\D/g, '');
      default: return raw;
    }
  }

  private handleInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    this._inputEl = target;
    if (this.mask) {
      const cursor = target.selectionStart;
      const masked = this._applyMask(target.value);
      if (masked !== target.value) {
        target.value = masked;
        if (cursor !== null) {
          target.setSelectionRange(cursor, cursor);
        }
      }
    }
    this.value = target.value;
    this._charCount = target.value.length;
    if (!this._touched) this._touched = true;
    this._validateNative(target);
    this.dispatchEvent(new CustomEvent('input', { bubbles: true, composed: true }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  private handleBlur() {
    if (!this._touched) this._touched = true;
    if (this._inputEl) this._validateNative(this._inputEl);
    if (!this.error && !this._nativeValid) {
      this.dispatchEvent(new CustomEvent('auy-validate', {
        bubbles: true,
        composed: true,
        detail: { name: this.name, value: this.value },
      }));
    }
  }

  private _validateNative(el: HTMLInputElement | HTMLTextAreaElement) {
    this._nativeValid = el.checkValidity();
    requestAnimationFrame(() => this._syncAttrs());
  }

  private _syncAttrs() {
    const hasValue = this.value.length > 0;
    const isError = !!this.error;
    const valid = !isError && this._nativeValid && hasValue;
    const invalid = isError || (!this._nativeValid && hasValue);
    this.toggleAttribute('data-valid', valid);
    this.toggleAttribute('data-invalid', invalid);
  }

  override updated(changed: Map<string, unknown>) {
    if (changed.has('error')) {
      this._syncAttrs();
    }
  }

  private _checkIcon() {
    return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  }

  private _errorIcon() {
    return html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`;
  }

  override render() {
    const label = this.label
      ? html`
          <label part="label" for="input">
            ${this.label}
            ${this.required ? html`<span class="required" aria-hidden="true">*</span>` : nothing}
          </label>
        `
      : nothing;

    const hasError = !!this.error;
    const helpTextEl = this.helpText && !hasError ? html`<div part="help" id="help">${this.helpText}</div>` : nothing;
    const errorEl = hasError ? html`<div part="error" role="alert">${this.error}</div>` : nothing;
    const describedBy = this.helpText && !hasError ? 'help' : undefined;

    let input;

    if (this.type === 'textarea') {
      input = html`
        <textarea
          part="input"
          id="input"
          name=${ifDefined(this.name || undefined)}
          placeholder=${ifDefined(this.placeholder || undefined)}
          .value=${live(this.value)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          maxlength=${this.maxlength > 0 ? this.maxlength : nothing}
          aria-invalid=${hasError ? 'true' : nothing}
          aria-describedby=${ifDefined(describedBy)}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        ></textarea>
        ${this.maxlength > 0 ? html`<div style="font-size:var(--auy-text-xs);color:var(--auy-color-text-muted);text-align:end;margin-block-start:0.125rem;">${this._charCount}/${this.maxlength}</div>` : nothing}
      `;
    } else if (this.type === 'select') {
      const opts = this.options.map(
        (o) => html`<option value=${o.value} ?selected=${o.value === this.value}>${o.label}</option>`,
      );
      input = html`
        <select
          part="input"
          id="input"
          name=${ifDefined(this.name || undefined)}
          .value=${live(this.value)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          aria-invalid=${hasError ? 'true' : nothing}
          aria-describedby=${ifDefined(describedBy)}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        >
          ${opts}
        </select>
      `;
    } else {
      const inputMode = this.mask === 'phone' ? 'tel'
        : this.mask === 'numbers' ? 'numeric'
        : this.mask === 'cep' ? 'numeric'
        : this.type === 'number' ? 'numeric'
        : this.type === 'tel' ? 'tel'
        : undefined;
      const inputPattern = this.mask === 'phone' ? '[\s\S]*'
        : this.mask === 'cpf' ? '[\s\S]*'
        : this.mask === 'numbers' ? '[0-9]*'
        : undefined;
      input = html`
        <input
          part="input"
          id="input"
          type=${this.mask === 'phone' ? 'tel' : this.mask === 'numbers' ? 'text' : this.type}
          name=${ifDefined(this.name || undefined)}
          placeholder=${ifDefined(this.placeholder || undefined)}
          .value=${live(this.value)}
          ?disabled=${this.disabled}
          ?required=${this.required}
          ?readonly=${this.readonly}
          maxlength=${this.maxlength > 0 ? this.maxlength : nothing}
          inputmode=${ifDefined(inputMode)}
          pattern=${ifDefined(inputPattern)}
          aria-invalid=${hasError ? 'true' : nothing}
          aria-describedby=${ifDefined(describedBy)}
          autocomplete=${ifDefined(this.type === 'email' ? 'email' : this.type === 'password' ? 'current-password' : undefined)}
          @input=${this.handleInput}
          @blur=${this.handleBlur}
        >
      `;
    }

    const showValid = this.hasAttribute('data-valid');
    const showInvalid = this.hasAttribute('data-invalid');

    return html`
      ${label}
      <div part="input-wrapper">
        ${input}
        <span class="icon icon--success ${showValid ? 'icon--visible' : ''}" aria-hidden="true">${this._checkIcon()}</span>
        <span class="icon icon--error ${showInvalid ? 'icon--visible' : ''}" aria-hidden="true">${this._errorIcon()}</span>
        <slot name="error-icon" part="error-icon-slot"></slot>
      </div>
      ${showInvalid ? errorEl : helpTextEl}
    `;
  }
}
