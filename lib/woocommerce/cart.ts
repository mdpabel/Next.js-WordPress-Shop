'use server';
import WooCommerce from '.';

// Define Cart Item Type
type CartItem = {
  product_id: number;
  quantity: number;
};

// Define Cart Type
type Cart = {
  items: CartItem[];
  total: string;
  currency: string;
};

// Utility function to add product to cart
export const addToCart = async (
  productId: number,
  quantity: number = 1,
): Promise<Cart> => {
  try {
    const response = await WooCommerce.post('cart', {
      product_id: productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error(`Error adding product with ID ${productId} to cart:`, error);
    throw new Error('Failed to add product to cart');
  }
};

// Utility function to get cart contents
export const getCart = async (): Promise<Cart> => {
  try {
    const response = await WooCommerce.get('cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Failed to fetch cart');
  }
};

// Utility function to update cart item quantity
export const updateCartItem = async (
  productId: number,
  quantity: number,
): Promise<Cart> => {
  try {
    const response = await WooCommerce.put('cart/update', {
      product_id: productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating cart item with ID ${productId}:`, error);
    throw new Error('Failed to update cart item');
  }
};

// Utility function to remove an item from cart
export const removeFromCart = async (productId: number): Promise<Cart> => {
  try {
    const response = await WooCommerce.delete(`cart/remove/${productId}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error removing product with ID ${productId} from cart:`,
      error,
    );
    throw new Error('Failed to remove product from cart');
  }
};
