import { fixture, expect, html } from '@open-wc/testing';
import './tabs.js';

describe('AuyCompTabs', () => {
  it('renders with tabs property', async () => {
    const el = await fixture<HTMLElement>(html`<auy-comp-tabs></auy-comp-tabs>`);
    (el as any).tabs = [{ id: 'tab1', label: 'First' }, { id: 'tab2', label: 'Second' }];
    await (el as any).updateComplete;
    const buttons = el.shadowRoot?.querySelectorAll('[role="tab"]');
    expect(buttons?.length).to.equal(2);
  });
});
