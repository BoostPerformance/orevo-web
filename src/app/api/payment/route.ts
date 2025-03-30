import { NextResponse } from 'next/server';

interface PaymentConfirmRequest {
  amount: string;
  approvedAt?: string;
  method?: string;
  paymentKey?: string;
  status?: string;
  orderId: string;
  orderName: string;
  cardType?: string;
  ownerType?: string;
  currency?: string;
}

export async function POST(req: Request) {
  try {
    const { amount, orderId, paymentKey }: PaymentConfirmRequest =
      await req.json();

    const url = 'https://api.tosspayments.com/v1/payments/confirm';

    const secretKey = process.env.TOSS_SECRET_KEY?.trim();
    if (!secretKey) {
      throw new Error(
        'TOSS_SECRET_KEY is not defined in environment variables'
      );
    }
    const basicToken = Buffer.from(secretKey + ':', 'utf-8').toString('base64');

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
    console.log('리스폰스', response);

    const responseData = await response.json();
    //console.log('Toss API response:', responseData);

    if (!response.ok || responseData.status === 'FAILED') {
      console.error('Toss API error:', responseData);

      return NextResponse.json(
        {
          message: responseData.message || '결제 확인 실패 route.ts',

          code: response.status,
        },
        { status: response.status }
      );
    }

    // const paymentInfo = {
    //   ...responseData,
    //   payment_date: responseData.approvedAt
    //     ? new Date(responseData.approvedAt).toISOString()
    //     : 'data 찾을수없음',
    // };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Payments error:', error);

    return NextResponse.json(
      { error: 'Error processing payment' },
      { status: 500 }
    );
  }
}
