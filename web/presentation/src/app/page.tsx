import { SectionHero } from '@/components/SectionHero'
import { MetricCard } from '@/components/MetricCard'
import { Button } from '@/components/Button'
import { ArrowRight, Mountain, FlaskConical, Pickaxe } from 'lucide-react'

const metrics = [
  { value: '5,906', unit: 'Hectares', label: 'Concession Area' },
  { value: '9', unit: 'Labs', label: 'Independent Validation' },
  { value: '8', unit: 'Drill Holes', label: 'Subsurface Confirmation' },
  { value: '67.31%', unit: 'Fe', label: 'Premium Iron Ore' },
  { value: '21.6M', unit: 'MT', label: 'Copper Ore Resource' },
]

const minerals = [
  { name: 'Iron Ore', grade: '67.31% Fe', color: 'bg-brand-iron', desc: 'Production-grade premium iron ore confirmed by POSCO International', icon: Mountain },
  { name: 'Copper', grade: '39.5% Cu', color: 'bg-brand-copper', desc: 'Near-concentrate copper validated across four laboratories over a decade', icon: FlaskConical },
  { name: 'Gold', grade: '20.35 g/t Au', color: 'bg-brand-gold', desc: 'Highest fire assay result — by-product from copper processing', icon: Pickaxe },
]

export default function HomePage() {
  return (
    <>
      <SectionHero
        headline="Bringing Precious Ores to the Light"
        subheadline="A polymetallic deposit validated by nine independent laboratories across five countries"
        imageSrc="/images/site-photos/Mountains.jpg"
        height="h-screen"
        showScroll
      />

      {/* Metrics Strip */}
      <section className="bg-bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {metrics.map(m => (
              <MetricCard key={m.label} value={m.value} unit={m.unit} label={m.label} />
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section-padding">
        <div className="content-wrapper">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
                The Company
              </h2>
              <div className="space-y-6 text-text-secondary leading-relaxed">
                <p>
                  Genluiching Mining Corporation (GMC) is a Philippine mining company holding MPSA 251(A)-2007-XI,
                  a 5,906-hectare mineral concession in Tarragona and Mati City, Davao Oriental. The concession hosts
                  a polymetallic deposit — iron ore, copper, gold, and associated minerals — validated by nine
                  independent laboratories across five countries and confirmed by three geophysical methods.
                </p>
                <p>
                  Nine laboratories have tested material from across the concession using different methods and sample
                  types. POSCO International confirmed production-grade iron ore at 67.31% Fe. Intertek Minerals&apos;
                  136-sample systematic campaign proved deposit-scale mineralization. Beijing BGRIMM corroborated
                  copper-gold grades through CNAS-accredited testing. The SGECS geological assessment, filed with MGB
                  Region XI in June 2025, identified 21.6 million metric tons of copper ore and 16 million metric tons
                  of iron ore within just 518 hectares explored — less than 9% of the total concession.
                </p>
                <p>
                  GMC is seeking a strategic partner with the operational capacity, financial resources, and long-term
                  vision to develop this asset at scale. The regulatory environment is the most favorable in fifteen
                  years. The geology is validated. The opportunity is now.
                </p>
              </div>
              <div className="mt-8 flex gap-4 flex-wrap">
                <Button href="/assets">Explore the Evidence</Button>
                <Button href="/presentation" variant="secondary">View Presentation</Button>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/3]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/images/site-photos/Mati Mining Site.jpeg')` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Asset Preview */}
      <section className="section-padding bg-bg-surface">
        <div className="content-wrapper">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
            A Polymetallic Asset
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
            Three primary commodities validated by convergent laboratory evidence
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {minerals.map(m => (
              <div key={m.name} className="bg-white rounded-xl shadow-[0_2px_8px_rgba(12,25,38,0.06)] p-8 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className={`w-12 h-12 ${m.color} rounded-lg flex items-center justify-center mb-6`}>
                  <m.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-1">{m.name}</h3>
                <div className="font-mono font-bold text-2xl text-brand-navy mb-3">{m.grade}</div>
                <p className="text-text-secondary text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Button href="/assets">Full Evidence Portfolio <ArrowRight className="inline ml-2" size={16} /></Button>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="section-padding">
        <div className="content-wrapper text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
            A Partnership Built for This Moment
          </h2>
          <p className="text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed">
            GMC brings 15 years of site knowledge, validated geology, and community trust.
            A strategic partner brings construction capability, processing expertise, and the
            financial capacity for full-scale development.
          </p>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="bg-bg-surface rounded-xl p-8 text-left">
              <h3 className="font-bold text-brand-navy text-lg mb-4">What GMC Brings</h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li className="flex items-start gap-3"><span className="text-success font-bold mt-0.5">&#10003;</span>MPSA — 5,906 hectares, active</li>
                <li className="flex items-start gap-3"><span className="text-success font-bold mt-0.5">&#10003;</span>9-lab validated deposit</li>
                <li className="flex items-start gap-3"><span className="text-success font-bold mt-0.5">&#10003;</span>Community trust — 60% Lumad workforce</li>
                <li className="flex items-start gap-3"><span className="text-success font-bold mt-0.5">&#10003;</span>MGB-approved operator</li>
                <li className="flex items-start gap-3"><span className="text-success font-bold mt-0.5">&#10003;</span>15+ years site knowledge</li>
              </ul>
            </div>
            <div className="bg-bg-surface rounded-xl p-8 text-left">
              <h3 className="font-bold text-brand-navy text-lg mb-4">What a Strategic Partner Brings</h3>
              <ul className="space-y-3 text-text-secondary text-sm">
                <li className="flex items-start gap-3"><span className="text-brand-gold font-bold mt-0.5">&#9679;</span>Construction capability</li>
                <li className="flex items-start gap-3"><span className="text-brand-gold font-bold mt-0.5">&#9679;</span>Processing plant expertise</li>
                <li className="flex items-start gap-3"><span className="text-brand-gold font-bold mt-0.5">&#9679;</span>Energy supply infrastructure</li>
                <li className="flex items-start gap-3"><span className="text-brand-gold font-bold mt-0.5">&#9679;</span>Technology and data science</li>
                <li className="flex items-start gap-3"><span className="text-brand-gold font-bold mt-0.5">&#9679;</span>Financial capacity for full development</li>
              </ul>
            </div>
          </div>
          <div className="mt-10">
            <Button href="/presentation">View Full Presentation</Button>
          </div>
        </div>
      </section>
    </>
  )
}
