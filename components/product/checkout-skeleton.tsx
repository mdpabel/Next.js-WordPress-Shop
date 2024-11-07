import React from 'react';

const CheckoutSkeleton = () => {
  return (
    <div className='bg-black py-12 min-h-screen text-neutral-300 animate-pulse'>
      <div className='gap-8 grid grid-cols-1 lg:grid-cols-2 mx-auto p-4 max-w-6xl container'>
        {/* Left Column: Contact, Billing, Payment, and Notes */}
        <div className='space-y-6'>
          {/* Contact Information Skeleton */}
          <section className='bg-neutral-800 p-6 rounded-lg'>
            <div className='bg-neutral-700 mb-4 rounded w-3/4 h-6'></div>
            <div className='bg-neutral-700 rounded w-full h-10'></div>
          </section>

          {/* Billing Address Skeleton */}
          <section className='bg-neutral-800 p-6 rounded-lg'>
            <div className='bg-neutral-700 mb-4 rounded w-3/4 h-6'></div>
            <div className='space-y-4'>
              <div className='bg-neutral-700 rounded w-full h-10'></div>
              <div className='bg-neutral-700 rounded w-full h-10'></div>
              <div className='gap-4 grid grid-cols-2'>
                <div className='bg-neutral-700 rounded w-full h-10'></div>
                <div className='bg-neutral-700 rounded w-full h-10'></div>
              </div>
              <div className='bg-neutral-700 rounded w-full h-10'></div>
            </div>
          </section>

          {/* Add a Note Skeleton */}
          <section className='bg-neutral-800 p-6 rounded-lg'>
            <div className='bg-neutral-700 mb-4 rounded w-3/4 h-6'></div>
            <div className='bg-neutral-700 rounded w-full h-24'></div>
          </section>
        </div>

        {/* Right Column: Order Summary, Coupon, Subtotal, Total */}
        <div className='space-y-6'>
          {/* Order Summary Skeleton */}
          <section className='bg-neutral-800 p-6 rounded-lg'>
            <div className='bg-neutral-700 mb-4 rounded w-3/4 h-6'></div>
            <div className='space-y-4'>
              <div className='flex justify-between'>
                <div className='bg-neutral-700 rounded w-1/2 h-4'></div>
                <div className='bg-neutral-700 rounded w-1/4 h-4'></div>
              </div>
              <div className='flex justify-between'>
                <div className='bg-neutral-700 rounded w-1/2 h-4'></div>
                <div className='bg-neutral-700 rounded w-1/4 h-4'></div>
              </div>
            </div>
          </section>

          {/* Apply Coupon Skeleton */}
          <section className='bg-neutral-800 p-6 rounded-lg'>
            <div className='bg-neutral-700 mb-4 rounded w-3/4 h-6'></div>
            <div className='bg-neutral-700 rounded w-full h-10'></div>
          </section>

          {/* Subtotal and Total Skeleton */}
          <section className='space-y-4 bg-neutral-800 p-6 rounded-lg'>
            <div className='flex justify-between'>
              <div className='bg-neutral-700 rounded w-1/2 h-6'></div>
              <div className='bg-neutral-700 rounded w-1/4 h-6'></div>
            </div>
            <div className='flex justify-between border-neutral-700 pt-4 border-t'>
              <div className='bg-neutral-700 rounded w-1/2 h-6'></div>
              <div className='bg-neutral-700 rounded w-1/4 h-6'></div>
            </div>
          </section>

          {/* Place Order Button Skeleton */}
          <div className='p-6'>
            <div className='bg-teal-600 rounded w-full h-12'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSkeleton;
