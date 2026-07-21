import { fixture, expect, html } from '@open-wc/testing';
import './metadata.js';

describe('AuyCompMetadata', () => {
  it('sets document title', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-metadata title="Test Page"></auy-comp-metadata>`);
    await (el as any).updateComplete;
    expect(document.title).to.equal('Test Page');
  });

  it('sets meta description', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-metadata description="A test page"></auy-comp-metadata>`);
    await (el as any).updateComplete;
    const meta = document.head.querySelector('meta[name="description"]');
    expect(meta?.getAttribute('content')).to.equal('A test page');
  });

  it('updates title reactively', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-metadata title="Initial"></auy-comp-metadata>`);
    await (el as any).updateComplete;
    (el as any).title = 'Updated';
    await (el as any).updateComplete;
    expect(document.title).to.equal('Updated');
  });
});
