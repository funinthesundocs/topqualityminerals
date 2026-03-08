'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/assets', label: 'Assets' },
  { href: '/presentation', label: 'Presentation' },
  { href: '/team', label: 'Team' },
  { href: '/csr', label: 'CSR' },
  { href: '/contact', label: 'Contact' },
]

export function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    )
    const hero = document.getElementById('hero-sentinel')
    if (hero) {
      observer.observe(hero)
    } else {
      setScrolled(true)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div id="hero-sentinel" className="absolute top-0 h-1 w-full" />
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className={`font-playfair font-bold text-xl transition-colors ${
            scrolled ? 'text-brand-navy' : 'text-white'
          }`}>
            GMC
            <span className={`hidden sm:inline font-sans font-normal text-xs ml-2 ${
              scrolled ? 'text-text-secondary' : 'text-white/70'
            }`}>Genluiching Mining Corporation</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-[15px] font-medium transition-colors hover:opacity-80 ${
                  scrolled ? 'text-text-primary' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <X className={scrolled ? 'text-text-primary' : 'text-white'} size={24} />
              : <Menu className={scrolled ? 'text-text-primary' : 'text-white'} size={24} />
            }
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-border">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-text-primary text-[15px] font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}
