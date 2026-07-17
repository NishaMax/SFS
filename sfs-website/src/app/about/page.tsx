'use client';

import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const { language, setLanguage, isLoading, t } = useLanguage();

  if (isLoading || !language) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-md animate-pulse">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      </div>
    );
  }

  const about = t.aboutPage;

  const values = [
    { title: about.value1, icon: '💎', color: 'from-blue-500 to-cyan-400' },
    { title: about.value2, icon: '❤️', color: 'from-pink-500 to-rose-400' },
    { title: about.value3, icon: '🤝', color: 'from-amber-500 to-orange-400' },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50/50 overflow-hidden relative">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-green-200/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-200/20 blur-[120px] pointer-events-none" />
      
      <Header language={language} onLanguageChange={setLanguage} t={t} />
      
      <div className="flex-1 pt-32 pb-20 px-4 max-w-6xl mx-auto w-full relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-green-950 tracking-tight mb-4"
          >
            {about.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-green-700 font-medium text-lg max-w-2xl mx-auto"
          >
            {about.subtitle}
          </motion.p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            <Image 
              src="/images/placeholder.svg" // Replace with actual store photo later
              alt="Store Front" 
              fill 
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
              <span className="text-white font-bold text-lg drop-shadow-md">Sinduja Fancy Store, Kalawana</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="glass p-8 md:p-10 rounded-3xl shadow-sm border border-white/50 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-10 -mt-10" />
            <h2 className="text-2xl font-bold text-green-900 mb-6 flex items-center gap-2">
              <span className="w-8 h-1 rounded-full bg-green-600 inline-block" />
              {about.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {about.story}
            </p>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-6 mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-800 to-green-950 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-green-400/20 rounded-full blur-3xl" />
            <span className="text-5xl mb-4 block">🎯</span>
            <h3 className="text-2xl font-bold mb-4">{about.missionTitle}</h3>
            <p className="text-green-50 leading-relaxed text-lg opacity-90">{about.missionDesc}</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-10 border border-green-100 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl" />
            <span className="text-5xl mb-4 block">👁️</span>
            <h3 className="text-2xl font-bold text-green-900 mb-4">{about.visionTitle}</h3>
            <p className="text-gray-600 leading-relaxed text-lg">{about.visionDesc}</p>
          </motion.div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="text-3xl font-bold text-green-950 mb-12"
          >
            {about.valuesTitle}
          </motion.h2>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 + (i * 0.1) }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col items-center justify-center gap-4 group"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center text-3xl shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  {val.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-800">{val.title}</h4>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      <Footer t={t} language={language} />
    </main>
  );
}
