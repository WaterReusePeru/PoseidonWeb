import translate from 'google-translate-api-x'
import fs from 'fs'
import enTranslations from './en.json' assert { type: 'json' }

async function translateText(text) {
  try {
    const res = await translate(text, { to: 'ja' })
    return res.text
  } catch (error) {
    console.error(`Error translating "${text}":`, error.message)
    return text // fallback
  }
}

async function translateAll() {
  // Access the English translation object
  const englishData = enTranslations.en.translation
  // Use only the keys (the English words) for translation
  const englishTexts = Object.keys(englishData)
  const translations = {}

  for (const key of englishTexts) {
    // Instead of using the value, we use the key itself as the text to translate
    const originalText = key
    translations[key] = await translateText(originalText)
    console.log(`Translated ${key}: "${originalText}" -> "${translations[key]}"`)
  }

  // Build the resources object with both English and Japanese translations
  const resources = {
    en: { translation: englishData },
    ja: { translation: translations }
  }

  fs.writeFileSync('translations_ja.json', JSON.stringify(resources, null, 2), 'utf8')
  console.log('Japanese translations saved to translations_ja.json')
}

translateAll()
