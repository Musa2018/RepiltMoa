import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/language-context';
import { getTranslation } from '@/lib/i18n';
import { motion } from 'framer-motion';
import palestineEmblem from '@/assets/palestine_emblem.png';

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className = '' }: LanguageToggleProps) {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const t = (key: any) => getTranslation(language, key);
  const [isAnimating, setIsAnimating] = useState(false);

  // Flag images - using SVG string for better performance and styling control
  const palestineFlag = `
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="palestine-flag-clip">
          <path d="M0 0h640v480H0z"/>
        </clipPath>
      </defs>
      <g clip-path="url(#palestine-flag-clip)">
        <path d="M0 0h640v160H0z" fill="#000"/>
        <path d="M0 160h640v160H0z" fill="#fff"/>
        <path d="M0 320h640v160H0z" fill="#008000"/>
        <path d="M0 0v480l320-240z" fill="#f00"/>
      </g>
    </svg>
  `;

  const ukFlag = `
    <svg viewBox="0 0 640 480" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="uk-flag-clip">
          <path d="M0 0h640v480H0z"/>
        </clipPath>
      </defs>
      <g clip-path="url(#uk-flag-clip)">
        <path fill="#012169" d="M0 0h640v480H0z"/>
        <path fill="#FFF" d="M75 0l244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0h75z"/>
        <path fill="#C8102E" d="M424 281l216 159v40L369 281h55zm-184 20l6 35L54 480H0l240-179zM640 0v3L391 191l2-44L590 0h50zM0 0l239 176h-60L0 42V0z"/>
        <path fill="#FFF" d="M241 0v480h160V0H241zM0 160v160h640V160H0z"/>
        <path fill="#C8102E" d="M0 193v96h640v-96H0zM273 0v480h96V0h-96z"/>
      </g>
    </svg>
  `;

  const handleToggle = () => {
    setIsAnimating(true);
    // Add a small delay before actually changing the language to allow animation to complete
    setTimeout(() => {
      toggleLanguage();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <button
      onClick={handleToggle}
      className={`relative flex items-center space-x-2 rtl:space-x-reverse rounded-md p-1.5 ${className}`}
      aria-label="Switch language"
      disabled={isAnimating}
    >
      <div className="relative h-6 w-9 overflow-hidden rounded-sm border border-gray-200 shadow-sm bg-white">
        {language === 'en' ? (
          <motion.div 
            className="absolute inset-0"
            initial={false}
            animate={{ 
              rotateY: isAnimating ? 90 : 0,
              opacity: isAnimating ? 0 : 1 
            }}
            transition={{ duration: 0.3 }}
            dangerouslySetInnerHTML={{ __html: ukFlag }}
          />
        ) : (
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{ 
              rotateY: isAnimating ? 90 : 0,
              opacity: isAnimating ? 0 : 1 
            }}
            transition={{ duration: 0.3 }}
          >
            <img 
              src={palestineEmblem} 
              alt="Palestine Emblem" 
              className="h-5 w-auto object-contain max-w-full"
            />
          </motion.div>
        )}
      </div>
      <motion.span 
        className="text-sm font-medium"
        initial={false}
        animate={{ 
          y: isAnimating ? -10 : 0,
          opacity: isAnimating ? 0 : 1 
        }}
        transition={{ duration: 0.2 }}
      >
        {language === 'en' ? 'عربي' : 'English'}
      </motion.span>
    </button>
  );
}