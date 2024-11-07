'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import FormButton from '@/components/common/form-button';
import { toast } from 'react-toastify';
import { useState, useEffect, startTransition, useActionState } from 'react';
import { updateUser } from '@/actions/user/update-user';
import { useToastMessage } from '@/hooks/useToastMessage';
import ProfileSkeleton from './loading';

// Define schema for validating the profile form
const profileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  newPassword: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [state, updateUserAction] = useActionState(updateUser, {
    error: false,
    message: '',
    success: undefined,
    data: undefined,
  });
  useToastMessage({
    message: state?.message!,
    success: state?.success!,
  });
  const { token, logout } = useAuthStore();

  // Initialize the form with empty/default values
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      newPassword: '',
    },
  });

  useEffect(() => {
    // Fetch user details when token is available
    if (token) {
      fetch('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then(({ data }) => {
          if (data) {
            form.reset({
              firstName: data.first_name || '',
              lastName: data.last_name || '',
              email: data.email || '',
              newPassword: '',
            });
          }
        })
        .catch(() => {
          toast.error('Failed to fetch user details');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [token, form]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className='bg-black mx-auto p-8 rounded-lg max-w-md text-neutral-200'>
      <h2 className='mb-6 font-bold text-2xl text-center'>My Profile</h2>

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
              if (!token) {
                toast.error('You must be logged in to update your profile.');
                return;
              }
              formData.append('token', token);
              updateUserAction(formData);
            });
          }}
          className='space-y-6'>
          {/* First Name Field */}
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='First Name'
                    className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name Field */}
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Last Name'
                    className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field (Read-Only) */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type='email'
                    placeholder='Your Email'
                    className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* New Password Field */}
          <FormField
            control={form.control}
            name='newPassword'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type='password'
                    placeholder='New Password (optional)'
                    className='bg-neutral-900 text-neutral-300 placeholder:text-neutral-500'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormButton className='bg-teal-600 hover:bg-teal-700 w-full text-white'>
            Update Profile
          </FormButton>
        </form>
      </Form>

      {/* Log Out Button */}
      <div className='mt-4 text-center'>
        <button
          onClick={() => {
            logout();
            toast.info('Logged out successfully');
          }}
          className='bg-red-500 hover:bg-red-600 mt-6 px-4 py-2 rounded-md text-white'>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
