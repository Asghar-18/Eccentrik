"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";

import { Button } from "@/components/ui/button";
import { useCart } from "../../context/cart-context";
import { getProductById, Product } from "@/lib/constants/product-data";
interface DetailedProduct extends Product {
  sizes: string[];
  colors: string[];
  details: string[];
  images: string[];
}

interface PageParams {
  id: string;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [product, setProduct] = useState<DetailedProduct | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();

  const unwrappedParams = React.use(params);
  const productId = parseInt(unwrappedParams.id, 10);

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);

      const foundProduct = getProductById(productId);

      if (foundProduct) {
        setProduct({
          ...foundProduct,
          sizes: ["XS", "S", "M", "L", "XL"],
          colors: ["Black", "White", "Gray"],
          details: [
            "100% organic cotton",
            "Relaxed fit",
            "Machine wash cold",
            "Made in Portugal",
          ],
          images: [
            foundProduct.image,
            "/placeholder.svg?height=600&width=500",
            "/placeholder.svg?height=600&width=500",
          ],
        });
      } else {
        setProduct({
          id: productId,
          name: "Product Not Found",
          price: 0,
          description: "This product could not be found.",
          images: [
            "/placeholder.svg?height=600&width=500",
            "/placeholder.svg?height=600&width=500",
            "/placeholder.svg?height=600&width=500",
          ],
          sizes: ["XS", "S", "M", "L", "XL"],
          colors: ["Black", "White", "Gray"],
          details: ["No details available"],
          category: "Unknown",
          image: "/placeholder.svg?height=600&width=500",
        });
      }

      setIsLoading(false);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    setIsAdding(true);

    addToCart(
      {
        ...product,
        size: selectedSize || (product.sizes ? product.sizes[0] : ""),
        color: selectedColor || (product.colors ? product.colors[0] : ""),
      },
      quantity
    );

    setIsAdding(false);
  };

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="mb-8 h-6 w-32 rounded bg-neutral-200"></div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="space-y-4">
              <div className="h-[600px] rounded-lg bg-neutral-200"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-[180px] rounded-lg bg-neutral-200"></div>
                <div className="h-[180px] rounded-lg bg-neutral-200"></div>
                <div className="h-[180px] rounded-lg bg-neutral-200"></div>
              </div>
            </div>
            <div>
              <div className="mb-2 h-8 w-2/3 rounded bg-neutral-200"></div>
              <div className="mb-6 h-6 w-1/4 rounded bg-neutral-200"></div>
              <div className="mb-6 h-20 rounded bg-neutral-200"></div>
              <div className="mb-6 space-y-3">
                <div className="h-5 w-16 rounded bg-neutral-200"></div>
                <div className="flex gap-3">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-md bg-neutral-200"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="mb-6 space-y-3">
                <div className="h-5 w-16 rounded bg-neutral-200"></div>
                <div className="flex gap-3">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-10 w-20 rounded-md bg-neutral-200"
                    ></div>
                  ))}
                </div>
              </div>
              <div className="mb-6 space-y-3">
                <div className="h-5 w-24 rounded bg-neutral-200"></div>
                <div className="h-12 w-32 rounded bg-neutral-200"></div>
              </div>
              <div className="mb-8 h-12 rounded bg-neutral-200"></div>
              <div className="space-y-3 border-t border-neutral-200 pt-6">
                <div className="h-6 w-24 rounded bg-neutral-200"></div>
                <div className="h-4 w-full rounded bg-neutral-200"></div>
                <div className="h-4 w-full rounded bg-neutral-200"></div>
                <div className="h-4 w-2/3 rounded bg-neutral-200"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h2 className="mb-4 text-2xl font-semibold">Product Not Found</h2>
          <p className="mb-8 text-neutral-600">
            The product you are looking for could not be found.
          </p>
          <Button asChild>
            <Link href="/new-arrivals">Browse Products</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <Link
        href="/products"
        className="mb-8 inline-flex items-center text-sm font-medium hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Link>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg bg-neutral-100">
            <Image
              src={product.images[0] || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={600}
              className="h-auto w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-neutral-100"
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 2}`}
                  width={150}
                  height={180}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="mb-2 text-3xl font-semibold">{product.name}</h1>
          <p className="mb-6 text-2xl font-medium">
            ${product.price.toFixed(2)}
          </p>
          <p className="mb-6 text-neutral-600">{product.description}</p>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium">Size</h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-black bg-black text-white"
                      : "border-neutral-300 hover:border-black"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium">Color</h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  className={`flex h-10 min-w-[80px] items-center justify-center rounded-md border px-3 text-sm font-medium transition-colors ${
                    selectedColor === color
                      ? "border-black bg-black text-white"
                      : "border-neutral-300 hover:border-black"
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="mb-3 text-sm font-medium">Quantity</h3>
            <div className="flex h-12 w-32 items-center">
              <button
                className="flex h-full w-12 items-center justify-center border border-r-0 border-neutral-300"
                onClick={decreaseQuantity}
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="flex h-full w-12 items-center justify-center border-y border-neutral-300 text-center">
                {quantity}
              </div>
              <button
                className="flex h-full w-12 items-center justify-center border border-l-0 border-neutral-300"
                onClick={increaseQuantity}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <Button
            size="lg"
            className="mb-8 w-full"
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            {isAdding ? "Adding to Cart..." : "Add to Cart"}
          </Button>

          {/* Product Details */}
          <div className="border-t border-neutral-200 pt-6">
            <h3 className="mb-3 text-lg font-medium">Details</h3>
            <ul className="list-inside list-disc space-y-2 text-neutral-600">
              {product.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
