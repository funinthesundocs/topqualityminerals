'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { DepositCrossSection } from '@/components/DepositCrossSection'
import { CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'

const sections = [
  'Opening', 'The Opportunity', 'The Alignment', 'The Proof',
  'The Plan', 'The Protection', 'The Vision', 'The Ask',
]

function CountUp({ target, suffix = '' }: { target: string; suffix?: string }) {
  const [value, setValue] = useState('0')
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const numericPart = target.replace(/[^0-9.]/g, '')
        const num = parseFloat(numericPart)
        const prefix = target.replace(numericPart, '').replace(/[^,]/g, '')
        if (isNaN(num)) { setValue(target); return }
        const duration = 1500
        const steps = 40
        const stepTime = duration / steps
        let step = 0
        const interval = setInterval(() => {
          step++
          const progress = step / steps
          const current = num * progress
          if (target.includes(',')) {
            setValue(Math.round(current).toLocaleString())
          } else if (target.includes('.')) {
            setValue(current.toFixed(target.split('.')[1]?.replace(/[^0-9]/g, '').length || 0))
          } else {
            setValue(Math.round(current).toString())
          }
          if (step >= steps) {
            clearInterval(interval)
            setValue(target.replace(suffix, ''))
          }
        }, stepTime)
        observer.disconnect()
        return () => clearInterval(interval)
      }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix])

  return <div ref={ref} className="font-mono font-bold text-5xl md:text-7xl text-brand-navy projector-scale">{value}{suffix}</div>
}

export default function PresentationPage() {
  const [currentSection, setCurrentSection] = useState(0)
  const [online, setOnline] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setOnline(navigator.onLine)
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => { window.removeEventListener('online', on); window.removeEventListener('offline', off) }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const sectionEls = container.querySelectorAll('[data-section]')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt((entry.target as HTMLElement).dataset.section || '0')
          setCurrentSection(idx)
        }
      })
    }, { root: container, threshold: 0.5 })
    sectionEls.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const container = containerRef.current
    if (!container) return
    const sectionEls = container.querySelectorAll('[data-section]')
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault()
      const next = Math.min(currentSection + 1, sections.length - 1)
      sectionEls[next]?.scrollIntoView({ behavior: 'smooth' })
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault()
      const prev = Math.max(currentSection - 1, 0)
      sectionEls[prev]?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentSection])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      {/* Hide default nav/footer for presentation */}
      <style>{`nav, footer { display: none !important; }`}</style>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-border">
        <div
          className="h-full bg-brand-navy transition-all duration-500"
          style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
        />
      </div>

      {/* Section counter */}
      <div className="fixed bottom-6 right-6 z-50 font-mono text-sm text-text-muted bg-white/90 backdrop-blur rounded-full px-3 py-1 shadow-sm">
        {currentSection + 1} / {sections.length}
      </div>

      {/* Scroll-snap container */}
      <div
        ref={containerRef}
        className="h-screen overflow-y-auto snap-y snap-mandatory md:snap-always"
        style={{ scrollSnapType: 'y mandatory' }}
      >
        {/* Section 1: Opening */}
        <section data-section="0" className="min-h-screen flex items-center justify-center snap-start relative"
          style={{ backgroundImage: `url('/images/site-photos/Mountains.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
          <div className="relative z-10 text-center px-6">
            <h1 className="font-playfair font-bold text-4xl md:text-6xl lg:text-7xl text-white mb-12 projector-scale">
              A Partnership Built for This Moment
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { target: '5,906', suffix: ' ha', label: 'Concession' },
                { target: '9', label: 'Labs' },
                { target: '8', label: 'Drill Holes' },
                { target: '493', suffix: 'm', label: 'Drilled' },
              ].map(m => (
                <div key={m.label} className="text-center">
                  <CountUp target={m.target} suffix={m.suffix} />
                  <div className="text-white/70 text-sm uppercase tracking-widest mt-2">{m.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 2: The Opportunity */}
        <section data-section="1" className="min-h-screen flex items-center snap-start bg-white">
          <div className="content-wrapper w-full">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary text-center mb-16 projector-scale">The Opportunity</h2>
            <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16">
              {[
                { value: '67.31% Fe', desc: 'Production-grade iron ore. POSCO International confirmed.' },
                { value: '39.5% Cu', desc: 'Near-concentrate copper. Four laboratories across a decade.' },
                { value: '20.35 g/t Au', desc: 'Highest gold from fire assay. By-product from copper processing.' },
              ].map(m => (
                <div key={m.value} className="text-center">
                  <div className="font-mono font-bold text-4xl md:text-5xl text-brand-navy projector-scale">{m.value}</div>
                  <p className="text-text-secondary mt-4 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-text-secondary max-w-3xl mx-auto text-lg">
              21.6 million metric tons of copper ore. 16 million metric tons of iron ore.
              <br /><span className="font-semibold text-text-primary">From less than 9% of the concession explored.</span>
            </p>
          </div>
        </section>

        {/* Section 3: The Alignment */}
        <section data-section="2" className="min-h-screen flex items-center snap-start bg-bg-surface">
          <div className="content-wrapper w-full">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary text-center mb-16 projector-scale">The Alignment</h2>
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-12">
              <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(12,25,38,0.06)]">
                <h3 className="font-bold text-brand-navy text-xl mb-6">What GMC Brings</h3>
                <ul className="space-y-4 text-text-secondary">
                  {['MPSA — 5,906 hectares, active', '9-lab validated deposit', 'Community — 60% Lumad workforce', 'MGB-approved operator', '15+ years site knowledge'].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle className="text-success flex-shrink-0 mt-0.5" size={18} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(12,25,38,0.06)]">
                <h3 className="font-bold text-brand-navy text-xl mb-6">What a Strategic Partner Brings</h3>
                <ul className="space-y-4 text-text-secondary">
                  {['Construction capability', 'Processing plant expertise', 'Energy supply infrastructure', 'Technology and data science', 'Financial capacity for full development'].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-gold mt-2 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-brand-navy/5 border border-brand-navy/10 rounded-xl p-8 max-w-4xl mx-auto text-center">
              <p className="text-text-secondary leading-relaxed">
                Aboitiz Construction built and has maintained the <span className="font-mono font-bold text-brand-navy">$1.7 billion</span> THPAL
                nickel processing plant in Surigao del Norte for thirteen years. GMC offers the natural next step —
                <span className="font-semibold text-text-primary"> from mining services to mining partnership.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: The Proof */}
        <section data-section="3" className="min-h-screen flex items-center snap-start bg-white">
          <div className="content-wrapper w-full">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary text-center mb-12 projector-scale">The Proof</h2>
            <DepositCrossSection />
          </div>
        </section>

        {/* Section 5: The Plan */}
        <section data-section="4" className="min-h-screen flex items-center snap-start bg-bg-surface">
          <div className="content-wrapper w-full">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary text-center mb-16 projector-scale">The Plan</h2>
            <div className="max-w-4xl mx-auto">
              {[
                { phase: 1, title: 'Exploration Partnership', desc: 'Confirm copper at depth. Ship first vessel. Commercial permit.' },
                { phase: 2, title: 'Feasibility Study', desc: 'JORC-compliant resource estimate. Bankable feasibility.' },
                { phase: 3, title: 'Permitting', desc: 'ECC. Development permits. Full regulatory compliance.' },
                { phase: 4, title: 'Plant Construction', desc: 'Processing facility. Infrastructure. AAAA capability deploys.' },
                { phase: 5, title: 'Production', desc: 'Commercial operations. Maintenance model. Recurring revenue.' },
              ].map((p, i) => (
                <div key={p.phase} className="flex items-start gap-6 mb-8 last:mb-0">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-brand-navy text-white flex items-center justify-center font-mono font-bold text-lg">
                    {p.phase}
                  </div>
                  <div className="flex-1 bg-white rounded-xl p-6 shadow-[0_2px_8px_rgba(12,25,38,0.06)]">
                    <h3 className="font-bold text-text-primary text-lg">{p.title}</h3>
                    <p className="text-text-secondary mt-1">{p.desc}</p>
                  </div>
                  {i < 4 && <div className="hidden md:block w-14 flex-shrink-0" />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 6: The Protection */}
        <section data-section="5" className="min-h-screen flex items-center snap-start bg-white">
          <div className="content-wrapper w-full text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-text-primary mb-4 projector-scale">The Protection</h2>
            <p className="text-text-secondary text-lg mb-16 max-w-2xl mx-auto">
              We have already thought about everything you are about to ask
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
              {[
                { status: 'green', label: 'FPIC', desc: 'Approved by indigenous communities' },
                { status: 'green', label: 'MGB Status', desc: 'Director ORDER confirming GMC as operator' },
                { status: 'green', label: 'Legal Standing', desc: 'Final court ruling in GMC favor' },
              ].map(item => (
                <div key={item.label} className="bg-success/5 border border-success/20 rounded-xl p-6">
                  <CheckCircle className="text-success mx-auto mb-3" size={28} />
                  <h3 className="font-bold text-text-primary">{item.label}</h3>
                  <p className="text-text-secondary text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {[
                { label: 'Copper at Depth', desc: 'Sulfide confirmed at 60-65m. Targeted drilling is Phase 1.' },
                { label: 'Mercury', desc: 'Identified proactively. Minamata compliance from outset.' },
              ].map(item => (
                <div key={item.label} className="bg-amber/5 border border-amber/20 rounded-xl p-6">
                  <AlertTriangle className="text-amber mx-auto mb-3" size={28} />
                  <h3 className="font-bold text-text-primary">{item.label}</h3>
                  <p className="text-text-secondary text-sm mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 7: The Vision */}
        <section data-section="6" className="min-h-screen flex items-center justify-center snap-start relative"
          style={{ backgroundImage: `url('/images/site-photos/Mountains.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="relative z-10 text-center px-6">
            <h2 className="font-playfair font-bold text-4xl md:text-6xl text-white mb-6 projector-scale">
              Building for Business to Prosper<br />and Communities to Thrive
            </h2>
            <p className="text-white/70 text-xl mt-8">
              <span className="font-mono font-bold text-white text-3xl">32</span> years remaining on MPSA.
              A multi-generational partnership.
            </p>
          </div>
        </section>

        {/* Section 8: The Ask */}
        <section data-section="7" className="min-h-screen flex items-center snap-start bg-white">
          <div className="content-wrapper w-full text-center">
            <h2 className="font-playfair font-bold text-4xl md:text-6xl text-text-primary mb-16 projector-scale">
              The Next Step
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
              {[
                { num: '01', title: 'Phase 1 Exploration Partnership' },
                { num: '02', title: 'Technical Team Introduction' },
                { num: '03', title: 'Joint Site Assessment' },
              ].map(item => (
                <div key={item.num} className="bg-bg-surface rounded-xl p-8">
                  <div className="font-mono font-bold text-3xl text-brand-navy mb-3">{item.num}</div>
                  <h3 className="font-bold text-text-primary text-lg">{item.title}</h3>
                </div>
              ))}
            </div>
            {online && (
              <a
                href="/advisor"
                className="inline-flex items-center gap-2 text-text-muted hover:text-brand-navy transition-colors text-sm"
              >
                Have questions? Ask our AI advisor <ArrowRight size={14} />
              </a>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
