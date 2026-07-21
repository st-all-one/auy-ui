import { fixture, expect, html } from '@open-wc/testing';
import './form-group.js';

describe('AuyCompFormGroup', () => {
  it('renders label', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-form-group label="Nome"></auy-comp-form-group>`);
    const label = el.querySelector('label');
    expect(label?.textContent).to.include('Nome');
  });

  it('shows hint text', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-form-group hint="Seu nome completo"></auy-comp-form-group>`);
    const hint = el.querySelector('.hint');
    expect(hint?.textContent).to.include('Seu nome completo');
  });

  it('shows error with role alert', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-form-group error="Campo obrigatório"></auy-comp-form-group>`);
    const error = el.querySelector('[role="alert"]');
    expect(error?.textContent).to.include('Campo obrigatório');
  });

  it('shows required asterisk', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-form-group label="Email" required></auy-comp-form-group>`);
    const star = el.querySelector('.required-star');
    expect(star).to.exist;
  });

  it('renders slotted content', async () => {
    const el = await fixture<HTMLElement>(html`
      <auy-comp-form-group label="Teste">
        <input type="text" />
      </auy-comp-form-group>
    `);
    const input = el.querySelector('input[type="text"]');
    expect(input).to.exist;
  });
});
