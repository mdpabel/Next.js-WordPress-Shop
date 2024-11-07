// OrderSkeleton.tsx
import React from 'react';

const OrderSkeleton = () => (
  <div className='bg-neutral-800 shadow-lg p-6 rounded-lg animate-pulse'>
    {/* Order header placeholder */}
    <div className='bg-neutral-700 mb-4 rounded w-32 h-6'></div>
    <div className='bg-neutral-700 mb-2 rounded w-20 h-4'></div>
    <div className='bg-neutral-700 mb-2 rounded w-28 h-4'></div>
    <div className='bg-neutral-700 mb-4 rounded w-24 h-4'></div>
    <div className='bg-neutral-700 mb-4 rounded w-32 h-4'></div>

    {/* Order items placeholder */}
    <div className='flex items-center space-x-4 mt-4'>
      <div className='bg-neutral-700 rounded w-12 h-12'></div>
      <div className='bg-neutral-700 rounded w-40 h-4'></div>
    </div>
    <div className='flex items-center space-x-4 mt-2'>
      <div className='bg-neutral-700 rounded w-12 h-12'></div>
      <div className='bg-neutral-700 rounded w-36 h-4'></div>
    </div>

    {/* Payment button placeholder */}
    <div className='bg-teal-700 mt-6 rounded w-40 h-10'></div>
  </div>
);

const OrdersSkeleton = () => {
  return (
    <div className='mx-auto p-6 max-w-5xl'>
      <h2 className='mb-6 font-semibold text-2xl text-white'>Your Orders</h2>
      <ul className='space-y-6'>
        {[...Array(3)].map((_, i) => (
          <OrderSkeleton key={i} />
        ))}
      </ul>
    </div>
  );
};

export default OrdersSkeleton;
