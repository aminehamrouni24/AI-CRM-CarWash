'use client';

import { useLanguage } from '@/lib/i18n/context';
import { Phone, MessageSquare, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const { language, t } = useLanguage();

  const phone = '+96512345678';
  const whatsappLink = `https://wa.me/${phone.replace('+', '')}`;
  const callLink = `tel:${phone}`;

  return (
    <div className="min-h-screen py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 space-y-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-tight">{t.contact.title}</h1>
          <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl mx-auto">{t.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="glass-card p-10 space-y-8 bg-white border-slate-100 shadow-xl shadow-slate-200/50">
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter">{t.contact.garageName}</h2>

              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-colors group-hover:bg-red-50 group-hover:border-red-100">
                    <MapPin className="w-6 h-6 text-slate-400 transition-colors group-hover:text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{t.contact.location}</h3>
                    <p className="text-slate-500 leading-relaxed">{t.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-colors group-hover:bg-green-50 group-hover:border-green-100">
                    <Clock className="w-6 h-6 text-slate-400 transition-colors group-hover:text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{t.contact.workingHours}</h3>
                    <p className="text-slate-500 text-sm">{t.contact.workingHoursSat}</p>
                    <p className="text-slate-500 text-sm">{t.contact.workingHoursFri}</p>
                  </div>
                </div>

                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center transition-colors group-hover:bg-red-50 group-hover:border-red-100">
                    <Phone className="w-6 h-6 text-slate-400 transition-colors group-hover:text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{t.contact.phone}</h3>
                    <p className="text-slate-500 font-mono">{phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <a
                href={callLink}
                className="group flex flex-col items-center justify-center p-8 bg-slate-900 text-white rounded-3xl hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-slate-200"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="font-bold uppercase tracking-wider text-xs">{t.contact.callUs}</span>
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-8 bg-green-600 text-white rounded-3xl hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-green-100"
              >
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="font-bold uppercase tracking-wider text-xs">{t.contact.messageUs}</span>
              </a>
            </div>
          </div>

          <div className="glass-card bg-slate-50 border-slate-100 rounded-3xl overflow-hidden h-[400px] md:h-auto border border-slate-100 shadow-inner group">
            <div className="w-full h-full flex items-center justify-center p-8 text-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <MapPin className="w-20 h-20 text-slate-200 mx-auto mb-6 animate-float" />
                <p className="text-2xl font-black text-slate-900 tracking-tighter">
                  {language === 'ar' ? 'خريطة الموقع' : 'Location Map'}
                </p>
                <p className="text-sm text-slate-400 mt-3 font-medium">
                  {language === 'ar'
                    ? 'سيتم إضافة خريطة جوجل التفاعلية هنا'
                    : 'Interactive Google Maps will be integrated here'}
                </p>
                <div className="mt-10 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-slate-100 text-xs font-bold text-slate-600 shadow-sm transition-all hover:shadow-md hover:border-red-100">
                  {language === 'ar' ? 'فتح في خرائط جوجل' : 'Open in Google Maps'}
                  <ArrowRight className={`w-3 h-3 ${language === 'ar' ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
