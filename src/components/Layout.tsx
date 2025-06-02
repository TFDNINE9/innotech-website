// src/components/Layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/#home', section: 'home' },
    { name: 'About Us', href: '/#about', section: 'about' },
    { name: 'Vision', href: '/#vision', section: 'vision' },
    { name: 'Services', href: '/#services', section: 'services' },
    { name: 'Contact', href: '/#contact', section: 'contact' },
  ];

  const isActive = (href: string, section: string) => {
    return activeSection === section;
  };

  const handleNavClick = (e: React.MouseEvent, href: string, section: string) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(section);
        setIsMenuOpen(false);
        // Update URL without triggering navigation
        window.history.pushState(null, '', href);
      }
    }
    setIsMenuOpen(false);
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Intersection Observer to track active section
  useEffect(() => {
    if (!mounted) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    const sections = ['home', 'about', 'vision', 'services', 'contact'];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  // Handle initial load with hash
  useEffect(() => {
    if (!mounted) return;
    
    const hash = window.location.hash;
    if (hash) {
      const section = hash.substring(1);
      setActiveSection(section);
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
    }
  }, [mounted]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <nav className="fixed top-0 w-full bg-gray-950/95 backdrop-blur-sm border-b border-gray-800 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/#home" className="flex items-center">
                <img 
                  src="/images/Logo-Horizontal-Negative.png" 
                  alt="Innotech Service Logo" 
                  className="h-8 sm:h-10 w-auto"
                />
              </Link>
            </div>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white text-render">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-950/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href="/#home" 
              onClick={(e) => handleNavClick(e, '/#home', 'home')}
              className="flex items-center group"
            >
              <img 
                src="/images/Logo-Horizontal-Negative.png" 
                alt="Innotech Service Logo" 
                className="h-8 sm:h-10 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, item.section)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 group ${
                    isActive(item.href, item.section)
                      ? 'text-[#FF991C]'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FF991C] transform origin-left transition-transform duration-300 ${
                      isActive(item.href, item.section) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href, item.section)}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href, item.section)
                    ? 'text-[#FF991C] bg-gray-800'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.name}
                <ChevronRight size={18} />
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <img 
                  src="/images/Logo-Horizontal-Negative.png" 
                  alt="Innotech Service Logo" 
                  className="h-8 w-auto"
                />
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Delivering innovative technology solutions to transform your business and drive growth in the digital age.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.section)}
                      className="text-gray-400 hover:text-[#FF991C] transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>Email: innotech-service@outlook.com</p>
                <p>Phone: +856 20 22666395 or +856 20 22115245 </p>
                <p>Address: B.Phonetong-Savang Street, Chanthabuly, Vientiane Capital.</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Innotech Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;