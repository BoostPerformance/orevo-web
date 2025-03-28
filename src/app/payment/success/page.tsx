'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');
    const amount = searchParams.get('amount');

    if (!paymentKey || !orderId || !amount) {
      router.push('/payment/fail');
      return;
    }

    // Verify payment with your backend
    const verifyPayment = async () => {
      try {
        const response = await fetch('/api/payment/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: parseInt(amount),
          }),
        });

        if (!response.ok) {
          throw new Error('Payment verification failed');
        }

        // Redirect to completion page
        router.push('/payment/complete');
      } catch (error) {
        console.error('Payment verification error:', error);
        router.push('/payment/fail');
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">결제 처리 중</h1>
        <p className="text-gray-600">
          결제를 확인하고 있습니다. 잠시만 기다려주세요.
        </p>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">로딩 중</h1>
            <p className="text-gray-600">결제 정보를 확인하고 있습니다.</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
