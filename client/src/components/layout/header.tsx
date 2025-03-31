import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Navbar } from './navbar';

export const Header = () => {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);

  return (
    <header className="bg-white shadow-md">
      {/* Top bar with language switcher and quick links */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-sm hidden md:inline">{isRTL ? 'الموقع الرسمي لوزارة الزراعة الفلسطينية' : 'Official Website of the Palestinian Ministry of Agriculture'}</span>
          </div>
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={toggleLanguage}
              className="text-sm flex items-center"
              aria-label="Switch language"
            >
              <i className="fas fa-globe mr-1 rtl:ml-1 rtl:mr-0"></i>
              <span>{t('langSwitch')}</span>
            </button>
            <Link href="/login" className="text-sm hover:text-accent-light transition">
              <i className="fas fa-sign-in-alt mr-1 rtl:ml-1 rtl:mr-0"></i> {t('login')}
            </Link>
          </div>
        </div>
      </div>
      
      {/* Main navigation */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <svg 
              className="h-16 w-16 mr-4 rtl:ml-4 rtl:mr-0 text-primary" 
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
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <Input 
                type="text" 
                placeholder={t('search.placeholder')} 
                className={`w-full md:w-64 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} py-2 rounded-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary`}
              />
              <i className={`fas fa-search absolute ${isRTL ? 'right-3' : 'left-3'} top-3 text-gray-400`}></i>
            </div>
          </div>
        </div>
        
        <Navbar />
      </div>
    </header>
  );
};
