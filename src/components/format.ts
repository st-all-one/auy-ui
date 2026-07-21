/**
 * Formats a date using Intl.DateTimeFormat.
 *
 * @example formatDate('2024-03-15') // "15/03/2024"
 * @example formatDate(new Date(), 'en-US') // "3/15/2024"
 */
export function formatDate(
  date: Date | string | number,
  locale = 'pt-BR',
): string {
  if (!date) return ''
  try {
    return new Intl.DateTimeFormat(locale).format(new Date(date))
  } catch {
    return ''
  }
}

/**
 * Formats a number as currency using Intl.NumberFormat.
 *
 * @example formatCurrency(1500.5) // "R$ 1.500,50"
 * @example formatCurrency(99.99, 'USD', 'en-US') // "$99.99"
 */
export function formatCurrency(
  value: number,
  currency = 'BRL',
  locale = 'pt-BR',
): string {
  if (typeof value !== 'number' || isNaN(value)) return ''
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(value)
}

/**
 * Formats a number with thousand separators using Intl.NumberFormat.
 *
 * @example formatNumber(1234567.89) // "1.234.567,89"
 * @example formatNumber(1000000, 'en-US') // "1,000,000"
 */
export function formatNumber(value: number, locale = 'pt-BR'): string {
  if (typeof value !== 'number' || isNaN(value)) return ''
  return new Intl.NumberFormat(locale).format(value)
}

const RELATIVE_UNITS: { unit: Intl.RelativeTimeFormatUnit; ms: number }[] = [
  { unit: 'year', ms: 31536000000 },
  { unit: 'month', ms: 2592000000 },
  { unit: 'week', ms: 604800000 },
  { unit: 'day', ms: 86400000 },
  { unit: 'hour', ms: 3600000 },
  { unit: 'minute', ms: 60000 },
  { unit: 'second', ms: 1000 },
]

/**
 * Formats a date as a human-readable relative time string.
 *
 * @example formatRelativeTime(Date.now() - 300000) // "há 5 minutos"
 * @example formatRelativeTime(Date.now() + 7200000, 'en') // "in 2 hours"
 */
export function formatRelativeTime(
  date: Date | string | number,
  locale = 'pt-BR',
): string {
  if (!date) return ''
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const elapsed = new Date(date).getTime() - Date.now()

  for (const { unit, ms } of RELATIVE_UNITS) {
    const diff = Math.round(elapsed / ms)
    if (Math.abs(diff) >= 1) {
      return rtf.format(diff, unit)
    }
  }

  return rtf.format(0, 'second')
}

/**
 * Returns the singular or plural form of a word based on count.
 *
 * @example pluralize(1, 'item') // "item"
 * @example pluralize(3, 'item') // "itens"
 * @example pluralize(0, 'pessoa', 'pessoas') // "pessoas"
 */
export function pluralize(
  count: number,
  singular: string,
  plural?: string,
): string {
  return count === 1 ? singular : plural ?? singular + 's'
}

/**
 * Truncates a string to a maximum length without breaking words.
 *
 * @example truncate('Hello world', 8) // "Hello..."
 * @example truncate('Hello world', 10, ' [..]') // "Hello [..]"
 */
export function truncate(
  str: string,
  maxLength: number,
  suffix = '...',
): string {
  if (str.length <= maxLength) return str
  if (maxLength <= suffix.length) return str.slice(0, maxLength)

  const truncated = str.slice(0, maxLength - suffix.length)
  const lastSpace = truncated.lastIndexOf(' ')

  return (lastSpace > 0 ? truncated.slice(0, lastSpace) : truncated) + suffix
}

/**
 * Converts a string to a URL-friendly slug.
 *
 * @example slugify('Olá Mundo!') // "ola-mundo"
 * @example slugify('Ação & Reação') // "acao-reacao"
 */
export function slugify(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/[\s-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Strips all non-digit characters from a string.
 *
 * @example stripMask('123.456.789-00') // "12345678900"
 */
export function stripMask(value: string): string {
  return value.replace(/\D/g, '')
}

/**
 * Formats a string as a Brazilian CPF (XXX.XXX.XXX-XX).
 *
 * @example maskCPF('12345678900') // "123.456.789-00"
 * @example maskCPF('123.456.789-00') // "123.456.789-00"
 */
export function maskCPF(value: string): string {
  const digits = stripMask(value).slice(0, 11)
  if (digits.length !== 11) return value
  return digits
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

/**
 * Formats a string as a Brazilian CNPJ (XX.XXX.XXX/XXXX-XX).
 *
 * @example maskCNPJ('11222333000181') // "11.222.333/0001-81"
 */
export function maskCNPJ(value: string): string {
  const digits = stripMask(value).slice(0, 14)
  if (digits.length !== 14) return value
  return digits
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2')
}

/**
 * Formats a string as a Brazilian phone number.
 *
 * @example maskPhone('11987654321') // "(11) 98765-4321"
 * @example maskPhone('1133334444')  // "(11) 3333-4444"
 */
export function maskPhone(value: string): string {
  const digits = stripMask(value).slice(0, 11)
  if (digits.length < 10) return value
  if (digits.length <= 10) {
    return digits
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
  return digits
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @example capitalize('hello world') // "Hello World"
 * @example capitalize('OLÁ MUNDO')   // "Olá Mundo"
 */
export function capitalize(str: string): string {
  return str
    .toLowerCase()
    .replace(/\b\p{L}/gu, (char) => char.toUpperCase())
}
