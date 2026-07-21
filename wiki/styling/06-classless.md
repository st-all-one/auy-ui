# Versão Classless

auy-ui oferece uma versão **classless** que estiliza HTML semântico puro — zero classes necessárias.

## Como Importar

```html
<!-- Versão classless com fontes (Inter + JetBrains Mono) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/auy-ui/dist/auy-classless.min.css">

<!-- Versão classless sem fontes externas (system-ui) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/auy-ui/dist/auy-classless-nofonts.min.css">
```

## O que funciona

A versão classless inclui todos os estilos base para elementos HTML nativos:

- Tipografia (headings, parágrafos, listas)
- Links
- Tabelas
- Formulários (inputs, selects, textarea, botões)
- Blockquote, code, pre, kbd
- Figure, img, video, audio
- Details/summary
- Dialog
- HR, mark, small, sub/sup

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="auy-classless.min.css">
  <title>Site Classless</title>
</head>
<body>
  <header>
    <h1>Meu Site</h1>
    <nav>
      <a href="#">Início</a>
      <a href="#">Sobre</a>
      <a href="#">Contato</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Artigo</h2>
      <p>Este é um <strong>parágrafo</strong> com <a href="#">link</a>.</p>
      <blockquote>Citação importante.</blockquote>
    </article>
  </main>
</body>
</html>
```

## Limitações

A versão classless **não inclui**:

| Componente | Motivo |
|---|---|
| Card (`.card`) | Requer classes BEM |
| Alert (`.alert`) | Requer classes BEM |
| Badge (`[data-badge]`) | Requer data attributes |
| Breadcrumb (`nav[aria-label="Breadcrumb"]`) | Requer aria-label específico |
| Nav variants (`[data-variant]`) | Requer data attributes |
| Spinner (`.spinner`) | Requer classe |
| Timeline (`.timeline`) | Requer classes BEM |
| Popover API | Requer atributo `popover` |
| Dialog header/body/footer | Requer classes BEM |
| Grid system (`[data-grid]`) | Data attributes utilitários |
| Container (`[data-container]`) | Data attributes utilitários |
| `.sr-only`, `.truncate`, etc | Classes utilitárias |
| Form extras (`.form-group`, `.file-dropzone`) | Requer classes |

## Quando usar classless

- Sites de conteúdo (blogs, documentação)
- Protótipos rápidos
- Projetos que não precisam de componentes complexos
- Quando você quer apenas "reset + tipografia bonita"

## Quando usar a versão completa

- Aplicações web com dashboards
- Sistemas de design complexos
- Quando precisa de cards, alerts, badges, navegação, grid
- Formulários avançados com validação e input groups

## Próximos Passos

- [Customização](07-customizacao.md)
- [Componentes](05-components.md)
