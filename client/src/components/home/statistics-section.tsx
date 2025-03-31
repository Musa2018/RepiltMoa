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
    <section className="py-8 md:py-12 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-xl md:text-2xl font-bold mb-6 md:mb-10 text-center">{t('stats.title')}</h2>
        
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 text-center">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="p-3 md:p-6 bg-white/5 rounded-lg">
                <Skeleton className="h-10 md:h-12 w-full bg-white/20 mb-2" />
                <Skeleton className="h-5 md:h-6 w-full bg-white/20" />
              </div>
            ))
          ) : (
            sortedStats?.map(stat => (
              <div key={stat.id} className="p-3 md:p-6 bg-white/5 rounded-lg flex flex-col items-center justify-center">
                <div className="text-3xl md:text-4xl font-bold mb-1 md:mb-2">{stat.value}</div>
                <div className="text-sm md:text-lg text-center">
                  {language === 'ar' ? stat.labelAr : stat.labelEn}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="mt-6 md:mt-8 text-center">
          <Link href="/statistics">
            <Button variant="outline" className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition font-semibold text-sm md:text-base">
              <i className={`fas fa-chart-bar ${isRTL ? 'ml-1.5 md:ml-2' : 'mr-1.5 md:mr-2'}`}></i>
              {t('stats.viewDetails')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
