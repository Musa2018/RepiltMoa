import { Link } from 'wouter';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const { language, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);

  return (
    <section className="relative bg-primary overflow-hidden min-h-[60vh] flex items-center">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-24 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className={`w-full md:w-1/2 space-y-6 ${isRTL ? 'md:order-2 text-right' : ''}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('site.slogan')}</h2>
            <p className="text-white text-lg mb-6">{t('site.tagline')}</p>
            <div className={`flex flex-wrap gap-4 ${isRTL ? 'justify-end' : ''}`}>
              <Link href="/services/farmer">
                <Button variant="outline" className="px-6 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition font-semibold">
                  {t('home.hero.btn.farmer')}
                </Button>
              </Link>
              <Link href="/resources">
                <Button variant="outline" className="px-6 py-3 bg-white text-primary rounded-md hover:bg-gray-100 transition font-semibold">
                  {t('home.hero.btn.resources')}
                </Button>
              </Link>
            </div>
          </div>
          <div className={`w-full md:w-1/2 ${isRTL ? 'md:order-1' : ''}`}>
            <img 
              src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" 
              alt="Palestinian farmers at work" 
              className="rounded-lg shadow-lg w-full h-auto object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#007f45] to-transparent"></div>
    </section>
  );
};
