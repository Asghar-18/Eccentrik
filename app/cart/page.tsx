"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "../context/cart-context";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const shipping = cart.length > 0 ? 4.99 : 0;
  const total = getCartTotal() + shipping;

  const handleRemoveItem = (itemId: number, size: string, color: string) => {
    setRemovingId(itemId);
    setTimeout(() => {
      removeFromCart(itemId, size, color);
      setRemovingId(null);      
    }, 300);
  };

  const handleDecreaseQuantity = (
    itemId: number,
    size: string,
    color: string,
    currentQuantity: number
  ) => {
    if (currentQuantity > 1) {
      updateQuantity(itemId, size, color, currentQuantity - 1);
    } else {
      handleRemoveItem(itemId, size, color);
    }
  };

  const handleIncreaseQuantity = (
    itemId: number,
    size: string,
    color: string,
    currentQuantity: number
  ) => {
    updateQuantity(itemId, size, color, currentQuantity + 1);
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-3xl font-semibold">Your Cart</h1>

      {cart.length > 0 ? (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size}-${item.color}`}
                  className="flex border-b border-neutral-200 pb-6"
                >
                  <div className="mr-6 h-[120px] w-[100px] overflow-hidden rounded-md bg-neutral-100">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={120}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between">
                      <Link
                        href={`/products/${item.id}`}
                        className="text-lg font-medium hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="mt-1 text-sm text-neutral-500">
                      {item.size && <p>Size: {item.size}</p>}
                      {item.color && <p>Color: {item.color}</p>}
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex h-10 w-28 items-center">
                        <button
                          className="flex h-full w-10 items-center justify-center border border-r-0 border-neutral-300"
                          onClick={() =>
                            handleDecreaseQuantity(
                              item.id,
                              item.size,
                              item.color,
                              item.quantity
                            )
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <div className="flex h-full w-10 items-center justify-center border-y border-neutral-300 text-center">
                          {item.quantity}
                        </div>
                        <button
                          className="flex h-full w-10 items-center justify-center border border-l-0 border-neutral-300"
                          onClick={() =>
                            handleIncreaseQuantity(
                              item.id,
                              item.size,
                              item.color,
                              item.quantity
                            )
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        className={`text-neutral-500 hover:text-red-500 ${
                          removingId === item.id ? "opacity-50" : ""
                        }`}
                        onClick={() =>
                          handleRemoveItem(item.id, item.size, item.color)
                        }
                        disabled={removingId === item.id}
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/products"
              className="mt-8 inline-flex items-center text-sm font-medium hover:underline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="rounded-lg border border-neutral-200 p-6">
              <h2 className="mb-6 text-xl font-semibold">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <p className="text-neutral-600">Subtotal</p>
                  <p className="font-medium">${getCartTotal().toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-neutral-600">Shipping</p>
                  <p className="font-medium">${shipping.toFixed(2)}</p>
                </div>
                <div className="border-t border-neutral-200 pt-4">
                  <div className="flex justify-between">
                    <p className="font-medium">Total</p>
                    <p className="font-medium">${total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
              <Button className="mt-6 w-full">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="mb-4 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mb-8 text-neutral-600">
            Looks like you haven&lsquo;t added anything to your cart yet.
          </p>
          <Button asChild>
            <Link href="/new-arrivals">Start Shopping</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
