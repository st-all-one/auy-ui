# Utilitários

Classes e data attributes utilitários para layout, acessibilidade, performance e scroll.

## Grid System (`[data-grid]`)

Grid responsivo sem media queries — colapsa para 1 coluna em telas < 640px:

```html
<div data-grid="3">
  <div data-col="2">Item grande (2 colunas)</div>
  <div>Item 1</div>
  <div>Item 2</div>
  <div data-col="full">Item largura total</div>
</div>
```

### Colunas

| Atributo | Descrição |
|---|---|
| `data-grid="2"` a `data-grid="6"` | Grid com N colunas |
| `data-grid="auto"` | `auto-fit` com mínimo de 16rem |
| `data-grid="auto-sm"` | `auto-fit` com mínimo de 12rem |
| `data-grid="auto-lg"` | `auto-fit` com mínimo de 24rem |

### Span

| Atributo | Descrição |
|---|---|
| `data-col="2"` a `data-col="4"` | Expandir por N colunas |
| `data-col="full"` | Largura total (`1 / -1`) |

### Gap

| Atributo | Descrição |
|---|---|
| `data-gap="sm"` | `var(--auy-space-sm)` |
| `data-gap="lg"` | `var(--auy-space-lg)` |
| `data-gap="xl"` | `var(--auy-space-xl)` |
| `data-gap="none"` | `gap: 0` |

### Responsivo

Em viewports < 640px:
- Todo `data-grid` vira 1 coluna
- `data-col` vira `span 1`

## Container (`[data-container]`)

```html
<div data-container>
  Conteúdo centralizado com padding.
</div>

<div data-container="sm">640px</div>
<div data-container="md">768px</div>
<div data-container="lg">1024px</div>
<div data-container="xl">1280px</div>
<div data-container="fluid">100%</div>
<div data-container="narrow">720px fluido</div>
```

## Container Queries

```html
<div class="container-inline">
  <!-- Container query: inline-size apenas -->
  <style>
    @container (max-width: 400px) {
      .meu-componente { flex-direction: column; }
    }
  </style>
</div>

<div class="container-size">
  <!-- Container query: inline + block size -->
</div>

<div class="container-name-site">
  <!-- Container com nome "site" -->
</div>
```

## Acessibilidade

```html
<!-- Somente leitores de tela -->
<span class="sr-only">Texto invisível visualmente</span>

<!-- Aparece ao receber foco (skip link) -->
<div class="sr-only-focusable" tabindex="0">
  Atalho de navegação
</div>

<!-- Skip link principal -->
<a href="#conteudo" class="skip-link">Ir para o conteúdo</a>
```

## Truncate

```html
<p class="truncate">Texto longo que será truncado com ellipsis em uma linha...</p>

<p class="truncate-multiline" style="--truncate-lines: 3;">
  Texto com até 3 linhas antes de truncar...
</p>
```

## Overflow

```html
<div class="overflow-auto">Scroll quando necessário</div>
<div class="overflow-x-auto">Scroll horizontal</div>
<div class="overflow-y-auto">Scroll vertical</div>
<div class="overflow-hidden">Esconde excesso</div>
```

## Scrollbar

```html
<div class="scrollbar-stable">Evita layout shift com scrollbar gutter</div>
<div class="scrollbar-thin">Scrollbar fina</div>
<div class="scrollbar-none">Esconde scrollbar</div>
```

## Performance

```html
<div class="content-visibility-auto">
  Renderização sob demanda (off-screen)
</div>

<div class="contain-layout-style">Contain layout + style</div>
<div class="contain-strict">Contain strict</div>
<div class="contain-content">Contain content</div>
<div class="content-visibility-hidden">Escondido com content-visibility</div>
```

## Print

Estilos de impressão automáticos via `@media print`:
- Remove backgrounds, sombras
- Mostra URLs de links
- Esconde navegação
- Quebras de página otimizadas

## Acessibilidade

- `.sr-only` e `.skip-link` para navegação por teclado
- `data-col="full"` útil para mensagens de erro em grid
- Container queries permitem responsividade sem media queries de viewport

## Próximos Passos

- [Componentes](05-components.md)
- [Customização](07-customizacao.md)
