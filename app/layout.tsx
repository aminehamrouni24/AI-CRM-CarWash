import type { Metadata } from 'next';
import './globals.css';
import { LanguageProvider } from '@/lib/i18n/context';
import { AuthProvider } from '@/lib/auth/context';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Smart Garage System | نظام الكراج الذكي',
  description: 'Smart system to manage your garage and boost bookings via WhatsApp | نظام ذكي لإدارة الكراج وزيادة الحجوزات عبر واتساب',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased selection:bg-red-500/20">
        <div className="plasma-bg">
          <div className="plasma-sphere plasma-1" />
          <div className="plasma-sphere plasma-2" />
        </div>
        <LanguageProvider>
          <AuthProvider>
            <Toaster position="top-center" />
            <div className="relative z-10 flex flex-col min-h-screen">
              {children}
            </div>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
