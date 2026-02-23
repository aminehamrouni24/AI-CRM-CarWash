'use client';

import { useLanguage } from '@/lib/i18n/context';
import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen py-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-900 text-white mb-6 shadow-xl shadow-slate-200">
            <Shield className="w-10 h-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900">{t.privacy.title}</h1>
        </div>

        <div className="glass-card bg-white border-slate-100 p-10 md:p-16 shadow-2xl shadow-slate-200/50">
          <div className="prose prose-slate prose-lg max-w-none">
            <p className="text-slate-600 leading-relaxed whitespace-pre-line font-light">{t.privacy.content}</p>

            <div className="mt-12 grid md:grid-cols-2 gap-8">
              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group transition-all hover:bg-red-50 hover:border-red-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tighter flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  {language === 'ar' ? 'البيانات التي نجمعها' : 'Data We Collect'}
                </h2>
                <ul className="space-y-3 text-slate-500 font-medium text-sm">
                  <li>• {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}</li>
                  <li>• {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}</li>
                  <li>• {language === 'ar' ? 'معلومات السيارة' : 'Car Information'}</li>
                  <li>• {language === 'ar' ? 'تفضيلات الحجز' : 'Booking Preferences'}</li>
                </ul>
              </div>

              <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 group transition-all hover:bg-green-50 hover:border-green-100">
                <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tighter flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  {language === 'ar' ? 'كيف نستخدم بياناتك' : 'How We Use Your Data'}
                </h2>
                <ul className="space-y-3 text-slate-500 font-medium text-sm">
                  <li>• {language === 'ar' ? 'معالجة طلبات الحجز' : 'Process booking requests'}</li>
                  <li>• {language === 'ar' ? 'التواصل معك بخصوص المواعيد' : 'Communicate about appointments'}</li>
                  <li>• {language === 'ar' ? 'تحسين خدماتنا' : 'Improve our services'}</li>
                  <li>• {language === 'ar' ? 'إرسال إشعارات مهمة' : 'Send important notifications'}</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 p-8 bg-slate-900 rounded-3xl text-white shadow-xl shadow-slate-200 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl" />
              <h2 className="text-xl font-bold mb-4 tracking-tighter relative z-10">
                {language === 'ar' ? 'حقوقك' : 'Your Rights'}
              </h2>
              <p className="text-slate-300 relative z-10 font-light">
                {language === 'ar'
                  ? 'يحق لك الوصول إلى بياناتك الشخصية وتصحيحها أو حذفها في أي وقت. للقيام بذلك، يرجى الاتصال بنا.'
                  : 'You have the right to access, correct, or delete your personal data at any time. To do so, please contact us.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
