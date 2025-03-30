
import { Link } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem } from '@/components/ui/navigation-menu';

export function Header() {
  const { language, isRTL, toggleLanguage } = useLanguage();
  const t = (key: string) => language === 'ar' ? translations.ar[key] : translations.en[key];

  const translations = {
    en: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      resources: 'Resources',
      news: 'News',
      projects: 'Projects',
      contact: 'Contact Us',
      login: 'Login'
    },
    ar: {
      home: 'الرئيسية',
      about: 'عن الوزارة',
      services: 'الخدمات',
      resources: 'الموارد',
      news: 'الأخبار',
      projects: 'المشاريع',
      contact: 'اتصل بنا',
      login: 'تسجيل الدخول'
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="text-xl font-bold text-primary">
                {t('home')}
              </a>
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList className={`flex gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <NavigationMenuItem>
                  <Link href="/about">
                    <a className="text-gray-600 hover:text-primary">{t('about')}</a>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/services">
                    <a className="text-gray-600 hover:text-primary">{t('services')}</a>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/resources">
                    <a className="text-gray-600 hover:text-primary">{t('resources')}</a>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/news">
                    <a className="text-gray-600 hover:text-primary">{t('news')}</a>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/projects">
                    <a className="text-gray-600 hover:text-primary">{t('projects')}</a>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact">
                    <a className="text-gray-600 hover:text-primary">{t('contact')}</a>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1 text-sm rounded-md bg-primary/10 text-primary hover:bg-primary/20"
            >
              {language === 'ar' ? 'English' : 'العربية'}
            </button>
            <Link href="/login">
              <a className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90">
                {t('login')}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
