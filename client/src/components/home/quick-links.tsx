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
      icon: 'fa-leaf',
      links: [
        { name: 'Farming Licenses', url: '/services/licensing' },
        { name: 'Crop Guidance', url: '/services/crop-guidance' },
        { name: 'Support Programs', url: '/services/support' },
      ],
    },
    {
      title: t('quickLinks.resources.title'),
      description: t('quickLinks.resources.description'),
      icon: 'fa-book',
      links: [
        { name: 'Farming Guides', url: '/resources/farming-guides' },
        { name: 'Research Papers', url: '/resources/research' },
        { name: 'Market Reports', url: '/resources/market-reports' },
      ],
    },
    {
      title: t('quickLinks.news.title'),
      description: t('quickLinks.news.description'),
      icon: 'fa-bullhorn',
      links: [
        { name: 'Press Releases', url: '/news/press-releases' },
        { name: 'Upcoming Events', url: '/news/events' },
        { name: 'Agricultural Alerts', url: '/news/alerts' },
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
                  <div className={`bg-secondary rounded-full p-3 ${isRTL ? 'ml-4' : 'mr-4'}`}>
                    <i className={`fas ${quickLink.icon} text-white text-xl`}></i>
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h3 className="text-xl font-semibold text-primary mb-2">{quickLink.title}</h3>
                    <p className="text-gray-600 mb-4">{quickLink.description}</p>
                    <ul className="space-y-2">
                      {quickLink.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link href={link.url}>
                            <a className={`text-primary hover:text-primary-light flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                              <i className={`fas fa-angle-right ${isRTL ? 'ml-2 transform rotate-180' : 'mr-2'}`}></i>
                              {language === 'ar' ? quickLink.links[linkIndex].name : link.name}
                            </a>
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
