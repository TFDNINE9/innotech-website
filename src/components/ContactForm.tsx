'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useContactForm } from '@/hooks/useContactForm';
import { CheckCircle, Send, AlertCircle, RefreshCw } from 'lucide-react';

interface ContactFormProps {
  services?: Array<{ title: string }>;
}

const ContactForm: React.FC<ContactFormProps> = ({ services = [] }) => {
  const { t } = useLanguage();
  const {
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    error,
    resetForm,
  } = useContactForm();

  if (isSubmitted) {
    return (
      <div className="bg-green-500/20 border border-green-500/50 rounded-2xl p-8 text-center animate-scale">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-2">{t('form.success.title', 'contact')}</h3>
        <p className="text-gray-300 mb-6">{t('form.success.description', 'contact')}</p>
        <button
          onClick={resetForm}
          className="inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          <span>Send Another Message</span>
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex items-start">
          <AlertCircle className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            {t('form.fullName', 'common')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF991C] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
            placeholder={t('form.placeholders.fullName', 'common')}
            disabled={isSubmitting}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            {t('form.email', 'common')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF991C] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
            placeholder={t('form.placeholders.email', 'common')}
            disabled={isSubmitting}
            maxLength={100}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
            {t('form.company', 'common')}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF991C] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200"
            placeholder={t('form.placeholders.company', 'common')}
            disabled={isSubmitting}
            maxLength={100}
          />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
            {t('form.serviceInterest', 'common')}
          </label>
          <div className="relative">
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-4 pr-12 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF991C] focus:border-transparent text-white transition-all duration-200 appearance-none"
              disabled={isSubmitting}
            >
              <option value="">{t('form.placeholders.service', 'common')}</option>
              {services.map((service, index) => (
                <option key={index} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          {t('form.message', 'common')} *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={formData.message}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF991C] focus:border-transparent text-white placeholder-gray-400 transition-all duration-200 resize-none"
          placeholder={t('form.placeholders.message', 'common')}
          disabled={isSubmitting}
          maxLength={5000}
        />
        <div className="text-right mt-1 text-xs text-gray-400">
          {formData.message.length}/5000 characters
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={`group w-full bg-gradient-to-r from-[#FF991C] to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#FF991C]/25 flex items-center justify-center space-x-2 glow-on-hover ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        <span>{isSubmitting ? t('form.submitting', 'common') || 'Sending...' : t('buttons.sendMessage', 'common')}</span>
        {isSubmitting ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
        ) : (
          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        )}
      </button>
    </form>
  );
};

export default ContactForm;