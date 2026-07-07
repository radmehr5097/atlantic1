import { useState, useMemo } from 'react';
import {
  Sparkles,
  Activity,
  Heart,
  Shield,
  ArrowRight,
  MessageSquare,
  MapPin,
  Clock,
  Award,
  Check,
  Compass,
  Waves,
  Milestone,
  Users,
  Search,
  BookOpen,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Droplets,
  Flame,
  ShieldCheck,
  Phone,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Data & Types
import { Product, Perfume, Pack } from './types';
import {
  productsData,
  perfumesData,
  packsData,
  servicesData,
  testimonialsData,
  HERO_IMAGE
} from './data';

// Custom Components
import Header from './components/Header';
import FloatingContact from './components/FloatingContact';
import AIAssistant from './components/AIAssistant';
import GoldParticles from './components/GoldParticles';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import PerfumeCard from './components/PerfumeCard';
import PackCard from './components/PackCard';
import ConsultationForm from './components/ConsultationForm';

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    }
    return 'dark';
  });

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const [productFilter, setProductFilter] = useState<string>('all');
  const [cartCount, setCartCount] = useState<number>(0);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        productFilter === 'all' || product.category === productFilter;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, productFilter]);

  const handleOrderNotification = (itemName: string) => {
    setCartCount((prev) => prev + 1);
    setFeedbackMessage(`سفارش موقت برای "${itemName}" ثبت شد. جهت نهایی‌سازی، لطفاً فرم مشاوره زیر را پر کنید.`);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 6000);

    // Scroll to consultation form
    const formElement = document.getElementById('consultation-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      setActiveTab('contact');
    }
  };

  const handleSearchClick = () => {
    setShowSearchBar(!showSearchBar);
    if (activeTab !== 'products') {
      setActiveTab('products');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col justify-between ${theme === 'light' ? 'theme-light' : 'theme-dark'} bg-lapis-deep text-white selection:bg-gold-ancient selection:text-lapis-deep relative overflow-x-hidden transition-colors duration-300`}>
      
      {/* Background Turquoise Overlay Pattern */}
      <div className="absolute inset-0 turquoise-inlay-bg pointer-events-none z-0"></div>

      {/* Top Advertising Banner */}
      <div 
        id="top-adv-banner"
        dir="rtl" 
        className={`w-full z-30 transition-all duration-300 border-b relative ${
          theme === 'light' 
            ? 'bg-gradient-to-r from-amber-500/10 via-gold-ancient/15 to-amber-500/10 border-gold-ancient/30 text-slate-800' 
            : 'bg-gradient-to-r from-amber-950/40 via-gold-ancient/10 to-amber-950/40 border-gold-ancient/20 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-2.5 md:py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-right">
          <div className="flex items-center gap-2.5 justify-center md:justify-start">
            <span className="p-1 rounded-full bg-gold-ancient/20 text-gold-ancient shrink-0 animate-pulse">
              <Sparkles size={16} />
            </span>
            <p className="text-xs md:text-sm font-medium leading-relaxed">
              این یک طراحی منحصر به فرد برای این لاین کسب وکار هست که <span className="text-gold-ancient font-bold">تصویرتو</span> ارائه می‌دارد. جهت سفارش این سبک سایت و اپلیکیشن...
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a 
              href="tel:09138665345"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-ancient hover:bg-gold-ancient/90 text-lapis-deep text-xs font-bold rounded-lg transition-all shadow-md hover:shadow-lg hover:scale-[1.03] duration-200 cursor-pointer"
            >
              <Phone size={12} className="rotate-[-90deg]" />
              <span>تماس تلفنی</span>
            </a>
            <a 
              href="https://t.me/assreai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0088cc]/15 hover:bg-[#0088cc]/25 border border-[#0088cc]/30 text-[#0088cc] dark:text-[#38bdf8] text-xs font-bold rounded-lg transition-all hover:scale-[1.03] duration-200 cursor-pointer"
            >
              <Send size={12} />
              <span>پی‌وی تلگرام</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSearchClick={handleSearchClick}
        cartCount={cartCount}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Floating Action Button */}
      <FloatingContact />
      <AIAssistant />

      {/* Temporary Notification Banner */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-4 right-4 md:left-auto md:right-8 z-50 max-w-md bg-emerald-600 border border-emerald-500 text-white rounded-2xl p-4 shadow-2xl flex items-start gap-3 backdrop-blur-lg"
          >
            <div className="bg-white/20 p-1.5 rounded-lg shrink-0 mt-0.5">
              <Check size={18} />
            </div>
            <div>
              <p className="text-xs font-bold leading-relaxed">{feedbackMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-grow z-10 relative">
        <AnimatePresence mode="wait">
          
          {/* 1. HOME TAB */}
          {activeTab === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-20 pb-20"
            >
              {/* SECTION 1: HERO */}
              <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-12 px-4 border-b border-gold-ancient/10">
                {/* Gold Canvas particles in bg */}
                <GoldParticles />

                {/* Hero Content Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-20">
                  {/* Text Container */}
                  <div className="lg:col-span-7 text-right space-y-6 order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-ancient/10 border border-gold-ancient/30 text-gold-ancient rounded-full text-xs font-semibold">
                      <Sparkles size={14} className="animate-pulse" />
                      <span>اتصال علم نوین، حکمت باستان و تعالیم اسلامی</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black leading-tight">
                      <span className="block text-white">شکوه سلامتی با</span>
                      <span className="nastaliq-title block text-gold-ancient py-2">برند فاخر آتلانتیک</span>
                    </h2>

                    <p className="text-sm md:text-base text-gray-300 leading-relaxed font-light max-w-2xl">
                      آتلانتیک فراتر از یک محصول، یک سبک زندگی اصیل است. ما تمدن باشکوه و هنر فیروزه‌کوبی اصفهان را با علوم اسرارآمیز و شفابخش آتلانتیس باستان پیوند داده‌ایم تا با هدایت تعالیم پاک اسلامی، محصولاتی لوکس و صددرصد طبیعی برای التیام روح و جسم شما خلق کنیم.
                    </p>

                    <div className="flex flex-wrap gap-4 justify-start sm:justify-start pt-4">
                      <button
                        onClick={() => setActiveTab('products')}
                        className="px-6 py-3.5 bg-gold-ancient hover:bg-yellow-600 text-lapis-deep font-bold text-xs rounded-xl transition-all duration-300 shadow-xl hover:scale-105 cursor-pointer"
                      >
                        مشاهده تالار محصولات
                      </button>
                      <button
                        onClick={() => {
                          const el = document.getElementById('consultation-section');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-gold-ancient/30 text-white font-bold text-xs rounded-xl transition-all duration-300 cursor-pointer"
                      >
                        دریافت مشاوره رایگان
                      </button>
                    </div>

                    {/* Stats or trust values */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gold-ancient/10 max-w-lg">
                      <div className="text-center sm:text-right">
                        <span className="text-xl md:text-2xl font-bold text-gold-ancient block font-serif">۱۹+</span>
                        <span className="text-[10px] text-gray-400">فرمولاسیون انحصاری</span>
                      </div>
                      <div className="text-center sm:text-right">
                        <span className="text-xl md:text-2xl font-bold text-gold-ancient block font-serif">۱۰۰٪</span>
                        <span className="text-[10px] text-gray-400">طبیعی و ارگانیک</span>
                      </div>
                      <div className="text-center sm:text-right">
                        <span className="text-xl md:text-2xl font-bold text-gold-ancient block font-serif">۲۴ ساعته</span>
                        <span className="text-[10px] text-gray-400">پشتیبانی و مشاوره</span>
                      </div>
                    </div>
                  </div>

                  {/* Visual Container */}
                  <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center">
                    <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden border border-gold-ancient/30 shadow-2xl bg-lapis-deep/55 backdrop-blur-lg">
                      <img
                        src={HERO_IMAGE}
                        alt="Atlantic Mystical Banner"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-lapis-deep via-transparent to-transparent opacity-90"></div>
                      <div className="absolute bottom-6 left-6 right-6 text-right">
                        <span className="text-[10px] text-gold-ancient font-semibold uppercase tracking-wider block mb-1">نقشه معنوی خلقت</span>
                        <h4 className="text-base font-bold text-white font-serif">پیوند تمدن اصفهان و اسطوره آتلانتیس</h4>
                        <p className="text-[11px] text-gray-300 leading-relaxed font-light mt-1">تلفیقی عمیق از معماری مسجد شیخ‌لطف‌الله با نمادهای انرژی کائنات.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 2: ABOUT THE FUSION OF THREE SCIENCES */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
                  <div className="inline-flex items-center gap-1.5 bg-turquoise/20 text-turquoise text-sky-300 border border-turquoise/40 px-3 py-1 rounded-full text-[11px] font-semibold">
                    <Compass size={12} />
                    <span>فلسفه وجودی ما</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white font-serif">تلفیق سه بعد از دانش شفابخش</h3>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                    فرمولاسیون‌های آتلانتیک نه به شکل تصادفی، بلکه با تکیه بر همگرایی و تقاطع سه دانش مستقل طراحی شده‌اند تا بیشترین سازگاری را با سلول‌های زنده داشته باشند.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Islamic Teachings */}
                  <div className="glass-panel rounded-2xl p-6 text-right space-y-4 border border-emerald-500/10 hover:border-emerald-500/30 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <span className="text-xl">🕌</span>
                    </div>
                    <h4 className="text-lg font-bold text-white font-serif">۱. تعالیم و طب اسلامی</h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      روایات ناب ائمه اطهار (ع) و آیات شفابخش قرآن سرشار از معرفی میوه‌ها، روغن‌ها و صمغ‌های بهشتی است. ما در این بعد، روی طهارت فرآیند، روزهای مناسب مصرف و هماهنگی با روح متمرکز می‌شویم.
                    </p>
                  </div>

                  {/* Traditional Isfahan Medicine */}
                  <div className="glass-panel rounded-2xl p-6 text-right space-y-4 border border-amber-500/10 hover:border-amber-500/30 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                      <span className="text-xl">🏛️</span>
                    </div>
                    <h4 className="text-lg font-bold text-white font-serif">۲. طب سنتی و کهن اصفهان</h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      دانش بی‌بدیل ابن‌سینا و داروسازی تجربی قرابادین در اصفهان عهد صفوی به اوج رسید. ما اصول اصلاح طبع‌های چهارگانه (دم، صفرا، سودا، بلغم) و دفع سموم کبدی و اخلاط فاسد را از این میراث گرفته‌ایم.
                    </p>
                  </div>

                  {/* Modern Science */}
                  <div className="glass-panel rounded-2xl p-6 text-right space-y-4 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <span className="text-xl">🧪</span>
                    </div>
                    <h4 className="text-lg font-bold text-white font-serif">۳. دانش نوین و آزمایشگاهی</h4>
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      عصاره‌گیری‌های پیشرفته صنعتی، پایداری مواد فعال، تست‌های عدم حساسیت و استانداردهای روز بیوشیمی سلولی. در این بعد، اثربخشی مواد را در مقیاس دانشگاهی و آزمایشگاهی تضمین می‌کنیم.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 3: FEATURED PRODUCTS GRID */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                  <div className="text-right">
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-serif">محصولات ویژه آتلانتیک</h3>
                    <p className="text-xs text-gray-400 mt-1">منتخبی از نوزده محصول انحصاری، ساخته شده با طلا، فیروزه و اکسیرهای شفابخش</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="text-xs font-bold text-gold-ancient hover:text-yellow-500 flex items-center gap-1 bg-gold-ancient/5 border border-gold-ancient/20 px-4 py-2 rounded-xl transition-all cursor-pointer"
                  >
                    <span>مشاهده تمام محصولات</span>
                    <ArrowLeft size={14} />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {productsData.slice(0, 4).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onView={setSelectedProduct}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION 4: THERAPEUTIC COLOGNES */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
                  <h3 className="text-2xl md:text-4xl font-bold text-white font-serif">ادکلن‌های درمانی و فرکانسی</h3>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                    این روایح لوکس، فراتر از عطر، ابزاری قدرتمند برای تنظیم چاکراها، بهبود نوسانات خلقی و پاکسازی هاله انرژی شما هستند که با اسانس‌های ناب فرآوری شده‌اند.
                  </p>
                </div>

                <div className="space-y-8">
                  {perfumesData.slice(0, 2).map((perfume) => (
                    <PerfumeCard
                      key={perfume.id}
                      perfume={perfume}
                      onOrder={() => handleOrderNotification(perfume.name)}
                    />
                  ))}
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={() => setActiveTab('perfumes')}
                    className="px-6 py-3 border border-gold-ancient/30 hover:border-gold-ancient text-gold-ancient font-bold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    مشاهده تمام ادکلن‌های درمانی (۴ ادکلن اختصاصی)
                  </button>
                </div>
              </section>

              {/* SECTION 5: TREATMENT PACKS */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
                  <h3 className="text-2xl md:text-4xl font-bold text-white font-serif">پک‌های درمانی کامل</h3>
                  <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                    پروتکل‌های یکپارچه بهبود بیماری‌های مزمن روحی و جسمی با تضمین کیفیت و همراهی رایگان مشاوران آتلانتیک.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {packsData.map((pack) => (
                    <PackCard
                      key={pack.id}
                      pack={pack}
                      onOrder={() => handleOrderNotification(pack.name)}
                    />
                  ))}
                </div>
              </section>

              {/* SECTION 6: ATLANTIC EPIC STORY */}
              <section className="relative py-20 px-4 overflow-hidden border-y border-gold-ancient/10 bg-gradient-to-b from-black/40 via-lapis-deep to-black/30">
                <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
                  <Waves className="text-gold-ancient mx-auto animate-pulse" size={32} />
                  <h3 className="text-2xl md:text-4xl font-bold text-gold-ancient font-serif">حکایت غریب اصفهان و آتلانتیس</h3>
                  
                  <blockquote className="text-sm md:text-base italic font-light text-gray-200 leading-relaxed max-w-3xl mx-auto relative px-6 md:px-10">
                    «سال‌ها پیش، در دست‌نوشته‌های کهن حکیمی در اصفهان خواندم که اسرار شفا از تمدن افسانه‌ای آتلانتیس، از فراز اقیانوس‌ها عبور کرده و در معماری شگفت‌انگیز گنبد مسجد شیخ‌لطف‌الله تجلی یافته است. گنبدی که فیروزه‌کوبی‌های آن نه فقط برای زیبایی، بلکه هادی امواج انرژی الهی در زمین هستند. ما در آتلانتیک، این امواج گم‌شده را بازآفرینی کرده‌ایم.»
                  </blockquote>

                  <p className="text-xs text-gray-400">حکایت برند آتلانتیک - به روایت جناب مظاهری</p>

                  <div className="pt-4">
                    <button
                      onClick={() => setActiveTab('about')}
                      className="px-5 py-2.5 bg-gold-ancient hover:bg-yellow-600 text-lapis-deep font-bold text-xs rounded-xl transition-all cursor-pointer shadow-lg"
                    >
                      بیشتر بخوانید
                    </button>
                  </div>
                </div>
              </section>

              {/* SECTION 7: CONSULTATION SERVICES LIST */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold text-white font-serif">خدمات مشاوره‌ای آتلانتیک</h3>
                  <p className="text-xs text-gray-400">به پشتوانه تخصص درمانگران اصفهان و علم روز بیوشیمی</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {servicesData.map((service, idx) => (
                    <div
                      key={service.id}
                      className="bg-white/5 border border-white/5 hover:border-gold-ancient/20 p-5 rounded-2xl text-right transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-2xl text-gold-ancient mb-3 block">
                          {idx === 0 && '✨'}
                          {idx === 1 && '🌱'}
                          {idx === 2 && '⚖️'}
                          {idx === 3 && '🩸'}
                          {idx === 4 && '🧠'}
                        </span>
                        <h4 className="text-sm font-bold text-white mb-2">{service.title}</h4>
                        <p className="text-[11px] text-gray-400 leading-relaxed font-light">{service.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          const el = document.getElementById('consultation-section');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-[10px] text-gold-ancient hover:text-white text-right mt-4 flex items-center justify-end gap-1 font-semibold cursor-pointer"
                      >
                        <span>ثبت نوبت</span>
                        <ArrowLeft size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 8: CLIENT TESTIMONIALS */}
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-gradient-to-l from-turquoise/20 to-transparent p-8 rounded-3xl border border-turquoise/20">
                <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
                  <h3 className="text-2xl font-bold text-white font-serif">گواهی و نظرات همراهان آتلانتیک</h3>
                  <p className="text-xs text-gray-400">رضایت مکتوب پزشکان، استادان و خریداران گرامی آتلانتیک</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonialsData.slice(0, 3).map((item) => (
                    <div
                      key={item.id}
                      className="bg-lapis-deep/80 border border-gold-ancient/15 rounded-2xl p-5 text-right flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-1 justify-end text-gold-ancient mb-3">
                          {[...Array(item.rating)].map((_, i) => (
                            <span key={i}>★</span>
                          ))}
                        </div>
                        <p className="text-xs text-gray-200 leading-relaxed font-light mb-4 italic">
                          «{item.comment}»
                        </p>
                      </div>
                      <div className="border-t border-white/5 pt-3 flex items-center justify-between">
                        <span className="text-[10px] text-turquoise text-sky-300 font-semibold">تأییدشده</span>
                        <div className="text-right">
                          <h5 className="text-xs font-bold text-white">{item.userName}</h5>
                          <span className="text-[9px] text-gray-400 block mt-0.5">{item.userRole}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 9: INTEGRATED CONSULTATION FORM SECTION */}
              <section id="consultation-section" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <ConsultationForm />
              </section>

            </motion.div>
          )}

          {/* 2. PRODUCTS TAB */}
          {activeTab === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10"
            >
              {/* Header section */}
              <div className="text-right space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold font-serif text-white">
                  تالار لوکس محصولات آتلانتیک
                </h2>
                <p className="text-xs md:text-sm text-gray-400 max-w-3xl">
                  در این بخش می‌توانید تمام نوزده شاهکار درمانی ما را مشاهده کنید. با استفاده از دسته‌بندی‌ها زیر فیلتر کنید و برای بررسی عمیق فرمولاسیون روی هرکدام کلیک نمایید.
                </p>
              </div>

              {/* Filters & Search Toolbar */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl backdrop-blur-md">
                
                {/* Search Bar */}
                <div className="relative w-full md:w-80">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="جستجو در محصولات، ترکیبات..."
                    className="w-full px-4 py-2.5 pr-10 bg-lapis-deep border border-gold-ancient/25 focus:border-gold-ancient outline-none text-xs rounded-xl text-right"
                  />
                  <Search size={14} className="absolute top-3.5 right-3.5 text-gold-ancient" />
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap gap-1.5 justify-center md:justify-end w-full md:w-auto">
                  {[
                    { id: 'all', label: 'همه دسته‌بندی‌ها' },
                    { id: 'rejuvenator', label: 'جوانسازها' },
                    { id: 'skin', label: 'مراقبت پوست' },
                    { id: 'hair', label: 'مراقبت مو' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setProductFilter(cat.id)}
                      className={`px-3 py-1.5 text-[11px] font-semibold rounded-xl transition-all duration-300 cursor-pointer ${
                        productFilter === cat.id
                          ? 'bg-gold-ancient text-lapis-deep font-bold shadow'
                          : 'bg-white/5 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Products Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-white/5 rounded-3xl">
                  <p className="text-sm text-gray-400 font-serif">هیچ محصولی با مشخصات جستجو شده یافت نشد.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setProductFilter('all');
                    }}
                    className="mt-4 px-4 py-2 bg-gold-ancient/10 text-gold-ancient border border-gold-ancient/30 rounded-xl text-xs"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onView={setSelectedProduct}
                    />
                  ))}
                </div>
              )}

              {/* Integrated Notice in products page */}
              <div className="bg-gold-ancient/5 border border-gold-ancient/15 rounded-3xl p-6 text-right max-w-4xl mx-auto">
                <h4 className="text-sm font-bold text-gold-ancient mb-2 flex items-center justify-end gap-1.5 font-serif">
                  <span>سفارش محصولات اختصاصی و ساخت سفارشی</span>
                  <Sparkles size={14} />
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  علاوه بر محصولات بالا، جناب مظاهری و اطبای آتلانتیک قادرند داروها و کرم‌های اختصاصی متناسب با نوع مزاج شما به صورت دست‌ساز در آزمایشگاه آتلانتیک سنتز نمایند. جهت هماهنگی و مشاوره، فرم تماس را تکمیل کنید.
                </p>
              </div>
            </motion.div>
          )}

          {/* 3. PERFUMES TAB */}
          {activeTab === 'perfumes' && (
            <motion.div
              key="perfumes"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12"
            >
              {/* Header */}
              <div className="text-right space-y-4 max-w-3xl ml-auto">
                <h2 className="text-2xl md:text-4xl font-bold font-serif text-white">
                  ادکلن‌های درمانی و فرکانسی کائنات
                </h2>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  روایح ملکوتی آتلانتیک با فعال‌سازی پیام‌رسان‌های بویایی به دستگاه لیمبیک مغز سیگنال می‌فرستند تا فرکانس خستگی، سودای سرد، استرس شدید را خنثی کرده و هاله بیومغناطیسی شما را تقویت کنند.
                </p>
              </div>

              {/* The 4 Perfumes cards */}
              <div className="space-y-8">
                {perfumesData.map((perfume) => (
                  <PerfumeCard
                    key={perfume.id}
                    perfume={perfume}
                    onOrder={() => handleOrderNotification(perfume.name)}
                  />
                ))}
              </div>

              {/* Instructions and cosmos properties explanations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/5 p-6 rounded-3xl border border-white/5">
                <div className="text-right space-y-3">
                  <h4 className="text-sm font-bold text-gold-ancient font-serif">چرا رایحه‌درمانی با عطر آتلانتیک؟</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    مولکول‌های اسانسی عطر آتلانتیک کاملاً طبیعی، حلال و پاک هستند و فاقد ترکیبات سرطان‌زای صنعتی و نگهدارنده‌های شیمیایی مخل سیستم غدد درون‌ریز می‌باشند. به همین جهت، مداومت بر آنها سیستم عصبی پاراسمپاتیک را بیدار می‌کند.
                  </p>
                </div>
                <div className="text-right space-y-3">
                  <h4 className="text-sm font-bold text-gold-ancient font-serif">روزهای طالع و مصرف</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-light">
                    طالع‌بینی طبی و نجومی در طب باستان اهمیت خاصی دارد. بر همین اساس، روزهای معینی (مثل شنبه، جمعه و چهارشنبه) برای شروع و تداوم مصرف ادکلن‌ها در نظر گرفته شده است تا همگرایی فرکانسی روح و ستارگان طالع بیمار به حداکثر برسد.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4. PACKS TAB */}
          {activeTab === 'packs' && (
            <motion.div
              key="packs"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12"
            >
              {/* Header */}
              <div className="text-right space-y-4 max-w-3xl ml-auto">
                <h2 className="text-2xl md:text-4xl font-bold font-serif text-white">
                  پک‌های درمانی تخصصی و چندبعدی
                </h2>
                <p className="text-xs md:text-sm text-gray-400 leading-relaxed">
                  ما ریشه بیماری‌ها را نه به صورت موضعی، بلکه به صورت سیستمیک از طریق اصلاح کبد و مغز برطرف می‌کنیم. این پک‌ها حاوی روغن‌ها، شربت‌ها و ادکلن‌های هماهنگ با مزاج هستند.
                </p>
              </div>

              {/* The 3 Packs cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {packsData.map((pack) => (
                  <PackCard
                    key={pack.id}
                    pack={pack}
                    onOrder={() => handleOrderNotification(pack.name)}
                  />
                ))}
              </div>

              {/* Guarantee Block */}
              <div className="bg-emerald-950/20 border border-emerald-500/20 p-8 rounded-3xl text-center max-w-3xl mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mx-auto border border-emerald-500/30">
                  <Award size={24} />
                </div>
                <h4 className="text-lg font-bold text-white font-serif">تضمین ۱۰۰٪ طلایی بازگشت وجه</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-light max-w-2xl mx-auto">
                  تیم آتلانتیک به قدری به کیفیت و اثربخشی فرمولاسیون‌های درمانی خود ایمان دارد که اعلام می‌دارد در صورت عدم رضایت یا عدم بهبودی پس از طی دوره کامل درمانی و مشاوره‌ای، تمام هزینه پرداختی شما بدون قید و شرط عودت داده خواهد شد.
                </p>
              </div>
            </motion.div>
          )}

          {/* 5. ABOUT TAB */}
          {activeTab === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-12 text-right"
            >
              <div className="space-y-4">
                <h2 className="text-2xl md:text-4xl font-bold font-serif text-white">
                  حکایت آتلانتیک: از زاینده‌رود تا جزیره گم‌شده
                </h2>
                <p className="text-xs text-gold-ancient font-semibold">بنیان‌گذاری شده توسط مظاهری و اطبای برجسته اصفهان</p>
              </div>

              <div className="space-y-6 text-sm text-gray-200 leading-relaxed font-light">
                <p>
                  برند <strong>آتلانتیک</strong> از اندیشه یک پیوند بزرگ زاده شد. هنر فیروزه‌کوبی اصفهان، یکی از شگفت‌انگیزترین صنایع دستی جهان است. اما در متون باستانی اصفهان و نسخ داروسازی سنتی ما، فیروزه فقط برای تزیین نیست؛ فیروزه به عنوان سنگ بهشتی دارای انرژی تسکین‌دهنده جریان بلغم و سودا در عروق است.
                </p>
                <p>
                  ما دریافتیم که علوم فرکانسی باستان در مجمع‌الجزایر افسانه‌ای آتلانتیس نیز به فیروزه و کریستال‌ها اهمیت ویژه‌ای می‌دادند. این تقارن الهام‌بخش ایده بزرگی شد: ایجاد برندی که بتواند با بهره‌گیری از تکنولوژی بیوشیمی نوین، روغن‌ها، ادکلن‌ها و کرم‌های درمانی ارگانیکی تولید کند که نه تنها جسم، بلکه ارواح حیوانی و نفسانی انسان را شفا ببخشد.
                </p>
                
                <h3 className="text-lg font-bold text-gold-ancient font-serif pt-4">سه اصل حاکم بر کارگاه آتلانتیک:</h3>
                <ul className="space-y-3 pr-2">
                  <li className="flex items-start gap-2.5 justify-end">
                    <span>تضمین اصالت مواد خام: از عسل ارگانیک کوهستان تا صمغ‌های وارداتی یمن و هندوستان.</span>
                    <span className="text-gold-ancient shrink-0 mt-1">✔</span>
                  </li>
                  <li className="flex items-start gap-2.5 justify-end">
                    <span>طهارت و بهداشت فرآیند: تولید مستقیم تحت شرایط آزمایشگاهی مجاز با رعایت آداب طب اسلامی.</span>
                    <span className="text-gold-ancient shrink-0 mt-1">✔</span>
                  </li>
                  <li className="flex items-start gap-2.5 justify-end">
                    <span>همراهی درمانگر: ما شما را پس از خرید رها نمی‌کنیم؛ ۵ جلسه مشاوره رایگان ضمیمه هر پک درمانی است.</span>
                    <span className="text-gold-ancient shrink-0 mt-1">✔</span>
                  </li>
                </ul>

                <div className="p-5 bg-white/5 border border-white/5 rounded-2xl mt-6 text-center">
                  <p className="text-xs text-gray-400 italic">
                    «هدف ما بازگرداندن تعادل مفقود به انسان معاصر است، تلفیقی لوکس از هنر، علم و معنویت.»
                  </p>
                  <p className="text-[10px] text-gold-ancient font-bold mt-2">— مهندس علیرضا مظاهری، بنیان‌گذار برند آتلانتیک</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* 6. CONTACT TAB */}
          {activeTab === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12"
            >
              {/* Header */}
              <div className="text-right space-y-4 max-w-3xl ml-auto">
                <h2 className="text-2xl md:text-4xl font-bold font-serif text-white">
                  تماس با دفتر مرکزی آتلانتیک اصفهان
                </h2>
                <p className="text-xs md:text-sm text-gray-400">
                  جهت مراجعه حضوری، دریافت نمایندگی، و یا ارتباط با بخش مدیریت تولید جناب مظاهری می‌توانید از روش‌های زیر اقدام فرمایید.
                </p>
              </div>

              {/* Grid Contact Details and Form */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Contact Info (Lapis Panel) */}
                <div className="lg:col-span-5 bg-white/5 border border-white/5 p-6 rounded-3xl space-y-6 text-right">
                  <h3 className="text-lg font-bold text-gold-ancient font-serif border-b border-white/5 pb-3">اطلاعات ارتباطی</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 justify-end">
                      <div>
                        <h4 className="text-xs font-bold text-white">دفتر مرکزی و آزمایشگاه تولید</h4>
                        <p className="text-xs text-gray-300 font-light mt-0.5 leading-relaxed">اصفهان، خیابان مرداویج، مجتمع تجاری آتلانتیک، طبقه دوم</p>
                      </div>
                      <span className="text-lg">📍</span>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div>
                        <h4 className="text-xs font-bold text-white">تلفن‌های تماس مستقیم</h4>
                        <p className="text-xs text-gray-300 font-light mt-0.5 select-all" dir="ltr">۰۹۱۳-۸۱۲-۸۴۲۴</p>
                        <p className="text-xs text-gray-300 font-light mt-0.5 select-all" dir="ltr">۰۳۱-۳۶۶-۴۸۴۲۴</p>
                      </div>
                      <span className="text-lg">📞</span>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div>
                        <h4 className="text-xs font-bold text-white">روبیکا، تلگرام و شبکه‌های اجتماعی</h4>
                        <p className="text-xs text-gray-300 font-light mt-0.5 select-all" dir="ltr">@Islamic_medical_of_ATLANTIC</p>
                      </div>
                      <span className="text-lg">💬</span>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div>
                        <h4 className="text-xs font-bold text-white">ساعات پاسخگویی و پذیرش</h4>
                        <p className="text-xs text-gray-300 font-light mt-0.5">شنبه الی پنجشنبه: ۸:۰۰ صبح الی ۲۰:۰۰ شب</p>
                        <p className="text-xs text-emerald-400 font-light mt-0.5">روزهای جمعه مخصصوص فرآوری ادکلن موعود(عج) و تعطیل است.</p>
                      </div>
                      <span className="text-lg">⏰</span>
                    </div>
                  </div>

                  {/* Graphic Representation of Isfahan area map (Simulated styled SVG) */}
                  <div className="rounded-2xl overflow-hidden h-44 relative border border-gold-ancient/15">
                    <div className="absolute inset-0 bg-lapis-deep flex flex-col items-center justify-center p-4 text-center">
                      <span className="text-3xl mb-1">🗺️</span>
                      <h5 className="text-xs font-bold text-gold-ancient">نمای شبیه‌سازی‌شده نقشه اصفهان</h5>
                      <p className="text-[10px] text-gray-400 mt-1">خیابان مرداویج، میدان برج، ساختمان پزشکان آتلانتیک</p>
                      <span className="text-[9px] bg-gold-ancient/10 border border-gold-ancient/20 px-2 py-0.5 text-gold-ancient rounded mt-2">موقعیت دقیق در نقشه</span>
                    </div>
                  </div>
                </div>

                {/* Consultation form inside tab */}
                <div className="lg:col-span-7">
                  <ConsultationForm />
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onOrder={() => handleOrderNotification(selectedProduct.name)}
          />
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="bg-black/45 border-t border-gold-ancient/15 py-12 px-4 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1: Brand details */}
          <div className="md:col-span-5 text-right space-y-4">
            <div className="flex items-center gap-2 justify-end">
              <h2 className="text-xl font-bold text-white font-serif tracking-wide text-gold-gradient-text">آتلانتیک (ATLANTIC)</h2>
              <div className="w-6 h-6 rounded-full bg-gold-ancient/20 border border-gold-ancient/40 flex items-center justify-center text-[10px] text-gold-ancient">A</div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-light">
              آتلانتیک اولین برند فاخر فرکانسی و تلفیقی ایران است که با تلفیق اسرار شفا از تمدن‌های کهن اصفهان و آتلانتیس و علوم نوین زیست‌شناسی، در جهت شفای همه‌جانبه روح و جسم مومنین گام برمی‌دارد.
            </p>
            <p className="text-[10px] text-gray-400">© ۱۴۰۵ تمامی حقوق معنوی و مادی فرمولاسیون‌ها برای برند آتلانتیک محفوظ است.</p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="md:col-span-3 text-right space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-gold-ancient font-bold font-serif">دسترسی سریع</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button onClick={() => setActiveTab('home')} className="text-right text-gray-300 hover:text-white cursor-pointer">خانه</button>
              <button onClick={() => setActiveTab('products')} className="text-right text-gray-300 hover:text-white cursor-pointer">محصولات ویژه</button>
              <button onClick={() => setActiveTab('perfumes')} className="text-right text-gray-300 hover:text-white cursor-pointer">ادکلن‌های درمانی</button>
              <button onClick={() => setActiveTab('packs')} className="text-right text-gray-300 hover:text-white cursor-pointer">پک‌های درمانی</button>
              <button onClick={() => setActiveTab('about')} className="text-right text-gray-300 hover:text-white cursor-pointer">داستان برند</button>
              <button onClick={() => setActiveTab('contact')} className="text-right text-gray-300 hover:text-white cursor-pointer">مشاوره رایگان</button>
            </div>
          </div>

          {/* Col 3: Contact info */}
          <div className="md:col-span-4 text-right space-y-4">
            <h4 className="text-xs uppercase tracking-wider text-gold-ancient font-bold font-serif">ارتباط با آتلانتیک</h4>
            <div className="space-y-2 text-xs text-gray-300 font-light">
              <p className="flex items-center justify-end gap-2">
                <span>۰۹۱۳۸۱۲۸۴۲۴ / ۰۳۱۳۶۶۴۸۴۲۴</span>
                <span>📞</span>
              </p>
              <p className="flex items-center justify-end gap-2">
                <span className="select-all">@Islamic_medical_of_ATLANTIC</span>
                <span>💬</span>
              </p>
              <p className="flex items-center justify-end gap-2">
                <span>اصفهان، مرداویج، مجتمع تجاری آتلانتیک</span>
                <span>📍</span>
              </p>
            </div>
            <div className="pt-2">
              <span className="text-[10px] font-bold text-gold-ancient bg-gold-ancient/10 border border-gold-ancient/20 px-3 py-1.5 rounded-lg">
                مدیریت کل: جناب مظاهری
              </span>
            </div>
          </div>

        </div>

        {/* Design Credit & Creator Contact Section */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-gold-ancient/10 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-right" dir="rtl">
          <div className="flex items-center gap-2 justify-center md:justify-start">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <p className="text-xs text-gray-300 font-light">
              حق این طراحی محفوظ به <span className="text-gold-ancient font-semibold">تصویرتو</span> هست
            </p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-[11px] text-gray-400 font-light">سفارش این سبک سایت و اپلیکیشن:</span>
            <a 
              href="tel:09138665345"
              className="flex items-center gap-1.5 px-3 py-1 bg-gold-ancient/10 hover:bg-gold-ancient/25 border border-gold-ancient/25 text-gold-ancient text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer"
            >
              <Phone size={11} className="rotate-[-90deg]" />
              <span>۰۹۱۳۸۶۶۵۳۴۵</span>
            </a>
            <a 
              href="https://t.me/assreai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 bg-[#0088cc]/10 hover:bg-[#0088cc]/20 border border-[#0088cc]/20 text-[#0088cc] dark:text-[#38bdf8] text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer"
            >
              <Send size={11} />
              <span>assreai@</span>
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
