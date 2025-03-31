// 이 파일은 @/app/types/registration.ts 경로에 저장하세요.

export interface RegistrationData {
  users: {
    name: string;
    phone: string;
    email?: string;
    ageGroup: '40대' | '50대' | '60대' | '그 외' | string;
    profile_image_url: string;
    kakao_id: string;
  };
  programs: {
    program_type: string;
    preferred_start_date: Date | string;
    preferred_time: string;
    consent_to_terms: boolean;
  };
  payments: {
    amount: number;
    payment_method: string;
    payment_key: string;
    order_id: string;
    payment_date: Date | string;
  };
  trial_registration: {
    consent_to_terms: boolean;
  };
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
