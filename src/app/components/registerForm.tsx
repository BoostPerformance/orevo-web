'use client';

import React, { useEffect, useState } from 'react';
import Button from '@/app/components/common/button';
import DatePicker from '@/app/components/datePicker';
import { RegistrationData } from '@/app/types/registration';

type RegisterFormProps = {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  handleSubmit: (e: React.FormEvent) => Promise<void> | void;
  isSubmitting: boolean;
  submitStatus: {
    type: 'success' | 'error' | null;
    message: string;
  };
};

export default function RegisterForm({
  formData,
  setFormData,
  handleSubmit,
  isSubmitting,
  submitStatus,
}: RegisterFormProps) {
  const [mounted, setMounted] = useState(false);
  const [localFormValid, setLocalFormValid] = useState(false);

  // Client-side only mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // 폼 유효성 검사 로직
  useEffect(() => {
    if (!mounted) return;

    const isValid =
      !!formData.name &&
      !!formData.phone &&
      !!formData.ageGroup &&
      !!formData.preferredDate &&
      !!formData.preferredTime &&
      !!formData.selectedClassType &&
      formData.agreementChecked;

    setLocalFormValid(isValid);
  }, [formData, mounted]);

  // 전화번호 형식 검증
  // const validatePhoneNumber = (phone: string) => {
  //   const regex = /^010-\d{4}-\d{4}$/;
  //   return regex.test(phone) ? phone : formData.phone;
  // };

  // 전화번호 입력 핸들러
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!mounted) return;

    let value = e.target.value;
    value = value.replace(/[^\d-]/g, '');

    if (value.length === 3 && !value.includes('-')) {
      value += '-';
    } else if (
      value.length === 8 &&
      value.indexOf('-') === 3 &&
      !value.includes('-', 4)
    ) {
      value = value.slice(0, 8) + '-' + value.slice(8);
    }

    setFormData({ ...formData, phone: value });
  };

  // 날짜 선택 핸들러
  const handleDateChange = (dateString: string) => {
    if (!mounted) return;
    setFormData({ ...formData, preferredDate: dateString });
  };

  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[2rem] py-[2rem] xs:w-[18rem] xs:items-start xs:justify-center"
    >
      <div className="text-gray-4 lg:text-0.875-500 xs:text-0.75-500">
        <span className="text-red-500 ">*</span> 표시는 필수 입력 항목입니다.
      </div>
      <div className="flex flex-col gap-[4rem]">
        <div>
          <label className="block mb-3 lg:text-1.25-500 xs:text-1-500">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            className="border-gray-3 lg:w-2/5 xs:w-full h-[2rem] p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent placeholder:text-1-500"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="이름을 입력해주세요"
          />
        </div>

        <div>
          <label className="block mb-3 lg:text-1.25-500 xs:text-1-500">
            연락처 (010-1234-5678) <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            required
            className="border-gray-3 lg:w-2/5 xs:w-full h-[2rem] p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent placeholder:text-1-500"
            value={formData.phone}
            onChange={handlePhoneChange}
            placeholder="010-1234-5678"
            pattern="010-\d{4}-\d{4}"
            title="010-0000-0000 형식으로 입력해주세요"
          />
          {formData.phone && !/^010-\d{4}-\d{4}$/.test(formData.phone) && (
            <p className="text-red-500 mt-1 text-sm">
              010-0000-0000 형식으로 입력해주세요
            </p>
          )}
        </div>

        <div>
          <label className="block mb-3 lg:text-1.25-500 xs:text-1-500">
            이메일
          </label>
          <input
            type="email"
            className="border-gray-3 lg:w-2/5 xs:w-full h-[2rem] p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent placeholder:text-1-500"
            value={formData.email || ''}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="block mb-4 lg:text-1.25-500 xs:text-1-500">
            연령대 <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-2 text-[1.125rem]">
            {['40대', '50대', '60대', '그 외'].map((age) => (
              <label key={age} className="inline-flex items-center">
                <input
                  type="radio"
                  className="w-5 h-5 mr-2 xs:w-3 xs:h-3"
                  name="ageGroup"
                  value={age}
                  required
                  checked={formData.ageGroup === age}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ageGroup: e.target.value,
                    })
                  }
                />
                {age}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-4 lg:text-1.25-500 xs:text-1-500 ">
            수업 종류 <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-4 text-[1.125rem]">
            {[
              '1개월 멤버십 (300,000원)',
              '10회권 (250,000원)',
              '3회 체험권 (30,000원)',
            ].map((classType) => (
              <label key={classType} className="inline-flex items-center">
                <input
                  type="radio"
                  className="w-5 h-5 mr-2 xs:w-3 xs:h-3"
                  name="classType"
                  value={classType}
                  required
                  checked={formData.selectedClassType === classType}
                  onChange={(e) => {
                    const selectedType = e.target.value;
                    let paymentAmount = 0;

                    switch (selectedType) {
                      case '1개월 멤버십 (300,000원)':
                        paymentAmount = 300000;
                        break;
                      case '10회권 (250,000원)':
                        paymentAmount = 250000;
                        break;
                      case '3회 체험권 (30,000원)':
                        paymentAmount = 30000;
                        break;
                      default:
                        paymentAmount = 0;
                    }

                    setFormData({
                      ...formData,
                      selectedClassType: selectedType,
                      paymentAmount: paymentAmount,
                    });
                  }}
                />
                {classType}
              </label>
            ))}
          </div>
        </div>

        <div>
          <DatePicker
            title="첫 수업 희망일"
            value={formData.preferredDate}
            onChange={handleDateChange}
            minDate={new Date()}
            width="w-2/5"
          />
        </div>

        <div>
          <label className="block mb-4 lg:text-1.25-500 xs:text-1-500">
            참여 원하는 수업 시간 <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-col gap-4">
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
                      preferredTime: e.target.value,
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
          <div className="flex justify-center ">
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
                className="mr-2 w-4 h-4 xs:w-3 xs:h-3"
              />
              <span className="lg:text-1.25-500 xs:text-0.75-500">
                체험권은 첫 방문 후 3주 이내에 사용해야하며,
                <br className="lg:hidden xs:inline" /> 해당 조건을 읽고
                동의합니다. <span className="text-red-500">*</span>
              </span>
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            variant="green"
            type="submit"
            disabled={isSubmitting || !localFormValid}
            className={`w-3/5 ${
              isSubmitting || !localFormValid ? 'bg-gray-400' : 'bg-green'
            } text-white px-8 py-6 rounded-lg hover:bg-green transition-colors text-1.25-500`}
          >
            {isSubmitting ? '처리 중...' : '신청하기 →'}
          </Button>
        </div>
      </div>

      {!localFormValid && (
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
  );
}
