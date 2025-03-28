'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import RegisterForm from '@/app/components/registerForm';
import { RegistrationData } from '@/app/types/registration';
import PricingChart from '@/app/components/pricingChart';
import WeeklySchedule from '@/app/components/weeklySchedule';

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    phone: '',
    ageGroup: '40대',
    preferredDate: '',
    preferredTime: '오전 08:15',
    agreementChecked: false,
    paymentAmount: 30000,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  // Validate form data
  useEffect(() => {
    const validateForm = () => {
      const isNameValid = formData.name.trim().length >= 2;
      const isPhoneValid = /^[0-9]{3}-[0-9]{4}-[0-9]{4}$/.test(formData.phone);
      const isAgeGroupValid = !!formData.ageGroup;
      const isPreferredDateValid = formData.preferredDate !== '';
      const isPreferredTimeValid = !!formData.preferredTime; // 어떤 시간이든 선택만 되어 있으면 유효
      const isAgreementValid = formData.agreementChecked;

      setIsFormValid(
        isNameValid &&
          isPhoneValid &&
          isAgeGroupValid &&
          isPreferredDateValid &&
          isPreferredTimeValid &&
          isAgreementValid
      );
    };

    validateForm();
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) {
      setSubmitStatus({
        type: 'error',
        message: '모든 필수 항목을 올바르게 입력해주세요.',
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      // Generate unique order ID
      const orderId = nanoid();

      // Load Toss Payments
      const tossPayments = await loadTossPayments(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'no key'
      );

      // Save form data to localStorage for retrieval after payment
      localStorage.setItem(
        'registrationData',
        JSON.stringify({
          ...formData,
          orderId,
          paymentStatus: 'pending',
          submissionDate: new Date().toISOString(),
        })
      );

      // Request payment
      await tossPayments.requestPayment('카드', {
        amount: formData.paymentAmount,
        orderId,
        orderName: 'Orevo 3회 체험권',
        customerName: formData.name,
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
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
    <div className="w-full flex flex-col justify-center items-center xs:w-[80%] xs:px-[2rem]">
      <div className="w-full max-w-[50rem] px-4 py-8">
        <div className="text-2.5-700 font-bold mb-6">
          Orevo 3회 체험 신청하기
        </div>

        <div className="mb-8">
          <p className="mb-4">
            Orevo는 40대 이상 여성들을 위한 전용 운동 공간으로, 서울대 & 연세대
            체육 전공 코치진이 직접 수업합니다. 💪
          </p>
          <p className="mb-4">
            전문적인 코칭 아래 근력운동과 유산소 운동을 균형 있게 배우며, 부상
            걱정 없이 안전하게 운동할 수 있는 곳입니다. Orevo에서 건강한 변화를
            경험하세요!
          </p>

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
        isFormValid={isFormValid}
        submitStatus={submitStatus}
      />
    </div>
  );
}
