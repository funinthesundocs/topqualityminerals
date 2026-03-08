import { Metadata } from 'next'
import { SectionHero } from '@/components/SectionHero'
import { CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — Genluiching Mining Corporation',
  description: 'Corporate history, vision, mission, and governance of Genluiching Mining Corporation.',
}

const timeline = [
  { year: '2007', event: 'MPSA 251(A)-2007-XI granted', detail: 'Mineral Production Sharing Agreement awarded by the Philippine government covering 5,906 hectares in Davao Oriental.' },
  { year: '2012', event: 'Initial laboratory testing begins', detail: 'First systematic sampling campaigns with DALINC and local laboratories establish baseline mineralization data.' },
  { year: '2015', event: 'Iron ore export to China', detail: 'First commercial export — 64.71% Fe iron ore shipped on MV "SEA SUCCESS" to Rizhao, Shandong. Inspected by CCIC Philippines.' },
  { year: '2017', event: 'Drill core program launched', detail: 'Eight drill holes completed to 493m total depth, confirming subsurface mineralization and sulfide transition zone.' },
  { year: '2019', event: 'POSCO International confirms 67.31% Fe', detail: 'South Korean steelmaker validates production-grade premium iron ore with very low impurities.' },
  { year: '2022', event: 'Systematic exploration campaign', detail: 'Two-year SGECS geological exploration program begins, covering September 2022 to September 2024.' },
  { year: '2024', event: 'Intertek 136-sample campaign', detail: 'Deposit-scale mineralization confirmed through systematic sampling across full MPSA area.' },
  { year: '2025', event: 'SGECS geological assessment filed', detail: '21.6M MT copper ore and 16M MT iron ore identified within 518 hectares — less than 9% of concession.' },
]

const values = [
  { title: 'Integrity', desc: 'Every claim traces to verified laboratory data. Nine labs, five countries, no shortcuts.' },
  { title: 'Community', desc: '60% indigenous Lumad workforce. FPIC approved. Development that serves the people who live on the land.' },
  { title: 'Stewardship', desc: 'Progressive rehabilitation from day one. Mining that cares for creation, not just extraction.' },
]

const governance = [
  'MPSA 251(A)-2007-XI — active Mineral Production Sharing Agreement',
  'MGB Director ORDER confirming GMC as registered operator',
  'FPIC approval from indigenous communities',
  'Final court ruling in GMC favor on legal standing',
  'SEC-registered Philippine corporation',
  'MAEM 2025 Diamond Sponsor — premier mining industry event',
]

export default function AboutPage() {
  return (
    <>
      <SectionHero
        headline="About GMC"
        subheadline="Fifteen years of building knowledge, community trust, and geological certainty"
        imageSrc="/images/site-photos/Mining 2.jpeg"
        height="h-[50vh]"
      />

      {/* Timeline */}
      <section className="section-padding">
        <div className="content-wrapper">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-16">Our Journey</h2>
          <div className="relative">
            {/* Horizontal line */}
            <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-border" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {timeline.map((item, i) => (
                <div key={item.year} className="relative">
                  {/* Node */}
                  <div className="hidden lg:flex w-12 h-12 rounded-full bg-brand-navy text-white items-center justify-center font-mono font-bold text-sm mx-auto mb-4 relative z-10">
                    {i + 1}
                  </div>
                  <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(12,25,38,0.06)] p-6 hover:shadow-md transition-shadow">
                    <div className="font-mono font-bold text-brand-navy text-2xl mb-2">{item.year}</div>
                    <h3 className="font-bold text-text-primary mb-2">{item.event}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission / Values */}
      <section className="section-padding bg-bg-surface">
        <div className="content-wrapper">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">Vision &amp; Mission</h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              <strong className="text-text-primary">Vision:</strong> To be the Philippines&apos; model for responsible mining — where geological wealth
              creates lasting prosperity for communities, partners, and the nation.
            </p>
            <p className="text-text-secondary leading-relaxed">
              <strong className="text-text-primary">Mission:</strong> To develop the polymetallic resources of MPSA 251(A)-2007-XI through
              strategic partnerships, rigorous science, and unwavering commitment to the people and environment
              of Davao Oriental.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map(v => (
              <div key={v.title} className="bg-white rounded-xl shadow-[0_2px_8px_rgba(12,25,38,0.06)] p-8">
                <h3 className="text-xl font-bold text-brand-navy mb-3">{v.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Governance */}
      <section id="governance" className="section-padding">
        <div className="content-wrapper max-w-3xl mx-auto">
          <h2 id="mpsa" className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
            Corporate Governance
          </h2>
          <div className="space-y-4">
            {governance.map(item => (
              <div key={item} className="flex items-start gap-4 bg-bg-surface rounded-lg p-4">
                <CheckCircle className="text-success flex-shrink-0 mt-0.5" size={20} />
                <span className="text-text-secondary">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
