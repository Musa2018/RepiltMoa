import { Link } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { Card, CardContent } from '@/components/ui/card';

export const QuickLinks = () => {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);

  const quickLinks = [
    {
      title: t('quickLinks.services.title'),
      description: t('quickLinks.services.description'),
      icon: 'fa-leaf text-[hsl(152,100%,20%)]',
      links: [
        { name: language === 'ar' ? 'التراخيص الزراعية' : 'Farming Licenses', url: '/services/licensing' },
        { name: language === 'ar' ? 'إرشادات المحاصيل' : 'Crop Guidance', url: '/services/crop-guidance' },
        { name: language === 'ar' ? 'برامج الدعم' : 'Support Programs', url: '/services/support' },
      ],
    },
    {
      title: t('quickLinks.resources.title'),
      description: t('quickLinks.resources.description'),
      icon: 'fa-book text-[hsl(152,100%,20%)]',
      links: [
        { name: language === 'ar' ? 'الأدلة الزراعية' : 'Farming Guides', url: '/resources/farming-guides' },
        { name: language === 'ar' ? 'الأوراق البحثية' : 'Research Papers', url: '/resources/research' },
        { name: language === 'ar' ? 'تقارير السوق' : 'Market Reports', url: '/resources/market-reports' },
      ],
    },
    {
      title: t('quickLinks.news.title'),
      description: t('quickLinks.news.description'),
      icon: 'fa-bullhorn text-[hsl(152,100%,20%)]',
      links: [
        { name: language === 'ar' ? 'البيانات الصحفية' : 'Press Releases', url: '/news/press-releases' },
        { name: language === 'ar' ? 'الفعاليات القادمة' : 'Upcoming Events', url: '/news/events' },
        { name: language === 'ar' ? 'التنبيهات الزراعية' : 'Agricultural Alerts', url: '/news/alerts' },
      ],
    },
  ];

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickLinks.map((quickLink, index) => (
            <Card key={index} className="bg-gray-50 hover:shadow-md transition">
              <CardContent className="p-6">
                <div className={`flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`bg-primary rounded-full p-3 ${isRTL ? 'ml-4' : 'mr-4'}`}>
                    <i className={`fas ${quickLink.icon.split(' ')[0]} text-white text-xl`}></i>
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className="text-xl font-semibold text-primary mb-2">{quickLink.title}</h3>
                    <p className="text-gray-600 mb-4">{quickLink.description}</p>
                    <ul className="space-y-2">
                      {quickLink.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link 
                            href={link.url}
                            className={`text-primary hover:text-primary-light flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}
                          >
                            <i className={`fas fa-angle-right ${isRTL ? 'ml-2 transform rotate-180' : 'mr-2'}`}></i>
                            {language === 'ar' ? quickLink.links[linkIndex].name : link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};