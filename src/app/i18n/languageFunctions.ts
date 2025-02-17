export type Language = 'en' | 'es' | 'ja'

export function getLocalisedValue(
  obj: Record<string, any>,
  lang: Language,
  baseKey: string = 'name'
): string {
  let suffix = ''
  switch (lang) {
    case 'es':
      suffix = 'Es'
      break
    case 'ja':
      suffix = 'Ja'
      break
    case 'en':
    default:
      suffix = ''
      break
  }
  const localizedKey = baseKey + suffix
  const value = obj[localizedKey] || obj[baseKey]
  return typeof value === 'string' ? value : ''
}

export function getFieldKey(baseKey: string, lang: Language): string {
  switch (lang) {
    case 'es':
      return baseKey + 'Es'
    case 'ja':
      return baseKey + 'Ja'
    case 'en':
    default:
      return baseKey
  }
}
