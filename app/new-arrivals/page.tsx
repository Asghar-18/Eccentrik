"use client"

import { useState, useEffect } from "react"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductCard from "../components/product-card"
import { getNewArrivals } from "@/lib/constants/product-data";
import type { Product } from "@/lib/constants/product-data";

export default function NewArrivalsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {      
      const newArrivalsProducts = getNewArrivals()
      setProducts(newArrivalsProducts)
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching new arrivals:", error)
      setProducts([])
      setIsLoading(false)
    }
  }, [])

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-semibold">New Arrivals</h1>
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-4 h-[400px] rounded-lg bg-neutral-200"></div>
              <div className="mb-2 h-4 w-1/3 rounded bg-neutral-200"></div>
              <div className="mb-2 h-5 w-2/3 rounded bg-neutral-200"></div>
              <div className="h-4 w-1/4 rounded bg-neutral-200"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}