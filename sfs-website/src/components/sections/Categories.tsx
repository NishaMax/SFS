'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Translations, Language } from '@/types';
import { categories } from '@/data/categories';

const iconMap: Record<string, React.ReactNode> = {
  'school-items': <svg className="w-12 h-12 mx-auto text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
  'teddy-bears': <svg className="w-12 h-12 mx-auto text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  'fancy-items': <svg className="w-12 h-12 mx-auto text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  'tech-accessories': <svg className="w-12 h-12 mx-auto text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6a3 3 0 013-3 3 3 0 013 3v13M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm6 0c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>,
  'toys': <svg className="w-12 h-12 mx-auto text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  'gift-items': <svg className="w-12 h-12 mx-auto text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>,
  'stationery': <svg className="w-12 h-12 mx-auto text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>,
  'water-bottles': <svg className="w-12 h-12 mx-auto text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>,
};

interface CategoriesProps {
  t: Translations;
  language: Language;
}

export default function Categories({ t, language }: CategoriesProps) {
  const { ref, isInView } = useInView(0.1);

  return (
    <section
      id="categories"
      className="py-16 md:py-24 bg-white relative"
      ref={ref}
      aria-labelledby="categories-heading"
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-green-50 text-green-600 text-xs font-semibold uppercase tracking-wider rounded-full mb-4"
          >
            🏪 {t.sections.categories}
          </motion.span>
          <motion.h2
            id="categories-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900"
          >
            {t.sections.categories}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-green-600 mt-3 text-sm sm:text-base max-w-md mx-auto"
          >
            {t.sections.categoriesDesc}
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="section-divider mt-4"
          />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.06 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="card-lift bg-white rounded-2xl p-5 md:p-6 text-center cursor-pointer
                border border-green-50 hover:border-green-200 shadow-sm hover:shadow-xl
                transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="mb-4 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                <div className="p-4 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors">
                  {iconMap[cat.id]}
                </div>
              </div>

              {/* Name */}
              <h3 className="font-semibold text-green-800 text-sm md:text-base mb-1 group-hover:text-green-700 transition-colors">
                {cat.name[language]}
              </h3>

              {/* Product Count */}
              <p className="text-xs text-green-500 font-medium">
                {cat.productCount}+ {t.common.products}
              </p>

              {/* Hover indicator */}
              <div className="mt-3 mx-auto w-8 h-0.5 rounded-full bg-green-200 group-hover:w-12 group-hover:bg-green-500 transition-all duration-300" />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <a href="#" className="btn-outline text-sm">
            {t.common.viewAll} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
