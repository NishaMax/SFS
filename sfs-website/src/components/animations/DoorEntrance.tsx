'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface DoorEntranceProps {
  onComplete: () => void;
}

export default function DoorEntrance({ onComplete }: DoorEntranceProps) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-gradient-to-b from-green-900 to-green-950 overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Store Front Frame */}
      <div className="relative w-full max-w-lg mx-auto px-4 flex flex-col items-center">
        {/* Arch Top / Welcome Text */}
        <motion.div
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-green-300/80 text-xs md:text-sm tracking-[0.3em] uppercase font-semibold mb-2">
            Welcome to
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            Sinduja Fancy Store
          </h2>
        </motion.div>

        {/* Modern Glass Door Frame */}
        <div className="relative w-full max-w-sm h-[400px] md:h-[450px]">
          {/* Frame Border with subtle glow */}
          <div className="absolute inset-0 border-[3px] border-green-700/50 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(21,128,61,0.3)] bg-[#0a1f11]">
            
            {/* Behind the doors - store glow/glimpse */}
            <div className="absolute inset-0 bg-gradient-to-b from-green-800/40 to-[#0a1f11] flex flex-col items-center justify-center opacity-80">
              <div className="w-20 h-20 rounded-full bg-green-500/20 blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              <p className="text-green-300 font-medium tracking-widest uppercase text-sm z-10">Step Inside</p>
            </div>

            {/* Left Sliding Door (Glassmorphism) */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 h-full bg-white/5 backdrop-blur-md border-r border-white/10 flex justify-end items-center pr-3 sm:pr-4"
              initial={{ x: 0 }}
              animate={{ x: '-100%' }}
              transition={{ duration: 1.6, delay: 1.0, ease: [0.75, 0, 0.25, 1] }}
            >
              {/* Sleek Vertical Handle */}
              <div className="w-1 md:w-1.5 h-32 md:h-40 bg-gradient-to-b from-green-300/40 via-green-100 to-green-300/40 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
            </motion.div>

            {/* Right Sliding Door (Glassmorphism) */}
            <motion.div
              className="absolute right-0 top-0 w-1/2 h-full bg-white/5 backdrop-blur-md border-l border-white/10 flex justify-start items-center pl-3 sm:pl-4"
              initial={{ x: 0 }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.6, delay: 1.0, ease: [0.75, 0, 0.25, 1] }}
            >
              {/* Sleek Vertical Handle */}
              <div className="w-1 md:w-1.5 h-32 md:h-40 bg-gradient-to-b from-green-300/40 via-green-100 to-green-300/40 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
            </motion.div>

            {/* Logo overlay strictly hiding before open */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="w-16 h-16 rounded-full border border-green-400/50 bg-green-900/40 backdrop-blur-sm flex items-center justify-center shadow-lg">
                <span className="text-green-300 text-2xl font-bold font-serif">S</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Enter Button */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
        >
          <motion.button
            onClick={onComplete}
            className="group relative px-8 py-3 bg-transparent border border-green-500 text-green-300 font-medium tracking-wider rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">ENTER STORE</span>
            <div className="absolute inset-0 bg-green-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
