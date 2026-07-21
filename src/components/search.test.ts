import { fixture, expect, html } from '@open-wc/testing';
import './search.js';

describe('AuyCompSearch', () => {
  it('renders with placeholder', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-search placeholder="Search..."></auy-comp-search>`);
    expect(el.getAttribute('placeholder')).to.equal('Search...');
  });
});
