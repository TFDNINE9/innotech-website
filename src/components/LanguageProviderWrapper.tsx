'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import TranslationLoading from './TranslationLoading';
import LaoFont from './LaoFont';
import LaoStyles from './LaoStyles';

interface LanguageProviderWrapperProps {
  children: React.ReactNode;
}

const LanguageProviderWrapper: React.FC<LanguageProviderWrapperProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <LaoFont />
      <LaoStyles />
      <TranslationLoading>
        {children}
      </TranslationLoading>
    </LanguageProvider>
  );
};

export default LanguageProviderWrapper;