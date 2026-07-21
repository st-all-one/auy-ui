# Componentes

Componentes baseados em classes e data attributes para padrões de interface comuns.

## Badge

```html
<span data-badge>Novo</span>
<span data-badge data-badge-pill>Pílula</span>
<span data-badge data-badge-dot></span>
<span data-badge data-badge-count>3</span>
```

### Variantes

```html
<span data-badge data-badge-variant="success">Ativo</span>
<span data-badge data-badge-variant="error">Erro</span>
<span data-badge data-badge-variant="warning">Pendente</span>
<span data-badge data-badge-variant="info">Info</span>
<span data-badge data-badge-variant="neutral">Neutro</span>
```

### Outline

```html
<span data-badge data-badge-outline>Outline</span>
<span data-badge data-badge-outline data-badge-variant="success">Sucesso</span>
```

### Com ícone

```html
<span data-badge>
  <span data-badge-icon>★</span>
  Favorito
</span>
```

## Alert

```html
<div class="alert">
  <span class="alert__icon">ℹ</span>
  <div class="alert__content">
    <p class="alert__title">Informação</p>
    <p>Este é um alerta informativo.</p>
  </div>
  <button class="alert__close" aria-label="Fechar">&times;</button>
</div>

<div class="alert alert--success">
  <div class="alert__content">
    <p class="alert__title">Sucesso!</p>
    <p>Operação concluída com sucesso.</p>
  </div>
</div>

<div class="alert alert--warning">
  <p>Atenção: verifique os dados antes de continuar.</p>
</div>

<div class="alert alert--error">
  <p>Erro ao processar a solicitação.</p>
</div>
```

### Variantes

| Classe | Cor |
|---|---|
| `.alert` (padrão) | Info (azul) |
| `.alert--success` | Verde |
| `.alert--warning` | Amarelo |
| `.alert--error` | Vermelho |

## Card

```html
<div class="card card--elevated">
  <img src="foto.jpg" alt="Miniatura">
  <div class="card__body">
    <h3 class="card__title">Título do Card</h3>
    <p class="card__description">Descrição do conteúdo do card.</p>
    <div class="card__footer">
      <button>Ação</button>
      <button variant="ghost">Cancelar</button>
    </div>
  </div>
</div>
```

### Variantes

```html
<div class="card card--elevated">Com sombra</div>
<div class="card card--outlined">Com borda</div>
```

### Card como link

```html
<a href="#" class="card card--elevated">
  <div class="card__body">
    <h3 class="card__title">Card Clicável</h3>
  </div>
</a>
```

## Breadcrumb

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Início</a></li>
    <li><a href="/produtos">Produtos</a></li>
    <li><span aria-current="page" class="label">Camisetas</span></li>
  </ol>
</nav>
```

## Nav (Navegação)

### Tray (horizontal com fundo)

```html
<nav data-variant="tray">
  <a href="#" aria-current="page">Dashboard</a>
  <a href="#">Pedidos</a>
  <a href="#">Clientes</a>
  <a href="#">Relatórios</a>
</nav>
```

### Underline

```html
<nav data-variant="underline">
  <a href="#" aria-current="page">Ativos</a>
  <a href="#">Arquivados</a>
  <a href="#">Rascunhos</a>
</nav>
```

### Vertical

```html
<nav data-variant="underline" data-orientation="vertical">
  <a href="#" aria-current="page">Geral</a>
  <a href="#">Segurança</a>
  <a href="#">Notificações</a>
</nav>
```

## Spinner

```html
<span class="spinner"></span>
<span class="spinner" style="--auy-spinner-size: 2.5rem; --auy-spinner-speed: 0.6;"></span>
```

## Timeline

```html
<div class="timeline">
  <div class="timeline__item">
    <div class="timeline__dot timeline__dot--created">+</div>
    <div class="timeline__card">
      <div class="timeline__header">
        <span class="timeline__author">João Silva</span>
        <span class="timeline__time">2 min atrás</span>
      </div>
      <div class="timeline__diff">
        <div class="timeline__diff-row">
          <span class="timeline__diff-key">Status</span>
          <span class="timeline__diff-old">pendente</span>
          <span class="timeline__diff-arrow">→</span>
          <span class="timeline__diff-new">aprovado</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

### Dot variants

| Classe | Cor |
|---|---|
| `.timeline__dot--created` | Success (verde) |
| `.timeline__dot--deleted` | Error (vermelho) |
| `.timeline__dot--updated` | Primary (padrão) |

## Acessibilidade

- `aria-current="page"` no breadcrumb e nav indica página atual
- `aria-label="Breadcrumb"` identifica a navegação estrutural
- `aria-label="Close"` no botão de fechar do alert
- Badges têm `user-select: none` para evitar seleção acidental
- Cards clicáveis com `a.card` preservam navegação por teclado
- Timeline tem `max-block-size: 31.25rem` com `overflow-y: auto` para scroll
- Suporte a `forced-colors: active` em todos os componentes

## Próximos Passos

- [Classless](06-classless.md)
- [Customização](07-customizacao.md)
