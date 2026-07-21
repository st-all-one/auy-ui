import { fixture, expect, html } from '@open-wc/testing';
import './select.js';

describe('AuyCompSelect', () => {
  const options = [
    { value: 'br', label: 'Brasil' },
    { value: 'us', label: 'Estados Unidos' },
    { value: 'pt', label: 'Portugal' },
  ];

  it('renders with placeholder', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-select .options=${options}></auy-comp-select>`);
    const trigger = el.querySelector('.trigger');
    expect(trigger?.textContent).to.include('Selecione...');
  });

  it('shows selected value', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-select .options=${options} value="br"></auy-comp-select>`);
    const trigger = el.querySelector('.trigger');
    expect(trigger?.textContent).to.include('Brasil');
  });

  it('opens dropdown on click', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-select .options=${options}></auy-comp-select>`);
    const trigger = el.querySelector('.trigger') as HTMLElement;
    trigger?.click();
    const dropdown = el.querySelector('.dropdown');
    expect(dropdown?.classList.contains('open')).to.be.true;
  });

  it('filters options with search', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-select .options=${options}></auy-comp-select>`);
    const trigger = el.querySelector('.trigger') as HTMLElement;
    trigger?.click();
    const search = el.querySelector('.search-input') as HTMLInputElement;
    if (search) {
      search.value = 'Portugal';
      search.dispatchEvent(new InputEvent('input'));
      await (el as any).updateComplete;
      const items = el.querySelectorAll('[role="option"]');
      expect(items.length).to.equal(1);
    }
  });

  it('renders without search when searchable=false', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-select .options=${options} ?searchable=${false}></auy-comp-select>`);
    const trigger = el.querySelector('.trigger') as HTMLElement;
    trigger?.click();
    const search = el.querySelector('.search-input');
    expect(search).to.not.exist;
  });

  it('renders hidden input for form compatibility', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-select name="country" .options=${options}></auy-comp-select>`);
    const hidden = el.querySelector('input[type="hidden"]') as HTMLInputElement;
    expect(hidden).to.exist;
    expect(hidden?.getAttribute('name')).to.equal('country');
  });

  it('dispatches change on selection', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-select .options=${options}></auy-comp-select>`);
    const trigger = el.querySelector('.trigger') as HTMLElement;
    trigger?.click();
    const firstOption = el.querySelector('[role="option"]') as HTMLElement;
    let changed = false;
    el.addEventListener('change', () => { changed = true; });
    firstOption?.click();
    expect(changed).to.be.true;
  });
});
