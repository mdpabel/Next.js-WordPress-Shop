'use server';

import Stripe from 'stripe';
import WooCommerce from '@/lib/woocommerce';
import { verifyToken } from '@/lib/jwt';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-10-28.acacia',
});

export const createStripeSession = async (_: any, formData: FormData) => {
  try {
    // Extract customer and cart details from formData
    const customerDetails = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      address: formData.get('address') as string,
      city: formData.get('city') as string,
      state: formData.get('state') as string,
      zip: formData.get('zip') as string,
      note: formData.get('note') as string,
    };

    const cartItems = JSON.parse(formData.get('cartItems') as string);
    const token = formData.get('token') as string;
    let customer_id = 0; // Default to guest user

    // Token Verification and Customer ID Extraction
    if (token) {
      const verifiedToken = verifyToken(token);
      if (!verifiedToken.success) {
        // Token invalid or expired, prompt login
        return {
          error: true,
          message:
            'Invalid or expired token. Please log in again to proceed with the checkout.',
          success: false,
        };
      }
      customer_id = parseInt(verifiedToken.data?.data?.user?.id ?? '0');
    }

    // Step 1: Create WooCommerce Order
    let wooOrder;
    try {
      const data = {
        payment_method: 'stripe',
        payment_method_title: 'Credit Card',
        set_paid: false,
        customer_id, // Use customer_id from verified token or 0 for guest
        billing: {
          first_name: customerDetails.name,
          address_1: customerDetails.address,
          city: customerDetails.city,
          state: customerDetails.state,
          postcode: customerDetails.zip,
          email: customerDetails.email,
        },
        shipping: {
          first_name: customerDetails.name,
          address_1: customerDetails.address,
          city: customerDetails.city,
          state: customerDetails.state,
          postcode: customerDetails.zip,
        },
        line_items: cartItems.map((item: any) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        shipping_lines: [
          {
            method_id: 'flat_rate',
            method_title: 'Flat Rate',
            total: '10.00',
          },
        ],
      };

      wooOrder = await WooCommerce.post('orders', data);
    } catch (error) {
      console.error('WooCommerce order creation failed:', error);
      return {
        error: true,
        message: 'Failed to create WooCommerce order. Please try again.',
        success: false,
      };
    }

    // Update WooCommerce Customer Profile if Missing Billing/Shipping
    if (customer_id) {
      try {
        const { data: customer } = await WooCommerce.get(
          `customers/${customer_id}`,
        );

        // Check if billing/shipping info is missing
        if (!customer.billing || !customer.billing.address_1) {
          await WooCommerce.put(`customers/${customer_id}`, {
            billing: {
              first_name: customerDetails.name,
              address_1: customerDetails.address,
              city: customerDetails.city,
              state: customerDetails.state,
              postcode: customerDetails.zip,
              email: customerDetails.email,
            },
            shipping: {
              first_name: customerDetails.name,
              address_1: customerDetails.address,
              city: customerDetails.city,
              state: customerDetails.state,
              postcode: customerDetails.zip,
            },
          });
        }
      } catch (error) {
        console.error('Updating WooCommerce customer info failed:', error);
      }
    }

    // Step 2: Create Stripe Checkout Session
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: customerDetails.email,
        line_items: cartItems.map((item: any) => ({
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
            },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        })),
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
        metadata: {
          orderId: wooOrder.data.id,
        },
      });

      // Step 3: Store Payment Link in WooCommerce Order Metadata
      try {
        await WooCommerce.put(`orders/${wooOrder.data.id}`, {
          meta_data: [
            {
              key: 'stripe_payment_url',
              value: session.url,
            },
          ],
        });
      } catch (error) {
        console.error(
          'Failed to update WooCommerce order with Stripe link:',
          error,
        );
      }

      // Return the Stripe session URL to redirect the user
      return { url: session.url };
    } catch (error) {
      console.error('Stripe session creation failed:', error);
      return {
        error: true,
        message: 'Failed to create Stripe checkout session. Please try again.',
        success: false,
      };
    }
  } catch (error) {
    console.error('Unexpected error during checkout process:', error);
    return {
      error: true,
      message: 'An unexpected error occurred. Please try again later.',
      success: false,
    };
  }
};
