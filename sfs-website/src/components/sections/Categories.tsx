'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Translations, Language } from '@/types';
import { categories } from '@/data/categories';

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
              <div className="text-4xl md:text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
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
