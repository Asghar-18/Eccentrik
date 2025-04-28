"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import ProductCard from "./components/product-card";
import { getFeaturedProducts, Product } from "@/lib/constants/product-data";

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
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/Background.webp"
            alt="ECCENTRIK brand hero image"
            fill
            priority
            quality={95}
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 mx-auto flex h-full flex-col items-center justify-end px-4 pb-16 text-center">
          <Link 
            href="/polos" 
            className="text-2xl text-white font-medium relative group transition-colors"
          >
            Shop Now
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto px-8">
          <div className="mb-10 flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              Featured Collection
            </h2>
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
                  <div className="mb-2 h-5 w-2/3 rounded bg-neutral-200"></div>
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