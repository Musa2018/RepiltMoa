import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { Statistic } from '@/types/content';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Skeleton } from '@/components/ui/skeleton';

export const StatisticsSection = () => {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  
  const { data: statistics, isLoading } = useQuery<Statistic[]>({
    queryKey: ['/api/statistics'],
  });

  // Sort statistics by order field
  const sortedStats = statistics?.sort((a, b) => a.order - b.order);

  return (
    <section className="py-12 bg-primary text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold mb-10 text-center">{t('stats.title')}</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="p-6">
                <Skeleton className="h-12 w-full bg-white/20 mb-2" />
                <Skeleton className="h-6 w-full bg-white/20" />
              </div>
            ))
          ) : (
            sortedStats?.map(stat => (
              <div key={stat.id} className="p-6">
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{language === 'ar' ? stat.labelAr : stat.labelEn}</div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/statistics">
            <Button variant="outline" className="inline-flex items-center px-6 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition font-semibold">
              <i className={`fas fa-chart-bar ${isRTL ? 'ml-2' : 'mr-2'}`}></i>
              {t('stats.viewDetails')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
