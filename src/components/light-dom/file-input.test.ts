import { fixture, expect, html } from '@open-wc/testing';
import './file-input.js';

describe('AuyCompFileInput (Light DOM)', () => {
  it('renders with label', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-file-input label="Upload"></auy-comp-file-input>`);
    const label = el.querySelector('[part="label"]');
    expect(label?.textContent).to.include('Upload');
  });

  it('renders dropzone', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-file-input></auy-comp-file-input>`);
    const dropzone = el.querySelector('[part="dropzone"]');
    expect(dropzone).to.exist;
  });

  it('renders native file input for form compatibility', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-file-input></auy-comp-file-input>`);
    const input = el.querySelector('input[type="file"]');
    expect(input).to.exist;
    expect(input?.closest('form')).to.be.null; // light DOM allows form association
  });

  it('accepts multiple attribute', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-file-input multiple></auy-comp-file-input>`);
    const input = el.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input?.multiple).to.be.true;
  });
});
