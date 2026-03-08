import { Metadata } from 'next'
import { SectionHero } from '@/components/SectionHero'
import { Trees, Users, Shield, Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'CSR — Genluiching Mining Corporation',
  description: 'Community and environmental stewardship at Genluiching Mining Corporation.',
}

const pillars = [
  {
    icon: Trees,
    title: 'Environmental Stewardship',
    desc: 'Progressive rehabilitation from the outset. Revegetation programs return mined areas to productive forest. Mercury identified proactively — Minamata Convention compliance built into operations from day one.',
    color: 'bg-success',
  },
  {
    icon: Users,
    title: 'Indigenous Community Partnership',
    desc: 'Over 60% of GMC\'s workforce are indigenous Lumad community members. Free, Prior, and Informed Consent (FPIC) has been formally approved. The community is not just consulted — they are partners.',
    color: 'bg-brand-navy',
  },
  {
    icon: Shield,
    title: 'Regulatory Excellence',
    desc: 'Full compliance with MGB regulations. MPSA maintained in good standing since 2007. Annual environmental reporting. SDMP (Social Development and Management Program) contributions sustained throughout operations.',
    color: 'bg-brand-copper',
  },
  {
    icon: Heart,
    title: 'Community Development',
    desc: 'Local employment, infrastructure support, and education initiatives. Mining operations that serve the long-term interests of Tarragona and Mati City communities — building for business to prosper and communities to thrive.',
    color: 'bg-brand-gold',
  },
]

export default function CSRPage() {
  return (
    <>
      <SectionHero
        headline="Caring for Creation"
        subheadline="Responsible mining that serves communities and protects the environment"
        imageSrc="/images/site-photos/Creation.jpg"
        height="h-[50vh]"
      />

      {/* FPIC highlight */}
      <section className="bg-success/5 border-y border-success/20">
        <div className="content-wrapper py-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm">
            <Shield className="text-success" size={20} />
            <span className="font-semibold text-success">FPIC Approved</span>
            <span className="text-text-secondary text-sm">— Free, Prior, and Informed Consent granted by indigenous communities</span>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-padding">
        <div className="content-wrapper">
          <div className="grid md:grid-cols-2 gap-8">
            {pillars.map(p => (
              <div key={p.title} className="bg-white rounded-xl shadow-[0_2px_8px_rgba(12,25,38,0.06)] p-8 hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 ${p.color} rounded-lg flex items-center justify-center mb-6`}>
                  <p.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{p.title}</h3>
                <p className="text-text-secondary leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workforce highlight */}
      <section className="section-padding bg-bg-surface">
        <div className="content-wrapper text-center max-w-3xl mx-auto">
          <div className="font-mono font-bold text-6xl text-brand-navy mb-4">60%</div>
          <div className="text-text-muted uppercase tracking-widest text-sm mb-6">Indigenous Lumad Workforce</div>
          <p className="text-text-secondary leading-relaxed">
            More than half of GMC&apos;s operational workforce are members of the indigenous Lumad community.
            This is not a target or aspiration — it is a reflection of how GMC has operated from the beginning.
            The community&apos;s knowledge of the land, combined with formal geological science, creates an
            exploration capability that neither could achieve alone.
          </p>
        </div>
      </section>

      {/* Photo gallery */}
      <section className="section-padding">
        <div className="content-wrapper">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('/images/site-photos/Mining 6.jpeg')` }}
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url('/images/site-photos/Creation.jpg')` }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
