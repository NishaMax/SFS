'use client';

import { useLanguage } from '@/hooks/useLanguage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { storeInfo } from '@/data/storeInfo';

export default function ContactPage() {
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

  const ct = t.contactPage;

  const faqs = [
    { q: ct.faqQ1, a: ct.faqA1 },
    { q: ct.faqQ2, a: ct.faqA2 },
    { q: ct.faqQ3, a: ct.faqA3 },
  ];

  return (
    <main className="min-h-screen flex flex-col bg-gray-50/50">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-200/20 rounded-full blur-[100px] pointer-events-none" />

      <Header language={language} onLanguageChange={setLanguage} t={t} />
      
      <div className="flex-1 pt-32 pb-20 px-4 max-w-7xl mx-auto w-full relative z-10">
        
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-green-950 tracking-tight mb-4"
          >
            {ct.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-gray-600 font-medium text-lg max-w-2xl mx-auto"
          >
            {ct.subtitle}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-24">
          
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
          >
            <form className="flex flex-col gap-5" onSubmit={e => e.preventDefault()}>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">{ct.formName}</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">{ct.formEmail}</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 mb-2 block">{ct.formMessage}</label>
                <textarea rows={5} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all resize-none"></textarea>
              </div>
              <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3.5 rounded-xl shadow-md transition-all mt-2">
                {ct.formSubmit}
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-gradient-to-br from-green-900 to-green-950 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-green-500/20 rounded-full blur-3xl" />
              
              <div className="space-y-6 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-xl backdrop-blur-sm border border-white/10">📍</div>
                  <div>
                    <h4 className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">{ct.infoAddress}</h4>
                    <p className="font-medium">{storeInfo.address[language]}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-xl backdrop-blur-sm border border-white/10">📞</div>
                  <div>
                    <h4 className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">{ct.infoPhone}</h4>
                    <p className="font-medium">{storeInfo.phone}</p>
                    <p className="font-medium text-sm mt-0.5 text-gray-300">WhatsApp: {storeInfo.whatsapp}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-xl backdrop-blur-sm border border-white/10">🕒</div>
                  <div>
                    <h4 className="text-green-300 text-xs font-bold uppercase tracking-wider mb-1">{ct.infoHours}</h4>
                    <p className="font-medium whitespace-pre-line leading-relaxed">{storeInfo.openingHours[language]}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-gray-100 flex-1 min-h-[250px] relative bg-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15858.822557434196!2d80.39294244999999!3d6.4318047!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3e76f920f78a7%3A0xc3c651f67b587aeb!2sKalawana%20Bus%20Stand!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-green-950 mb-10">{ct.faqTitle}</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all">
                <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-3">
                  <span className="text-green-600">Q.</span> {faq.q}
                </h4>
                <p className="text-gray-600 pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      <Footer t={t} language={language} />
    </main>
  );
}
