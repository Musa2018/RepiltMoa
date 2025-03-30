import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { useParams, Link } from 'wouter';
import { Resource } from '@/types/content';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function Resources() {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  const { category, type } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  // Get unique categories for the sidebar
  const categories = resources 
    ? [...new Set(resources.map(resource => resource.category))]
    : [];

  // Count resources by category
  const categoryCount = resources?.reduce((acc, resource) => {
    acc[resource.category] = (acc[resource.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) || {};

  // Get unique file types
  const fileTypes = resources 
    ? [...new Set(resources.map(resource => resource.fileType))]
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

  // Filter resources based on category, type, and search
  const filteredResources = resources?.filter(resource => {
    const matchesCategory = category ? resource.category === decodeURIComponent(category) : true;
    const matchesType = type ? resource.fileType === decodeURIComponent(type) : true;
    const matchesSearch = searchTerm 
      ? (language === 'ar' 
          ? resource.titleAr.toLowerCase().includes(searchTerm.toLowerCase()) || 
            resource.descriptionAr.toLowerCase().includes(searchTerm.toLowerCase())
          : resource.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
            resource.descriptionEn.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : true;
    
    return matchesCategory && matchesType && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className={`mb-8 ${isRTL ? 'text-right' : ''}`}>
        <h1 className="text-3xl font-bold text-primary mb-2">{t('resources.title')}</h1>
        <p className="text-gray-600">
          {language === 'ar' 
            ? 'اكتشف مكتبة الموارد الزراعية الشاملة التي تقدمها وزارة الزراعة، بما في ذلك الأدلة الفنية والتقارير والدراسات البحثية.'
            : 'Explore the comprehensive agricultural resource library provided by the Ministry of Agriculture, including technical guides, reports, and research studies.'}
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className={`font-semibold text-lg mb-4 pb-2 border-b ${isRTL ? 'text-right' : ''}`}>
              {language === 'ar' ? 'البحث في الموارد' : 'Search Resources'}
            </h3>
            <div className="relative">
              <Input
                type="text"
                placeholder={language === 'ar' ? 'ابحث عن موارد...' : 'Search resources...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full ${isRTL ? 'pr-10' : 'pl-10'}`}
              />
              <i className={`fas fa-search absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`}></i>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className={`font-semibold text-lg mb-4 pb-2 border-b ${isRTL ? 'text-right' : ''}`}>
              {t('resources.categories')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/resources">
                  <a className={`flex items-center justify-between p-2 rounded hover:bg-gray-100 ${category ? '' : 'bg-gray-100 font-medium text-primary'} ${isRTL ? 'flex-row-reverse' : ''}`}>
                    {language === 'ar' ? 'جميع الفئات' : 'All Categories'}
                    <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                      {resources?.length || 0}
                    </span>
                  </a>
                </Link>
              </li>
              {isLoading ? (
                Array(6).fill(0).map((_, index) => (
                  <li key={index}>
                    <Skeleton className="h-10 w-full rounded" />
                  </li>
                ))
              ) : (
                categories.map((cat) => (
                  <li key={cat}>
                    <Link href={`/resources/category/${encodeURIComponent(cat)}`}>
                      <a className={`flex items-center justify-between p-2 rounded hover:bg-gray-100 ${category === encodeURIComponent(cat) ? 'bg-gray-100 font-medium text-primary' : ''} ${isRTL ? 'flex-row-reverse' : ''}`}>
                        {cat}
                        <span className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-xs">
                          {categoryCount[cat]}
                        </span>
                      </a>
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className={`font-semibold text-lg mb-4 pb-2 border-b ${isRTL ? 'text-right' : ''}`}>
              {t('resources.formats')}
            </h3>
            <div className={`flex flex-wrap gap-2 ${isRTL ? 'justify-end' : ''}`}>
              {isLoading ? (
                Array(5).fill(0).map((_, index) => (
                  <Skeleton key={index} className="h-8 w-16 rounded-full" />
                ))
              ) : (
                <>
                  <Link href="/resources">
                    <a className={`px-3 py-1 ${!type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 rounded-full text-sm`}>
                      {language === 'ar' ? 'الكل' : 'All'}
                    </a>
                  </Link>
                  {fileTypes.map((fileType) => (
                    <Link key={fileType} href={`/resources/type/${encodeURIComponent(fileType)}`}>
                      <a className={`px-3 py-1 ${type === encodeURIComponent(fileType) ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 rounded-full text-sm`}>
                        {fileType}
                      </a>
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-3/4">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className={`flex justify-between items-center mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <h2 className="text-xl font-semibold text-primary">
                {category 
                  ? `${language === 'ar' ? 'فئة: ' : 'Category: '} ${decodeURIComponent(category)}` 
                  : type 
                    ? `${language === 'ar' ? 'نوع الملف: ' : 'File Type: '} ${decodeURIComponent(type)}`
                    : language === 'ar' ? 'جميع الموارد' : 'All Resources'}
              </h2>
              <span className="text-gray-500">
                {filteredResources?.length || 0} {language === 'ar' ? 'نتيجة' : 'results'}
              </span>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array(9).fill(0).map((_, index) => (
                  <div key={index} className="bg-white rounded-lg p-6 border shadow-sm">
                    <Skeleton className="w-full h-24 mb-4" />
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-16 w-full mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredResources?.length === 0 ? (
              <div className="text-center py-10">
                <i className="fas fa-search text-gray-300 text-5xl mb-4"></i>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {language === 'ar' ? 'لا توجد نتائج' : 'No results found'}
                </h3>
                <p className="text-gray-500">
                  {language === 'ar' 
                    ? 'لم نتمكن من العثور على موارد تطابق معايير البحث الخاصة بك.' 
                    : 'We couldn\'t find any resources matching your search criteria.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources?.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-lg p-6 border shadow-sm hover:shadow-md transition">
                    <div className="flex items-center justify-center bg-primary/10 rounded-lg p-4 mb-4">
                      <i className={`${getFileIcon(resource.fileType)} text-primary text-3xl`}></i>
                    </div>
                    <h3 className={`font-semibold text-lg mb-2 ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' ? resource.titleAr : resource.titleEn}
                    </h3>
                    <p className={`text-gray-600 text-sm mb-4 line-clamp-3 ${isRTL ? 'text-right' : ''}`}>
                      {language === 'ar' ? resource.descriptionAr : resource.descriptionEn}
                    </p>
                    <div className={`flex justify-between items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                      <span className="text-xs text-gray-500">{resource.fileType} • {resource.fileSize}</span>
                      <Link href={resource.fileUrl}>
                        <a className="text-primary hover:text-primary-light font-semibold text-sm">
                          {getActionText(resource.fileType)}
                        </a>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Related resources or featured content */}
          {!category && !type && !searchTerm && (
            <div className="bg-primary/5 rounded-lg p-6 border border-primary/20">
              <h3 className={`text-lg font-semibold text-primary mb-4 ${isRTL ? 'text-right' : ''}`}>
                {language === 'ar' ? 'موارد مميزة' : 'Featured Resources'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`bg-white p-4 rounded-lg flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`bg-accent/10 p-3 rounded-full ${isRTL ? 'ml-3' : 'mr-3'}`}>
                    <i className="fas fa-star text-accent"></i>
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h4 className="font-medium text-primary">
                      {language === 'ar' ? 'دليل الممارسات الزراعية الجيدة' : 'Good Agricultural Practices Guide'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'ar' 
                        ? 'دليل شامل للممارسات الزراعية المستدامة والصديقة للبيئة'
                        : 'Comprehensive guide for sustainable and environmentally friendly agricultural practices'}
                    </p>
                  </div>
                </div>
                <div className={`bg-white p-4 rounded-lg flex items-start ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`bg-secondary/10 p-3 rounded-full ${isRTL ? 'ml-3' : 'mr-3'}`}>
                    <i className="fas fa-award text-secondary"></i>
                  </div>
                  <div className={isRTL ? 'text-right' : ''}>
                    <h4 className="font-medium text-primary">
                      {language === 'ar' ? 'دليل تربية النحل وإنتاج العسل' : 'Beekeeping and Honey Production Manual'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'ar'
                        ? 'مرجع متكامل لمربي النحل الجدد والمتمرسين'
                        : 'Comprehensive reference for new and experienced beekeepers'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
