'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import {
  CalendarCheck,
  BellRing,
  MessageSquare,
  Users,
  Clock,
  Star,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';

export default function HomePage() {
  const { language, t } = useLanguage();

  const whatsappNumber = '96512345678';
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-100/20 via-white to-white z-10" />
          <img
            src="/premium_garage_hero.png"
            alt="Premium Garage"
            className="w-full h-full object-cover scale-105 animate-plasma opacity-20 mix-blend-multiply grayscale"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold tracking-widest uppercase">
              <Zap className="w-3 h-3 fill-red-600" />
              {language === 'ar' ? 'الجيل القادم من إدارة الكراجات' : 'NEXT-GEN GARAGE MANAGEMENT'}
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-tight">
              {t.home.hero.title}
            </h1>

            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light">
              {t.home.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
              <Link
                href="/book"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full overflow-hidden transition-all duration-300 bg-red-600 text-white hover:bg-slate-900 shadow-xl shadow-red-100"
              >
                <span className="relative z-10">{t.home.hero.cta}</span>
                <ArrowRight className={`w-5 h-5 ml-2 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </Link>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold rounded-full text-slate-900 bg-white border border-slate-200 backdrop-blur-md hover:bg-slate-50 transition-all duration-300"
              >
                <MessageSquare className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'} text-green-600`} />
                {t.home.hero.ctaWhatsApp}
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-slate-200 flex justify-center p-2">
            <div className="w-1 h-2 bg-slate-300 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* How it Works - Bento Style */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
                {t.home.howItWorks.title}
              </h2>
              <p className="text-red-500 text-lg uppercase tracking-widest font-bold">
                {language === 'ar' ? 'رحلة عميل سلسة' : 'A SEAMLESS CUSTOMER JOURNEY'}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 space-y-6 group hover:-translate-y-2 relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                <CalendarCheck className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.home.howItWorks.step1.title}</h3>
                <p className="text-slate-500 leading-relaxed">{t.home.howItWorks.step1.description}</p>
              </div>
              <div className="text-4xl font-black text-slate-100 absolute top-4 right-8">01</div>
            </div>

            <div className="glass-card p-10 space-y-6 group hover:-translate-y-2 lg:mt-8 relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-green-50 border border-green-100 flex items-center justify-center">
                <BellRing className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.home.howItWorks.step2.title}</h3>
                <p className="text-slate-500 leading-relaxed">{t.home.howItWorks.step2.description}</p>
              </div>
              <div className="text-4xl font-black text-slate-100 absolute top-4 right-8">02</div>
            </div>

            <div className="glass-card p-10 space-y-6 group hover:-translate-y-2 lg:mt-16 relative overflow-hidden">
              <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-red-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{t.home.howItWorks.step3.title}</h3>
                <p className="text-slate-500 leading-relaxed">{t.home.howItWorks.step3.description}</p>
              </div>
              <div className="text-4xl font-black text-slate-100 absolute top-4 right-8">03</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Bento Grid */}
      <section className="py-32 relative overflow-hidden bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24 space-y-4">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900">
              {t.home.benefits.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 glass-card p-10 flex flex-col justify-end group hover:bg-slate-900 cursor-default relative overflow-hidden text-slate-900 hover:text-white border-slate-100 bg-white">
              <div className="absolute top-10 right-10 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all" />
              <Users className="w-12 h-12 text-red-600 mb-8" />
              <h3 className="text-3xl font-black mb-4 transition-colors">{t.home.benefits.benefit1.title}</h3>
              <p className="text-slate-500 text-xl leading-relaxed transition-colors group-hover:text-slate-300">{t.home.benefits.benefit1.description}</p>
            </div>

            <div className="md:col-span-2 glass-card p-10 flex flex-col justify-center group hover:bg-green-50 cursor-default border-slate-100 bg-white">
              <div className="flex items-center gap-6">
                <ShieldCheck className="w-10 h-10 text-green-600" />
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{t.home.benefits.benefit2.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{t.home.benefits.benefit2.description}</p>
                </div>
              </div>
            </div>

            <div className="glass-card p-10 flex flex-col justify-center text-center group hover:bg-red-50 cursor-default border-slate-100 bg-white">
              <Clock className="w-8 h-8 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.home.benefits.benefit3.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t.home.benefits.benefit3.description}</p>
            </div>

            <div className="glass-card p-10 flex flex-col justify-center text-center group hover:bg-yellow-50 cursor-default border-slate-100 bg-white">
              <Star className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">{t.home.benefits.benefit4.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{t.home.benefits.benefit4.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 mb-8">
                {t.home.testimonials.title}
              </h2>
              <p className="text-slate-400 text-xl leading-relaxed">
                {language === 'ar'
                  ? 'انضم إلى مئات أصحاب الكراجات الذين وثقوا بنا لتطوير أعمالهم.'
                  : 'Join hundreds of garage owners who trusted us to scale their business.'}
              </p>
            </div>

            <div className="space-y-8">
              <div className="glass-card p-8 relative overflow-hidden group border-slate-100">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-red-600 text-red-600" />
                  ))}
                </div>
                <p className="text-slate-600 text-lg italic mb-8 leading-relaxed">
                  "{t.home.testimonials.testimonial1.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center font-bold text-red-600">
                    MS
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 uppercase tracking-wider">{t.home.testimonials.testimonial1.author}</p>
                    <p className="text-sm text-slate-400">{t.home.testimonials.testimonial1.role}</p>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 relative overflow-hidden group translate-x-4 border-slate-100">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-green-600 text-green-600" />
                  ))}
                </div>
                <p className="text-slate-600 text-lg italic mb-8 leading-relaxed">
                  "{t.home.testimonials.testimonial2.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-600">
                    AA
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 uppercase tracking-wider">{t.home.testimonials.testimonial2.author}</p>
                    <p className="text-sm text-slate-400">{t.home.testimonials.testimonial2.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card p-16 md:p-24 text-center space-y-12 relative overflow-hidden border-red-600/20 bg-white">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

            <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-slate-900">
              {language === 'ar' ? 'جاهز لتحويل كراجك؟' : 'Ready to Transform Your Garage?'}
            </h2>

            <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {language === 'ar'
                ? 'انضم إلينا اليوم وابدأ في استقبال الحجوزات بشكل منظم واحترافي.'
                : 'Join us today and start receiving bookings in an organized and professional way.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/book"
                className="px-12 py-6 text-xl font-black rounded-full text-white bg-red-600 hover:bg-slate-900 transition-all duration-300 shadow-2xl shadow-red-100"
              >
                {t.home.hero.cta}
              </Link>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-12 py-6 text-xl font-black rounded-full text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-all duration-300"
              >
                {t.home.hero.ctaWhatsApp}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
