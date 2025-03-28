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

    const responseData = await response.json();

    if (!response.ok || responseData.status === 'FAILED') {
      return NextResponse.json(
        {
          message: responseData.message || '결제 확인 실패',
          code: response.status,
        },
        { status: response.status }
      );
    }

    // Send Slack notification about successful payment
    try {
      const webhookUrl = process.env.SLACK_WEBHOOK_URL_TEST;
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            blocks: [
              {
                type: 'header',
                text: {
                  type: 'plain_text',
                  text: '💰 결제가 완료되었습니다!',
                  emoji: true,
                },
              },
              {
                type: 'section',
                fields: [
                  {
                    type: 'mrkdwn',
                    text: `*주문번호:*\n${orderId}`,
                  },
                  {
                    type: 'mrkdwn',
                    text: `*결제금액:*\n${amount}원`,
                  },
                ],
              },
              {
                type: 'section',
                fields: [
                  {
                    type: 'mrkdwn',
                    text: `*결제시간:*\n${
                      responseData.approvedAt || new Date().toISOString()
                    }`,
                  },
                  {
                    type: 'mrkdwn',
                    text: `*결제방식:*\n${responseData.method || '카드'}`,
                  },
                ],
              },
            ],
          }),
        });
      }
    } catch (error) {
      console.error('Error sending Slack notification:', error);
    }

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json(
      { error: 'Error processing payment' },
      { status: 500 }
    );
  }
}
