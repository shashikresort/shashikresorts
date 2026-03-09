import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bed, Bath, Wind, Tv, Coffee, ArrowRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { GradientButton } from './ui/gradient-button';

const rooms = [
  {
    id: 'duplex',
    name: 'Premium Duplex AC Room',
    description: 'Designed for bride & groom families, featuring a spacious hall and private balcony with village views.',
    price: '₹3500 - ₹4500',
    amenities: ['Air Conditioning', 'Private Balcony', 'Spacious Hall', 'Premium Bedding', 'Smart TV'],
    image: `${(import.meta as any).env.BASE_URL}images/media__1773073753034.jpg`
  },
  {
    id: 'guest',
    name: 'Comfort Guest Room',
    description: 'Perfect for friends and cousins, these rooms offer comfort and a shared hall for group gatherings.',
    price: '₹2500 - ₹3000',
    amenities: ['Air Conditioning', 'Shared Hall', 'Comfortable Bedding', 'Garden View', 'Guest Assistance'],
    image: `${(import.meta as any).env.BASE_URL}images/media__1773073812025.jpg`
  }
];

export const Rooms: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<typeof rooms[0] | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const handleRoomSelect = (room: typeof rooms[0]) => {
    setIsOpening(true);
    setTimeout(() => {
      setSelectedRoom(room);
      setIsOpening(false);
    }, 1000);
  };

  return (
    <section id="rooms" className="py-24 px-6 bg-[#f8f6f2] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] uppercase tracking-[0.4em] text-[#c19b6a] font-bold mb-4 block"
          >
            Accommodation
          </motion.span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-[#222222] mb-6">Luxury <span className="italic font-light text-[#1f4d3e]">Cottages</span></h2>
          <p className="text-[#222222]/80 max-w-2xl mx-auto text-lg font-serif">
            Our rooms are designed to provide a peaceful retreat while keeping you close to nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {rooms.map((room) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group relative flex flex-col hover:-translate-y-3 transition-transform duration-500"
            >
              <div 
                className="relative aspect-[16/10] rounded-[2rem] overflow-hidden cursor-pointer mb-8 shadow-2xl"
                onClick={() => handleRoomSelect(room)}
              >
                <img 
                  src={room.image} 
                  alt={room.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                    <ArrowRight size={32} />
                  </div>
                </div>
                
                {/* Door Opening Animation Overlay */}
                <AnimatePresence>
                  {isOpening && (
                    <div className="absolute inset-0 z-20 flex">
                      <motion.div 
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        exit={{ x: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="w-1/2 h-full bg-[#1f4d3e] border-r border-[#c19b6a]/30"
                      />
                      <motion.div 
                        initial={{ x: 0 }}
                        animate={{ x: "100%" }}
                        exit={{ x: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="w-1/2 h-full bg-[#1f4d3e] border-l border-[#c19b6a]/30"
                      />
                    </div>
                  )}
                </AnimatePresence>
              </div>

              <div className="px-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-serif font-bold text-[#222222]">{room.name}</h3>
                  <span className="text-[#c19b6a] font-bold">{room.price}</span>
                </div>
                <p className="text-[#222222]/80 mb-8 leading-relaxed">
                  {room.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  {room.amenities.slice(0, 3).map((amenity) => (
                    <div key={amenity} className="flex items-center gap-2 text-xs font-medium text-[#222222]/80 bg-[#1f4d3e]/5 px-4 py-2 rounded-full">
                      <div className="w-1 h-1 bg-[#1f4d3e] rounded-full" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Room Detail Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setSelectedRoom(null)}
            />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="relative max-w-6xl w-full bg-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <div className="w-full md:w-1/2 h-[400px] md:h-auto">
                <img 
                  src={selectedRoom.image} 
                  alt={selectedRoom.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
                <button 
                  onClick={() => setSelectedRoom(null)}
                  className="absolute top-8 right-8 text-[#222222]/40 hover:text-[#222222] transition-colors"
                >
                  Close
                </button>
                <span className="text-[10px] uppercase tracking-widest text-[#c19b6a] font-bold mb-4 block">Room Details</span>
                <h3 className="text-4xl md:text-5xl font-serif font-bold text-[#222222] mb-6">{selectedRoom.name}</h3>
                <p className="text-[#222222]/80 mb-10 leading-relaxed text-lg">
                  {selectedRoom.description}
                </p>
                
                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1f4d3e]/5 flex items-center justify-center text-[#1f4d3e]">
                      <Wind size={24} />
                    </div>
                    <span className="text-sm font-medium">Air Conditioning</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1f4d3e]/5 flex items-center justify-center text-[#1f4d3e]">
                      <Tv size={24} />
                    </div>
                    <span className="text-sm font-medium">Smart TV</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1f4d3e]/5 flex items-center justify-center text-[#1f4d3e]">
                      <Coffee size={24} />
                    </div>
                    <span className="text-sm font-medium">Coffee Maker</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1f4d3e]/5 flex items-center justify-center text-[#1f4d3e]">
                      <Bath size={24} />
                    </div>
                    <span className="text-sm font-medium">Private Bath</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-10 border-t border-black/5">
                  <div>
                    <p className="text-xs text-[#222222]/40 uppercase tracking-widest mb-1">Starting from</p>
                    <p className="text-3xl font-serif font-bold text-[#222222]">{selectedRoom.price}</p>
                  </div>
                  <GradientButton onClick={() => window.dispatchEvent(new CustomEvent('openBooking', { detail: { roomType: selectedRoom.name, skipToPayment: true } }))}>
                    Book This Room
                  </GradientButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
