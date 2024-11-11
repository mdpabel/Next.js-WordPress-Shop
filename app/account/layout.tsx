// app/account/layout.tsx

import React from 'react';
import Sidebar from '@/components/layout/sidebar';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='bg-black min-h-screen text-neutral-300'>
      <div className='lg:flex mx-auto px-6 py-8 p-4 max-w-7xl container'>
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content */}
        <main className='bg-neutral-900 mt-6 lg:mt-0 p-6 rounded-lg w-full lg:w-3/4'>
          {children}
        </main>
      </div>
    </div>
  );
}
