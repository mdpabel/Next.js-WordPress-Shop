import { z } from 'zod';

// Define the schema for checkout form validation
export const checkoutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  zip: z.string().min(1, 'ZIP code is required'),
  note: z.string().optional(),
  payment: z.enum(['credit-card', 'paypal']),
});
