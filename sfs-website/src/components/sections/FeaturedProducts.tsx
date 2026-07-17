'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import Image from 'next/image';
import { Translations, Language } from '@/types';

interface FeaturedProductsProps {
  t: Translations;
  language: Language;
}

const mockProducts = [
  { id: '1', name: { en: 'Premium School Bag', si: 'ප්‍රිමියම් පාසල් බෑගය', ta: 'பிரீமியம் பள்ளி பை' }, price: 'Rs. 2,500', color: '#dcfce7' },
  { id: '2', name: { en: 'Cute Teddy Bear', si: 'ආකර්ෂණීය ටෙඩි', ta: 'அழகான டெடி பியர்' }, price: 'Rs. 1,800', color: '#fef3c7' },
  { id: '3', name: { en: 'Water Bottle', si: 'වතුර බෝතලය', ta: 'தண்ணீர் பாட்டில்' }, price: 'Rs. 650', color: '#dbeafe' },
  { id: '4', name: { en: 'Wireless Earphones', si: 'වයර්ලස් ඉයර්ෆෝන්', ta: 'வயர்லெஸ் இயர்போன்' }, price: 'Rs. 3,200', color: '#f3e8ff' },
  { id: '5', name: { en: 'Gift Box Set', si: 'තෑගි පෙට්ටි කට්ටලය', ta: 'பரிசு பெட்டி செட்' }, price: 'Rs. 1,200', color: '#fce7f3' },
  { id: '6', name: { en: 'Geometry Box', si: 'ජ්‍යාමිතික පෙට්ටිය', ta: 'ஜியோமெட்ரி பாக்ஸ்' }, price: 'Rs. 450', color: '#ccfbf1' },
  { id: '7', name: { en: 'Premium Pen', si: 'ප්‍රිමියම් පෑන', ta: 'பிரீமியம் பேனா' }, price: 'Rs. 350', color: '#e0e7ff' },
  { id: '8', name: { en: 'Phone Charger', si: 'දුරකථන චාජරය', ta: 'போன் சார்ஜர்' }, price: 'Rs. 900', color: '#fef9c3' },
];

export default function FeaturedProducts({ t, language }: FeaturedProductsProps) {
  const { ref, isInView } = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // CSS handles the scrolling logic via .animate-marquee

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
        <div className="animate-marquee flex gap-4 md:gap-6 pb-6">
          {[...mockProducts, ...mockProducts, ...mockProducts].map((product, i) => (
            <motion.div
              key={`${product.id}-${i}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + (i % 8) * 0.05 }}
              className="w-[160px] sm:w-[200px] md:w-[220px] bg-white rounded-2xl shadow-sm border border-green-50 overflow-hidden group hover:shadow-lg transition-all flex-shrink-0"
            >
              {/* Photo Placeholder */}
              <div className="h-36 sm:h-44 w-full relative overflow-hidden bg-green-50 shadow-inner">
                <Image
                  src="/images/placeholder.svg"
                  alt={product.name[language]}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 200px, 250px"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-green-800 text-sm leading-snug mb-1.5 line-clamp-2">{product.name[language]}</h3>
                <p className="text-green-600 text-xs font-bold">{product.price}</p>
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-xs text-green-500 font-medium">{t.common.explore} →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
