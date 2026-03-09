import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DayPicker } from 'react-day-picker';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Users, CreditCard, Smartphone, CheckCircle2, X } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { GradientButton } from './ui/gradient-button';
import { cn } from '../utils/cn';

export const BookingSystem: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState<{ from?: Date; to?: Date }>({});
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '2',
    roomType: 'Duplex AC Room',
    eventType: 'Stay Only'
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isShowingQR, setIsShowingQR] = useState(false);
  const [qrTimer, setQrTimer] = useState<number | null>(null);

  const totalAmount = React.useMemo(() => {
    if (formData.roomType.includes('Duplex')) return 4000;
    if (formData.roomType.includes('Guest')) return 2500;
    if (formData.roomType.includes('Full')) return 15000;
    return 5000; // default advance
  }, [formData.roomType]);

  useEffect(() => {
    const handleOpenBooking = (e: Event) => {
      const customEvent = e as CustomEvent;
      setIsOpen(true);
      if (customEvent.detail && customEvent.detail.roomType) {
        setFormData(prev => ({ ...prev, roomType: customEvent.detail.roomType }));
        if (customEvent.detail.skipToPayment) {
          setStep(3);
        }
      }
    };
    window.addEventListener('openBooking', handleOpenBooking);
    return () => window.removeEventListener('openBooking', handleOpenBooking);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (qrTimer !== null && qrTimer > 0) {
      interval = setInterval(() => {
        setQrTimer((prev) => (prev ? prev - 1 : 0));
      }, 1000);
    } else if (qrTimer === 0) {
      setQrTimer(null);
      setIsShowingQR(false);
      alert("Payment scan window expired. Please try again.");
    }
    return () => clearInterval(interval);
  }, [qrTimer]);

  const processPayment = () => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        const newBooking = {
          id: Date.now(),
          ...formData,
          checkIn: selectedRange.from ? selectedRange.from.toISOString() : '',
          checkOut: selectedRange.to ? selectedRange.to.toISOString() : '',
          paymentMethod,
          status: paymentMethod === 'UPI' ? 'Pending Verification' : 'Advance Paid (Card)',
          created_at: new Date().toISOString()
        };
        
        const existingBookingsStr = localStorage.getItem('ghvr_bookings');
        const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
        
        localStorage.setItem('ghvr_bookings', JSON.stringify([newBooking, ...existingBookings]));
        
        setStep(4); // Show success
        setIsShowingQR(false);
        setQrTimer(null);
        
        setTimeout(() => {
          setIsOpen(false);
          setStep(1);
          setPaymentMethod('');
          setFormData({
            name: '',
            phone: '',
            email: '',
            guests: '2',
            roomType: 'Duplex AC Room',
            eventType: 'Stay Only'
          });
        }, 4000);

      } catch (error) {
        console.error("Booking error", error);
        alert("Failed to save booking");
      } finally {
        setIsLoading(false);
      }
    }, 1500); // Simulate network check delay
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 2) {
      setStep(3); // Proceed to payment
      return;
    }

    if (step === 3 && paymentMethod) {
      if (paymentMethod === 'UPI' && !isShowingQR) {
        setIsShowingQR(true);
        setQrTimer(300); // 5 minutes = 300 seconds
        return;
      }

      // If card or if already verifying from QR step
      processPayment();
    }
  };

  return (
    <>
      <div className="fixed bottom-10 right-10 z-30">
        <GradientButton onClick={() => setIsOpen(true)} className="gap-2 shadow-2xl">
          <CalendarIcon size={20} />
          Book Now
        </GradientButton>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-4xl bg-[#fdfbf7] rounded-3xl md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px] max-h-[90vh]"
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors border border-black/10"
              >
                <X size={20} className="text-[#1a1a1a]" />
              </button>

              {/* Sidebar Info */}
              <div className="w-full md:w-1/3 bg-[#1a1a1a] p-10 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-serif font-bold mb-4">Your Village Escape</h2>
                  <p className="text-white/70 text-sm leading-relaxed">
                    Select your dates and preferences to begin your celebration at Shashi Kumar Resort.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#d4c5a9]">
                      <CalendarIcon size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#d4c5a9]">Dates</p>
                      <p className="text-sm font-medium text-white">
                        {selectedRange.from ? format(selectedRange.from, 'MMM dd') : 'Select'} - {selectedRange.to ? format(selectedRange.to, 'MMM dd') : 'Select'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[#d4c5a9]">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-[#d4c5a9]">Guests</p>
                      <p className="text-sm font-medium text-white">{formData.guests} People</p>
                    </div>
                  </div>
                  {step >= 3 && (
                     <div className="flex items-center gap-4 border-t border-white/10 pt-4 mt-4">
                      <div className="w-10 h-10 rounded-full bg-[#5A5A40] flex items-center justify-center text-white">
                        <CreditCard size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-[#d4c5a9]">Payment Amount</p>
                        <p className="text-sm font-bold text-white">₹{totalAmount.toLocaleString()}</p>
                      </div>
                     </div>
                  )}
                </div>
              </div>

              {/* Main Form Area */}
              <div className="flex-1 p-6 md:p-10 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="h-full flex flex-col"
                    >
                      <h3 className="text-2xl font-serif font-bold mb-8 text-[#1a1a1a]">Select Dates</h3>
                      <div className="flex-1 flex items-center justify-center">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-black/5">
                          <DayPicker
                            mode="range"
                            selected={{ from: selectedRange.from, to: selectedRange.to }}
                            onSelect={(range) => setSelectedRange(range || {})}
                            className="booking-calendar"
                          />
                        </div>
                      </div>
                      <GradientButton 
                        disabled={!selectedRange.from || !selectedRange.to}
                        onClick={() => setStep(2)}
                        className="mt-8 w-full"
                      >
                        Continue to Details
                      </GradientButton>
                    </motion.div>
                  )}

                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-serif font-bold mb-8 text-[#1a1a1a]">Guest Details</h3>
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Full Name</label>
                            <input 
                              required
                              type="text" 
                              className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#5A5A40] outline-none"
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">WhatsApp Phone Number</label>
                            <input 
                              required
                              type="tel" 
                              className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#5A5A40] outline-none"
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Email Address</label>
                          <input 
                            required
                            type="email" 
                            className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#5A5A40] outline-none"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Room Type</label>
                            <select 
                              className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#5A5A40] outline-none"
                              value={formData.roomType}
                              onChange={(e) => setFormData({...formData, roomType: e.target.value})}
                            >
                              <option>Duplex AC Room</option>
                              <option>Guest Room</option>
                              <option>Full Resort Booking</option>
                            </select>
                          </div>
                          <div className="space-y-1">
                            <label className="text-[10px] uppercase tracking-widest text-[#1a1a1a]/40 font-bold">Event Type</label>
                            <select 
                              className="w-full bg-white border border-black/5 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#5A5A40] outline-none"
                              value={formData.eventType}
                              onChange={(e) => setFormData({...formData, eventType: e.target.value})}
                            >
                              <option>Stay Only</option>
                              <option>Wedding</option>
                              <option>Engagement</option>
                              <option>Birthday Party</option>
                              <option>Corporate Retreat</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <button 
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex-1 bg-black/5 text-[#1a1a1a] py-4 rounded-xl font-bold"
                          >
                            Back
                          </button>
                          <GradientButton type="submit" className="flex-[2]">
                            Proceed to Payment
                          </GradientButton>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-serif font-bold mb-2 text-[#1a1a1a]">Secure Payment</h3>
                      <p className="text-sm text-[#1a1a1a]/60 mb-8">Secure your booking by making a payment of ₹{totalAmount.toLocaleString()}.</p>
                      
                      {isShowingQR ? (
                        <div className="flex flex-col items-center justify-center space-y-6 py-8 border border-black/10 rounded-2xl bg-white shadow-sm">
                          <h4 className="font-bold text-[#1a1a1a] text-lg">Scan to Pay</h4>
                          <div className="p-4 bg-white border-2 border-dashed border-black/20 rounded-xl relative">
                            <QRCodeSVG 
                              value={`upi://pay?pa=garuda123@ybl&pn=GreenHaven&am=${totalAmount}&cu=INR`} 
                              size={200} 
                            />
                            {qrTimer === 0 && (
                              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center font-bold text-rose-500">
                                EXPIRED
                              </div>
                            )}
                          </div>
                          
                          <div className="text-center">
                            <p className="text-sm text-[#1a1a1a]/60 mb-2">Awaiting payment verification...</p>
                            <div className="flex items-center justify-center gap-2 text-rose-500 font-bold">
                              <span>Expires in:</span>
                              <span className="font-mono text-xl bg-rose-50 px-3 py-1 rounded-lg">
                                {qrTimer !== null ? `${Math.floor(qrTimer / 60)}:${(qrTimer % 60).toString().padStart(2, '0')}` : '0:00'}
                              </span>
                            </div>
                          </div>

                          <div className="flex gap-4 w-full px-8 pt-4">
                            <button 
                              type="button"
                              onClick={() => {
                                setIsShowingQR(false);
                                setQrTimer(null);
                              }}
                              className="flex-1 bg-black/5 text-[#1a1a1a] py-3 rounded-xl font-bold hover:bg-black/10 transition-colors"
                            >
                              Cancel
                            </button>
                            <GradientButton 
                              onClick={processPayment} 
                              disabled={isLoading}
                              className="flex-1"
                            >
                              {isLoading ? 'Verifying...' : 'Check Status'}
                            </GradientButton>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleBookingSubmit} className="space-y-4">
                          <div className="grid gap-4">
                            <label className={cn("flex items-center p-4 border rounded-xl cursor-pointer transition-colors", paymentMethod === 'UPI' ? "border-[#5A5A40] bg-[#5A5A40]/5" : "border-black/10 hover:bg-black/5")}>
                              <input type="radio" required name="payment" value="UPI" onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                              <Smartphone className="mr-4 text-[#5A5A40]" />
                              <div className="flex-1">
                                <p className="font-bold text-[#1a1a1a]">Generate UPI QR Code</p>
                                <p className="text-xs text-[#1a1a1a]/60">Google Pay, PhonePe, Paytm</p>
                              </div>
                              {paymentMethod === 'UPI' && <CheckCircle2 className="text-[#5A5A40]" />}
                            </label>

                            <label className={cn("flex items-center p-4 border rounded-xl cursor-pointer transition-colors", paymentMethod === 'Card' ? "border-[#5A5A40] bg-[#5A5A40]/5" : "border-black/10 hover:bg-black/5")}>
                              <input type="radio" name="payment" value="Card" onChange={(e) => setPaymentMethod(e.target.value)} className="hidden" />
                              <CreditCard className="mr-4 text-[#5A5A40]" />
                              <div className="flex-1">
                                <p className="font-bold text-[#1a1a1a]">Credit / Debit Card</p>
                                <p className="text-xs text-[#1a1a1a]/60">Visa, Mastercard, RuPay</p>
                              </div>
                              {paymentMethod === 'Card' && <CheckCircle2 className="text-[#5A5A40]" />}
                            </label>
                          </div>

                          <div className="flex gap-4 pt-8">
                            <button 
                              type="button"
                              onClick={() => setStep(2)}
                              className="flex-1 bg-black/5 text-[#1a1a1a] py-4 rounded-xl font-bold"
                            >
                              Back
                            </button>
                            <GradientButton disabled={isLoading || !paymentMethod} type="submit" className="flex-[2]">
                              {isLoading ? 'Processing...' : (paymentMethod === 'UPI' ? `Generate QR for ₹${totalAmount.toLocaleString()}` : `Pay ₹${totalAmount.toLocaleString()} & Confirm`)}
                            </GradientButton>
                          </div>
                        </form>
                      )}
                    </motion.div>
                  )}

                  {step === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center space-y-6"
                    >
                      <div className="w-20 h-20 bg-emerald-100 text-[#5A5A40] rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-[#1a1a1a]">Booking Confirmed!</h3>
                      <p className="text-[#1a1a1a]/60 max-w-xs">
                        Thank you, {formData.name}. We've received your advance payment. Check your WhatsApp for the confirmation details!
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
