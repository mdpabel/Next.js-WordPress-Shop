'use client';
import React from 'react';
import { FiPlus, FiMinus, FiTrash } from 'react-icons/fi';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import useCartStore from '@/stores/useCartStore';
import CheckoutButton from './checkout-button';

const CartDrawer = () => {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    totalAmount,
    isCartOpen,
    toggleCartDrawer,
  } = useCartStore();

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCartDrawer}>
      <SheetContent
        side='right'
        className='flex flex-col bg-black w-full max-w-full lg:max-w-[400px] text-neutral-300'>
        {/* Header */}
        <SheetHeader className='px-4 py-4'>
          <SheetTitle className='font-semibold text-lg text-neutral-200'>
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {/* Cart Items */}
        <div className='flex-1 space-y-4 px-4 pb-4 max-h-[60vh] overflow-y-auto'>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className='flex justify-between items-center bg-gray-800 p-4 rounded-lg'>
              <div className='flex flex-col'>
                <span className='text-neutral-100'>{item.name}</span>
                <div className='flex items-center space-x-2 mt-2'>
                  <button
                    className='hover:bg-teal-600 p-1 border rounded-md text-neutral-300'
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                    <FiMinus />
                  </button>
                  <span className='mx-2'>{item.quantity}</span>
                  <button
                    className='hover:bg-teal-600 p-1 border rounded-md text-neutral-300'
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Price and Delete Button */}
              <div className='flex items-center space-x-4'>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button
                  className='text-teal-500 hover:text-teal-700'
                  onClick={() => removeItem(item.id)}
                  aria-label='Remove item'>
                  <FiTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Subtotal */}
        <SheetFooter className='border-neutral-700 px-4 pt-4 pb-6 border-t'>
          <div className='flex justify-between items-center'>
            <span className='font-medium text-neutral-300'>Subtotal</span>
            <span className='font-bold text-teal-600'>
              ${totalAmount.toFixed(2)}
            </span>
          </div>
        </SheetFooter>

        {/* Action Buttons */}
        <CheckoutButton />
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
