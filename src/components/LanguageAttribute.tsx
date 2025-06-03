'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

const LanguageAttribute = () => {
  const { language } = useLanguage();
  
  useEffect(() => {
    if (document && document.documentElement) {
      document.documentElement.lang = language;
    }
  }, [language]);
  
  // This component doesn't render anything
  return null;
};

export default LanguageAttribute;