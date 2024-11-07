import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import WooCommerce from '@/lib/woocommerce';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-10-28.acacia',
});

export const POST = async (req: NextRequest) => {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');
  const secret = process.env.STRIPE_WEBHOOK_SIGNING_SECRET;

  if (!sig || !secret) {
    return NextResponse.json(
      { error: 'Missing Stripe signature or secret' },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (error: any) {
    console.error('⚠️ Webhook signature verification failed:', error.message);
    return NextResponse.json(
      { error: 'Invalid webhook signature' },
      { status: 400 },
    );
  }

  const eventType = event.type;
  const data = event.data.object as Stripe.Checkout.Session | Stripe.Charge;

  try {
    switch (eventType) {
      case 'checkout.session.completed':
        if (isCheckoutSession(data)) {
          const orderId = data.metadata?.orderId;

          if (!orderId) {
            throw new Error('No orderId found in checkout session metadata');
          }

          console.log(
            `Checkout session ${data.id} completed for order ${orderId}`,
          );

          // Update WooCommerce order to "processing" or "completed"
          await updateWooCommerceOrderStatus(orderId, 'processing');
        }
        break;

      case 'charge.refunded':
        if (isCharge(data)) {
          const orderId = data.metadata?.orderId;

          if (!orderId) {
            throw new Error('No orderId found in charge metadata');
          }

          console.log(`Charge refunded for order ID: ${orderId}`);

          // Update WooCommerce order to "refunded"
          await updateWooCommerceOrderStatus(orderId, 'refunded');
        }
        break;

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('⚠️ Error processing webhook event:', error.message);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 },
    );
  }
};

// Function to update WooCommerce order status
async function updateWooCommerceOrderStatus(orderId: string, status: string) {
  try {
    const response = await WooCommerce.put(`orders/${orderId}`, {
      status,
    });

    console.log(
      `Order ${orderId} status updated to ${status} in WooCommerce`,
      response.data,
    );
  } catch (error: any) {
    console.error(
      'Failed to update WooCommerce order status:',
      error.response?.data || error.message,
    );
    throw new Error(
      `WooCommerce API error: ${
        error.response?.data?.message || error.message
      }`,
    );
  }
}

// Type guard to check if the data is a Stripe Checkout Session
function isCheckoutSession(data: any): data is Stripe.Checkout.Session {
  return data.object === 'checkout.session';
}

// Type guard to check if the data is a Stripe Charge
function isCharge(data: any): data is Stripe.Charge {
  return data.object === 'charge';
}
