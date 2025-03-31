'use client';

import { useState } from 'react';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import RegisterForm from '@/app/components/registerForm';
import { RegistrationData } from '@/app/types/registration';
import PricingChart from '@/app/components/pricingChart';
import WeeklySchedule from '@/app/components/weeklySchedule';
import { useSearchParams } from 'next/navigation';

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const priceParam = searchParams.get('price');
  const price = priceParam ? Number(priceParam.replace(/,/g, '')) : 0;

  const [formData, setFormData] = useState<RegistrationData>({
    users: {
      name: '',
      phone: '',
      email: '',
      ageGroup: '',
      profile_image_url: '',
      kakao_id: '',
    },
    programs: {
      program_type: '',
      preferred_start_date: '',
      preferred_time: '',
      consent_to_terms: false,
    },
    payments: {
      amount: 0,
      payment_method: '',
      payment_key: '',
      order_id: '',
      payment_date: '',
    },
    trial_registration: {
      consent_to_terms: false,
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // 폼 유효성 검사는 RegisterForm 컴포넌트 내부에서 처리됩니다

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form Data Before Submit:', {
      name: formData.users.name,
      phone: formData.users.phone,
      email: formData.users.email,
      ageGroup: formData.users.ageGroup,
      preferredDate: formData.programs.preferred_start_date,
      preferredTime: formData.programs.preferred_time,
      selectedClassType: formData.programs.program_type,
      consent_to_terms: formData.trial_registration.consent_to_terms,
      paymentAmount: formData.payments.amount,
    });

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const orderId = nanoid();
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'no key'
      );

      // console.log('Form Data:', formData);

      localStorage.setItem(
        'formData',
        JSON.stringify({
          ...formData,
          payment_info: {
            ...formData.payments,
            order_id: orderId,
            amount: Number(`${price}`),
          },
        })
      );

      console.log('새로운 주문번호 생성:', orderId);
      //console.log('Form data saved:', JSON.stringify(formData));

      await tossPayments.requestPayment('카드', {
        amount: Number(`${formData.payments.amount}`),
        orderId,
        orderName: `${formData.programs.program_type}`,
        successUrl: `${window.location.origin}/payment/complete`,
        failUrl: `${window.location.origin}/register`,
      });

      // // Save form data to localStorage for retrieval after payment
      // localStorage.setItem(
      //   'registrationData',
      //   JSON.stringify({
      //     ...formData,
      //     orderId,
      //     paymentStatus: 'pending',
      //     submissionDate: new Date().toISOString(),
      //   })
      // );

      // // API 호출 예시 (실제 구현은 필요에 따라 조정)
      // // 여기서 수업 유형 및 다른 정보를 포함하여 데이터베이스에 저장
      // try {
      //   const response = await fetch('/api/payment', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       name: formData.name,
      //       phone: formData.phone,
      //       email: formData.email || null,
      //       age_group:
      //         formData.ageGroup === '40대'
      //           ? '40s'
      //           : formData.ageGroup === '50대'
      //           ? '50s'
      //           : formData.ageGroup === '60대'
      //           ? '60s'
      //           : 'OTHER',
      //       preferred_start_date: formData.preferredDate,
      //       preferred_time: formData.preferredTime.replace('오전 ', ''),
      //       class_type: formData.selectedClassType,
      //       consent_to_terms: formData.agreementChecked,
      //       payment_status: 'PENDING',
      //       price: formData.paymentAmount,
      //       orderId: orderId,
      //     }),
      //   });

      //   if (!response.ok) {
      //     throw new Error('서버 등록 실패');
      //   }
      // } catch (apiError) {
      //   console.error('API call failed:', apiError);
      //   // API 호출이 실패해도 결제는 진행
      // }

      // // Request payment
      // await tossPayments.requestPayment('카드', {
      //   amount: formData.paymentAmount || 0,
      //   orderId,
      //   orderName: formData.orderName,
      //   customerName: formData.name,
      //   successUrl: `${window.location.origin}/payment/success`,
      //   failUrl: `${window.location.origin}/payment/fail`,
      // });
    } catch (error) {
      console.error('Error initiating payment:', error);
      setSubmitStatus({
        type: 'error',
        message:
          error instanceof Error
            ? error.message
            : '결제 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center xs:w-[100%] xs:px-[0rem]">
      <div className="xs:flex xs:flex-col xs:items-center w-full max-w-[50rem] px-4 py-8">
        <div className="lg:text-2.5-700 xs:text-1.5-700 font-bold mb-6">
          Orevo 신청하기
        </div>

        <div className="mb-8">
          <div className="mb-4 lg:text-1.25-500 xs:text-0.8-500">
            Orevo는 40대 이상 여성들을 위한 전용 운동 공간으로,
            <br className="lg:hidden xs:inline" /> 서울대 & 연세대 체육 전공
            코치진이 직접 수업합니다. 💪
          </div>
          <div className="mb-4 lg:text-1.25-500 xs:text-0.8-500">
            전문적인 코칭 아래 근력운동과 유산소 운동을 균형 있게 배우며,
            <br className="lg:hidden xs:inline" /> 부상 걱정 없이 안전하게
            운동할 수 있는 곳입니다. <br /> Orevo에서 건강한 변화를 경험하세요!
          </div>

          <div className="space-y-8 mb-[6rem]">
            <WeeklySchedule />
            <PricingChart />
          </div>
        </div>

        <div className="mb-8 flex flex-col items-center w-full gap-1">
          <div className="mb-4 text-1.125-500 text-gray-700 xs:text-0.75-500">
            📍 위치 : 서울 서대문구 증가로 26-1 1층 (연희삼거리 근처)
          </div>
          <div className="relative w-[35rem] h-[30rem] mb-4 xs:w-[20rem] xs:h-[15rem]">
            <Image
              src="/images/orevo-map.png"
              alt="Orevo 위치"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className="lg:text-1.125-500 xs:text-0.75-500 text-gray-13 ">
            체험권 신청이 완료되면 확인차 개별 연락을 드립니다. <br />곧 Orevo
            스튜디오에서 만나요!
          </div>
        </div>
      </div>
      <RegisterForm
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitStatus={submitStatus}
      />
    </div>
  );
}
