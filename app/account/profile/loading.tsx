import React from 'react';

const ProfileSkeleton = () => {
  return (
    <div className='bg-black mx-auto p-8 rounded-lg max-w-md text-neutral-200 animate-pulse'>
      <div className='bg-neutral-800 mx-auto mb-6 rounded w-1/2 h-8'></div>

      <div className='space-y-6'>
        {/* Skeleton for First Name */}
        <div className='space-y-2'>
          <div className='bg-neutral-800 rounded w-1/3 h-4'></div>
          <div className='bg-neutral-900 rounded h-10'></div>
        </div>

        {/* Skeleton for Last Name */}
        <div className='space-y-2'>
          <div className='bg-neutral-800 rounded w-1/3 h-4'></div>
          <div className='bg-neutral-900 rounded h-10'></div>
        </div>

        {/* Skeleton for Email */}
        <div className='space-y-2'>
          <div className='bg-neutral-800 rounded w-1/3 h-4'></div>
          <div className='bg-neutral-900 rounded h-10'></div>
        </div>

        {/* Skeleton for New Password */}
        <div className='space-y-2'>
          <div className='bg-neutral-800 rounded w-1/3 h-4'></div>
          <div className='bg-neutral-900 rounded h-10'></div>
        </div>

        {/* Skeleton for Update Button */}
        <div className='bg-teal-700 rounded w-full h-12'></div>
      </div>

      {/* Skeleton for Log Out Button */}
      <div className='bg-red-600 mt-6 rounded w-full h-10'></div>
    </div>
  );
};

export default ProfileSkeleton;
