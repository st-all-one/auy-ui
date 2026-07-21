import { fixture, expect, html } from '@open-wc/testing';
import './alert.js';

describe('AuyCompAlert', () => {
  it('renderiza com variante info', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-alert variant="info">Mensagem</auy-comp-alert>`);
    const alert = el.shadowRoot!.querySelector('.alert');
    expect(alert).to.exist;
    expect(alert!.classList.contains('alert--info')).to.be.true;
  });

  it('mostra título', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-alert title="Aviso">Mensagem</auy-comp-alert>`);
    const title = el.shadowRoot!.querySelector('.alert__title');
    expect(title).to.exist;
    expect(title!.textContent).to.include('Aviso');
  });

  it('dispensa ao clicar no X', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-alert open>Mensagem</auy-comp-alert>`);
    const btn = el.shadowRoot!.querySelector('.alert__dismiss') as HTMLButtonElement;
    expect(btn).to.exist;
    btn.click();
    await (el as any).updateComplete;
    expect(el.hasAttribute('open')).to.be.false;
  });

  it('auto-dispensa com timeout', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-alert open timeout="50">Mensagem</auy-comp-alert>`);
    expect(el.hasAttribute('open')).to.be.true;
    await new Promise(r => setTimeout(r, 100));
    expect(el.hasAttribute('open')).to.be.false;
  });

  it('error usa aria-live assertive', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-alert variant="error">Erro</auy-comp-alert>`);
    const alert = el.shadowRoot!.querySelector('.alert');
    expect(alert!.getAttribute('aria-live')).to.equal('assertive');
  });

  it('não mostra botão dismiss se dismissible=false', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-alert open .dismissible=${false}>Mensagem</auy-comp-alert>`);
    const btn = el.shadowRoot!.querySelector('.alert__dismiss');
    expect(btn).to.not.exist;
  });
});
