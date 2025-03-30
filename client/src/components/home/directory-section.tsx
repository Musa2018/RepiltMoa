import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { Directory } from '@/types/content';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

export const DirectorySection = () => {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  const [activeRegion, setActiveRegion] = useState('Central');
  
  const { data: directories, isLoading } = useQuery<Directory[]>({
    queryKey: ['/api/directories'],
  });

  // Filter directories by region
  const filteredDirectories = directories?.filter(
    directory => directory.region === activeRegion
  );

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6">
        <h2 className={`text-2xl font-bold text-primary mb-8 ${isRTL ? 'text-right' : ''}`}>
          {t('directory.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Directory tab navigation */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm">
              <h3 className={`bg-primary text-white p-4 font-semibold ${isRTL ? 'text-right' : ''}`}>
                {t('directory.directorates')}
              </h3>
              <div className="divide-y divide-gray-200">
                <button 
                  className={`w-full text-left p-4 hover:bg-gray-100 focus:bg-gray-100 ${activeRegion === 'Central' ? 'font-medium text-primary bg-gray-100' : ''} ${isRTL ? 'text-right' : ''}`}
                  onClick={() => setActiveRegion('Central')}
                >
                  {t('directory.central')}
                </button>
                <button 
                  className={`w-full text-left p-4 hover:bg-gray-100 focus:bg-gray-100 ${activeRegion === 'North' ? 'font-medium text-primary bg-gray-100' : ''} ${isRTL ? 'text-right' : ''}`}
                  onClick={() => setActiveRegion('North')}
                >
                  {t('directory.north')}
                </button>
                <button 
                  className={`w-full text-left p-4 hover:bg-gray-100 focus:bg-gray-100 ${activeRegion === 'Central Governorates' ? 'font-medium text-primary bg-gray-100' : ''} ${isRTL ? 'text-right' : ''}`}
                  onClick={() => setActiveRegion('Central Governorates')}
                >
                  {t('directory.centralGov')}
                </button>
                <button 
                  className={`w-full text-left p-4 hover:bg-gray-100 focus:bg-gray-100 ${activeRegion === 'South' ? 'font-medium text-primary bg-gray-100' : ''} ${isRTL ? 'text-right' : ''}`}
                  onClick={() => setActiveRegion('South')}
                >
                  {t('directory.south')}
                </button>
                <button 
                  className={`w-full text-left p-4 hover:bg-gray-100 focus:bg-gray-100 ${activeRegion === 'Specialized' ? 'font-medium text-primary bg-gray-100' : ''} ${isRTL ? 'text-right' : ''}`}
                  onClick={() => setActiveRegion('Specialized')}
                >
                  {t('directory.specialist')}
                </button>
              </div>
            </div>
          </div>
          
          {/* Directory content */}
          <div className="md:col-span-2">
            <div className="bg-gray-50 rounded-lg p-6 shadow-sm h-full">
              <h3 className={`text-xl font-semibold text-primary mb-4 ${isRTL ? 'text-right' : ''}`}>
                {activeRegion === 'Central' ? t('directory.central') :
                 activeRegion === 'North' ? t('directory.north') :
                 activeRegion === 'Central Governorates' ? t('directory.centralGov') :
                 activeRegion === 'South' ? t('directory.south') :
                 t('directory.specialist')}
              </h3>
              
              <div className="space-y-6">
                {isLoading ? (
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
                      <Skeleton className="h-6 w-64 mb-2" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Skeleton className="h-5 w-full mb-2" />
                          <Skeleton className="h-5 w-full mb-2" />
                          <Skeleton className="h-5 w-full" />
                        </div>
                        <div>
                          <Skeleton className="h-5 w-full mb-2" />
                          <Skeleton className="h-20 w-full" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  filteredDirectories?.map(directory => (
                    <div key={directory.id} className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className={`font-semibold text-primary mb-2 ${isRTL ? 'text-right' : ''}`}>
                        {language === 'ar' ? directory.nameAr : directory.nameEn}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="text-sm text-gray-600">
                            <i className={`fas fa-map-marker-alt text-secondary ${isRTL ? 'ml-2' : 'mr-2'}`}></i>
                            {language === 'ar' ? directory.addressAr : directory.addressEn}
                          </p>
                          <p className="text-sm text-gray-600">
                            <i className={`fas fa-phone text-secondary ${isRTL ? 'ml-2' : 'mr-2'}`}></i>
                            {directory.phone}
                          </p>
                          <p className="text-sm text-gray-600">
                            <i className={`fas fa-envelope text-secondary ${isRTL ? 'ml-2' : 'mr-2'}`}></i>
                            {directory.email}
                          </p>
                        </div>
                        <div className={isRTL ? 'text-right' : ''}>
                          <p className="text-sm text-gray-600 mb-2">
                            <strong>{t('directory.services')}:</strong>
                          </p>
                          <ul className="text-sm text-gray-600 space-y-1 pl-5 list-disc">
                            {language === 'ar' 
                              ? directory.servicesAr.map((service, idx) => (
                                  <li key={idx}>{service}</li>
                                ))
                              : directory.servicesEn.map((service, idx) => (
                                  <li key={idx}>{service}</li>
                                ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {!isLoading && filteredDirectories?.length === 0 && (
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-center text-gray-500">
                      {language === 'ar' 
                        ? 'لا توجد مديريات في هذه المنطقة' 
                        : 'No directorates in this region'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
