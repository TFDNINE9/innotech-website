export interface EmailRecipient {
  name: string;
  address: string;
}

export interface EmailSender {
  name: string;
  address: string;
}

export interface EmailRequest {
  subject: string;
  body: string;
  tos: EmailRecipient[];
  from: EmailSender;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
}