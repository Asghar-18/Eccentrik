"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import ProductCard from "./components/product-card";
import { getFeaturedProducts, Product  } from "@/lib/constants/product-data";


export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const products = getFeaturedProducts();
      setFeaturedProducts(products);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching featured products:", error);
      setFeaturedProducts([]);
      setIsLoading(false);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full bg-neutral-100">
        <div className="container mx-auto flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            ECCENTRIK
          </h1>
          <p className="mb-8 max-w-md text-lg text-neutral-600">
            We do it better.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button size="lg" className="px-8" asChild>
              <Link className="!text-base" href="/polos">
                Shop Polos
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 !bg-white"
              asChild
            >
              <Link className="!text-base" href="/tees">
                Shop Tees
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Featured Collection</h2>
            <Link
              href="/new-arrivals"
              className="flex items-center text-sm font-medium hover:underline"
            >
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="mb-4 h-[400px] rounded-lg bg-neutral-200"></div>
                  <div className="mb-2 h-4 w-1/3 rounded bg-neutral-200"></div>
                  <div className="mb-2 h-5 w-2/3 rounded bg-neutral-200"></div>a
                  <div className="h-4 w-1/4 rounded bg-neutral-200"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
