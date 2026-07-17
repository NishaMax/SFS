'use client';

import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Language } from '@/types';
import { useStore } from '@/providers/StoreProvider';

export default function PromotionsPage() {
  const { language, setLanguage, isLoading, t } = useLanguage();
  const { promotions, loading: storeLoading } = useStore();

  if (isLoading || !language || storeLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-md animate-pulse">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      </div>
    );
  }

  // Use promotions from Supabase
  const activePromotions = promotions
    .filter(p => p.active)
    .map((p, i) => {
      const colors = ['from-blue-600 to-indigo-700', 'from-purple-600 to-fuchsia-700', 'from-orange-500 to-red-600'];
      return {
        id: p.id,
        title: { en: p.title, si: p.title, ta: p.title }, // Fallback to same title for all languages if not translated
        desc: { en: p.description, si: p.description, ta: p.description },
        discount: p.discount,
        validUntil: p.validUntil,
        code: p.code,
        color: colors[i % colors.length],
        categoryLink: '/categories' // Link to all categories for now
      };
    });

  const promoT = t.promotionsPage;

  return (
    <main className="min-h-screen flex flex-col bg-gray-50/50">
      {/* Background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-300/10 rounded-full blur-[100px] pointer-events-none" />

      <Header language={language} onLanguageChange={setLanguage} t={t} />
      
      <div className="flex-1 pt-32 pb-20 px-4 max-w-6xl mx-auto w-full relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-green-950 tracking-tight mb-4 flex items-center justify-center gap-3"
          >
            <span className="text-4xl">🎁</span> {promoT.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-gray-600 font-medium text-lg max-w-2xl mx-auto"
          >
            {promoT.subtitle}
          </motion.p>
        </div>

        {/* Active Offers Section */}
        <div className="mb-8 flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-900">{promoT.activeOffers}</h2>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePromotions.map((promo, index) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * index }}
              className={`rounded-3xl p-1 shadow-lg bg-gradient-to-br ${promo.color} relative group overflow-hidden`}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-colors" />
              
              <div className="bg-white/95 backdrop-blur-md rounded-[22px] h-full p-6 flex flex-col border border-white/20 relative">
                
                {/* Dashed line effect (coupon style) */}
                <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-50 rounded-r-full border-r border-y border-gray-200" />
                <div className="absolute right-[-8px] top-1/2 -translate-y-1/2 w-4 h-8 bg-gray-50 rounded-l-full border-l border-y border-gray-200" />

                <div className="inline-block px-3 py-1 bg-green-100 text-green-800 text-[10px] font-black tracking-wider uppercase rounded-full w-fit mb-4 shadow-sm border border-green-200">
                  {promo.discount}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">
                  {promo.title[language as Language]}
                </h3>
                
                <p className="text-sm text-gray-600 mb-6 flex-1 leading-relaxed">
                  {promo.desc[language as Language]}
                </p>

                <div className="mt-auto">
                  <div className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl mb-4 border-dashed">
                    <span className="text-xs text-gray-500 font-medium">Promo Code:</span>
                    <span className="text-sm font-bold text-gray-800 tracking-widest">{promo.code}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-medium">
                      {promoT.validUntil} {promo.validUntil}
                    </span>
                    <Link 
                      href={promo.categoryLink}
                      className={`px-5 py-2 rounded-full text-xs font-bold text-white shadow-md hover:shadow-lg transition-all bg-gradient-to-r ${promo.color}`}
                    >
                      {promoT.shopNow}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      <Footer t={t} language={language} />
    </main>
  );
}
