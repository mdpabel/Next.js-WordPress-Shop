import StoreSidebar from '@/components/layout/store-sidebar';
import React from 'react';

const StoreLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-black min-h-screen text-neutral-300'>
      <div className='lg:flex mx-auto px-6 py-8 p-4 max-w-7xl container'>
        {/* Sidebar Navigation */}
        <aside className='bg-neutral-900 mt-6 lg:mt-0 p-6 w-full lg:w-[30%]'>
          <StoreSidebar />
        </aside>

        {/* Main Content */}
        <main className='bg-neutral-900 mt-6 lg:mt-0 p-6 w-full lg:w-[70%]'>
          {children}
        </main>
      </div>
    </div>
  );
};

export default StoreLayout;
