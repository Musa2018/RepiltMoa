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
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.about')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.services')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/news">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.news')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/resources">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.resources')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/projects">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.projects')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/careers">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.careers')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.contact')}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Services */}
          <div className={isRTL ? 'text-right' : ''}>
            <h3 className="text-lg font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services/farmer">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.services.farmer')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services/licensing">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.services.licensing')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services/veterinary">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.services.veterinary')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services/plant-protection">
                  <a className="text-gray-300 hover:text-white">
                    Plant Protection
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services/export">
                  <a className="text-gray-300 hover:text-white">
                    Export Certification
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services/research">
                  <a className="text-gray-300 hover:text-white">
                    {t('nav.services.research')}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services/training">
                  <a className="text-gray-300 hover:text-white">
                    Training & Workshops
                  </a>
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
                  Ministry of Agriculture<br/>
                  Al-Bireh, Ramallah<br/>
                  Palestine
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
                  Sunday-Thursday<br/>
                  8:00 AM - 3:00 PM
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
              <Link href="/privacy">
                <a className="text-sm text-gray-400 hover:text-white">
                  {t('footer.privacy')}
                </a>
              </Link>
              <Link href="/terms">
                <a className="text-sm text-gray-400 hover:text-white">
                  {t('footer.terms')}
                </a>
              </Link>
              <Link href="/accessibility">
                <a className="text-sm text-gray-400 hover:text-white">
                  {t('footer.accessibility')}
                </a>
              </Link>
              <Link href="/sitemap">
                <a className="text-sm text-gray-400 hover:text-white">
                  {t('footer.sitemap')}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
