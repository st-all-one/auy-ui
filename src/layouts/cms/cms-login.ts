import { html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { AuyLightElement } from '../_internal/AuyLightElement.js';

/**
 * @slot footer - Footer content below the login form
 * @slot credits - Credits content at the bottom
 */
@customElement('auy-cms-login')
export class AuyCmsLogin extends AuyLightElement {
  @property({ type: String }) appTitle: string = 'Painel Administrativo';
  @property({ type: String }) appLogo: string = '';
  @property({ type: String, reflect: true }) error: string = '';
  @property({ type: Boolean }) loading: boolean = false;
  @property({ type: String }) csrfToken: string = '';
  @state() private _email: string = '';
  @state() private _password: string = '';

  _handleSubmit(e: Event) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('login', {
      detail: { email: this._email, password: this._password },
      bubbles: true,
      composed: true,
    }));
  }

  _onEmailInput(e: Event) {
    this._email = (e.target as HTMLInputElement).value;
  }

  _onPassInput(e: Event) {
    this._password = (e.target as HTMLInputElement).value;
  }

  static override styles = css`
    @layer components {
      :host {
        display: grid;
        place-items: center;
        min-block-size: 100dvh;
        contain: layout style;
        background: oklch(20% 0.03 260);
      }

      [part="container"] {
        inline-size: min(400px, 90vw);
      }

      [part="card"] {
        background: var(--auy-color-surface, oklch(100% 0 0));
        border-radius: var(--auy-radius-lg, 0.75rem);
        box-shadow: var(--auy-shadow-lg, 0 4px 24px oklch(0% 0 0 / 0.12));
        padding: var(--auy-space-xl, 2rem);
        opacity: 0;
        transform: translateY(0.625rem);
        transition: var(--auy-transition, 200ms ease);
      }
      @starting-style {
        [part="card"] {
          opacity: 0;
          transform: translateY(0.625rem);
        }
      }
      [part="card"] {
        opacity: 1;
        transform: translateY(0);
      }

      [part="header"] {
        text-align: center;
        margin-block-end: var(--auy-space-lg, 1.5rem);
      }

      [part="logo"] {
        max-inline-size: 120px;
        block-size: auto;
        margin-block-end: var(--auy-space-sm, 0.5rem);
      }

      [part="title"] {
        font-size: var(--auy-text-xl);
        font-weight: 600;
        margin: 0;
        color: var(--auy-color-text, oklch(15% 0.02 260));
      }

      [part="error"] {
        background: oklch(from var(--auy-color-error, oklch(50% 0.24 30)) 95% 0.02 h);
        color: var(--auy-color-error, oklch(50% 0.24 30));
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        border-radius: var(--auy-radius-md, 0.5rem);
        font-size: var(--auy-text-sm);
        margin-block-end: var(--auy-space-md, 1rem);
      }

      [part="form"] {
        display: grid;
        gap: var(--auy-space-md, 1rem);
      }

      [part="label"] {
        display: grid;
        gap: 0.25rem;
        font-size: var(--auy-text-sm);
        font-weight: 500;
        color: var(--auy-color-text, oklch(15% 0.02 260));
      }

      [part="input"] {
        inline-size: 100%;
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        border: 1px solid var(--auy-color-border, oklch(0% 0 0 / 0.12));
        border-radius: var(--auy-radius-md, 0.5rem);
        background: var(--auy-color-surface, oklch(100% 0 0));
        color: var(--auy-color-text, oklch(15% 0.02 260));
        font-size: var(--auy-text-base);
        box-sizing: border-box;
        outline: none;
        touch-action: manipulation;
      }
      [part="input"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary, oklch(45% 0.25 250));
        outline-offset: 0.125rem;
      }

      [part="submit"] {
        inline-size: 100%;
        padding: var(--auy-space-sm, 0.5rem) var(--auy-space-md, 1rem);
        background: var(--auy-color-primary, oklch(45% 0.25 250));
        color: oklch(100% 0 0);
        border: none;
        border-radius: var(--auy-radius-md, 0.5rem);
        font-size: var(--auy-text-base);
        font-weight: 500;
        cursor: pointer;
        touch-action: manipulation;
        transition: var(--auy-transition, 200ms ease);
      }
      [part="submit"]:focus-visible {
        outline: 0.125rem solid var(--auy-color-primary, oklch(45% 0.25 250));
        outline-offset: 0.125rem;
      }
      [part="submit"]:hover {
        filter: brightness(1.1);
      }
      [part="submit"]:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      [part="footer"] {
        text-align: center;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted, oklch(55% 0.02 260));
        margin-block-start: var(--auy-space-md, 1rem);
      }

      [part="credits"] {
        text-align: center;
        font-size: var(--auy-text-xs);
        color: var(--auy-color-text-muted, oklch(55% 0.02 260));
        margin-block-start: var(--auy-space-md, 1rem);
      }

      @media (forced-colors: active) {
        [part="submit"]:focus-visible,
        [part="input"]:focus-visible {
          outline: 2px solid ButtonText;
          outline-offset: 2px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        [part="card"] {
          transition: none;
        }
        [part="submit"] {
          transition: none;
        }
      }

      @media print {
        :host {
          display: none;
        }
      }
    }
  `;

  render() {
    return html`
      <div part="container">
        <div part="card">
          <div part="header">
            ${this.appLogo ? html`<img src=${this.appLogo} part="logo" alt="">` : ''}
            <h1 part="title">${this.appTitle}</h1>
          </div>
          ${this.error ? html`<div part="error" role="alert">${this.error}</div>` : ''}
          <form part="form" @submit=${this._handleSubmit}>
            <label part="label">
              Email
              <input part="input" type="email" name="email" required .value=${this._email} @input=${this._onEmailInput} autocomplete="email" placeholder="seu@email.com">
            </label>
            <label part="label">
              Senha
              <input part="input" type="password" name="password" required .value=${this._password} @input=${this._onPassInput} autocomplete="current-password" placeholder="••••••••">
            </label>
            <button part="submit" type="submit" ?disabled=${this.loading}>
              ${this.loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>
          <div part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
        <div part="credits">
          <slot name="credits"></slot>
        </div>
      </div>
    `;
  }
}
