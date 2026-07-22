import { fixture, expect, html } from '@open-wc/testing';
import { LitElement, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { StyleCustomizableMixin } from './style-customizable.mixin.ts';

@customElement('test-style-consumer')
class TestStyleConsumer extends StyleCustomizableMixin(LitElement) {
  static override styles = css`
    .native { color: red; font-weight: bold; }
    .extra { color: gray; }
  `;

  override render() {
    return html`
      ${this._renderCustomStyles()}
      <span class="native">texto</span>
      <span class="extra">extra</span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'test-style-consumer': TestStyleConsumer;
  }
}

describe('StyleCustomizableMixin', () => {
  it('renders style-add element in shadow root', async () => {
    const el = await fixture<TestStyleConsumer>(html`
      <test-style-consumer style-add=".extra { color: blue; }"></test-style-consumer>
    `);

    const customStyles = el.shadowRoot?.querySelectorAll('style[auy-custom="add"]');
    expect(customStyles?.length).to.equal(1);
    expect(customStyles?.[0].textContent).to.include('color: blue');
  });

  it('renders style-replace element in shadow root', async () => {
    const el = await fixture<TestStyleConsumer>(html`
      <test-style-consumer style-replace=".native { color: green; }"></test-style-consumer>
    `);

    const replaceStyles = el.shadowRoot?.querySelectorAll('style[auy-custom="replace"]');
    expect(replaceStyles?.length).to.equal(1);
    expect(replaceStyles?.[0].textContent).to.include('color: green');
  });

  it('removes default style elements when style-replace is set', async () => {
    const el = await fixture<TestStyleConsumer>(html`
      <test-style-consumer style-replace=".native { color: green; }"></test-style-consumer>
    `);

    await el.updateComplete;

    // Nao deve haver <style> sem auy-custom (adoptedStyleSheets sao limpos,
    // e <style> elements de fallback sao removidos)
    const defaultStyles = el.shadowRoot?.querySelectorAll(
      ':scope > style:not([auy-custom])',
    );
    expect(defaultStyles?.length).to.equal(0);

    // Mas o <style> com auy-custom deve existir
    const customStyles = el.shadowRoot?.querySelectorAll('style[auy-custom]');
    expect(customStyles?.length).to.equal(1);
  });

  it('keeps default styles when style-add is set', async () => {
    const el = await fixture<TestStyleConsumer>(html`
      <test-style-consumer style-add=".extra { color: blue; }"></test-style-consumer>
    `);

    await el.updateComplete;

    // style-add nao remove nada — adoptedStyleSheets continuam intactos
    const customAdd = el.shadowRoot?.querySelector('style[auy-custom="add"]');
    expect(customAdd).to.exist;
    expect(customAdd?.textContent).to.include('color: blue');
  });

  it('renders no extra style elements when no attributes set', async () => {
    const el = await fixture<TestStyleConsumer>(html`
      <test-style-consumer></test-style-consumer>
    `);

    const customStyles = el.shadowRoot?.querySelectorAll('style[auy-custom]');
    expect(customStyles?.length).to.equal(0);
  });

  it('style-add element comes after native styles in render order', async () => {
    const el = await fixture<TestStyleConsumer>(html`
      <test-style-consumer style-add=".native { color: blue; }"></test-style-consumer>
    `);

    const allStyles = el.shadowRoot?.querySelectorAll('style');
    expect(allStyles).to.exist;
    const styles = Array.from(allStyles!);

    // O ultimo <style> deve ser o auy-custom
    const lastStyle = styles[styles.length - 1];
    expect(lastStyle.getAttribute('auy-custom')).to.equal('add');
  });
});
