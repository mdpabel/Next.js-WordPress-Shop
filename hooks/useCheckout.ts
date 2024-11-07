import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/useAuthStore';
import { useState, useEffect } from 'react';
import { checkoutSchema } from '@/schema/checkout';
import useCartStore from '@/stores/useCartStore';
import { z } from 'zod';

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export const useCheckout = () => {
  const { token, user } = useAuthStore();
  const { cartItems, totalAmount } = useCartStore();
  const [loading, setLoading] = useState(true);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: '',
      email: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      note: '',
      payment: 'credit-card',
    },
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (token) {
        try {
          const res = await fetch('/api/user', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const { data } = await res.json();

          if (data) {
            // Reset form with user data, then trigger validation to mark fields as filled
            form.reset({
              name: `${data.first_name} ${data.last_name}`,
              email: data.email,
              address: data.billing.address_1,
              city: data.billing.city,
              state: data.billing.state,
              zip: data.billing.postcode,
              note: '',
              payment: 'credit-card',
            });

            form.trigger(); // Trigger validation after reset
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadUserData();
  }, [token, form]);

  return { form, loading, cartItems, token, user, totalAmount };
};
