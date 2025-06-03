import { ContactFormData } from '@/types/email';

/**
 * Validator utility for form validation
 */
export const validator = {
  /**
   * Validates an email address
   * @param email - Email string to validate
   * @returns boolean indicating if email is valid
   */
  isValidEmail(email: string): boolean {
    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validates contact form data
   * @param data - Contact form data
   * @returns Object with validation result and error message if validation fails
   */
  validateContactForm(data: ContactFormData): { isValid: boolean; error?: string } {
    // Check required fields
    if (!data.name || !data.name.trim()) {
      return {
        isValid: false,
        error: 'Name is required',
      };
    }

    if (!data.email || !data.email.trim()) {
      return {
        isValid: false,
        error: 'Email is required',
      };
    }

    if (!this.isValidEmail(data.email)) {
      return {
        isValid: false,
        error: 'Please enter a valid email address',
      };
    }

    if (!data.message || !data.message.trim()) {
      return {
        isValid: false,
        error: 'Message is required',
      };
    }

    // Validate name length
    if (data.name.length > 100) {
      return {
        isValid: false,
        error: 'Name is too long (maximum 100 characters)',
      };
    }

    // Validate message length
    if (data.message.length > 5000) {
      return {
        isValid: false,
        error: 'Message is too long (maximum 5000 characters)',
      };
    }

    return { isValid: true };
  },

  /**
   * Sanitizes form input to prevent XSS attacks
   * @param input - String to sanitize
   * @returns Sanitized string
   */
  sanitizeInput(input: string): string {
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  /**
   * Sanitizes contact form data
   * @param data - Contact form data
   * @returns Sanitized contact form data
   */
  sanitizeContactForm(data: ContactFormData): ContactFormData {
    return {
      name: this.sanitizeInput(data.name),
      email: this.sanitizeInput(data.email),
      company: data.company ? this.sanitizeInput(data.company) : '',
      service: data.service ? this.sanitizeInput(data.service) : '',
      message: this.sanitizeInput(data.message),
    };
  }
};

export default validator;