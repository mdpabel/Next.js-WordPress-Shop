'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { startTransition, useActionState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { createUser } from '@/actions/auth/signup';
import FormButton from '@/components/common/form-button';
import { signupSchema } from '@/schema/auth';
import Link from 'next/link';
import { useToastMessage } from '@/hooks/useToastMessage';
import { toast } from 'react-toastify';

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup = () => {
  const [state, createUserAction] = useActionState(createUser, {
    message: '',
    success: false,
  });
  useToastMessage({
    message: state.message,
    success: state.success,
  });
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  return (
    <div className='bg-black mx-auto p-8 rounded-lg max-w-md text-neutral-200'>
      <h2 className='mb-6 font-bold text-2xl text-center'>Create an Account</h2>

      <Form {...form}>
        <form
          action={async () => {
            const isValid = await form.trigger();

            if (!isValid) {
              toast.error('Please fill out all required fields.');
              return;
            }
            startTransition(() => {
              const formData = new FormData();
              const values = form.getValues();
              for (const [key, value] of Object.entries(values)) {
                formData.append(key, value);
              }
              createUserAction(formData);
            });
          }}
          className='space-y-6'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Your Name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Password' type='password' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormButton className='bg-teal-600 hover:bg-teal-700 w-full text-white'>
            Sign Up
          </FormButton>
        </form>
      </Form>

      {/* Already have an account? */}
      <p className='mt-4 text-center text-neutral-400'>
        Already have an account?{' '}
        <Link
          href='/login'
          className='text-teal-500 hover:text-teal-400 underline'>
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
