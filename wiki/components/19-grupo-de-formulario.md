# Grupo de Formulário — `<auy-comp-form-group>`

Grupo de formulário com label, hint, validação integrada, máscara de entrada e exibição de erros.

## Classe

`AuyCompFormGroup` — estende `LitElement` (Light DOM)

## Propriedades

| Propriedade | Tipo | Default | Descrição |
|---|---|---|---|
| `label` | `string` | `''` | Rótulo exibido acima do campo |
| `hint` | `string` | `''` | Texto de ajuda abaixo do campo |
| `error` | `string` | `''` | Mensagem de erro (two-way) |
| `required` | `boolean` | `false` | Torna obrigatório e adiciona validação |
| `for` | `string` | `''` | ID do campo associado |
| `inline` | `boolean` | `false` | Exibe label e campo lado a lado |
| `mask` | `string` | `''` | Máscara (`cpf`, `cnpj`, `phone`, `cep`, `date` ou pattern) |
| `validate` | `string` | `''` | Regras separadas por vírgula (`required,email,minLength:8`) |

## Uso

```html
<auy-comp-form-group label="Nome" required hint="Digite seu nome completo">
  <input type="text" />
</auy-comp-form-group>

<auy-comp-form-group label="CPF" mask="cpf" validate="required,cpf">
  <input type="text" />
</auy-comp-form-group>

<auy-comp-form-group label="E-mail" validate="required,email" inline>
  <input type="email" />
</auy-comp-form-group>

<auy-comp-form-group label="Senha" validate="required,strongPassword">
  <input type="password" />
</auy-comp-form-group>
```

## Acessibilidade e Eventos

- `aria-describedby` vinculado ao hint e erro
- `aria-invalid` no slot quando há erro de validação
- Erro com `role="alert"` e `aria-live="polite"`
- *asterisco* no label com `aria-hidden="true"`
- Validação ao digitar (`input`) e ao sair (`blur`)
- Máscaras disponíveis: CPF, CNPJ, phone, CEP, data ou pattern livre
- Validadores: `required`, `cpf`, `cnpj`, `email`, `minLength`, `maxLength`, `pattern`, `strongPassword`
- `forced-colors: active` — borda `ButtonText` na mensagem de erro
- Impressão: hint e erro ocultos
- Remove listeners ao desconectar

## CSS Custom Properties

| Propriedade | Descrição |
|---|---|
| `--auy-color-text` | Cor do label |
| `--auy-color-text-muted` | Cor do hint |
| `--auy-color-error` | Cor do erro e asterisco |
| `--auy-text-sm` | Tamanho do label |
| `--auy-text-xs` | Tamanho do hint/erro |
| `--auy-space-xs` / `--auy-space-sm` / `--auy-space-md` | Espaçamentos |
| `--auy-font-weight-medium` | Peso do label |

## Validações

| Regra | Parâmetro | Descrição |
|---|---|---|
| `required` | — | Campo obrigatório |
| `email` | — | Formato de e-mail |
| `cpf` | — | CPF válido |
| `cnpj` | — | CNPJ válido |
| `minLength` | `N` | Mínimo de N caracteres |
| `maxLength` | `N` | Máximo de N caracteres |
| `pattern` | `regex` | Expressão regular |
| `strongPassword` | — | Senha forte (8+ chars, maiúscula, minúscula, número, especial) |
