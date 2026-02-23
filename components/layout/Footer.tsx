'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="relative mt-auto border-t border-slate-200/50 bg-white/70 backdrop-blur-xl text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h3 className="text-slate-900 text-2xl font-black tracking-tighter">
              {language === 'ar' ? 'الكراج الذكي' : 'SMART GARAGE'}
            </h3>
            <p className="text-sm leading-relaxed max-w-xs text-slate-500">
              {language === 'ar'
                ? 'نظام متطور لإدارة الكراجات وزيادة العملاء عبر الواتساب'
                : 'Advanced system for garage management and customer acquisition via WhatsApp'}
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-slate-900 font-bold uppercase tracking-widest text-xs">
              {language === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="grid grid-cols-2 gap-4 text-sm">
              <li>
                <Link href="/" className="hover:text-red-600 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-red-600 transition-colors">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-red-600 transition-colors">
                  {t.nav.book}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-600 transition-colors">
                  {t.nav.contact}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-red-600 transition-colors">
                  {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-slate-900 font-bold uppercase tracking-widest text-xs">
              {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-red-50 transition-colors">
                  <Phone className="w-4 h-4 text-red-600" />
                </div>
                <span className="group-hover:text-slate-900 transition-colors">+965 XXXX XXXX</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-green-50 transition-colors">
                  <Mail className="w-4 h-4 text-green-600" />
                </div>
                <span className="group-hover:text-slate-900 transition-colors">info@smartgarage.com</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-red-50 transition-colors">
                  <MapPin className="w-4 h-4 text-red-600" />
                </div>
                <span className="group-hover:text-slate-900 transition-colors text-balance">
                  {language === 'ar' ? 'الكويت، العاصمة' : 'Kuwait City, Kuwait'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-20 pt-10 text-xs text-center tracking-widest uppercase text-slate-400">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-slate-900 font-bold">
              {language === 'ar' ? 'الكراج الذكي' : 'Smart Garage'}
            </span>
            . {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
