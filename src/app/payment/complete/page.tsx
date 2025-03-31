import PaymentComplete from '@/app/components/paymentComplete';
import React, { Suspense } from 'react';
import Loading from '@/app/components/common/loading';
import { viewport } from './viewport';

export { viewport };

const Complete = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Loading />
        </div>
      }
    >
      <PaymentComplete />
    </Suspense>
  );
};

export default Complete;
