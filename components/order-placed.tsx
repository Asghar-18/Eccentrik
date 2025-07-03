"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface OrderPlacedProps {
  orderNumber: string;
  cartSnapshot: {
    id: number;
    price: number;
    quantity: number;
  }[];
  total: number;
}

export default function OrderPlaced({ orderNumber, cartSnapshot, total }: OrderPlacedProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && typeof window.fbq === "function") {
      window.fbq("track", "Purchase", {
        value: total.toFixed(2),
        currency: "PKR",
        content_ids: cartSnapshot.map((item) => item.id),
        content_type: "product",
      });
    }
  }, []);

  return (
    <div className="container mx-auto flex max-w-lg flex-col items-center px-4 py-16 text-center">
      <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-green-100">
        <CheckCircle className="h-14 w-14 text-green-600" />
      </div>
      <h1 className="mb-4 text-4xl font-bold">Order Confirmed!</h1>
      <p className="mb-3 text-xl">Thank you for your purchase</p>
      <div className="mb-6 rounded-lg bg-green-50 px-6 py-3">
        <p className="font-medium text-green-800">
          Order number: <span className="font-bold">{orderNumber}</span>
        </p>
      </div>
      <p className="mb-10 text-lg text-neutral-600">
        We&apos;ll process your order shortly. Expect delivery in 3–5 business days.
      </p>
      <div className="flex w-full flex-col space-y-4">
        <Button asChild size="lg" variant="outline" className="font-medium">
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button asChild size="lg" className="font-medium">
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
}
