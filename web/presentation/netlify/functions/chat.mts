import type { Context } from "@netlify/functions"
import { createClient } from '@supabase/supabase-js'

export default async (req: Request, _context: Context) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const { messages, question, voice } = await req.json()

    // 1. Embed the question using Gemini
    const geminiApiKey = Netlify.env.get('GEMINI_API_KEY')

    const embeddingRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: { parts: [{ text: question }] },
          outputDimensionality: 1536,
        }),
      }
    )
    const embeddingData = await embeddingRes.json()
    const embedding = embeddingData.embedding.values

    // 2. Query Supabase match_intelligence RPC
    const supabase = createClient(
      Netlify.env.get('NEXT_PUBLIC_SUPABASE_URL')!,
      Netlify.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )
    const { data: chunks } = await supabase.rpc('match_intelligence', {
      query_embedding: embedding,
      match_threshold: 0.3,
      match_count: 10,
    })

    // 3. Assemble context
    const context = (chunks || [])
      .map((c: any) => `[${c.track}/${c.category} | similarity: ${c.similarity?.toFixed(3)}]\n${c.content}`)
      .join('\n\n---\n\n')

    const lengthGuidance = voice
      ? `CRITICAL LENGTH CONSTRAINT: This answer will be read aloud. You MUST keep your entire response under 75 words (about 30 seconds of speech). Give ONE key fact or answer — no lists, no bullet points, no elaboration. Think "elevator pitch sentence" not "briefing document". If the topic is complex, give the single most important point and say "I can elaborate if you'd like."`
      : `LENGTH CONSTRAINT: Keep responses concise — 100 words maximum, but shorter is always better. Lead with the direct answer. No bullet lists unless specifically asked. If more depth is needed, the user will ask.`

    const systemPrompt = `You are the GMC AI Assistant — an expert advisor on Genluiching Mining Corporation's mining assets, geological data, and partnership opportunity. You speak with authority about the company's 5,906-hectare MPSA concession in Davao Oriental, validated mineral deposits (iron, copper, gold), and the partnership value proposition.

You are direct, specific, and cite data when available. You do not hedge unnecessarily but flag genuine uncertainties honestly. You are speaking with potential partners, investors, or interested parties visiting the GMC website.

The following context has been retrieved from the intelligence database based on relevance to the current question:

${context}

${lengthGuidance}`

    // 4. Call Anthropic API with streaming
    const maxTokens = voice ? 150 : 300

    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': Netlify.env.get('ANTHROPIC_API_KEY')!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: maxTokens,
        system: systemPrompt,
        messages: messages,
        stream: true,
      }),
    })

    return new Response(anthropicRes.body, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
