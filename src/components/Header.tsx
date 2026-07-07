import { Search, ShoppingBag, Menu, X, Sparkles, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSearchClick: () => void;
  cartCount: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export default function Header({ activeTab, setActiveTab, onSearchClick, cartCount, theme, toggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'خانه' },
    { id: 'products', label: 'محصولات ویژه' },
    { id: 'perfumes', label: 'ادکلن‌های درمانی' },
    { id: 'packs', label: 'پک‌های درمانی' },
    { id: 'about', label: 'حکایت آتلانتیک' },
    { id: 'contact', label: 'تماس و مشاوره' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-lapis-deep/65 backdrop-blur-xl border-b border-gold-ancient/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Right Side: Logo & Brand Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-ancient to-turquoise/80 flex items-center justify-center border border-gold-ancient/40 relative shadow-lg group">
              <span className="text-white font-bold text-sm select-none">A</span>
              <div className="absolute inset-0 rounded-full bg-gold-ancient/20 animate-ping group-hover:animate-none"></div>
            </div>
            <div className="text-right">
              <h1 className="text-lg font-black tracking-wider text-white font-serif flex items-center gap-1">
                <span className="text-gold-ancient">آتلانتیک</span>
                <span className="text-[10px] font-sans text-gray-400 font-light hidden sm:inline">ATLANTIC</span>
              </h1>
              <p className="text-[9px] text-gray-300 font-light tracking-tight">تلفیق دانش روز، علوم باستانی و تعالیم اسلامی</p>
            </div>
          </div>

          {/* Center: Navigation Menu (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {menuItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-300 cursor-pointer ${
                    isActive ? 'text-gold-ancient font-bold' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-2 right-2 h-[2px] bg-gold-ancient rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Left Side: Search, Cart, Mobile Toggle */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2.5 bg-white/5 hover:bg-gold-ancient/15 hover:text-gold-ancient text-gray-300 rounded-xl transition-all duration-300 cursor-pointer border border-white/5"
              aria-label={theme === 'dark' ? 'تم روشن' : 'تم تاریک'}
              title={theme === 'dark' ? 'تغییر به تم روشن' : 'تغییر به تم تاریک'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Search Button */}
            <button
              onClick={onSearchClick}
              className="p-2.5 bg-white/5 hover:bg-gold-ancient/15 hover:text-gold-ancient text-gray-300 rounded-xl transition-all duration-300 cursor-pointer border border-white/5"
              aria-label="جستجو"
            >
              <Search size={18} />
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setActiveTab('products')}
              className="p-2.5 bg-white/5 hover:bg-gold-ancient/15 hover:text-gold-ancient text-gray-300 rounded-xl transition-all duration-300 cursor-pointer border border-white/5 relative"
              aria-label="سبد خرید"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-gold-ancient text-lapis-deep text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-lapis-deep">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 bg-white/5 text-gray-300 rounded-xl hover:text-white cursor-pointer border border-white/5"
              aria-label="منو"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gold-ancient/10 bg-lapis-deep"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-right px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-300 flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-gold-ancient/10 text-gold-ancient font-bold border-r-2 border-gold-ancient'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Sparkles size={12} className="text-gold-ancient animate-pulse" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
