import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Maximize2, X } from 'lucide-react';
import { cn } from '../utils/cn';

const categories = ['All', 'Resort', 'Rooms', 'Pool', 'Weddings', 'Activities'];

const photos = [
  { id: 2, category: 'Rooms', url: `${(import.meta as any).env.BASE_URL}images/media__1773073753034.jpg`, title: 'Premium Duplex' },
  { id: 3, category: 'Pool', url: `${(import.meta as any).env.BASE_URL}images/media__1773073812058.jpg`, title: 'Infinity Pool' },
  { id: 4, category: 'Weddings', url: `${(import.meta as any).env.BASE_URL}images/media__1773073753034.jpg`, title: 'Lawn Setup' },
  { id: 5, category: 'Activities', url: `${(import.meta as any).env.BASE_URL}images/media__1773073790876.jpg`, title: 'Box Cricket' },
  { id: 6, category: 'Resort', url: `${(import.meta as any).env.BASE_URL}images/media__1773073752994.jpg`, title: 'Night View' },
  { id: 7, category: 'Weddings', url: `${(import.meta as any).env.BASE_URL}images/media__1773073812025.jpg`, title: 'Reception Hall' },
  { id: 8, category: 'Rooms', url: `${(import.meta as any).env.BASE_URL}images/media__1773073812025.jpg`, title: 'Guest Suite' },
];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const filteredPhotos = activeCategory === 'All' 
    ? photos 
    : photos.filter(p => p.category === activeCategory);

  const handleCapture = () => {
    setIsCapturing(true);
    setTimeout(() => setIsCapturing(false), 500);
  };

  return (
    <section className="py-24 px-6 bg-[#f5f2ed] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-[#c19b6a] mb-4"
            >
              <Camera size={20} />
              <span className="text-sm font-bold uppercase tracking-widest">Visual Journey</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#222222]">Captured <span className="italic font-light text-[#1f4d3e]">Moments</span></h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  handleCapture();
                }}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all shadow-sm",
                  activeCategory === cat 
                    ? "bg-[#1f4d3e] text-white" 
                    : "bg-white text-[#222222]/60 hover:bg-white/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Shutter Flash Effect */}
        <AnimatePresence>
          {isCapturing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-white pointer-events-none"
            />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 6 - 3 }}
                animate={{ opacity: 1, scale: 1, rotate: Math.random() * 4 - 2 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative aspect-[4/5] bg-white p-3 shadow-xl cursor-pointer hover:z-10 hover:scale-105 transition-all"
                onClick={() => setSelectedPhoto(photo)}
              >
                <div className="relative w-full h-[85%] overflow-hidden bg-gray-100">
                  <img 
                    src={photo.url} 
                    alt={photo.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Maximize2 className="text-white" />
                  </div>
                </div>
                <div className="h-[15%] flex items-center justify-center">
                  <p className="font-serif italic text-sm text-[#1a1a1a]/60">{photo.title}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedPhoto(null)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-5xl w-full aspect-video bg-white p-4 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black transition-colors"
              >
                <X size={24} />
              </button>
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                <p className="text-sm uppercase tracking-widest opacity-60 mb-2">{selectedPhoto.category}</p>
                <h3 className="text-3xl font-serif font-bold">{selectedPhoto.title}</h3>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
