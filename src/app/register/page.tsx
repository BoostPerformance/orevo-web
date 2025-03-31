'use client';

import { Suspense } from 'react';
import RegisterContent from '../components/registerContent';

export default function RegisterPage() {
  return (
    <div className="w-full flex flex-col justify-center items-center xs:w-[100%] xs:px-[0rem]">
      <Suspense fallback={<div className="p-4 text-center">로딩 중...</div>}>
        <RegisterContent />
      </Suspense>
    </div>
  );
}
