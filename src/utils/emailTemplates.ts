import { ContactFormData } from '@/types/email';

/**
 * Email templates utility
 */
export const emailTemplates = {
  /**
   * Generate HTML email for contact form submission
   * @param data - The form data
   * @returns HTML string
   */
  contactFormEmail(data: ContactFormData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Customer Inquiry</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background-color: #FF991C;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            border-left: 1px solid #ddd;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
          }
          .field {
            margin-bottom: 15px;
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
          }
          .field:last-child {
            border-bottom: none;
          }
          .label {
            font-weight: bold;
            display: block;
            margin-bottom: 5px;
            color: #555;
          }
          .value {
            display: block;
          }
          .message-box {
            background-color: white;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #ddd;
            margin-top: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
            padding-top: 20px;
            border-top: 1px solid #eee;
          }
          .logo {
            max-width: 150px;
            margin: 0 auto 15px;
            display: block;
          }
          .highlight {
            color: #FF991C;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <img src="https://innotech.com.la/images/Logo-Horizontal-Negative.png" alt="Innotech Logo" class="logo">
          <h1>New Customer Inquiry</h1>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Full Name:</span>
            <span class="value highlight">${data.name}</span>
          </div>
          <div class="field">
            <span class="label">Email Address:</span>
            <span class="value">${data.email}</span>
          </div>
          ${data.company ? `
          <div class="field">
            <span class="label">Company Name:</span>
            <span class="value">${data.company}</span>
          </div>` : ''}
          <div class="field">
            <span class="label">Service Interested In:</span>
            <span class="value highlight">${data.service ?? 'General Inquiry'}</span>
          </div>
          <div class="field">
            <span class="label">Message Details:</span>
            <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>This is an automated message from the INNOTECH website contact form.</p>
          <p>© ${new Date().getFullYear()} INNOTECH Service. All rights reserved.</p>
          <p><small>Please do not reply to this email. To respond to this inquiry, please contact the customer directly at <a href="mailto:${data.email}">${data.email}</a>.</small></p>
        </div>
      </body>
      </html>
    `;
  }
};

export default emailTemplates;