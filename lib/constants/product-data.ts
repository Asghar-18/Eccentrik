export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  description: string;
}

const productData: Product[] = [
  {
    id: 101,
    name: "Beige Tee",
    price: 1610,
    image: "/images/beige_front_1.jpg",
    images: [
      "/images/beige_front_1.jpg",
      "/images/beige_back.jpg",
      "/images/beige_front.jpg",
    ],
    category: "T-Shirts",
    description: "Our signature tee with exceptional comfort and style.",
  },
  {
    id: 102,
    name: "White Tee",
    price: 1610,
    image: "/images/white_front.jpg",
    images: [
      "/images/white_front.jpg",
      "/images/white_back.jpg",
      "/images/white_front_1.jpg",
    ],
    category: "T-Shirts",
    description: "Our signature tee with exceptional comfort and style.",
  },
  {
    id: 103,
    name: "Owner's Dept. Tee",
    price: 1610,
    image: "/images/green_front.jpg",
    images: [
      "/images/green_front.jpg",
      "/images/green_back.jpg",
      "/images/green_front_1.jpg",
    ],
    category: "T-Shirts",
    description: "Our signature tee with exceptional comfort and style.",
  },
  {
    id: 104,
    name: "Obscure Black",
    price: 3450,
    image: "/images/obscure/Black1.JPG",
    images: [
      "/images/obscure/Black1.JPG",
      "/images/obscure/Black2.JPG",
      "/images/obscure/BG3.JPG",
    ],
    category: "Quarter Zip",
    description:
      "Minimal, versatile, and timeless, this relaxed-fit quarter-zip offers effortless style and everyday comfort.",
  },
  {
    id: 105,
    name: "Obscure Green",
    price: 3450,
    image: "/images/obscure/Green1.JPG",
    images: [
      "/images/obscure/Green1.JPG",
      "/images/obscure/Green2.JPG",
      "/images/obscure/BG3.JPG",
    ],
    category: "Quarter Zip",
    description:
      "Minimal, versatile, and timeless, this relaxed-fit quarter-zip offers effortless style and everyday comfort.",
  },
];

// Define which product IDs appear in which collection
const newArrivalsIds = [104, 105];
const teesIds = [101, 102, 103];
const zippersIds = [104, 105];
const featuredIds = [104, 105];

// Get all products (no duplicates)
export function getAllProducts(): Product[] {
  return productData;
}

// Get products by category
export function getProductsByCategory(category: string): Product[] {
  return productData.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );
}

// Get new arrivals
export function getNewArrivals(): Product[] {
  return productData.filter((product) => newArrivalsIds.includes(product.id));
}

// Get tees
export function getTees(): Product[] {
  return productData.filter((product) => teesIds.includes(product.id));
}

// Get quarter zips
export function getZippers(): Product[] {
  return productData.filter((product) => zippersIds.includes(product.id));
}

// Get featured products
export function getFeaturedProducts(): Product[] {
  return productData.filter((product) => featuredIds.includes(product.id));
}

// Get product by ID
export function getProductById(id: number): Product | undefined {
  return productData.find((product) => product.id === id);
}

// Search products
export function searchProducts(query: string): Product[] {
  if (!query) return [];

  const lowerCaseQuery = query.toLowerCase();

  return productData.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerCaseQuery) ||
      product.category.toLowerCase().includes(lowerCaseQuery) ||
      (product.description &&
        product.description.toLowerCase().includes(lowerCaseQuery))
  );
}
