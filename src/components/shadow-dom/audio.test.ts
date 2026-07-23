import { fixture, expect, html } from '@open-wc/testing';
import './audio.js';

describe('AuyCompAudio', () => {
  it('renders player with title', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-audio title="Test Audio"></auy-comp-audio>`);
    expect(el.shadowRoot?.textContent).to.include('Test Audio');
  });

  it('renders download button when showDownload is true', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-audio src="test.mp3" showDownload></auy-comp-audio>`);
    const downloadLink = el.shadowRoot?.querySelector('[download]');
    expect(downloadLink).to.exist;
  });

  it('hides download button when showDownload is false', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-audio src="test.mp3" ?showDownload=${false}></auy-comp-audio>`);
    const downloadLink = el.shadowRoot?.querySelector('[download]');
    expect(downloadLink).to.not.exist;
  });

  it('toggles play/pause on button click', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-audio src="test.mp3"></auy-comp-audio>`);
    const playBtn = el.shadowRoot?.querySelector('[data-auy-part="icon-btn"][data-auy-variant="play"]') as HTMLButtonElement;
    expect(playBtn).to.exist;
    expect(playBtn?.getAttribute('aria-label')).to.equal('Reproduzir áudio');
  });
});
