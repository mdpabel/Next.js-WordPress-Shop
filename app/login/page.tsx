'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { startTransition, useEffect, useActionState } from 'react';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/schema/auth';
import { login } from '@/actions/auth/login';
import FormButton from '@/components/common/form-button';
import { useAuthStore } from '@/stores/useAuthStore';
import { useToastMessage } from '@/hooks/useToastMessage';
import { toast } from 'react-toastify';

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [state, loginAction] = useActionState(login, {
    success: false,
    message: '',
    token: '',
    user: {
      email: '',
      nicename: '',
      displayName: '',
    },
  });

  const { login: authLogin } = useAuthStore();
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useToastMessage({
    message: state.message,
    success: state.success,
  });

  useEffect(() => {
    if (state.success && state.token) {
      authLogin(state.token, state.user!);
      router.push('/account');
    }
  }, [state.success, state.token, authLogin, router]);

  const handleActionSubmit = async () => {
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
      loginAction(formData);
    });
  };

  return (
    <div className='bg-black mx-auto p-8 rounded-lg max-w-md text-neutral-200'>
      <h2 className='mb-6 font-bold text-2xl text-center'>
        Login to Your Account
      </h2>

      <Form {...form}>
        <form action={handleActionSubmit} className='space-y-6'>
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
            Log In
          </FormButton>
        </form>
      </Form>

      <div className='mt-4 text-center'>
        <p className='text-neutral-400'>
          Don’t have an account?{' '}
          <a href='/signup' className='text-teal-500 hover:underline'>
            Sign Up
          </a>
        </p>
        <p className='mt-2 text-neutral-400'>
          <a href='/forgot-password' className='text-teal-500 hover:underline'>
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
