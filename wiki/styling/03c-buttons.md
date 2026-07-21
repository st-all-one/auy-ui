# Botões

auy-ui estiliza `button`, `input[type="submit"]`, `input[type="reset"]`, `input[type="button"]` e `[role="button"]`.

## Uso Básico

```html
<button>Enviar</button>
<input type="submit" value="Enviar">
<input type="reset" value="Limpar">
<input type="button" value="Clique">
<a href="#" role="button">Link como Botão</a>
```

## Variantes

Use `variant` attribute com valores separados por espaço:

```html
<button>Padrão (primary)</button>
<button variant="secondary">Secundário</button>
<button variant="ghost">Ghost</button>
<button variant="danger">Perigo</button>
<button variant="outline">Outline</button>
<button variant="link">Link</button>
<button variant="contrast">Contraste</button>
```

## Tamanhos

```html
<button variant="sm">Pequeno</button>
<button>Médio (padrão)</button>
<button variant="lg">Grande</button>
```

Combinando variante + tamanho:

```html
<button variant="secondary lg">Grande Secundário</button>
<button variant="ghost sm">Ghost Pequeno</button>
```

## Estados

### Disabled

```html
<button disabled>Desabilitado</button>
```

### Loading (aria-busy)

```html
<button aria-busy="true">Enviando...</button>
```

O botão fica com o texto transparente e um spinner animado aparece via `::after`.

### Reset nativo

`input[type="reset"]` tem estilo próprio (transparente com borda):

```html
<input type="reset" value="Limpar Formulário">
```

## Grupo de Botões

```html
<div role="group">
  <button>Salvar</button>
  <button variant="secondary">Cancelar</button>
</div>
```

## Acessibilidade

- `:focus-visible` com outline de `0.125rem` na cor primary
- Botões disabled têm `opacity: 0.5` e `cursor: not-allowed`
- `aria-busy="true"` desabilita interação e mostra spinner
- `touch-action: manipulation` elimina delay em mobile
- Suporte a `forced-colors: active`

## Próximos Passos

- [Formulários](03b-forms.md)
- [Tabelas](03d-tables.md)
