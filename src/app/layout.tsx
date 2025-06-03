import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import '@/styles/fonts.css'; // Import custom fonts
import LanguageProviderWrapper from '@/components/LanguageProviderWrapper';
import LanguageAttribute from '@/components/LanguageAttribute';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Innotech Service - Transform Your Business with Technology',
  description: 'Leading technology service provider offering custom software development, cloud solutions, cybersecurity, and IT consulting to transform businesses worldwide.',
  keywords: 'technology services, software development, cloud solutions, cybersecurity, IT consulting, digital transformation',
  authors: [{ name: 'Innotech Service' }],
  creator: 'Innotech Service',
  publisher: 'Innotech Service',
  openGraph: {
    title: 'Innotech Service - Transform Your Business with Technology',
    description: 'Leading technology service provider offering innovative solutions for digital transformation.',
    url: 'https://innotechservice.com',
    siteName: 'Innotech Service',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Innotech Service - Technology Solutions',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Innotech Service - Transform Your Business with Technology',
    description: 'Leading technology service provider offering innovative solutions for digital transformation.',
    images: ['/twitter-image.jpg'],
    creator: '@innotechservice',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.className}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
        <meta name="theme-color" content="#111827" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <LanguageProviderWrapper>
          <LanguageAttribute />
          <div id="__next">
            {children}
          </div>
        </LanguageProviderWrapper>
      </body>
    </html>
  );
}