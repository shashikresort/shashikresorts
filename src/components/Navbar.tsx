import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';
import { cn } from '../utils/cn';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleNavigate = (sectionId: string) => {
    onNavigate(sectionId);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'rooms', label: 'Stays' },
    { id: 'events', label: 'Weddings' },
    { id: 'activities', label: 'Activities' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact' },
    { id: 'admin', label: 'Admin' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="pointer-events-auto cursor-pointer flex items-center gap-2"
        onClick={() => onNavigate('home')}
      >
        <div className="w-10 h-10 bg-[#5A5A40] rounded-full flex items-center justify-center text-white text-xl">
          🌿
        </div>
        <span className="font-serif font-bold text-xl tracking-tight text-[#1a1a1a]">Shashi Kumar Resort</span>
      </motion.div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-8 pointer-events-auto bg-white/80 backdrop-blur-md px-8 py-3 rounded-full border border-black/5 shadow-sm">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "text-sm font-medium transition-all relative",
              activeSection === item.id ? "text-[#5A5A40]" : "text-[#1a1a1a]/60 hover:text-[#1a1a1a]"
            )}
          >
            {item.label}
            {activeSection === item.id && (
              <motion.div 
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#5A5A40]"
              />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 pointer-events-auto">
        {/* Removed Book Now button based on request */}
        <button 
          className="md:hidden w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md border border-black/5"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-24 left-6 right-6 bg-white rounded-3xl shadow-2xl border border-black/5 p-8 flex flex-col gap-6 md:hidden pointer-events-auto"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={cn(
                  "text-2xl font-serif text-left",
                  activeSection === item.id ? "text-[#5A5A40] italic underline underline-offset-8" : "text-[#1a1a1a]"
                )}
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-black/5 my-2" />
            {/* Removed mobile book button */}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
