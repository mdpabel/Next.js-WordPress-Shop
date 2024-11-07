import WooCommerce from '.';
import { verifyToken } from '../jwt';

interface Address {
  first_name: string;
  last_name: string;
  company?: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email: string;
  phone?: string;
}

interface UserDetails {
  id: number;
  date_created: string;
  date_modified: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  username: string;
  billing: Address;
  shipping: Address;
  is_paying_customer: boolean;
  avatar_url: string;
  meta_data: Array<any>;
}

export const getUserDetails = async (
  token: string,
): Promise<UserDetails | null> => {
  // Verify the token and extract user data
  const verifiedToken = verifyToken(token);

  if (!verifiedToken.success) {
    return null; // Return null if token is invalid or expired
  }

  // Extract the user ID from the token
  const userId = verifiedToken.data?.data?.user?.id;

  if (!userId) {
    return null; // Return null if no user ID found in token (guest user)
  }

  try {
    // Fetch user details from WooCommerce
    const response = await WooCommerce.get(`customers/${userId}`);
    return response.data as UserDetails; // Return the user details data as UserDetails type
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null; // Return null on error (user details could not be retrieved)
  }
};
