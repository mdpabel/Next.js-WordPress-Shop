'use client';
import Link from 'next/link';
import {
  FiShoppingBag,
  FiShoppingCart,
  FiSearch,
  FiUser,
} from 'react-icons/fi';
import { Input } from '../ui/input';
import useCartStore from '@/stores/useCartStore';
import { useAuthStore } from '@/stores/useAuthStore';
import CartDrawer from '../product/cart-drawer';
import { Category } from '@/types/category';
import Search from './search';
import { Suspense } from 'react';

const BigScreenNavbar = ({ categories }: { categories: Category[] }) => {
  const { cartItems, toggleCartDrawer } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='md:flex justify-between items-center hidden lg:px-6 p-4'>
      {/* First Column: Logo and Main Links */}
      <div className='flex items-center space-x-6 md:w-1/3'>
        <Link href='/' className='flex items-center space-x-2'>
          <div className='flex justify-center items-center border-neutral-200 bg-black border rounded-xl w-[40px] h-[40px]'>
            <FiShoppingBag className='w-5 h-5 text-neutral-300' />
          </div>
        </Link>

        {/* Main Menu Links */}
        <ul className='flex space-x-6 text-sm'>
          <li>
            <Link
              href='/search'
              className='text-base text-neutral-300 hover:text-neutral-200 hover:underline'>
              All
            </Link>
          </li>
          {categories.map((category) => (
            <li key={category.id}>
              <Link
                href={`/search/${category.slug}`}
                className='text-base text-neutral-300 hover:text-neutral-200 hover:underline'>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Second Column: Search Input */}M
      <Suspense fallback='loading...'>
        <Search />
      </Suspense>
      {/* Third Column: Cart Icon and User Dashboard */}
      <div className='flex justify-end items-center space-x-6 md:w-1/3'>
        {/* User Dashboard Link */}
        {isAuthenticated ? (
          <Link
            href='/account'
            className='text-neutral-300 hover:text-neutral-200'>
            Dashboard
          </Link>
        ) : (
          <Link
            href='/login'
            className='text-neutral-300 hover:text-neutral-200'>
            Sign In
          </Link>
        )}

        {/* Cart Icon with Badge */}
        <button
          aria-label='Open cart'
          className='relative flex items-center'
          onClick={() => toggleCartDrawer(true)}>
          <div className='flex justify-center items-center border rounded-md w-10 h-10 text-neutral-300'>
            <FiShoppingCart className='w-4 h-4 transition-all ease-in-out hover:scale-110' />
          </div>

          {/* Quantity Badge */}
          {cartQuantity > 0 && (
            <span className='-top-1 -right-1 absolute flex justify-center items-center bg-teal-600 rounded-full w-5 h-5 font-bold text-neutral-300 text-xs'>
              {cartQuantity}
            </span>
          )}
        </button>
      </div>
      {/* Cart Drawer */}
      <CartDrawer />
    </div>
  );
};

export default BigScreenNavbar;
