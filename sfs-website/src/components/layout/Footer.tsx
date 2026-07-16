'use client';

import { Translations } from '@/types';

interface FooterProps {
  t: Translations;
}

export default function Footer({ t }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-green-900 to-green-950 text-white" id="footer">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <p className="font-bold text-lg leading-tight">Sinduja</p>
                <p className="text-green-300 text-sm leading-tight">Fancy Store</p>
              </div>
            </div>
            <p className="text-green-200/70 text-sm leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://wa.me/94764177746"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-green-300 mb-4">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5">
              {[
                { label: t.nav.home, href: '#home' },
                { label: t.nav.categories, href: '#categories' },
                { label: t.nav.about, href: '#about' },
                { label: t.nav.gallery, href: '#' },
                { label: t.nav.promotions, href: '#' },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-green-200/70 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-green-300 mb-4">
              {t.footer.contactUs}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="text-green-400 mt-0.5">📍</span>
                <span className="text-green-200/70 text-sm">No. 27, Bus Stand,<br />Kalawana, Sri Lanka</span>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-green-400">📞</span>
                <a href="tel:+94764177746" className="text-green-200/70 hover:text-white transition-colors text-sm">
                  076 417 7746
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <span className="text-green-400">💬</span>
                <a href="https://wa.me/94764177746" target="_blank" rel="noopener noreferrer" className="text-green-200/70 hover:text-white transition-colors text-sm">
                  WhatsApp Us
                </a>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-green-300 mb-4">
              Opening Hours
            </h3>
            <ul className="space-y-2">
              <li className="flex justify-between text-sm">
                <span className="text-green-200/70">Mon - Sat</span>
                <span className="text-white font-medium">8:00 AM - 8:00 PM</span>
              </li>
              <li className="flex justify-between text-sm">
                <span className="text-green-200/70">Sunday</span>
                <span className="text-white font-medium">9:00 AM - 6:00 PM</span>
              </li>
            </ul>
            <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-500/20 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-xs font-medium">{t.common.openNow}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-green-200/50 text-xs">
            © {currentYear} Sinduja Fancy Store. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-green-200/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
