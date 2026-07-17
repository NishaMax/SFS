'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/hooks/useLanguage';
import { CategoryItem, getBrands, findSKU, ProductSKU } from '@/data/categoryItems';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useStore } from '@/providers/StoreProvider';

// Get the cheapest SKU for a product (used on compact card)
function getCheapestSKU(item: CategoryItem): ProductSKU {
  if (item.skus.length === 0) return {} as ProductSKU;
  return item.skus.reduce((min, s) => {
    const a = parseInt(min.price?.replace(/[^\d]/g, '') || '0');
    const b = parseInt(s.price?.replace(/[^\d]/g, '') || '0');
    return b < a ? s : min;
  }, item.skus[0]);
}

// Get available options for a variant label, filtered by current selections
function getFilteredOptions(item: CategoryItem, label: string, brand: string, selections: Record<string, string>): string[] {
  const matching = item.skus.filter(sku => {
    if (sku.brand !== brand) return false;
    return Object.entries(selections).every(([k, v]) => k === label || sku.options[k] === v);
  });
  const set = new Set(matching.map(s => s.options[label]).filter(Boolean));
  return Array.from(set);
}

export default function NewArrivalsPage() {
  const { language, setLanguage, isLoading, t } = useLanguage();
  const { categoryItems, loading: storeLoading } = useStore();

  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState<CategoryItem | null>(null);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  if (isLoading || !language || storeLoading) {
    return (
      <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center shadow-md animate-pulse">
          <span className="text-white font-bold text-lg">S</span>
        </div>
      </div>
    );
  }

  // Filter ONLY items marked as "isNew"
  const newItems = categoryItems.filter(item => item.isNew);
  const filteredItems = newItems.filter(item => {
    const q = search.toLowerCase();
    if (!q) return true;
    const matchName = item.name[language]?.toLowerCase().includes(q) || item.name.en?.toLowerCase().includes(q);
    const matchBrand = item.skus.some(s => s.brand.toLowerCase().includes(q));
    return matchName || matchBrand;
  });

  // Open the detail drawer
  const openDetail = (item: CategoryItem) => {
    setSelectedItem(item);
    const brands = getBrands(item);
    const defaultBrand = brands[0];
    setSelectedBrand(defaultBrand);

    const firstSku = item.skus.find(s => s.brand === defaultBrand);
    setSelectedOptions(firstSku ? { ...firstSku.options } : {});
  };

  const handleBrandChange = (brand: string) => {
    if (!selectedItem) return;
    setSelectedBrand(brand);
    const firstSku = selectedItem.skus.find(s => s.brand === brand);
    setSelectedOptions(firstSku ? { ...firstSku.options } : {});
  };

  const handleOptionChange = (label: string, value: string) => {
    if (!selectedItem) return;
    const newOptions = { ...selectedOptions, [label]: value };
    const sku = findSKU(selectedItem, selectedBrand, newOptions);
    if (sku) {
      setSelectedOptions(newOptions);
    } else {
      const fallback = selectedItem.skus.find(s => s.brand === selectedBrand && s.options[label] === value);
      if (fallback) {
        setSelectedOptions({ ...fallback.options });
      } else {
        setSelectedOptions(newOptions);
      }
    }
  };

  const activeSKU = selectedItem ? findSKU(selectedItem, selectedBrand, selectedOptions) : undefined;

  return (
    <main className="min-h-screen flex flex-col bg-green-50/30">
      <Header language={language} onLanguageChange={setLanguage} t={t} />
      
      <div className="flex-1 pt-28 pb-16 px-4 max-w-7xl mx-auto w-full">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <Link href="/" className="text-green-600 text-xs hover:text-green-800 transition-colors mb-2 inline-flex items-center gap-1.5 font-medium">
              <span>←</span>
              {language === 'en' ? 'Back Home' : language === 'si' ? 'මුල් පිටුවට' : 'முகப்புக்குத் திரும்பு'}
            </Link>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              className="text-3xl md:text-5xl font-bold text-green-900 flex items-center gap-3"
            >
              {language === 'en' ? 'New Arrivals' : language === 'si' ? 'නව පැමිණීම්' : 'புதிய வருகைகள்'}
              <span className="text-2xl">✨</span>
            </motion.h1>
            <p className="text-green-600 text-sm mt-2 max-w-xl">
              {language === 'en' 
                ? 'Check out the freshest stock that just landed in our store.' 
                : language === 'si' 
                ? 'අපගේ වෙළඳසැලට අලුතින්ම පැමිණි භාණ්ඩ මෙතැනින් බලන්න.' 
                : 'எங்கள் கடைக்கு புதிதாக வந்த பொருட்களைப் பாருங்கள்.'}
            </p>
          </div>

          {/* Search Bar */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="w-full sm:w-72">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder={language === 'en' ? 'Search new items...' : language === 'si' ? 'නව භාණ්ඩ සොයන්න...' : 'புதிய தேடு...'}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-green-200 bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/40 focus:border-green-400 transition-all shadow-sm"
              />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs">✕</button>}
            </div>
          </motion.div>
        </div>

        {/* Items Grid */}
        {filteredItems.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white rounded-2xl border border-green-100 shadow-sm">
            <span className="text-4xl mb-3 block opacity-40">🆕</span>
            <p className="text-green-800 font-medium text-sm">
              {search
                ? (language === 'en' ? 'No new items match your search.' : language === 'si' ? 'ගැලපෙන නව භාණ්ඩ නැත.' : 'பொருத்தமான பொருட்கள் இல்லை.')
                : (language === 'en' ? 'More new items coming soon!' : language === 'si' ? 'තවත් නව භාණ්ඩ ළඟදීම!' : 'மேலும் புதிய பொருட்கள் விரைவில்!')}
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
            {filteredItems.map((item, i) => {
              const cheapest = getCheapestSKU(item);
              const brands = getBrands(item);
              const anyInStock = item.skus.some(s => s.inStock);
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
                  onClick={() => openDetail(item)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm border border-green-100 hover:shadow-lg hover:border-green-300 transition-all group cursor-pointer flex flex-col relative"
                >
                  {/* NEW Badge overlay */}
                  <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-950 px-2 py-0.5 rounded-full text-[9px] font-bold shadow-md flex items-center gap-1">
                    <span>✨</span>
                    {language === 'en' ? 'NEW' : language === 'si' ? 'නව' : 'புதிய'}
                  </div>

                  {/* Image */}
                  <div className="w-full aspect-square relative bg-green-50 overflow-hidden">
                    <Image src={cheapest.image || item.defaultImage || '/images/placeholder.svg'} alt={item.name[language]} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 50vw, 20vw" loading="lazy" />
                    {!anyInStock && (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-red-500/90 backdrop-blur-sm z-10">
                        {language === 'en' ? 'Out of Stock' : language === 'si' ? 'තොග අවසන්' : 'இல்லை'}
                      </div>
                    )}
                    {brands.length > 1 && (
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold text-green-800 bg-white/90 backdrop-blur-sm shadow-sm z-10">
                        {brands.length} {language === 'en' ? 'brands' : language === 'si' ? 'සන්නාම' : 'பிராண்ட்'}
                      </div>
                    )}
                    {brands.length === 1 && brands[0] !== 'Generic' && (
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold text-green-800 bg-white/90 backdrop-blur-sm shadow-sm z-10">
                        {brands[0]}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-3 flex flex-col flex-1">
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm leading-snug mb-1 line-clamp-2 group-hover:text-green-700 transition-colors">
                      {item.name[language]}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-green-50">
                      <span className="text-sm font-bold text-green-700">
                        {item.skus.length > 1 ? `${cheapest.price}~` : cheapest.price}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* ─── Product Detail Drawer ─── */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]" onClick={() => setSelectedItem(null)} />
            <motion.div
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[201] bg-white rounded-t-3xl shadow-2xl max-h-[88vh] overflow-y-auto border-t-4 border-yellow-400"
            >
              <div className="flex justify-center pt-3 pb-2 sticky top-0 bg-white rounded-t-3xl z-10">
                <div className="w-10 h-1 rounded-full bg-gray-300" />
              </div>

              <div className="px-5 pb-8">
                <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-5 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors text-sm">✕</button>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="w-full md:w-64 aspect-square relative rounded-2xl overflow-hidden bg-green-50 flex-shrink-0">
                    <div className="absolute top-3 left-3 z-10 bg-yellow-400 text-yellow-950 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      ✨ {language === 'en' ? 'NEW ARRIVAL' : language === 'si' ? 'නව' : 'புதிய'}
                    </div>
                    <Image
                      src={activeSKU?.image || selectedItem.defaultImage || '/images/placeholder.svg'}
                      alt={selectedItem.name[language]}
                      fill className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 pt-2">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">{selectedItem.name[language]}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-5">{selectedItem.description[language]}</p>

                    <div className="flex items-baseline gap-3 mb-6">
                      <span className="text-3xl font-bold text-green-700">{activeSKU?.price ?? getCheapestSKU(selectedItem).price}</span>
                      {activeSKU && (
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${activeSKU.inStock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${activeSKU.inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                          {activeSKU.inStock
                            ? (language === 'en' ? 'In Stock' : language === 'si' ? 'තොග ඇත' : 'கையிருப்பில்')
                            : (language === 'en' ? 'Out of Stock' : language === 'si' ? 'තොග අවසන්' : 'இல்லை')}
                        </span>
                      )}
                    </div>

                    {/* Brand Selector */}
                    {getBrands(selectedItem).length > 0 && !(getBrands(selectedItem).length === 1 && getBrands(selectedItem)[0] === 'Generic') && (
                      <div className="mb-4">
                        <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                          {language === 'en' ? 'Brand' : language === 'si' ? 'සන්නාමය' : 'பிராண்ட்'}
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {getBrands(selectedItem).map(b => (
                            <button
                              key={b} onClick={() => handleBrandChange(b)}
                              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                                selectedBrand === b ? 'bg-green-600 text-white border-green-600 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:border-green-400'
                              }`}
                            >{b}</button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Variant Selectors */}
                    {selectedItem.variantLabels.map(label => {
                      const options = getFilteredOptions(selectedItem, label, selectedBrand, selectedOptions);
                      if (options.length === 0) return null;
                      return (
                        <div key={label} className="mb-4">
                          <label className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2 block">
                            {label}: <span className="text-green-700 normal-case">{selectedOptions[label]}</span>
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {options.map(opt => {
                              const isActive = selectedOptions[label] === opt;
                              return (
                                <button
                                  key={opt} onClick={() => handleOptionChange(label, opt)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                                    isActive ? 'bg-green-600 text-white border-green-600 shadow-sm' : 'bg-white text-gray-700 border-gray-200 hover:border-green-400 hover:text-green-700'
                                  }`}
                                >{opt}</button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                    {/* WhatsApp Order */}
                    <div className="mt-6">
                      <a
                        href={`https://wa.me/94764177746?text=${encodeURIComponent(
                          `Hi! I'd like to order this New Arrival:\n• ${selectedItem.name.en}\n• Brand: ${selectedBrand}${
                            Object.entries(selectedOptions).length > 0 ? '\n• ' + Object.entries(selectedOptions).map(([k, v]) => `${k}: ${v}`).join('\n• ') : ''
                          }\n• Price: ${activeSKU?.price || 'N/A'}`
                        )}`}
                        target="_blank" rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg w-full sm:w-auto justify-center ${
                          activeSKU?.inStock !== false
                            ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                        {language === 'en' ? 'Order via WhatsApp' : language === 'si' ? 'WhatsApp ඔස්සේ ඇණවුම්' : 'WhatsApp மூலம் ஆர்டர்'}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer t={t} language={language} />
    </main>
  );
}
