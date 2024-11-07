import axios from 'axios';
import WooCommerce from '.';

// Define User Types
export type UserRegistration = {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export type UserLogin = {
  username: string;
  password: string;
};

// Register a New User
export const registerUser = async (userData: UserRegistration) => {
  try {
    const response = await WooCommerce.post('/customers', {
      email: userData.email,
      username: userData.username,
      password: userData.password,
      first_name: userData.firstName || '',
      last_name: userData.lastName || '',
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Failed to register user');
  }
};

// Log In a User
export const loginUser = async (loginData: UserLogin) => {
  try {
    const response = await axios.post('/api/login', loginData);
    if (response.status !== 200) {
      throw new Error('Login failed');
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to log in');
  }
};

// Request Password Reset
export const requestPasswordReset = async (email: string) => {
  try {
    const response = await WooCommerce.post('/customers/lost-password', {
      email,
    });
    return response.data;
  } catch (error) {
    console.error('Password reset request error:', error);
    throw new Error('Failed to request password reset');
  }
};

// Fetch User Details by ID
export const fetchUserDetails = async (userId: number) => {
  try {
    const response = await WooCommerce.get(`/customers/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Fetch user details error:', error);
    throw new Error('Failed to fetch user details');
  }
};
