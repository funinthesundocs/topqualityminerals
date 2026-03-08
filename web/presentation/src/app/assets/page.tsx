import { Metadata } from 'next'
import { SectionHero } from '@/components/SectionHero'
import { MetricCard } from '@/components/MetricCard'
import { DepositCrossSection } from '@/components/DepositCrossSection'
import { EvidenceTable } from '@/components/EvidenceTable'

export const metadata: Metadata = {
  title: 'Assets — Genluiching Mining Corporation',
  description: 'Geological evidence, deposit cross-section, and laboratory validation for MPSA 251(A)-2007-XI.',
}

export default function AssetsPage() {
  return (
    <>
      <SectionHero
        headline="The Asset"
        subheadline="5,906 hectares of validated polymetallic mineralization in Davao Oriental"
        imageSrc="/images/site-photos/Mati Mining Site.jpeg"
        height="h-[50vh]"
      />

      {/* Deposit Cross-Section */}
      <section className="section-padding">
        <div className="content-wrapper">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
            Deposit Cross-Section
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
            Eight drill holes to 493 meters total depth. Hover over each hole for grades and highlights.
          </p>
          <DepositCrossSection />
        </div>
      </section>

      {/* Evidence Table */}
      <section className="section-padding bg-bg-surface">
        <div className="content-wrapper">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-4">
            Nine Laboratories, Five Countries
          </h2>
          <p className="text-text-secondary text-center max-w-2xl mx-auto mb-12">
            Click any row to see detailed methodology and context
          </p>
          <EvidenceTable />
        </div>
      </section>

      {/* Mineral Details */}
      <section className="section-padding">
        <div className="content-wrapper">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
            Primary Commodities
          </h2>

          {/* Iron */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Iron Ore</h3>
              <p className="text-brand-iron font-medium mb-6">Premium grade confirmed by international steelmaker</p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <MetricCard value="67.31%" unit="Fe" label="POSCO Result" />
                <MetricCard value="16M" unit="MT" label="Iron Ore Resource" />
              </div>
              <p className="text-text-secondary leading-relaxed">
                POSCO International — one of the world&apos;s largest steel trading companies — tested production-representative
                lump ore and confirmed 67.31% Fe with phosphorus at 0.012-0.021% and sulfur at 0.002-0.013%.
                This is shipping-grade premium iron ore. GMC exported iron ore to China in 2015 at 64.71% Fe,
                inspected by CCIC Philippines.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/site-photos/Iron Ore.jpg')` }} />
            </div>
          </div>

          {/* Copper */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 rounded-xl overflow-hidden aspect-[4/3]">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/site-photos/Complex Ore.jpg')` }} />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-text-primary mb-2">Copper</h3>
              <p className="text-brand-copper font-medium mb-6">Near-concentrate grades validated across a decade</p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <MetricCard value="39.5%" unit="Cu" label="Near-Concentrate" />
                <MetricCard value="21.6M" unit="MT" label="Copper Ore Resource" />
              </div>
              <p className="text-text-secondary leading-relaxed">
                Four laboratories have confirmed copper grades over a thirteen-year period. DALINC recorded
                39.5% Cu near-concentrate. HK Imperial Processing demonstrated industrial viability by processing
                120,000 WMT through a flotation circuit, producing 18.02% Cu concentrate. Massive sulfidization
                was confirmed at 60-65m in drill hole SBF-1C — the key indicator of a porphyry copper system at depth.
              </p>
            </div>
          </div>

          {/* Gold */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-text-primary mb-2">Gold</h3>
              <p className="text-brand-gold font-medium mb-6">Significant by-product from copper processing</p>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <MetricCard value="20.35" unit="g/t Au" label="Highest Fire Assay" />
                <MetricCard value="383" unit="g/t Ag" label="Silver By-Product" />
              </div>
              <p className="text-text-secondary leading-relaxed">
                Ostrea Mineral Labs recorded 20.35 g/t Au from fire assay — the highest gold result at GMC.
                DH-10 returned 13.77 g/t Au at 16-21m depth. HK Imperial Processing recovered 11.33 g/t Au
                and 383 g/t Ag from copper concentrate, confirming gold and silver as economically significant
                by-products of copper processing.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('/images/site-photos/Gold Ore.jpg')` }} />
            </div>
          </div>
        </div>
      </section>

      {/* Volume Estimates */}
      <section className="section-padding bg-bg-surface">
        <div className="content-wrapper text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-8">
            Resource Estimates
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(12,25,38,0.06)] p-8">
              <div className="font-mono font-bold text-5xl text-brand-navy">21.6M</div>
              <div className="font-mono text-brand-copper text-lg mt-1">MT</div>
              <div className="text-text-muted text-sm uppercase tracking-widest mt-2">Copper Ore</div>
            </div>
            <div className="bg-white rounded-xl shadow-[0_2px_8px_rgba(12,25,38,0.06)] p-8">
              <div className="font-mono font-bold text-5xl text-brand-navy">16M</div>
              <div className="font-mono text-brand-iron text-lg mt-1">MT</div>
              <div className="text-text-muted text-sm uppercase tracking-widest mt-2">Iron Ore</div>
            </div>
          </div>
          <p className="text-text-muted text-sm italic">
            Per SGECS geological assessment filed with MGB Region XI, June 2025. Estimates based on 518 hectares
            explored — less than 9% of the total 5,906-hectare concession. Not JORC-compliant; Phase 2 feasibility
            study targets JORC-compliant resource estimate.
          </p>
        </div>
      </section>
    </>
  )
}
