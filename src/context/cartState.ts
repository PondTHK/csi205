import { createContext } from "react";
import type { ProductWithPrice } from "../data/products";

export type CartItem = ProductWithPrice;

export interface CartContextValue {
  items: CartItem[];
  addToCart: (product: ProductWithPrice) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  isInCart: (productId: number) => boolean;
  totalItems: number;
  totalPrice: number;
}

export const CartContext = createContext<CartContextValue | undefined>(
  undefined
);
