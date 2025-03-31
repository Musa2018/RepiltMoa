import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { Navbar } from './navbar';

export const Header = () => {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);

  return (
    <header className="bg-white shadow-md">
      {/* Top bar with language switcher and quick links */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-3 md:px-6 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm hidden md:inline">{isRTL ? 'الموقع الرسمي لوزارة الزراعة الفلسطينية' : 'Official Website of the Palestinian Ministry of Agriculture'}</span>
          </div>
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <LanguageToggle className="text-white hover:text-accent-light transition" />
            <Link href="/login" className="text-sm hover:text-accent-light transition flex items-center">
              {isRTL ? (
                <>
                  {t('login')} <i className="fas fa-sign-in-alt ml-1"></i>
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt mr-1"></i> {t('login')}
                </>
              )}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="container mx-auto px-3 md:px-6 py-3 md:py-4">
        {/* Desktop header layout */}
        <div className="hidden md:flex flex-row justify-between items-center mb-4">
          <div className="flex items-center">
            <svg 
              className="h-14 w-14 mr-3 rtl:ml-3 rtl:mr-0 text-primary" 
              viewBox="0 0 100 100" 
              fill="currentColor"
            >
              <path d="M50,10 C70,10 85,25 85,50 C85,75 70,90 50,90 C30,90 15,75 15,50 C15,25 30,10 50,10 Z M50,20 C35,20 25,35 25,50 C25,65 35,80 50,80 C65,80 75,65 75,50 C75,35 65,20 50,20 Z M40,40 L60,40 L60,60 L40,60 Z" />
              <path d="M50,0 L50,100 M0,50 L100,50" strokeWidth="5" stroke="currentColor" fill="none" />
            </svg>
            <div className={isRTL ? 'text-right' : ''}>
              <h1 className="text-xl font-bold text-primary">{t('site.name')}</h1>
              <h2 className={`text-sm text-gray-600 ${isRTL ? 'lang-ar' : 'lang-en'}`}>
                {isRTL ? 'Palestinian Ministry of Agriculture' : 'وزارة الزراعة الفلسطينية'}
              </h2>
            </div>
          </div>
          
          <div className="w-auto">
            <div className="relative">
              <Input 
                type="text" 
                placeholder={t('search.placeholder')} 
                className={`w-64 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary`}
              />
              <i className={`fas fa-search absolute ${isRTL ? 'right-3' : 'left-3'} top-3 text-gray-400`}></i>
            </div>
          </div>
        </div>
        
        {/* Mobile header layout - matching the provided screenshot */}
        <div className="flex md:hidden flex-col mb-3">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <svg 
                className="h-10 w-10 text-primary" 
                viewBox="0 0 100 100" 
                fill="currentColor"
              >
                <path d="M50,10 C70,10 85,25 85,50 C85,75 70,90 50,90 C30,90 15,75 15,50 C15,25 30,10 50,10 Z M50,20 C35,20 25,35 25,50 C25,65 35,80 50,80 C65,80 75,65 75,50 C75,35 65,20 50,20 Z M40,40 L60,40 L60,60 L40,60 Z" />
                <path d="M50,0 L50,100 M0,50 L100,50" strokeWidth="5" stroke="currentColor" fill="none" />
              </svg>
              <div>
                <h1 className="text-lg font-bold text-primary">
                  {t('site.name')}
                </h1>
                <p className="text-xs text-gray-600">
                  {isRTL ? 'Palestinian Ministry of Agriculture' : 'وزارة الزراعة الفلسطينية'}
                </p>
              </div>
            </div>
          </div>
          
          {/* Search input */}
          <div className="mb-3 w-full">
            <div className="relative">
              <Input 
                type="text" 
                placeholder={t('search.placeholder')} 
                className={`w-full h-10 ${isRTL ? 'pr-10 pl-3' : 'pl-10 pr-3'} rounded-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary`}
              />
              <i className={`fas fa-search absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-gray-400`}></i>
            </div>
          </div>
        </div>
        
        <Navbar />
      </div>
    </header>
  );
};
