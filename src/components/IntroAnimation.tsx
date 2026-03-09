import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    // Reveal gates, then after 2s, slide them open
    const timer1 = setTimeout(() => setIsOpen(true), 2000); // Open gates
    // Fade out logo while opening
    const timer2 = setTimeout(() => setShowLogo(false), 2000);
    // Unmount IntroAnimation entirely after gates are fully open
    const timer3 = setTimeout(() => onComplete(), 3500); 

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none">
      
      {/* Left Gate */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? "-100%" : 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} /* Cinematic easing */
        className="absolute top-0 left-0 w-1/2 h-full bg-[#1f4d3e] border-r-2 border-[#c19b6a]/30 shadow-2xl z-20"
      />

      {/* Right Gate */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: isOpen ? "100%" : 0 }}
        transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }} 
        className="absolute top-0 right-0 w-1/2 h-full bg-[#1f4d3e] border-l-2 border-[#c19b6a]/30 shadow-2xl z-20"
      />

      {/* Center Text/Logo */}
      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="absolute z-30 flex flex-col items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center"
          >
            <h1 className="text-4xl md:text-6xl font-serif text-[#f8f6f2] font-semibold tracking-wide mb-4">
              Welcome To Shashik Resorts
            </h1>
            <div className="w-24 h-px bg-[#c19b6a]" />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
