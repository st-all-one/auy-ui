# Formulários

auy-ui estiliza todos os inputs HTML5 nativamente.

## Inputs de Texto

```html
<form>
  <label for="nome">Nome</label>
  <input type="text" id="nome" placeholder="Seu nome" required>

  <label for="email">Email</label>
  <input type="email" id="email" placeholder="email@exemplo.com">

  <label for="senha">Senha</label>
  <input type="password" id="senha">

  <label for="busca">Busca</label>
  <input type="search" id="busca" placeholder="Pesquisar...">

  <label for="numero">Número</label>
  <input type="number" id="numero" min="0" max="100">

  <label for="tel">Telefone</label>
  <input type="tel" id="tel">
</form>
```

## Select

```html
<label for="pais">País</label>
<select id="pais">
  <option>Brasil</option>
  <option>Portugal</option>
  <option>Moçambique</option>
</select>

<!-- Select múltiplo -->
<select multiple>
  <option>Opção 1</option>
  <option>Opção 2</option>
  <option>Opção 3</option>
</select>
```

## Textarea

```html
<label for="bio">Biografia</label>
<textarea id="bio" rows="4" placeholder="Conte sobre você..."></textarea>
```

## Checkbox e Radio

```html
<label>
  <input type="checkbox" name="termos" required>
  Aceito os termos
</label>

<label>
  <input type="radio" name="opcao" value="a">
  Opção A
</label>

<label>
  <input type="radio" name="opcao" value="b">
  Opção B
</label>
```

### Custom checkbox/radio com `data-custom`

```html
<label>
  <input type="checkbox" data-custom>
  <span class="control"></span>
  Aceito os termos
</label>

<label>
  <input type="radio" name="grupo" data-custom>
  <span class="control"></span>
  Opção A
</label>
```

## Switch

```html
<label>
  <input type="checkbox" role="switch">
  Ativar notificações
</label>
```

## Color

```html
<label for="cor">Cor favorita</label>
<input type="color" id="cor" value="#4f46e5">
```

## Range

```html
<label for="volume">Volume</label>
<input type="range" id="volume" min="0" max="100" value="50">
```

## File (Dropzone)

```html
<div class="file-dropzone">
  <div class="file-dropzone__icon">
    <svg><!-- ícone de upload --></svg>
  </div>
  <div class="file-dropzone__text">
    Arraste arquivos aqui ou clique para enviar
  </div>
  <div class="file-dropzone__hint">
    PNG, JPG ou PDF até 10MB
  </div>
  <button type="button" class="file-dropzone__action">Selecionar Arquivo</button>
  <input type="file" multiple accept="image/*,.pdf">
</div>
```

### File inline

```html
<div class="file-dropzone" data-file-style="inline">
  <div class="file-dropzone__icon"><!-- ícone --></div>
  <div class="file-dropzone__text">Anexar arquivo</div>
  <input type="file">
</div>
```

## Date / Time

```html
<input type="date">
<input type="datetime-local">
<input type="time">
<input type="month">
<input type="week">
```

## Validação

Estados automáticos via `:user-valid` e `:user-invalid`:

```html
<div class="form-group">
  <label for="email2">
    Email
    <span class="required-indicator">*</span>
  </label>
  <input type="email" id="email2" required>
  <span class="form-help">Digite um email válido</span>
  <span class="form-error">
    <span class="form-error-icon">✕</span>
    Email inválido
  </span>
  <span class="form-success-icon">✓</span>
</div>
```

### Estados

- `:user-valid` — borda verde
- `:user-invalid` — borda vermelha com barra lateral
- `:out-of-range` — borda amarela (para `input[type="number"]`)

## Input Group

```html
<div class="input-group">
  <span class="input-group__icon">@</span>
  <input type="email" placeholder="usuario@exemplo.com">
</div>

<div class="input-group">
  <input type="text" placeholder="Buscar...">
  <span class="input-group__icon">🔍</span>
</div>
```

## Progress

```html
<progress value="70" max="100"></progress>
<progress value="70" max="100" data-variant="success"></progress>
<progress value="70" max="100" data-variant="warning"></progress>
<progress value="70" max="100" data-variant="error"></progress>
<progress></progress> <!-- Indeterminado -->
```

## Meter

```html
<meter value="80" min="0" max="100" low="30" high="70" optimum="90"></meter>
```

## Output

```html
<output name="resultado">0</output>
```

## Acessibilidade

- Todos os inputs usam `accent-color: var(--auy-color-primary)` para tema consistente
- Estados `:user-valid`/`:user-invalid` só aparecem após interação do usuário
- `required-indicator` aparece automaticamente quando o campo tem `required`
- Mensagens de erro aparecem automaticamente com `:has(:user-invalid)`
- `field-sizing: content` no textarea para autoajuste
- Suporte a `forced-colors: active` (Windows High Contrast)

## Próximos Passos

- [Botões](03c-buttons.md)
- [Validação Customizada](07-customizacao.md)
