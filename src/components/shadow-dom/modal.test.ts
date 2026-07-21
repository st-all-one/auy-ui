import { fixture, expect, html } from '@open-wc/testing';
import './modal.js';
import type { AuyCompModal } from './modal.js';

describe('AuyCompModal', () => {
  it('renderiza fechado por padrão', async () => {
    const el = await fixture<AuyCompModal>(html`<auy-comp-modal></auy-comp-modal>`);
    const dialog = el.shadowRoot?.querySelector('dialog');
    expect(dialog?.hasAttribute('open')).to.be.false;
    expect(el.open).to.be.false;
  });

  it('abre com open=true', async () => {
    const el = await fixture<AuyCompModal>(html`<auy-comp-modal open></auy-comp-modal>`);
    await el.updateComplete;
    const dialog = el.shadowRoot?.querySelector('dialog');
    expect(dialog?.hasAttribute('open')).to.be.true;
    expect(el.open).to.be.true;
  });

  it('fecha ao clicar no overlay', async () => {
    const el = await fixture<AuyCompModal>(html`<auy-comp-modal open></auy-comp-modal>`);
    await el.updateComplete;
    const dialog = el.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    dialog?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('fecha com Escape', async () => {
    const el = await fixture<AuyCompModal>(html`<auy-comp-modal open></auy-comp-modal>`);
    await el.updateComplete;
    const dialog = el.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    const cancelEvent = new Event('cancel', { cancelable: true, bubbles: true });
    dialog?.dispatchEvent(cancelEvent);
    dialog?.dispatchEvent(new Event('close', { bubbles: true }));
    await el.updateComplete;
    expect(el.open).to.be.false;
  });

  it('não fecha com Escape se closeOnEscape=false', async () => {
    const el = await fixture<AuyCompModal>(html`<auy-comp-modal open></auy-comp-modal>`);
    await el.updateComplete;
    el.closeOnEscape = false;
    await el.updateComplete;
    const dialog = el.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    const cancelEvent = new Event('cancel', { cancelable: true, bubbles: true });
    dialog?.dispatchEvent(cancelEvent);
    expect(cancelEvent.defaultPrevented).to.be.true;
    expect(el.open).to.be.true;
  });

  it('não fecha no overlay se closeOnOverlay=false', async () => {
    const el = await fixture<AuyCompModal>(html`<auy-comp-modal open></auy-comp-modal>`);
    await el.updateComplete;
    el.closeOnOverlay = false;
    await el.updateComplete;
    const dialog = el.shadowRoot?.querySelector('dialog') as HTMLDialogElement;
    dialog?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await el.updateComplete;
    expect(el.open).to.be.true;
  });

  it('renderiza título', async () => {
    const el = await fixture<AuyCompModal>(html`<auy-comp-modal open title="Meu Modal"></auy-comp-modal>`);
    await el.updateComplete;
    const title = el.shadowRoot?.querySelector('.title');
    expect(title?.textContent).to.equal('Meu Modal');
  });

  it('renderiza conteúdo via slot', async () => {
    const el = await fixture<AuyCompModal>(html`<auy-comp-modal open><p>Conteúdo</p></auy-comp-modal>`);
    await el.updateComplete;
    const slot = el.shadowRoot?.querySelector('.body slot') as HTMLSlotElement | null;
    const assigned = slot?.assignedNodes({ flatten: true });
    expect(assigned?.length).to.be.greaterThan(0);
  });
});
