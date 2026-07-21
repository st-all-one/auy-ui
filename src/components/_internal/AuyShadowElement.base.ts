import { LitElement } from 'lit';

/** Classe base para componentes Shadow DOM que herdarem delegatesFocus: true */
export class AuyShadowElement extends LitElement {
  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };
}
