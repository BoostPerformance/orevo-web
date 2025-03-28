'use client';

import { useRouter } from 'next/navigation';

export default function PaymentCompletePage() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md p-8">
        <h1 className="text-2xl font-bold mb-4">신청이 완료되었습니다!</h1>
        <p className="text-gray-600 mb-6">
          체험 수업 신청이 성공적으로 완료되었습니다.
          <br />
          담당자가 확인 후 연락드리겠습니다.
        </p>
        <button
          onClick={handleHome}
          className="bg-green text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}
