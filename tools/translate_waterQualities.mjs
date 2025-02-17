import translate from 'google-translate-api-x'
import fs from 'fs/promises'
import waterQualities from '../src/app/data/waterQualities.json' assert { type: 'json' }

async function translateText(text) {
  try {
    const res = await translate(text, { to: 'ja' })
    return res.text
  } catch (error) {
    console.error(`Error translating "${text}":`, error.message)
    return text  // Fallback: return original text on error
  }
}

async function translateWaterQualities() {
  const translatedQualities = await Promise.all(
    waterQualities.map(async (wq) => {
      const nameJa = await translateText(wq.name)
      const noteJa = wq.note ? await translateText(wq.note) : null
      const referenceJa = wq.reference ? await translateText(wq.reference) : null
      const tagsJa = wq.tags ? await translateText(wq.tags) : null

      return {
        ...wq,
        nameJa,
        noteJa,
        referenceJa,
        tagsJa
      }
    })
  )

  await fs.writeFile(
    './waterQualities_with_ja.json',
    JSON.stringify(translatedQualities, null, 2),
    'utf8'
  )
  console.log('Japanese translations saved to waterQualities_with_ja.json')
}

translateWaterQualities()
