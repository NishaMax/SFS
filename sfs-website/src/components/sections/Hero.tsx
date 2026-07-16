'use client';

import { motion } from 'framer-motion';
import { Translations, Language } from '@/types';

interface HeroProps {
  t: Translations;
  language: Language;
}

// Floating emoji elements for the background
const floatingItems = [
  { emoji: '🎒', x: '10%', y: '20%', delay: 0, duration: 7 },
  { emoji: '🧸', x: '85%', y: '15%', delay: 1, duration: 8 },
  { emoji: '💧', x: '75%', y: '70%', delay: 2, duration: 9 },
  { emoji: '🎧', x: '15%', y: '75%', delay: 0.5, duration: 7.5 },
  { emoji: '✏️', x: '90%', y: '45%', delay: 1.5, duration: 8.5 },
  { emoji: '🎁', x: '5%', y: '50%', delay: 3, duration: 10 },
];

function getGreeting(language: Language): string {
  const hour = new Date().getHours();
  if (language === 'si') {
    if (hour < 12) return 'සුබ උදෑසනක් 👋';
    if (hour < 17) return 'සුබ දහවලක් 👋';
    return 'සුබ සන්ධ්‍යාවක් 👋';
  }
  if (language === 'ta') {
    if (hour < 12) return 'காலை வணக்கம் 👋';
    if (hour < 17) return 'மதிய வணக்கம் 👋';
    return 'மாலை வணக்கம் 👋';
  }
  if (hour < 12) return 'Good Morning 👋';
  if (hour < 17) return 'Good Afternoon 👋';
  return 'Good Evening 👋';
}

export default function Hero({ t, language }: HeroProps) {
  const greeting = getGreeting(language);

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-16"
      aria-label="Hero section"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-50 via-white to-green-50/30" />

      {/* Decorative circles */}
      <div className="absolute top-20 -right-20 w-72 h-72 bg-green-100 rounded-full opacity-40 blur-3xl" />
      <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-green-100 rounded-full opacity-30 blur-3xl" />

      {/* Floating Emojis */}
      {floatingItems.map((item, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl sm:text-3xl opacity-15 select-none pointer-events-none"
          style={{ left: item.x, top: item.y }}
          animate={{
            y: [0, -12, 4, -8, 0],
            rotate: [0, 3, -2, 1, 0],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.emoji}
        </motion.span>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-2xl mx-auto">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-green-600 text-base sm:text-lg font-medium mb-3"
        >
          {greeting}
        </motion.p>

        {/* Welcome + Store Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <p className="text-green-700 text-sm sm:text-base mb-1">{t.hero.greeting}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold gradient-text leading-tight">
            {t.hero.storeName}
          </h1>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="section-divider my-5"
        />

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-green-600 text-base sm:text-lg md:text-xl font-medium max-w-md mx-auto mb-8"
        >
          {t.hero.tagline}
        </motion.p>

        {/* Quick Category Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap justify-center gap-2.5 mb-8"
        >
          {[
            { emoji: '🎒', label: language === 'si' ? 'පාසල්' : language === 'ta' ? 'பள்ளி' : 'School' },
            { emoji: '🎀', label: language === 'si' ? 'ෆැන්සි' : language === 'ta' ? 'ஃபான்சி' : 'Fancy' },
            { emoji: '🎁', label: language === 'si' ? 'තෑගි' : language === 'ta' ? 'பரிசு' : 'Gifts' },
            { emoji: '🎧', label: language === 'si' ? 'තාක්ෂණ' : language === 'ta' ? 'டெக்' : 'Tech' },
          ].map((pill, i) => (
            <motion.a
              key={pill.label}
              href="#categories"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 + i * 0.1 }}
              className="flex items-center gap-1.5 px-4 py-2 bg-white rounded-full shadow-sm border border-green-100
                text-sm font-medium text-green-700 hover:shadow-md hover:border-green-200 transition-all cursor-pointer"
            >
              <span>{pill.emoji}</span>
              <span>{pill.label}</span>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a href="#categories" className="btn-primary text-sm sm:text-base">
            {t.hero.cta}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
          <a href="https://wa.me/94764177746" target="_blank" rel="noopener noreferrer" className="btn-outline text-sm sm:text-base">
            💬 {t.hero.ctaSecondary}
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-green-400 text-xs tracking-wider">Scroll</span>
            <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
