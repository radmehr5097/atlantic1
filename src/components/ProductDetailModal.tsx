import { Product } from '../types';
import { X, Sparkles, BookOpen, ShieldCheck, Heart, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
  onOrder: () => void;
}

export default function ProductDetailModal({ product, onClose, onOrder }: ProductDetailModalProps) {
  return (
    <div id={`product-detail-modal-overlay-${product.id}`} className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Background overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-lapis-deep/80 backdrop-blur-md"
      />

      {/* Modal Container */}
      <motion.div
        id="product-detail-modal-container"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="relative bg-lapis-deep/95 border border-gold-ancient/30 rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col backdrop-blur-2xl"
      >
        {/* Close Button */}
        <button
          id="modal-close-btn"
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-black/30 hover:bg-gold-ancient hover:text-lapis-deep text-white rounded-full transition-all duration-300 z-20 cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="overflow-y-auto flex-grow p-6 md:p-8 space-y-8">
          {/* Main Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Image & Badges */}
            <div className="relative rounded-2xl overflow-hidden aspect-square border border-gold-ancient/15 bg-black/20">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-lapis-deep/90 via-transparent to-transparent" />

              <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 items-end">
                <span className="px-3 py-1 bg-lapis-deep text-gold-ancient border border-gold-ancient/30 text-xs font-bold rounded-full backdrop-blur-md">
                  {product.categoryLabel}
                </span>
                {product.isAtlanticExclusive && (
                  <span className="px-3 py-1 bg-gold-ancient text-lapis-deep text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                    <Sparkles size={12} className="animate-pulse" />
                    ساخت اختصاصی آتلانتیک
                  </span>
                )}
              </div>

              {product.volume && (
                <div className="absolute bottom-4 right-4 bg-black/40 text-gray-200 text-xs px-2.5 py-1 rounded-md backdrop-blur-sm">
                  حجم: {product.volume}
                </div>
              )}
            </div>

            {/* Title, Price, Description, Ingredients */}
            <div className="space-y-4 text-right">
              <h2 className="text-2xl md:text-3xl font-bold text-white font-serif tracking-tight border-b border-gold-ancient/25 pb-3">
                {product.name}
              </h2>

              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {product.description}
              </p>

              {/* Price Row */}
              <div className="flex items-center justify-between bg-gold-ancient/5 border border-gold-ancient/20 rounded-xl p-4 my-3">
                <span className="text-xs text-gray-400">قیمت نهایی محصول</span>
                <span className="text-xl font-black text-gold-ancient">{product.price}</span>
              </div>

              {/* Key Ingredients */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gold-ancient flex items-center gap-1.5 justify-end">
                  <span>ترکیبات اصلی و فعال</span>
                  <BookOpen size={14} />
                </h4>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {product.ingredients.map((ing, i) => (
                    <span key={i} className="bg-turquoise/30 border border-turquoise/50 text-[11px] text-sky-200 px-2.5 py-1 rounded-md">
                      {ing}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notice */}
              <p className="text-[10px] text-amber-500/80 bg-amber-500/5 p-2 rounded border border-amber-500/10 text-center">
                ⚠️ توجه: بسته‌بندی نهایی محصولات ممکن است در جهت ارتقای هویت لوکس برند با تغییرات روبرو گردد.
              </p>
            </div>
          </div>

          {/* Fusion of Three Sciences (تلفیق سه دانش) */}
          <div className="space-y-4">
            <div className="text-center">
              <div className="inline-flex items-center gap-1.5 bg-gold-ancient/10 text-gold-ancient border border-gold-ancient/30 px-3.5 py-1.5 rounded-full text-xs font-bold">
                <ShieldCheck size={14} className="animate-pulse" />
                <span>فرمولاسیون سه‌بعدی: تلفیق سه فیلد دانش طب</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Modern Science */}
              <div className="bg-slate-900/40 border border-slate-700/30 rounded-2xl p-4 text-right space-y-2">
                <div className="flex items-center gap-2 justify-end text-cyan-400">
                  <span className="text-xs font-bold">🧪 طب نوین و آزمایشگاهی</span>
                  <span className="text-sm">🔬</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  {product.modernSci}
                </p>
              </div>

              {/* Traditional Isfahan Science */}
              <div className="bg-amber-950/20 border border-amber-800/20 rounded-2xl p-4 text-right space-y-2">
                <div className="flex items-center gap-2 justify-end text-amber-500">
                  <span className="text-xs font-bold">🏛️ طب سنتی و کهن اصفهان</span>
                  <span className="text-sm">🕌</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  {product.traditionalSci}
                </p>
              </div>

              {/* Islamic teachings */}
              <div className="bg-emerald-950/20 border border-emerald-800/20 rounded-2xl p-4 text-right space-y-2">
                <div className="flex items-center gap-2 justify-end text-emerald-400">
                  <span className="text-xs font-bold">🕌 علوم و تعالیم اسلامی</span>
                  <span className="text-sm">✦</span>
                </div>
                <p className="text-xs text-gray-300 leading-relaxed font-light">
                  {product.islamicSci}
                </p>
              </div>
            </div>
          </div>

          {/* Usage Method */}
          <div className="bg-lapis-deep border border-gold-ancient/15 rounded-2xl p-5 text-right space-y-2">
            <h4 className="text-xs font-bold text-gold-ancient flex items-center gap-1.5 justify-end">
              <span>دستور و روش مصرف درمانی</span>
              <Heart size={14} />
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              {product.usage}
            </p>
          </div>
        </div>

        {/* Modal Footer with Actions */}
        <div className="border-t border-gold-ancient/20 bg-black/40 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-right">
            <span className="text-[10px] text-gray-400 block">ارزش این شاهکار طبیعی</span>
            <span className="text-xl font-extrabold text-gold-ancient">{product.price}</span>
          </div>

          <div className="flex gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-3 border border-gold-ancient/20 hover:border-gold-ancient text-gold-ancient hover:bg-gold-ancient/5 font-semibold text-xs rounded-xl transition-all duration-300 cursor-pointer"
            >
              بازگشت
            </button>
            <button
              onClick={() => {
                onClose();
                onOrder();
              }}
              className="flex-1 sm:flex-none px-6 py-3 bg-gold-ancient hover:bg-yellow-600 text-lapis-deep font-bold text-xs rounded-xl flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
            >
              <ShoppingBag size={14} />
              <span>سفارش و ثبت مشاوره</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
