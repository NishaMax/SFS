'use client';

import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Translations, Language } from '@/types';

interface VisitUsProps {
  t: Translations;
  language: Language;
}

export default function VisitUs({ t, language }: VisitUsProps) {
  const { ref, isInView } = useInView(0.15);

  return (
    <section id="contact" className="py-16 md:py-24 bg-green-50/50 relative" ref={ref} aria-labelledby="visit-heading">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 id="visit-heading" initial={{ opacity: 0, y: 20 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-900">
            {t.sections.visitUs}
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="text-green-600 mt-3 text-sm sm:text-base">
            {t.sections.visitUsDesc}
          </motion.p>
          <motion.div initial={{ scaleX: 0 }} animate={isInView ? { scaleX: 1 } : {}} transition={{ duration: 0.5, delay: 0.3 }} className="section-divider mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Map */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }} className="rounded-2xl overflow-hidden shadow-lg border border-green-100 h-[300px] md:h-full min-h-[300px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.5!2d80.38!3d6.53!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzEnNDguMCJOIDgwwrAyMic0OC4wIkU!5e0!3m2!1sen!2slk!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sinduja Fancy Store Location"
            />
          </motion.div>

          {/* Contact Cards */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={isInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6, delay: 0.3 }} className="flex flex-col gap-4">
            {/* Address */}
            <div className="bg-white rounded-2xl p-5 border border-green-100 shadow-sm card-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0">📍</div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">
                    {language === 'si' ? 'ලිපිනය' : language === 'ta' ? 'முகவரி' : 'Address'}
                  </h3>
                  <p className="text-green-600 text-sm">No. 27, Bus Stand, Kalawana, Sri Lanka</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <a href="tel:+94764177746" className="bg-white rounded-2xl p-5 border border-green-100 shadow-sm card-lift block">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0">📞</div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">{t.common.callNow}</h3>
                  <p className="text-green-600 text-sm">076 417 7746</p>
                </div>
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/94764177746" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-5 shadow-md card-lift block text-white">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center text-xl flex-shrink-0">💬</div>
                <div>
                  <h3 className="font-semibold mb-1">{t.common.whatsapp}</h3>
                  <p className="text-green-100 text-sm">
                    {language === 'si' ? 'අපට පණිවිඩයක් එවන්න' : language === 'ta' ? 'எங்களுக்கு செய்தி அனுப்புங்கள்' : 'Send us a message anytime'}
                  </p>
                </div>
              </div>
            </a>

            {/* Opening Hours */}
            <div className="bg-white rounded-2xl p-5 border border-green-100 shadow-sm card-lift">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-xl flex-shrink-0">🕐</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-green-800 mb-2">
                    {language === 'si' ? 'විවෘත වේලාවන්' : language === 'ta' ? 'திறப்பு நேரம்' : 'Opening Hours'}
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span className="text-green-500">Mon - Sat</span>
                      <span className="text-green-800 font-medium">8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-green-500">Sunday</span>
                      <span className="text-green-800 font-medium">9:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Get Directions Button */}
            <a
              href="https://maps.google.com/?q=6.53,80.38"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary justify-center w-full text-center mt-1"
            >
              🗺️ {t.common.getDirections}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
