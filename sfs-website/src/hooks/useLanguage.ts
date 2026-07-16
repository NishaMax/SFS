'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language } from '@/types';
import { translations } from '@/data/translations';

const LANG_KEY = 'sfs-language';
const VISITED_KEY = 'sfs-visited';

export function useLanguage() {
  const [language, setLanguageState] = useState<Language | null>(null);
  const [hasVisited, setHasVisited] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem(LANG_KEY) as Language | null;
    const visited = localStorage.getItem(VISITED_KEY);

    if (savedLang && visited) {
      setLanguageState(savedLang);
      setHasVisited(true);
    }
    setIsLoading(false);
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANG_KEY, lang);
    localStorage.setItem(VISITED_KEY, 'true');
    setHasVisited(true);
  }, []);

  const t = language ? translations[language] : translations.en;

  return {
    language,
    setLanguage,
    hasVisited,
    isLoading,
    t,
  };
}
