import { fixture, expect, html } from '@open-wc/testing';
import './accordion.js';

describe('AuyCompAccordion', () => {
  it('renderiza itens', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-accordion></auy-comp-accordion>`);
    (el as any).items = [
      { id: '1', title: 'Item 1', content: 'Conteúdo 1' },
      { id: '2', title: 'Item 2', content: 'Conteúdo 2' },
    ];
    await (el as any).updateComplete;
    const summaries = el.shadowRoot!.querySelectorAll('summary');
    expect(summaries.length).to.equal(2);
    expect(summaries[0].textContent).to.include('Item 1');
  });

  it('abre e fecha item', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-accordion></auy-comp-accordion>`);
    (el as any).items = [
      { id: '1', title: 'Item 1', content: 'Conteúdo 1' },
    ];
    await (el as any).updateComplete;
    const details = el.shadowRoot!.querySelector('details')!;
    expect(details.open).to.be.false;
    details.querySelector('summary')!.click();
    await (el as any).updateComplete;
    expect(details.open).to.be.true;
    details.querySelector('summary')!.click();
    await (el as any).updateComplete;
    expect(details.open).to.be.false;
  });

  it('multiple permite vários abertos', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-accordion multiple></auy-comp-accordion>`);
    (el as any).items = [
      { id: '1', title: 'Item 1', content: 'Conteúdo 1' },
      { id: '2', title: 'Item 2', content: 'Conteúdo 2' },
    ];
    await (el as any).updateComplete;
    const allDetails = el.shadowRoot!.querySelectorAll('details');
    allDetails[0].querySelector('summary')!.click();
    allDetails[1].querySelector('summary')!.click();
    await (el as any).updateComplete;
    expect(allDetails[0].open).to.be.true;
    expect(allDetails[1].open).to.be.true;
  });

  it('fecha outros ao abrir um sem multiple', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-accordion></auy-comp-accordion>`);
    (el as any).items = [
      { id: '1', title: 'Item 1', content: 'Conteúdo 1' },
      { id: '2', title: 'Item 2', content: 'Conteúdo 2' },
    ];
    await (el as any).updateComplete;
    const allDetails = el.shadowRoot!.querySelectorAll('details');
    allDetails[0].querySelector('summary')!.click();
    await (el as any).updateComplete;
    expect(allDetails[0].open).to.be.true;
    allDetails[1].querySelector('summary')!.click();
    await (el as any).updateComplete;
    expect(allDetails[0].open).to.be.false;
    expect(allDetails[1].open).to.be.true;
  });
});
