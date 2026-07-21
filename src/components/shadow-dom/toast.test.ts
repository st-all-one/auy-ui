import { fixture, expect, html } from '@open-wc/testing';
import './toast.js';

describe('AuyCompToast', () => {
  it('renders variant', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-toast variant="success">Saved!</auy-comp-toast>`);
    expect(el.getAttribute('variant')).to.equal('success');
  });

  it('visible when open', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-toast open>Message</auy-comp-toast>`);
    expect(el.getAttribute('open')).to.equal('');
  });
});
