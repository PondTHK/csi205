import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ProductWithPrice } from "../data/products";
import { CartContext, type CartItem } from "./cartState";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: ProductWithPrice) => {
    setItems((previous) => {
      if (previous.some((item) => item.id === product.id)) {
        return previous;
      }
      return [...previous, product];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((previous) => previous.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (productId: number) => items.some((item) => item.id === productId),
    [items]
  );

  const value = useMemo(() => {
    const totalItems = items.length;
    const totalPrice = Number(
      items.reduce((sum, item) => sum + item.price, 0).toFixed(2)
    );

    return {
      items,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
      totalItems,
      totalPrice,
    };
  }, [items, addToCart, removeFromCart, clearCart, isInCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
