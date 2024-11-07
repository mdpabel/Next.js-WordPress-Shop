import { Order } from '@/types/order';
import WooCommerce from '.';
import { verifyToken } from '../jwt';

export const getUserOrders = async (token: string): Promise<Order[]> => {
  try {
    const verifiedToken = verifyToken(token);
    if (!verifiedToken.success) {
      throw new Error('Invalid or expired token.');
    }

    const userId = verifiedToken.data?.data?.user?.id;
    if (!userId) {
      throw new Error('User ID not found in token.');
    }

    const response = await WooCommerce.get('orders', {
      params: { customer_id: userId }, // WooCommerce expects query params
    });

    return response.data as Order[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders from WooCommerce');
  }
};
