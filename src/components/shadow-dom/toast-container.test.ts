import { fixture, expect, html } from '@open-wc/testing';
import './toast-container.js';

describe('AuyCompToastContainer', () => {
  it('renders with position', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-toast-container position="top-right"></auy-comp-toast-container>`);
    expect(el.getAttribute('position')).to.equal('top-right');
  });
});
