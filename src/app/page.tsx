'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Layout from '../components/Layout';
import { useLanguage } from '@/context/LanguageContext';
import {
  ArrowRight,
  Zap,
  Shield,
  Rocket,
  Users,
  ChevronDown,
  Eye,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Code,
  Cog,
  Check,
  Star,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Target,
  Award,
  Lightbulb,
  Heart,
  ChevronUp,
  CloudCog
} from 'lucide-react';
import ContactForm from '@/components/ContactForm';

const HomePage: React.FC = () => {
  // Get translation function from language context
  const { t } = useLanguage();

  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Refs for animation observers
  const observerRef = useRef<IntersectionObserver | null>(null);
  const animatedElementsRef = useRef<Set<Element>>(new Set());

  const stats = [
    { number: 500, label: t('stats.happyClients', 'home'), suffix: '+' },
    { number: 50, label: t('stats.projectsCompleted', 'home'), suffix: '+' },
    { number: 10, label: t('stats.yearsExperience', 'home'), suffix: '+' },
    { number: 24, label: t('stats.supportAvailable', 'home'), suffix: '/7' },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: t('features.items.fastReliable.title', 'home'),
      description: t('features.items.fastReliable.description', 'home'),
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('features.items.secureSolutions.title', 'home'),
      description: t('features.items.secureSolutions.description', 'home'),
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: t('features.items.innovationDriven.title', 'home'),
      description: t('features.items.innovationDriven.description', 'home'),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('features.items.support.title', 'home'),
      description: t('features.items.support.description', 'home'),
    },
  ];

  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: t('services.0.title', 'services'),
      shortDesc: t('services.0.shortDesc', 'services'),
      description: t('services.0.description', 'services'),
      features: [
        t('services.0.features.0', 'services'),
        t('services.0.features.1', 'services'),
        t('services.0.features.2', 'services'),
        t('services.0.features.3', 'services'),
        t('services.0.features.4', 'services'),
        t('services.0.features.5', 'services')
      ],
      popular: true,
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: t('services.1.title', 'services'),
      shortDesc: t('services.1.shortDesc', 'services'),
      description: t('services.1.description', 'services'),
      features: [
        t('services.1.features.0', 'services'),
        t('services.1.features.1', 'services'),
        t('services.1.features.2', 'services'),
        t('services.1.features.3', 'services'),
        t('services.1.features.4', 'services'),
        t('services.1.features.5', 'services')
      ],
      popular: false,
    },
    {
      icon: <CloudCog className="w-12 h-12" />,
      title: t('services.2.title', 'services'),
      shortDesc: t('services.2.shortDesc', 'services'),
      description: t('services.2.description', 'services'),
      features: [
        t('services.2.features.0', 'services'),
        t('services.2.features.1', 'services'),
        t('services.2.features.2', 'services'),
        t('services.2.features.3', 'services'),
        t('services.2.features.4', 'services'),
        t('services.2.features.5', 'services')
      ],
      popular: false,
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: t('services.3.title', 'services'),
      shortDesc: t('services.3.shortDesc', 'services'),
      description: t('services.3.description', 'services'),
      features: [
        t('services.3.features.0', 'services'),
        t('services.3.features.1', 'services'),
        t('services.3.features.2', 'services'),
        t('services.3.features.3', 'services'),
        t('services.3.features.4', 'services'),
        t('services.3.features.5', 'services')
      ],
      popular: false,
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: t('services.4.title', 'services'),
      shortDesc: t('services.4.shortDesc', 'services'),
      description: t('services.4.description', 'services'),
      features: [
        t('services.4.features.0', 'services'),
        t('services.4.features.1', 'services'),
        t('services.4.features.2', 'services'),
        t('services.4.features.3', 'services'),
        t('services.4.features.4', 'services'),
        t('services.4.features.5', 'services')
      ],
      popular: false,
    },
    {
      icon: <Cog className="w-12 h-12" />,
      title: t('services.5.title', 'services'),
      shortDesc: t('services.5.shortDesc', 'services'),
      description: t('services.5.description', 'services'),
      features: [
        t('services.5.features.0', 'services'),
        t('services.5.features.1', 'services'),
        t('services.5.features.2', 'services'),
        t('services.5.features.3', 'services'),
        t('services.5.features.4', 'services'),
        t('services.5.features.5', 'services')
      ],
      popular: false,
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: t('values.items.innovation.title', 'about'),
      description: t('values.items.innovation.description', 'about'),
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: t('values.items.collaboration.title', 'about'),
      description: t('values.items.collaboration.description', 'about'),
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t('values.items.excellence.title', 'about'),
      description: t('values.items.excellence.description', 'about'),
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: t('values.items.integrity.title', 'about'),
      description: t('values.items.integrity.description', 'about'),
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: t('values.items.resultsDriven.title', 'about'),
      description: t('values.items.resultsDriven.description', 'about'),
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('values.items.globalPerspective.title', 'about'),
      description: t('values.items.globalPerspective.description', 'about'),
    },
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      experience: '15+ years in Tech Leadership',
      description: 'Visionary leader with expertise in digital transformation and strategic technology planning.',
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      experience: '12+ years in Software Development',
      description: 'Technical architect specializing in cloud solutions and enterprise software development.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Operations',
      experience: '10+ years in Project Management',
      description: 'Operations expert ensuring seamless project delivery and exceptional client experiences.',
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      experience: '8+ years in Full-Stack Development',
      description: 'Senior developer with expertise in modern web technologies and system architecture.',
    },
  ];

  // Initialize animations
  const initializeAnimations = useCallback(() => {
    if (!isClient || observerRef.current) return;

    try {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !animatedElementsRef.current.has(entry.target)) {
              entry.target.classList.add('animate-in');
              animatedElementsRef.current.add(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observe all animatable elements
      const animatableElements = document.querySelectorAll('.animate-on-scroll, .animate-fade-in, .animate-slide-left, .animate-slide-right, .animate-scale, .stagger-animation');
      animatableElements.forEach((el) => {
        if (observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    } catch (error) {
      console.error('Error initializing animations:', error);
    }
  }, [isClient]);

  // Handle scroll for showing/hiding scroll-to-top button
  const handleScroll = useCallback(() => {
    if (!isClient) return;
    setShowScrollTop(window.scrollY > 300);
  }, [isClient]);

  // Scroll to top function
  const scrollToTop = useCallback(() => {
    if (!isClient) return;
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [isClient]);

  // Smooth scroll to element
  const scrollToElement = useCallback((elementId: string) => {
    if (!isClient) return;
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isClient]);

  // Client-side initialization
  useEffect(() => {
    setIsClient(true);
    setIsVisible(true);
  }, []);

  // Initialize stats rotation
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isClient, stats.length]);

  // Initialize animations
  useEffect(() => {
    if (!isClient) return;

    const timer = setTimeout(() => {
      initializeAnimations();
    }, 100);

    return () => clearTimeout(timer);
  }, [isClient, initializeAnimations]);

  // Handle scroll events
  useEffect(() => {
    if (!isClient) return;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isClient, handleScroll]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', company: '', service: '', message: '' });
    }, 3000);
  };

  // Don't render animations until client-side
  if (!isClient) {
    return (
      <Layout>
        {/* Simplified content without animations for SSR */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-[#FF991C] bg-clip-text text-transparent">
              {t('hero.title', 'home')}
            </h1>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold mb-8 text-gray-200">
              {t('hero.subtitle', 'home')}
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description', 'home')}
            </p>
          </div>
        </section>
        {/* Add other sections without animations here if needed */}
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#FF991C] rounded-full mix-blend-multiply filter blur-xl animate-pulse float-animation"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75 float-slow"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-[#FF991C] bg-clip-text text-transparent">
              {t('hero.title', 'home')}
            </h1>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold mb-8 text-gray-200">
              {t('hero.subtitle', 'home')}
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description', 'home')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToElement('services')}
                className="group bg-gradient-to-r from-[#FF991C] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/25 flex items-center space-x-2 pulse-animation"
              >
                <span>{t('buttons.getStarted', 'common')}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button
                onClick={() => scrollToElement('about')}
                className="group border-2 border-gray-600 hover:border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-gray-900"
              >
                {t('buttons.learnMore', 'common')}
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900/50 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-500 ${currentStat === index ? 'scale-110' : 'scale-100'
                  }`}
              >
                <div className="text-4xl lg:text-5xl font-bold text-[#FF991C] mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              {t('features.title', 'home')}
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('features.description', 'home')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 dark-surface rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/10 hover:border-[#FF991C]/50 card-hover"
              >
                <div className="text-[#FF991C] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#FF991C] bg-clip-text text-transparent">
              {t('title', 'about')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              {t('description', 'about')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="animate-slide-left animate-on-scroll">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('story.title', 'about')}</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                {Array.from({ length: 3 }).map((_, index) => (
                  <p key={index}>{t(`story.paragraphs.${index}`, 'about')}</p>
                ))}
              </div>
            </div>
            <div className="relative animate-slide-right animate-on-scroll">
              <div className="bg-gradient-to-br from-[#FF991C]/20 to-purple-500/20 p-8 rounded-2xl backdrop-blur-sm border border-gray-700 glow-on-hover">
                <div className="grid grid-cols-2 gap-6 stagger-animation">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF991C] mb-2">2015</div>
                    <div className="text-sm text-gray-400">{t('stats.founded', 'about')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF991C] mb-2">500+</div>
                    <div className="text-sm text-gray-400">{t('stats.clients', 'about')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF991C] mb-2">50+</div>
                    <div className="text-sm text-gray-400">{t('stats.team', 'about')}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#FF991C] mb-2">15+</div>
                    <div className="text-sm text-gray-400">{t('stats.countries', 'about')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Expertise Section */}
          <div className="mb-20 animate-on-scroll">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('expertise.title', 'about')}</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {t('expertise.description', 'about')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 stagger-animation">
              {/* Frontend Development */}
              <div className="group dark-surface p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/10 hover:border-[#FF991C]/50 card-hover">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF991C] to-orange-600 rounded-lg flex items-center justify-center mr-4">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('expertise.sections.frontend', 'about')}</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Creating engaging, responsive user interfaces with modern frameworks and technologies.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/pngwing.com.png" className="w-12 h-12 object-contain" alt="React" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">React</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/angular.png" className="w-12 h-12 object-contain" alt="Angular" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Angular</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/vue.png" className="w-12 h-12 object-contain" alt="Vue.js" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Vue.js</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/next.png" className="w-12 h-12 object-contain" alt="Next.js" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Next.js</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/flutter.png" className="w-12 h-12 object-contain" alt="Flutter" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Flutter</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/blazor.png" className="w-12 h-12 object-contain" alt="Blazor" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Blazor</span>
                  </div>

                </div>
                <div className='flex justify-center'>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px] w-32">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/javascript.png" className="w-12 h-12 object-contain" alt="JavaScript" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">JavaScript</span>
                  </div>
                </div>
              </div>

              {/* Backend Development */}
              <div className="group dark-surface p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/10 hover:border-[#FF991C]/50 card-hover">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Database className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('expertise.sections.backend', 'about')}</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Building robust server-side solutions with scalable architecture and cloud integration.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/aspcore.png" className="w-12 h-12 object-contain" alt="ASP.NET Core" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">ASP.NET</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/node.png" className="w-12 h-12 object-contain" alt="Node.js" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Node.js</span>
                  </div>

                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/fastapi.png" className="w-12 h-12 object-contain" alt="Microsoft Azure" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Fast API</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/tensorflow.png" className="w-12 h-12 object-contain" alt="Microsoft Azure" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Tensorflow A.I</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/sql.png" className="w-12 h-12 object-contain" alt="SQL" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">SQL</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/python.png" className="w-12 h-12 object-contain" alt="python" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">python</span>
                  </div>

                </div>
                <div className='flex justify-center'>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px] w-32">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/redis.png" className="w-12 h-12 object-contain" alt="redis" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">redis</span>
                  </div>
                </div>
              </div>

              {/* iOS/android Development */}
              <div className="group dark-surface p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/10 hover:border-[#FF991C]/50 card-hover">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center mr-4">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('expertise.sections.mobile', 'about')}</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Native and cross-platform applications with optimal performance and user experience.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/xcode.png" className="w-12 h-12 object-contain" alt="Xcode" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Xcode</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/swift.png" className="w-12 h-12 object-contain" alt="Swift" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Swift</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/pngwing.com.png" className="w-12 h-12 object-contain" alt="React Native" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">React Native</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/flutter.png" className="w-12 h-12 object-contain" alt="Flutter" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Flutter</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/android.png" className="w-12 h-12 object-contain" alt="Android Studio" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Android Studio</span>
                  </div>
                  <div className='justify-center'>
                    <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                      <div className="flex-1 flex items-center justify-center">
                        <img src="/images/kotlin.png" className="w-12 h-12 object-contain" alt="Kotlin" />
                      </div>
                      <span className="text-xs text-gray-400 mt-2 text-center">Kotlin</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Devops */}
              <div className="group dark-surface p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/10 hover:border-[#FF991C]/50 card-hover">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4">
                    <img src="/images/devops.png" className="w-8 h-8 object-contain" alt="Android" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('expertise.sections.devops', 'about')}</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Build, ship, and scale reliably with containerization, orchestration, and cloud infrastructure using Docker, Kubernetes, and Azure.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/docker.png" className="w-12 h-12 object-contain" alt="Docker" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Docker</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/kubernete.png" className="w-12 h-12 object-contain" alt="Kubernetes" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Kubernetes</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/Microsoft_Azure.svg.png" className="w-12 h-12 object-contain" alt="Microsoft Azure" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Microsoft Azure</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/gitlab.png" className="w-12 h-12 object-contain" alt="gitlab" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">GitLab</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/postman.png" className="w-12 h-12 object-contain" alt="postman" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">Postman</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700 transition-colors duration-200 min-h-[100px]">
                    <div className="flex-1 flex items-center justify-center">
                      <img src="/images/nignx.png" className="w-12 h-12 object-contain" alt="NGINX" />
                    </div>
                    <span className="text-xs text-gray-400 mt-2 text-center">NGINX</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('values.title', 'about')}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('values.description', 'about')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 stagger-animation animate-on-scroll">
            {values.map((value, index) => (
              <div
                key={index}
                className="group p-8 dark-surface rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/10 hover:border-[#FF991C]/50 card-hover"
              >
                <div className="text-[#FF991C] mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{value.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Team Section */}
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('team.title', 'about')}</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {t('team.description', 'about')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-animation animate-on-scroll">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center dark-surface p-6 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:border-[#FF991C]/50 card-hover"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-[#FF991C] to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
                <div className="text-[#FF991C] font-medium mb-2">{member.role}</div>
                <div className="text-sm text-gray-400 mb-3">{member.experience}</div>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="section-padding animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-scale">
            <div className="flex items-center justify-center mb-8">
              <Eye className="w-16 h-16 text-[#FF991C] mr-4 float-animation" />
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white to-[#FF991C] bg-clip-text text-transparent">
                {t('title', 'vision')}
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              {t('description', 'vision')}
            </p>
            <div className="text-lg text-gray-300 max-w-3xl mx-auto">
              {t('subDescription', 'vision')}
            </div>
          </div>

          <div className="text-center mb-16 animate-fade-in animate-on-scroll">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">{t('mission.title', 'vision')}</h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl text-gray-300 italic leading-relaxed mb-8">
                "{t('mission.quote', 'vision')}"
              </blockquote>
              <p className="text-lg text-gray-400">
                {t('mission.description', 'vision')}
              </p>
            </div>
          </div>

          {/* Development Services Section */}
          <div className="mb-20 animate-on-scroll">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">{t('approach.title', 'vision')}</h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                {t('approach.description', 'vision')}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 stagger-animation">
              {/* Outsourced Development Service */}
              <div className="group dark-surface p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/10 hover:border-[#FF991C]/50 card-hover">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#FF991C] to-orange-600 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('approach.services.outsourced.title', 'vision')}</h3>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {t('approach.services.outsourced.description', 'vision')}
                </p>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t(`approach.services.outsourced.features.${index}`, 'vision')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Web App Development */}
              <div className="group dark-surface p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/10 hover:border-[#FF991C]/50 card-hover">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('approach.services.webApp.title', 'vision')}</h3>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {t('approach.services.webApp.description', 'vision')}
                </p>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t(`approach.services.webApp.features.${index}`, 'vision')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile App UX/UI Development */}
              <div className="group dark-surface p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/10 hover:border-[#FF991C]/50 card-hover">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('approach.services.mobileApp.title', 'vision')}</h3>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {t('approach.services.mobileApp.description', 'vision')}
                </p>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t(`approach.services.mobileApp.features.${index}`, 'vision')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quickly Implemented */}
              <div className="group dark-surface p-8 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/10 hover:border-[#FF991C]/50 card-hover">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{t('approach.services.quickImplementation.title', 'vision')}</h3>
                </div>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  {t('approach.services.quickImplementation.description', 'vision')}
                </p>
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      <span>{t(`approach.services.quickImplementation.features.${index}`, 'vision')}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Our Commitment Section */}
          <div className="text-center animate-on-scroll">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#FF991C]/10 to-purple-500/10 p-8 lg:p-12 rounded-2xl border border-gray-700 hover:border-[#FF991C]/50 transition-all duration-300 glow-on-hover">
              <div className="flex items-center justify-center mb-6">
                <Target className="w-12 h-12 text-[#FF991C] mr-4" />
                <h3 className="text-3xl lg:text-4xl font-bold text-white">{t('commitment.title', 'vision')}</h3>
              </div>
              <p className="text-xl text-gray-300 leading-relaxed mb-6">
                {t('commitment.description', 'vision')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF991C] mb-2">100%</div>
                  <div className="text-sm text-gray-400">{t('commitment.stats.satisfaction', 'vision')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF991C] mb-2">24/7</div>
                  <div className="text-sm text-gray-400">{t('commitment.stats.support', 'vision')}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#FF991C] mb-2">∞</div>
                  <div className="text-sm text-gray-400">{t('commitment.stats.innovation', 'vision')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-padding bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#FF991C] bg-clip-text text-transparent">
              {t('title', 'services')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              {t('description', 'services')}
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>{t('highlights.expertTeam', 'services')}</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>{t('highlights.provenResults', 'services')}</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>{t('highlights.support', 'services')}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20 stagger-animation animate-on-scroll">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer card-hover ${activeService === index
                  ? 'bg-gradient-to-br from-[#FF991C]/20 to-orange-600/20 border-2 border-[#FF991C]/50 shadow-2xl shadow-[#FF991C]/20'
                  : 'dark-surface hover:bg-gray-800 hover:border-[#FF991C]/30'
                  }`}
                onClick={() => setActiveService(index)}
              >
                {service.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-[#FF991C] to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center pulse-animation">
                    <Star className="w-3 h-3 mr-1" />
                    {t('popular', 'services')}
                  </div>
                )}

                <div className={`mb-6 transition-all duration-300 ${activeService === index ? 'text-orange-400 scale-110' : 'text-[#FF991C] group-hover:scale-110'
                  }`}>
                  {service.icon}
                </div>

                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  {service.shortDesc}
                </p>

                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-400">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center animate-on-scroll">
            <div className="animate-slide-left">
              <div className="text-[#FF991C] mb-4">
                {services[activeService].icon}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                {services[activeService].title}
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {services[activeService].description}
              </p>
              <button
                onClick={() => scrollToElement('contact')}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-[#FF991C] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 glow-on-hover"
              >
                <span>{t('getStartedButton', 'services')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="dark-surface p-8 rounded-2xl animate-slide-right glow-on-hover">
              <h3 className="text-xl font-bold mb-6 text-white">{t('whatsIncluded', 'services')}:</h3>
              <div className="space-y-3">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-[#FF991C] bg-clip-text text-transparent">
              {t('title', 'contact')}
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              {t('description', 'contact')}
            </p>
          </div>

          {/* Map Section */}
          <div className="mb-16 animate-on-scroll">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4 text-white">{t('location.title', 'contact')}</h2>
              <p className="text-gray-400">{t('location.description', 'contact')}</p>
            </div>
            <div className="dark-surface p-4 rounded-2xl overflow-hidden hover:border-[#FF991C]/50 transition-all duration-300 glow-on-hover">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3824.486!2d102.6206124!3d17.9916111!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDU5JzI5LjgiTiAxMDLCsDM3JzIyLjMiRQ!5e0!3m2!1sen!2sla!4v1735833600000!5m2!1sen!2sla"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: '1rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="INNOTECH Service Office Location - 17°59'29.8&quot;N 102°37'22.3&quot;E"
                className="rounded-2xl"
              />
              <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="inline-flex items-center space-x-2 text-gray-400">
                  <MapPin className="w-4 h-4 text-[#FF991C]" />
                  <span className="text-sm">{t('location.coordinates', 'contact')}</span>
                </div>
                <a
                  href="https://www.google.com/maps/place/17%C2%B059'29.8%22N+102%C2%B037'22.3%22E/@17.9916111,102.6206124,17z/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-[#FF991C] hover:text-orange-400 transition-colors duration-200 text-sm font-medium"
                >
                  <span>{t('location.openInMaps', 'contact')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-on-scroll">
            {/* Contact Form */}
            <div className="animate-slide-left">
              <h2 className="text-3xl font-bold mb-8 text-white">{t('form.title', 'contact')}</h2>
              <ContactForm services={services} />
            </div>

            {/* Contact Info */}
            <div className="animate-slide-right">
              <h2 className="text-3xl font-bold mb-8 text-white">{t('contactInfo.title', 'contact')}</h2>

              <div className="space-y-6 stagger-animation">
                <div className="dark-surface p-6 rounded-2xl hover:border-[#FF991C]/50 transition-all duration-300 glow-on-hover">
                  <div className="flex items-center mb-4">
                    <Mail className="w-8 h-8 text-[#FF991C] mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{t('contactInfo.email.title', 'contact')}</h3>
                      <p className="text-gray-400">{t('contactInfo.email.value', 'contact')}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {t('contactInfo.email.description', 'contact')}
                  </p>
                </div>

                <div className="dark-surface p-6 rounded-2xl hover:border-[#FF991C]/50 transition-all duration-300 glow-on-hover">
                  <div className="flex items-center mb-4">
                    <Phone className="w-8 h-8 text-[#FF991C] mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{t('contactInfo.phone.title', 'contact')}</h3>
                      <p className="text-gray-400">{t('contactInfo.phone.value', 'contact')}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {t('contactInfo.phone.description', 'contact')}
                  </p>
                </div>

                <div className="dark-surface p-6 rounded-2xl hover:border-[#FF991C]/50 transition-all duration-300 glow-on-hover">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-[#FF991C] mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{t('contactInfo.visit.title', 'contact')}</h3>
                      <p className="text-gray-400">{t('contactInfo.visit.value', 'contact')}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {t('contactInfo.visit.description', 'contact')}
                  </p>
                </div>

                <div className="dark-surface p-6 rounded-2xl hover:border-[#FF991C]/50 transition-all duration-300 glow-on-hover">
                  <div className="flex items-center mb-4">
                    <Clock className="w-8 h-8 text-[#FF991C] mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">{t('contactInfo.hours.title', 'contact')}</h3>
                      <p className="text-gray-400">{t('contactInfo.hours.value', 'contact')}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    {t('contactInfo.hours.description', 'contact')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-gray-950 animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-scale">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              {t('callToAction.title', 'home')}
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              {t('callToAction.description', 'home')}
            </p>
            <button
              onClick={() => scrollToElement('contact')}
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-[#FF991C] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/25 pulse-animation glow-on-hover"
            >
              <span>{t('callToAction.button', 'home')}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${showScrollTop ? 'visible' : 'hidden'}`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 text-white" />
      </button>
    </Layout>
  );
};

export default HomePage;