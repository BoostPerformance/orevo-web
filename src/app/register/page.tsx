'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { nanoid } from 'nanoid';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import DatePicker from '../components/datePicker';
import { RegistrationData } from '@/types/registration';
import PricingChart from '../components/pricingChart';
import WeeklySchedule from '../components/weeklySchedule';

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
    <div className="w-full flex justify-center">
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

          <div className="space-y-8 mb-8">
            <WeeklySchedule />
            <PricingChart />
          </div>
        </div>

        <div className="mb-8">
          <p className="mb-4 text-1.125-500 text-gray-700">
            📍 위치 : 서울 서대문구 증가로 26-1 1층 (연희삼거리 근처)
          </p>
          <div className="relative w-full h-[600px] mb-4">
            <Image
              src="/images/orevo-map.png"
              alt="Orevo 위치"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
          <p className="text-sm text-gray-600">
            체험권 신청이 완료되면 확인차 개별 연락을 드립니다. <br />곧 Orevo
            스튜디오에서 만나요!
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[3rem] py-[2rem]"
        >
          <div className="text-gray-3 text-0.875-500">
            <span className="text-red-500 ">*</span> 표시는 필수 입력
            항목입니다.
          </div>
          <div>
            <label className="block mb-2 text-1.25-500">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-2/5 h-[2rem] p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent placeholder:text-1-500"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="이름을 입력해주세요"
            />
          </div>

          <div>
            <label className="block mb-2 text-1.25-500">
              연락처 (010-1234-5678)<span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              required
              className="w-2/5 h-[2rem] p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent placeholder:text-1-500"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block mb-2 text-1.25-500">
              연령대 <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-col gap-2">
              {['40대', '50대', '60대', '그 외'].map((age) => (
                <label key={age} className="inline-flex items-center">
                  <input
                    type="radio"
                    className="w-5 h-5 mr-2"
                    name="ageGroup"
                    value={age}
                    required
                    checked={formData.ageGroup === age}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        ageGroup: e.target.value as
                          | '40대'
                          | '50대'
                          | '60대'
                          | '그 외',
                      })
                    }
                  />
                  {age}
                </label>
              ))}
            </div>
          </div>

          <div>
            <DatePicker
              title="첫 수업 희망일"
              value={formData.preferredDate}
              onChange={(date) =>
                setFormData({ ...formData, preferredDate: date })
              }
              minDate={new Date()}
              width="w-2/5"
            />
          </div>

          <div>
            <label className="block mb-4 text-1.25-500">
              참여 원하는 수업 시간 <span className="text-red-500">*</span>
            </label>
            <div className=" flex flex-col gap-4">
              {['오전 08:15', '오전 09:30', '오전 10:45'].map((time) => (
                <label key={time} className="flex items-center text-[1.125rem]">
                  <input
                    type="radio"
                    name="preferredTime"
                    value={time}
                    required
                    checked={formData.preferredTime === time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredTime: e.target.value as
                          | '오전 08:15'
                          | '오전 09:30'
                          | '오전 10:45',
                      })
                    }
                    className="mr-2 w-5 h-5 border border-gray-300"
                  />
                  {time}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <label className="inline-flex items-center ">
                <input
                  type="checkbox"
                  required
                  checked={formData.agreementChecked}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      agreementChecked: e.target.checked,
                    })
                  }
                  className="mr-2 w-4 h-4"
                />
                <span>
                  체험권은 첫 방문 후 3주 이내에 사용해야하며, 해당 조건을 읽고
                  동의합니다. <span className="text-red-500">*</span>
                </span>
              </label>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className={`w-3/5 ${
                  isSubmitting || !isFormValid ? 'bg-gray-400' : 'bg-green'
                } text-white px-8 py-6 rounded-lg hover:bg-green transition-colors text-1.25-500`}
              >
                {isSubmitting ? '처리 중...' : '체험권 신청하기 →'}
              </button>
            </div>
          </div>

          {!isFormValid && (
            <div className="text-red-500 text-center">
              모든 필수 항목을 입력해주세요.
            </div>
          )}

          {submitStatus.type && (
            <div
              className={`mt-4 p-4 rounded-lg ${
                submitStatus.type === 'success'
                  ? 'bg-green-50 text-green-800'
                  : 'bg-red-50 text-red-800'
              }`}
            >
              {submitStatus.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
