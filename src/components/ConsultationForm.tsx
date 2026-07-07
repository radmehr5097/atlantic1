import React, { useState } from 'react';
import { Sparkles, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

export default function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) {
      newErrors.name = 'لطفاً نام و نام خانوادگی خود را وارد کنید.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'نام باید حداقل ۳ کاراکتر باشد.';
    }

    const phoneRegex = /^(\+98|0)?9\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'لطفاً شماره تماس خود را وارد کنید.';
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = 'شماره موبایل وارد شده معتبر نیست (مثال: 09138128424).';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'لطفاً شرح کوتاهی از مشکل یا درخواست خود را بنویسید.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'پیام باید حداقل ۱۰ کاراکتر باشد تا مشاور بتواند بهتر راهنمایی کند.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API Submission
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        subject: 'general',
        message: '',
      });
    }, 1500);
  };

  const subjects = [
    { value: 'general', label: 'مشاوره عمومی اصلاح مزاج' },
    { value: 'fatty-liver', label: 'پاکسازی کبد چرب' },
    { value: 'weight-loss', label: 'کاهش وزن و تناسب اندام' },
    { value: 'anemia', label: 'بهبود کم‌خونی و ضعف عمومی' },
    { value: 'depression', label: 'بهبود افسردگی و اختلالات خلقی' },
    { value: 'cologne', label: 'راهنمایی خرید ادکلن‌های درمانی' },
  ];

  return (
    <div id="consultation-form-wrapper" className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden border border-gold-ancient/30">
      <div className="absolute top-0 right-0 w-24 h-24 bg-gold-ancient/5 rounded-full blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-turquoise/20 rounded-full blur-3xl pointer-events-none"></div>

      {isSubmitted ? (
        <motion.div
          id="consultation-success-message"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10 flex flex-col items-center"
        >
          <div className="w-16 h-16 bg-gold-ancient/10 text-gold-ancient rounded-full flex items-center justify-center mb-4 border border-gold-ancient/30">
            <CheckCircle size={36} className="animate-bounce" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">درخواست شما با موفقیت ثبت شد</h3>
          <p className="text-sm text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
            مظاهری عزیز و تیم تخصصی آتلانتیک، درخواست شما را بررسی کرده و حداکثر ظرف مدت ۲۴ ساعت آینده با شما تماس خواهند گرفت.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-2.5 bg-gold-ancient hover:bg-yellow-600 text-lapis-deep font-bold rounded-xl transition-all duration-300 shadow-lg cursor-pointer"
          >
            ثبت درخواست جدید
          </button>
        </motion.div>
      ) : (
        <form id="consultation-main-form" onSubmit={handleSubmit} className="space-y-5">
          <div className="text-center md:text-right mb-6">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <Sparkles className="text-gold-ancient" size={18} />
              <span className="text-xs uppercase tracking-widest text-gold-ancient font-semibold">ارتباط مستقیم</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white font-serif">دریافت نوبت مشاوره رایگان</h3>
            <p className="text-xs text-gray-400 mt-1">تلفیق سه دانش طب در جهت بازگرداندن تعادل طبیعی به بدن شما</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="consult-name" className="block text-xs text-gray-300 mb-1.5 font-medium mr-1">نام و نام خانوادگی <span className="text-red-500">*</span></label>
              <input
                id="consult-name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 bg-lapis-deep/80 border ${errors.name ? 'border-red-500' : 'border-gold-ancient/20'} focus:border-gold-ancient text-white rounded-xl outline-none transition-all text-sm`}
                placeholder="مثال: محمد مظاهری"
              />
              {errors.name && (
                <span className="text-red-400 text-[11px] flex items-center gap-1 mt-1 font-medium mr-1">
                  <AlertTriangle size={12} /> {errors.name}
                </span>
              )}
            </div>

            <div>
              <label htmlFor="consult-phone" className="block text-xs text-gray-300 mb-1.5 font-medium mr-1">شماره تماس (موبایل) <span className="text-red-500">*</span></label>
              <input
                id="consult-phone"
                type="text"
                dir="ltr"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 bg-lapis-deep/80 border ${errors.phone ? 'border-red-500' : 'border-gold-ancient/20'} focus:border-gold-ancient text-white rounded-xl outline-none transition-all text-sm text-right`}
                placeholder="۰۹۱۳۸۱۲۸۴۲۴"
              />
              {errors.phone && (
                <span className="text-red-400 text-[11px] flex items-center gap-1 mt-1 font-medium mr-1">
                  <AlertTriangle size={12} /> {errors.phone}
                </span>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="consult-subject" className="block text-xs text-gray-300 mb-1.5 font-medium mr-1 font-serif">موضوع اصلی مشاوره</label>
            <select
              id="consult-subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-lapis-deep/80 border border-gold-ancient/20 focus:border-gold-ancient text-white rounded-xl outline-none transition-all text-sm cursor-pointer"
            >
              {subjects.map((sub) => (
                <option key={sub.value} value={sub.value} className="bg-lapis-deep text-white">
                  {sub.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="consult-message" className="block text-xs text-gray-300 mb-1.5 font-medium mr-1">توضیحات و علائم بیماری <span className="text-red-500">*</span></label>
            <textarea
              id="consult-message"
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className={`w-full px-4 py-3 bg-lapis-deep/80 border ${errors.message ? 'border-red-500' : 'border-gold-ancient/20'} focus:border-gold-ancient text-white rounded-xl outline-none transition-all text-sm resize-none`}
              placeholder="لطفاً مواردی مثل سن، مزاج فعلی در صورت اطلاع، و علائم بیماری خود را بنویسید..."
            />
            {errors.message && (
              <span className="text-red-400 text-[11px] flex items-center gap-1 mt-1 font-medium mr-1">
                <AlertTriangle size={12} /> {errors.message}
              </span>
            )}
          </div>

          <button
            id="consultation-submit-btn"
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gold-ancient hover:bg-yellow-600 text-lapis-deep font-bold rounded-xl transition-all duration-300 shadow-lg relative overflow-hidden flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-lapis-deep border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <Sparkles size={16} />
                <span>ثبت درخواست نوبت و تماس مشاور</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
