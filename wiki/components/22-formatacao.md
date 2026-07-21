# Formatação — `format.ts`

Módulo de funções utilitárias para formatação de data, moeda, número, texto e máscaras brasileiras.

## Módulo

`src/components/_internal/format.ts`

## Funções

| Função | Parâmetros | Retorno | Descrição |
|---|---|---|---|
| `formatDate` | `date: Date \| string \| number, locale?` | `string` | Formata data com `Intl.DateTimeFormat` |
| `formatCurrency` | `value: number, currency?, locale?` | `string` | Formata valor monetário |
| `formatNumber` | `value: number, locale?` | `string` | Formata número com separadores |
| `formatRelativeTime` | `date: Date \| string \| number, locale?` | `string` | Retorna tempo relativo (ex: "há 5 minutos") |
| `pluralize` | `count: number, singular: string, plural?` | `string` | Retorna singular ou plural |
| `truncate` | `str: string, maxLength: number, suffix?` | `string` | Trunca sem quebrar palavras |
| `slugify` | `str: string` | `string` | Converte para slug URL-friendly |
| `stripMask` | `value: string` | `string` | Remove caracteres não numéricos |
| `maskCPF` | `value: string` | `string` | Formata como `XXX.XXX.XXX-XX` |
| `maskCNPJ` | `value: string` | `string` | Formata como `XX.XXX.XXX/XXXX-XX` |
| `maskPhone` | `value: string` | `string` | Formata telefone BR (`(11) 98765-4321`) |
| `capitalize` | `str: string` | `string` | Capitaliza primeira letra de cada palavra |

## Uso

```typescript
import { formatDate, formatCurrency, maskCPF } from './format'

formatDate('2024-03-15')                   // "15/03/2024"
formatCurrency(1500.5)                      // "R$ 1.500,50"
formatNumber(1234567.89)                    // "1.234.567,89"
formatRelativeTime(Date.now() - 300000)     // "há 5 minutos"
pluralize(1, 'item')                        // "item"
pluralize(3, 'item')                        // "itens"
truncate('Hello world', 8)                  // "Hello..."
slugify('Olá Mundo!')                       // "ola-mundo"
stripMask('123.456.789-00')                 // "12345678900"
maskCPF('12345678900')                      // "123.456.789-00"
maskCNPJ('11222333000181')                  // "11.222.333/0001-81"
maskPhone('11987654321')                    // "(11) 98765-4321"
capitalize('hello world')                   // "Hello World"
```

## Notas

- Todas as funções usam `Intl` APIs nativas (`Intl.DateTimeFormat`, `Intl.NumberFormat`, `Intl.RelativeTimeFormat`)
- Locale padrão: `pt-BR` / moeda padrão: `BRL`
- Funções de máscara preservam o valor original se o comprimento de dígitos for insuficiente
- `slugify` usa `String.prototype.normalize('NFD')` para remover acentos
- `capitalize` usa `\b\p{L}` para suportar caracteres Unicode
- Nenhuma dependência externa
