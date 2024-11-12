'use client';
import Link from 'next/link';
import { FiMenu, FiShoppingCart, FiSearch, FiUser } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import useCartStore from '@/stores/useCartStore';
import { useAuthStore } from '@/stores/useAuthStore';
import CartDrawer from '../product/cart-drawer';
import { Category } from '@/types/category';
import Search from './search';

const SmallScreenNavbar = ({ categories }: { categories: Category[] }) => {
  const { toggleCartDrawer, cartItems } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const cartQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className='flex justify-between items-center md:hidden p-4'>
      {/* Mobile Navigation Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' className='bg-black hover:bg-black/80 px-3'>
            <FiMenu className='text-neutral-200' />
          </Button>
        </SheetTrigger>

        <SheetContent
          style={{
            maxWidth: '100%',
            width: '100%',
          }}
          side='left'
          className='bg-black text-neutral-300'>
          <SheetHeader>
            <SheetTitle className='text-neutral-200'>Menu</SheetTitle>
            <SheetDescription>
              <div className='relative mt-4 px-4 w-full'>
                <Search />
              </div>
            </SheetDescription>
          </SheetHeader>
          <div className='px-4'>
            <nav className='flex flex-col space-y-4 mt-6'>
              <Link
                href='/search'
                className='text-neutral-300 hover:text-neutral-200'>
                All
              </Link>
              {categories.map((category) => (
                <Link
                  href={`/search/${category.slug}`}
                  key={category.id}
                  className='text-neutral-300 hover:text-neutral-200'>
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <Link href='/' className='flex items-center space-x-2'>
        <div className='flex justify-center items-center border-neutral-200 bg-black border rounded-xl w-[40px] h-[40px]'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            aria-label='Acme Store logo'
            viewBox='0 0 32 28'
            className='w-[16px] h-[16px] fill-neutral-300'>
            <path d='M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z' />
            <path d='M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z' />
          </svg>
        </div>
      </Link>

      <div className='flex items-center space-x-4'>
        {/* User Dashboard or Sign-In */}
        {isAuthenticated ? (
          <Link
            href='/account'
            className='text-neutral-300 hover:text-neutral-200'>
            <FiUser />
          </Link>
        ) : (
          <Link
            href='/login'
            className='text-neutral-300 hover:text-neutral-200'>
            Sign In
          </Link>
        )}

        {/* Cart Icon with Drawer */}
        <button
          aria-label='Open cart'
          className='relative flex items-center'
          onClick={() => toggleCartDrawer(true)}>
          <div className='flex justify-center items-center border-neutral-200 border rounded-md w-11 h-11 text-neutral-300'>
            <FiShoppingCart className='w-5 h-5 transition-all ease-in-out hover:scale-110' />
          </div>

          {/* Quantity Badge */}
          {cartQuantity > 0 && (
            <span className='-top-1 -right-1 absolute flex justify-center items-center bg-teal-600 rounded-full w-5 h-5 font-bold text-neutral-300 text-xs'>
              {cartQuantity}
            </span>
          )}
        </button>
      </div>

      {/* Cart Drawer for Small Screen */}
      <CartDrawer />
    </div>
  );
};

export default SmallScreenNavbar;
