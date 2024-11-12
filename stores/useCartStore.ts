import { CartState, CartItem } from '@/types/cart';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      totalAmount: 0,
      isCartOpen: false, // This will not persist

      // Add item to cart
      addItem: (product) => {
        const existingItem = get().cartItems.find(
          (item) => item.id === product.id,
        );
        const updatedCartItems = existingItem
          ? get().cartItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: product.quantity }
                : item,
            )
          : [...get().cartItems, { ...product, quantity: 1 }];

        set({ cartItems: updatedCartItems });
        get().calculateTotal();
        set({ isCartOpen: true }); // Automatically opens the cart
      },

      // Remove item from cart
      removeItem: (productId) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== productId),
        });
        get().calculateTotal();
      },

      // Update item quantity
      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return; // Prevent negative quantities
        const updatedCartItems = get().cartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item,
        );
        set({ cartItems: updatedCartItems });
        get().calculateTotal();
      },

      // Calculate total amount
      calculateTotal: () => {
        set({
          totalAmount: get().cartItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          ),
        });
      },

      // Clear cart
      clearCart: () => {
        set({ cartItems: [], totalAmount: 0 });
      },

      // Toggle cart drawer open state
      toggleCartDrawer: (isOpen) => {
        set({ isCartOpen: isOpen ?? !get().isCartOpen });
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => key !== 'isCartOpen'),
        ),
    },
  ),
);

export default useCartStore;
