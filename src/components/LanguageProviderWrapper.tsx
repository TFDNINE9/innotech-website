'use client';

import React from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import TranslationLoading from './TranslationLoading';
import LaoFont from './LaoFont';

interface LanguageProviderWrapperProps {
  children: React.ReactNode;
}

const LanguageProviderWrapper: React.FC<LanguageProviderWrapperProps> = ({ children }) => {
  return (
    <LanguageProvider>
      <LaoFont />
      <TranslationLoading>
        {children}
      </TranslationLoading>
    </LanguageProvider>
  );
};

export default LanguageProviderWrapper;