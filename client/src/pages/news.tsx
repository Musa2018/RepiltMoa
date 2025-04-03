import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { useParams, Link } from 'wouter';
import { NewsItem } from '@/types/content';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';

export default function News() {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  const { id } = useParams();
  
  const { data: newsItems, isLoading: isLoadingAll } = useQuery<NewsItem[]>({
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

  // If specific news item is requested by ID
  if (id) {
    const newsId = parseInt(id);
    const { data: newsItem, isLoading } = useQuery<NewsItem>({
      queryKey: [`/api/news/${newsId}`],
      enabled: !!newsId,
    });

    const { data: relatedNews } = useQuery<NewsItem[]>({
      queryKey: ['/api/news'],
      select: (data) => data.filter(item => item.id !== newsId).slice(0, 3),
    });

    return (
      <div className="container mx-auto px-4 py-12">
        <div className={`mb-6 ${isRTL ? 'text-right' : ''}`}>
          <Link href="/news">
            <a className={`text-primary hover:text-primary-light flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <i className={`fas fa-arrow-left ${isRTL ? 'ml-2 transform rotate-180' : 'mr-2'}`}></i>
              {language === 'ar' ? 'العودة إلى الأخبار' : 'Back to News'}
            </a>
          </Link>
        </div>

        {isLoading ? (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <Skeleton className="w-full h-64" />
            <div className="p-8">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-1/4 mb-8" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ) : newsItem ? (
          <div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative">
                <img 
                  src={newsItem.imageUrl} 
                  alt={language === 'ar' ? newsItem.titleAr : newsItem.titleEn}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryClass(newsItem.category)} hover:${getCategoryClass(newsItem.category)}`}>
                    {getCategoryText(newsItem.category)}
                  </Badge>
                </div>
              </div>
              <div className="p-8">
                <h1 className={`text-3xl font-bold text-primary mb-3 ${isRTL ? 'text-right' : ''}`}>
                  {language === 'ar' ? newsItem.titleAr : newsItem.titleEn}
                </h1>
                <p className={`text-gray-500 mb-6 ${isRTL ? 'text-right' : ''}`}>
                  <i className="far fa-calendar-alt mr-2"></i>
                  {formatDate(newsItem.publishDate)}
                </p>
                <div className={`prose max-w-none ${isRTL ? 'text-right' : ''}`}>
                  <p className="text-gray-700 whitespace-pre-line">
                    {language === 'ar' ? newsItem.contentAr : newsItem.contentEn}
                  </p>
                  
                  {newsItem.category === 'Event' && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold text-primary mb-4">
                        {language === 'ar' ? 'تفاصيل الفعالية' : 'Event Details'}
                      </h3>
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-700">
                              <i className="far fa-calendar-alt text-primary mr-2"></i>
                              {language === 'ar' ? 'التاريخ:' : 'Date:'} {formatDate(newsItem.publishDate)}
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">
                              <i className="far fa-clock text-primary mr-2"></i>
                              {language === 'ar' ? 'الوقت:' : 'Time:'} 10:00 AM - 2:00 PM
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">
                              <i className="fas fa-map-marker-alt text-primary mr-2"></i>
                              {language === 'ar' ? 'المكان:' : 'Location:'} Agricultural Training Center, Ramallah
                            </p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">
                              <i className="fas fa-user text-primary mr-2"></i>
                              {language === 'ar' ? 'المنظم:' : 'Organizer:'} Ministry of Agriculture
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 text-center">
                          <a href="#" className="inline-block px-6 py-3 bg-accent text-white rounded-md hover:bg-accent-light transition">
                            {language === 'ar' ? 'التسجيل في الفعالية' : 'Register for the Event'}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-8 flex gap-4">
                    <a href="#" className="px-3 py-2 bg-blue-600 text-white rounded-md inline-flex items-center">
                      <i className="fab fa-facebook-f mr-2"></i>
                      {language === 'ar' ? 'مشاركة' : 'Share'}
                    </a>
                    <a href="#" className="px-3 py-2 bg-sky-500 text-white rounded-md inline-flex items-center">
                      <i className="fab fa-twitter mr-2"></i>
                      {language === 'ar' ? 'تغريد' : 'Tweet'}
                    </a>
                    <a href="#" className="px-3 py-2 bg-green-600 text-white rounded-md inline-flex items-center">
                      <i className="fab fa-whatsapp mr-2"></i>
                      {language === 'ar' ? 'واتساب' : 'WhatsApp'}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Related News */}
            {relatedNews && relatedNews.length > 0 && (
              <div className="mt-12">
                <h2 className={`text-2xl font-bold text-primary mb-6 ${isRTL ? 'text-right' : ''}`}>
                  {language === 'ar' ? 'أخبار ذات صلة' : 'Related News'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedNews.map((news) => (
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
                        <h3 className={`text-lg font-semibold mb-2 ${isRTL ? 'text-right' : ''}`}>
                          {language === 'ar' ? news.titleAr : news.titleEn}
                        </h3>
                        <p className={`text-gray-600 mb-4 line-clamp-3 ${isRTL ? 'text-right' : ''}`}>
                          {language === 'ar' ? news.contentAr : news.contentEn}
                        </p>
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
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              {language === 'ar' ? 'الخبر غير موجود' : 'News Item Not Found'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'ar' 
                ? 'لم نتمكن من العثور على الخبر المطلوب. يرجى العودة إلى صفحة الأخبار الرئيسية.'
                : 'We couldn\'t find the requested news item. Please return to the main news page.'}
            </p>
            <Link href="/news">
              <a className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition">
                {language === 'ar' ? 'العودة إلى الأخبار' : 'Return to News'}
              </a>
            </Link>
          </div>
        )}
      </div>
    );
  }

  // News listing page
  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
        <h1 className="text-3xl font-bold text-primary mb-2">{t('nav.news')}</h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'آخر الأخبار والإعلانات والفعاليات من وزارة الزراعة الفلسطينية.'
            : 'Latest news, announcements, and events from the Palestinian Ministry of Agriculture.'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main content */}
        <div className="w-full md:w-2/3">
          {isLoadingAll ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
                <div className="flex flex-col md:flex-row">
                  <Skeleton className="w-full md:w-1/3 h-48" />
                  <div className="p-6 w-full md:w-2/3">
                    <Skeleton className="h-6 w-24 mb-2" />
                    <Skeleton className="h-8 w-full mb-2" />
                    <Skeleton className="h-4 w-32 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            newsItems?.map((news) => (
              <div key={news.id} className="bg-white rounded-lg shadow-sm overflow-hidden mb-6 hover:shadow-md transition">
                <div className="flex flex-col md:flex-row">
                  <img 
                    src={news.imageUrl} 
                    alt={language === 'ar' ? news.titleAr : news.titleEn}
                    className="w-full md:w-1/3 h-48 object-cover"
                  />
                  <div className="p-6 w-full md:w-2/3">
                    <div className={isRTL ? 'text-right' : ''}>
                      <span className={`inline-block px-3 py-1 ${getCategoryClass(news.category)} text-white text-xs rounded-full mb-2`}>
                        {getCategoryText(news.category)}
                      </span>
                      <h2 className="text-xl font-bold text-primary mb-1">
                        {language === 'ar' ? news.titleAr : news.titleEn}
                      </h2>
                      <p className="text-sm text-gray-500 mb-3">
                        <i className="far fa-calendar-alt mr-1"></i> {formatDate(news.publishDate)}
                      </p>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {language === 'ar' ? news.contentAr : news.contentEn}
                      </p>
                      <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className="flex space-x-3 rtl:space-x-reverse">
                          <a href="#" className="text-gray-500 hover:text-blue-600">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                          <a href="#" className="text-gray-500 hover:text-sky-500">
                            <i className="fab fa-twitter"></i>
                          </a>
                          <a href="#" className="text-gray-500 hover:text-green-600">
                            <i className="fab fa-whatsapp"></i>
                          </a>
                        </div>
                        <Link href={`/news/${news.id}`}>
                          <a className="text-primary hover:text-primary-light font-semibold">
                            {news.category === 'Event' ? t('news.register') : t('news.readMore')}
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className={`font-semibold text-lg mb-4 pb-2 border-b ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' ? 'تصنيفات الأخبار' : 'News Categories'}
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`flex items-center justify-between p-2 rounded hover:bg-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('news.pressRelease')}
                  <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                    {newsItems?.filter(n => n.category === 'Press Release').length || 0}
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center justify-between p-2 rounded hover:bg-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('news.event')}
                  <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                    {newsItems?.filter(n => n.category === 'Event').length || 0}
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center justify-between p-2 rounded hover:bg-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {t('news.announcement')}
                  <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                    {newsItems?.filter(n => n.category === 'Announcement').length || 0}
                  </span>
                </a>
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className={`font-semibold text-lg mb-4 pb-2 border-b ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' ? 'الفعاليات القادمة' : 'Upcoming Events'}
            </h3>
            {isLoadingAll ? (
              Array(2).fill(0).map((_, index) => (
                <div key={index} className="mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/3 mb-3" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ))
            ) : (
              newsItems?.filter(n => n.category === 'Event').slice(0, 2).map((event) => (
                <div key={event.id} className={`mb-4 pb-4 border-b border-gray-100 last:border-b-0 last:pb-0 last:mb-0 ${isRTL ? 'text-right' : ''}`}>
                  <h4 className="font-medium text-primary hover:text-primary-light mb-1">
                    <Link href={`/news/${event.id}`}>
                      <a>{language === 'ar' ? event.titleAr : event.titleEn}</a>
                    </Link>
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">
                    <i className="far fa-calendar-alt mr-1"></i> {formatDate(event.publishDate)}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {language === 'ar' ? event.contentAr : event.contentEn}
                  </p>
                </div>
              ))
            )}
            <div className="mt-4 text-center">
              <Link href="/events">
                <a className="text-primary hover:text-primary-light font-medium text-sm">
                  {language === 'ar' ? 'عرض جميع الفعاليات' : 'View All Events'}
                </a>
              </Link>
            </div>
          </div>
          
          <div className="bg-primary/10 rounded-lg p-6 border border-primary/20">
            <h3 className={`font-semibold text-lg text-primary mb-4 ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' ? 'اشترك في النشرة الإخبارية' : 'Subscribe to Newsletter'}
            </h3>
            <p className={`text-sm text-gray-600 mb-4 ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' 
                ? 'احصل على آخر الأخبار والتحديثات من وزارة الزراعة مباشرة إلى بريدك الإلكتروني.'
                : 'Get the latest news and updates from the Ministry of Agriculture directly to your email.'}
            </p>
            <div className="flex flex-col space-y-2">
              <input 
                type="email" 
                placeholder={language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition">
                {language === 'ar' ? 'اشتراك' : 'Subscribe'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
