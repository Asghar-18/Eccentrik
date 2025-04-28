"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PolosPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold">Polos</h1>
      </div>
      
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="mb-4 text-4xl font-bold">Coming Soon</h2>
        <p className="mb-8 max-w-lg text-neutral-600">
          Our collection of premium polos is currently in production. Check back soon to discover our new styles, or sign up for our newsletter to be notified when they arrive.
        </p>
        <Button asChild>
          <Link href="/products" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" /> Browse Other Products
          </Link>
        </Button>
      </div>
    </main>
  )
}

// "use client"

// import { useState, useEffect } from "react"
// import { Filter } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import ProductCard from "../components/product-card"
// import { getPolos } from "@/lib/constants/product-data";
// import type { Product } from "@/lib/constants/product-data";

// export default function PolosPage() {
//   const [products, setProducts] = useState<Product[]>([]) 
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {    
//     const polosProducts = getPolos()
//     setProducts(polosProducts)
//     setIsLoading(false)
//   }, [])

//   return (
//     <main className="container mx-auto px-4 py-12">
//       <div className="mb-8 flex items-center justify-between">
//         <h1 className="text-3xl font-semibold">Polos</h1>
//         <Button variant="outline" size="sm" className="flex items-center gap-2">
//           <Filter className="h-4 w-4" /> Filter
//         </Button>
//       </div>

//       {isLoading ? (
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {[...Array(8)].map((_, i) => (
//             <div key={i} className="animate-pulse">
//               <div className="mb-4 h-[400px] rounded-lg bg-neutral-200"></div>
//               <div className="mb-2 h-4 w-1/3 rounded bg-neutral-200"></div>
//               <div className="mb-2 h-5 w-2/3 rounded bg-neutral-200"></div>
//               <div className="h-4 w-1/4 rounded bg-neutral-200"></div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {products.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       )}
//     </main>
//   )
// }
