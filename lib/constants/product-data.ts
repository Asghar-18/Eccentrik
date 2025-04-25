export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description?: string
}

// New Arrivals Products
const newArrivalsProducts: Product[] = [
  {
    id: 101,
    name: "Premium Tee",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "Our newest premium tee with enhanced comfort and durability.",
  },
  {
    id: 102,
    name: "Designer Polo",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Polos",
    description: "A stylish designer polo for the modern wardrobe.",
  },
  {
    id: 103,
    name: "Limited Edition Hoodie",
    price: 69.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Hoodies",
    description: "Our limited edition hoodie with premium materials.",
  },
  {
    id: 104,
    name: "Seasonal Jacket",
    price: 99.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    description: "A perfect jacket for the changing seasons.",
  },
  {
    id: 105,
    name: "Graphic Tee",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "Express yourself with our new graphic tee designs.",
  },
  {
    id: 106,
    name: "Sport Polo",
    price: 54.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Polos",
    description: "Performance polo designed for active lifestyles.",
  },
]

// Polos Products
const polosProducts: Product[] = [
  {
    id: 201,
    name: "Classic Polo",
    price: 44.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Polos",
    description: "A timeless classic polo that never goes out of style.",
  },
  {
    id: 202,
    name: "Striped Polo",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Polos",
    description: "Elegant striped design for a sophisticated look.",
  },
  {
    id: 203,
    name: "Sport Polo",
    price: 54.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Polos",
    description: "Performance fabric designed for comfort during activities.",
  },
  {
    id: 204,
    name: "Premium Polo",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Polos",
    description: "Our premium polo made with the finest materials.",
  },
  {
    id: 205,
    name: "Slim Fit Polo",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Polos",
    description: "Modern slim fit design for a sleek silhouette.",
  },
  {
    id: 206,
    name: "Long Sleeve Polo",
    price: 54.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Polos",
    description: "Extended comfort with our long sleeve polo design.",
  },
  {
    id: 207,
    name: "Patterned Polo",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Polos",
    description: "Unique patterns to stand out from the crowd.",
  },
  {
    id: 208,
    name: "Contrast Collar Polo",
    price: 54.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Polos",
    description: "Distinctive contrast collar for a refined look.",
  },
]

// Tees Products
const teesProducts: Product[] = [
  {
    id: 301,
    name: "Essential Tee",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "The essential tee for every wardrobe.",
  },
  {
    id: 302,
    name: "Graphic Tee",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "Express yourself with our unique graphic designs.",
  },
  {
    id: 303,
    name: "Vintage Wash Tee",
    price: 32.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "Pre-washed for that perfect vintage feel.",
  },
  {
    id: 304,
    name: "Premium Cotton Tee",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "Made with premium cotton for exceptional comfort.",
  },
  {
    id: 305,
    name: "Pocket Tee",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "Classic design with a convenient pocket detail.",
  },
  {
    id: 306,
    name: "Long Sleeve Tee",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "Extended comfort with our long sleeve design.",
  },
  {
    id: 307,
    name: "Striped Tee",
    price: 34.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "Timeless striped pattern for a nautical look.",
  },
  {
    id: 308,
    name: "Oversized Tee",
    price: 36.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "Relaxed oversized fit for maximum comfort.",
  },
]

// Featured Products
const featuredProducts: Product[] = [
  {
    id: 401,
    name: "Signature Tee",
    price: 29.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "T-Shirts",
    description: "Our signature tee with exceptional comfort and style.",
  },
  {
    id: 402,
    name: "Premium Denim",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Jeans",
    description: "Premium denim crafted for durability and style.",
  },
  {
    id: 403,
    name: "Everyday Hoodie",
    price: 49.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Hoodies",
    description: "Your new favorite everyday hoodie.",
  },
  {
    id: 404,
    name: "Statement Jacket",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "Outerwear",
    description: "Make a statement with our signature jacket.",
  },
]

// Get all products
export function getAllProducts(): Product[] {
  return [...newArrivalsProducts, ...polosProducts, ...teesProducts, ...featuredProducts]
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  const allProducts = getAllProducts()
  return allProducts.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

// Get new arrivals
export function getNewArrivals(): Product[] {
  return newArrivalsProducts
}

// Get polos
export function getPolos(): Product[] {
  return polosProducts
}

// Get tees
export function getTees(): Product[] {
  return teesProducts
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return featuredProducts
}

// Get product by ID
export function getProductById(id: number): Product | undefined {
  const allProducts = getAllProducts()
  return allProducts.find((product) => product.id === id)
}

// Search products
export function searchProducts(query: string): Product[] {
  if (!query) return []

  const allProducts = getAllProducts()
  const lowerCaseQuery = query.toLowerCase()

  return allProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery) ||
      (product.description && product.description.toLowerCase().includes(lowerCaseQuery)),
  )
}
