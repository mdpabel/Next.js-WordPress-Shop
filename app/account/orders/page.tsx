'use client';
import React, { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/useAuthStore';
import { toast } from 'react-toastify';
import { LineItem, Order } from '@/types/order';
import OrdersSkeleton from './loading';

const OrdersPage = () => {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      const fetchOrders = async () => {
        try {
          const response = await fetch('/api/orders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch orders.');
          }

          const data = await response.json();
          setOrders(data.data || []);
        } catch (err: any) {
          setError(err.message || 'An error occurred');
          toast.error(err.message || 'Failed to load orders');
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
  }, [token]);

  if (loading) {
    return <OrdersSkeleton />;
  }

  if (error) return <div className='text-red-500'>Error: {error}</div>;

  if (!orders.length) return <div>No orders found.</div>;

  return (
    <div className='mx-auto p-6 max-w-5xl'>
      <h2 className='mb-6 font-semibold text-2xl text-white'>Your Orders</h2>
      <ul className='space-y-6'>
        {orders.map((order) => (
          <li
            key={order.id}
            className='bg-neutral-800 shadow-lg p-6 rounded-lg'>
            <h3 className='font-bold text-teal-500 text-xl'>
              Order #{order.number}
            </h3>
            <p className='text-gray-300'>
              Status: <span className='capitalize'>{order.status}</span>
            </p>
            <p className='text-gray-300'>
              Order Date: {new Date(order.date_created).toLocaleDateString()}
            </p>
            <p className='text-gray-300'>
              Total: {order.currency} {parseFloat(order.total).toFixed(2)}
            </p>
            <p className='text-gray-300'>
              Payment Method: {order.payment_method_title}
            </p>

            {/* Order Items */}
            <div className='mt-4'>
              <h4 className='font-semibold text-lg text-teal-400'>Items:</h4>
              <ul className='ml-4 list-disc'>
                {order.line_items.map((item: LineItem) => (
                  <li
                    key={item.id}
                    className='flex items-center space-x-4 mt-2'>
                    {item.image && (
                      <img
                        src={item.image.src}
                        alt={item.name}
                        className='rounded w-12 h-12 object-cover'
                      />
                    )}
                    <span className='text-gray-300'>
                      {item.quantity} x {item.name} - {order.currency}
                      {parseFloat(item.price.toString()).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Payment Link */}
            {order.meta_data.some(
              (meta) => meta.key === 'stripe_payment_url',
            ) &&
              order.status === 'pending' && (
                <div className='mt-6'>
                  <a
                    href={
                      order.meta_data.find(
                        (meta) => meta.key === 'stripe_payment_url',
                      )?.value
                    }
                    className='bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-lg text-white'>
                    Complete Payment
                  </a>
                </div>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrdersPage;
