import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import FormButton from '@/components/common/form-button';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';

// Define zod schema for validation
const couponSchema = z.object({
  coupon: z.string().min(1, 'Coupon code is required').trim(),
});

type CouponFormData = z.infer<typeof couponSchema>;

const CouponForm = () => {
  const form = useForm<CouponFormData>({
    resolver: zodResolver(couponSchema),
    defaultValues: {
      coupon: '',
    },
  });

  const onSubmit = (data: CouponFormData) => {
    console.log('Applying coupon:', data.coupon);
    // Handle coupon application logic here
  };

  return (
    <Form {...form}>
      <section className='space-y-6 p-6 rounded-lg'>
        <h2 className='mb-4 font-semibold text-xl'>Add a Coupon</h2>
        <FormField
          control={form.control}
          name='coupon'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder='Coupon Code'
                  className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormButton className='bg-teal-600 hover:bg-teal-700 mt-2 py-2 rounded-md w-full font-semibold text-white'>
          Apply Coupon
        </FormButton>
      </section>
    </Form>
  );
};

export default CouponForm;
