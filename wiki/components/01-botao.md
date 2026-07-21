# Botão — `<auy-comp-button>`

Componente de botão com suporte a variantes, tamanhos, loading, ícone e modo link.

## Classe

`AuyCompButton` — estende `AuyShadowElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'success' \| 'error' \| 'warning' \| 'info' \| 'ghost' \| 'link'` | `'primary'` | Variante visual do botão |
| `size` | `'sm' \| 'md' \| 'lg' \| 'icon'` | `'md'` | Tamanho do botão |
| `loading` | `boolean` | `false` | Exibe spinner e desabilita interação |
| `disabled` | `boolean` | `false` | Desabilita o botão |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Tipo do botão nativo |
| `href` | `string` | `''` | Se definido, renderiza como `<a>` |
| `target` | `string` | `''` | Target do link |
| `fullWidth` | `boolean` | `false` | Ocupa 100% da largura do container |
| `icon` | `string` | `''` | Nome do ícone (da coleção interna) |
| `iconPosition` | `'left' \| 'right'` | `'left'` | Posição do ícone |

## Uso

```html
<auy-comp-button variant="primary" size="md">Salvar</auy-comp-button>

<auy-comp-button variant="success" icon="check" loading>
  Salvando…
</auy-comp-button>

<auy-comp-button variant="ghost" href="/dashboard" target="_blank">
  Ir para Dashboard
</auy-comp-button>

<auy-comp-button variant="secondary" size="sm" icon="arrow-left" icon-position="right">
  Voltar
</auy-comp-button>
```

## Acessibilidade

- `role="button"` no modo link (`href`)
- `aria-disabled` quando desabilitado
- `aria-busy="true"` durante loading
- `aria-label="Carregando"` substitui o label durante loading
- Spinner com `aria-hidden="true"`
- `:focus-visible` com outline de 2px
- `forced-colors: active` — borda `ButtonText` em modo link, outline `Highlight`
- `prefers-reduced-motion: reduce` — transições e animação do spinner desligadas

## CSS Custom Properties

| Propriedade | Componente | Tokens usados |
|---|---|---|
| `--auy-color-primary` | Background e hover | `--auy-color-primary`, `--auy-color-primary-hover`, `--auy-color-primary-active`, `--auy-color-primary-inverse` |
| `--auy-color-secondary` | Variante secondary | `--auy-color-secondary`, `--auy-color-secondary-inverse`, `--auy-color-secondary-hover`, `--auy-color-secondary-active` |
| `--auy-color-success` | Variante success | `--auy-color-success` |
| `--auy-color-error` | Variante error | `--auy-color-error` |
| `--auy-color-warning` | Variante warning | `--auy-color-warning` |
| `--auy-color-info` | Variante info | `--auy-color-info` |
| `--auy-color-border` | Ghost hover | `--auy-color-border` |
| `--auy-space-xs` | Gap interno | `--auy-space-xs` |
| `--auy-radius-md` | Border-radius | `--auy-radius-md` |
| `--auy-font-weight-medium` | Peso da fonte | `--auy-font-weight-medium` |
| `--auy-text-sm`, `--auy-text-base` | Tamanho da fonte | `--auy-text-sm`, `--auy-text-base` |
| `--auy-transition` | Transições | `--auy-transition` |

## Slots

| Slot | Descrição |
|---|---|
| *(default)* | Conteúdo textual do botão |
| `icon` | Substitui o ícone padrão |
