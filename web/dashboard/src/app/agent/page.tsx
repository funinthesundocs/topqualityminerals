'use client'

import { useState, useRef, useEffect, useCallback, FormEvent } from 'react'
import { Brain, Send, User, Bot } from 'lucide-react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const SUGGESTED_QUESTIONS = [
  'What are the key geological assets in the partnership?',
  'Summarize Sebastian Aboitiz\'s decision-making priorities',
  'What regulatory risks should we prepare for?',
  'What is GMC\'s leverage in this deal?',
  'Outline the recommended meeting strategy',
]

function formatMarkdown(text: string): string {
  // Bold: **text**
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  // Italic: *text* (but not inside bold)
  html = html.replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
  // Inline code: `text`
  html = html.replace(/`([^`]+)`/g, '<code class="font-mono bg-zinc-800 px-1 py-0.5 rounded text-sm">$1</code>')
  // Line breaks
  html = html.replace(/\n/g, '<br />')
  // Bullet lists: lines starting with - or *
  html = html.replace(/((?:^|<br \/>)\s*[-*]\s+.+(?:<br \/>\s*[-*]\s+.+)*)/g, (match) => {
    const items = match
      .split(/<br \/>/)
      .filter(line => line.trim().match(/^[-*]\s+/))
      .map(line => `<li class="ml-4">${line.trim().replace(/^[-*]\s+/, '')}</li>`)
      .join('')
    return `<ul class="list-disc pl-4 my-1">${items}</ul>`
  })
  return html
}

export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isStreaming) return

    const userMessage: Message = { role: 'user', content: text.trim() }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setIsStreaming(true)

    // Add empty assistant message for streaming
    const assistantMessage: Message = { role: 'assistant', content: '' }
    setMessages([...updatedMessages, assistantMessage])

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
          question: text.trim(),
        }),
      })

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Request failed' }))
        throw new Error(errorData.error || `API error: ${res.status}`)
      }

      const reader = res.body?.getReader()
      if (!reader) throw new Error('No response stream')

      const decoder = new TextDecoder()
      let assistantContent = ''
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // Parse SSE events from the buffer
        const lines = buffer.split('\n')
        buffer = lines.pop() || '' // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6)
            if (data === '[DONE]') continue

            try {
              const parsed = JSON.parse(data)
              if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
                assistantContent += parsed.delta.text
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = { role: 'assistant', content: assistantContent }
                  return updated
                })
              }
            } catch {
              // Skip unparseable lines
            }
          }
        }
      }

      // Finalize the message
      if (assistantContent) {
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: assistantContent }
          return updated
        })
      }
    } catch (error: any) {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: `Error: ${error.message || 'Something went wrong. Please try again.'}`,
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
      inputRef.current?.focus()
    }
  }, [messages, isStreaming])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleChipClick = (question: string) => {
    sendMessage(question)
  }

  return (
    <div className="page-enter flex flex-col h-[calc(100vh-7rem)] -mt-2">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 border-b border-zinc-800">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-primary-muted)]">
          <Brain size={20} className="text-[var(--color-primary)]" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-zinc-100">AI Agent</h1>
          <p className="text-xs text-zinc-500">RAG-powered deal intelligence advisor</p>
        </div>
      </div>

      {/* Message Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto py-4 space-y-4 scroll-smooth">
        {messages.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800">
              <Brain size={32} className="text-[var(--color-primary)] opacity-60" />
            </div>
            <div className="text-center">
              <p className="text-zinc-300 text-lg font-medium">Ask anything about the GMC x Aboitiz deal</p>
              <p className="text-zinc-600 text-sm mt-1">Powered by RAG retrieval over the intelligence database</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleChipClick(q)}
                  className="px-3 py-1.5 text-sm text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-full hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Messages */
          messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="flex-shrink-0 w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center mt-0.5">
                  <Bot size={14} className="text-[var(--color-primary)]" />
                </div>
              )}
              <div
                className={`max-w-[75%] rounded-lg px-4 py-3 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-zinc-800 text-zinc-100'
                    : 'bg-zinc-900 border-l-2 border-[var(--color-primary)] text-zinc-200'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <>
                    <div
                      dangerouslySetInnerHTML={{ __html: formatMarkdown(msg.content) }}
                    />
                    {isStreaming && i === messages.length - 1 && (
                      <span className="inline-flex gap-1 ml-1 mt-1">
                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-pulse" />
                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-pulse [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 bg-[var(--color-primary)] rounded-full animate-pulse [animation-delay:300ms]" />
                      </span>
                    )}
                  </>
                ) : (
                  <span>{msg.content}</span>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center mt-0.5">
                  <User size={14} className="text-zinc-400" />
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-3 pt-4 border-t border-zinc-800">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about the deal..."
          disabled={isStreaming}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors disabled:opacity-50"
          autoFocus
        />
        <button
          type="submit"
          disabled={!input.trim() || isStreaming}
          className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--color-primary)] text-black hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  )
}
