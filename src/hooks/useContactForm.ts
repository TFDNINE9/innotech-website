import { useState } from 'react';
import { ContactFormData, ContactFormResponse } from '@/types/email';
import validator from '@/utils/validator';

interface UseContactFormReturn {
  formData: ContactFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  error: string | null;
  resetForm: () => void;
}

/**
 * Custom hook to handle contact form state and submission
 */
export const useContactForm = (): UseContactFormReturn => {
  // Form state
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    message: '',
  });

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Handle input changes
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Reset form to initial state
   */
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      service: '',
      message: '',
    });
    setIsSubmitted(false);
    setError(null);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Client-side validation
      const validation = validator.validateContactForm(formData);
      if (!validation.isValid) {
        setError(validation.error || 'Please check your form inputs');
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: ContactFormResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message');
      }

      setIsSubmitted(true);
      
      // Reset form after 5 seconds if still on the page
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          service: '',
          message: '',
        });
      }, 5000);
      
    } catch (err) {
      setError((err as Error).message || 'An unexpected error occurred');
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit,
    isSubmitting,
    isSubmitted,
    error,
    resetForm,
  };
};

export default useContactForm;