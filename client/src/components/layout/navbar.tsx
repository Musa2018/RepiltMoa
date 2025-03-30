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
                {t('nav.about')} <ChevronDown className="ml-1 rtl:mr-1 rtl:ml-0 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={isRTL ? 'end' : 'start'} className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/about/overview">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.about.overview')}
                  </a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about/vision">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.about.vision')}
                  </a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about/leadership">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.about.leadership')}
                  </a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/about/plan">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.about.plan')}
                  </a>
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
            <DropdownMenuContent align={isRTL ? 'end' : 'start'} className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/services/farmer">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.services.farmer')}
                  </a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/veterinary">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.services.veterinary')}
                  </a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/licensing">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.services.licensing')}
                  </a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/services/research">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.services.research')}
                  </a>
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
            <DropdownMenuContent align={isRTL ? 'end' : 'start'} className="w-48">
              <DropdownMenuItem asChild>
                <Link href="/resources/publications">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.resources.publications')}
                  </a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/resources/studies">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.resources.studies')}
                  </a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/resources/guidelines">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.resources.guidelines')}
                  </a>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/resources/educational">
                  <a className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t('nav.resources.educational')}
                  </a>
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