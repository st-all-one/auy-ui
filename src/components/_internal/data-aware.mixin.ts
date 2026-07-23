import { LitElement, nothing, type PropertyValues } from 'lit';
import { property } from 'lit/decorators.js';

/** Envelope JSON padrao RFC 8259 para todas as respostas data-input */
export interface DataEnvelope<T = unknown> {
  data: T;
  meta?: Record<string, unknown>;
  error?: string | null;
}

/** Interface que cada componente com DataAwareMixin implementa */
export interface DataAwareInterface {
  dataInput: string;
  dataMethod: 'GET' | 'POST';
  dataTarget: string;
  dataOutput: string;
  dataOutputMethod: 'POST' | 'PUT';
  loading: boolean;
  error: string | null;
  _fetchData(extraParams?: URLSearchParams): Promise<void>;
  _parseResponse(data: unknown): void;
  _sendOutput(data: unknown): void;
}

type Constructor<T = LitElement> = new (...args: unknown[]) => T;

export const DataAwareMixin = <T extends Constructor<LitElement>>(superClass: T) => {
  class DataAwareElement extends superClass {
    /** URL para fetch de dados (data-input) */
    @property({ type: String, attribute: 'data-input', reflect: true })
    dataInput = '';

    /** Metodo HTTP para o fetch */
    @property({ type: String, attribute: 'data-method', reflect: true })
    dataMethod: 'GET' | 'POST' = 'GET';

    /** Seletor CSS do elemento alvo para roteamento da resposta */
    @property({ type: String, attribute: 'data-target', reflect: true })
    dataTarget = '';

    /** URL para envio de dados (data-output) */
    @property({ type: String, attribute: 'data-output', reflect: true })
    dataOutput = '';

    /** Metodo HTTP para envio de dados */
    @property({ type: String, attribute: 'data-output-method', reflect: true })
    dataOutputMethod: 'POST' | 'PUT' = 'POST';

    /** Estado de carregamento */
    @property({ type: Boolean, reflect: true })
    loading = false;

    /** Mensagem de erro */
    @property({ type: String, reflect: true })
    error: string | null = null;

    private _abortController: AbortController | null = null;
    private _outputAbortController: AbortController | null = null;
    private _initialDataFetched = false;

    override connectedCallback(): void {
      super.connectedCallback();
      this.#connectEventBindings();
    }

    override disconnectedCallback(): void {
      this._abortController?.abort();
      this._outputAbortController?.abort();
      super.disconnectedCallback();
    }

    override updated(changedProperties: PropertyValues): void {
      super.updated(changedProperties);
      if (changedProperties.has('dataInput') && this.dataInput && !this._initialDataFetched) {
        this._initialDataFetched = true;
        this._fetchData();
      } else if (changedProperties.has('dataInput') && this.dataInput && this.hasUpdated) {
        this._fetchData();
      }
    }

    /** Retorna parametros de URL padrao (sobrescrever em subclasses) */
    protected _getDefaultParams(): URLSearchParams {
      return new URLSearchParams();
    }

    /** Processa o payload recebido (sobrescrever em subclasses) */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _parseResponse(_data: unknown): void {
      // no-op por padrao
    }

    /** Aplica metadados (sobrescrever em subclasses) */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _applyMeta(_meta: Record<string, unknown>): void {
      // no-op por padrao
    }

    /** Lista de eventos que este componente expoe para data-on-* */
    static get observedDataEvents(): string[] {
      return [];
    }

    /** Faz fetch dos dados, parseia o envelope e roteia para data-target */
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

        const response = await fetch(url.toString(), {
          method: this.dataMethod,
          signal: this._abortController.signal,
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const envelope: DataEnvelope = await response.json();
        if (envelope.error) throw new Error(envelope.error);

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

    #routeToTarget(data: unknown): void {
      const root = this.getRootNode() as Document | ShadowRoot;
      let target: Element | null = root.querySelector(this.dataTarget);
      if (!target) {
        target = document.querySelector(this.dataTarget);
      }
      if (target && '_parseResponse' in (target as DataAwareInterface)) {
        (target as DataAwareInterface)._parseResponse(data);
      }
    }

    /** Envia dados para a URL definida em data-output */
    protected _sendOutput(data: unknown): void {
      if (!this.dataOutput) return;

      let body: string;
      try {
        body = JSON.stringify(data);
      } catch {
        this.dispatchEvent(new CustomEvent('auy:output-error', {
          detail: { error: 'Falha ao serializar dados para output' },
          bubbles: true,
          composed: true,
        }));
        return;
      }

      this._outputAbortController?.abort();
      this._outputAbortController = new AbortController();

      const { signal } = this._outputAbortController;

      fetch(this.dataOutput, {
        method: this.dataOutputMethod,
        headers: { 'Content-Type': 'application/json' },
        body,
        signal,
      })
        .then(res => {
          if (!res.ok) {
            this.dispatchEvent(new CustomEvent('auy:output-error', {
              detail: { error: `HTTP ${res.status}`, status: res.status, url: this.dataOutput },
              bubbles: true,
              composed: true,
            }));
          }
        })
        .catch(err => {
          if (err instanceof DOMException && err.name === 'AbortError') return;
          this.dispatchEvent(new CustomEvent('auy:output-error', {
            detail: { error: err instanceof Error ? err.message : 'Erro desconhecido no output', url: this.dataOutput },
            bubbles: true,
            composed: true,
          }));
        });
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
      const trimmed = action.trim();
      const parts = trimmed.split(' ');
      const method = parts.length === 2 ? parts[0] : 'GET';
      const urlTemplate = parts.length === 2 ? parts[1] : parts[0];
      const interpolated = this.#interpolate(urlTemplate, event);
      const url = new URL(interpolated, window.location.origin).toString();
      const eventType = event.type;
      const targetSelector = this.getAttribute(`data-on-${eventType}-target`) || this.dataTarget;

      try {
        const response = await fetch(url, {
          method,
          headers: { Accept: 'application/json' },
        });
        if (!response.ok) return;
        const envelope: DataEnvelope = await response.json();
        if (envelope.error) return;

        if (targetSelector) {
          const root = this.getRootNode() as Document | ShadowRoot;
          let target: Element | null = root.querySelector(targetSelector);
          if (!target) target = document.querySelector(targetSelector);
          if (target && '_parseResponse' in (target as DataAwareInterface)) {
            (target as DataAwareInterface)._parseResponse(envelope.data);
          }
        }
      } catch {
        // Silently fail for data-on actions
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
