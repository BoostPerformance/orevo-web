import { loadTossPayments as loadTossPaymentsSDK } from '@tosspayments/payment-sdk';

interface PaymentData {
  amount: number;
  orderId: string;
  orderName: string;
  customerName: string;
  successUrl: string;
  failUrl: string;
}

// interface TossPaymentResponse {
//   paymentKey: string;
//   orderId: string;
//   amount: number;
//   status: string;
//   requestedAt: string;
//   approvedAt: string;
//   lastTransactionKey: string;
//   balanceAmount: number;
//   suppliedAmount: number;
//   vat: number;
//   useInternationalCardOnly: boolean;
//   cultureExpense: boolean;
//   taxFreeAmount: number;
//   taxExemptionAmount: number;
//   cancels: null | Array<{
//     cancelAmount: number;
//     cancelReason: string;
//     taxFreeAmount: number;
//     taxExemptionAmount: number;
//     refundedAmount: number;
//     transactionKey: string;
//     requestedAt: string;
//     approvedAt: string;
//   }>;
//   type: string;
//   method: string;
//   methodDetail: string;
//   card?: {
//     company: string;
//     number: string;
//     installmentPlanMonths: number;
//     approveNo: string;
//     useCardPoint: boolean;
//     cardType: string;
//     ownerType: string;
//     acquireStatus: string;
//     receiptUrl: string;
//   };
// }

// interface TossPaymentsInstance {
//   requestPayment: (
//     method: '카드' | 'CARD',
//     options: PaymentData
//   ) => Promise<TossPaymentResponse>;
// }

// declare global {
//   interface Window {
//     TossPayments: (clientKey: string) => TossPaymentsInstance;
//   }
// }

export async function initTossPayment(data: PaymentData): Promise<void> {
  const tossPayments = await loadTossPaymentsSDK(
    process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY || 'no key'
  );

  await tossPayments.requestPayment('카드', {
    amount: data.amount,
    orderId: data.orderId,
    orderName: data.orderName,
    customerName: data.customerName,
    successUrl: data.successUrl,
    failUrl: data.failUrl,
  });
}

export { loadTossPaymentsSDK as loadTossPayments };
