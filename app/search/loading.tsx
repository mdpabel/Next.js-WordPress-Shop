import React from 'react';

import { cn } from '@/lib/utils';

const ProductCardSkeleton = ({
  className = '',
  firstProduct = false,
}: {
  className?: string;
  firstProduct?: boolean;
}) => {
  return (
    <div
      className={cn(
        'relative bg-black p-4 rounded-lg h-48 text-white border border-transparent animate-pulse',
        className,
      )}>
      {/* Skeleton Title and Price */}
      <div className='top-2 right-2 z-50 absolute p-4 w-full'>
        <div className='mb-2 rounded w-3/5 h-4 text-neutral-900'></div>
        <div className='rounded w-1/4 h-4 text-neutral-900'></div>
      </div>

      {/* Skeleton Product Image */}
      <div className='flex justify-center items-center h-full'>
        <div
          className={cn(
            'text-neutral-900 w-32 h-32 rounded-md',
            firstProduct && 'lg:w-60 lg:h-60',
          )}></div>
      </div>
    </div>
  );
};

const loading = () => {
  return (
    <div className='gap-4 grid grid-cols-2 lg:grid-cols-3'>
      {new Array(10).fill(undefined).map((p, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export default loading;
