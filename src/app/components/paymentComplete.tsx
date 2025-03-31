'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from './common/loading';
import { useMutation } from '@tanstack/react-query';

interface FormData {
  users: {
    name: string;
    phone: string;
    email: string | null;
    age_group: string;
    profile_image_url: string | null;
    kakao_id: string | null;
  };
  programs: {
    program_type: string;
    preferred_start_date: string;
    preferred_time: string;
    consent_to_terms: boolean;
  };
  payments: {
    amount: number;
    payment_method: string;
    payment_key: string;
    order_id: string;
    payment_date: string;
    card_type: string | null;
    owner_type: string | null;
    currency: string;
    status: string;
    approve_no: string | null;
  };
}

// 폼 데이터 유효성 검사 (1. 필수 필드 검사)
const validateFormData = (formData: FormData) => {
  try {
    console.log('formData', formData);
    const requiredFields = ['users', 'programs', 'payments'] as const;
    //type RequiredField = (typeof requiredFields)[number];

    const missingFields = requiredFields.filter(
      (field) => !(field in formData)
    );

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  } catch (error) {
    console.error('폼 데이터 유효성 검사 중 에러 발생:', error);
    return {
      isValid: false,
      missingFields: [],
    };
  }
};

interface PaymentRequestData {
  orderId: string | null;
  amount: string | null;
  paymentKey: string | null;
}

const attemptPaymentConfirmation = async (requestData: PaymentRequestData) => {
  let attempts = 0;
  while (attempts < 3) {
    try {
      const paymentResponse = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (paymentResponse.ok) {
        const json = await paymentResponse.json();

        if (json.error) {
          throw new Error(json.message || '결제 확인에 실패했습니다');
        }
        return json;
      }
    } catch (error) {
      console.error('Payment confirmation attempt failed:', error);
    }

    await new Promise((r) => setTimeout(r, 1000));
    attempts++;
  }

  throw new Error('결제 확인이 실패했습니다. 잠시 후 다시 시도해주세요.');
};

export default function PaymentComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isProcessingRef = useRef(false);

  const mutation = useMutation<void, Error, FormData>({
    mutationFn: async (formData) => {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '폼 제출에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: async (data) => {
      console.log('폼 제출 성공:', data);
      // 성공 시 localStorage의 임시 데이터 삭제
      localStorage.removeItem('registrationData');
      window.location.href = '/payment-success';
    },
    onError: (error) => {
      console.error('폼 제출 중 에러 발생:', error);
      window.location.href = '/payment-fail';
    },
  });

  useEffect(() => {
    if (isProcessingRef.current) return;
    isProcessingRef.current = true;

    const confirmPayment = async () => {
      try {
        // localStorage에서 registrationData 불러오기
        const savedFormData = localStorage.getItem('registrationData');

        if (!savedFormData) {
          throw new Error('신청 폼 데이터가 없습니다');
        }

        const registrationData = JSON.parse(savedFormData);

        // API 요청 파라미터 구성
        const requestData = {
          orderId: searchParams.get('orderId'),
          amount: searchParams.get('amount'),
          paymentKey: searchParams.get('paymentKey'),
        };

        if (
          !requestData.orderId ||
          !requestData.amount ||
          !requestData.paymentKey
        ) {
          throw new Error('결제 정보가 누락되었습니다');
        }

        // 토스페이먼츠 결제 확인 API 호출
        const paymentResult = await attemptPaymentConfirmation(requestData);

        console.log('paymentResult', paymentResult);

        // API 호출에 필요한 데이터 구조 생성
        const formData = {
          users: {
            name: registrationData.name,
            phone: registrationData.phone,
            email: registrationData.email || null,
            age_group: mapAgeGroup(registrationData.ageGroup),
            profile_image_url: null,
            kakao_id: null,
          },
          programs: {
            program_type: mapProgramType(registrationData.selectedClassType),
            preferred_start_date: registrationData.preferredDate,
            preferred_time: registrationData.preferredTime.replace('오전 ', ''),
            consent_to_terms: registrationData.agreementChecked,
          },
          payments: {
            amount:
              paymentResult.totalAmount || parseInt(requestData.amount || '0'),
            payment_method: paymentResult.method || '신용카드',
            payment_key: paymentResult.paymentKey || requestData.paymentKey,
            order_id: paymentResult.orderId || requestData.orderId,
            payment_date: paymentResult.approvedAt || new Date().toISOString(),
            card_type: paymentResult.card?.cardType || null,
            owner_type: paymentResult.card?.ownerType || null,
            currency: paymentResult.currency || 'KRW',
            status: paymentResult.status || 'DONE',
            approve_no: paymentResult.card?.approveNo || null,
          },
        };

        // 데이터 유효성 검사
        const validation = validateFormData(formData);

        if (!validation.isValid) {
          throw new Error(
            `필수 데이터가 누락되었습니다: ${validation.missingFields.join(
              ', '
            )}`
          );
        }

        console.log('최종 요청 데이터:', formData);
        mutation.mutate(formData);
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : '알 수 없는 에러가 발생했습니다';
        console.error('Payment confirmation error:', error);
        window.location.href = `/payment-fail?message=${encodeURIComponent(
          errorMessage
        )}`;
      }
    };

    confirmPayment();
  }, [searchParams, router, mutation]);

  // 연령대 매핑 함수
  function mapAgeGroup(ageGroup: string): string {
    switch (ageGroup) {
      case '40대':
        return '40s';
      case '50대':
        return '50s';
      case '60대':
        return '60s';
      default:
        return 'OTHER';
    }
  }

  // 프로그램 타입 매핑 함수
  function mapProgramType(classType: string): string {
    if (classType.includes('3회 체험권')) {
      return 'TRIAL';
    } else if (classType.includes('1개월 멤버십')) {
      return 'MONTHLY';
    } else if (classType.includes('10회권')) {
      return 'PACKAGE_10';
    } else {
      return 'TRIAL'; // 기본값
    }
  }

  return <Loading ismessage />;
}
