'use client';

import React from 'react';
import Button from '@/app/components/common/button';
import DatePicker from '@/app/components/datePicker';
import { RegistrationData } from '@/app/types/registration';

type RegisterFormProps = {
  formData: RegistrationData;
  setFormData: React.Dispatch<React.SetStateAction<RegistrationData>>;
  handleSubmit: (e: React.FormEvent) => Promise<void> | void;
  isSubmitting: boolean;
  isFormValid: boolean;
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
  isFormValid,
  submitStatus,
}: RegisterFormProps) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-[3rem] py-[2rem] xs:w-[18rem] xs:items-start xs:justify-center"
    >
      <div className="text-gray-3 text-0.875-500 ">
        <span className="text-red-500 ">*</span> 표시는 필수 입력 항목입니다.
      </div>
      <div>
        <label className="block mb-2 lg:text-1.25-500 xs:text-1-500">
          이름 <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          required
          className="lg:w-2/5 xs:w-full h-[2rem] p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent placeholder:text-1-500"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="이름을 입력해주세요"
        />
      </div>

      <div>
        <label className="block mb-2 lg:text-1.25-500 xs:text-1-500">
          연락처 (010-1234-5678)<span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          required
          className="lg:w-2/5 xs:w-full h-[2rem] p-2 border rounded focus:ring-2 focus:ring-green focus:border-transparent placeholder:text-1-500"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="010-0000-0000"
        />
      </div>

      <div>
        <label className="block mb-2 lg:text-1.25-500 xs:text-1-500">
          연령대 <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col gap-2">
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
          onChange={(date) => setFormData({ ...formData, preferredDate: date })}
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

        <div className="flex justify-center">
          <Button
            variant="green"
            type="submit"
            disabled={isSubmitting || !isFormValid}
            className={`w-3/5 ${
              isSubmitting || !isFormValid ? 'bg-gray-400' : 'bg-green'
            } text-white px-8 py-6 rounded-lg hover:bg-green transition-colors text-1.25-500`}
          >
            {isSubmitting ? '처리 중...' : '신청하기 →'}
          </Button>
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
  );
}
