// src/app/contact/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ContactPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page, the Layout component will handle scrolling
    router.replace('/');
  }, [router]);

  return null;
};

export default ContactPage;