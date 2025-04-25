"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import type { Product } from "@/lib/constants/product-data";

export interface CartItem extends Product {
  size: string;
  color: string;
  quantity: number;
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (
    product: Omit<CartItem, "quantity"> & { quantity?: number },
    quantity?: number
  ) => void;
  removeFromCart: (productId: number, size: string, color: string) => void;
  updateQuantity: (
    productId: number,
    size: string,
    color: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("eccentrik-cart");
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error("Error parsing cart from localStorage", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("eccentrik-cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (
    product: Omit<CartItem, "quantity"> & { quantity?: number },
    addQuantity: number = 1
  ) => {
    const quantity = product.quantity || addQuantity;

    setCart((currentCart) => {
      const existingItemIndex = currentCart.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === product.size &&
          item.color === product.color
      );

      let newCart: CartItem[];

      if (existingItemIndex > -1) {
        newCart = [...currentCart];
        newCart[existingItemIndex].quantity += quantity;
      } else {
        const newItem: CartItem = {
          ...product,
          quantity,
        };
        newCart = [...currentCart, newItem];
      }

      toast.success("Added to cart", {
        description: `${quantity} x ${product.name} has been added to your cart.`,
      });

      return newCart;
    });
  };

  const removeFromCart = (itemId: number, size: string, color: string) => {
    setCart((currentCart) => {
      const item = currentCart.find(
        (i) => i.id === itemId && i.size === size && i.color === color
      );

      const filteredCart = currentCart.filter(
        (item) =>
          !(item.id === itemId && item.size === size && item.color === color)
      );

      if (item) {
        toast.error("Removed from cart", {
          description: `${item.name} has been removed from your cart.`,
        });
      }

      return filteredCart;
    });
  };

  const updateQuantity = (
    itemId: number,
    size: string,
    color: string,
    quantity: number
  ) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === itemId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    toast.info("Cart cleared", {
      description: "All items have been removed from your cart.",
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
