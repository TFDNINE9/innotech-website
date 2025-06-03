import { NextRequest, NextResponse } from 'next/server';
import { emailService } from '@/services/emailService';
import { ContactFormData } from '@/types/email';
import validator from '@/utils/validator';

/**
 * API route handler for contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const formData: ContactFormData = await request.json();
    
    // Validate form data
    const validation = validator.validateContactForm(formData);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, message: validation.error },
        { status: 400 }
      );
    }
    
    // Sanitize form data to prevent XSS
    const sanitizedData = validator.sanitizeContactForm(formData);
    
    // Format the contact form data into an email request
    const emailData = emailService.formatContactFormToEmail(sanitizedData);
    
    // Send the email
    const response = await emailService.sendEmail(emailData);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message ?? 'Failed to send email to server');
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Your message has been sent successfully. We will get back to you soon!'
    });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Return error response
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send your message. Please try again later or contact us directly at contact@innotech.com.la.'
      },
      { status: 500 }
    );
  }
}