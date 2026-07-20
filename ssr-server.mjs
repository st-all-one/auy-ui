import '@lit-labs/ssr/lib/install-global-dom-shim.js';
import http from 'http';
import { render } from '@lit-labs/ssr';
import { html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import './dist/mod.js';

const page = html`
  ${unsafeHTML('<!DOCTYPE html>')}
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>auy-ui SSR Demo</title>
      <script type="importmap">
      {
        "imports": {
          "lit": "https://cdn.jsdelivr.net/npm/lit@3.2.1/+esm",
          "lit/": "https://cdn.jsdelivr.net/npm/lit@3.2.1/",
          "@lit/reactive-element": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@2.0.4/+esm",
          "@lit/reactive-element/": "https://cdn.jsdelivr.net/npm/@lit/reactive-element@2.0.4/",
          "lit-html": "https://cdn.jsdelivr.net/npm/lit-html@3.2.1/+esm",
          "lit-html/": "https://cdn.jsdelivr.net/npm/lit-html@3.2.1/",
          "lit-element": "https://cdn.jsdelivr.net/npm/lit-element@4.1.1/+esm",
          "lit-element/": "https://cdn.jsdelivr.net/npm/lit-element@4.1.1/",
          "@lit-labs/ssr-client": "https://cdn.jsdelivr.net/npm/@lit-labs/ssr-client@1.1.7/+esm",
          "@lit-labs/ssr-client/": "https://cdn.jsdelivr.net/npm/@lit-labs/ssr-client@1.1.7/",
          "auy-ui": "./dist/mod.js"
        }
      }
      </script>
      <style>
        body { font-family: system-ui, sans-serif; margin: 0; padding: 1rem; background: #f5f5f5; color: #1f2937; }
        .section { background: #fff; border-radius: 8px; padding: 1.5rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .section h2 { margin-top: 0; font-size: 1.25rem; border-bottom: 2px solid #6366f1; padding-bottom: 0.5rem; }
        .row { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }
        .grid-2 { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; }
        .note { font-size: 0.85rem; color: #6b7280; font-style: italic; margin-top: 0.5rem; }
        .fallback-demo { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.125em 0.45em; border-radius: 999px; background: #f3f4f6; font-size: 0.75rem; font-weight: 600; color: #374151; }
        pre { background: #1f2937; color: #e5e7eb; padding: 1rem; border-radius: 6px; overflow-x: auto; font-size: 0.875rem; }
      </style>
    </head>
    <body>
      <h1 style="margin-bottom: 0.25rem;">auy-ui SSR Demo</h1>
      <p class="note">This page was server-side rendered using <code>@lit-labs/ssr</code>. Components produce Declarative Shadow DOM and hydrate on the client.</p>

      <div class="section">
        <h2>Button</h2>
        <div class="row">
          <auy-internal-button variant="primary">Primary</auy-internal-button>
          <auy-internal-button variant="secondary">Secondary</auy-internal-button>
          <auy-internal-button variant="ghost">Ghost</auy-internal-button>
          <auy-internal-button loading loading-text="Aguarde...">Loading</auy-internal-button>
        </div>
      </div>

      <div class="section">
        <h2>Badge</h2>
        <div class="row">
          <auy-internal-badge variant="success">Success</auy-internal-badge>
          <auy-internal-badge variant="error">Error</auy-internal-badge>
          <auy-internal-badge variant="warning">Warning</auy-internal-badge>
          <auy-internal-badge variant="info">Info</auy-internal-badge>
          <auy-internal-badge variant="neutral">Neutral</auy-internal-badge>
          <auy-internal-badge count="42" variant="error"></auy-internal-badge>
          <auy-internal-badge count="150" max="99" variant="warning"></auy-internal-badge>
        </div>
      </div>

      <div class="section">
        <h2>Spinner</h2>
        <div class="row">
          <auy-internal-spinner size="24"></auy-internal-spinner>
          <auy-internal-spinner size="32"></auy-internal-spinner>
          <auy-internal-spinner size="48" color="var(--auy-color-success, #10b981)"></auy-internal-spinner>
        </div>
      </div>

      <div class="section">
        <h2>Card</h2>
        <div class="grid-2">
          <auy-internal-card variant="elevated">
            <div slot="title">Elevated Card</div>
            <div slot="description">This card uses the elevated variant with named slots for title, description, and footer.</div>
            <auy-internal-button slot="footer" variant="primary">Action</auy-internal-button>
          </auy-internal-card>
          <auy-internal-card variant="outlined" href="#demo">
            <div slot="title">Outlined (Link)</div>
            <div slot="description">This card is an anchor element with the outlined variant.</div>
            <auy-internal-button slot="footer" variant="secondary">Learn More</auy-internal-button>
          </auy-internal-card>
        </div>
      </div>

      <div class="section">
        <h2>App Layout</h2>
        <p class="note">Layout components using <code>querySelector</code> / <code>MutationObserver</code> render as declarative shadow DOM and become interactive after client hydration.</p>
        <auy-app-layout style="min-height: 300px; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <auy-header slot="header" style="border-bottom: 1px solid #e5e7eb; padding: 0.5rem 1rem; background: #f9fafb; display: flex; justify-content: space-between; align-items: center;">
            <strong>auy-ui App</strong>
            <auy-internal-button variant="ghost" size="sm">Login</auy-internal-button>
          </auy-header>
          <auy-sidebar slot="sidebar" style="background: #f3f4f6; padding: 1rem; width: 200px;">
            <nav style="display: flex; flex-direction: column; gap: 0.5rem;">
              <a href="#" style="text-decoration: none; color: #374151;">Dashboard</a>
              <a href="#" style="text-decoration: none; color: #374151;">Settings</a>
              <a href="#" style="text-decoration: none; color: #374151;">Profile</a>
            </nav>
          </auy-sidebar>
          <auy-main-section slot="main" style="padding: 1rem;">
            <h3>Main Content</h3>
            <p>This is the primary content area rendered inside the layout. It uses slot-based composition.</p>
            <auy-internal-button variant="primary">Get Started</auy-internal-button>
          </auy-main-section>
          <auy-footer slot="footer" style="border-top: 1px solid #e5e7eb; padding: 1rem; text-align: center; font-size: 0.875rem; color: #6b7280;">
            &copy; 2026 auy-ui &mdash; SSR rendered with @lit-labs/ssr
          </auy-footer>
        </auy-app-layout>
      </div>

      <div class="section">
        <h2>Fallback Pattern</h2>
        <p class="note">Components that depend on browser APIs unavailable during SSR are wrapped with static fallback content. Once hydrated on the client, the live component replaces the fallback.</p>
        <div class="row">
          <auy-internal-badge variant="success">SSR Component</auy-internal-badge>
          <span class="fallback-demo">Static Fallback</span>
        </div>
        <pre>${unsafeHTML(`
&lt;!-- If SSR fails for a component, provide static fallback: --&gt;
&lt;auy-internal-badge variant="warning"&gt;SSR Rendered&lt;/auy-internal-badge&gt;
&lt;noscript&gt;
  &lt;span class="fallback-demo"&gt;Fallback Content&lt;/span&gt;
&lt;/noscript&gt;
        `)}</pre>
      </div>

      <div class="section">
        <h2>Client Hydration</h2>
        <p class="note">The script below hydrates Declarative Shadow DOM on the client, attaching live shadow roots and making components interactive.</p>
        <pre>${unsafeHTML(`import 'auy-ui';
import { hydrateShadowRoots } from '@lit-labs/ssr-client/hydrate-shadow-roots.js';
hydrateShadowRoots(document.body);`)}</pre>
      </div>

      <script type="module">
        import 'auy-ui';
        import { hydrateShadowRoots } from '@lit-labs/ssr-client/hydrate-shadow-roots.js';
        hydrateShadowRoots(document.body);
        console.log('[auy-ui] Hydration complete');
      </script>
    </body>
  </html>
`;

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  try {
    for await (const chunk of render(page)) {
      res.write(chunk);
    }
  } catch (err) {
    console.error('SSR render error:', err);
    res.write(`<pre>Error during SSR: ${err.message}</pre>`);
  }
  res.end();
});

server.listen(3000, () => {
  console.log('auy-ui SSR demo server running at http://localhost:3000');
});
