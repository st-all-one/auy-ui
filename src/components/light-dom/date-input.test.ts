import { fixture, expect, html } from '@open-wc/testing';
import './date-input.js';

describe('AuyCompDateInput (Light DOM)', () => {
  it('renderiza com label', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-date-input label="Data de nascimento"></auy-comp-date-input>`);
    const label = el.querySelector('label');
    expect(label).to.exist;
    expect(label?.textContent).to.include('Data de nascimento');
  });

  it('aceita valor', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-date-input value="2024-01-15"></auy-comp-date-input>`);
    const input = el.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input?.value).to.equal('2024-01-15');
  });

  it('desabilitado', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-date-input disabled></auy-comp-date-input>`);
    const input = el.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input?.disabled).to.be.true;
  });

  it('required', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-date-input required></auy-comp-date-input>`);
    const input = el.querySelector('input[type="date"]') as HTMLInputElement;
    expect(input?.required).to.be.true;
  });
});
