'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { translations } from '@/data/translations';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useStore } from '@/providers/StoreProvider';

export default function CategoriesPage() {
  const { language, setLanguage, isLoading, t } = useLanguage();
  const { categories, loading: storeLoading } = useStore();

  if (isLoading || !language || storeLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-md animate-pulse">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-green-50/30">
      <Header language={language} onLanguageChange={setLanguage} t={t} />
      
      <div className="flex-1 pt-32 pb-16 px-4 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl md:text-5xl font-bold text-green-900 mb-4">
            {t.sections.categories}
          </h1>
          <p className="text-green-700 max-w-2xl mx-auto text-sm md:text-base">
            {t.sections.categoriesDesc}
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {categories.map((cat, i) => (
            <Link key={cat.id} href={`/categories/${cat.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white rounded-2xl p-4 shadow-sm border border-green-100 hover:shadow-xl transition-all duration-300 group cursor-pointer h-full"
              >
                {/* Photo Placeholder */}
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden relative bg-green-50 mb-4 shadow-inner">
                  <Image
                    src="/images/placeholder.svg"
                    alt={cat.name[language]}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                
                {/* Category Info */}
                <div className="text-center">
                  <h3 className="font-bold text-green-900 group-hover:text-green-700 transition-colors">
                    {cat.name[language]}
                  </h3>
                  <p className="text-xs text-green-500 mt-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    {language === 'en' ? 'Explore Items →' : language === 'si' ? 'භාණ්ඩ බලන්න →' : 'பொருட்களை காண்க →'}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <Footer t={t} language={language} />
    </main>
  );
}
