import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight, Play } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#f5f2ed]">
      {/* Background Image with Parallax/Zoom effect */}
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${(import.meta as any).env.BASE_URL}images/media__1773073752994.jpg')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#f5f2ed]" />
      </motion.div>

      {/* Interactive Elements: Floating Leaves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: -20, 
              rotate: 0,
              opacity: 0 
            }}
            animate={{ 
              y: "110vh", 
              rotate: 360,
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 10 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute text-emerald-800/20 text-2xl"
          >
            🍃
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-sm font-medium text-[#1a1a1a] mb-6 uppercase tracking-widest">
            Village Wedding & Celebration Resort
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#1a1a1a] mb-8 leading-[0.9] tracking-tighter">
            Where <span className="italic font-light text-[#5A5A40]">Celebrations</span> <br />
            Meet Nature
          </h1>
          <p className="text-lg md:text-xl text-[#1a1a1a]/70 mb-10 max-w-2xl mx-auto font-serif">
            Experience the perfect blend of village charm and modern luxury. 
            Your dream destination for weddings, family getaways, and peaceful retreats.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <GradientButton 
              onClick={() => window.dispatchEvent(new Event('openBooking'))}
              className="gap-2"
            >
              Check Availability
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </GradientButton>
            <GradientButton variant="variant" className="gap-3 group">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white transition-all text-white group-hover:text-black">
                <Play size={14} fill="currentColor" />
              </div>
              Explore Resort
            </GradientButton>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-[#1a1a1a]/40 font-bold">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-[#5A5A40] to-transparent" />
      </motion.div>
    </section>
  );
};
