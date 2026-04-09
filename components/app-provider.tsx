'use client'

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useState } from "react"
import { clientSessionToken } from "../lib/http"
import { AccountResType } from "@/schemaValidations/account.schema";
import { ProductResType } from "@/schemaValidations/product.schema";

type User = AccountResType["data"];

export type CartItem = {
  product: ProductResType["data"];
  quantity: number;
};

const AppContext = createContext<{
    user: User | null;
    setUser: (user: User | null) => void;
    cart: CartItem[];
    addToCart: (product: ProductResType["data"]) => void;
    removeFromCart: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
}>({
    user: null,
    setUser: () => {},
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {},
});

export const useAppContext = () => {
    return useContext(AppContext);
}

export default function AppProvider({
  children,
  initialSessionToken = "",
  initUser = null,
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
  initUser?: User | null;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useLayoutEffect(() => {
    clientSessionToken.value = initialSessionToken;
    setUser(initUser);
  }, [initialSessionToken, initUser]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product: ProductResType["data"]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    setCart((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.product.id !== productId)
        : prev.map((item) =>
            item.product.id === productId ? { ...item, quantity } : item
          )
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  return (
    <AppContext.Provider value={{ user, setUser, cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </AppContext.Provider>
  );
}