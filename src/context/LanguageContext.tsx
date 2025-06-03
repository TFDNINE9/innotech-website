// src/context/LanguageContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getCookie, setCookie } from '@/utils/cookies';

// Define available languages
export type Language = 'en' | 'lo';

// Define language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, section?: string) => string;
  font: string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: () => '',
  font: 'Inter',
});

// Import all language files
// In Next.js App Router, we need to use dynamic imports
// We'll define these objects manually for type safety
const translations: Record<Language, Record<string, any>> = {
  en: {
    common: {},
    home: {},
    about: {},
    vision: {},
    services: {},
    contact: {},
  },
  lo: {
    common: {},
    home: {},
    about: {},
    vision: {},
    services: {},
    contact: {},
  }
};

// Dynamic import helper function
const importTranslations = async () => {
  try {
    // English translations
    translations.en.common = (await import('@/locales/en/common.json')).default;
    translations.en.home = (await import('@/locales/en/home.json')).default;
    translations.en.about = (await import('@/locales/en/about.json')).default;
    translations.en.vision = (await import('@/locales/en/vision.json')).default;
    translations.en.services = (await import('@/locales/en/services.json')).default;
    translations.en.contact = (await import('@/locales/en/contact.json')).default;
    
    // Lao translations
    translations.lo.common = (await import('@/locales/lo/common.json')).default;
    translations.lo.home = (await import('@/locales/lo/home.json')).default;
    translations.lo.about = (await import('@/locales/lo/about.json')).default;
    translations.lo.vision = (await import('@/locales/lo/vision.json')).default;
    translations.lo.services = (await import('@/locales/lo/services.json')).default;
    translations.lo.contact = (await import('@/locales/lo/contact.json')).default;
  } catch (error) {
    console.error('Error loading translations:', error);
  }
};

// Language provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Try to get the language from cookie or browser settings
  const [language, setLanguageState] = useState<Language>('en');
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load translations
  useEffect(() => {
    importTranslations().then(() => {
      setIsLoaded(true);
    });
  }, []);
  
  // Initialize language from cookie or browser settings if available
  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== 'undefined') {
      // Try to get language from cookie
      const savedLanguage = getCookie('language') as Language;
      
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'lo')) {
        setLanguageState(savedLanguage);
        document.documentElement.lang = savedLanguage;
        return;
      }
      
      // If no cookie, try browser language
      const browserLang = navigator.language.split('-')[0].toLowerCase();
      if (browserLang === 'lo') {
        setLanguageState('lo');
        document.documentElement.lang = 'lo';
        setCookie('language', 'lo');
      }
    }
  }, []);

  // Function to set language and save to cookie
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    setCookie('language', newLanguage);
    
    // Update the HTML lang attribute
    if (typeof document !== 'undefined') {
      document.documentElement.lang = newLanguage;
    }
  };

  // Get the current font based on language
  const getFont = (lang: Language) => {
    return lang === 'lo' ? 'Saysettha OT' : 'Inter';
  };

  // Translation function
  const t = (key: string, section: string = 'common'): string => {
    if (!isLoaded) {
      return key; // Return the key itself if translations aren't loaded yet
    }
    
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    
    try {
      // Get the translation object for the current language and section
      const translationObj = translations[language][section];
      
      // Navigate through the nested keys
      let result: any = translationObj;
      for (const k of keys) {
        if (result && typeof result === 'object' && k in result) {
          result = result[k];
        } else {
          // If key not found, return the key itself
          return key;
        }
      }
      
      return result ?? key;
    } catch (error) {
      console.error(`Translation error for key: ${key} in section: ${section}`, error);
      return key;
    }
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t,
      font: getFont(language)
    }}>        
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);