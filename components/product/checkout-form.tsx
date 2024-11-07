import React, { startTransition, useActionState, useEffect } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormButton from '@/components/common/form-button';
import { useCheckout } from '@/hooks/useCheckout';
import CheckoutSkeleton from './checkout-skeleton';
import { toast } from 'react-toastify';
import { createStripeSession } from '@/actions/payment/checkout';
import CouponForm from './coupon-form';
import { FiChevronRight } from 'react-icons/fi';
import { useToastMessage } from '@/hooks/useToastMessage';
import { useRouter } from 'next/navigation';

const CheckoutForm = () => {
  const router = useRouter();
  const [state, checkoutAction] = useActionState(createStripeSession, {
    url: null,
    error: undefined,
    message: undefined,
    success: undefined,
  });
  useToastMessage({
    message: state.message!,
    success: state.success!,
  });
  const { form, loading, cartItems, token, user, totalAmount } = useCheckout();

  useEffect(() => {
    if (state.url) {
      router.push(state.url);
    }
  }, [state.url]);

  if (loading) {
    return <CheckoutSkeleton />;
  }

  return (
    <div className='bg-black py-12 min-h-screen text-neutral-300'>
      <Form {...form}>
        <form
          action={async () => {
            const isValid = await form.trigger();

            if (!isValid) {
              toast.error('Please fill out all required fields.');
              return;
            }

            const formDataToSend = new FormData();

            // Append customer and cart data to formData
            Object.entries(form.getValues()).forEach(([key, value]) => {
              formDataToSend.append(key, value);
            });
            formDataToSend.append('cartItems', JSON.stringify(cartItems));
            if (token) {
              formDataToSend.append('token', token);
            }
            // Call the server action and get the Stripe checkout URL
            startTransition(() => checkoutAction(formDataToSend));
          }}>
          <div className='gap-8 grid grid-cols-1 lg:grid-cols-2 mx-auto p-4 max-w-6xl container'>
            {/* Left Column: Contact, Billing, Payment, and Notes */}
            <div className='space-y-6'>
              {/* Contact Information */}
              <section className='p-6 rounded-lg'>
                <h2 className='mb-4 font-semibold text-xl'>
                  Contact Information
                </h2>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder='Email'
                          readOnly={Boolean(user?.email)}
                          className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              {/* Billing Address */}
              <section className='p-6 rounded-lg'>
                <h2 className='mb-4 font-semibold text-xl'>Billing Address</h2>
                <div className='gap-4 grid'>
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Full Name'
                            className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='address'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='Address'
                            className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='gap-4 grid grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='city'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='City'
                              className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='state'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder='State'
                              className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name='zip'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='ZIP Code'
                            className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              {/* Add a Note */}
              <section className='p-6 rounded-lg'>
                <h2 className='mb-4 font-semibold text-xl'>
                  Add a Note to Your Order
                </h2>
                <FormField
                  control={form.control}
                  name='note'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <textarea
                          {...field}
                          placeholder='Special instructions or requests...'
                          className='bg-neutral-900 p-4 rounded-lg w-full h-24 text-neutral-300 placeholder:text-neutral-500'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
            </div>

            {/* Right Column: Order Summary, Coupon, Subtotal, Total */}
            <div className='space-y-6'>
              {/* Order Summary */}
              <section className='p-6 rounded-lg'>
                <h2 className='mb-4 font-semibold text-xl'>Order Summary</h2>
                <div className='space-y-4'>
                  {cartItems.map((item) => (
                    <div key={item.id} className='flex justify-between'>
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Apply Coupon */}
              <CouponForm />

              {/* Subtotal and Total */}
              <section className='space-y-4 p-6 rounded-lg'>
                <div className='flex justify-between'>
                  <span className='font-semibold text-neutral-300'>
                    Subtotal
                  </span>
                  <span className='font-bold text-teal-600'>
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
                <div className='flex justify-between border-neutral-700 pt-4 border-t'>
                  <span className='font-semibold text-neutral-300'>Total</span>
                  <span className='font-bold text-teal-600'>
                    ${totalAmount.toFixed(2)}
                  </span>
                </div>
              </section>

              {/* Place Order Button */}
              <div className='p-6'>
                <FormButton className='flex justify-center items-center bg-teal-600 hover:bg-teal-700 py-3 rounded-md w-full font-semibold text-white'>
                  Place Order <FiChevronRight className='ml-2' />
                </FormButton>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
