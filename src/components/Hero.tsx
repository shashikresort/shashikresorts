import React from 'react';
import { motion } from 'motion/react';
import { GradientButton } from './ui/gradient-button';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#222222]">
      
      {/* Video Background */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="object-cover w-full h-full opacity-60"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-luxury-resort-with-swimming-pool-and-palm-trees-42646-large.mp4" 
            type="video/mp4" 
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f4d3e]/60 via-black/40 to-[#f8f6f2]" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <span className="inline-block px-5 py-2 rounded-full border border-[#c19b6a]/50 text-xs font-medium text-[#f8f6f2] mb-8 uppercase tracking-[0.2em] backdrop-blur-sm">
            5-Star Village Resort
          </span>
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-[#f8f6f2] mb-6 leading-[1.1] tracking-wide shadow-black drop-shadow-lg">
            Escape Into Nature
          </h1>
          <p className="text-lg md:text-2xl text-[#f8f6f2]/90 mb-12 max-w-2xl mx-auto font-serif tracking-wide drop-shadow-md">
            Luxury cottages surrounded by peaceful landscapes.
          </p>
          
          <GradientButton 
            onClick={() => {
              const element = document.getElementById('rooms');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-10 py-5 text-lg shadow-2xl transition-transform hover:-translate-y-1"
            style={{
              '--color-1': '#1f4d3e',
              '--color-2': '#173d31', 
              '--color-3': '#c19b6a',
              '--color-4': '#a68254'
            } as React.CSSProperties}
          >
            Explore Resort
          </GradientButton>
        </motion.div>
      </div>

    </section>
  );
};
