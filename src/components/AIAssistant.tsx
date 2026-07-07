import { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot, User, Trash2, RefreshCw, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('atlantic_ai_chat');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          return parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }));
        } catch (e) {
          console.error(e);
        }
      }
    }
    return [
      {
        id: 'welcome',
        role: 'model',
        text: 'سلام! من مغز هوش مصنوعی و مشاور ارشد سلامت آتلانتیک هستم. 🌿\n\nچطور می‌توانم در زمینه اصلاح مزاج، پاکسازی کبد، رفع غلظت سودا و بلغم، یا انتخاب ادکلن‌های فرکانسی و درمانی به شما کمک کنم؟',
        timestamp: new Date()
      }
    ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('atlantic_ai_chat', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    if (!textToSend) {
      setInput('');
    }

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role: 'user',
      text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      // Build brief context history for the API (last 6 turns)
      const apiHistory = messages
        .filter(m => m.id !== 'welcome')
        .slice(-6)
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: apiHistory
        })
      });

      if (!res.ok) {
        throw new Error('خطایی در برقراری ارتباط با سرور رخ داد.');
      }

      const data = await res.json();
      
      const modelMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'model',
        text: data.text || 'متاسفانه پاسخی دریافت نشد. لطفا مجددا تلاش کنید.',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        role: 'model',
        text: 'پوزش می‌طلبم، در حال حاضر ارتباطم با هسته هوش مصنوعی با مشکل مواجه شده است. لطفاً چند لحظه دیگر امتحان فرمایید یا با پشتیبانی تماس بگیرید. 📞',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('آیا می‌خواهید تاریخچه گفتگو با هوش مصنوعی را پاک کنید؟')) {
      setMessages([
        {
          id: 'welcome',
          role: 'model',
          text: 'سلام! من مغز هوش مصنوعی و دستیار سلامت برند آتلانتیک هستم. 🌿\n\nچطور می‌توانم در زمینه اصلاح مزاج، پاکسازی کبد، رفع غلظت سودا و بلغم، یا انتخاب ادکلن‌های فرکانسی و درمانی به شما کمک کنم؟',
          timestamp: new Date()
        }
      ]);
    }
  };

  const suggestions = [
    'بهترین عطر برای تقویت حافظه چیست؟',
    'برای پاکسازی کبد چرب چه پیشنهادی دارید؟',
    'چگونه می‌توانم طبع و مزاج خودم را بشناسم؟',
    'درباره روغن اکسیر جوانی توضیح بده.'
  ];

  return (
    <div id="ai-assistant-wrapper" className="fixed bottom-6 right-6 z-50 flex flex-col items-start" dir="rtl">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="ai-assistant-card"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="mb-4 bg-lapis-deep/95 dark:bg-lapis-deep/95 border border-gold-ancient/30 rounded-3xl shadow-2xl w-[90vw] sm:w-[380px] h-[520px] flex flex-col backdrop-blur-xl overflow-hidden glass-panel"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-lapis-deep/60 via-gold-ancient/15 to-lapis-deep/60 border-b border-gold-ancient/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gold-ancient/20 text-gold-ancient flex items-center justify-center border border-gold-ancient/30 shadow-inner animate-pulse">
                  <Sparkles size={18} />
                </div>
                <div className="text-right">
                  <h4 className="text-white font-bold text-sm leading-tight flex items-center gap-1.5">
                    <span>مغز هوش مصنوعی آتلانتیک</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold uppercase tracking-wider">آنلاین</span>
                  </h4>
                  <p className="text-[10px] text-gray-300 font-light mt-0.5">مشاوره هوشمند مزاج و رایحه‌درمانی</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={handleClear}
                  className="p-2 text-gray-400 hover:text-red-400 rounded-lg transition-all duration-200 cursor-pointer hover:bg-white/5"
                  title="پاک کردن گفتگو"
                >
                  <Trash2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg transition-all duration-200 cursor-pointer hover:bg-white/5"
                  title="بستن"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gold-ancient">
              {messages.map((msg) => {
                const isModel = msg.role === 'model';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${isModel ? 'justify-start' : 'justify-end'}`}
                  >
                    {isModel && (
                      <div className="w-7 h-7 rounded-lg bg-gold-ancient/10 text-gold-ancient border border-gold-ancient/25 flex items-center justify-center shrink-0 mt-0.5">
                        <Bot size={14} />
                      </div>
                    )}
                    <div
                      className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed whitespace-pre-wrap ${
                        isModel
                          ? 'bg-white/5 border border-white/5 text-gray-200 rounded-tr-none'
                          : 'bg-gold-ancient text-lapis-deep font-semibold rounded-tl-none shadow-md'
                      }`}
                    >
                      {msg.text}
                      <span className={`block text-[9px] mt-1.5 text-left opacity-60 ${isModel ? 'text-gray-400' : 'text-lapis-deep font-light'}`}>
                        {msg.timestamp.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    {!isModel && (
                      <div className="w-7 h-7 rounded-lg bg-gold-ancient/20 text-white border border-gold-ancient/30 flex items-center justify-center shrink-0 mt-0.5">
                        <User size={14} />
                      </div>
                    )}
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-lg bg-gold-ancient/10 text-gold-ancient border border-gold-ancient/25 flex items-center justify-center shrink-0 mt-0.5 animate-spin">
                    <RefreshCw size={14} />
                  </div>
                  <div className="bg-white/5 border border-white/5 text-gray-400 rounded-2xl rounded-tr-none px-4 py-3 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-ancient animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-ancient animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-ancient animate-bounce"></span>
                    <span className="mr-1">هوش مصنوعی آتلانتیک در حال اندیشیدن...</span>
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="space-y-2.5 pt-2">
                  <p className="text-[10px] text-gold-ancient font-semibold text-center mb-1">سوالات پیشنهادی از مشاور هوشمند:</p>
                  <div className="flex flex-col gap-1.5">
                    {suggestions.map((sug, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(sug)}
                        className="text-right text-[11px] text-gray-300 hover:text-gold-ancient bg-white/5 hover:bg-gold-ancient/10 border border-white/5 hover:border-gold-ancient/25 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer font-light"
                      >
                        💡 {sug}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-lapis-deep/80 border-t border-gold-ancient/25 flex flex-col gap-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="مشاوره یا سوال خود را اینجا بپرسید..."
                  className="flex-1 text-xs bg-white/5 border border-gold-ancient/20 focus:border-gold-ancient/60 rounded-xl px-3 py-2.5 text-white outline-none placeholder-gray-500 transition-all"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="p-2.5 bg-gold-ancient hover:bg-gold-ancient/90 text-lapis-deep rounded-xl transition-all duration-200 shadow-md flex items-center justify-center cursor-pointer disabled:opacity-50"
                  disabled={loading || !input.trim()}
                >
                  <Send size={16} className="rotate-180" />
                </button>
              </form>
              <div className="text-[9px] text-gray-500 text-center font-light flex items-center justify-center gap-1">
                <Sparkles size={8} className="text-gold-ancient" />
                <span>بر پایه مدل پرقدرت و رایگان هوش مصنوعی Gemini 3.5 Flash</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        id="ai-assistant-toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-gold-ancient to-amber-500 text-lapis-deep rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group relative border border-white/20 cursor-pointer"
        aria-label="مشاور هوش مصنوعی آتلانتیک"
      >
        <span className="absolute inset-0 rounded-full bg-gold-ancient/30 animate-ping group-hover:animate-none"></span>
        <div className="absolute -top-1 -left-1 w-4 h-4 bg-emerald-500 border-2 border-lapis-deep rounded-full"></div>
        {isOpen ? (
          <X size={22} className="z-10 text-lapis-deep" />
        ) : (
          <div className="z-10 flex flex-col items-center justify-center">
            <Sparkles size={20} className="text-lapis-deep animate-pulse" />
            <span className="text-[7px] font-bold text-lapis-deep leading-none -mt-0.5">هوشمند</span>
          </div>
        )}
      </button>
    </div>
  );
}
