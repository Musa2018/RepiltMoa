import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { NewsItem } from '@/types/content';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';

export const NewsSection = () => {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  
  const { data: newsItems, isLoading } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
  });

  const getCategoryClass = (category: string) => {
    switch (category) {
      case 'Press Release':
        return 'bg-secondary-light';
      case 'Event':
        return 'bg-accent';
      case 'Announcement':
        return 'bg-primary';
      default:
        return 'bg-gray-500';
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case 'Press Release':
        return t('news.pressRelease');
      case 'Event':
        return t('news.event');
      case 'Announcement':
        return t('news.announcement');
      default:
        return category;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'ar') {
      return format(date, 'dd MMM yyyy', { locale: ar });
    }
    return format(date, 'MMM d, yyyy');
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className={`flex justify-between items-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <h2 className="text-2xl font-bold text-primary">{t('news.title')}</h2>
          <Link href="/news">
            <a className={`text-accent hover:text-accent-light font-semibold flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              {t('news.viewAll')} 
              <i className={`fas fa-arrow-right ${isRTL ? 'mr-2 transform rotate-180' : 'ml-2'}`}></i>
            </a>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            Array(3).fill(0).map((_, index) => (
              <Card key={index} className="bg-white">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-8 w-full mb-2" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            newsItems?.slice(0, 3).map((news) => (
              <Card key={news.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <img 
                  src={news.imageUrl} 
                  alt={language === 'ar' ? news.titleAr : news.titleEn} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <span className={`inline-block px-3 py-1 ${getCategoryClass(news.category)} text-white text-xs rounded-full mb-2`}>
                    {getCategoryText(news.category)}
                  </span>
                  <h3 className="text-lg font-semibold mb-2">{language === 'ar' ? news.titleAr : news.titleEn}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{language === 'ar' ? news.contentAr : news.contentEn}</p>
                  <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <span className="text-sm text-gray-500">
                      <i className="far fa-calendar mr-1"></i> {formatDate(news.publishDate)}
                    </span>
                    <Link href={`/news/${news.id}`}>
                      <a className="text-primary hover:text-primary-light font-semibold">
                        {news.category === 'Event' ? t('news.register') : t('news.readMore')}
                      </a>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
