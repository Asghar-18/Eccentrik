"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/cart-context";
import type { Product } from "@/lib/constants/product-data";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);

    addToCart({
      ...product,
      size: "M",
      color: "Black",
    });

    setIsAdding(false);
  };

  return (
    <div className="group">
      <div className="relative mb-4 overflow-hidden rounded-lg bg-neutral-100">
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={400}
            className="h-[400px] w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-white p-4 transition-transform duration-300 group-hover:translate-y-0">
          <Button
            variant="outline"
            className="w-full !text-base"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            {isAdding ? "Adding..." : "Add to Cart"}
          </Button>
        </div>
      </div>
      <div>
        <span className="mb-1 block text-sm text-neutral-500">
          {product.category}
        </span>
        <Link href={`/products/${product.id}`} className="block">
          <h3 className="mb-1 text-lg font-medium">{product.name}</h3>
        </Link>
        <p className="font-medium">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
