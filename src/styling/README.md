# auy-ui/styling

Framework CSS classless com estilização semântica de HTML puro.

## Quickstart

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/auy-ui/dist/auy-ui.min.css">
  <title>Meu Site</title>
</head>
<body>
  <main>
    <h1>Olá, mundo!</h1>
    <p>Isso já está estilizado pelo auy-ui.</p>
  </main>
</body>
</html>
```

> **Nota:** Substitua a URL do CDN pela correta quando publicada.

## Versões disponíveis

| Arquivo | Descrição |
|---|---|
| `auy-ui.min.css` | Completo com fontes Inter + JetBrains Mono |
| `auy-ui-nofonts.min.css` | Usa system-ui (sem downloads de fonte) |
| `auy-classless.min.css` | Apenas elementos HTML (sem classes BEM) |
| `auy-classless-nofonts.min.css` | Classless + system-ui |

## Instalação via npm

```bash
npm install auy-ui
```

```js
import 'auy-ui/css'; // ou o caminho correto do entry point CSS
```

## Customização via CSS

Toda estilização usa variáveis CSS `--auy-*`. Sobrescreva qualquer token:

```css
:root {
  --auy-color-primary: oklch(50% 0.25 320);
  --auy-space-md: clamp(12px, 1.5vw, 24px);
}
```

## Temas

Ative um dos 22 temas com o atributo `data-auy-theme`:

```html
<html data-auy-theme="emerald">...</html>
```

Temas disponíveis: amber, azure, blue, cyan, emerald, fuchsia, green, grey, indigo, jade, lime, orange, pink, pumpkin, purple, red, ruby, sand, slate, violet, yellow, zinc.

## Design Tokens

### Cores

`--auy-color-primary`, `--auy-color-primary-hover`, `--auy-color-primary-active`, `--auy-color-primary-inverse`

`--auy-color-surface`, `--auy-color-surface-alt`, `--auy-color-text`, `--auy-color-text-muted`, `--auy-color-border`, `--auy-color-overlay`

`--auy-color-error`, `--auy-color-success`, `--auy-color-warning`, `--auy-color-info`

Paletas numéricas (50–950): `--auy-primary-500`, `--auy-neutral-200`, `--auy-success-700`, etc.

### Espaçamento

`--auy-space-{2xs,xs,sm,md,lg,xl,2xl,3xl}` — valores fluidos via `clamp()`.

### Tipografia

`--auy-text-{3xs,2xs,xs,sm,base,lg,xl,2xl,3xl,4xl,5xl}` — controlados por `--auy-font-size-multiplier`.

`--auy-font-sans`, `--auy-font-mono`, `--auy-font-weight-*`, `--auy-line-height-*`, `--auy-tracking-*`.

### Superfície

`--auy-radius-{sm,md,lg,full}`, `--auy-shadow-{sm,md,lg}`, `--auy-transition`, `--auy-transition-{fast,slow}`, `--auy-safe-area-*`.

### Breakpoints

`--auy-breakpoint-{sm,md,lg,xl,2xl}` + `@custom-media --auy-media-{sm,md,lg,xl,2xl,dark,light,contrast-more,motion-ok,motion-not,print}`.

## Estrutura de arquivos

```
src/styling/
├── auy-ui.css            ← Entry point
├── layers.css            ← @layer + @custom-media
├── reset.css             ← Reset CSS
├── tokens/               ← Design tokens
│   ├── colors.css
│   ├── spacing.css
│   ├── typography.css
│   ├── surface.css
│   ├── breakpoints.css
│   ├── palette.css
│   └── fallback.css
├── base/                 ← Estilização de elementos HTML
│   ├── typography.css    ← h1-h6, p, ul, ol, blockquote, dl
│   ├── link.css          ← a
│   ├── button.css        ← button, input[type=submit/reset/button]
│   ├── form.css          ← form, fieldset, legend, label, inputs
│   ├── form-choice.css   ← checkbox, radio, custom, switch
│   ├── form-control.css  ← color, range, file, select, textarea, validation
│   ├── form-validation.css
│   ├── form-extras.css   ← progress, meter, snippet, char-counter
│   ├── table.css
│   ├── embed.css
│   ├── code.css
│   ├── misc.css
│   ├── phrasing.css
│   ├── sectioning.css
│   ├── interactive.css   ← details, dialog, tooltip, menu, popover
│   ├── nav.css
│   ├── badge.css
│   ├── alert.css
│   ├── card.css
│   ├── breadcrumb.css
│   ├── popover.css
│   ├── spinner.css
│   └── timeline.css
├── themes/               ← 22 temas via data-auy-theme
├── utilities/            ← Classes utilitárias
│   ├── accessibility.css
│   ├── grid.css
│   ├── container.css
│   ├── truncate.css
│   ├── scrollbar.css
│   ├── overflow-auto.css
│   ├── reduce-motion.css
│   ├── print.css
│   └── performance.css
└── fonts/
    └── inter.css         ← Import opcional de fontes
```

## SCSS (para power users)

Opcionalmente, compile com SCSS para customização avançada:

```scss
@use 'auy-ui/scss' with (
  $auy-primary-h: 320,
  $auy-primary-s: 25%,
  $auy-primary-l: 50%,
);
```

## Acessibilidade

- `:focus-visible` em todos os interativos
- `forced-colors` media query
- `prefers-reduced-motion`
- `prefers-color-scheme: dark`
- `prefers-contrast: more`
- Touch targets mínimos de 44×44px (WCAG)
- Skip link, .sr-only, live regions nos componentes
