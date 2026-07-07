import { Product } from '../types';
import { Sparkles, ArrowLeft, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onView: (product: Product) => void;
}

export default function ProductCard({ product, onView }: ProductCardProps) {
  return (
    <motion.div
      id={`product-card-${product.id}`}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="glass-panel rounded-2xl overflow-hidden flex flex-col h-full border border-gold-ancient/15 hover:border-gold-ancient/40 shadow-xl transition-all duration-300"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-lapis-deep/50 group">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lapis-deep via-transparent to-transparent opacity-80" />

        {/* Categories/Labels */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-10 items-end">
          <span className="px-2.5 py-1 text-[10px] font-bold bg-lapis-deep/80 border border-turquoise/50 text-turquoise text-sky-300 rounded-full backdrop-blur-md">
            {product.categoryLabel}
          </span>
          {product.isAtlanticExclusive && (
            <span className="px-2.5 py-1 text-[10px] font-bold bg-gold-ancient/90 text-lapis-deep rounded-full flex items-center gap-1 shadow-lg">
              <Sparkles size={10} className="animate-spin" style={{ animationDuration: '4s' }} />
              ساخت اختصاصی آتلانتیک
            </span>
          )}
        </div>
      </div>

      {/* Product Content */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white mb-1 line-clamp-1 hover:text-gold-ancient transition-colors font-serif cursor-pointer" onClick={() => onView(product)}>
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-400 line-clamp-2 leading-relaxed mb-3">
            {product.description}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-1.5 mb-3 text-[10px] text-amber-500/95">
            <Shield size={12} />
            <span>تلفیق سه دانش طب (نوین، سنتی، اسلامی)</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gold-ancient/10">
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block">قیمت مصرف‌کننده</span>
              <span className="text-sm font-bold text-gold-ancient">{product.price}</span>
            </div>

            <button
              id={`view-btn-${product.id}`}
              onClick={() => onView(product)}
              className="px-3.5 py-2 bg-gold-ancient hover:bg-yellow-600 text-lapis-deep font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>جزییات و خرید</span>
              <ArrowLeft size={12} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
