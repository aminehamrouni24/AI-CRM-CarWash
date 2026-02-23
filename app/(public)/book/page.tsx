'use client';

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { supabase } from '@/lib/supabase/client';
import { CheckCircle, MessageSquare, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { z } from 'zod';

type Service = {
  id: string;
  name_ar: string;
  name_en: string;
};

const bookingSchema = z.object({
  full_name: z.string().min(2),
  phone: z.string().min(8),
  service_id: z.string().uuid(),
  car_make_model: z.string().optional(),
  preferred_date: z.string().optional(),
  preferred_time: z.string().optional(),
  message: z.string().optional(),
  consent: z.boolean().refine((val) => val === true),
});

function BookingForm() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    car_make_model: '',
    service_id: searchParams.get('service') || '',
    preferred_date: '',
    preferred_time: '',
    message: '',
    consent: false,
  });

  useEffect(() => {
    async function fetchServices() {
      const { data, error } = await supabase
        .from('services')
        .select('id, name_ar, name_en')
        .eq('is_active', true)
        .order('created_at');

      if (!error && data) {
        setServices(data);
      }
      setLoading(false);
    }

    fetchServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const validatedData = bookingSchema.parse(formData);

      const { data, error } = await supabase
        .from('leads')
        .insert({
          full_name: validatedData.full_name,
          phone: validatedData.phone,
          car_make_model: validatedData.car_make_model || null,
          service_id: validatedData.service_id,
          preferred_date: validatedData.preferred_date || null,
          preferred_time: validatedData.preferred_time || null,
          message: validatedData.message || null,
          status: 'NEW',
        } as any)
        .select()
        .single();

      if (error) throw error;

      const leadData = data as { id: string };

      await fetch('/api/notify-new-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId: leadData.id, ...validatedData }),
      });

      setLeadId(leadData.id);
      setSuccess(true);
      toast.success(language === 'ar' ? 'تم إرسال الطلب بنجاح!' : 'Request submitted successfully!');
    } catch (error) {
      console.error('Error submitting booking:', error);
      toast.error(t.book.error);
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappLink = `https://wa.me/96512345678?text=${encodeURIComponent(
    language === 'ar'
      ? `مرحباً، أنا ${formData.full_name}. أرغب في حجز موعد. رقم الطلب: ${leadId}`
      : `Hello, I am ${formData.full_name}. I would like to book an appointment. Request ID: ${leadId}`
  )}`;

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

  if (success && leadId) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-3">{t.book.success.title}</h1>
          <p className="text-slate-500 mb-2">{t.book.success.subtitle}</p>
          <div className="inline-block px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg mb-6">
            <p className="text-2xl font-mono font-bold text-slate-900">
              {leadId.substring(0, 8).toUpperCase()}
            </p>
          </div>
          <p className="text-slate-500 mb-8 leading-relaxed max-w-sm mx-auto">{t.book.success.message}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-white bg-green-600 hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-green-100"
            >
              <MessageSquare className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {t.book.success.cta}
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-full text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-all duration-300"
            >
              {t.book.success.backHome}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-32 relative overflow-hidden">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900">{t.book.title}</h1>
          <p className="text-xl text-slate-500 font-light">{t.book.subtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card p-10 space-y-8 bg-white border-slate-100 shadow-2xl shadow-slate-200/50">
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3 ml-1">
              {t.book.form.fullName} <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.full_name}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder={t.book.form.fullNamePlaceholder}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-600/5 focus:border-red-600 outline-none transition-all duration-300 placeholder:text-slate-300"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3 ml-1">
              {t.book.form.phone} <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder={t.book.form.phonePlaceholder}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-600/5 focus:border-red-600 outline-none transition-all duration-300 placeholder:text-slate-300"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3 ml-1">
              {t.book.form.service} <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.service_id}
              onChange={(e) => setFormData({ ...formData, service_id: e.target.value })}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-600/5 focus:border-red-600 outline-none transition-all duration-300 appearance-none"
            >
              <option value="">{t.book.form.servicePlaceholder}</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {language === 'ar' ? service.name_ar : service.name_en}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3 ml-1">
              {t.book.form.carMakeModel}
            </label>
            <input
              type="text"
              value={formData.car_make_model}
              onChange={(e) => setFormData({ ...formData, car_make_model: e.target.value })}
              placeholder={t.book.form.carMakeModelPlaceholder}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-600/5 focus:border-red-600 outline-none transition-all duration-300 placeholder:text-slate-300"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 ml-1">
                {t.book.form.preferredDate}
              </label>
              <input
                type="date"
                value={formData.preferred_date}
                onChange={(e) => setFormData({ ...formData, preferred_date: e.target.value })}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-600/5 focus:border-red-600 outline-none transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-900 mb-3 ml-1">
                {t.book.form.preferredTime}
              </label>
              <input
                type="text"
                value={formData.preferred_time}
                onChange={(e) => setFormData({ ...formData, preferred_time: e.target.value })}
                placeholder={t.book.form.preferredTimePlaceholder}
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-600/5 focus:border-red-600 outline-none transition-all duration-300 placeholder:text-slate-300"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3 ml-1">
              {t.book.form.message}
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder={t.book.form.messagePlaceholder}
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-red-600/5 focus:border-red-600 outline-none transition-all duration-300 placeholder:text-slate-300 resize-none"
            />
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group cursor-pointer transition-all hover:bg-slate-100">
            <input
              type="checkbox"
              id="consent"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="w-5 h-5 text-red-600 border-slate-300 rounded focus:ring-red-600 transition-all cursor-pointer"
            />
            <label htmlFor="consent" className="text-sm text-slate-600 leading-relaxed cursor-pointer select-none">
              {t.book.form.consent} <span className="text-red-500 font-bold">*</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-8 py-5 text-lg font-black rounded-2xl text-white bg-red-600 hover:bg-slate-900 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300 shadow-xl shadow-red-100/50 flex items-center justify-center gap-3 group"
          >
            {submitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {t.book.form.submit}
                <ArrowRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${language === 'ar' ? 'rotate-180' : ''}`} />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      }
    >
      <BookingForm />
    </Suspense>
  );
}
