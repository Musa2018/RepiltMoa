import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { language, isRTL } = useLanguage();
  const [location] = useLocation();
  const t = (key: any) => getTranslation(language, key);

  const isActive = (path: string) => {
    return location === path;
  };

  // Properly handle RTL alignment
  const dropdownAlign = isRTL ? 'end' : 'start';

  return (
    <nav className="mt-6">
      {/* Fixed space-x direction for RTL support */}
      <ul className={`flex flex-wrap ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-center md:justify-${isRTL ? 'end' : 'start'} space-x-2 md:space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
        <li>
          <Link 
            href="/" 
            className={`px-4 py-2.5 text-base font-medium rounded-md ${
              isActive('/') 
                ? 'text-white bg-primary hover:bg-primary-light' 
                : 'text-primary hover:bg-gray-100'
              } transition`}
          >
            {t('nav.home')}
          </Link>
        </li>

        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`px-4 py-2.5 text-base font-medium rounded-md text-primary hover:bg-gray-100 transition flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t('nav.about')} <ChevronDown className={`h-4 w-4 ${isRTL ? 'mr-1.5' : 'ml-1.5'}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={dropdownAlign} side="bottom" sideOffset={8} className={`w-56 ${isRTL ? 'text-right' : 'text-left'}`}>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/about/overview" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.about.overview')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/about/vision" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.about.vision')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/about/leadership" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.about.leadership')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/about/plan" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.about.plan')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`px-4 py-2.5 text-base font-medium rounded-md text-primary hover:bg-gray-100 transition flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t('nav.services')} <ChevronDown className={`h-4 w-4 ${isRTL ? 'mr-1.5' : 'ml-1.5'}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={dropdownAlign} side="bottom" sideOffset={8} className={`w-56 ${isRTL ? 'text-right' : 'text-left'}`}>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/services/farmer" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.services.farmer')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/services/veterinary" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.services.veterinary')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/services/licensing" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.services.licensing')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/services/research" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.services.research')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className={`px-4 py-2.5 text-base font-medium rounded-md text-primary hover:bg-gray-100 transition flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
              >
                {t('nav.resources')} <ChevronDown className={`h-4 w-4 ${isRTL ? 'mr-1.5' : 'ml-1.5'}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={dropdownAlign} side="bottom" sideOffset={8} className={`w-56 ${isRTL ? 'text-right' : 'text-left'}`}>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/resources/publications" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.resources.publications')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/resources/studies" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.resources.studies')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/resources/guidelines" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.resources.guidelines')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem rtl={isRTL} asChild>
                <Link href="/resources/educational" className={`w-full px-4 py-2.5 text-base text-gray-700 hover:bg-gray-100 ${isRTL ? 'text-right' : 'text-left'}`}>
                  {t('nav.resources.educational')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li>
          <Link 
            href="/news" 
            className={`px-4 py-2.5 text-base font-medium rounded-md ${
              isActive('/news') 
                ? 'text-white bg-primary hover:bg-primary-light' 
                : 'text-primary hover:bg-gray-100'
              } transition`}
          >
            {t('nav.news')}
          </Link>
        </li>

        <li>
          <Link 
            href="/projects" 
            className={`px-4 py-2.5 text-base font-medium rounded-md ${
              isActive('/projects') 
                ? 'text-white bg-primary hover:bg-primary-light' 
                : 'text-primary hover:bg-gray-100'
              } transition`}
          >
            {t('nav.projects')}
          </Link>
        </li>

        <li>
          <Link 
            href="/contact" 
            className={`px-4 py-2.5 text-base font-medium rounded-md ${
              isActive('/contact') 
                ? 'text-white bg-primary hover:bg-primary-light' 
                : 'text-primary hover:bg-gray-100'
              } transition`}
          >
            {t('nav.contact')}
          </Link>
        </li>
      </ul>
    </nav>
  );
};