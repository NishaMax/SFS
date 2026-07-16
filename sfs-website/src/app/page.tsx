'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import LoadingScreen from '@/components/animations/LoadingScreen';
import DoorEntrance from '@/components/animations/DoorEntrance';
import LanguageSelect from '@/components/animations/LanguageSelect';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Categories from '@/components/sections/Categories';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import VisitUs from '@/components/sections/VisitUs';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';
import { Language } from '@/types';

type AppPhase = 'loading' | 'door' | 'language' | 'home';

export default function HomePage() {
  const { language, setLanguage, hasVisited, isLoading, t } = useLanguage();

  // Determine the starting phase
  const getInitialPhase = (): AppPhase => {
    if (isLoading) return 'loading';
    if (hasVisited && language) return 'home';
    return 'loading';
  };

  const [phase, setPhase] = useState<AppPhase>('loading');

  // Once loading check completes, decide where to go
  const handleLoadingComplete = useCallback(() => {
    if (hasVisited && language) {
      setPhase('home');
    } else {
      setPhase('door');
    }
  }, [hasVisited, language]);

  const handleDoorComplete = useCallback(() => {
    setPhase('language');
  }, []);

  const handleLanguageSelect = useCallback((lang: Language) => {
    setLanguage(lang);
    setPhase('home');
  }, [setLanguage]);

  const handleLanguageChange = useCallback((lang: Language) => {
    setLanguage(lang);
  }, [setLanguage]);

  // Show nothing during hydration check
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {phase === 'loading' && (
          <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
        )}
        {phase === 'door' && (
          <DoorEntrance key="door" onComplete={handleDoorComplete} />
        )}
        {phase === 'language' && (
          <LanguageSelect key="language" onSelect={handleLanguageSelect} />
        )}
      </AnimatePresence>

      {phase === 'home' && language && (
        <>
          <Header t={t} language={language} onLanguageChange={handleLanguageChange} />
          <main className="flex-1">
            <Hero t={t} language={language} />
            <Categories t={t} language={language} />
            <FeaturedProducts t={t} language={language} />
            <WhyChooseUs t={t} language={language} />
            <VisitUs t={t} language={language} />
          </main>
          <Footer t={t} />
          <FloatingWhatsApp />
        </>
      )}
    </>
  );
}
