'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n/context';
import { supabase } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { Search, Eye } from 'lucide-react';

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

export default function LeadsPage() {
  const { language, t } = useLanguage();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [leadsResponse, servicesResponse] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('services').select('id, name_ar, name_en'),
      ]);

      if (leadsResponse.data) {
        setLeads(leadsResponse.data);
        setFilteredLeads(leadsResponse.data);
      }

      if (servicesResponse.data) {
        setServices(servicesResponse.data);
      }

      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    let filtered = leads;

    if (searchQuery) {
      filtered = filtered.filter(
        (lead) =>
          lead.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.phone.includes(searchQuery)
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter((lead) => lead.status === statusFilter);
    }

    setFilteredLeads(filtered);
  }, [searchQuery, statusFilter, leads]);

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

  const statuses = ['ALL', 'NEW', 'CONTACTED', 'QUOTED', 'BOOKED', 'COMPLETED', 'LOST'];

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
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.admin.leads.title}</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.admin.leads.search}
              className={`w-full ${language === 'ar' ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none`}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
          >
            <option value="ALL">{t.admin.leads.allStatuses}</option>
            {statuses.slice(1).map((status) => (
              <option key={status} value={status}>
                {t.admin.leads.status[status as keyof typeof t.admin.leads.status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filteredLeads.length === 0 ? (
          <p className="text-center text-gray-500 py-12">{t.admin.leads.noResults}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
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
                {filteredLeads.map((lead) => (
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
                        className="inline-flex items-center gap-1 text-sm text-gray-900 hover:underline font-medium"
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
