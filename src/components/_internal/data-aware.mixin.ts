import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

export interface DataEnvelope<T = unknown> {
  data: T;
  meta?: Record<string, unknown>;
  error?: string | null;
}

export interface DataAwareInterface {
  dataInput: string;
  dataMethod: string;
  dataTarget: string;
  loading: boolean;
  error: string | null;
  _fetchData(extraParams?: URLSearchParams): Promise<void>;
  _parseResponse(data: unknown): void;
}

type Constructor<T = LitElement> = new (...args: any[]) => T;

export const DataAwareMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class DataAwareElement extends superClass {
    static _requestCache = new Map<string, { data: DataEnvelope; expires: number }>();

    @property({ type: String, attribute: 'data-input', reflect: true })
    dataInput = '';

    @property({ type: String, attribute: 'data-method', reflect: true })
    dataMethod = 'GET';

    @property({ type: String, attribute: 'data-target', reflect: true })
    dataTarget = '';

    @property({ type: Boolean, reflect: true })
    loading = false;

    @property({ type: String, reflect: true })
    error: string | null = null;

    private _abortController: AbortController | null = null;
    private _dataActionController: AbortController | null = null;
    private _initialDataFetched = false;

    override connectedCallback(): void {
      super.connectedCallback();
      this.#connectEventBindings();
    }

    override disconnectedCallback(): void {
      this._abortController?.abort();
      this._dataActionController?.abort();
      super.disconnectedCallback();
    }

    override updated(changedProperties: Map<string, unknown>): void {
      super.updated(changedProperties);
      if (changedProperties.has('dataInput') && this.dataInput && !this._initialDataFetched) {
        this._initialDataFetched = true;
        this._fetchData();
      } else if (changedProperties.has('dataInput') && this.dataInput && (this as unknown as { hasUpdated: boolean }).hasUpdated) {
        this._fetchData();
      }
    }

    protected _getDefaultParams(): URLSearchParams {
      return new URLSearchParams();
    }

    protected _parseResponse(_data: unknown): void {
    }

    protected _applyMeta(_meta: Record<string, unknown>): void {
    }

    static get observedDataEvents(): string[] {
      return [];
    }

    async _fetchData(extraParams?: URLSearchParams): Promise<void> {
      this._abortController?.abort();
      this._abortController = new AbortController();

      this.loading = true;
      this.error = null;

      this.dispatchEvent(new CustomEvent('auy:load', {
        detail: { status: 'loading' },
        bubbles: true,
        composed: true,
      }));

      try {
        const url = new URL(this.dataInput, window.location.origin);

        const defaults = this._getDefaultParams();
        defaults.forEach((v, k) => {
          if (!url.searchParams.has(k)) url.searchParams.set(k, v);
        });
        if (extraParams) {
          extraParams.forEach((v, k) => url.searchParams.set(k, v));
        }

        const method = this.dataMethod.toUpperCase();

        const timeout = Number(this.getAttribute('data-fetch-timeout') || 15000);
        const timeoutSignal = typeof AbortSignal.timeout === 'function'
          ? AbortSignal.timeout(timeout)
          : null;
        const signal = timeoutSignal
          ? AbortSignal.any([this._abortController.signal, timeoutSignal])
          : this._abortController.signal;

        const headers: Record<string, string> = {
          Accept: 'application/json',
        };
        const contentType = this.getAttribute('data-content-type');
        if (contentType) headers['Content-Type'] = contentType;
        if (method !== 'GET' && method !== 'HEAD' && !contentType) {
          headers['Content-Type'] = 'application/json';
        }

        const customHeaders = this.getAttribute('data-headers');
        if (customHeaders) {
          try {
            Object.assign(headers, JSON.parse(customHeaders));
          } catch {
          }
        }

        const fetchOptions: RequestInit = { method, signal, headers };

        if (method !== 'GET' && method !== 'HEAD') {
          const bodyAttr = this.getAttribute('data-body');
          if (bodyAttr) {
            fetchOptions.body = bodyAttr;
          } else if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            fetchOptions.body = '{}';
          }
        }

        const cacheTTL = Number(this.getAttribute('data-cache-ttl') || 0);
        const cacheKey = method + ':' + url.toString();
        if (cacheTTL > 0 && method === 'GET') {
          const cached = DataAwareElement._requestCache.get(cacheKey);
          if (cached && cached.expires > Date.now()) {
            const env = cached.data;
            this._parseResponse(env.data);
            if (env.meta) this._applyMeta(env.meta);
            this.loading = false;
            this.dispatchEvent(new CustomEvent('auy:load', {
              detail: { status: 'loaded', data: env.data, meta: env.meta },
              bubbles: true, composed: true,
            }));
            if (this.dataTarget) this.#routeToTarget(env.data);
            return;
          }
        }

        const response = await fetch(url.toString(), fetchOptions);

        if (!response.ok) {
          const text = await response.text().catch(() => '');
          throw new Error(`HTTP ${response.status}: ${response.statusText}${text ? ' - ' + text.slice(0, 200) : ''}`);
        }

        const envelope: DataEnvelope = await response.json();
        if (envelope.error) throw new Error(envelope.error);

        if (cacheTTL > 0 && method === 'GET') {
          DataAwareElement._requestCache.set(cacheKey, {
            data: envelope,
            expires: Date.now() + cacheTTL,
          });
          DataAwareElement._cleanCache();
        }

        this._parseResponse(envelope.data);
        if (envelope.meta) this._applyMeta(envelope.meta);

        this.loading = false;

        this.dispatchEvent(new CustomEvent('auy:load', {
          detail: { status: 'loaded', data: envelope.data, meta: envelope.meta },
          bubbles: true,
          composed: true,
        }));

        if (this.dataTarget) {
          this.#routeToTarget(envelope.data);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        this.error = (err as Error).message;
        this.loading = false;
        this.dispatchEvent(new CustomEvent('auy:error', {
          detail: { message: this.error },
          bubbles: true,
          composed: true,
        }));
      }
    }

    static _cleanCache(): void {
      const now = Date.now();
      for (const [key, entry] of DataAwareElement._requestCache) {
        if (entry.expires <= now) DataAwareElement._requestCache.delete(key);
      }
    }

    #routeToTarget(data: unknown): void {
      const root = this.getRootNode() as Document | ShadowRoot;
      let target: Element | null = root.querySelector(this.dataTarget);
      if (!target) target = document.querySelector(this.dataTarget);
      if (target && '_parseResponse' in target) {
        (target as unknown as DataAwareInterface)._parseResponse(data);
      }
    }

    #connectEventBindings(): void {
      const ctor = this.constructor as typeof DataAwareElement;
      const observed = ctor.observedDataEvents;
      if (!observed || observed.length === 0) return;
      for (const eventName of observed) {
        const attr = `data-on-${eventName}`;
        const action = this.getAttribute(attr);
        if (action) {
          this.addEventListener(eventName, (e: Event) => {
            this.#executeDataAction(action, e);
          });
        }
      }
    }

    async #executeDataAction(action: string, event: Event): Promise<void> {
      this._dataActionController?.abort();
      this._dataActionController = new AbortController();

      const trimmed = action.trim();
      const parts = trimmed.split(' ');
      const method = parts.length >= 2 ? parts[0] : 'GET';
      const urlTemplate = parts.length >= 2 ? parts.slice(1).join(' ') : parts[0];
      const interpolated = this.#interpolate(urlTemplate, event);
      const url = new URL(interpolated, window.location.origin).toString();
      const eventType = event.type;
      const targetSelector = this.getAttribute(`data-on-${eventType}-target`) || this.dataTarget;

      try {
        const timeout = Number(this.getAttribute('data-fetch-timeout') || 15000);
        const timeoutSignal = typeof AbortSignal.timeout === 'function'
          ? AbortSignal.timeout(timeout)
          : null;
        const signal = timeoutSignal
          ? AbortSignal.any([this._dataActionController.signal, timeoutSignal])
          : this._dataActionController.signal;

        const headers: Record<string, string> = { Accept: 'application/json' };
        const customHeaders = this.getAttribute('data-headers');
        if (customHeaders) {
          try { Object.assign(headers, JSON.parse(customHeaders)); } catch {}
        }

        const response = await fetch(url, { method, signal, headers });
        if (!response.ok) return;
        const envelope: DataEnvelope = await response.json();
        if (envelope.error) return;

        if (targetSelector) {
          const root = this.getRootNode() as Document | ShadowRoot;
          let target: Element | null = root.querySelector(targetSelector);
          if (!target) target = document.querySelector(targetSelector);
          if (target && '_parseResponse' in target) {
            (target as unknown as DataAwareInterface)._parseResponse(envelope.data);
          }
        }
      } catch {
      }
    }

    #interpolate(template: string, event: Event): string {
      return template.replace(/\$\{(detail|this)\.([^}]+)\}/g, (_match, scope, prop) => {
        if (scope === 'detail') {
          const detail = (event as CustomEvent).detail || {};
          return detail[prop] !== undefined ? String(detail[prop]) : _match;
        }
        if (scope === 'this') {
          return (this as Record<string, unknown>)[prop] !== undefined
            ? String((this as Record<string, unknown>)[prop])
            : _match;
        }
        return _match;
      });
    }
  }

  return DataAwareElement;
};
