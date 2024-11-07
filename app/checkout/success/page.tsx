'use client';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/useCartStore';
import Link from 'next/link';
import { useEffect } from 'react';
import { FiCheckCircle } from 'react-icons/fi';

const CheckoutSuccess = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div className='flex justify-center items-center bg-black min-h-[100dvh] text-neutral-300'>
      <div className='p-6 rounded-lg max-w-md text-center'>
        <FiCheckCircle className='mx-auto mb-4 text-6xl text-teal-600' />
        <h2 className='mb-4 font-bold text-3xl text-teal-600'>Thank You!</h2>
        <p className='mb-6 text-neutral-400'>
          Your payment was successful, and your order is on its way.
        </p>
        <Button
          asChild
          className='bg-teal-600 hover:bg-teal-700 px-6 py-3 rounded-md w-full font-semibold text-white'>
          <Link href='/account/orders'>View Order Details</Link>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
