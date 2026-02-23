'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { useAuth } from '@/lib/auth/context';
import { LayoutDashboard, Users, Settings, LogOut, Globe } from 'lucide-react';

export default function AdminNav() {
  const { language, setLanguage, t } = useLanguage();
  const { signOut, user } = useAuth();
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

  const navLinks = [
    { href: '/admin', label: t.admin.dashboard.title, icon: LayoutDashboard, exact: true },
    { href: '/admin/leads', label: t.admin.leads.title, icon: Users },
    { href: '/admin/settings', label: t.admin.settings.title, icon: Settings },
  ];

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/admin" className="text-xl font-bold">
              {language === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}
            </Link>

            <div className="hidden md:flex items-center gap-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = link.exact ? pathname === link.href : isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      active ? 'bg-gray-800' : 'hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300 hidden sm:block">{user?.email}</span>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">{language === 'ar' ? 'EN' : 'AR'}</span>
            </button>

            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">{t.nav.logout}</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
