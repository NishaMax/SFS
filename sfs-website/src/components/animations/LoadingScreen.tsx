'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'logo' | 'text' | 'done'>('logo');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 1200);
    const t2 = setTimeout(() => setPhase('done'), 2800);
    const t3 = setTimeout(() => onComplete(), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Animated S Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative mb-6"
          >
            <svg
              width="100"
              height="120"
              viewBox="0 0 100 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Sinduja Fancy Store Logo"
            >
              {/* Circle */}
              <motion.circle
                cx="50"
                cy="60"
                r="44"
                stroke="#15803d"
                strokeWidth="2.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              {/* Crown */}
              <motion.path
                d="M 35 22 L 38 12 L 44 18 L 50 8 L 56 18 L 62 12 L 65 22 Z"
                fill="#c9a84c"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
              {/* S Letter */}
              <motion.path
                d="M 58 40 C 58 34, 50 30, 44 32 C 38 34, 36 40, 42 44 C 48 48, 62 50, 62 60 C 62 70, 50 76, 42 72 C 36 68, 34 60, 40 56"
                stroke="#15803d"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.0, delay: 0.3, ease: 'easeInOut' }}
              />
              {/* Heart */}
              <motion.path
                d="M 46 82 C 46 78, 42 76, 40 78 C 38 80, 38 83, 46 90 C 54 83, 54 80, 52 78 C 50 76, 46 78, 46 82 Z"
                fill="#15803d"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
                style={{ transformOrigin: '46px 84px' }}
              />
              {/* Leaf accents */}
              <motion.path
                d="M 18 65 C 18 55, 28 52, 28 60 C 28 52, 18 49, 18 65 Z"
                fill="#22c55e"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              />
            </svg>
          </motion.div>

          {/* Store Name */}
          <AnimatePresence>
            {(phase === 'text') && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <h1 className="text-2xl md:text-3xl font-bold text-green-800 tracking-tight">
                  Sinduja Fancy Store
                </h1>
                <p className="text-sm text-green-600 mt-2 tracking-wide">
                  All You Need, All in One Place.
                </p>
                {/* Loading dots */}
                <div className="flex justify-center gap-1.5 mt-6">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-green-500"
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
