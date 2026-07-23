import { fixture, expect, html } from '@open-wc/testing';
import './code-editor.js';

describe('AuyCompCodeEditor', () => {
  it('renders with textarea', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-code-editor></auy-comp-code-editor>`);
    const textarea = el.shadowRoot?.querySelector('textarea');
    expect(textarea).to.exist;
  });

  it('renders with initial value', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-code-editor value="console.log('hello')"></auy-comp-code-editor>`);
    const textarea = el.shadowRoot?.querySelector('textarea') as HTMLTextAreaElement;
    expect(textarea?.value).to.equal("console.log('hello')");
  });

  it('shows line numbers by default', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-code-editor></auy-comp-code-editor>`);
    const gutter = el.shadowRoot?.querySelector('[data-auy-part="gutter"]');
    expect(gutter).to.exist;
  });

  it('hides line numbers when disabled', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-code-editor ?lineNumbers=${false}></auy-comp-code-editor>`);
    const gutter = el.shadowRoot?.querySelector('[data-auy-part="gutter"]');
    expect(gutter).to.not.exist;
  });
});
