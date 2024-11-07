'use client';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '../ui/button';
import Link from 'next/link';
import useCartStore from '@/stores/useCartStore';
import { toast } from 'react-toastify';

const CheckoutButton = () => {
  const { isAuthenticated } = useAuthStore();
  const { toggleCartDrawer } = useCartStore();

  if (!isAuthenticated) {
    return (
      <Button
        onClick={() => {
          toast.error('Please log in to proceed with the checkout', {
            className: 'toast-custom',
          });
          toggleCartDrawer(false);
        }}
        className='bg-teal-600 hover:bg-teal-700 px-6 rounded-md w-full font-semibold text-white'
        asChild>
        <Link href='/login?redirect_url=checkout'>Login to Checkout</Link>
      </Button>
    );
  }

  return (
    <Button
      className='bg-teal-600 hover:bg-teal-700 px-6 rounded-md w-full font-semibold text-white'
      asChild
      onClick={() => {
        toggleCartDrawer(false);
      }}>
      <Link href='/checkout'> Proceed to Checkout</Link>
    </Button>
  );
};

export default CheckoutButton;
