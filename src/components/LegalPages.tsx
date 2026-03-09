import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield, FileText, XCircle, Cookie } from 'lucide-react';

const policies = {
  privacy: {
    title: "Privacy Policy",
    icon: <Shield className="w-6 h-6 text-[#5A5A40]" />,
    content: "We value your privacy. This policy outlines how we collect, use, and protect your personal information when you use our website and booking services. We collect essential data such as your name, contact details, and payment information solely to process your resort reservations and improve your guest experience. We do not sell your personal data to third parties. All payment processing, including UPI transactions, is encrypted and securely handled."
  },
  terms: {
    title: "Terms of Service",
    icon: <FileText className="w-6 h-6 text-[#5A5A40]" />,
    content: "By accessing our website and booking a stay at our resort, you agree to these Terms of Service. Users must be at least 18 years old to make a reservation. You agree to provide accurate information during the booking process. The resort reserves the right to refuse service, terminate accounts, or cancel reservations at our discretion if we suspect fraudulent activity or a violation of our property rules."
  },
  cancellation: {
    title: "Cancellation Policy",
    icon: <XCircle className="w-6 h-6 text-[#5A5A40]" />,
    content: "We understand that plans change. Cancellations made at least 48 hours prior to the scheduled check-in date will receive a full refund, minus any applicable transaction fees. Cancellations made within 48 hours of check-in will incur a penalty equivalent to one night's stay. No-shows will be charged the full amount of the reservation. Refunds for UPI or card payments will be processed within 5-7 business days."
  },
  cookie: {
    title: "Cookie Policy",
    icon: <Cookie className="w-6 h-6 text-[#5A5A40]" />,
    content: "Our website uses cookies to enhance your browsing experience. We use essential cookies to keep track of your room selections and booking session. We also use analytical cookies to understand how visitors interact with our website so we can improve our services. By continuing to use our website, you consent to our use of cookies. You can manage your cookie preferences through your browser settings."
  }
};

export type PolicyType = keyof typeof policies;

export const LegalPages: React.FC = () => {
  const [activePolicy, setActivePolicy] = useState<PolicyType | null>(null);

  useEffect(() => {
    const handleOpenPolicy = (e: CustomEvent<PolicyType>) => setActivePolicy(e.detail);
    window.addEventListener('openPolicy', handleOpenPolicy as EventListener);
    return () => window.removeEventListener('openPolicy', handleOpenPolicy as EventListener);
  }, []);

  return (
    <AnimatePresence>
      {activePolicy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setActivePolicy(null)}
          />

          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            className="relative w-full max-w-2xl bg-[#fdfbf7] rounded-[2rem] shadow-2xl p-10 max-h-[90vh] overflow-y-auto"
          >
            <button 
              onClick={() => setActivePolicy(null)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-white transition-colors border border-black/10"
            >
              <X size={20} className="text-[#1a1a1a]" />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#5A5A40]/10 flex items-center justify-center">
                {policies[activePolicy].icon}
              </div>
              <h2 className="text-3xl font-serif font-bold text-[#1a1a1a]">
                {policies[activePolicy].title}
              </h2>
            </div>

            <div className="prose prose-lg text-[#1a1a1a]/70 leading-relaxed font-serif">
              <p>{policies[activePolicy].content}</p>
            </div>
            
            <div className="mt-12 flex justify-end">
                <button 
                    onClick={() => setActivePolicy(null)}
                    className="px-8 py-3 bg-black/5 rounded-xl font-bold text-[#1a1a1a] hover:bg-black/10 transition-colors"
                >
                    Acknowledge & Close
                </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
