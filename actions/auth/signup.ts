// app/actions/auth/signup.ts
'use server';

import WooCommerce from '@/lib/woocommerce';
import { signupSchema } from '@/schema/auth';

export const createUser = async (_: any, formData: FormData) => {
  // Convert FormData to a plain object
  const userData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Validate using Zod
  const parsedData = signupSchema.safeParse(userData);
  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors[0].message,
    };
  }

  try {
    // If validation passes, send the request to WooCommerce API
    const response = await WooCommerce.post('customers', {
      first_name: parsedData.data.name,
      email: parsedData.data.email,
      password: parsedData.data.password,
    });

    if (response.status === 201) {
      return {
        success: true,
        message: 'Account created successfully. Please log in.',
      };
    } else {
      throw new Error('Failed to create account');
    }
  } catch (error: any) {
    console.error('Error creating account:', error);
    return {
      success: false,
      message: error.message || 'Account creation failed. Try again.',
    };
  }
};
