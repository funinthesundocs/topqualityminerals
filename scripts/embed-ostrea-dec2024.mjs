import { readFileSync } from 'fs'
import { config } from 'dotenv'
import { resolve } from 'path'

config({ path: resolve(import.meta.dirname, '..', '.env') })

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const SUPABASE_URL = 'https://jnvthnhwvnqcuccredym.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const DEAL_ID = '57eb32a1-8550-45d1-8906-64652642c465'
const SOURCE_FILE = 'ostrea-assay-B34805-dec2024.md'

if (!GEMINI_API_KEY) { console.error('Missing GEMINI_API_KEY'); process.exit(1) }
if (!SUPABASE_KEY) { console.error('Missing SUPABASE_SERVICE_ROLE_KEY'); process.exit(1) }

// Read the source document
const docPath = resolve(import.meta.dirname, '..', 'production', 'source-documents', SOURCE_FILE)
const content = readFileSync(docPath, 'utf-8')

// Split on ## headers — each ## starts a new chunk, ### stays with parent
const lines = content.split('\n')
const chunks = []
let currentChunk = []
let currentHeader = ''

for (const line of lines) {
  if (line.startsWith('## ') && currentChunk.length > 0) {
    chunks.push({ header: currentHeader, text: currentChunk.join('\n').trim() })
    currentChunk = [line]
    currentHeader = line.replace('## ', '').trim()
  } else {
    if (line.startsWith('## ')) currentHeader = line.replace('## ', '').trim()
    currentChunk.push(line)
  }
}
if (currentChunk.length > 0) {
  chunks.push({ header: currentHeader, text: currentChunk.join('\n').trim() })
}

console.log(`Split into ${chunks.length} chunks:`)
chunks.forEach((c, i) => console.log(`  Chunk ${i+1}: "${c.header}" — ~${c.text.length} chars`))

// Embed and insert each chunk
let successCount = 0
let failCount = 0

for (let i = 0; i < chunks.length; i++) {
  const chunk = chunks[i]
  const chunkText = `[Source: ${SOURCE_FILE}]\n\n${chunk.text}`

  try {
    // Get embedding from Gemini
    const embRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: { parts: [{ text: chunkText }] },
          outputDimensionality: 1536,
        }),
      }
    )

    if (!embRes.ok) {
      const err = await embRes.text()
      console.error(`  Chunk ${i+1} embedding FAILED: ${embRes.status} ${err}`)
      failCount++
      continue
    }

    const embData = await embRes.json()
    const embedding = embData.embedding?.values
    if (!embedding || embedding.length === 0) {
      console.error(`  Chunk ${i+1} embedding returned no values`)
      failCount++
      continue
    }

    // Insert into Supabase
    const insertRes = await fetch(`${SUPABASE_URL}/rest/v1/intelligence_documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        deal_id: DEAL_ID,
        content: chunkText,
        embedding: JSON.stringify(embedding),
        track: 'source',
        category: 'assay',
        document_type: 'processed_intelligence',
        source_file: SOURCE_FILE,
        confidence_level: 'high',
        verified: true,
        processing_status: 'verified',
      }),
    })

    if (!insertRes.ok) {
      const err = await insertRes.text()
      console.error(`  Chunk ${i+1} insert FAILED: ${insertRes.status} ${err}`)
      failCount++
      continue
    }

    const inserted = await insertRes.json()
    console.log(`  Chunk ${i+1} OK — id: ${inserted[0]?.id} — ${embedding.length} dims — ~${Math.round(chunkText.length / 4)} tokens`)
    successCount++
  } catch (err) {
    console.error(`  Chunk ${i+1} ERROR: ${err.message}`)
    failCount++
  }
}

console.log(`\nDone: ${successCount} embedded, ${failCount} failed`)
