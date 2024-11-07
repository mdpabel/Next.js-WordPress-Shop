'use server';

import WooCommerce from '@/lib/woocommerce';
import { verifyToken } from '@/lib/jwt';

export const updateUser = async (_: any, formData: FormData) => {
  // Extract user information from formData
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const newPassword = formData.get('newPassword') as string | null;
  const token = formData.get('token') as string;

  // Verify the token to get the user ID
  const verifiedToken = verifyToken(token);
  if (!verifiedToken.success) {
    return {
      error: true,
      message: 'Invalid or expired token. Please log in again.',
    };
  }

  const userId = verifiedToken.data?.data?.user?.id;
  if (!userId) {
    return {
      error: true,
      message: 'User ID not found in token.',
    };
  }

  // Create data object to update the WooCommerce user
  const updateData: any = {
    first_name: firstName,
    last_name: lastName,
  };

  // Optionally update the password if provided
  if (newPassword) {
    updateData.password = newPassword;
  }

  // Send the update request to WooCommerce
  try {
    const response = await WooCommerce.put(`customers/${userId}`, updateData);
    return {
      success: true,
      data: response.data,
      message: 'Profile updated successfully',
    };
  } catch (error) {
    console.error('Error updating WooCommerce user:', error);
    return {
      error: true,
      message: 'Failed to update user profile. Please try again.',
    };
  }
};
