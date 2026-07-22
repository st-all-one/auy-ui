# Dados: `data-input`, `data-target` e `data-on-*`

auy-ui oferece um sistema declarativo para que componentes consumam e produzam dados **sem JavaScript glue**. Através de atributos HTML padronizados, qualquer backend (ETA, Jinja, Blade, PHP, Python, Go) pode criar interfaces ricas e interativas.

---

## Índice

- [Conceito](#conceito)
- [Envelope JSON Padrão (RFC 8259)](#envelope-json-padrão-rfc-8259)
- [`data-input` — Consumir Dados](#data-input--consumir-dados)
- [`data-target` — Roteamento de Respostas](#data-target--roteamento-de-respostas)
- [`data-method` — Método HTTP](#data-method--método-http)
- [`data-on-*` — Ações Declarativas a Partir de Eventos](#data-on--ações-declarativas-a-partir-de-eventos)
- [Interpolação de Template em URLs](#interpolação-de-template-em-urls)
- [Eventos Padronizados `auy:load` / `auy:error`](#eventos-padronizados-auyload--auyerror)
- [Contrato por Componente](#contrato-por-componente)
- [Exemplos Práticos](#exemplos-práticos)

---

## Conceito

Todo componente que implementa `DataAwareMixin` entende três atributos HTML:

| Atributo | Função |
|---|---|
| `data-input` | URL para fetch automático de dados na inicialização |
| `data-target` | Seletor CSS do elemento que receberá os dados da resposta |
| `data-method` | Método HTTP (`GET` ou `POST`, padrão `GET`) |
| `data-on-{evento}` | Ação HTTP disparada quando o evento ocorre |

---

## Envelope JSON Padrão (RFC 8259)

Toda resposta a um `data-input` deve seguir este formato:

```json
{
  "data": { /* shape específico do componente */ },
  "meta": {
    "total": 100,
    "page": 1,
    "perPage": 10
  },
  "error": null
}
```

**Campos:**

- `data` — Payload principal. O shape varia por componente (ver [contrato abaixo](#contrato-por-componente)).
- `meta` — Opcional. Metadados como paginação. Quando presente, componentes que suportam paginação (table, pagination) extraem `total`, `page`, `perPage` automaticamente.
- `error` — String de erro. Se presente, o componente entra em estado de erro e `data` é ignorado.

---

## `data-input` — Consumir Dados

Quando o atributo `data-input` está presente, o componente:

1. Faz um `fetch` para a URL assim que é conectado ao DOM
2. Parseia o envelope JSON
3. Chama `_parseResponse(data)` interno, que popula as propriedades do componente
4. Se `data-target` estiver definido, roteia a resposta para o elemento alvo

```html
<!-- Tabela que carrega dados de uma API -->
<auy-comp-table data-input="/api/usuarios" selectable></auy-comp-table>

<!-- Abas carregadas do servidor -->
<auy-comp-tabs data-input="/api/projetos/abas"></auy-comp-tabs>

<!-- Select com opções dinâmicas -->
<auy-comp-select data-input="/api/estados" label="Estado"></auy-comp-select>
```

### Re-fetch Automático

Se o atributo `data-input` for alterado em tempo de execução, o componente faz um novo fetch automaticamente. O fetch anterior é cancelado via `AbortController`:

```js
// Troca a origem dos dados — o componente re-fetch automaticamente
el.setAttribute('data-input', '/api/usuarios?setor=vendas');
```

---

## `data-target` — Roteamento de Respostas

Quando um componente tem `data-target`, a resposta do `data-input` é roteada para o elemento alvo após o processamento interno. O alvo é encontrado via `querySelector` no shadow root mais próximo ou no `document`.

```html
<!-- Pagination busca dados e roteia para a tabela -->
<auy-comp-pagination
  data-input="/api/usuarios"
  data-target="#tabela-usuarios"
  per-page="10"
></auy-comp-pagination>
<auy-comp-table id="tabela-usuarios"></auy-comp-table>
```

**Fluxo completo:**

1. `pagination` monta → fetch `/api/usuarios?perPage=10`
2. Servidor responde: `{ data: { columns: [...], rows: [...] }, meta: { total: 100, page: 1 } }`
3. `pagination._applyMeta(meta)` → `this.total = 100`
4. Mixin roteia `data` → `table._parseResponse({ columns, rows })`
5. Tabela renderiza com os dados

Na mudança de página:

1. `pagination._goTo(3)` → fetch `/api/usuarios?perPage=10&page=3`
2. Resposta roteada novamente para `#tabela-usuarios`

---

## `data-method` — Método HTTP

Define o método HTTP usado no fetch. Padrão: `GET`.

```html
<auy-comp-table data-input="/api/relatorio" data-method="POST"></auy-comp-table>
```

> **Nota:** Para `POST`, o corpo da requisição deve ser enviado pelo componente. Atualmente o envelope é enviado como JSON vazio `{}` — o servidor deve ignorar o body ou usar parâmetros de URL.

---

## `data-on-*` — Ações Declarativas a Partir de Eventos

Componentes que disparam eventos podem ter ações HTTP declaradas via `data-on-{nome-do-evento}`.

Sintaxe:

```html
<auy-comp-pagination
  data-on-page-change="GET /api/usuarios?page=${detail.page}&perPage=${detail.perPage}"
  data-on-page-change-target="#tabela-usuarios"
></auy-comp-pagination>
```

### Formato da Ação

```
[METHOD] URL-template
```

- `METHOD` — `GET`, `POST`, etc. Opcional. Se omitido, assume `GET`.
- `URL-template` — URL com suporte a interpolação.

### Roteamento

O atributo `data-on-{evento}-target` define para onde a resposta da ação será roteada. Se não definido, usa o `data-target` do componente.

```html
<!-- Clique em linha da tabela busca detalhes e roteia para um card -->
<auy-comp-table
  data-input="/api/usuarios"
  data-on-row-click="GET /api/usuarios/${detail.row.id}"
  data-on-row-click-target="#card-detalhe"
  selectable
></auy-comp-table>
<div id="card-detalhe"></div>
```

### Eventos Disponíveis por Componente

| Componente | Eventos para `data-on-*` |
|---|---|
| `<auy-comp-table>` | `sort-change`, `row-select` |
| `<auy-comp-pagination>` | `page-change` |
| `<auy-comp-tabs>` | `tab-change` |
| `<auy-comp-accordion>` | `toggle` |
| `<auy-comp-alert>` | `show`, `dismiss` |
| `<auy-comp-modal>` | `open`, `close` |
| `<auy-comp-toast>` | `show`, `hide` |
| `<auy-comp-audio>` | `ended` |
| `<auy-comp-color-input>` | `change` |
| `<auy-comp-code-editor>` | `input`, `change` |
| `<auy-comp-search>` | `search-select`, `search-close` |
| `<auy-comp-select>` | `change` |
| `<auy-comp-date-input>` | `change` |
| `<auy-comp-file-input>` | `change`, `upload-complete`, `upload-error` |

---

## Interpolação de Template em URLs

Os templates em `data-on-*` suportam interpolação de duas fontes:

### `${detail.prop}` — Dados do Evento

Extrai propriedades do `detail` do `CustomEvent` disparado.

```html
<auy-comp-select
  data-on-change="GET /api/cidades?uf=${detail.value}"
  data-on-change-target="#cidade-select"
></auy-comp-select>
```

Quando `change` dispara com `detail: { value: 'SP', label: 'São Paulo' }`, a URL torna-se:
```
GET /api/cidades?uf=SP
```

### `${this.prop}` — Propriedades do Próprio Componente

Acessa qualquer propriedade do componente que disparou o evento.

```html
<auy-comp-search
  data-input="/api/busca"
  data-on-search-select="GET /api/item/${detail.id}?lang=${this.dataInput}"
></auy-comp-search>
```

---

## Eventos Padronizados `auy:load` / `auy:error`

Todo componente com `DataAwareMixin` dispara dois eventos padronizados durante o ciclo de fetch:

### `auy:load`

| Fase | `detail.status` | `detail.data` | `detail.meta` |
|---|---|---|---|
| Início do fetch | `'loading'` | — | — |
| Fetch bem-sucedido | `'loaded'` | `data` do envelope | `meta` do envelope |

```js
el.addEventListener('auy:load', (e) => {
  if (e.detail.status === 'loaded') {
    console.log('Dados recebidos:', e.detail.data);
  }
});
```

### `auy:error`

```js
el.addEventListener('auy:error', (e) => {
  console.error('Falha no fetch:', e.detail.message);
});
```

Ambos os eventos propagam (`bubbles: true, composed: true`), podendo ser capturados em qualquer nível do DOM.

---

## Contrato por Componente

### `<auy-comp-table>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `{ columns: Column[], rows: Record[] }` |
| Parâmetros automáticos | `?page=N&perPage=N&sort=col&dir=asc\|desc` |

### `<auy-comp-pagination>`

| Entrada | Shape do `data` | Shape do `meta` |
|---|---|---|
| `data-input` | Qualquer — roteado para `data-target` | `{ total, perPage, page }` |

### `<auy-comp-tabs>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `[{ id, label }]` |

### `<auy-comp-breadcrumbs>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `[{ label, href? }]` |

### `<auy-comp-select>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `[{ label, value, disabled? }]` |

### `<auy-comp-accordion>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `[{ id, title, content, open? }]` |

### `<auy-comp-search>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `Item[]` ou `{ results: Item[] }` ou `{ items: Item[] }` |

### `<auy-comp-audio>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `{ src?, title? }` |

### `<auy-comp-color-input>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `{ value? }` |

### `<auy-comp-code-editor>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `{ value?, language? }` |

### `<auy-comp-date-input>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `{ value?, min?, max? }` |

### `<auy-comp-file-input>`

| Entrada | Shape do `data` |
|---|---|
| `data-input` | `{ action?, accept?, maxSize? }` |

---

## Exemplos Práticos

### Tabela com Paginação Server-Side

```html
<auy-comp-pagination
  data-input="/api/usuarios"
  data-target="#tabela"
  per-page="10"
></auy-comp-pagination>
<auy-comp-table id="tabela" selectable></auy-comp-table>
```

**Resposta da API (`/api/usuarios?perPage=10&page=1`):**

```json
{
  "data": {
    "columns": [
      { "key": "nome", "label": "Nome", "sortable": true },
      { "key": "email", "label": "E-mail" }
    ],
    "rows": [
      { "nome": "Maria Silva", "email": "maria@exemplo.com" }
    ]
  },
  "meta": { "total": 100, "perPage": 10, "page": 1 },
  "error": null
}
```

### Select em Cascata

```html
<auy-comp-select
  data-input="/api/estados"
  label="Estado"
  data-on-change="GET /api/cidades?uf=${detail.value}"
  data-on-change-target="#cidade"
></auy-comp-select>
<auy-comp-select id="cidade" label="Cidade"></auy-comp-select>
```

### Formulário com CEP Automático

```html
<auy-comp-form-group
  label="CEP"
  mask="cep"
  data-on-blur="GET /api/cep/${this.value}"
  data-on-blur-target="#endereco"
></auy-comp-form-group>
<div id="endereco">
  <auy-comp-form-group label="Logradouro"></auy-comp-form-group>
  <auy-comp-form-group label="Bairro"></auy-comp-form-group>
</div>
```

### Analytics de Abertura de Modal

```html
<auy-comp-modal
  data-input="/api/modal/termos"
  data-on-open="GET /api/analytics/modal-aberto?nome=termos"
  data-on-close="GET /api/analytics/modal-fechado?nome=termos"
></auy-comp-modal>
```

---

## Próximos Passos

- [Visão Geral dos Componentes](00-index.md)
- [Customização de Estilos](../styling/09-estilo-customizado.md)
