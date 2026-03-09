'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { MessageCircle, WifiOff } from 'lucide-react'

/* ------------------------------------------------------------------ */
/* ADVISOR PAGE — AI Advisor (stub, direct URL only)                   */
/* ------------------------------------------------------------------ */

export default function AdvisorPage() {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    setOnline(navigator.onLine)
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  return (
    <>
      {/* Hide nav for clean advisor experience */}
      <style>{`nav { display: none !important; }`}</style>

      <div className="min-h-screen flex items-center justify-center bg-bg-surface relative">
        <Image
          src="/images/generated/topo-texture-dark.png"
          alt=""
          fill
          className="object-cover opacity-5"
          sizes="100vw"
        />
        <div className="relative z-10 text-center max-w-md px-6">
          <Image
            src="/images/scraped/gmc/cropped-GMC-Logo-2-270x270.png"
            alt="GMC"
            width={56}
            height={56}
            className="mx-auto mb-6 opacity-60"
          />
          <h1 className="font-playfair text-3xl md:text-4xl text-brand-navy mb-4">AI Advisor</h1>
          {online ? (
            <>
              <div className="w-16 h-16 rounded-full bg-brand-navy/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="text-brand-navy" size={28} />
              </div>
              <p className="text-text-secondary text-lg mb-2">
                Ask questions about GMC&apos;s mining assets, geological data, and partnership opportunity.
              </p>
              <p className="text-text-muted text-sm">
                Coming soon — this feature is being configured.
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                <WifiOff className="text-amber-500" size={28} />
              </div>
              <p className="text-text-secondary text-lg mb-2">
                The AI Advisor requires an internet connection.
              </p>
              <p className="text-text-muted text-sm">
                Please connect to the internet and refresh to use this feature.
              </p>
            </>
          )}
        </div>
      </div>
    </>
  )
}
