import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageSquare, Instagram, Facebook, Youtube } from 'lucide-react';
import { GradientButton } from './ui/gradient-button';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto backdrop-blur-md bg-white/10 p-10 rounded-[3rem] border border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
              <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-[10px] uppercase tracking-[0.4em] text-[#c19b6a] font-bold mb-4 block drop-shadow-md"
            >
              Get in Touch
            </motion.span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 drop-shadow-lg">Let's Plan Your <span className="italic font-light text-[#c19b6a]">Event</span></h2>
            <p className="text-white/90 text-lg mb-12 max-w-md font-serif drop-shadow-md">
              Have questions about our packages or want to book a site visit? 
              Our team is here to help you create the perfect celebration.
            </p>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group cursor-pointer p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#c19b6a] group-hover:border-[#c19b6a] group-hover:text-black transition-all shadow-lg">
                  <Phone size={24} className="group-hover:animate-bounce" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Call Us</p>
                  <p className="text-xl font-serif font-bold text-white drop-shadow-md">+91 7569262463</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#c19b6a] group-hover:border-[#c19b6a] group-hover:text-black transition-all shadow-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Email Us</p>
                  <p className="text-xl font-serif font-bold text-white drop-shadow-md">shashikumar@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group cursor-pointer p-4 rounded-2xl hover:bg-white/5 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:bg-[#c19b6a] group-hover:border-[#c19b6a] group-hover:text-black transition-all shadow-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Location</p>
                  <p className="text-xl font-serif font-bold text-white drop-shadow-md">Hanmakonda Room</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-8 px-4">
              <a href="https://www.instagram.com/its_kumardora_official?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#c19b6a] hover:border-[#c19b6a] transition-colors text-white hover:text-black">
                <Instagram size={20} />
              </a>
              <button className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#c19b6a] hover:border-[#c19b6a] transition-colors text-white hover:text-black">
                <Facebook size={20} />
              </button>
              <button className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-[#c19b6a] hover:border-[#c19b6a] transition-colors text-white hover:text-black">
                <Youtube size={20} />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/10 backdrop-blur-xl p-12 rounded-[3rem] shadow-2xl border border-white/20"
          >
            <h3 className="text-3xl font-serif font-bold text-white mb-8">Send an Inquiry</h3>
            <form className="space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Your Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#c19b6a] text-white placeholder-white/30 transition-colors" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Phone</label>
                  <input type="tel" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#c19b6a] text-white placeholder-white/30 transition-colors" />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Event Type</label>
                  <select className="w-full bg-white/10 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#c19b6a] text-white transition-colors">
                    <option className="bg-black text-white">Wedding</option>
                    <option className="bg-black text-white">Stay Only</option>
                    <option className="bg-black text-white">Corporate</option>
                    <option className="bg-black text-white">Other</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-[#c19b6a] text-white placeholder-white/30 transition-colors resize-none" />
              </div>
              <GradientButton className="w-full shadow-lg">
                Send Message
              </GradientButton>
            </form>
          </motion.div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/917569262463"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-32 right-10 z-30 w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#20ba5a] transition-colors"
      >
        <MessageSquare size={32} />
        <motion.div 
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-[#25D366] rounded-full -z-10 opacity-40"
        />
      </motion.a>
    </section>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent text-white py-20 px-6 border-t border-white/20 relative z-10 backdrop-blur-md bg-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-[#1f4d3e] rounded-full flex items-center justify-center text-white text-xl shadow-lg border border-white/20">
                🌿
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-white drop-shadow-md">Green Haven</span>
            </div>
            <p className="text-white/80 max-w-sm leading-relaxed drop-shadow-md">
              Green Haven Village Resort is your premier destination for weddings and celebrations. 
              We blend traditional village charm with modern luxury to create unforgettable memories.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-[#c19b6a] drop-shadow-md">Quick Links</h4>
            <ul className="space-y-4 text-white/80 text-sm">
              <li><a href="#" className="hover:text-white transition-colors drop-shadow-sm">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors drop-shadow-sm">About Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-[#c19b6a] drop-shadow-md">Legal</h4>
            <ul className="space-y-4 text-white/80 text-sm flex flex-col items-start gap-4">
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('openPolicy', { detail: 'privacy' }))} className="hover:text-white transition-colors drop-shadow-sm">Privacy Policy</button></li>
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('openPolicy', { detail: 'terms' }))} className="hover:text-white transition-colors drop-shadow-sm">Terms of Service</button></li>
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('openPolicy', { detail: 'cancellation' }))} className="hover:text-white transition-colors drop-shadow-sm">Cancellation Policy</button></li>
              <li><button onClick={() => window.dispatchEvent(new CustomEvent('openPolicy', { detail: 'cookie' }))} className="hover:text-white transition-colors drop-shadow-sm">Cookie Policy</button></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/60 text-xs">
            © 2026 Green Haven Village Resort. All rights reserved.
          </p>
          <div className="flex gap-8 text-white/60 text-xs uppercase tracking-widest font-bold">
            <span>Designed with ❤️ for Celebrations</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
