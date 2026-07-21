import { fixture, expect, html } from '@open-wc/testing';
import './badge.js';

describe('AuyCompBadge', () => {
  it('renderiza com texto', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-badge text="Novo"></auy-comp-badge>`);
    const badge = el.shadowRoot!.querySelector('[part="badge"]');
    expect(badge).to.exist;
    expect(badge!.textContent).to.include('Novo');
  });

  it('aplica variante', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-badge text="Erro" variant="error"></auy-comp-badge>`);
    const badge = el.shadowRoot!.querySelector('[part="badge"]');
    expect(badge!.getAttribute('data-badge-variant')).to.equal('error');
  });

  it('aplica outline', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-badge text="Teste" outline></auy-comp-badge>`);
    const badge = el.shadowRoot!.querySelector('[part="badge"]');
    expect(badge!.hasAttribute('data-badge-outline')).to.be.true;
  });

  it('aplica pill', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-badge text="Pill" pill></auy-comp-badge>`);
    const badge = el.shadowRoot!.querySelector('[part="badge"]');
    expect(badge!.hasAttribute('data-badge-pill')).to.be.true;
  });

  it('não define data-badge-variant para default', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-badge text="Padrão"></auy-comp-badge>`);
    const badge = el.shadowRoot!.querySelector('[part="badge"]');
    expect(badge!.hasAttribute('data-badge-variant')).to.be.false;
  });
});
