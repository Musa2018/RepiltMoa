import { Link } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';

export const Footer = () => {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);

  return (
    <footer className="bg-gray-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.about')}</h3>
            <p className="text-gray-300 text-sm mb-4">{t('footer.aboutText')}</p>
            <div className={`flex ${isRTL ? 'space-x-reverse justify-end' : ''} space-x-4`}>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-300 hover:text-white">
                  {t('nav.news')}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-white">
                  {t('nav.resources')}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-white">
                  {t('nav.projects')}
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-300 hover:text-white">
                  {t('nav.careers')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/farmer" className="text-gray-300 hover:text-white">
                  {t('nav.services.farmer')}
                </Link>
              </li>
              <li>
                <Link href="/services/licensing" className="text-gray-300 hover:text-white">
                  {t('nav.services.licensing')}
                </Link>
              </li>
              <li>
                <Link href="/services/veterinary" className="text-gray-300 hover:text-white">
                  {t('nav.services.veterinary')}
                </Link>
              </li>
              <li>
                <Link href="/services/plant-protection" className="text-gray-300 hover:text-white">
                  {t('nav.services.plantProtection')}
                </Link>
              </li>
              <li>
                <Link href="/services/export" className="text-gray-300 hover:text-white">
                  {t('nav.services.exportCert')}
                </Link>
              </li>
              <li>
                <Link href="/services/research" className="text-gray-300 hover:text-white">
                  {t('nav.services.research')}
                </Link>
              </li>
              <li>
                <Link href="/services/training" className="text-gray-300 hover:text-white">
                  {t('nav.services.training')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Contact */}
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3 text-sm">
              <li className={`flex ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <i className={`fas fa-map-marker-alt mt-1 ${isRTL ? 'mr-0 ml-3' : 'mr-3'} text-accent`}></i>
                <span className="text-gray-300">
                  {t('contact.address.ministry')}<br/>
                  {t('contact.address.city')}<br/>
                  {t('contact.address.country')}
                </span>
              </li>
              <li className={`flex ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <i className={`fas fa-phone mt-1 ${isRTL ? 'mr-0 ml-3' : 'mr-3'} text-accent`}></i>
                <span className="text-gray-300">+970 2 240 6340</span>
              </li>
              <li className={`flex ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <i className={`fas fa-envelope mt-1 ${isRTL ? 'mr-0 ml-3' : 'mr-3'} text-accent`}></i>
                <span className="text-gray-300">info@moa.gov.ps</span>
              </li>
              <li className={`flex ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
                <i className={`fas fa-clock mt-1 ${isRTL ? 'mr-0 ml-3' : 'mr-3'} text-accent`}></i>
                <span className="text-gray-300">
                  {t('contact.hours.days')}<br/>
                  {t('contact.hours.time')}
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-400">{t('footer.rights')}</p>
            </div>
            <div className={`flex ${isRTL ? 'space-x-reverse' : ''} space-x-6`}>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                {t('footer.terms')}
              </Link>
              <Link href="/accessibility" className="text-sm text-gray-400 hover:text-white">
                {t('footer.accessibility')}
              </Link>
              <Link href="/sitemap" className="text-sm text-gray-400 hover:text-white">
                {t('footer.sitemap')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
