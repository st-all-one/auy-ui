# Convenção de Nomes

auy-ui segue uma convenção de nomenclatura consistente para tokens, componentes e classes utilitárias. Entender esse padrão é essencial para usar o framework eficientemente.

## Tokens: `--auy-<categoria>-<propriedade>`

Todos os tokens de design são expostos como CSS Custom Properties no padrão `--auy-*`:

```
--auy-<categoria>-<propriedade>
```

### Categorias de Tokens

| Categoria | Exemplo | Descrição |
|---|---|---|
| `color` | `--auy-color-primary` | Cores semânticas e de estado |
| `space` | `--auy-space-md` | Espaçamento fluido via `clamp()` |
| `text` | `--auy-text-base` | Escala tipográfica |
| `font` | `--auy-font-sans` | Famílias de fonte |
| `radius` | `--auy-radius-md` | Arredondamento de bordas |
| `shadow` | `--auy-shadow-md` | Sombras em OKLCH |
| `transition` | `--auy-transition` | Transições padrão |
| `breakpoint` | `--auy-breakpoint-md` | Breakpoints de viewport |
| `line-height` | `--auy-line-height` | Altura de linha |
| `tracking` | `--auy-tracking-normal` | Espaçamento entre letras |
| `font-weight` | `--auy-font-weight-bold` | Pesos de fonte |
| `safe-area` | `--auy-safe-area-top` | Área segura (notch) |
| `primary`, `neutral`, `success`, `warning`, `error` | `--auy-primary-500` | Paletas numéricas (50–950) |

```css
.card {
  background: var(--auy-color-surface);
  padding: var(--auy-space-lg);
  border-radius: var(--auy-radius-md);
  box-shadow: var(--auy-shadow-sm);
}
```

## Componentes: `data-*` e BEM

### Data Attributes para Componentes Simples

Componentes sem estrutura interna usam `data-*` attributes:

```html
<span data-badge>Novo</span>
<span data-badge data-badge-variant="success">Ativo</span>
```

### BEM para Componentes com Estrutura Interna

Componentes que possuem filhos usam BEM (Bloco__Elemento--Modificador):

```html
<div class="card">
  <div class="card__body">
    <h3 class="card__title">Título</h3>
    <p class="card__description">Descrição</p>
    <div class="card__footer">
      <button class="card__action">Ação</button>
    </div>
  </div>
</div>
```

```html
<div class="alert alert--success">
  <span class="alert__icon">✓</span>
  <div class="alert__content">
    <p class="alert__title">Sucesso!</p>
    <p>Operação concluída.</p>
  </div>
  <button class="alert__close" aria-label="Fechar">&times;</button>
</div>
```

## `:where()` — Especificidade Zero

Todos os seletores base do auy-ui usam `:where()` para garantir especificidade zero. Isso significa que qualquer seletor do usuário sobrescreve os estilos padrão sem necessidade de `!important`:

```css
/* Interno do auy-ui — especificidade (0,0,0) */
:where(button) {
  background: var(--auy-color-primary);
}

/* Seu CSS — especificidade (0,0,1), sempre vence */
button {
  background: purple;
}
```

## `[variant~="..."]` — Variantes

Variantes usam o seletor de atributo com `~=` (contains), permitindo múltiplos valores separados por espaço:

```html
<button variant="secondary lg">Botão Grande Secundário</button>
```

Isso equivale a aplicar tanto `variant~="secondary"` quanto `variant~="lg"`.

## Acessibilidade

- Use `aria-label`, `aria-current="page"`, `aria-sort`, `aria-busy` para controlar estados
- `[role="group"]` agrupa botões visualmente
- `[role="alertdialog"]` para modais de confirmação
- `[role="switch"]` transforma checkbox em toggle switch

## Próximos Passos

- [Tokens: Visão Geral](02-tokens.md)
- [Componentes](05-components.md)
- [Utilitários](04-utilities.md)
