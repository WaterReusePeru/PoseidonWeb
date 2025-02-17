import translate from 'google-translate-api-x'
import fs from 'fs/promises'
import waterQualityFactors from '../src/app/data/waterQualityFactors.json' assert { type: 'json' }

async function translateText(text) {
  try {
    const res = await translate(text, { to: 'ja' })
    return res.text
  } catch (error) {
    console.error(`Error translating "${text}":`, error.message)
    return text // fallback: use original text if translation fails
  }
}

async function translateWaterQualityFactors() {
  const translatedFactors = await Promise.all(
    waterQualityFactors.map(async (factor) => {
      // Translate both fields independently
      const nameShortJa = await translateText(factor.nameShort)
      const nameLongJa = await translateText(factor.nameLong)
      console.log(`Translated "${factor.nameLong}" -> "${nameLongJa}"`)
      return {
        ...factor,
        nameShortJa,
        nameLongJa
      }
    })
  )

  await fs.writeFile(
    './waterQualityFactors_with_ja.json',
    JSON.stringify(translatedFactors, null, 2),
    'utf8'
  )
  console.log('Japanese translations saved to waterQualityFactors_with_ja.json')
}

translateWaterQualityFactors()
