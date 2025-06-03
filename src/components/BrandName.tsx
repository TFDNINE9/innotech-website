'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

interface BrandNameProps {
  className?: string;
  firstPartClassName?: string;
  secondPartClassName?: string;
  translationKey?: string;
  translationSection?: string;
}

const BrandName: React.FC<BrandNameProps> = ({
  className = '',
  firstPartClassName = '',
  secondPartClassName = 'text-[#FF991C]',
  translationKey = '',
  translationSection = 'common'
}) => {
  const { t } = useLanguage();
  
  // If a translation key is provided, use it; otherwise, use the default "INNOTECH"
  if (translationKey) {
    const translatedText = t(translationKey, translationSection);
    
    // Assuming the translation maintains the format "INNOTECH" where we want to split at "TECH"
    // If the format is different in different languages, we might need a more complex approach
    const splitIndex = translatedText.lastIndexOf('TECH');
    
    if (splitIndex > 0) {
      const firstPart = translatedText.substring(0, splitIndex);
      const secondPart = translatedText.substring(splitIndex);
      
      return (
        <span className={className}>
          <span className={firstPartClassName}>{firstPart}</span>
          <span className={secondPartClassName}>{secondPart}</span>
        </span>
      );
    }
    
    // Fallback if we can't split properly
    return <span className={className}>{translatedText}</span>;
  }
  
  // Default hardcoded version
  return (
    <span className={className}>
      <span className={firstPartClassName}>INNO</span>
      <span className={secondPartClassName}>TECH</span>
    </span>
  );
};

export default BrandName;