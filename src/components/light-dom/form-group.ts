import { html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.base.ts';

let formGroupIdCounter = 0;

const MASK_PATTERNS: Record<string, string> = {
  cpf: '000.000.000-00',
  cnpj: '00.000.000/0000-00',
  phone: '(00) 00000-0000',
  cep: '00000-000',
  date: '00/00/0000',
};

function applyMask(raw: string, pattern: string): string {
  let result = '';
  let ri = 0;
  const digits = raw.replace(/\D/g, '');
  for (let pi = 0; pi < pattern.length && ri < digits.length; pi++) {
    if (pattern[pi] === '0') {
      result += digits[ri++];
    } else {
      result += pattern[pi];
    }
  }
  return result;
}

function stripMask(value: string): string {
  return value.replace(/\D/g, '');
}

function isValidCPF(v: string): boolean {
  const d = stripMask(v);
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false;
  let s = 0;
  for (let i = 0; i < 9; i++) s += +d[i] * (10 - i);
  let r = (s * 10) % 11;
  if (r === 10) r = 0;
  if (r !== +d[9]) return false;
  s = 0;
  for (let i = 0; i < 10; i++) s += +d[i] * (11 - i);
  r = (s * 10) % 11;
  if (r === 10) r = 0;
  return r === +d[10];
}

function isValidCNPJ(v: string): boolean {
  const d = stripMask(v);
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false;
  const w1 = [5,4,3,2,9,8,7,6,5,4,3,2];
  const w2 = [6,5,4,3,2,9,8,7,6,5,4,3,2];
  let s = 0;
  for (let i = 0; i < 12; i++) s += +d[i] * w1[i];
  let r = s % 11 < 2 ? 0 : 11 - s % 11;
  if (r !== +d[12]) return false;
  s = 0;
  for (let i = 0; i < 13; i++) s += +d[i] * w2[i];
  r = s % 11 < 2 ? 0 : 11 - s % 11;
  return r === +d[13];
}

function isValidEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

type Validator = (value: string, param?: string) => string | null;

const VALIDATORS: Record<string, Validator> = {
  required: (v) => !v.trim() ? 'Campo obrigatório' : null,
  cpf: (v) => {
    const d = stripMask(v);
    return d.length > 0 && !isValidCPF(d) ? 'CPF inválido' : null;
  },
  cnpj: (v) => {
    const d = stripMask(v);
    return d.length > 0 && !isValidCNPJ(d) ? 'CNPJ inválido' : null;
  },
  email: (v) => !!v && !isValidEmail(v) ? 'E-mail inválido' : null,
  minLength: (v, p) => v.length < +(p ?? 0) ? `Mínimo ${p} caracteres` : null,
  maxLength: (v, p) => v.length > +(p ?? 0) ? `Máximo ${p} caracteres` : null,
  pattern: (v, p) => {
    if (!p || !v) return null;
    return new RegExp(p).test(v) ? null : 'Formato inválido';
  },
  strongPassword: (v) => {
    if (!v) return null;
    const errors: string[] = [];
    if (v.length < 8) errors.push('mínimo 8 caracteres');
    if (!/[A-Z]/.test(v)) errors.push('uma letra maiúscula');
    if (!/[a-z]/.test(v)) errors.push('uma letra minúscula');
    if (!/\d/.test(v)) errors.push('um número');
    if (!/[^A-Za-z0-9]/.test(v)) errors.push('um caractere especial');
    return errors.length ? 'Requer ' + errors.join(', ') : null;
  },
};

function parseRules(rules: string): { key: string; param?: string }[] {
  return rules.split(',').map(r => r.trim()).filter(Boolean).map(r => {
    const [key, ...rest] = r.split(':');
    return { key, param: rest.join(':') || undefined };
  });
}

function findInput(root: HTMLElement): HTMLInputElement | HTMLTextAreaElement | null {
  return root.querySelector('input:not([type="hidden"]), textarea, select') ?? null;
}

const fgStyles = css`
  [data-auy-part="fg-wrap"] {
    display: block;
  }
  [data-auy-part="fg-wrap"][inline] {
    display: flex;
    align-items: flex-start;
    gap: var(--auy-space-md);
  }
  [data-auy-part="fg-wrap"][inline] [data-auy-part="label-wrap"] {
    padding-block-start: var(--auy-space-sm);
    min-inline-size: 8rem;
  }

  label {
    display: block;
    font-size: var(--auy-text-sm);
    font-weight: var(--auy-font-weight-medium);
    color: var(--auy-color-text);
    margin-block-end: var(--auy-space-2xs);
  }

  [data-auy-part="required-star"] {
    color: var(--auy-color-error);
    margin-inline-start: 0.125em;
  }

  [data-auy-part="hint"] {
    font-size: var(--auy-text-xs);
    color: var(--auy-color-text-muted);
    margin-block-start: var(--auy-space-2xs);
  }

  [data-auy-part="error"] {
    font-size: var(--auy-text-xs);
    color: var(--auy-color-error);
    margin-block-start: var(--auy-space-2xs);
    display: flex;
    align-items: center;
    gap: var(--auy-space-2xs);
  }

  slot:not([name]) {
    display: none;
  }

  @media (forced-colors: active) {
    [data-auy-part="error"] {
      border: 1px solid ButtonText;
      padding: var(--auy-space-2xs) var(--auy-space-xs);
    }
  }

  @media print {
    [data-auy-part="hint"], [data-auy-part="error"] {
      display: none;
    }
  }
`;

/** Grupo de formulário com label, validação, máscara e exibição de erros. */
@customElement('auy-comp-form-group')
export class AuyCompFormGroup extends AuyLightElement {

  // Styles rendered inline via template for Light DOM support

  /** Rótulo exibido acima do campo. */
  @property({ type: String }) label = '';
  /** Texto de ajuda exibido abaixo do campo. */
  @property({ type: String }) hint = '';
  /** Mensagem de erro exibida abaixo do campo. */
  @property({ type: String }) error = '';
  /** Torna o campo obrigatório e adiciona validação de required. */
  @property({ type: Boolean }) required = false;
  /** ID do campo associado (atribui ao input interno se vazio). */
  @property({ type: String }) for = '';
  /** Exibe label e campo lado a lado. */
  @property({ type: Boolean, reflect: true }) inline = false;

  /** Máscara de entrada (ex: cpf, cnpj, phone, cep ou pattern personalizado). */
  @property({ type: String }) mask = '';
  /** Regras de validação separadas por vírgula (ex: required,email,minLength:8). */
  @property({ type: String }) validate = '';

  private _hintId = `auy-fg-hint-${++formGroupIdCounter}`;
  private _errorId = `auy-fg-error-${formGroupIdCounter}`;

  private _input: HTMLInputElement | HTMLTextAreaElement | null = null;
  private _validationRules: { key: string; param?: string }[] = [];
  private _maskPattern = '';

  private _onInput = (e: Event) => {
    const el = e.target as HTMLInputElement;
    if (this._maskPattern) {
      const raw = el.value;
      const masked = applyMask(raw, this._maskPattern);
      if (masked !== raw) {
        const pos = el.selectionStart ?? raw.length;
        el.value = masked;
        const newPos = Math.max(pos - (raw.length - masked.length), 0);
        el.setSelectionRange(newPos, newPos);
      }
    }
    this._runValidation();
  };

  private _onBlur = () => {
    this._runValidation();
  };

  private _runValidation() {
    if (!this._input || this._validationRules.length === 0) return;
    const value = this._input.value;
    for (const rule of this._validationRules) {
      const fn = VALIDATORS[rule.key];
      if (fn) {
        const err = fn(value, rule.param);
        if (err) {
          this.error = err;
          this._input.setAttribute('aria-invalid', 'true');
          this.requestUpdate();
          return;
        }
      }
    }
    if (this.error) {
      this.error = '';
      this._input.removeAttribute('aria-invalid');
      this.requestUpdate();
    }
  }

  private _setupInput() {
    this._input = findInput(this);
    if (!this._input) return;

    this._input.removeEventListener('input', this._onInput);
    this._input.removeEventListener('blur', this._onBlur);

    this._maskPattern = MASK_PATTERNS[this.mask] ?? this.mask;

    this._validationRules = this.validate ? parseRules(this.validate) : [];
    if (this.required && !this._validationRules.some(r => r.key === 'required')) {
      this._validationRules.unshift({ key: 'required' });
    }

    if (this.for && !this._input.id) {
      this._input.id = this.for;
    }

    if (this.required) {
      this._input.toggleAttribute('required', true);
    }

    this._input.addEventListener('input', this._onInput);
    this._input.addEventListener('blur', this._onBlur);
  }

  override connectedCallback() {
    super.connectedCallback();
  }

  /** Configura o input e a validação após a primeira renderização. */
  override firstUpdated() {
    this._moveInputIntoContent();
    this._setupInput();
  }

  /** Reconfigura máscara/validação quando as propriedades mudam. */
  override updated(changed: Map<string, unknown>) {
    if (changed.has('mask') || changed.has('validate') || changed.has('required')) {
      this._setupInput();
    }
  }

  private _moveInputIntoContent() {
    const input = this.querySelector('input:not([type="hidden"]), textarea, select');
    const content = this.querySelector('[part="content"]');
    if (input && content) {
      content.insertBefore(input, content.querySelector('slot'));
    }
  }

  /** Remove os listeners de input e blur ao desconectar. */
  override disconnectedCallback() {
    if (this._input) {
      this._input.removeEventListener('input', this._onInput);
      this._input.removeEventListener('blur', this._onBlur);
    }
    super.disconnectedCallback();
  }

  override render() {
    const descIds = [this.hint ? this._hintId : '', this.error ? this._errorId : ''].filter(Boolean).join(' ');

    return html`
      <style>${fgStyles}</style>
      <div data-auy-part="fg-wrap" ?inline=${this.inline}>
        ${this.label ? html`
          <div data-auy-part="label-wrap">
            <label for=${this.for || nothing}>
              <slot name="label">${this.label}</slot>
              ${this.required ? html`<span data-auy-part="required-star" aria-hidden="true">*</span>` : nothing}
            </label>
          </div>
        ` : nothing}
        <div part="content">
          <slot
            aria-describedby=${descIds || nothing}
            aria-invalid=${this.error ? 'true' : nothing}
          ></slot>
          ${this.hint ? html`<div data-auy-part="hint" id=${this._hintId}>${this.hint}</div>` : nothing}
          ${this.error ? html`<div data-auy-part="error" id=${this._errorId} role="alert" aria-live="polite">${this.error}</div>` : nothing}
        </div>
      </div>
    `;
  }
}