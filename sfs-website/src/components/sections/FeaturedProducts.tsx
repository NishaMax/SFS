'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import Image from 'next/image';
import Link from 'next/link';
import { Translations, Language } from '@/types';
import { useStore } from '@/providers/StoreProvider';
import { getCheapestSKU } from '@/data/categoryItems';

interface FeaturedProductsProps {
  t: Translations;
  language: Language;
}

export default function FeaturedProducts({ t, language }: FeaturedProductsProps) {
  const { ref, isInView } = useInView(0.1);
  const { categoryItems } = useStore();

  // Pick up to 8 products to feature (e.g. the first 8 items, or you could filter by isNew)
  const displayItems = categoryItems.slice(0, 8);
  
  // If no items, don't show the section or show a fallback
  if (displayItems.length === 0) return null;

  // Duplicate items for the continuous marquee effect
  // We need enough items to fill the screen width twice to loop seamlessly
  let marqueeItems = [...displayItems];
  if (marqueeItems.length < 12) {
    marqueeItems = [...marqueeItems, ...marqueeItems, ...marqueeItems];
  }

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-green-50/40" ref={ref} aria-labelledby="featured-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <motion.span initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} className="inline-block px-4 py-1.5 bg-green-50 text-green-600 text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
            ⭐ {t.sections.featured}
          </motion.span>
          <motion.h2 id="featured-heading" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900">
            {t.sections.featured}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-green-600 mt-3 text-sm sm:text-base">
            {t.sections.featuredDesc}
          </motion.p>
          <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ delay: 0.3 }} className="section-divider mt-4" />
        </div>
      </div>

      {/* Scrolling Product Cards */}
      <div className="overflow-hidden w-full px-4 md:px-8 mt-6">
        <div className="animate-marquee flex gap-4 md:gap-6 pb-6 hover:[animation-play-state:paused]">
          {marqueeItems.map((product, i) => {
            const cheapest = getCheapestSKU(product);
            const imageSrc = cheapest.image || product.defaultImage || '/images/placeholder.svg';
            
            return (
              <Link href={`/categories/${product.categoryId}`} key={`${product.id}-${i}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + (i % 8) * 0.05 }}
                  className="w-[160px] sm:w-[200px] md:w-[220px] bg-white rounded-2xl shadow-sm border border-green-50 overflow-hidden group hover:shadow-lg transition-all flex-shrink-0 cursor-pointer h-full"
                >
                  {/* Photo Placeholder */}
                  <div className="h-36 sm:h-44 w-full relative overflow-hidden bg-green-50 shadow-inner">
                    <Image
                      src={imageSrc}
                      alt={product.name[language]}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 200px, 250px"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-green-800 text-sm leading-snug mb-1.5 line-clamp-2">{product.name[language]}</h3>
                    <p className="text-green-600 text-xs font-bold">{cheapest.price}</p>
                    <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs text-green-500 font-medium">{t.common.explore} →</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
