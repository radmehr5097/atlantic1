import { Pack } from '../types';
import { Sparkles, Calendar, BookOpen, Activity, ArrowLeft, Headphones } from 'lucide-react';
import { motion } from 'motion/react';

interface PackCardProps {
  key?: string;
  pack: Pack;
  onOrder: () => void;
}

export default function PackCard({ pack, onOrder }: PackCardProps) {
  return (
    <motion.div
      id={`pack-card-${pack.id}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="glass-panel rounded-3xl overflow-hidden border border-gold-ancient/20 hover:border-gold-ancient/40 shadow-2xl transition-all duration-300 flex flex-col h-full text-right"
    >
      {/* Top Banner / Badge */}
      <div className="bg-gradient-to-l from-gold-ancient/15 via-turquoise/30 to-transparent p-5 border-b border-gold-ancient/15 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="text-gold-ancient animate-pulse" size={18} />
          <h3 className="text-lg font-bold text-white font-serif">
            {pack.name}
          </h3>
        </div>
        <span className="bg-gold-ancient text-lapis-deep text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
          <Headphones size={10} />
          {pack.consultationSessions} جلسه مشاوره رایگان
        </span>
      </div>

      <div className="p-6 flex-grow space-y-5">
        <p className="text-xs text-gray-300 leading-relaxed font-light">
          {pack.description}
        </p>

        {/* Disease Info */}
        <div className="bg-lapis-deep/50 p-4 rounded-2xl border border-turquoise/15 space-y-1.5">
          <h4 className="text-[11px] font-bold text-gold-ancient flex items-center gap-1.5 justify-end">
            <span>ریشه بیماری در طب سنتی</span>
            <BookOpen size={12} />
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed font-light">
            {pack.diseaseInfo}
          </p>
        </div>

        {/* Treatment Method */}
        <div className="bg-lapis-deep/50 p-4 rounded-2xl border border-turquoise/15 space-y-1.5">
          <h4 className="text-[11px] font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
            <span>پروتکل درمانی آتلانتیک</span>
            <Sparkles size={12} />
          </h4>
          <p className="text-xs text-gray-300 leading-relaxed font-light">
            {pack.treatmentMethod}
          </p>
        </div>

        {/* Pack Contents */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-white flex items-center gap-1.5 justify-end mr-1">
            <span>محتویات کامل پک درمانی</span>
            <Calendar size={12} className="text-turquoise text-sky-400" />
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-right">
            {pack.contents.map((item, i) => (
              <li key={i} className="flex items-center gap-2 justify-end text-xs text-gray-300 bg-black/20 p-2.5 rounded-xl border border-gray-800/40">
                <span>{item}</span>
                <span className="text-gold-ancient text-sm">✦</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Value row */}
        <div className="bg-gold-ancient/5 border border-gold-ancient/10 p-4 rounded-2xl flex items-center justify-between">
          <div className="text-right">
            <span className="text-[10px] text-gray-400 block">شامل ۵ جلسه مشاوره ۱۵ دقیقه‌ای رایگان</span>
            <span className="text-[11px] text-emerald-400 font-semibold block mt-0.5">تضمین کیفیت و اصالت فرمولاسیون</span>
          </div>
          <div className="text-left font-serif">
            <span className="text-[10px] text-gray-400 block">ارزش کل پکیج</span>
            <span className="text-lg font-bold text-gold-ancient">{pack.price}</span>
          </div>
        </div>
      </div>

      {/* Button Row */}
      <div className="p-5 bg-black/20 border-t border-gold-ancient/15 flex items-center justify-between">
        <span className="text-[10px] text-gray-400">ساخت اختصاصی برند آتلانتیک</span>
        <button
          onClick={onOrder}
          className="px-5 py-2.5 bg-gold-ancient hover:bg-yellow-600 text-lapis-deep font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all duration-300 shadow-md hover:scale-[1.02] cursor-pointer"
        >
          <span>سفارش پک و هماهنگی مشاوره</span>
          <ArrowLeft size={14} />
        </button>
      </div>
    </motion.div>
  );
}
