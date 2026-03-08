import Link from 'next/link'

const columns = [
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/assets', label: 'Assets' },
      { href: '/csr', label: 'CSR' },
      { href: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'The Opportunity',
    links: [
      { href: '/presentation', label: 'Presentation' },
      { href: '/assets#evidence', label: 'Evidence' },
      { href: '/presentation#partnership', label: 'Partnership' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/about#governance', label: 'Corporate Governance' },
      { href: '/about#mpsa', label: 'MPSA Registration' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {columns.map(col => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm uppercase tracking-widest text-white/60 mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-white/80 hover:text-white text-sm transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-widest text-white/60 mb-4">Contact</h4>
            <address className="not-italic text-sm text-white/80 space-y-2">
              <p>Unit 1411 Alaya Tower One</p>
              <p>6767 Alaya Avenue, Makati City 1226</p>
              <p>Philippines</p>
              <p className="pt-2">
                <a href="mailto:gmc@genluiching.com" className="hover:text-white transition-colors">
                  gmc@genluiching.com
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-playfair font-bold text-lg">
            GMC
            <span className="font-sans font-normal text-xs ml-2 text-white/50">Genluiching Mining Corporation</span>
          </div>
          <p className="text-white/40 text-sm">&copy; 2026 Genluiching Mining Corporation. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
