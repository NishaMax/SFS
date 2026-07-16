'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface DoorEntranceProps {
  onComplete: () => void;
}

export default function DoorEntrance({ onComplete }: DoorEntranceProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-gradient-to-b from-green-50 to-white overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Store Front Frame */}
      <div className="relative w-full max-w-lg mx-auto px-4">
        {/* Arch Top */}
        <motion.div
          className="mx-auto mb-0 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-green-700 text-sm tracking-[0.2em] uppercase font-medium">
            Welcome to
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-green-800 mt-1">
            Sinduja Fancy Store
          </h2>
          <div className="section-divider mt-3 mb-6" />
        </motion.div>

        {/* Door Frame */}
        <div className="relative mx-auto" style={{ width: '280px', height: '380px' }}>
          {/* Frame Border */}
          <div className="absolute inset-0 border-4 border-green-800 rounded-t-[140px] overflow-hidden">
            {/* Behind the doors - store glimpse */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-100 via-green-50 to-white flex flex-col items-center justify-center">
              <span className="text-5xl mb-3">🏪</span>
              <p className="text-green-700 text-sm font-medium">Come Inside</p>
            </div>

            {/* Left Door */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-br from-green-700 to-green-900 border-r border-green-600 origin-left"
              style={{ transformOrigin: 'left center' }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -105 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Door Panel Detail */}
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-16 h-24 border-2 border-green-500/30 rounded-lg mb-4" />
                <div className="w-16 h-24 border-2 border-green-500/30 rounded-lg" />
              </div>
              {/* Door Handle */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 w-2 h-10 bg-gold-400 rounded-full" />
            </motion.div>

            {/* Right Door */}
            <motion.div
              className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-bl from-green-700 to-green-900 border-l border-green-600 origin-right"
              style={{ transformOrigin: 'right center' }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 105 }}
              transition={{ duration: 1.2, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
            >
              {/* Door Panel Detail */}
              <div className="h-full flex flex-col items-center justify-center">
                <div className="w-16 h-24 border-2 border-green-500/30 rounded-lg mb-4" />
                <div className="w-16 h-24 border-2 border-green-500/30 rounded-lg" />
              </div>
              {/* Door Handle */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-10 bg-gold-400 rounded-full" />
            </motion.div>
          </div>

          {/* Logo overlay on doors */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="w-16 h-16 rounded-full border-3 border-white/40 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">S</span>
            </div>
          </motion.div>
        </div>

        {/* Enter Button */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          <motion.button
            onClick={onComplete}
            className="btn-primary text-base px-8 py-3"
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(21, 128, 61, 0.4)',
                '0 0 0 12px rgba(21, 128, 61, 0)',
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          >
            🚪 Enter the Store
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
