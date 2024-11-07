// AccountPage.tsx
'use client';
import { useAuthStore } from '@/stores/useAuthStore';
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
