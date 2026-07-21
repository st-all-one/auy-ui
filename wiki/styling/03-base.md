# Base — Estilização de Elementos HTML

auy-ui estiliza elementos HTML nativos sem necessidade de classes. Basta adicionar o CSS e os elementos ganham estilo automaticamente, com especificidade zero via `:where()`.

## Subpáginas

| Elemento | Descrição |
|---|---|
| [Tipografia](03a-typography.md) | Headings, listas, blockquote, definition lists, small |
| [Formulários](03b-forms.md) | Inputs, selects, textarea, checkbox, radio, switch, validação |
| [Botões](03c-buttons.md) | Button, variantes, tamanhos, estados |
| [Tabelas](03d-tables.md) | Table, sort, responsivo, empty state |
| [Interativos](03e-interactive.md) | Details, dialog, tooltip, popover, dropdown |
| [Mídia](03f-embed.md) | Figure, img, video, iframe, canvas |

## Como Funciona

```html
<!-- Sem classes — estilizado automaticamente -->
<h1>Título</h1>
<p>Parágrafo com <a href="#">link</a> e <strong>negrito</strong>.</p>
<button>Clique</button>
<table>...</table>
<form>...</form>
```

## Camadas (layers)

Os estilos base estão na camada `@layer base`, que vem depois de `reset` e antes de `components`:

```
@layer reset, base, tokens, components, utilities, print;
```

## Acessibilidade

- Todos os elementos respeitam `prefers-color-scheme`, `prefers-contrast: more` e `prefers-reduced-motion`
- Estados de foco com `:focus-visible` (não polui clique)
- `forced-colors: active` tem suporte para Windows High Contrast Mode

## Próximos Passos

- [Tipografia](03a-typography.md)
- [Formulários](03b-forms.md)
- [Botões](03c-buttons.md)
