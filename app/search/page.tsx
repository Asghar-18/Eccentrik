"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Filter } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ProductCard from "../components/product-card";
import SearchInput from "../components/search-input";
import { getAllProducts } from "@/lib/constants/product-data";
import type { Product } from "@/lib/constants/product-data";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams?.get("q") || "";
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);

      try {
        const allProducts = getAllProducts();
        const results = allProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error searching products:", error);
        setSearchResults([]);
        setIsLoading(false);
      }
    };

    if (query) {
      fetchResults();
    } else {
      setSearchResults([]);
      setIsLoading(false);
    }
  }, [query]);

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-6 text-3xl font-semibold">Search Results</h1>
        <div className="max-w-xl">
          <SearchInput initialQuery={query} variant="page" autoFocus />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
        <>
          {searchResults.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-neutral-600">
                  {searchResults.length}{" "}
                  {searchResults.length === 1 ? "result" : "results"} for
                  &ldquo;
                  {query}&rdquo;
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" /> Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <h2 className="mb-4 text-2xl font-semibold">No results found</h2>
              <p className="mb-8 max-w-md text-neutral-600">
                We could not find any products matching &ldquo;{query}&rdquo;.
                Try checking your spelling or using more general terms.
              </p>
              <Button asChild>
                <Link href="/new-arrivals">Browse All Products</Link>
              </Button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
