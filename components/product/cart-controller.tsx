'use client';
import React, { useState } from 'react';
import useCartStore from '@/stores/useCartStore';
import { WooProduct } from '@/types/woo-product';
import { Button } from '../ui/button';

const CartController = ({ product }: { product: WooProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem, toggleCartDrawer } = useCartStore();

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the form from reloading the page

    // Add item to the cart
    addItem({
      id: product.id,
      quantity,
      name: product.name,
      price: parseFloat(product.price),
    });

    toggleCartDrawer(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex items-center space-x-4'>
        {/* Quantity Controller */}
        <div className='flex items-center'>
          <button
            type='button'
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className='bg-neutral-700 px-3 py-1 rounded-l-md text-white'>
            -
          </button>
          <span className='bg-neutral-800 px-4 py-2 text-white'>
            {quantity}
          </span>
          <button
            type='button'
            onClick={() => setQuantity(quantity + 1)}
            className='bg-neutral-700 px-3 py-1 rounded-r-md text-white'>
            +
          </button>
        </div>

        {/* Submit Button */}
        <Button className='bg-teal-600 hover:bg-teal-700 py-3 rounded-md w-36 text-white'>
          Add to cart
        </Button>
      </div>
    </form>
  );
};

export default CartController;
