import translate from 'google-translate-api-x'
import fs from 'fs/promises'

async function translateText(text) {
  try {
    const res = await translate(text, { to: 'ja' })
    return res.text
  } catch (error) {
    console.error(`Error translating "${text}":`, error.message)
    return text // fallback: use the original text if translation fails
  }
}

async function translateEvaluationCriteria() {
  try {
    // Read the evaluationCriteria.json file
    const data = await fs.readFile('../src/app/data/evaluationCriteria.json', 'utf8')
    const criteria = JSON.parse(data)
    
    // Loop over each criterion and add a nameLongJa property
    for (const criterion of criteria) {
      criterion.nameLongJa = await translateText(criterion.nameLong)
      console.log(`Translated "${criterion.nameLong}" -> "${criterion.nameLongJa}"`)
    }
    
    // Write the updated data to a new file
    await fs.writeFile('./evaluationCriteria_with_ja.json', JSON.stringify(criteria, null, 2), 'utf8')
    console.log('Japanese translations saved to evaluationCriteria_with_ja.json')
  } catch (error) {
    console.error('Error processing evaluation criteria:', error)
  }
}

translateEvaluationCriteria()
