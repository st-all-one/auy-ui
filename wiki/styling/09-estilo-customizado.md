# Customização de Estilos: `style-add` e `style-replace`

Componentes Shadow DOM do auy-ui expõem dois atributos para customização de estilos **sem necessidade de JavaScript ou classes CSS externas**: `style-add` e `style-replace`.

---

## Conceito

Componentes Shadow DOM têm estilos encapsulados — o CSS do documento não penetra no shadow root. Para customizar a aparência de um componente sem redefini-lo, use:

| Atributo | Efeito |
|---|---|
| `style-add` | Adiciona CSS ao **final** dos estilos nativos do componente. Por cascata, sobrescreve declarações de mesma especificidade. |
| `style-replace` | **Remove todos** os estilos nativos do componente e aplica apenas o CSS fornecido. Substituição total. |

```

  ┌─ Shadow Root ─────────────────────┐
  │  <style>                          │
  │    /* Estilos nativos do Lit */   │  ← style-replace REMOVE estes
  │  </style>                         │
  │  <style auy-custom="add">         │
  │    /* Seu CSS via style-add */    │  ← Adicionado ao FINAL (cascata vence)
  │  </style>                         │
  │  <div class="btn">...</div>       │
  └───────────────────────────────────┘
```

---

## `style-add` — Adicionar CSS

O CSS fornecido é inserido como um elemento `<style>` após os estilos nativos. Na cascata do shadow DOM, isso significa que declarações de mesma especificidade sobrescrevem as nativas.

```html
<auy-comp-button
  variant="primary"
  style-add=".btn--primary { border-radius: 999px; }"
>
  Botão Arredondado
</auy-comp-button>
```

```html
<auy-comp-card
  variant="elevated"
  style-add="[part~='card'] { box-shadow: 0 8px 32px rgba(0,0,0,0.12); }"
>
  Card com Sombra Customizada
</auy-comp-card>
```

### Múltiplas Declarações

```html
<auy-comp-badge
  variant="success"
  style-add="
    [part~='badge'] {
      background: purple;
      color: white;
      font-size: 0.875rem;
    }
  "
>
  Badge Customizado
</auy-comp-badge>
```

---

## `style-replace` — Substituir CSS

Remove todos os estilos nativos do componente (tanto `<style>` elements quanto `adoptedStyleSheets`) e aplica apenas o CSS fornecido.

```html
<auy-comp-button
  variant="primary"
  style-replace="
    .btn {
      all: unset;
      display: inline-flex;
      padding: 0.75rem 2rem;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border-radius: 0;
      font-weight: 700;
      cursor: pointer;
    }
    .btn:hover { background: linear-gradient(135deg, #764ba2, #667eea); }
  "
>
  Botão Totalmente Customizado
</auy-comp-button>
```

> **Atenção:** `style-replace` remove completamente os estilos padrão. Você deve fornecer TODAS as declarações necessárias para o funcionamento visual do componente, incluindo `display`, `padding`, `cursor`, etc.

---

## Componentes que Suportam

Todos os componentes Shadow DOM:

| Componente | Tag |
|---|---|
| Botão | `auy-comp-button` |
| Badge | `auy-comp-badge` |
| Card | `auy-comp-card` |
| Modal | `auy-comp-modal` |
| Alerta | `auy-comp-alert` |
| Toast | `auy-comp-toast` |
| Container de Toasts | `auy-comp-toast-container` |
| Dica de Ferramenta | `auy-comp-tooltip` |
| Acordeão | `auy-comp-accordion` |
| Abas | `auy-comp-tabs` |
| Tabela | `auy-comp-table` |
| Paginação | `auy-comp-pagination` |
| Player de Áudio | `auy-comp-audio` |
| Seletor de Cor | `auy-comp-color-input` |
| Editor de Código | `auy-comp-code-editor` |
| Migalhas de Pão | `auy-comp-breadcrumbs` |

Componentes Light DOM (ex: `auy-comp-select`, `auy-comp-search`, `auy-comp-form-group`) **não** têm shadow root — eles herdam estilos do documento diretamente. Para customizá-los, use CSS global ou variáveis `--auy-*`.

---

## Boas Práticas

### Quando usar `style-add`

- Pequenos ajustes pontuais (arredondamento, cor, espaçamento)
-Override de uma ou duas propriedades
- Manter a estrutura visual original do componente

### Quando usar `style-replace`

- Redesign completo do componente
- Quando o estilo nativo não atende ao design system do projeto
- Quando você quer eliminar totalmente o CSS padrão

### Dicas

```css
/* Use variáveis CSS para manter consistência */
style-add="
  .btn--primary {
    background: var(--cor-marca);
    border-color: var(--cor-marca);
  }
"

/* Partes expostas via [part] são estáveis entre versões */
style-add="
  [part~='badge'] {
    font-weight: 400;
    text-transform: lowercase;
  }
"
```

### Acessibilidade

- Nunca remova `outline` de foco
- Mantenha contraste mínimo de 4.5:1
- Teste com `prefers-color-scheme: dark` e `forced-colors: active`

---

## Integração com Backend

Como `style-add` e `style-replace` são atributos HTML, funcionam perfeitamente com qualquer template engine:

```eta
<!-- Eta template -->
<auy-comp-button
  variant="primary"
  style-add=".btn--primary { border-radius: {{it.borderRadius}}; }"
>
  {{it.rotulo}}
</auy-comp-button>
```

```blade
{{-- Laravel Blade --}}
<auy-comp-badge
  variant="success"
  style-add="[data-badge] { background: {{ $corPersonalizada }}; }"
>
  {{ $texto }}
</auy-comp-badge>
```

---

## Próximos Passos

- [Customização via Variáveis CSS](07-customizacao.md)
- [Dados e Integração com API](../components/23-dados.md)
