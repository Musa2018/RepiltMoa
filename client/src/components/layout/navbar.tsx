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

  const dropdownAlign = isRTL ? 'end' : 'start';
  const dropdownSide = isRTL ? 'right' : 'left';


  return (
    <nav className="mt-6">
      <ul className={`flex flex-wrap justify-center md:justify-start ${isRTL ? 'space-x-reverse' : ''} space-x-1 md:space-x-2`}>
        <li>
          <Link href="/">
            <a className={`px-3 py-2 rounded-md ${isActive('/') ? 'text-white bg-primary hover:bg-primary-light' : 'text-primary hover:bg-gray-100'} transition`}>
              {t('nav.home')}
            </a>
          </Link>
        </li>

        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-3 py-2 rounded-md text-primary hover:bg-gray-100 transition flex items-center">
                {t('nav.about')} <ChevronDown className="ml-1 rtl:mr-1 rtl:ml-0 h-4 w-4 text-primary" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={dropdownAlign} side="bottom" sideOffset={8} className="w-48">
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/about/overview" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.about.overview')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/about/vision" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.about.vision')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/about/leadership" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.about.leadership')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/about/plan" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.about.plan')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-3 py-2 rounded-md text-primary hover:bg-gray-100 transition flex items-center">
                {t('nav.services')} <ChevronDown className="ml-1 rtl:mr-1 rtl:ml-0 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={dropdownAlign} side="bottom" sideOffset={8} className="w-48">
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/services/farmer" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.services.farmer')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/services/veterinary" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.services.veterinary')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/services/licensing" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.services.licensing')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/services/research" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.services.research')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="px-3 py-2 rounded-md text-primary hover:bg-gray-100 transition flex items-center">
                {t('nav.resources')} <ChevronDown className="ml-1 rtl:mr-1 rtl:ml-0 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={dropdownAlign} side="bottom" sideOffset={8} className="w-48">
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/resources/publications" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.resources.publications')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/resources/studies" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.resources.studies')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/resources/guidelines" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.resources.guidelines')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rtl:text-right">
                <Link href="/resources/educational" className="w-full text-primary hover:text-primary-foreground">
                  {t('nav.resources.educational')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li>
          <Link href="/news">
            <a className={`px-3 py-2 rounded-md ${isActive('/news') ? 'text-white bg-primary hover:bg-primary-light' : 'text-primary hover:bg-gray-100'} transition`}>
              {t('nav.news')}
            </a>
          </Link>
        </li>

        <li>
          <Link href="/projects">
            <a className={`px-3 py-2 rounded-md ${isActive('/projects') ? 'text-white bg-primary hover:bg-primary-light' : 'text-primary hover:bg-gray-100'} transition`}>
              {t('nav.projects')}
            </a>
          </Link>
        </li>

        <li>
          <Link href="/contact">
            <a className={`px-3 py-2 rounded-md ${isActive('/contact') ? 'text-white bg-primary hover:bg-primary-light' : 'text-primary hover:bg-gray-100'} transition`}>
              {t('nav.contact')}
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};