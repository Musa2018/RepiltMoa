import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { Resource } from '@/types/content';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const ResourceCenter = () => {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  // Get unique categories for the sidebar
  const categories = resources 
    ? Array.from(new Set(resources.map(resource => resource.category)))
    : [];

  // Count resources by category
  const categoryCount = resources?.reduce((acc, resource) => {
    acc[resource.category] = (acc[resource.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Get unique file types
  const fileTypes = resources 
    ? Array.from(new Set(resources.map(resource => resource.fileType)))
    : [];

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return 'fas fa-file-pdf';
      case 'XLSX':
        return 'fas fa-file-excel';
      case 'PPT':
        return 'fas fa-file-powerpoint';
      case 'Video':
        return 'fas fa-video';
      case 'CSV':
        return 'fas fa-file-csv';
      default:
        return 'fas fa-file-alt';
    }
  };

  const getActionText = (fileType: string) => {
    if (fileType === 'Video') {
      return t('resources.watch');
    }
    return t('resources.download');
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className={`text-2xl font-bold text-primary mb-8 ${isRTL ? 'text-right' : ''}`}>
          {t('resources.title')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {isLoading ? (
                Array(6).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <Skeleton className="w-full h-24 mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-20 w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>
                ))
              ) : (
                resources?.slice(0, 6).map((resource) => (
                  <div key={resource.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
                    <div className="flex items-center justify-center bg-primary/10 rounded-lg p-4 mb-4">
                      <i className={`${getFileIcon(resource.fileType)} text-primary text-3xl`}></i>
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' ? resource.titleAr : resource.titleEn}
                    </h3>
                    <p className={`text-gray-600 text-sm mb-4 ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' ? resource.descriptionAr : resource.descriptionEn}
                    </p>
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs text-gray-500">{resource.fileType} • {resource.fileSize}</span>
                      <Link href={resource.fileUrl} className="text-primary hover:text-primary-light font-semibold text-sm">
                        {getActionText(resource.fileType)}
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          
          {/* Resource categories sidebar */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className={`font-semibold text-lg mb-4 pb-2 border-b ${isRTL ? 'text-right' : ''}`}>
              {t('resources.categories')}
            </h3>
            <ul className="space-y-2">
              {isLoading ? (
                Array(8).fill(0).map((_, index) => (
                  <li key={index}>
                    <Skeleton className="h-10 w-full rounded" />
                  </li>
                ))
              ) : (
                categories.map((category) => (
                  <li key={category}>
                    <Link href={`/resources/category/${encodeURIComponent(category)}`} className={`flex items-center justify-between p-2 rounded hover:bg-gray-100 ${isRTL ? 'flex-row-reverse' : ''}`}>
                      {category}
                      <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                        {categoryCount[category]}
                      </span>
                    </Link>
                  </li>
                ))
              )}
            </ul>
            
            <div className="mt-6 pt-4 border-t">
              <h4 className={`font-medium mb-3 ${isRTL ? 'text-right' : ''}`}>
                {t('resources.formats')}
              </h4>
              <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
                {isLoading ? (
                  Array(5).fill(0).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-16 rounded-full" />
                  ))
                ) : (
                  fileTypes.map((fileType) => (
                    <Link key={fileType} href={`/resources/type/${encodeURIComponent(fileType)}`} className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">
                      {fileType}
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/resources">
            <Button className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-light transition font-semibold">
              <i className={`fas fa-book-open ${isRTL ? 'ml-2' : 'mr-2'}`}></i>
              {t('resources.browseAll')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
