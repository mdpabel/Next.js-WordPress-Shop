import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FiXCircle } from 'react-icons/fi';

const CheckoutCancel = () => {
  return (
    <div className='flex justify-center items-center bg-black min-h-[100dvh] text-neutral-300'>
      <div className='p-6 rounded-lg max-w-md text-center'>
        <FiXCircle className='mx-auto mb-4 text-6xl text-red-500' />
        <h2 className='mb-4 font-bold text-3xl text-red-500'>
          Payment Canceled
        </h2>
        <p className='mb-6 text-neutral-400'>
          It seems your payment was not completed. If you need assistance, feel
          free to contact support.
        </p>
        <Button
          asChild
          className='bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-md w-full font-semibold text-white'>
          <Link href='/cart'>Return to Cart</Link>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutCancel;
