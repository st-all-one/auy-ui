# Tipografia — Elementos de Texto

## Headings

`h1` a `h6` com tamanhos fluidos via `clamp()`:

```html
<h1>Título nível 1</h1>
<h2>Título nível 2</h2>
<h3>Título nível 3</h3>
<h4>Título nível 4</h4>
<h5>Título nível 5</h5>
<h6>Título nível 6</h6>
```

`h1`–`h4` usam `clamp()` para escala responsiva. `h5` e `h6` são fixos.

### hgroup

```html
<hgroup>
  <h1>Dashboard</h1>
  <p>Bem-vindo de volta, usuário</p>
</hgroup>
```

## Listas

```html
<ul>
  <li>Item não ordenado</li>
  <li>Outro item</li>
</ul>

<ol>
  <li>Primeiro</li>
  <li>Segundo</li>
</ol>
```

### Marcadores customizados via data-list-style

```html
<ul data-list-style="check">
  <li>Tarefa concluída</li>
  <li>Outra tarefa</li>
</ul>

<ul data-list-style="arrow">
  <li>Item com seta</li>
</ul>

<ul data-list-style="dash">
  <li>Item com travessão</li>
</ul>

<ul data-list-style="star">
  <li>Item destacado</li>
</ul>
```

## Blockquote

```html
<blockquote>
  <p>A simplicidade é o último grau da sofisticação.</p>
  <footer>— Leonardo da Vinci</footer>
</blockquote>
```

## Definition Lists

```html
<dl>
  <dt>HTML</dt>
  <dd>Linguagem de marcação para hipertexto.</dd>
  <dt>CSS</dt>
  <dd>Linguagem de estilos para apresentação.</dd>
</dl>
```

## Small

```html
<p>Texto principal <small>(nota de rodapé)</small></p>
```

## Code

```html
<p>Use <code>const x = 1;</code> no seu JavaScript.</p>

<pre><code>function hello() {
  console.log("Olá, mundo!");
}</code></pre>
```

## KBD (teclado)

```html
<p>Pressione <kbd>Ctrl</kbd> + <kbd>C</kbd> para copiar.</p>
```

## Acessibilidade

- Headings usam `text-wrap: balance` para quebra de linha equilibrada
- List markers têm `color: var(--auy-color-primary)` para destaque
- Blockquote tem `font-style: italic` e aspas decorativas via `::before`

## Próximos Passos

- [Formulários](03b-forms.md)
- [Botões](03c-buttons.md)
