'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Language, Translations } from '@/types';

interface HeaderProps {
  t: Translations;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const langLabels: Record<Language, string> = {
  en: 'EN',
  si: 'සිං',
  ta: 'த',
};

export default function Header({ t, language, onLanguageChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.categories, href: '#categories' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.contact, href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const targetId = href.replace('#', '');
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-green-100/50" id="header">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group" aria-label="Sinduja Fancy Store Home">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-green-800 font-bold text-sm leading-tight">Sinduja</p>
            <p className="text-green-600 text-xs leading-tight">Fancy Store</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-sm font-medium text-green-700 hover:text-green-900 transition-colors relative
                after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-green-600 after:rounded-full
                hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-green-700 bg-green-50 rounded-full hover:bg-green-100 transition-colors border border-green-200"
              aria-label="Change language"
            >
              🌐 {langLabels[language]}
              <svg className={`w-3 h-3 transition-transform ${langMenuOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 glass rounded-xl shadow-xl border border-green-100 overflow-hidden min-w-[140px]"
                >
                  {(['si', 'en', 'ta'] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        onLanguageChange(lang);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left text-sm hover:bg-green-50 transition-colors flex items-center gap-2
                        ${language === lang ? 'text-green-700 font-semibold bg-green-50/50' : 'text-green-600'}`}
                    >
                      <span>{lang === 'si' ? '🇱🇰' : lang === 'en' ? '🇬🇧' : '🇮🇳'}</span>
                      <span>{lang === 'si' ? 'සිංහල' : lang === 'en' ? 'English' : 'தமிழ்'}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-green-50 transition-colors"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`block h-0.5 bg-green-700 rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
              <span className={`block h-0.5 bg-green-700 rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block h-0.5 bg-green-700 rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-green-100"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="py-2.5 px-3 text-green-700 font-medium text-sm rounded-lg hover:bg-green-50 transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              {/* WhatsApp CTA in mobile menu */}
              <a
                href="https://wa.me/94764177746"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="mt-2 py-2.5 px-3 bg-green-600 text-white font-medium text-sm rounded-lg text-center hover:bg-green-700 transition-colors"
              >
                💬 {t.common.whatsapp}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
