import { NextResponse } from 'next/server';

interface PaymentConfirmRequest {
  amount: string | null;
  paymentKey: string | null;
  orderId: string | null;
}

export async function POST(req: Request) {
  try {
    const { amount, orderId, paymentKey }: PaymentConfirmRequest =
      await req.json();

    if (!amount || !orderId || !paymentKey) {
      return NextResponse.json(
        { error: true, message: '필수 결제 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    const url = 'https://api.tosspayments.com/v1/payments/confirm';

    const secretKey = process.env.TOSS_SECRET_KEY?.trim();
    if (!secretKey) {
      throw new Error(
        'TOSS_SECRET_KEY is not defined in environment variables'
      );
    }

    const basicToken = Buffer.from(secretKey + ':', 'utf-8').toString('base64');

    console.log('Sending request to Toss API:', {
      amount,
      orderId,
      paymentKey,
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount,
        orderId,
        paymentKey,
      }),
    });

    const responseData = await response.json();
    console.log('Toss API response status:', response.status);

    if (!response.ok || responseData.status === 'FAILED') {
      console.error('Toss API error:', responseData);
      return NextResponse.json(
        {
          error: true,
          message: responseData.message || '결제 확인 실패',
          code: response.status,
        },
        { status: response.status }
      );
    }

    // 성공적인 응답 반환
    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Payments error:', error);
    return NextResponse.json(
      { error: true, message: 'Error processing payment' },
      { status: 500 }
    );
  }
}
