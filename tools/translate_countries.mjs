import translate from 'google-translate-api-x'
import fs from 'fs/promises'

// Function to translate text from English to Japanese
async function translateText(text) {
  try {
    const res = await translate(text, { to: 'ja' })
    return res.text
  } catch (error) {
    console.error(`Error translating "${text}":`, error.message)
    return text // Fallback to original text in case of error
  }
}

async function addJapaneseNames() {
  try {
    // Read the countries JSON file (adjust the path if needed)
    const data = await fs.readFile('../src/app/data/communityInfo.json', 'utf8')
    const countries = JSON.parse(data)
    
    // Loop over each country and add a Japanese name
    for (const country of countries) {
      // Translate the "name" field from English to Japanese
      country.nameJa = await translateText(country.name)
      console.log(`Translated ${country.name} -> ${country.nameJa}`)
    }
    
    // Write the updated array to a new file
    await fs.writeFile('./countries_with_ja.json', JSON.stringify(countries, null, 2), 'utf8')
    console.log('Updated countries with Japanese names saved to countries_with_ja.json')
  } catch (error) {
    console.error('Error processing countries:', error)
  }
}

// Run the translation process
addJapaneseNames()
