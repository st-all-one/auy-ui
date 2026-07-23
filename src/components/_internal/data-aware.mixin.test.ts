import { fixture, expect, html, waitUntil } from '@open-wc/testing';
import { LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { DataAwareMixin } from './data-aware.mixin.ts';

// ---------------------------------------------------------------------------
// Mock fetch: match por PATHNAME (ignora host/port)
// ---------------------------------------------------------------------------
const mockMap = new Map<string, { status: number; body: unknown }>();

function mockFetch(input: string | URL | Request, _init?: RequestInit): Promise<Response> {
  const url = typeof input === 'string' ? input
    : input instanceof URL ? input.href
    : input.url;
  const pathname = new URL(url).pathname;

  for (const [key, val] of mockMap) {
    const keyPath = new URL(key, 'http://localhost').pathname;
    if (keyPath === pathname) {
      return Promise.resolve(
        new Response(JSON.stringify(val.body), {
          status: val.status,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    }
  }
  return Promise.resolve(new Response(null, { status: 404 }));
}

// ---------------------------------------------------------------------------
// Componentes de teste
// ---------------------------------------------------------------------------
@customElement('test-data-consumer')
class TestDataConsumer extends DataAwareMixin(LitElement) {
  receivedData: unknown = null;
  fetchCount = 0;

  static override get observedDataEvents(): string[] {
    return ['custom-event'];
  }

  override render() {
    return '';
  }

  protected override _parseResponse(data: unknown): void {
    this.receivedData = data;
  }

  protected override _getDefaultParams(): URLSearchParams {
    return new URLSearchParams({ defaultParam: '1' });
  }

  override async _fetchData(extraParams?: URLSearchParams): Promise<void> {
    this.fetchCount++;
    return super._fetchData(extraParams);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'test-data-consumer': TestDataConsumer;
  }
}

@customElement('test-data-target')
class TestDataTarget extends DataAwareMixin(LitElement) {
  receivedData: unknown = null;

  override render() {
    return '';
  }

  protected override _parseResponse(data: unknown): void {
    this.receivedData = data;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'test-data-target': TestDataTarget;
  }
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
let origFetch: typeof globalThis.fetch;

describe('DataAwareMixin', () => {
  beforeEach(() => {
    mockMap.clear();
    origFetch = globalThis.fetch;
    globalThis.fetch = mockFetch as unknown as typeof globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = origFetch;
  });

  it('fetches data on connectedCallback when data-input is set', async () => {
    mockMap.set('/api/test', {
      status: 200,
      body: { data: { value: 42 }, meta: {}, error: null },
    });

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input="/api/test"></test-data-consumer>
    `);

    await waitUntil(() => el.receivedData !== null, 'data not received', { timeout: 3000 });
    expect(el.receivedData).to.deep.equal({ value: 42 });
  });

  it('sets loading state during fetch', async () => {
    let resolvePromise!: (v: unknown) => void;
    const lock = new Promise(resolve => { resolvePromise = resolve; });

    globalThis.fetch = (_input: string | URL | Request) => {
      return lock.then(() =>
        new Response(JSON.stringify({ data: 'ok', error: null }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    };

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input="/api/slow"></test-data-consumer>
    `);

    await new Promise(r => setTimeout(r, 50));
    expect(el.loading).to.be.true;
    resolvePromise('done');

    await waitUntil(() => !el.loading, 'loading not completed', { timeout: 3000 });
    expect(el.loading).to.be.false;
  });

  it('sets error state on HTTP error', async () => {
    mockMap.set('/api/error', {
      status: 500,
      body: { data: null, meta: {}, error: 'Internal Server Error' },
    });

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input="/api/error"></test-data-consumer>
    `);

    await waitUntil(() => el.error !== null, 'error not set', { timeout: 3000 });
    expect(el.error).to.include('HTTP 500');
  });

  it('sets error state when envelope contains error string', async () => {
    mockMap.set('/api/biz-error', {
      status: 200,
      body: { data: null, meta: {}, error: 'Registro nao encontrado' },
    });

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input="/api/biz-error"></test-data-consumer>
    `);

    await waitUntil(() => el.error !== null, 'error not set', { timeout: 3000 });
    expect(el.error).to.equal('Registro nao encontrado');
  });

  it('re-fetches when data-input attribute changes', async () => {
    mockMap.set('/api/first', {
      status: 200,
      body: { data: 'first', error: null },
    });
    mockMap.set('/api/second', {
      status: 200,
      body: { data: 'second', error: null },
    });

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input="/api/first"></test-data-consumer>
    `);

    await waitUntil(() => el.receivedData === 'first', 'first fetch not completed', { timeout: 3000 });

    el.setAttribute('data-input', '/api/second');
    await waitUntil(() => el.receivedData === 'second', 'second fetch not completed', { timeout: 3000 });
  });

  it('applies default params from _getDefaultParams', async () => {
    const fetchedUrls: string[] = [];
    globalThis.fetch = (input: string | URL | Request) => {
      const url = typeof input === 'string' ? input : input.url;
      fetchedUrls.push(url);
      return Promise.resolve(
        new Response(JSON.stringify({ data: 'ok', error: null }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    };

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input="/api/default-test"></test-data-consumer>
    `);

    await waitUntil(() => fetchedUrls.length > 0, 'fetch not called', { timeout: 3000 });

    const usedUrl = new URL(fetchedUrls[0]);
    expect(usedUrl.searchParams.get('defaultParam')).to.equal('1');
  });

  it('routes response to data-target element', async () => {
    mockMap.set('/api/route-test', {
      status: 200,
      body: { data: { routed: true }, meta: {}, error: null },
    });

    const container = await fixture<HTMLElement>(html`
      <div>
        <test-data-consumer data-input="/api/route-test" data-target="#target-elem"></test-data-consumer>
        <test-data-target id="target-elem"></test-data-target>
      </div>
    `);

    const target = container.querySelector('#target-elem') as TestDataTarget;
    await waitUntil(() => target.receivedData !== null, 'target not routed', { timeout: 3000 });
    expect(target.receivedData).to.deep.equal({ routed: true });
  });

  it('cancels previous fetch when data-input changes', async () => {
    let abortCount = 0;
    globalThis.fetch = (_input: string | URL | Request, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        const signal = init?.signal;
        if (signal) {
          signal.addEventListener('abort', () => {
            abortCount++;
            reject(new DOMException('Aborted', 'AbortError'));
          });
        }
      });
    };

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input="/api/abort-1"></test-data-consumer>
    `);

    await new Promise(r => setTimeout(r, 20));
    el.setAttribute('data-input', '/api/abort-2');
    await new Promise(r => setTimeout(r, 50));
    expect(abortCount).to.be.at.least(1);
  });

  it('dispatches auy:load event on successful fetch', async () => {
    mockMap.set('/api/evt', {
      status: 200,
      body: { data: { x: 1 }, meta: { total: 10 }, error: null },
    });

    let loadEvent: CustomEvent | null = null;
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer></test-data-consumer>
    `);

    el.addEventListener('auy:load', (e) => { loadEvent = e as CustomEvent; });
    el.setAttribute('data-input', '/api/evt');

    await waitUntil(() => el.receivedData !== null, 'data not received', { timeout: 3000 });
    expect(loadEvent).to.not.be.null;
    expect(loadEvent!.detail.status).to.equal('loaded');
    expect(loadEvent!.detail.data).to.deep.equal({ x: 1 });
  });

  it('dispatches auy:error event on fetch failure', async () => {
    mockMap.set('/api/err-evt', {
      status: 500,
      body: { data: null, meta: {}, error: 'fail' },
    });

    let errorEvent: CustomEvent | null = null;
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer></test-data-consumer>
    `);

    el.addEventListener('auy:error', (e) => { errorEvent = e as CustomEvent; });
    el.setAttribute('data-input', '/api/err-evt');

    await waitUntil(() => el.error !== null, 'error not set', { timeout: 3000 });
    expect(errorEvent).to.not.be.null;
    expect(errorEvent!.detail.message).to.include('HTTP 500');
  });

  it('usa POST quando data-input comeca com "POST "', async () => {
    const methodUrls: string[] = [];
    globalThis.fetch = (input: string | URL | Request, init?: RequestInit) => {
      methodUrls.push(`${init?.method ?? 'GET'} ${typeof input === 'string' ? input : input.url}`);
      return Promise.resolve(
        new Response(JSON.stringify({ data: 'ok', error: null }), { status: 200, headers: { 'Content-Type': 'application/json' } }),
      );
    };

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input="POST /api/envio"></test-data-consumer>
    `);

    await waitUntil(() => el.receivedData !== null, 'data not received', { timeout: 3000 });
    expect(methodUrls[0]).to.include('POST');
    expect(methodUrls[0]).to.include('/api/envio');
  });

  it('usa GET quando data-input comeca com "GET "', async () => {
    const methodUrls: string[] = [];
    globalThis.fetch = (input: string | URL | Request, init?: RequestInit) => {
      methodUrls.push(`${init?.method ?? 'GET'} ${typeof input === 'string' ? input : input.url}`);
      return Promise.resolve(
        new Response(JSON.stringify({ data: 'ok', error: null }), { status: 200, headers: { 'Content-Type': 'application/json' } }),
      );
    };

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input="GET /api/items"></test-data-consumer>
    `);

    await waitUntil(() => el.receivedData !== null, 'data not received', { timeout: 3000 });
    expect(methodUrls[0]).to.include('GET');
  });

  it('trata data-input sem "/" como valor inline string', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input="valor_direto"></test-data-consumer>
    `);

    await new Promise(r => setTimeout(r, 50));
    expect(el.receivedData).to.equal('valor_direto');
  });

  it('trata data-input sem "/" como valor inline JSON', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input='[{"id":1},{"id":2}]'></test-data-consumer>
    `);

    await new Promise(r => setTimeout(r, 50));
    expect(el.receivedData).to.deep.equal([{ id: 1 }, { id: 2 }]);
  });

  it('trata data-input sem "/" como valor inline JSON objeto', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input='{"chave":"valor","num":42}'></test-data-consumer>
    `);

    await new Promise(r => setTimeout(r, 50));
    expect(el.receivedData).to.deep.equal({ chave: 'valor', num: 42 });
  });

  it('data-input JSON config com url faz fetch', async () => {
    mockMap.set('/api/from-json', {
      status: 200,
      body: { data: { ok: true }, meta: {}, error: null },
    });

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-input='{"url":"/api/from-json","method":"POST"}'></test-data-consumer>
    `);

    await waitUntil(() => el.receivedData !== null, 'fetch not completed', { timeout: 3000 });
    expect(el.receivedData).to.deep.equal({ ok: true });
  });
});

describe('DataAwareMixin - data-on-*', () => {
  beforeEach(() => {
    mockMap.clear();
    origFetch = globalThis.fetch;
    globalThis.fetch = mockFetch as unknown as typeof globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = origFetch;
  });

  it('data-on-custom-event executes action on event', async () => {
    mockMap.set('/api/data-on-test', {
      status: 200,
      body: { data: { from: 'data-on' }, error: null },
    });

    const targetEl = document.createElement('test-data-target');
    targetEl.id = 'data-on-target';
    document.body.appendChild(targetEl);

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer
        data-on-custom-event="GET /api/data-on-test"
        data-on-custom-event-target="#data-on-target"
      ></test-data-consumer>
    `);

    el.dispatchEvent(new CustomEvent('custom-event', { detail: { page: 1 } }));
    await waitUntil(() => targetEl.receivedData !== null, 'data-on not executed', { timeout: 3000 });
    expect(targetEl.receivedData).to.deep.equal({ from: 'data-on' });

    document.body.removeChild(targetEl);
  });

  it('interpolates detail prop in URL template', async () => {
    const fetchedUrls: string[] = [];
    globalThis.fetch = (input: string | URL | Request) => {
      fetchedUrls.push(typeof input === 'string' ? input : input.url);
      return Promise.resolve(
        new Response(JSON.stringify({ data: 'ok', error: null }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    };

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-on-custom-event="GET /api/items/\${detail.page}"></test-data-consumer>
    `);

    el.dispatchEvent(new CustomEvent('custom-event', { detail: { page: 5 } }));
    await new Promise(r => setTimeout(r, 100));
    expect(fetchedUrls.some(u => u.includes('/api/items/5'))).to.be.true;
  });

  it('interpolates this prop in URL template', async () => {
    const fetchedUrls: string[] = [];
    globalThis.fetch = (input: string | URL | Request) => {
      fetchedUrls.push(typeof input === 'string' ? input : input.url);
      return Promise.resolve(
        new Response(JSON.stringify({ data: 'ok', error: null }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    };

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-on-custom-event="GET /api/search?q=\${this.dataInput}"></test-data-consumer>
    `);

    el.dataInput = 'my-query';
    el.dispatchEvent(new CustomEvent('custom-event', { detail: {} }));
    await new Promise(r => setTimeout(r, 100));
    expect(fetchedUrls.some(u => u.includes('my-query'))).to.be.true;
  });

  it('does not bind when no attribute set', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer></test-data-consumer>
    `);

    let eventFired = false;
    el.addEventListener('custom-event', () => { eventFired = true; });
    el.dispatchEvent(new CustomEvent('custom-event', { detail: {} }));
    expect(eventFired).to.be.true;
    // No fetch should be triggered — no error is expected
  });
});

describe('DataAwareMixin - _sendOutput', () => {
  let sentRequests: Array<{ url: string; method?: string; headers?: Record<string, string>; body?: string; credentials?: RequestCredentials }>;

  beforeEach(() => {
    sentRequests = [];
    origFetch = globalThis.fetch;
    globalThis.fetch = (input: string | URL | Request, init?: RequestInit) => {
      sentRequests.push({
        url: typeof input === 'string' ? input : input.url,
        method: init?.method as string | undefined,
        headers: init?.headers as Record<string, string> | undefined,
        body: init?.body as string | undefined,
        credentials: init?.credentials as RequestCredentials | undefined,
      });
      return Promise.resolve(
        new Response(JSON.stringify({ data: 'ok', error: null }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }),
      );
    };
  });

  afterEach(() => {
    globalThis.fetch = origFetch;
  });

  it('envia POST com URL string simples', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-output="/api/log"></test-data-consumer>
    `);

    el._sendOutput({ action: 'test', value: 42 });
    await new Promise(r => setTimeout(r, 50));

    expect(sentRequests.length).to.equal(1);
    expect(sentRequests[0].url).to.include('/api/log');
    expect(sentRequests[0].method).to.equal('POST');
    expect(sentRequests[0].credentials).to.equal('same-origin');
    expect(JSON.parse(sentRequests[0].body!)).to.deep.equal({ action: 'test', value: 42 });
  });

  it('usa POST padrao quando URL string simples', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-output="/api/log"></test-data-consumer>
    `);

    el._sendOutput({ action: 'update' });
    await new Promise(r => setTimeout(r, 50));

    expect(sentRequests[0].method).to.equal('POST');
  });

  it('aceita method via config JSON', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer
        data-output='{"url":"/api/custom","method":"PUT","headers":{"X-CSRF":"abc123"},"credentials":"include"}'
      ></test-data-consumer>
    `);

    el._sendOutput({ data: 'test' });
    await new Promise(r => setTimeout(r, 50));

    expect(sentRequests.length).to.equal(1);
    expect(sentRequests[0].url).to.include('/api/custom');
    expect(sentRequests[0].method).to.equal('PUT');
    expect(sentRequests[0].credentials).to.equal('include');
  });

  // keep the old test name but no longer uses data-output-method attribute
  it('aceita config JSON completa no atributo', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer
        data-output='{"url":"/api/custom","method":"PUT","headers":{"X-CSRF":"abc123"},"credentials":"include"}'
      ></test-data-consumer>
    `);

    el._sendOutput({ data: 'test' });
    await new Promise(r => setTimeout(r, 50));

    expect(sentRequests.length).to.equal(1);
    expect(sentRequests[0].url).to.include('/api/custom');
    expect(sentRequests[0].method).to.equal('PUT');
    expect(sentRequests[0].credentials).to.equal('include');
    expect(sentRequests[0].body).to.include('test');
  });

  it('data-output aceita "PUT /api/x"', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-output="PUT /api/atualizar"></test-data-consumer>
    `);

    el._sendOutput({ data: 'update' });
    await new Promise(r => setTimeout(r, 50));

    expect(sentRequests.length).to.equal(1);
    expect(sentRequests[0].url).to.include('/api/atualizar');
    expect(sentRequests[0].method).to.equal('PUT');
  });

  it('data-output aceita "DELETE /api/x"', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-output="DELETE /api/remove"></test-data-consumer>
    `);

    el._sendOutput({ data: 'delete' });
    await new Promise(r => setTimeout(r, 50));

    expect(sentRequests.length).to.equal(1);
    expect(sentRequests[0].method).to.equal('DELETE');
    expect(sentRequests[0].url).to.include('/api/remove');
  });

  it('data-output aceita "PATCH /api/x"', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-output="PATCH /api/patch-item"></test-data-consumer>
    `);

    el._sendOutput({ data: 'patch' });
    await new Promise(r => setTimeout(r, 50));

    expect(sentRequests.length).to.equal(1);
    expect(sentRequests[0].method).to.equal('PATCH');
    expect(sentRequests[0].url).to.include('/api/patch-item');
  });

  it('dispara auy:output-error em HTTP 4xx/5xx', async () => {
    globalThis.fetch = () => Promise.resolve(
      new Response(null, { status: 500, statusText: 'Server Error' }),
    );

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-output="/api/fail"></test-data-consumer>
    `);

    const errors: CustomEvent[] = [];
    el.addEventListener('auy:output-error', (e) => errors.push(e as CustomEvent));

    el._sendOutput({ data: 'x' });
    await new Promise(r => setTimeout(r, 50));

    expect(errors.length).to.equal(1);
    expect(errors[0].detail.error).to.include('HTTP 500');
  });

  it('dispara auy:output-error quando JSON.stringify falha', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-output="/api/log"></test-data-consumer>
    `);

    const errors: CustomEvent[] = [];
    el.addEventListener('auy:output-error', (e) => errors.push(e as CustomEvent));

    // Objeto com referência circular
    const circular: Record<string, unknown> = { a: 1 };
    circular.self = circular;
    el._sendOutput(circular);
    await new Promise(r => setTimeout(r, 50));

    expect(errors.length).to.equal(1);
    expect(errors[0].detail.error).to.include('serializar');
    expect(sentRequests.length).to.equal(0);
  });

  it('nao faz nada quando data-output esta vazio', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer></test-data-consumer>
    `);

    el._sendOutput({ data: 'x' });
    await new Promise(r => setTimeout(r, 50));

    expect(sentRequests.length).to.equal(0);
  });

  it('cancela requisicao anterior em nova chamada', async () => {
    let abortCount = 0;
    globalThis.fetch = (_input: string | URL | Request, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        const signal = init?.signal;
        if (signal) {
          signal.addEventListener('abort', () => {
            abortCount++;
            reject(new DOMException('Aborted', 'AbortError'));
          });
        }
      });
    };

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-output="/api/log"></test-data-consumer>
    `);

    el._sendOutput({ seq: 1 });
    el._sendOutput({ seq: 2 });
    await new Promise(r => setTimeout(r, 50));

    expect(abortCount).to.be.at.least(1);
  });

  it('aceita config JSON com url e method, headers opcionais', async () => {
    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer
        data-output='{"url":"/api/minimal"}'
      ></test-data-consumer>
    `);

    el._sendOutput({ ok: true });
    await new Promise(r => setTimeout(r, 50));

    expect(sentRequests.length).to.equal(1);
    expect(sentRequests[0].url).to.include('/api/minimal');
    expect(sentRequests[0].method).to.equal('POST'); // padrão
    expect(sentRequests[0].credentials).to.equal('same-origin'); // padrão
  });

  it('aborta requisicao ao desconectar', async () => {
    let abortCount = 0;
    globalThis.fetch = (_input: string | URL | Request, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        const signal = init?.signal;
        if (signal) {
          signal.addEventListener('abort', () => {
            abortCount++;
            reject(new DOMException('Aborted', 'AbortError'));
          });
        }
      });
    };

    const el = await fixture<TestDataConsumer>(html`
      <test-data-consumer data-output="/api/log"></test-data-consumer>
    `);

    el._sendOutput({ data: 'to-abort' });
    el.remove(); // disconnectedCallback → aborta
    await new Promise(r => setTimeout(r, 50));

    expect(abortCount).to.be.at.least(1);
  });
});
