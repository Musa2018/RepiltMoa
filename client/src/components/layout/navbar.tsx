import { Link, useLocation } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const { language, isRTL } = useLanguage();
  const [location] = useLocation();
  const t = (key: any) => getTranslation(language, key);
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  // Close mobile menu when navigation occurs
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location === path;
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleExpandItem = (key: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Properly handle RTL alignment
  const dropdownAlign = isRTL ? 'end' : 'start';

  // Mobile menu component
  const MobileMenu = () => (
    <div className="md:hidden">
      {/* Mobile menu top bar */}
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        {/* Menu icon */}
        <Button
          variant="ghost"
          className="p-1 text-primary"
          onClick={toggleMobileMenu}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        
        {/* Main navigation items for mobile */}
        <div className="flex justify-between items-center space-x-3">
          <Link 
            href="/services"
            className={`flex items-center text-primary font-medium ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}
          >
            <span>{t('nav.services')}</span>
            <ChevronDown className={`h-4 w-4 ${isRTL ? 'mr-1.5' : 'ml-1.5'}`} />
          </Link>
          
          <Link 
            href="/resources"
            className={`flex items-center text-primary font-medium ${isRTL ? "flex-row-reverse text-right" : "text-left"}`}
          >
            <span>{t('nav.resources')}</span>
            <ChevronDown className={`h-4 w-4 ${isRTL ? 'mr-1.5' : 'ml-1.5'}`} />
          </Link>
          
          <Link 
            href="/news"
            className={`text-primary font-medium ${isActive('/news') ? "underline decoration-2 underline-offset-4" : ""}`}
          >
            {t('nav.news')}
          </Link>
        </div>
      </div>
    </div>
  );

  // Desktop menu component
  const DesktopMenu = () => (
    <ul className={`hidden md:flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-center md:justify-${isRTL ? 'end' : 'start'} space-x-6 md:space-x-8 ${isRTL ? 'space-x-reverse' : ''}`}>
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
            <Link
              href="#"
              className={`px-4 py-2.5 text-base font-medium rounded-md text-primary hover:bg-gray-100 transition flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('nav.about')} <ChevronDown className={`h-4 w-4 ${isRTL ? 'mr-1.5' : 'ml-1.5'}`} />
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={dropdownAlign} side="bottom" sideOffset={5} className={`w-56 mt-0 ${isRTL ? 'text-right' : 'text-left'}`}>
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
            <Link
              href="#"
              className={`px-4 py-2.5 text-base font-medium rounded-md text-primary hover:bg-gray-100 transition flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('nav.services')} <ChevronDown className={`h-4 w-4 ${isRTL ? 'mr-1.5' : 'ml-1.5'}`} />
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={dropdownAlign} side="bottom" sideOffset={5} className={`w-56 mt-0 ${isRTL ? 'text-right' : 'text-left'}`}>
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
            <Link
              href="#"
              className={`px-4 py-2.5 text-base font-medium rounded-md text-primary hover:bg-gray-100 transition flex items-center ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              {t('nav.resources')} <ChevronDown className={`h-4 w-4 ${isRTL ? 'mr-1.5' : 'ml-1.5'}`} />
            </Link>
          </DropdownMenuTrigger>
          <DropdownMenuContent align={dropdownAlign} side="bottom" sideOffset={5} className={`w-56 mt-0 ${isRTL ? 'text-right' : 'text-left'}`}>
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
  );

  return (
    <nav className="relative">
      <MobileMenu />
      <DesktopMenu />
      
      {/* Mobile expanded menu */}
      {isMobile && mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-3 mt-2">
          <ul className="flex flex-col gap-2">
            <li>
              <Link href="/" className="block px-3 py-2 rounded hover:bg-gray-100 text-primary">
                {t('nav.home')}
              </Link>
            </li>
            <li>
              <Link href="/about" className="block px-3 py-2 rounded hover:bg-gray-100 text-primary">
                {t('nav.about')}
              </Link>
            </li>
            <li>
              <Link href="/projects" className="block px-3 py-2 rounded hover:bg-gray-100 text-primary">
                {t('nav.projects')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="block px-3 py-2 rounded hover:bg-gray-100 text-primary">
                {t('nav.contact')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};