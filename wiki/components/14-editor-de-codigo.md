# Editor de Código — `<auy-comp-code-editor>`

Editor de código com suporte a textarea nativo e CodeMirror 6 via CDN (opcional).

## Classe

`AuyCompCodeEditor` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `value` | `string` | `''` | Conteúdo do editor |
| `language` | `string` | `'html'` | Linguagem do código |
| `readonly` | `boolean` | `false` | Impede edição |
| `theme` | `string` | `'default'` | Tema do editor |
| `lineNumbers` | `boolean` | `true` | Exibe numeração de linhas |
| `height` | `string` | `'300px'` | Altura do editor |
| `placeholder` | `string` | `''` | Texto de placeholder |
| `cmOptions` | `string` | `''` | JSON de opções para CodeMirror 6 |

## Uso

```html
<auy-comp-code-editor value="<h1>Olá</h1>" language="html"></auy-comp-code-editor>

<auy-comp-code-editor readonly lineNumbers="false" height="200px"></auy-comp-code-editor>

<auy-comp-code-editor
  value="console.log('hello')"
  language="javascript"
  cmOptions='{"extensions":[{"key":"minimal","value":true}]}'
></auy-comp-code-editor>
```

## Acessibilidade e Eventos

- Textarea nativo com `spellcheck="false"` e `wrap="off"`
- `readonly` refletido como atributo para estilização
- Gutter de linha com `aria-hidden="true"`
- Tabulação insere 2 espaços (prevenindo mudança de foco)
- `:focus-visible` com outline de 2px
- `forced-colors: active` — borda `ButtonText`
- Impressão: borda preta sólida
- Dispara `input` e `change` ao digitar
- CodeMirror carregado sob demanda via `cmOptions` e CDN

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-border` | Borda do editor |
| `--auy-color-surface` | Fundo do editor |
| `--auy-color-text` | Cor do texto |
| `--auy-color-text-muted` | Cor dos números de linha |
| `--auy-color-primary` | Outline de foco |
| `--auy-font-mono` | Fonte monoespaçada |
| `--auy-text-sm` | Tamanho da fonte |
| `--auy-radius-md` | Border-radius |
