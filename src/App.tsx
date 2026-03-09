import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IntroAnimation } from './components/IntroAnimation';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Rooms } from './components/Rooms';
import { Weddings } from './components/Weddings';
import { Activities } from './components/Activities';
import { Gallery } from './components/Gallery';
import { Contact, Footer } from './components/Contact';
import { BookingSystem } from './components/BookingSystem';
import { AncientScrollBackground } from './components/AncientScrollBackground';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalPages } from './components/LegalPages';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const sections = [
    { id: 'home', component: <Hero /> },
    { id: 'rooms', component: <Rooms /> },
    { id: 'events', component: <Weddings /> },
    { id: 'activities', component: <Activities /> },
    { id: 'gallery', component: <Gallery /> },
    { id: 'contact', component: <Contact /> },
  ];

  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'admin') {
      setShowAdminDashboard(true);
      return;
    }
    setShowAdminDashboard(false);
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-transparent selection:bg-[#5A5A40] selection:text-white">
      <AnimatePresence>
        {showIntro && (
          <IntroAnimation onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {!showIntro && !showAdminDashboard && (
        <AncientScrollBackground>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar activeSection={activeSection} onNavigate={handleNavigate} />
            
            <main ref={scrollRef}>
              {sections.map((section) => (
                <div key={section.id} id={section.id}>
                  {section.component}
                </div>
              ))}
            </main>

            <Footer />
            <BookingSystem />
            <LegalPages />
          </motion.div>
        </AncientScrollBackground>
      )}

      {showAdminDashboard && <AdminDashboard onExit={() => setShowAdminDashboard(false)} />}
    </div>
  );
}
