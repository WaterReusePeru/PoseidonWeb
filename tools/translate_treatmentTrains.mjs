import translate from 'google-translate-api-x'
import fs from 'fs/promises'
import treatmentTrains from '../src/app/data/treatmentTrains.json' assert { type: 'json' }

async function translateText(text) {
  try {
    const res = await translate(text, { to: 'ja' })
    return res.text
  } catch (error) {
    console.error(`Error translating "${text}":`, error.message)
    return text  // fallback to the original text if translation fails
  }
}

async function translateTreatmentTrains() {
  const translatedTrains = await Promise.all(
    treatmentTrains.map(async (train) => {
      // Translate the relevant fields from English to Japanese
      const titleJa = await translateText(train.title)
      const categoryJa = await translateText(train.category)
      const descriptionJa = await translateText(train.description)
      const caseStudyJa = await translateText(train.case_study)
      
      // Return a new object with the added Japanese translations
      return {
        ...train,
        titleJa,
        categoryJa,
        descriptionJa,
        case_studyJa: caseStudyJa
      }
    })
  )

  // Write the new array to a file
  await fs.writeFile(
    './treatmentTrains_with_ja.json',
    JSON.stringify(translatedTrains, null, 2),
    'utf8'
  )
  console.log('Translated treatmentTrains saved to treatmentTrains_with_ja.json')
}

translateTreatmentTrains()
