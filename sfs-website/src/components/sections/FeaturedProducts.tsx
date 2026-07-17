'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Translations, Language } from '@/types';

interface FeaturedProductsProps {
  t: Translations;
  language: Language;
}

const mockProducts = [
  { id: '1', name: { en: 'Premium School Bag', si: 'ප්‍රිමියම් පාසල් බෑගය', ta: 'பிரீமியம் பள்ளி பை' }, icon: <svg className="w-16 h-16 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>, price: 'Rs. 2,500', color: '#dcfce7' },
  { id: '2', name: { en: 'Cute Teddy Bear', si: 'ආකර්ෂණීය ටෙඩි', ta: 'அழகான டெடி பியர்' }, icon: <svg className="w-16 h-16 text-yellow-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, price: 'Rs. 1,800', color: '#fef3c7' },
  { id: '3', name: { en: 'Water Bottle', si: 'වතුර බෝතලය', ta: 'தண்ணீர் பாட்டில்' }, icon: <svg className="w-16 h-16 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>, price: 'Rs. 650', color: '#dbeafe' },
  { id: '4', name: { en: 'Wireless Earphones', si: 'වයර්ලස් ඉයර්ෆෝන්', ta: 'வயர்லெஸ் இயர்போன்' }, icon: <svg className="w-16 h-16 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6a3 3 0 013-3 3 3 0 013 3v13M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm6 0c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>, price: 'Rs. 3,200', color: '#f3e8ff' },
  { id: '5', name: { en: 'Gift Box Set', si: 'තෑගි පෙට්ටි කට්ටලය', ta: 'பரிசு பெட்டி செட்' }, icon: <svg className="w-16 h-16 text-pink-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" /></svg>, price: 'Rs. 1,200', color: '#fce7f3' },
  { id: '6', name: { en: 'Geometry Box', si: 'ජ්‍යාමිතික පෙට්ටිය', ta: 'ஜியோமெட்ரி பாக்ஸ்' }, icon: <svg className="w-16 h-16 text-teal-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>, price: 'Rs. 450', color: '#ccfbf1' },
  { id: '7', name: { en: 'Premium Pen', si: 'ප්‍රිමියම් පෑන', ta: 'பிரீமியம் பேனா' }, icon: <svg className="w-16 h-16 text-indigo-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>, price: 'Rs. 350', color: '#e0e7ff' },
  { id: '8', name: { en: 'Phone Charger', si: 'දුරකථන චාජරය', ta: 'போன் சார்ஜர்' }, icon: <svg className="w-16 h-16 text-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, price: 'Rs. 900', color: '#fef9c3' },
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
              <div className="h-28 sm:h-36 flex items-center justify-center transition-transform group-hover:scale-105" style={{ background: product.color }}>
                {product.icon}
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
