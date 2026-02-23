'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { supabase } from '@/lib/supabase/client';
import { Wrench, Activity, Wind, Disc, Battery, Circle, Waves, Sparkles, ArrowRight } from 'lucide-react';

type Service = {
  id: string;
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'Oil Change': Wrench,
  'Diagnostics': Activity,
  'AC Repair': Wind,
  'Brakes': Disc,
  'Battery': Battery,
  'Tires': Circle,
  'Suspension': Waves,
  'Car Detailing': Sparkles,
};

export default function ServicesPage() {
  const { language, t } = useLanguage();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('created_at');

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    }

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-slate-500">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 space-y-4">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900 leading-tight">
            {t.services.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-light">
            {t.services.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const IconComponent = iconMap[service.name_en] || Wrench;
            const name = language === 'ar' ? service.name_ar : service.name_en;
            const description = language === 'ar' ? service.description_ar : service.description_en;

            return (
              <div
                key={service.id}
                className="glass-card p-10 space-y-6 group hover:-translate-y-2 relative overflow-hidden border-slate-100 bg-white"
              >
                <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <IconComponent className="w-8 h-8 text-red-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{name}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
                </div>
                <Link
                  href={`/book?service=${service.id}`}
                  className="inline-flex items-center justify-center w-full px-6 py-4 text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-slate-900 transition-all duration-300 shadow-lg shadow-red-100/50"
                >
                  {t.services.bookService}
                  <ArrowRight className={`w-4 h-4 ${language === 'ar' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
