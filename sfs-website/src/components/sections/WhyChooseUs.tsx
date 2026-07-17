'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Translations, Language } from '@/types';
import { stats } from '@/data/stats';

interface WhyChooseUsProps {
  t: Translations;
  language: Language;
}

function AnimatedCounter({ value, suffix, isActive }: { value: number; suffix: string; isActive: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    hasAnimated.current = true;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.floor(value * progress));
      if (step >= steps) { setCount(value); clearInterval(timer); }
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [isActive, value]);

  return (
    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const statIconMap: Record<string, React.ReactNode> = {
  '😊': <svg className="w-10 h-10 mx-auto text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  '📚': <svg className="w-10 h-10 mx-auto text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
  '🎀': <svg className="w-10 h-10 mx-auto text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  '🎧': <svg className="w-10 h-10 mx-auto text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6a3 3 0 013-3 3 3 0 013 3v13M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm6 0c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" /></svg>,
};

export default function WhyChooseUs({ t, language }: WhyChooseUsProps) {
  const { ref, isInView } = useInView(0.2);

  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-to-br from-green-800 via-green-900 to-green-950 relative overflow-hidden" ref={ref} aria-labelledby="why-us-heading">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-40 h-40 border border-white rounded-full" />
        <div className="absolute bottom-20 right-20 w-60 h-60 border border-white rounded-full" />
      </div>
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 id="why-us-heading" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {t.sections.whyUs}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-green-200/80 mt-3 text-sm sm:text-base max-w-lg mx-auto">
            {t.sections.whyUsDesc}
          </motion.p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div key={stat.icon} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }} className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
              <div className="mb-4 flex justify-center">{statIconMap[stat.icon] || <span className="text-3xl">{stat.icon}</span>}</div>
              <AnimatedCounter value={stat.value} suffix={stat.suffix} isActive={isInView} />
              <p className="text-green-200/70 text-sm mt-2 font-medium">{stat.label[language]}</p>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.8 }} className="flex flex-wrap justify-center gap-4 mt-12">
          {[
            { icon: '🏪', text: language === 'si' ? 'කලවාන නගරයේ' : language === 'ta' ? 'களவான நகரத்தில்' : 'Located in Kalawana Town' },
            { icon: '👨‍👩‍👧‍👦', text: language === 'si' ? 'පවුල් සාප්පුව' : language === 'ta' ? 'குடும்பக் கடை' : 'Family-Owned Store' },
            { icon: '💯', text: language === 'si' ? 'ගුණාත්මක නිෂ්පාදන' : language === 'ta' ? 'தரமான பொருட்கள்' : 'Quality Products' },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
              <span>{b.icon}</span>
              <span className="text-green-100/80 text-xs sm:text-sm">{b.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
