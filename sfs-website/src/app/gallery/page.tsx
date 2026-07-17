'use client';

import { useState } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useStore } from '@/providers/StoreProvider';

type Category = 'all' | 'store' | 'customers' | 'products';

export interface GalleryImage {
  id: string;
  image_url: string;
  category: Category;
  caption_en: string;
  caption_si: string;
  caption_ta: string;
}

export default function GalleryPage() {
  const { language, setLanguage, isLoading, t } = useLanguage();
  const { gallery } = useStore();
  const [filter, setFilter] = useState<Category>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  if (isLoading || !language) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-md animate-pulse">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      </div>
    );
  }

  const gal = t.galleryPage;

  const filters: { id: Category; label: string }[] = [
    { id: 'all', label: gal.filterAll },
    { id: 'store', label: gal.filterStore },
    { id: 'customers', label: gal.filterCustomers },
    { id: 'products', label: gal.filterProducts },
  ];

  const filteredImages = filter === 'all' ? gallery : gallery.filter(img => img.category === filter);

  return (
    <main className="min-h-screen flex flex-col bg-gray-50/50">
      <Header language={language} onLanguageChange={setLanguage} t={t} />
      
      <div className="flex-1 pt-32 pb-20 px-4 max-w-7xl mx-auto w-full">
        {/* Page Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-green-950 tracking-tight mb-4"
          >
            {gal.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-gray-600 font-medium text-lg max-w-2xl mx-auto"
          >
            {gal.subtitle}
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm ${
                filter === f.id
                  ? 'bg-green-600 text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-700 border border-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filteredImages.map((img) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={img.id}
                className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl border border-gray-100"
                style={{ height: `${200 + (parseInt(img.id.replace(/\D/g, '') || '0') % 3) * 100}px` }}
                onClick={() => setSelectedImage(img)}
              >
                <Image
                  src={img.image_url}
                  alt={img[`caption_${language}`] || ''}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <span className="text-white font-medium drop-shadow-md translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {img[`caption_${language}`]}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors z-50 text-xl"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative w-full max-w-5xl aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
            >
              <Image src={selectedImage.image_url} alt={selectedImage[`caption_${language}`] || ''} fill className="object-contain bg-black/50" />
            </motion.div>
            <div className="absolute bottom-6 left-0 right-0 text-center text-white text-lg font-medium">
              {selectedImage[`caption_${language}`]}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer t={t} language={language} />
    </main>
  );
}
