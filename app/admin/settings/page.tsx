'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { language, t } = useLanguage();

  const [garageInfo, setGarageInfo] = useState({
    name: language === 'ar' ? 'الكراج الذكي' : 'Smart Garage',
    address: language === 'ar' ? 'الكويت، العاصمة' : 'Kuwait City, Kuwait',
    phone: '+965 XXXX XXXX',
  });

  const [whatsappSettings, setWhatsappSettings] = useState({
    phone: '+965 XXXX XXXX',
    template:
      language === 'ar'
        ? 'عميل جديد:\nالاسم: {{name}}\nالهاتف: {{phone}}\nالخدمة: {{service}}\nالموعد المفضل: {{date}}'
        : 'New Lead:\nName: {{name}}\nPhone: {{phone}}\nService: {{service}}\nPreferred Date: {{date}}',
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);

    setTimeout(() => {
      toast.success(
        language === 'ar'
          ? 'تم حفظ الإعدادات (عرض توضيحي)'
          : 'Settings saved (demo mode)'
      );
      setSaving(false);
    }, 1000);

    console.log('=== Settings Update (Demo) ===');
    console.log('Garage Info:', garageInfo);
    console.log('WhatsApp Settings:', whatsappSettings);
    console.log('==============================');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">{t.admin.settings.title}</h1>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">{t.admin.settings.garageInfo}</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {t.admin.settings.garageName}
              </label>
              <input
                type="text"
                value={garageInfo.name}
                onChange={(e) => setGarageInfo({ ...garageInfo, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {t.admin.settings.address}
              </label>
              <input
                type="text"
                value={garageInfo.address}
                onChange={(e) => setGarageInfo({ ...garageInfo, address: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {t.admin.settings.phone}
              </label>
              <input
                type="tel"
                value={garageInfo.phone}
                onChange={(e) => setGarageInfo({ ...garageInfo, phone: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            {t.admin.settings.whatsappSettings}
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {t.admin.settings.whatsappPhone}
              </label>
              <input
                type="tel"
                value={whatsappSettings.phone}
                onChange={(e) =>
                  setWhatsappSettings({ ...whatsappSettings, phone: e.target.value })
                }
                placeholder="+965 XXXX XXXX"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {t.admin.settings.whatsappTemplate}
              </label>
              <textarea
                value={whatsappSettings.template}
                onChange={(e) =>
                  setWhatsappSettings({ ...whatsappSettings, template: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none resize-none font-mono text-sm"
              />
              <p className="mt-2 text-sm text-gray-600">
                {language === 'ar'
                  ? 'استخدم {{name}}, {{phone}}, {{service}}, {{date}} كمتغيرات'
                  : 'Use {{name}}, {{phone}}, {{service}}, {{date}} as variables'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <p className="text-sm text-yellow-800">
            {language === 'ar'
              ? '💡 ملاحظة: هذه الإعدادات للعرض التوضيحي. في النسخة النهائية، سيتم ربط الواتساب Cloud API لإرسال الإشعارات التلقائية.'
              : '💡 Note: These settings are for demonstration. In production, WhatsApp Cloud API will be integrated for automatic notifications.'}
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-3 text-base font-medium rounded-lg text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          <Save className="w-5 h-5" />
          {saving ? t.common.loading : t.admin.settings.save}
        </button>
      </div>
    </div>
  );
}
