import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { Service } from '@/types/content';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const ServicesDirectory = () => {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['/api/services'],
  });

  // Group services by category
  const servicesByCategory = services?.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, Service[]>) || {};

  const categories = Object.keys(servicesByCategory);

  const categoryIcons: Record<string, string> = {
    'Crop & Plant Services': 'fa-seedling',
    'Fisheries & Aquaculture': 'fa-fish',
    'Livestock & Veterinary Services': 'fa-cow',
    'Marketing & Support': 'fa-chart-line',
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'Crop & Plant Services':
        return t('services.cropPlant');
      case 'Fisheries & Aquaculture':
        return t('services.fisheries');
      case 'Livestock & Veterinary Services':
        return t('services.livestock');
      case 'Marketing & Support':
        return t('services.marketing');
      default:
        return category;
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className={`text-2xl font-bold text-primary mb-8 ${isRTL ? 'text-right' : ''}`}>
          {t('services.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isLoading ? (
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="mb-6">
                <div className="flex items-center mb-4">
                  <Skeleton className="h-10 w-10 rounded-full mr-3" />
                  <Skeleton className="h-7 w-64" />
                </div>
                <Skeleton className="h-48 w-full rounded-lg" />
              </div>
            ))
          ) : (
            categories.map((category, index) => {
              const categoryServices = servicesByCategory[category];
              
              if (index < 4) { // Limit to 4 categories for the homepage
                return (
                  <div key={category} className="mb-6">
                    <h3 className={`text-xl font-semibold text-primary mb-4 flex items-center ${isRTL ? 'flex-row-reverse justify-end' : ''}`}>
                      <i className={`fas ${categoryIcons[category] || 'fa-list'} ${isRTL ? 'ml-3' : 'mr-3'} text-secondary`}></i>
                      {getCategoryTitle(category)}
                    </h3>
                    <ul className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {categoryServices.map((service) => (
                        <li key={service.id}>
                          <Link href={`/services/${service.id}`}>
                            <a className="block p-3 rounded hover:bg-gray-100 transition">
                              <div className={`font-semibold text-primary ${isRTL ? 'text-right' : ''}`}>
                                {language === 'ar' ? service.titleAr : service.titleEn}
                              </div>
                              <p className={`text-sm text-gray-600 ${isRTL ? 'text-right' : ''}`}>
                                {language === 'ar' ? service.descriptionAr : service.descriptionEn}
                              </p>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }
              return null;
            })
          )}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/services">
            <Button className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition font-semibold">
              <i className={`fas fa-list-ul ${isRTL ? 'ml-2' : 'mr-2'}`}></i>
              {t('services.viewAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
