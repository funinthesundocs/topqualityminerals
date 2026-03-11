'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'

/* ------------------------------------------------------------------ */
/* PRESENTATION — Full-screen slide viewer                             */
/* 8 Gemini-generated slides. Arrow keys / click to navigate.          */
/* ------------------------------------------------------------------ */

const slides = [
  { src: '/images/slides/slide-01-partnership.png', alt: 'A Partnership Built for This Moment' },
  { src: '/images/slides/slide-02-minerals.png', alt: 'What\'s Inside the Mountain' },
  { src: '/images/slides/slide-03-why-this-works.png', alt: 'Why This Works' },
  { src: '/images/slides/slide-04-convergent-validation.png', alt: 'Convergent Validation' },
  { src: '/images/slides/slide-05-roadmap.png', alt: 'The Development Roadmap' },
  { src: '/images/slides/slide-06-already-addressed.png', alt: 'Already Addressed' },
  { src: '/images/slides/slide-07-build-together.png', alt: 'What We Build Together' },
  { src: '/images/slides/slide-08-first-step.png', alt: 'The First Step' },
]

export default function PresentationPage() {
  const [current, setCurrent] = useState(0)

  const goNext = useCallback(() => {
    setCurrent(prev => Math.min(prev + 1, slides.length - 1))
  }, [])

  const goPrev = useCallback(() => {
    setCurrent(prev => Math.max(prev - 1, 0))
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        goNext()
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        goPrev()
      }
      // Home / End
      if (e.key === 'Home') { e.preventDefault(); setCurrent(0) }
      if (e.key === 'End') { e.preventDefault(); setCurrent(slides.length - 1) }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [goNext, goPrev])

  return (
    <>
      <style>{`nav, footer { display: none !important; } body { overflow: hidden; }`}</style>

      {/* Full-screen black background */}
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        {/* Slide image — fills viewport while maintaining aspect ratio */}
        <Image
          key={slides[current].src}
          src={slides[current].src}
          alt={slides[current].alt}
          width={1920}
          height={1080}
          className="max-w-full max-h-full object-contain"
          sizes="100vw"
          priority
        />

        {/* Click zones — left half goes back, right half goes forward */}
        <div
          className="absolute inset-y-0 left-0 w-1/2 cursor-pointer z-10"
          onClick={goPrev}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/2 cursor-pointer z-10"
          onClick={goNext}
        />

        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/10">
          <div
            className="h-full bg-[#C5922E] transition-all duration-300"
            style={{ width: `${((current + 1) / slides.length) * 100}%` }}
          />
        </div>

        {/* Slide counter */}
        <div className="fixed bottom-4 right-4 z-50 font-mono text-sm text-white/50 bg-black/60 backdrop-blur rounded-full px-3 py-1">
          {current + 1} / {slides.length}
        </div>
      </div>
    </>
  )
}
