// src/app/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Rocket, 
  Users, 
  ChevronDown,
  Eye,
  Brain,
  Globe,
  Database,
  Cloud,
  Smartphone,
  Cpu,
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
  Heart
} from 'lucide-react';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const [activeService, setActiveService] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const stats = [
    { number: 500, label: 'Happy Clients', suffix: '+' },
    { number: 50, label: 'Projects Completed', suffix: '+' },
    { number: 10, label: 'Years Experience', suffix: '+' },
    { number: 24, label: 'Support Available', suffix: '/7' },
  ];

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast & Reliable',
      description: 'Lightning-fast solutions with 99.9% uptime guarantee for your business continuity.',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Solutions',
      description: 'Enterprise-grade security measures to protect your data and business operations.',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Innovation Driven',
      description: 'Cutting-edge technology solutions that keep you ahead of the competition.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: '24/7 Support',
      description: 'Round-the-clock technical support to ensure your systems run smoothly.',
    },
  ];

  const services = [
    {
      icon: <Code className="w-12 h-12" />,
      title: 'Custom Software Development',
      shortDesc: 'Tailored software solutions built to your exact specifications.',
      description: 'We create bespoke software applications that perfectly align with your business processes and objectives.',
      features: [
        'Full-stack web development',
        'Desktop application development',
        'API development and integration',
        'Legacy system modernization',
        'Agile development methodology',
        'Quality assurance and testing'
      ],
      price: 'Starting from $5,000',
      popular: false,
    },
    {
      icon: <Cloud className="w-12 h-12" />,
      title: 'Cloud Solutions & Migration',
      shortDesc: 'Seamless cloud migration and infrastructure management.',
      description: 'Transform your IT infrastructure with our comprehensive cloud services.',
      features: [
        'Cloud migration strategy',
        'AWS, Azure, Google Cloud expertise',
        'Infrastructure as Code',
        'Disaster recovery planning',
        'Cost optimization',
        '24/7 monitoring and support'
      ],
      price: 'Starting from $3,000',
      popular: true,
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: 'Cybersecurity Services',
      shortDesc: 'Comprehensive security solutions to protect your business.',
      description: 'Safeguard your digital assets with our advanced cybersecurity services.',
      features: [
        'Security audits and assessments',
        'Penetration testing',
        'Incident response planning',
        'Compliance management',
        'Employee security training',
        'Continuous monitoring'
      ],
      price: 'Starting from $2,500',
      popular: false,
    },
    {
      icon: <Database className="w-12 h-12" />,
      title: 'Data Analytics & BI',
      shortDesc: 'Turn your data into actionable business insights.',
      description: 'Unlock the power of your data with our analytics and business intelligence solutions.',
      features: [
        'Data warehouse design',
        'ETL processes and automation',
        'Interactive dashboards',
        'Predictive analytics',
        'Real-time reporting',
        'Machine learning integration'
      ],
      price: 'Starting from $4,000',
      popular: false,
    },
    {
      icon: <Smartphone className="w-12 h-12" />,
      title: 'Mobile App Development',
      shortDesc: 'Native and cross-platform mobile applications.',
      description: 'Reach your customers wherever they are with our mobile app development services.',
      features: [
        'Native iOS and Android development',
        'Cross-platform solutions',
        'UI/UX design',
        'App store optimization',
        'Push notifications',
        'Analytics integration'
      ],
      price: 'Starting from $8,000',
      popular: false,
    },
    {
      icon: <Cog className="w-12 h-12" />,
      title: 'IT Consulting & Support',
      shortDesc: 'Strategic IT guidance and ongoing technical support.',
      description: 'Get expert IT guidance to align your technology strategy with business objectives.',
      features: [
        'IT strategy development',
        'Technology assessment',
        'Digital transformation planning',
        'Vendor selection and management',
        'Help desk support',
        'System maintenance'
      ],
      price: 'Starting from $150/hour',
      popular: false,
    },
  ];

  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies to deliver cutting-edge solutions.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Collaboration',
      description: 'We work closely with our clients as partners, ensuring their success is our success.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We maintain the highest standards in everything we do, from code quality to customer service.',
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Integrity',
      description: 'We build trust through transparency, honesty, and ethical business practices.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable outcomes that drive real business value.',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Perspective',
      description: 'We bring international best practices and diverse perspectives to every project.',
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

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
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

  return (
    <Layout>
      {/* Home Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-orange-500 bg-clip-text text-transparent">
              Transform Your Business
            </h1>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold mb-8 text-gray-200">
              with <span className="text-orange-500">INNOTECH</span> Solutions
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              We deliver innovative technology services that empower businesses to thrive in the digital age. 
              From custom software development to IT consulting, we're your partner in success.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/services"
                className="group bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="/about"
                className="group border-2 border-gray-600 hover:border-white text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-white hover:text-gray-900"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center transform transition-all duration-500 ${
                  currentStat === index ? 'scale-110' : 'scale-100'
                }`}
              >
                <div className="text-4xl lg:text-5xl font-bold text-orange-500 mb-2">
                  {stat.number}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm lg:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Why Choose <span className="text-orange-500">INNOTECH</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We combine cutting-edge technology with deep industry expertise to deliver solutions that drive real results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 bg-gray-800/50 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 border border-gray-700 hover:border-orange-500/50"
              >
                <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300">
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
      <section id="about" className="py-20 lg:py-32 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
              About INNOTECH Service
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              We are a team of passionate technology professionals dedicated to transforming businesses 
              through innovative digital solutions and exceptional service delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  Founded in 2015, INNOTECH Service emerged from a simple yet powerful vision: to bridge 
                  the gap between cutting-edge technology and practical business solutions. Our founders, 
                  coming from diverse backgrounds in software development, business consulting, and digital 
                  transformation, recognized the need for a service provider that truly understands both 
                  technology and business.
                </p>
                <p>
                  Over the years, we've grown from a small startup to a trusted technology partner for 
                  businesses across various industries. Our journey has been marked by continuous learning, 
                  adaptation, and an unwavering commitment to our clients' success.
                </p>
                <p>
                  Today, we're proud to have helped over 500 businesses transform their operations, 
                  improve their efficiency, and achieve their digital goals. Our success is measured 
                  not just in projects delivered, but in the lasting relationships we've built with our clients.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-orange-500/20 to-purple-500/20 p-8 rounded-2xl backdrop-blur-sm border border-gray-700">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">2015</div>
                    <div className="text-sm text-gray-400">Company Founded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">500+</div>
                    <div className="text-sm text-gray-400">Clients Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">50+</div>
                    <div className="text-sm text-gray-400">Team Members</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500 mb-2">15+</div>
                    <div className="text-sm text-gray-400">Countries Reached</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              These principles guide everything we do and shape how we interact with our clients, 
              partners, and each other.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {values.map((value, index) => (
              <div
                key={index}
                className="group p-8 bg-gray-800/50 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/10 border border-gray-700 hover:border-orange-500/50"
              >
                <div className="text-orange-500 mb-4 group-hover:scale-110 transition-transform duration-300">
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
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our experienced leadership team brings together decades of expertise in technology, 
              business strategy, and client service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="group text-center bg-gray-800/50 p-6 rounded-2xl hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 border border-gray-700 hover:border-orange-500/50"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{member.name}</h3>
                <div className="text-orange-500 font-medium mb-2">{member.role}</div>
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
      <section id="vision" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-8">
              <Eye className="w-16 h-16 text-orange-500 mr-4" />
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
                Our Vision
              </h1>
            </div>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Shaping the future of technology services by creating innovative solutions that transform 
              businesses and empower communities worldwide.
            </p>
            <div className="text-lg text-gray-300 max-w-3xl mx-auto">
              At INNOTECH Service, we envision a world where technology seamlessly integrates with business 
              operations, enabling unprecedented growth, efficiency, and innovation across all industries.
            </div>
          </div>

          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Our Mission</h2>
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-2xl lg:text-3xl text-gray-300 italic leading-relaxed mb-8">
                "To empower businesses with innovative technology solutions that drive growth, 
                improve efficiency, and create lasting competitive advantages in an ever-evolving digital landscape."
              </blockquote>
              <p className="text-lg text-gray-400">
                We believe that technology should be an enabler, not a barrier. Our mission is to make 
                advanced technology accessible, understandable, and profitable for businesses of all sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 lg:py-32 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
              Our Services
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Comprehensive technology solutions designed to accelerate your business growth and 
              digital transformation journey.
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Expert Team</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>Proven Results</span>
              </div>
              <div className="flex items-center">
                <Check className="w-5 h-5 text-green-500 mr-2" />
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                  activeService === index
                    ? 'bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-2 border-orange-500/50 shadow-2xl shadow-orange-500/20'
                    : 'bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-orange-500/30'
                }`}
                onClick={() => setActiveService(index)}
              >
                {service.popular && (
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    Popular
                  </div>
                )}
                
                <div className={`mb-6 transition-all duration-300 ${
                  activeService === index ? 'text-orange-400 scale-110' : 'text-orange-500 group-hover:scale-110'
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
                
                <div className="flex items-center justify-between">
                  <div className="text-orange-500 font-semibold">{service.price}</div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-orange-500 group-hover:translate-x-1 transition-all duration-300" />
                </div>
              </div>
            ))}
          </div>

          {/* Service Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-orange-500 mb-4">
                {services[activeService].icon}
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
                {services[activeService].title}
              </h2>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                {services[activeService].description}
              </p>
              <a
                href="/contact"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            
            <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700">
              <h3 className="text-xl font-bold mb-6 text-white">What's Included:</h3>
              <div className="space-y-3">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Starting Price:</span>
                  <span className="text-2xl font-bold text-orange-500">
                    {services[activeService].price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-orange-500 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed mb-12">
              Ready to transform your business with innovative technology solutions? 
              Let's start a conversation about your project.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-300">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                        Service Interested In
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white transition-all duration-200"
                      >
                        <option value="">Select a service</option>
                        {services.map((service, index) => (
                          <option key={index} value={service.title}>
                            {service.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 resize-none"
                      placeholder="Tell us about your project requirements, timeline, and any specific questions you have..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25 flex items-center justify-center space-x-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Mail className="w-8 h-8 text-orange-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">Email Us</h3>
                      <p className="text-gray-400">info@innotechservice.com</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Send us an email anytime, we typically respond within 24 hours.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Phone className="w-8 h-8 text-orange-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">Call Us</h3>
                      <p className="text-gray-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Speak directly with our team during business hours.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <MapPin className="w-8 h-8 text-orange-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">Visit Us</h3>
                      <p className="text-gray-400">123 Tech Street, Innovation City</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Schedule a visit to our modern office space.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <Clock className="w-8 h-8 text-orange-500 mr-4" />
                    <div>
                      <h3 className="text-xl font-semibold text-white">Business Hours</h3>
                      <p className="text-gray-400">Mon - Fri: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">
                    24/7 support available for enterprise clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-800 to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Let's discuss how INNOTECH can help you achieve your technology goals and drive growth.
            </p>
            <a
              href="/contact"
              className="group inline-flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/25"
            >
              <span>Contact Us Today</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;