import translate from 'google-translate-api-x'
import fs from 'fs/promises'
import unitProcesses from '../src/app/data/unitProcesses.json' assert { type: 'json' }

async function translateText(text) {
  try {
    const res = await translate(text, { to: 'ja' })
    return res.text
  } catch (error) {
    console.error(`Error translating "${text}":`, error.message)
    return text // fallback to original text on error
  }
}

async function translateUnitProcesses() {
  const translatedProcesses = await Promise.all(
    unitProcesses.map(async (proc) => {
      const nameJa = await translateText(proc.name)
      console.log(`Translated "${proc.name}" -> "${nameJa}"`)
      return {
        ...proc,
        nameJa
      }
    })
  )

  await fs.writeFile(
    './unitProcesses_with_ja.json',
    JSON.stringify(translatedProcesses, null, 2),
    'utf8'
  )
  console.log('Translated unitProcesses saved to unitProcesses_with_ja.json')
}

translateUnitProcesses()
