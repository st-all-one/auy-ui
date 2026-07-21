# Migalhas de Pão — `<auy-comp-breadcrumbs>`

Navegação hierárquica que indica a localização atual dentro de uma estrutura de páginas.

## Classe

`AuyCompBreadcrumbs` — estende `LitElement`

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `items` | `BreadcrumbItem[]` | `[]` | Array de itens de navegação |
| `variant` | `'default' \| 'arrow' \| 'depth' \| 'solid'` | `'default'` | Estilo visual |
| `icons` | `boolean` | `false` | Exibe ícones nos itens |

### Interface `BreadcrumbItem`

| Campo | Tipo | Descrição |
|---|---|---|
| `label` | `string` | Texto visível do item |
| `href` | `string` (opcional) | URL do link |
| `icon` | `IconName` (opcional) | Nome do ícone |

## Uso

```html
<auy-comp-breadcrumbs
  .items=${[
    { label: 'Home', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    { label: 'Categoria', href: '/produtos/categoria' },
    { label: 'Item Atual' }
  ]}
  variant="arrow"
  icons
></auy-comp-breadcrumbs>
```

## Acessibilidade

- `nav[aria-label="Breadcrumb"]` — landmark de navegação
- Item atual recebe `aria-current="page"`
- Separadores com `aria-hidden="true"`
- `:focus-visible` links com outline de 2px
- `forced-colors: active` — borda `ButtonText` no hover, outline `Highlight`
- Container queries para truncamento responsivo em telas estreitas

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-primary` | Cor do item atual (solid) e depth |
| `--auy-color-text` | Cor do texto |
| `--auy-color-text-muted` | Cor dos links |
| `--auy-color-border` | Hover e separadores |
| `--auy-color-surface-alt` | Background do variant solid |
| `--auy-text-xs` | Tamanho da fonte |
| `--auy-font-weight-medium` / `--auy-font-weight-semibold` / `--auy-font-weight-bold` | Pesos da fonte |
| `--auy-radius-sm` / `--auy-radius-md` | Border-radius |
| `--auy-space-2xs` / `--auy-space-xs` / `--auy-space-sm` | Espaçamentos |
| `--auy-transition-fast` | Velocidade da transição |
