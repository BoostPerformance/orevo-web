// PaymentComplete.tsx 수정 버전
'use client';
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from './common/loading';
import { useMutation } from '@tanstack/react-query';

// 폼 데이터 유효성 검사 (1. 필수 필드 검사)
const validateFormData = (formData: any) => {
  try {
    // exercise_preferences 필드를 제거하고, 실제로 필요한 필드만 확인
    console.log('formData', formData);
    const requiredFields = ['users', 'programs'];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    return {
      isValid: missingFields.length === 0,
      missingFields,
    };
  } catch (error) {
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

    await new Promise((r) => setTimeout(r, 1000));
    attempts++;
  }

  throw new Error('결제 확인이 실패했습니다. 잠시 후 다시 시도해주세요.');
};

export default function PaymentComplete() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isProcessingRef = useRef(false);

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const response = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('폼 제출에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: async (data) => {
      console.log('폼 제출 성공:', data);
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
        // 2. localStorage 키 수정 - 'registrationData'로 불러오기
        const savedFormData = localStorage.getItem('registrationData');

        if (!savedFormData) {
          throw new Error('신청 폼 데이터가 없습니다');
        }

        const registrationData = JSON.parse(savedFormData);

        // 3. 데이터 구조 변환 - RegisterForm에서 API로 필요한 형식으로 변환
        const formData = {
          users: {
            name: registrationData.name,
            phone: registrationData.phone,
            email: registrationData.email || null,
            age_group: mapAgeGroup(registrationData.ageGroup),
            profile_image_url: null,
            kakao_id: null,
          },
          // 빈 객체지만 스키마 검증을 위해 포함
          exercise_preferences: {},
          programs: {
            program_type: mapProgramType(registrationData.selectedClassType),
            preferred_start_date: registrationData.preferredDate,
            preferred_time: registrationData.preferredTime.replace('오전 ', ''),
            consent_to_terms: registrationData.agreementChecked,
          },
        };

        const validation = validateFormData(formData);

        if (!validation.isValid) {
          throw new Error(
            `필수 데이터가 누락되었습니다: ${validation.missingFields.join(
              ', '
            )}`
          );
        }

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

        const paymentResult = await attemptPaymentConfirmation(requestData);

        const mutationData = {
          ...formData,
          payment_info: {
            amount:
              paymentResult.card?.amount || parseInt(requestData.amount || '0'),
            payment_date: paymentResult.approvedAt || new Date().toISOString(),
            payment_method: paymentResult.method || '신용카드',
            order_id: requestData.orderId,
            payment_key: requestData.paymentKey,
            card_type: paymentResult.card?.cardType || '카드 타입',
            owner_type: paymentResult.card?.ownerType || '개인',
            currency: paymentResult.currency || 'KRW',
            status: paymentResult.status || 'DONE',
            approve_no: paymentResult.card?.approveNo || '승인번호',
          },
        };

        console.log('mutationData', mutationData);
        mutation.mutate(mutationData);
      } catch (error: Error | any) {
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
