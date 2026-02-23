'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { useAuth } from '@/lib/auth/context';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';

type Lead = {
  id: string;
  full_name: string;
  phone: string;
  car_make_model: string | null;
  service_id: string | null;
  preferred_date: string | null;
  preferred_time: string | null;
  message: string | null;
  status: string;
  follow_up_at: string | null;
  created_at: string;
};

type Service = {
  id: string;
  name_ar: string;
  name_en: string;
};

type Note = {
  id: string;
  note: string;
  created_by: string | null;
  created_at: string;
};

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { language, t } = useLanguage();
  const { user } = useAuth();

  const [lead, setLead] = useState<Lead | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: leadData } = await supabase
        .from('leads')
        .select('*')
        .eq('id', params.id as string)
        .maybeSingle();

      if (leadData) {
        const typedLeadData = leadData as Lead;
        setLead(typedLeadData);

        if (typedLeadData.service_id) {
          const { data: serviceData } = await supabase
            .from('services')
            .select('id, name_ar, name_en')
            .eq('id', typedLeadData.service_id)
            .maybeSingle();

          if (serviceData) {
            setService(serviceData);
          }
        }

        const { data: notesData } = await supabase
          .from('lead_notes')
          .select('*')
          .eq('lead_id', params.id as string)
          .order('created_at', { ascending: false });

        if (notesData) {
          setNotes(notesData);
        }
      }

      setLoading(false);
    }

    fetchData();
  }, [params.id]);

  const handleStatusUpdate = async (newStatus: string) => {
    if (!lead) return;

    setUpdatingStatus(true);
    const { error } = await (supabase
      .from('leads') as any)
      .update({ status: newStatus })
      .eq('id', lead.id);

    if (error) {
      toast.error(t.common.error);
    } else {
      setLead({ ...lead, status: newStatus });
      toast.success(
        language === 'ar' ? 'تم تحديث الحالة بنجاح' : 'Status updated successfully'
      );
    }

    setUpdatingStatus(false);
  };

  const handleFollowUpUpdate = async (date: string) => {
    if (!lead) return;

    const { error } = await (supabase
      .from('leads') as any)
      .update({ follow_up_at: date || null })
      .eq('id', lead.id);

    if (error) {
      toast.error(t.common.error);
    } else {
      setLead({ ...lead, follow_up_at: date || null });
      toast.success(
        language === 'ar' ? 'تم تحديث موعد المتابعة' : 'Follow-up date updated'
      );
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim() || !lead) return;

    setSavingNote(true);
    const { data, error } = await (supabase
      .from('lead_notes') as any)
      .insert([
        {
          lead_id: lead.id,
          note: newNote,
          created_by: user?.email || null,
        },
      ])
      .select()
      .single();

    if (error) {
      toast.error(t.common.error);
    } else if (data) {
      setNotes([data, ...notes]);
      setNewNote('');
      toast.success(
        language === 'ar' ? 'تمت إضافة الملاحظة' : 'Note added successfully'
      );
    }

    setSavingNote(false);
  };

  const statuses = ['NEW', 'CONTACTED', 'QUOTED', 'BOOKED', 'COMPLETED', 'LOST'];

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      NEW: 'bg-blue-100 text-blue-800',
      CONTACTED: 'bg-yellow-100 text-yellow-800',
      QUOTED: 'bg-purple-100 text-purple-800',
      BOOKED: 'bg-green-100 text-green-800',
      COMPLETED: 'bg-gray-100 text-gray-800',
      LOST: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.common.loading}</p>
        </div>
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">{language === 'ar' ? 'لم يتم العثور على العميل' : 'Lead not found'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        {t.admin.leadDetail.back}
      </button>

      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.admin.leadDetail.title}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t.admin.leadDetail.info}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">{t.admin.leadDetail.fullName}</p>
                <p className="text-base font-medium text-gray-900">{lead.full_name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">{t.admin.leadDetail.phone}</p>
                <a
                  href={`tel:${lead.phone}`}
                  className="text-base font-medium text-blue-600 hover:underline"
                >
                  {lead.phone}
                </a>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">{t.admin.leadDetail.car}</p>
                <p className="text-base font-medium text-gray-900">
                  {lead.car_make_model || t.common.notSpecified}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">{t.admin.leadDetail.service}</p>
                <p className="text-base font-medium text-gray-900">
                  {service
                    ? language === 'ar'
                      ? service.name_ar
                      : service.name_en
                    : t.common.notSpecified}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">{t.admin.leadDetail.preferredDate}</p>
                <p className="text-base font-medium text-gray-900">
                  {lead.preferred_date || t.common.notSpecified}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">{t.admin.leadDetail.preferredTime}</p>
                <p className="text-base font-medium text-gray-900">
                  {lead.preferred_time || t.common.notSpecified}
                </p>
              </div>

              <div className="md:col-span-2">
                <p className="text-sm text-gray-600 mb-1">{t.admin.leadDetail.message}</p>
                <p className="text-base font-medium text-gray-900">
                  {lead.message || t.common.notSpecified}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">{t.admin.leadDetail.createdAt}</p>
                <p className="text-base font-medium text-gray-900">
                  {format(new Date(lead.created_at), 'yyyy-MM-dd HH:mm')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t.admin.leadDetail.notes}</h2>

            <div className="mb-6">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder={t.admin.leadDetail.notePlaceholder}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none mb-3"
              />
              <button
                onClick={handleAddNote}
                disabled={!newNote.trim() || savingNote}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                <Save className="w-4 h-4" />
                {savingNote ? t.common.loading : t.admin.leadDetail.saveNote}
              </button>
            </div>

            {notes.length === 0 ? (
              <p className="text-center text-gray-500 py-8">{t.admin.leadDetail.noNotes}</p>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => (
                  <div key={note.id} className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 mb-2">{note.note}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>{note.created_by || 'Admin'}</span>
                      <span>•</span>
                      <span>{format(new Date(note.created_at), 'yyyy-MM-dd HH:mm')}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.admin.leadDetail.status}</h3>
            <div className="mb-4">
              <span
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                  lead.status
                )}`}
              >
                {t.admin.leads.status[lead.status as keyof typeof t.admin.leads.status]}
              </span>
            </div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              {t.admin.leadDetail.updateStatus}
            </label>
            <select
              value={lead.status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
              disabled={updatingStatus}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {t.admin.leads.status[status as keyof typeof t.admin.leads.status]}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{t.admin.leadDetail.followUp}</h3>
            <input
              type="datetime-local"
              value={lead.follow_up_at ? lead.follow_up_at.slice(0, 16) : ''}
              onChange={(e) => handleFollowUpUpdate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
