'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { EvidenceModal, type EvidenceData, type EvidenceType } from '@/components/EvidenceModal'

/* ------------------------------------------------------------------ */
/* HOMEPAGE — Aboitiz-style structure with GMC assets                  */
/* ------------------------------------------------------------------ */

const heroSlides = [
  {
    image: '/images/generated/hero-landscape-enhanced.png',
    headline: 'Bringing Precious Ores to the Light',
    sub: 'A polymetallic deposit validated by nine independent laboratories across five countries',
  },
  {
    image: '/images/generated/operations-cinematic.png',
    headline: '5,906 Hectares of Validated Mineral Assets',
    sub: 'Iron, copper, and gold confirmed across eight core samples and 493 meters of drilling',
  },
  {
    image: '/images/site-photos/Mountains.jpg',
    headline: 'Seeking a Strategic Partner',
    sub: 'To develop one of the Philippines\' most promising polymetallic deposits',
  },
]

const metricEvidence: Record<string, EvidenceData> = {
  'Concession Area': {
    title: '5,906-Hectare MPSA Concession — Davao Oriental',
    type: 'image' as EvidenceType,
    src: '/images/evidence/mati-overhead.jpg',
    imageWidth: 2400,
    imageHeight: 1562,
    caption: 'Google Earth satellite overlay showing the full 5,906-hectare GMC concession in Tarragona and Mati City, Davao Oriental. The concession boundary is marked in yellow-green, with drill sites, features, and the Mati City Port visible. Dense tropical forest canopy covers the mineral-rich terrain.',
    source: 'MPSA No. 251(A)-2007-XI — Approved July 28, 2007, active through July 28, 2032 with 25-year renewal option. MGB Director ORDER confirming GMC as authorized operator, May 2022.',
  },
  'Independent Validation': {
    title: 'Nine Independent Laboratories, Five Countries',
    type: 'image' as EvidenceType,
    src: '/images/generated/evidence-portfolio.png',
    imageWidth: 2752,
    imageHeight: 1536,
    caption: 'Nine laboratories across South Korea, China, Philippines, and Indonesia have independently validated the deposit. Each laboratory answered a different question — grade, consistency, depth persistence, processability — and all converge on the same deposit model.',
    source: 'Laboratory reports spanning 2012–2025. POSCO International, Intertek Minerals, Beijing BGRIMM (CNAS-accredited), Davao Analytical, HK Imperial Processing, Ostrea Mineral Labs, CCIC Philippines, SGS Korea, Laboratorium Uji Kimia Dan Mekanik.',
  },
  'Poly-Mineralization': {
    title: 'Electromagnetic Survey — 3D Subsurface Model',
    type: 'image' as EvidenceType,
    src: '/images/evidence/emscan3.jpeg',
    imageWidth: 1170,
    imageHeight: 882,
    caption: '3D electromagnetic survey visualization showing massive mineralization body extending from surface to depth. Hot zones (red/magenta) indicate high-conductivity polymetallic mineralization — iron, copper, and gold confirmed by nine laboratories.',
    source: 'EM survey conducted over GMC concession area. 3D inversion model overlaid on Google Earth terrain. Confirms deposit continuity at depth consistent with porphyry copper-gold system.',
  },
  'Peak Iron Grade': {
    title: 'POSCO International — 67.31% Fe Assay',
    type: 'image' as EvidenceType,
    src: '/images/evidence/posco-assay.png',
    imageWidth: 1530,
    imageHeight: 2340,
    caption: 'POSCO International sample analysis results showing T-Fe at 67.31% for fine ore and 67.31% for lump ore — shipping-grade premium with very low phosphorus (0.012–0.021%) and sulfur (0.002–0.013%). Comparable to top-tier Brazilian and Australian product.',
    source: 'POSCO International analysis, 2019. Sample: production-representative stockpile ore. Independently confirmed by SGS Korea (59.33% Fe) and CCIC Philippines (59.34% Fe).',
  },
  'Peak Copper Grade': {
    title: 'Davao Analytical — 39.5% Cu Assay',
    type: 'image' as EvidenceType,
    src: '/images/evidence/davao-analytical-assay.png',
    imageWidth: 1488,
    imageHeight: 2105,
    caption: 'Davao Analytical Laboratories test report for Genluiching Mining Corp. showing iron, copper, gold, and sulfur analysis via Wet Digestion and AAS methods. Near-concentrate copper grades confirmed across multiple samples.',
    source: 'Davao Analytical Laboratories (DALINC), PRC-registered analysts, March–April 2025. Confirmed by Beijing BGRIMM (20.72% Cu, CNAS-accredited) and Ostrea Mineral Labs (36.58% Cu from core).',
  },
  'Resource Estimate': {
    title: 'Porphyry Deposit Model — Ore Body Structure',
    type: 'image' as EvidenceType,
    src: '/images/evidence/emscan2.jpeg',
    imageWidth: 630,
    imageHeight: 531,
    caption: 'Cross-sectional model of a porphyry copper-gold system showing the deposit architecture from lithocap to depth. The GMC concession exhibits this classic structure: iron oxide cap at surface, transition zone with supergene enrichment (where the 39.5% Cu grades originate), and primary sulfide mineralization confirmed at 60–65m depth by drilling. The porphyry target (Cu ± Au ± Mo) lies at 80–200m, within reach of Phase 1 diamond drilling.',
    source: '21.6M MT copper ore and 16–18M MT iron ore estimated from 518 hectares explored — less than 9% of the total 5,906-hectare concession. SGECS geological assessment, MGB Region XI, June 2025.',
  },
}

const metrics = [
  { value: '5,906 ha', label: 'Concession Area' },
  { value: '9 Labs', label: 'Independent Validation' },
  { value: 'EM Verified', label: 'Poly-Mineralization' },
  { value: '67.31% Fe', label: 'Peak Iron Grade' },
  { value: '39.5% Cu', label: 'Peak Copper Grade' },
  { value: '21.6M MT', label: 'Resource Estimate' },
]

const mineralImages = [
  { src: '/images/generated/iron-hero-data.png', alt: 'Iron Ore — 67.31% Fe, POSCO Confirmed' },
  { src: '/images/generated/copper-hero-data.png', alt: 'Copper — 39.5% Cu, Near-Concentrate Grade' },
  { src: '/images/generated/gold-hero-data.png', alt: 'Gold — 20.35 g/t Au, Highest Fire Assay' },
]

const evidenceItems = [
  '9 Independent Laboratories',
  '8 Core Samples — 493m',
  'FPIC Approved',
  'MGB Director ORDER',
  '21.6M MT Copper Ore',
  'SGECS Report Filed',
  'POSCO Up to 67.31% Fe',
  '5 Countries Validated',
]

export default function HomePage() {
  const [activeEvidence, setActiveEvidence] = useState<EvidenceData | null>(null)

  return (
    <>
      {/* ============================================================ */}
      {/* HERO SLIDESHOW                                                */}
      {/* ============================================================ */}
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          loop
          speed={1200}
          className="hero-swiper"
        >
          {heroSlides.map((slide, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-screen">
                <Image
                  src={slide.image}
                  alt={slide.headline}
                  fill
                  className="object-cover"
                  priority={i === 0}
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
                <div className="absolute inset-0 flex items-end pb-[16vh] md:pb-[12vh]">
                  <div className="max-w-7xl mx-auto px-6 w-full">
                    <h1 className="font-playfair text-4xl md:text-5xl lg:text-[3.5rem] text-white font-bold leading-[1.15] max-w-3xl mb-5">
                      {slide.headline}
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl max-w-2xl mb-8 leading-relaxed">
                      {slide.sub}
                    </p>
                    <Link
                      href="/presentation"
                      className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-[15px]"
                    >
                      Explore the Opportunity
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="text-white/40" size={28} />
        </div>
      </section>

      {/* ============================================================ */}
      {/* METRICS STRIP                                                 */}
      {/* ============================================================ */}
      <section className="bg-bg-primary">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5" data-aos="fade-up">
            {metrics.map((m) => (
              <button
                key={m.label}
                onClick={() => setActiveEvidence(metricEvidence[m.label])}
                className={`metric-card bg-white rounded-xl border-2 border-black/80 px-6 py-8 text-center cursor-pointer hover:scale-[1.02] transition-all duration-500 group shadow-[0_4px_6px_rgba(0,0,0,0.08),0_10px_24px_rgba(0,0,0,0.12),0_1px_2px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.12),0_20px_40px_rgba(0,0,0,0.18),0_2px_4px_rgba(0,0,0,0.08)]${m.label === metrics[0].label ? ' metric-card--pulse' : ''}`}
              >
                <div className="relative z-[2] font-mono font-bold text-3xl md:text-[2.5rem] text-brand-navy leading-tight group-hover:text-white transition-colors duration-500">
                  {m.value}
                </div>
                <div className="relative z-[2] text-text-secondary text-xl mt-3 leading-snug group-hover:text-white/70 transition-colors duration-500">{m.label}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* MINERALS — Gemini images ARE the cards, displayed large       */}
      {/* ============================================================ */}
      <section className="section-padding">
        <div className="content-wrapper">
          <div className="text-center mb-12">
            <h2 data-aos="fade-up" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-3">
              A Convergent Evidence Portfolio
            </h2>
            <p data-aos="fade-up" data-aos-delay="100" className="text-text-secondary text-lg">
              Nine laboratories. Five countries. One deposit model.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5" data-aos="fade-up" data-aos-delay="200">
            {mineralImages.map((img) => (
              <Link
                key={img.src}
                href="/assets"
                className="group block relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className="relative aspect-video">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                </div>
              </Link>
            ))}
          </div>

          <div data-aos="fade-up" data-aos-delay="300" className="mt-12 text-center">
            <p className="font-playfair text-2xl md:text-3xl font-bold text-text-primary">
              21.6 million metric tons. From less than 9% explored.
            </p>
            <p className="text-text-secondary text-sm mt-2">
              518 hectares explored of a 5,906-hectare concession
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PARTNERSHIP CTA — topo texture background                     */}
      {/* ============================================================ */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="/images/generated/topo-texture-dark.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0C1926]/80" />
        <div className="relative content-wrapper text-center">
          <h2 data-aos="fade-up" className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            A Partnership Built for This Moment
          </h2>
          <p data-aos="fade-up" data-aos-delay="100" className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            GMC brings 15 years of site knowledge, validated geology, and community trust. A strategic partner brings construction capability, processing expertise, and the financial capacity for full-scale development. The question is not whether — it is when, and with whom.
          </p>
          <div data-aos="fade-up" data-aos-delay="200" className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/presentation"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 shadow-lg text-[15px]"
            >
              View Presentation
              <ArrowRight size={16} />
            </Link>
            <Link
              href="/assets"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-medium px-8 py-4 rounded-full border border-white/20 transition-all duration-300 text-[15px]"
            >
              Explore the Evidence
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* EVIDENCE SWIPER                                               */}
      {/* ============================================================ */}
      <section className="py-16 bg-bg-surface">
        <div className="content-wrapper">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            slidesPerView={2}
            spaceBetween={16}
            loop
            speed={800}
            breakpoints={{
              640: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
            className="evidence-swiper"
          >
            {evidenceItems.map((item, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white rounded-xl px-5 py-6 text-center shadow-sm border border-border hover:border-brand-gold/30 transition-colors duration-300">
                  <span className="font-semibold text-sm text-brand-navy">{item}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ============================================================ */}
      {/* VISION BANNER                                                 */}
      {/* ============================================================ */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/generated/hero-landscape-enhanced.png"
          alt="Davao Oriental"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative text-center px-6" data-aos="fade-up">
          <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-3xl mx-auto leading-tight">
            Building for Business to Prosper and Communities to Thrive
          </h2>
          <p className="text-brand-gold text-lg font-medium tracking-wide">
            To Prosper Lives
          </p>
        </div>
      </section>

      {/* Evidence Modal */}
      <EvidenceModal evidence={activeEvidence} onClose={() => setActiveEvidence(null)} />
    </>
  )
}
