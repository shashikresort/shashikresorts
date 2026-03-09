import React, { useState } from 'react';
import { motion } from 'motion/react';
import { GradientButton } from './ui/gradient-button';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users } from 'lucide-react';

export const BookingBar: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<{ from?: Date; to?: Date }>({});
  const [showCalendar, setShowCalendar] = useState(false);
  const [guests, setGuests] = useState('2 Guests');

  const openMainBookingModal = () => {
    // We optionally pass this state into the global booking modal via CustomEvent
    window.dispatchEvent(new CustomEvent('openBooking', { 
      detail: { 
        triggerFromBar: true, 
        prefillDates: selectedRange,
        prefillGuests: guests
      } 
    }));
  };

  return (
    <section className="relative z-30 flex justify-center w-full px-4 -mt-16 sm:-mt-24 mb-20 pointer-events-auto">
      <motion.div 
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="w-full max-w-5xl bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-[#c19b6a]/20 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 relative"
      >
        
        {/* Date Selector */}
        <div className="flex-1 flex w-full relative">
          <button 
            onClick={() => setShowCalendar(!showCalendar)}
            className="w-full h-16 bg-[#f8f6f2] hover:bg-[#f2ece2] transition-colors rounded-xl flex items-center px-6 gap-4 border border-transparent focus:border-[#c19b6a] outline-none"
          >
            <CalendarIcon className="text-[#1f4d3e]" size={20} />
            <div className="flex flex-col items-start">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#1f4d3e]/60">Check In - Check Out</span>
              <span className="font-serif font-semibold text-[#222222]">
                {selectedRange.from && selectedRange.to 
                  ? `${format(selectedRange.from, 'MMM dd')} - ${format(selectedRange.to, 'MMM dd')}`
                  : "Select your dates"
                }
              </span>
            </div>
          </button>

          {showCalendar && (
            <div className="absolute top-20 left-0 bg-white p-4 rounded-2xl shadow-2xl border border-black/5 z-50">
              <DayPicker
                mode="range"
                selected={{ from: selectedRange.from, to: selectedRange.to }}
                onSelect={(range) => {
                  setSelectedRange(range || {});
                  if (range?.from && range?.to) setShowCalendar(false);
                }}
                className="booking-calendar"
              />
            </div>
          )}
        </div>

        {/* Guest Selector */}
        <div className="w-full md:w-64">
           <div className="w-full h-16 bg-[#f8f6f2] rounded-xl flex items-center px-6 gap-4 relative">
             <Users className="text-[#1f4d3e]" size={20} />
             <div className="flex flex-col items-start w-full">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#1f4d3e]/60">Occupancy</span>
                <select 
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full bg-transparent font-serif font-semibold text-[#222222] outline-none appearance-none cursor-pointer"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>Family (3-4)</option>
                  <option>Group (5+)</option>
                </select>
             </div>
           </div>
        </div>

         {/* CTA */}
         <div className="w-full md:w-auto">
            <button 
              onClick={openMainBookingModal}
              className="w-full md:w-auto h-16 px-10 bg-[#c19b6a] hover:bg-[#a68254] transition-colors text-white font-bold tracking-wide rounded-xl shadow-lg"
            >
              Check Availability
            </button>
         </div>

      </motion.div>
    </section>
  );
};
