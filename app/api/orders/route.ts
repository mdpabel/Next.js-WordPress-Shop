import { getUserOrders } from '@/lib/woocommerce/order';
import { getUserDetails } from '@/lib/woocommerce/user';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  // Extract the token from the authorization header
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return NextResponse.json(
      {
        data: null,
        error: 'Token is missing or invalid',
      },
      { status: 401 },
    );
  }

  try {
    const orders = await getUserOrders(token);

    if (!orders) {
      return NextResponse.json(
        {
          data: null,
          message: 'order not found',
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to fetch user details',
      },
      { status: 500 },
    );
  }
};
