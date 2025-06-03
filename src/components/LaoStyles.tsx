'use client';

import { useLanguage } from '@/context/LanguageContext';

// Component that injects Lao-specific styles when needed
const LaoStyles: React.FC = () => {
    const { language } = useLanguage();

    if (language !== 'lo') return null;

    return (
        <style jsx global>{`
      /* Fix for call-to-action section */
      section h2 {
        line-height: 2 !important;
        margin-bottom: 1.5rem !important;
      }

        section h1 {
          line-height: 1.5 !important;
           
        }
      
      section p {
        line-height: 1.8 !important;
        margin-bottom: 1.5rem !important;
      }
      
      /* Fix specific issue with call-to-action */
      .max-w-3xl h2 {
        line-height: 2 !important;
        margin-bottom: 2rem !important;
      }
      
      .max-w-3xl p {
        line-height: 1.8 !important;
        margin-bottom: 2rem !important;
        max-width: 90% !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
    `}</style>
    );
};

export default LaoStyles;