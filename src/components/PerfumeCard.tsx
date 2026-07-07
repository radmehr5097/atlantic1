import { Perfume } from '../types';
import { Calendar, Droplets, Sparkles, Flame, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface PerfumeCardProps {
  key?: string;
  perfume: Perfume;
  onOrder: () => void;
}

export default function PerfumeCard({ perfume, onOrder }: PerfumeCardProps) {
  return (
    <motion.div
      id={`perfume-card-${perfume.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-panel rounded-3xl overflow-hidden border border-gold-ancient/20 hover:border-gold-ancient/40 shadow-2xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
    >
      {/* Visual / Image Side */}
      <div className="lg:col-span-5 relative aspect-square lg:aspect-auto overflow-hidden bg-gradient-to-br from-lapis-deep to-turquoise/40 min-h-[300px] flex items-center justify-center p-8 group">
        <div className="absolute inset-0 bg-radial-gradient from-gold-ancient/5 via-transparent to-transparent opacity-60 z-0"></div>
        <img
          src={perfume.image}
          alt={perfume.name}
          referrerPolicy="no-referrer"
          className="w-full max-w-[240px] h-auto object-contain z-10 drop-shadow-[0_0_25px_rgba(201,162,39,0.3)] group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute bottom-4 right-4 bg-black/40 text-gold-ancient text-xs px-3.5 py-1.5 rounded-full border border-gold-ancient/20 backdrop-blur-md font-bold z-10 flex items-center gap-1.5">
          <Droplets size={12} />
          <span>حجم: {perfume.volume}</span>
        </div>
      </div>

      {/* Content Side */}
      <div className="lg:col-span-7 p-6 md:p-8 flex flex-col justify-between text-right space-y-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gold-ancient/15 pb-4">
            <h3 className="text-xl md:text-2xl font-bold text-white font-serif">
              {perfume.name}
            </h3>
            <span className="px-3 py-1 bg-gold-ancient/10 text-gold-ancient border border-gold-ancient/25 text-xs font-semibold rounded-full flex items-center gap-1.5">
              <Calendar size={12} />
              روز شروع مصرف: {perfume.startDay}
            </span>
          </div>

          {/* Cosmic Properties */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gold-ancient flex items-center gap-1.5 justify-end">
              <span>خواص کیهانی و فرکانسی</span>
              <Sparkles size={14} className="text-amber-500" />
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-right">
              {perfume.cosmicProperties.map((prop, i) => (
                <div key={i} className="flex items-start gap-2 justify-end text-xs text-gray-300">
                  <span className="leading-relaxed">{prop}</span>
                  <CheckCircle2 size={14} className="text-turquoise text-sky-400 shrink-0 mt-0.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Base Ingredients / Essence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-lapis-deep/60 p-3 rounded-xl border border-turquoise/20">
              <h5 className="text-[11px] font-bold text-turquoise text-sky-300 mb-1.5 flex items-center gap-1 justify-end">
                <span>اسانس اختصاصی آتلانتیک</span>
                <Sparkles size={11} />
              </h5>
              <p className="text-[11px] text-gray-300 leading-relaxed font-light">
                {perfume.exclusiveEssence}
              </p>
            </div>

            <div className="bg-lapis-deep/60 p-3 rounded-xl border border-turquoise/20">
              <h5 className="text-[11px] font-bold text-turquoise text-sky-300 mb-1.5 flex items-center gap-1 justify-end">
                <span>ترکیبات پایه و طبیعی</span>
                <Flame size={11} />
              </h5>
              <div className="flex flex-wrap gap-1 justify-end">
                {perfume.ingredientsBase.map((ing, i) => (
                  <span key={i} className="text-[9px] bg-black/25 text-gray-300 px-1.5 py-0.5 rounded border border-gray-700/50">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Method */}
          <div className="bg-gold-ancient/5 p-3 rounded-xl border border-gold-ancient/10">
            <p className="text-[11px] text-gray-300 leading-relaxed">
              <strong className="text-gold-ancient text-[11px] ml-1">روش استفاده درمانی:</strong>
              {perfume.usage}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gold-ancient/10">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 block">ارزش این ادکلن ملکوتی</span>
            <span className="text-lg md:text-xl font-bold text-gold-ancient">{perfume.price}</span>
          </div>

          <button
            onClick={onOrder}
            className="px-5 py-3 bg-gold-ancient hover:bg-yellow-600 text-lapis-deep font-bold text-xs rounded-xl flex items-center gap-2 transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
          >
            <span>سفارش ادکلن و مشاوره</span>
            <ArrowLeft size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
