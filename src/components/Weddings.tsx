import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Users, MapPin } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';

export const Weddings: React.FC = () => {
  return (
    <section className="relative py-32 px-6 bg-transparent text-white overflow-hidden z-10">
      {/* Container Background */}
      <div className="absolute inset-x-4 inset-y-8 max-w-7xl mx-auto backdrop-blur-xl bg-black/40 rounded-[4rem] border border-white/20 -z-10" />

      {/* Flower Petals Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: -50, 
              rotate: 0,
              opacity: 0 
            }}
            animate={{ 
              y: "110vh", 
              rotate: 720,
              opacity: [0, 0.6, 0.6, 0]
            }}
            transition={{ 
              duration: 8 + Math.random() * 8, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute text-pink-200/20 text-xl"
          >
            🌸
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest text-pink-300">
              <Heart size={14} fill="currentColor" />
              Wedding Destination
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] tracking-tighter">
              A <span className="italic font-light text-pink-300">Royal</span> <br />
              Village Wedding
            </h2>
            <p className="text-lg text-white/60 max-w-lg leading-relaxed font-serif">
              Transform your special day into a timeless memory. Our expansive lawns and traditional 
              village architecture provide a majestic backdrop for your celebration.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-pink-300">
                  <Users size={20} />
                  <span className="text-2xl font-bold">500+</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-white/40">Guest Capacity</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-pink-300">
                  <MapPin size={20} />
                  <span className="text-2xl font-bold">10k sqft</span>
                </div>
                <p className="text-xs uppercase tracking-widest text-white/40">Event Space</p>
              </div>
            </div>

            <div className="pt-10">
              <GradientButton asChild className="gap-2 px-10">
                <a 
                  href="/first_website/brochure.pdf"
                  download="Shashi_Kumar_Resort_Brochure.pdf"
                >
                  Download Wedding Brochure
                  <Star size={18} />
                </a>
              </GradientButton>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200" 
                alt="Wedding Setup" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
            
            {/* Decorative Elements */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute -bottom-10 -right-10 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl -z-10"
            />
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="absolute -top-10 -left-10 w-48 h-48 border border-white/20 rounded-[3rem] -z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
