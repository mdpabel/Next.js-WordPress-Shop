// app/actions/auth/login.ts
'use server';

import { loginSchema } from '@/schema/auth';

export const login = async (_: any, formData: FormData) => {
  // Extract data from formData
  const loginData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };

  // Validate using Zod schema
  const parsedData = loginSchema.safeParse(loginData);
  if (!parsedData.success) {
    return {
      success: false,
      message: parsedData.error.errors[0].message, // Return the first validation error
    };
  }

  try {
    // Make a request to the WooCommerce JWT Authentication endpoint
    const response = await fetch(
      `${process.env.WOOCOMMERCE_API_URL}/wp-json/jwt-auth/v1/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: parsedData.data.email,
          password: parsedData.data.password,
        }),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to log in');
    }

    const data = await response.json();

    // Return the authentication data
    return {
      success: true,
      message: 'Login successful',
      token: data.token,
      user: {
        email: data.user_email,
        nicename: data.user_nicename,
        displayName: data.user_display_name,
      },
    };
  } catch (error: any) {
    console.error('Login error:', error);
    return {
      success: false,
      message: error.message || 'Login failed. Please try again.',
    };
  }
};
