import { fixture, expect, html } from '@open-wc/testing';
import './color-input.js';

describe('AuyCompColorInput', () => {
  it('renders with default value', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-color-input></auy-comp-color-input>`);
    const picker = el.shadowRoot?.querySelector('[part="picker"]');
    expect(picker).to.exist;
  });

  it('renders with custom label', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-color-input label="Cor primária"></auy-comp-color-input>`);
    const label = el.shadowRoot?.querySelector('[part="label"]');
    expect(label?.textContent).to.include('Cor primária');
  });

  it('accepts custom hex value', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-color-input value="#ff0000"></auy-comp-color-input>`);
    expect(el.getAttribute('value')).to.equal('#ff0000');
  });

  it('renders format chips', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-color-input></auy-comp-color-input>`);
    const chips = el.shadowRoot?.querySelectorAll('.format-chip');
    expect(chips?.length).to.equal(4);
  });
});
