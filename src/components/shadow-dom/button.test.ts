import { fixture, expect, html } from '@open-wc/testing';
import './button.js';

describe('AuyCompButton', () => {
  it('renders with default text', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-button>Clique aqui</auy-comp-button>`);
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn).to.exist;
    expect(el.textContent!.trim()).to.equal('Clique aqui');
  });

  it('applies correct variant', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-button variant="error">Erro</auy-comp-button>`);
    const btn = el.shadowRoot!.querySelector('.btn--error')!;
    expect(btn).to.exist;
  });

  it('shows loading state with aria-busy', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-button loading>Enviando</auy-comp-button>`);
    const btn = el.shadowRoot!.querySelector('button')!;
    expect(btn.getAttribute('aria-busy')).to.equal('true');
    expect(btn.hasAttribute('disabled')).to.be.true;
  });

  it('disables click when loading', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-button loading>Enviando</auy-comp-button>`);
    const btn = el.shadowRoot!.querySelector('button')!;
    let clicked = false;
    el.addEventListener('click', () => { clicked = true; });
    btn.click();
    expect(clicked).to.be.false;
  });

  it('renders as link when href is set', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-button href="/teste">Link</auy-comp-button>`);
    const link = el.shadowRoot!.querySelector('a')!;
    expect(link).to.exist;
    expect(link.getAttribute('href')).to.equal('/teste');
  });

  it('applies sizes', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-button size="lg">Grande</auy-comp-button>`);
    const btn = el.shadowRoot!.querySelector('.btn--lg')!;
    expect(btn).to.exist;
  });
});
