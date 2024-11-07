'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { FiLoader } from 'react-icons/fi';

// Define schema for form validation
const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  // Submit handler
  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const response = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || 'Failed to send reset link');
      }

      setSuccessMessage('Password reset link has been sent to your email.');
    } catch (error: any) {
      setError(error.message || 'Failed to send reset link');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-black mx-auto p-8 rounded-lg max-w-md text-neutral-200'>
      <h2 className='mb-6 font-bold text-2xl text-center'>Forgot Password</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
          {error && (
            <div className='mb-4 text-center text-red-500'>{error}</div>
          )}
          {successMessage && (
            <div className='mb-4 text-center text-green-500'>
              {successMessage}
            </div>
          )}

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Your Email' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            disabled={loading}
            className='bg-teal-600 hover:bg-teal-700 w-full text-white'>
            {loading ? (
              <FiLoader className='animate-spin' />
            ) : (
              'Send Reset Link'
            )}
          </Button>
        </form>
      </Form>

      <div className='mt-4 text-center'>
        <p className='text-neutral-400'>
          Remembered your password?{' '}
          <a href='/login' className='text-teal-500 hover:underline'>
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
