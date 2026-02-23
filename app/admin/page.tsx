'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { Users, TrendingUp, Clock, CheckCircle2, Eye } from 'lucide-react';

type Lead = {
  id: string;
  full_name: string;
  phone: string;
  status: string;
  created_at: string;
  service_id: string | null;
};

type Service = {
  id: string;
  name_ar: string;
  name_en: string;
};

export default function AdminDashboard() {
  const { language, t } = useLanguage();
  const [stats, setStats] = useState({
    newToday: 0,
    newWeek: 0,
    conversionRate: 0,
    avgResponseTime: 2.5,
  });
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      weekAgo.setHours(0, 0, 0, 0);

      const [leadsResponse, servicesResponse] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('services').select('id, name_ar, name_en'),
      ]);

      if (leadsResponse.data) {
        const leads = leadsResponse.data as Lead[];
        const todayLeads = leads.filter(
          (lead) => new Date(lead.created_at) >= today
        ).length;
        const weekLeads = leads.filter(
          (lead) => new Date(lead.created_at) >= weekAgo
        ).length;
        const completedLeads = leads.filter((lead) => lead.status === 'COMPLETED').length;
        const convRate = leads.length > 0 ? (completedLeads / leads.length) * 100 : 0;

        setStats({
          newToday: todayLeads,
          newWeek: weekLeads,
          conversionRate: Math.round(convRate),
          avgResponseTime: 2.5,
        });

        setRecentLeads(leads.slice(0, 5));
      }

      if (servicesResponse.data) {
        setServices(servicesResponse.data);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  const getServiceName = (serviceId: string | null) => {
    if (!serviceId) return t.common.notSpecified;
    const service = services.find((s) => s.id === serviceId);
    return service ? (language === 'ar' ? service.name_ar : service.name_en) : t.common.notSpecified;
  };

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.admin.dashboard.title}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.admin.dashboard.stats.newLeadsToday}</p>
          <p className="text-3xl font-bold text-gray-900">{stats.newToday}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.admin.dashboard.stats.newLeadsWeek}</p>
          <p className="text-3xl font-bold text-gray-900">{stats.newWeek}</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.admin.dashboard.stats.conversionRate}</p>
          <p className="text-3xl font-bold text-gray-900">{stats.conversionRate}%</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-1">{t.admin.dashboard.stats.avgResponseTime}</p>
          <p className="text-3xl font-bold text-gray-900">
            {stats.avgResponseTime} {t.admin.dashboard.stats.hours}
          </p>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">{t.admin.dashboard.recentLeads}</h2>
          <Link
            href="/admin/leads"
            className="text-sm text-gray-900 hover:underline font-medium"
          >
            {t.admin.dashboard.viewAll}
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <p className="text-center text-gray-500 py-8">{t.admin.dashboard.noLeads}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-start py-3 px-4 text-sm font-semibold text-gray-900">
                    {t.admin.leads.table.name}
                  </th>
                  <th className="text-start py-3 px-4 text-sm font-semibold text-gray-900">
                    {t.admin.leads.table.phone}
                  </th>
                  <th className="text-start py-3 px-4 text-sm font-semibold text-gray-900">
                    {t.admin.leads.table.service}
                  </th>
                  <th className="text-start py-3 px-4 text-sm font-semibold text-gray-900">
                    {t.admin.leads.table.date}
                  </th>
                  <th className="text-start py-3 px-4 text-sm font-semibold text-gray-900">
                    {t.admin.leads.table.status}
                  </th>
                  <th className="text-start py-3 px-4 text-sm font-semibold text-gray-900">
                    {t.admin.leads.table.actions}
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{lead.full_name}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">{lead.phone}</td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {getServiceName(lead.service_id)}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      {format(new Date(lead.created_at), 'yyyy-MM-dd')}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                          lead.status
                        )}`}
                      >
                        {t.admin.leads.status[lead.status as keyof typeof t.admin.leads.status]}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/leads/${lead.id}`}
                        className="inline-flex items-center gap-1 text-sm text-gray-900 hover:underline"
                      >
                        <Eye className="w-4 h-4" />
                        {t.admin.leads.table.view}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
