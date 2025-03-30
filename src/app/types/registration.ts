// 이 파일은 @/app/types/registration.ts 경로에 저장하세요.

export interface RegistrationData {
  name: string;
  phone: string;
  email?: string;
  ageGroup: '40대' | '50대' | '60대' | '그 외' | string;
  preferredDate: Date | string;
  preferredTime: '오전 08:15' | '오전 09:30' | '오전 10:45' | string;
  selectedClassType: string;
  agreementChecked: boolean;
  paymentAmount?: number;
  orderName: string;
}

export interface SubmitStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export interface ClassType {
  id: string;
  name: string;
  description?: string;
  class_type: string;
  max_capacity?: number;
  duration_minutes?: number;
  is_active?: boolean;
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
