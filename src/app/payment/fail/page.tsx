'use client';

import { useRouter } from 'next/navigation';

export default function PaymentFailPage() {
  const router = useRouter();
  //const searchParams = useSearchParams();
  //const code = searchParams.get('code');
  //const message = searchParams.get('message');

  const handleRetry = () => {
    router.push('/register');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md p-8">
        <h1 className="text-2xl font-bold mb-4">결제 실패</h1>
        <p className="text-gray-600 mb-4">
          결제 중 문제가 발생했습니다.
          {/* {message && (
            <>
              <br />
              <span className="text-red-600">{message}</span>
            </>
          )} */}
        </p>
        <button
          onClick={handleRetry}
          className="bg-green text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
        >
          다시 시도하기
        </button>
      </div>
    </div>
  );
}
