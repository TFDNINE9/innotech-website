'use client';

import React, { useEffect, useState } from 'react';

interface TranslationLoadingProps {
  children: React.ReactNode;
}

const TranslationLoading: React.FC<TranslationLoadingProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate a brief loading period for translations
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#FF991C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading translations...</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default TranslationLoading;