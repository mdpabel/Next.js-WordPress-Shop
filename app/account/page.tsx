// AccountPage.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import FormButton from '@/components/common/form-button';
import OrdersPage from './orders/page';

const AccountPage = () => {
  const { user } = useAuthStore();

  return (
    <div className='mx-auto p-6 max-w-5xl container'>
      <h2 className='mb-6 font-semibold text-2xl text-white'>Dashboard</h2>
      <div className='space-y-8'>
        {/* Welcome Message */}
        <section className='bg-neutral-800 shadow-md p-6 rounded-lg'>
          <h3 className='mb-4 font-semibold text-teal-500 text-xl'>
            Welcome, {user?.displayName}!
          </h3>
          <p className='text-gray-300'>
            We're glad to have you back. Here’s a quick overview of your
            account.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AccountPage;
