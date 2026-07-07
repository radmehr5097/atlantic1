import { useState } from 'react';
import { Phone, MessageSquare, Send, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      name: 'روبیکا و تلگرام',
      value: '@Islamic_medical_of_ATLANTIC',
      link: 'https://t.me/Islamic_medical_of_ATLANTIC',
      icon: Send,
      color: 'bg-indigo-600 hover:bg-indigo-700',
    },
    {
      name: 'واتساپ آتلانتیک',
      value: 'ارسال پیام در واتساپ',
      link: 'https://wa.me/989138128424',
      icon: MessageSquare,
      color: 'bg-emerald-600 hover:bg-emerald-700',
    },
    {
      name: 'تماس مستقیم تلفنی',
      value: '۰۹۱۳۸۱۲۸۴۲۴',
      link: 'tel:09138128424',
      icon: Phone,
      color: 'bg-gold-ancient hover:bg-yellow-600 text-lapis-deep font-bold',
    },
  ];

  return (
    <div id="floating-contact-container" className="fixed bottom-6 left-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="floating-contact-menu"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 bg-lapis-deep/95 border border-gold-ancient/30 rounded-2xl p-4 shadow-2xl w-72 backdrop-blur-xl"
          >
            <h4 className="text-gold-ancient font-bold text-sm mb-3 text-right border-b border-gold-ancient/20 pb-2">
              ارتباط مستقیم با مشاورین آتلانتیک
            </h4>
            <div className="space-y-3">
              {contactOptions.map((opt, i) => {
                const IconComp = opt.icon;
                return (
                  <a
                    key={i}
                    href={opt.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 text-white ${opt.color} group shadow-lg`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="bg-black/25 p-1.5 rounded-lg text-white">
                        <IconComp size={16} />
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold">{opt.name}</p>
                        <p className="text-[10px] opacity-80">{opt.value}</p>
                      </div>
                    </div>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>
            <p className="text-[10px] text-gray-400 text-center mt-3">
              ساعت پاسخگویی: ۸ صبح الی ۸ شب
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        id="floating-contact-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gold-ancient text-lapis-deep rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group relative border border-white/20 cursor-pointer"
        aria-label="تماس با ما"
      >
        <span className="absolute inset-0 rounded-full bg-gold-ancient/30 animate-ping group-hover:animate-none"></span>
        {isOpen ? (
          <X size={24} className="z-10 text-lapis-deep" />
        ) : (
          <Phone size={24} className="z-10 animate-pulse text-lapis-deep" />
        )}
      </button>
    </div>
  );
}
