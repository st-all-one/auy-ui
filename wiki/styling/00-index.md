# auy-ui/styling — Visão Geral

**auy-ui/styling** é um framework CSS focado em design acessível, responsivo e consistente. Utiliza OKLCH para cores, `@layer` para cascata previsível, `:where()` para especificidade zero, e 22 temas de cores.

## Os 4 Pilares

| Módulo | Descrição |
|---|---|
| **styling** | Framework CSS — tokens, base, componentes, utilitários |
| **components** | Web Components com Lit (custom elements reutilizáveis) |
| **layouts** | Sistemas de layout CSS (container queries, subgrid) |
| **data** | Integração declarativa com APIs via `data-input`, `data-target`, `data-on-*` |

## Como Importar

### Via CDN (link rel=stylesheet)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/auy-ui/dist/auy-ui.min.css">
```

### Sem fontes externas (system-ui nativo)

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/auy-ui/dist/auy-ui-nofonts.min.css">
```

### Via npm

```css
@import 'auy-ui/css';
```

```js
import 'auy-ui/css';
```

## Quickstart

Um HTML mínimo funcional com 5 linhas:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/auy-ui/dist/auy-ui.min.css">
</head>
<body>
  <h1>Olá, mundo!</h1>
  <p>Este é um parágrafo estilizado automaticamente.</p>
  <button>Clique aqui</button>
</body>
</html>
```

## Compatibilidade

- **Firefox** ESR+
- **Chrome** 111+
- **Safari** 16+
- **Edge** 111+

### Fallback OKLCH

Navegadores sem suporte a OKLCH recebem automaticamente equivalentes em HSL inclusos no arquivo `fallback.css`:

```css
@supports not (color: oklch(0% 0 0)) {
  :root {
    --auy-color-primary: hsl(250, 40%, 50%);
    /* ... demais tokens em HSL ... */
  }
}
```

## Próximos Passos

- [Convenção de Nomes](01-convencao-nomes.md)
- [Tokens: Visão Geral](02-tokens.md)
- [Base: Elementos HTML](03-base.md)
- [Componentes](05-components.md)
- [Utilitários](04-utilities.md)
- [Customização via Variáveis CSS](07-customizacao.md)
- [Customização de Estilos (`style-add` / `style-replace`)](09-estilo-customizado.md)
- [Integração com Dados via API](../components/23-dados.md)
