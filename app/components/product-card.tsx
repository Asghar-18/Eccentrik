"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/cart-context";
import type { Product } from "@/lib/constants/product-data";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouching, setIsTouching] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if device is mobile on component mount
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleAddToCart = () => {
    setIsAdding(true);

    addToCart({
      ...product,
      size: "M",
    });

    setIsAdding(false);
  };

  // Show second image if either hovering (on desktop) or touching (on mobile)
  const showSecondImage = isMobile ? isTouching : isHovering;

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsTouching(true)}
      onTouchEnd={() => setIsTouching(false)}
      onTouchCancel={() => setIsTouching(false)}
    >
      <div className="relative mb-4 overflow-hidden rounded-lg bg-neutral-100">
        <Link href={`/products/${product.id}`}>
          <div className="relative h-[400px] w-full">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-cover transition-opacity duration-300 ${
                showSecondImage ? "opacity-0" : "opacity-100"
              }`}
            />

            <Image
              src={
                product.images && product.images.length > 1
                  ? product.images[1]
                  : product.image
              }
              alt={`${product.name} alternate view`}
              fill
              className={`object-cover transition-opacity duration-300 ${
                showSecondImage ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </Link>
        <div className="absolute bottom-0 left-0 right-0 translate-y-full bg-white p-4 transition-transform duration-300 group-hover:translate-y-0 touch-none">
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
        <p className="font-medium">Rs.{product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}