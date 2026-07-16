'use client';

import { motion } from 'framer-motion';
import { Language } from '@/types';

interface LanguageSelectProps {
  onSelect: (lang: Language) => void;
}

const languages: { code: Language; name: string; flag: string; native: string }[] = [
  { code: 'si', name: 'Sinhala', flag: '🇱🇰', native: 'සිංහල' },
  { code: 'en', name: 'English', flag: '🇬🇧', native: 'English' },
  { code: 'ta', name: 'Tamil', flag: '🇮🇳', native: 'தமிழ்' },
];

export default function LanguageSelect({ onSelect }: LanguageSelectProps) {
  const handleSelect = (lang: Language) => {
    // Haptic feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(30);
    }
    onSelect(lang);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-gradient-to-b from-green-50 via-white to-green-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
          Choose Your Language
        </h2>
        <p className="text-green-600 text-sm">
          Select your preferred language to continue
        </p>
        <div className="section-divider mt-4" />
      </motion.div>

      {/* Language Cards */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-md sm:max-w-xl">
        {languages.map((lang, index) => (
          <motion.button
            key={lang.code}
            onClick={() => handleSelect(lang.code)}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.15, duration: 0.5, ease: 'easeOut' }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="glass flex-1 rounded-2xl p-6 sm:p-8 text-center cursor-pointer group
              hover:shadow-xl hover:shadow-green-100 transition-shadow duration-300
              border border-green-100 hover:border-green-300"
          >
            {/* Flag */}
            <motion.div
              className="text-5xl sm:text-6xl mb-4"
              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.4 }}
            >
              {lang.flag}
            </motion.div>

            {/* Native Name */}
            <h3 className="text-xl sm:text-2xl font-bold text-green-800 mb-1 group-hover:text-green-700 transition-colors">
              {lang.native}
            </h3>

            {/* English Name */}
            <p className="text-sm text-green-500 font-medium">
              {lang.name}
            </p>

            {/* Ripple indicator */}
            <div className="mt-4 mx-auto w-12 h-1 rounded-full bg-green-200 group-hover:bg-green-400 transition-colors duration-300" />
          </motion.button>
        ))}
      </div>

      {/* Subtle bottom text */}
      <motion.p
        className="text-xs text-green-400 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        You can change this later anytime
      </motion.p>
    </motion.div>
  );
}
