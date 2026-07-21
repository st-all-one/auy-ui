import { fixture, expect, html } from '@open-wc/testing';
import './pagination.js';

describe('AuyCompPagination', () => {
  it('renders with total and per-page', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-pagination total="100" per-page="10" current="1"></auy-comp-pagination>`);
    const nav = el.shadowRoot?.querySelector('nav');
    expect(nav).to.exist;
  });

  it('disables prev button on first page', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-pagination total="100" per-page="10" current="1"></auy-comp-pagination>`);
    const buttons = el.shadowRoot?.querySelectorAll('button');
    if (buttons && buttons.length > 0) {
      expect(buttons[0].disabled).to.be.true;
    }
  });
});
