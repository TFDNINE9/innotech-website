import { EmailRequest } from '@/types/email';
import { emailTemplates } from '@/utils/emailTemplates';

/**
 * Service to handle email sending via the external API
 */
export const emailService = {
  /**
   * Send an email using the external email API
   * @param emailData - The email data to send
   * @returns Promise with the response
   */
  async sendEmail(emailData: EmailRequest): Promise<Response> {
    try {
      const response = await fetch('https://casaos.innotech.com.la:52450/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message ?? 'Failed to send email');
      }

      return response;
    } catch (error) {
      console.error('Email service error:', error);
      throw error;
    }
  },

  /**
   * Formats contact form data into an email request
   * @param formData - The contact form data
   * @returns EmailRequest object
   */
  formatContactFormToEmail(formData: {
    name: string;
    email: string;
    company?: string;
    service?: string;
    message: string;
  }): EmailRequest {
    // Generate the HTML email body using the template
    const bodyHtml = emailTemplates.contactFormEmail(formData);

    return {
      subject: `customer enquery - ${formData.service ?? 'General Inquiry'} - ${formData.name}`,
      body: bodyHtml,
      tos: [
        {
          name: "Innotech Contact",
          address: "contact@innotech.com.la"
        }
      ],
      from: {
        name: "Innotech Service",
        address: "no-reply@innotech.com.la"
      }
    };
  }
};

export default emailService;