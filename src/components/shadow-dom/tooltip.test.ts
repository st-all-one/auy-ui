import { fixture, expect, html } from '@open-wc/testing';
import './tooltip.js';

describe('AuyCompTooltip', () => {
  it('renders trigger', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-tooltip text="Dica"><button>Alvo</button></auy-comp-tooltip>`);
    const trigger = el.shadowRoot?.querySelector('[part="trigger"]');
    expect(trigger).to.exist;
  });

  it('tooltip hidden by default', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-tooltip text="Dica"><button>Alvo</button></auy-comp-tooltip>`);
    const tooltip = el.shadowRoot?.querySelector('[part="tooltip"]');
    expect(tooltip?.hasAttribute('hidden')).to.be.true;
  });

  const tick = () => new Promise(r => setTimeout(r, 0));

  it('shows tooltip with text on hover', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-tooltip text="Dica" delay="0"><button>Alvo</button></auy-comp-tooltip>`);
    const trigger = el.shadowRoot?.querySelector('[part="trigger"]');
    trigger?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await tick();
    await (el as any).updateComplete;
    const tooltip = el.shadowRoot?.querySelector('[part="tooltip"]');
    expect(tooltip?.hasAttribute('hidden')).to.be.false;
    expect(tooltip?.textContent).to.contain('Dica');
  });

  it('applies correct position class', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-tooltip text="Dica" position="bottom" delay="0"><button>Alvo</button></auy-comp-tooltip>`);
    const trigger = el.shadowRoot?.querySelector('[part="trigger"]');
    trigger?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await tick();
    await (el as any).updateComplete;
    const tooltip = el.shadowRoot?.querySelector('[part="tooltip"]');
    expect(tooltip?.classList.contains('tooltip--bottom')).to.be.true;
  });

  it('disabled does not show tooltip', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-tooltip text="Dica" disabled delay="0"><button>Alvo</button></auy-comp-tooltip>`);
    const trigger = el.shadowRoot?.querySelector('[part="trigger"]');
    trigger?.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
    await tick();
    await (el as any).updateComplete;
    const tooltip = el.shadowRoot?.querySelector('[part="tooltip"]');
    expect(tooltip?.hasAttribute('hidden')).to.be.true;
  });

  it('sets aria-describedby on trigger', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-tooltip text="Dica"><button>Alvo</button></auy-comp-tooltip>`);
    await (el as any).updateComplete;
    const button = el.querySelector('button');
    expect(button?.getAttribute('aria-describedby')).to.match(/^auy-tooltip-/);
  });
});
