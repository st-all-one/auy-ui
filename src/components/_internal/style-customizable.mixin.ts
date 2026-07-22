import { LitElement, html, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T = LitElement> = new (...args: unknown[]) => T;

export const StyleCustomizableMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class StyleCustomizableElement extends superClass {
    /** CSS adicional adicionado ao FINAL do estilo nativo do componente */
    @property({ type: String, attribute: 'style-add' })
    styleAdd = '';

    /** Substituicao TOTAL do CSS interno do componente (remove estilos nativos) */
    @property({ type: String, attribute: 'style-replace' })
    styleReplace = '';

    private _customStyleApplied = false;

    override firstUpdated(changedProperties: PropertyValues): void {
      super.firstUpdated(changedProperties);
      this._applyStyleReplace();
    }

    override updated(changedProperties: PropertyValues): void {
      super.updated(changedProperties);
      if (changedProperties.has('styleReplace') && this.styleReplace) {
        this._applyStyleReplace();
      }
    }

    private _applyStyleReplace(): void {
      if (!this.styleReplace || !this.shadowRoot || this._customStyleApplied) return;

      // Remove <style> elements de `static styles` (fallback p/ browsers sem adoptedStyleSheets)
      const defaults = this.shadowRoot.querySelectorAll<HTMLStyleElement>(
        ':scope > style:not([auy-custom])',
      );
      defaults.forEach(el => el.remove());

      // Limpa adoptedStyleSheets (Lit 3 em Chrome/Edge modernos)
      if (this.shadowRoot.adoptedStyleSheets) {
        this.shadowRoot.adoptedStyleSheets = [];
      }

      this._customStyleApplied = true;
    }

    /** Renderiza o <style> customizado no template do componente */
    protected _renderCustomStyles() {
      if (this.styleAdd) {
        return html`<style auy-custom="add">${this.styleAdd}</style>`;
      }
      if (this.styleReplace) {
        return html`<style auy-custom="replace">${this.styleReplace}</style>`;
      }
      return nothing;
    }
  }

  return StyleCustomizableElement;
};
