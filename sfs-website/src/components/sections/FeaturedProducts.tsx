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
  { id: '1', name: { en: 'Premium School Bag', si: 'ප්‍රිමියම් පාසල් බෑගය', ta: 'பிரீமியம் பள்ளி பை' }, emoji: '🎒', price: 'Rs. 2,500', color: '#dcfce7' },
  { id: '2', name: { en: 'Cute Teddy Bear', si: 'ආකර්ෂණීය ටෙඩි', ta: 'அழகான டெடி பியர்' }, emoji: '🧸', price: 'Rs. 1,800', color: '#fef3c7' },
  { id: '3', name: { en: 'Water Bottle', si: 'වතුර බෝතලය', ta: 'தண்ணீர் பாட்டில்' }, emoji: '💧', price: 'Rs. 650', color: '#dbeafe' },
  { id: '4', name: { en: 'Wireless Earphones', si: 'වයර්ලස් ඉයර්ෆෝන්', ta: 'வயர்லெஸ் இயர்போன்' }, emoji: '🎧', price: 'Rs. 3,200', color: '#f3e8ff' },
  { id: '5', name: { en: 'Gift Box Set', si: 'තෑගි පෙට්ටි කට්ටලය', ta: 'பரிசு பெட்டி செட்' }, emoji: '🎁', price: 'Rs. 1,200', color: '#fce7f3' },
  { id: '6', name: { en: 'Geometry Box', si: 'ජ්‍යාමිතික පෙට්ටිය', ta: 'ஜியோமெட்ரி பாக்ஸ்' }, emoji: '📐', price: 'Rs. 450', color: '#ccfbf1' },
  { id: '7', name: { en: 'Pen Set', si: 'පෑන් කට්ටලය', ta: 'பேனா செட்' }, emoji: '🖊️', price: 'Rs. 350', color: '#e0e7ff' },
  { id: '8', name: { en: 'Phone Charger', si: 'දුරකථන චාජරය', ta: 'போன் சார்ஜர்' }, emoji: '🔌', price: 'Rs. 900', color: '#fef9c3' },
];

export default function FeaturedProducts({ t, language }: FeaturedProductsProps) {
  const { ref, isInView } = useInView(0.1);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll effect
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isInView) return;
    let animId: number;
    let scrollPos = 0;
    const speed = 0.5;
    const scroll = () => {
      scrollPos += speed;
      if (scrollPos >= el.scrollWidth - el.clientWidth) scrollPos = 0;
      el.scrollLeft = scrollPos;
      animId = requestAnimationFrame(scroll);
    };
    animId = requestAnimationFrame(scroll);
    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(scroll); };
    el.addEventListener('pointerdown', pause);
    el.addEventListener('pointerup', resume);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resume);
    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener('pointerdown', pause);
      el.removeEventListener('pointerup', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, [isInView]);

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
      <div ref={scrollRef} className="scroll-container px-4 md:px-8">
        {[...mockProducts, ...mockProducts].map((product, i) => (
          <motion.div
            key={`${product.id}-${i}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 + (i % 8) * 0.05 }}
            className="w-[180px] sm:w-[200px] md:w-[220px] bg-white rounded-2xl shadow-sm border border-green-50 overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <div className="h-32 sm:h-36 flex items-center justify-center text-5xl sm:text-6xl" style={{ background: product.color }}>
              {product.emoji}
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-green-800 text-sm leading-snug mb-1.5 line-clamp-2">{product.name[language]}</h3>
              <p className="text-green-600 text-xs font-bold">{product.price}</p>
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-green-500 font-medium">{t.common.explore} →</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
