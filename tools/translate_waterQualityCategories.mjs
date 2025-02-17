import translate from 'google-translate-api-x'
import fs from 'fs/promises'
import waterQualityCategories from '../src/app/data/waterQualityCategories.json' assert { type: 'json' }

async function translateText(text) {
  try {
    const res = await translate(text, { to: 'ja' })
    return res.text
  } catch (error) {
    console.error(`Error translating "${text}":`, error.message)
    return text // fallback: return original text on error
  }
}

async function translateWaterQualityCategories() {
  const translatedCategories = await Promise.all(
    waterQualityCategories.map(async (category) => {
      const nameJa = await translateText(category.name)
      return {
        ...category,
        nameJa
      }
    })
  )

  await fs.writeFile(
    './waterQualityCategories_with_ja.json',
    JSON.stringify(translatedCategories, null, 2),
    'utf8'
  )
  console.log('Japanese translations saved to waterQualityCategories_with_ja.json')
}

translateWaterQualityCategories()
