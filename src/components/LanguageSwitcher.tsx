// src/components/LanguageSwitcher.tsx
'use client';

import React, { useState } from 'react';
import { useLanguage, Language } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className = '' }) => {
  const { language, setLanguage} = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'lo', name: 'ພາສາລາວ', flag: '🇱🇦' }, // Lao language in Lao script with Lao flag
  ];
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 px-3 py-2 text-sm rounded-md hover:bg-gray-800 transition-colors duration-200"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4 mr-1" />
        <span>{getCurrentLanguage()?.flag}</span>
        <span className="hidden sm:inline">{getCurrentLanguage()?.name}</span>
      </button>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 z-50"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`${
                  language === lang.code ? 'bg-gray-700 text-[#FF991C]' : 'text-gray-300'
                } group flex w-full items-center px-4 py-2 text-sm hover:bg-gray-700 hover:text-white transition-colors duration-150`}
                role="menuitem"
                onClick={() => handleLanguageChange(lang.code as Language)}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;