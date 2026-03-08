import { Metadata } from 'next'
import { SectionHero } from '@/components/SectionHero'
import { User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Team — Genluiching Mining Corporation',
  description: 'Leadership team of Genluiching Mining Corporation.',
}

export default function TeamPage() {
  return (
    <>
      <SectionHero
        headline="Leadership"
        subheadline="The people behind Genluiching Mining Corporation"
        imageSrc="/images/site-photos/GMC Team.jpg"
        height="h-[50vh]"
      />

      <section className="section-padding">
        <div className="content-wrapper max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Jett Tupas card */}
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(12,25,38,0.06)] p-8 text-center">
              <div className="w-32 h-32 rounded-full bg-bg-surface flex items-center justify-center mx-auto mb-6">
                <User className="text-text-muted" size={56} />
              </div>
              <h3 className="text-2xl font-bold text-text-primary">Jett Tupas</h3>
              <p className="text-brand-navy font-medium mt-1">President &amp; CEO</p>
              <p className="text-text-muted text-sm mt-1">Genluiching Mining Corporation</p>
            </div>

            {/* Company structure */}
            <div>
              <h2 className="text-2xl font-bold text-text-primary mb-6">Corporate Structure</h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  Genluiching Mining Corporation is a Philippine SEC-registered company with an established
                  operational team across exploration, community relations, and corporate development.
                </p>
                <p>
                  The company maintains offices in Makati City for corporate affairs and an operational
                  base in Mati City, Davao Oriental for on-site activities. A mineral sales office operates
                  from Honolulu, Hawaii for international market development.
                </p>
                <p>
                  GMC&apos;s workforce includes over 60% indigenous Lumad community members, reflecting a deep
                  commitment to local employment and community partnership.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
