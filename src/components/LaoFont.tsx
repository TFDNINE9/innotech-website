'use client';

import { useLanguage } from '@/context/LanguageContext';
import { useEffect } from 'react';

// This component preloads the Lao font when Lao language is selected
const LaoFont = () => {
  const { language } = useLanguage();

  useEffect(() => {
    if (language === 'lo') {
      // Preload the font when Lao is selected
      const fontLink = document.createElement('link');
      fontLink.rel = 'preload';
      fontLink.href = '/fonts/saysettha_ot.ttf';
      fontLink.as = 'font';
      fontLink.type = 'font/ttf';
      fontLink.crossOrigin = 'anonymous';
      
      document.head.appendChild(fontLink);
      
      return () => {
        document.head.removeChild(fontLink);
      };
    }
  }, [language]);

  return null;
};

export default LaoFont;