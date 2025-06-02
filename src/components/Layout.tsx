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
  const pathname = usePathname();

  const navigation = [
    { name: 'Home', href: '/', section: 'home' },
    { name: 'About Us', href: '/about', section: 'about' },
    { name: 'Vision', href: '/vision', section: 'vision' },
    { name: 'Services', href: '/services', section: 'services' },
    { name: 'Contact', href: '/contact', section: 'contact' },
  ];

  const isActive = (href: string) => {
    return pathname === href;
  };

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-scroll when page loads based on pathname
  useEffect(() => {
    if (!mounted) return;
    
    const scrollToSectionOnLoad = () => {
      const sectionMap: { [key: string]: string } = {
        '/': 'home',
        '/about': 'about',
        '/vision': 'vision',
        '/services': 'services',
        '/contact': 'contact',
      };

      const section = sectionMap[pathname];
      if (section && section !== 'home') {
        setTimeout(() => {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      }
    };

    scrollToSectionOnLoad();
  }, [pathname, mounted]);

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center relative">
                    <span className="text-white font-bold text-lg">i</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold">
                    INNO<span className="text-orange-500">TECH</span>
                  </span>
                  <div className="text-sm text-gray-400">Service</div>
                </div>
              </Link>
            </div>
          </div>
        </nav>
        <main className="pt-16">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center relative">
                    <span className="text-white font-bold text-lg">i</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold">
                  INNO<span className="text-orange-500">TECH</span>
                </span>
                <div className="text-sm text-gray-400">Service</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 group ${
                    isActive(item.href)
                      ? 'text-orange-500'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange-500 transform origin-left transition-transform duration-300 ${
                      isActive(item.href) ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
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
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800/95 backdrop-blur-sm">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-orange-500 bg-gray-700'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
                onClick={() => setIsMenuOpen(false)}
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
      <footer className="bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center relative">
                    <span className="text-white font-bold text-lg">i</span>
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full"></div>
                  </div>
                </div>
                <div>
                  <span className="text-xl font-bold">
                    INNO<span className="text-orange-500">TECH</span>
                  </span>
                  <div className="text-sm text-gray-400">Service</div>
                </div>
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
                      className="text-gray-400 hover:text-orange-500 transition-colors duration-200"
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
                <p>Email: info@innotechservice.com</p>
                <p>Phone: +1 (555) 123-4567</p>
                <p>Address: 123 Tech Street, Innovation City</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Innotech Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;