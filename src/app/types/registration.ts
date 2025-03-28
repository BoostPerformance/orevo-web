export interface RegistrationData {
  // Basic Information
  name: string;
  phone: string;
  ageGroup: '40대' | '50대' | '60대' | '그 외';

  // Class Preferences
  preferredDate: string; // Format: YYYY-MM-DD
  preferredTime: '오전 08:15' | '오전 09:30' | '오전 10:45';

  // Agreement
  agreementChecked: boolean;

  // Payment Information (generated during submission)
  orderId?: string;
  paymentStatus?: 'pending' | 'completed' | 'failed';
  paymentAmount: number; // 30000 for 3회 체험권
  submissionDate?: string; // ISO date string
}

// Validation schema for form fields
export const registrationValidation = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  phone: {
    required: true,
    pattern: /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/,
  },
  ageGroup: {
    required: true,
    options: ['40대', '50대', '60대', '그 외'] as const,
  },
  preferredDate: {
    required: true,
    minDate: new Date(), // Cannot select past dates
  },
  preferredTime: {
    required: true,
    options: ['오전 08:15', '오전 09:30', '오전 10:45'] as const,
  },
  agreementChecked: {
    required: true,
    mustBeTrue: true,
  },
};
