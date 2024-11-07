// /types/cart.ts

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface CartState {
  cartItems: CartItem[];
  totalAmount: number;
  isCartOpen: boolean; // New state to track the drawer's open status
  addItem: (product: CartItem) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  calculateTotal: () => void;
  toggleCartDrawer: (isOpen?: boolean) => void; // New action to toggle drawer
}
