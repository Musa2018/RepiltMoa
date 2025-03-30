import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { useParams, useLocation, Link } from 'wouter';
import { Service } from '@/types/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

export default function Services() {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  const [location, setLocation] = useLocation();
  const { id } = useParams();
  
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

  const categoryIcons: Record<string, string> = {
    'Crop & Plant Services': 'fa-seedling',
    'Fisheries & Aquaculture': 'fa-fish',
    'Livestock & Veterinary Services': 'fa-cow',
    'Marketing & Support': 'fa-chart-line',
  };

  // If specific service is requested by ID
  if (id) {
    const serviceId = parseInt(id);
    const { data: service, isLoading: isLoadingService } = useQuery<Service>({
      queryKey: [`/api/services/${serviceId}`],
      enabled: !!serviceId,
    });

    return (
      <div className="container mx-auto px-4 py-12">
        <div className={`mb-6 ${isRTL ? 'text-right' : ''}`}>
          <Link href="/services">
            <a className={`text-primary hover:text-primary-light flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
              <i className={`fas fa-arrow-left ${isRTL ? 'ml-2 transform rotate-180' : 'mr-2'}`}></i>
              {language === 'ar' ? 'العودة إلى الخدمات' : 'Back to Services'}
            </a>
          </Link>
        </div>

        {isLoadingService ? (
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-1/3 mb-4" />
              <Skeleton className="h-32 w-full mb-6" />
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
            </CardContent>
          </Card>
        ) : service ? (
          <Card>
            <CardHeader>
              <Badge className="mb-2 bg-secondary hover:bg-secondary">{getCategoryTitle(service.category)}</Badge>
              <CardTitle className={`text-2xl ${isRTL ? 'text-right' : ''}`}>
                {language === 'ar' ? service.titleAr : service.titleEn}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`flex items-center mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <div className={`bg-primary/10 p-4 rounded-full ${isRTL ? 'ml-4' : 'mr-4'}`}>
                  <i className={`fas ${service.icon || categoryIcons[service.category] || 'fa-list'} text-primary text-3xl`}></i>
                </div>
                <div>
                  <h2 className={`text-xl font-semibold text-primary ${isRTL ? 'text-right' : ''}`}>
                    {language === 'ar' ? 'نبذة عن الخدمة' : 'Service Overview'}
                  </h2>
                </div>
              </div>

              <div className={`prose max-w-none ${isRTL ? 'text-right' : ''}`}>
                <p className="text-gray-700 mb-6">
                  {language === 'ar' ? service.descriptionAr : service.descriptionEn}
                </p>

                <h3 className="text-primary font-semibold mt-8 mb-4">
                  {language === 'ar' ? 'كيفية الحصول على الخدمة' : 'How to Access This Service'}
                </h3>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <ol className="list-decimal list-inside space-y-3">
                    <li>
                      {language === 'ar' 
                        ? 'تقديم طلب عبر بوابة الخدمات الإلكترونية أو زيارة أقرب مكتب للوزارة'
                        : 'Submit a request through the e-services portal or visit the nearest ministry office'}
                    </li>
                    <li>
                      {language === 'ar'
                        ? 'تقديم المستندات المطلوبة والمعلومات الضرورية'
                        : 'Provide the required documents and necessary information'}
                    </li>
                    <li>
                      {language === 'ar'
                        ? 'مراجعة الطلب من قبل المختصين وإجراء التقييم اللازم'
                        : 'Review of the application by specialists and necessary evaluation'}
                    </li>
                    <li>
                      {language === 'ar'
                        ? 'الحصول على الموافقة والخدمة المطلوبة'
                        : 'Obtain approval and the requested service'}
                    </li>
                  </ol>
                </div>

                <h3 className="text-primary font-semibold mt-8 mb-4">
                  {language === 'ar' ? 'الوثائق المطلوبة' : 'Required Documents'}
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    {language === 'ar' ? 'بطاقة الهوية الشخصية' : 'Personal ID card'}
                  </li>
                  <li>
                    {language === 'ar' ? 'إثبات ملكية الأرض أو عقد الإيجار (إذا كان منطبقًا)' : 'Proof of land ownership or lease contract (if applicable)'}
                  </li>
                  <li>
                    {language === 'ar' ? 'رخصة مزاولة المهنة (إذا كان منطبقًا)' : 'Professional license (if applicable)'}
                  </li>
                  <li>
                    {language === 'ar' ? 'نماذج الطلب المكتملة' : 'Completed application forms'}
                  </li>
                </ul>

                <div className="mt-8 flex">
                  <a href="#" className={`px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition ${isRTL ? 'ml-3' : 'mr-3'}`}>
                    {language === 'ar' ? 'تقديم طلب' : 'Apply Now'}
                  </a>
                  <a href="#" className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
                    {language === 'ar' ? 'تحميل نموذج الطلب' : 'Download Application Form'}
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center p-12">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">
              {language === 'ar' ? 'الخدمة غير موجودة' : 'Service Not Found'}
            </h2>
            <p className="text-gray-600 mb-6">
              {language === 'ar' 
                ? 'لم نتمكن من العثور على الخدمة المطلوبة. يرجى العودة إلى صفحة الخدمات الرئيسية.'
                : 'We couldn\'t find the requested service. Please return to the main services page.'}
            </p>
            <Link href="/services">
              <a className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-light transition">
                {language === 'ar' ? 'العودة إلى الخدمات' : 'Return to Services'}
              </a>
            </Link>
          </div>
        )}
      </div>
    );
  }

  // Services listing page
  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
        <h1 className="text-3xl font-bold text-primary mb-2">{t('nav.services')}</h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'استكشف خدمات وزارة الزراعة المقدمة للمزارعين والمجتمعات الريفية والمستثمرين في القطاع الزراعي.'
            : 'Explore services provided by the Ministry of Agriculture to farmers, rural communities, and investors in the agricultural sector.'}
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-8">
          {Array(4).fill(0).map((_, index) => (
            <div key={index} className="mb-8">
              <Skeleton className="h-10 w-64 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array(3).fill(0).map((_, idx) => (
                  <Skeleton key={idx} className="h-40 w-full rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {categories.map(category => (
            <div key={category} className="mb-8">
              <h2 className={`text-2xl font-semibold text-primary mb-6 flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                <i className={`fas ${categoryIcons[category] || 'fa-list'} ${isRTL ? 'ml-3' : 'mr-3'} text-secondary`}></i>
                {getCategoryTitle(category)}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {servicesByCategory[category].map(service => (
                  <Card 
                    key={service.id} 
                    className="hover:shadow-md transition cursor-pointer"
                    onClick={() => setLocation(`/services/${service.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className={`flex items-start mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                        <div className={`bg-primary/10 p-3 rounded-full ${isRTL ? 'ml-4' : 'mr-4'} mt-1`}>
                          <i className={`fas ${service.icon || categoryIcons[category]} text-primary`}></i>
                        </div>
                        <div>
                          <h3 className={`font-semibold text-lg text-primary mb-2 ${isRTL ? 'text-right' : ''}`}>
                            {language === 'ar' ? service.titleAr : service.titleEn}
                          </h3>
                          <p className={`text-sm text-gray-600 line-clamp-3 ${isRTL ? 'text-right' : ''}`}>
                            {language === 'ar' ? service.descriptionAr : service.descriptionEn}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Link href={`/services/${service.id}`}>
                          <a className={`text-primary hover:text-primary-light text-sm font-medium flex items-center ${isRTL ? 'flex-row-reverse' : ''} justify-end`}>
                            {language === 'ar' ? 'عرض التفاصيل' : 'View Details'} 
                            <i className={`fas fa-arrow-right text-xs ${isRTL ? 'mr-2 transform rotate-180' : 'ml-2'}`}></i>
                          </a>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
