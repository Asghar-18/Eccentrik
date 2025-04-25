"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, SearchIcon, ShoppingCart, User, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCart } from "../context/cart-context";
import SearchInput from "./search-input";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const searchIconRef = useRef<HTMLDivElement | null>(null);

  const navigationItems = [
    { href: "/products", label: "All Products" },    
    { href: "/new-arrivals", label: "New Arrivals" },
    { href: "/polos", label: "Polos" },
    { href: "/tees", label: "Tees" },    
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };

      checkIfMobile();
      window.addEventListener("resize", checkIfMobile);

      return () => {
        window.removeEventListener("resize", checkIfMobile);
      };
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchOpen &&
        searchIconRef.current &&
        !searchIconRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest(".search-dropdown")
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);


  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white">
      <div className="container mx-auto flex h-24 items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          ECCENTRIK
        </Link>

        <nav className="hidden space-x-10 md:flex md:mr-12">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium hover:text-neutral-500 transition-colors relative group"
            >
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block" ref={searchIconRef}>
            <button
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <SearchIcon className="h-5 w-5" />
            </button>

            {/* Search dropdown below the icon */}
            {isSearchOpen && !isMobile && (
              <div className="search-dropdown absolute right-0 top-full mt-2 w-64 bg-white shadow-lg rounded-md p-2 border border-neutral-200 z-50">
                <SearchInput onClose={() => setIsSearchOpen(false)} autoFocus />
              </div>
            )}
          </div>

          <Link
            href="/account"
            aria-label="Account"
            className="hidden md:block"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" aria-label="Cart" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
              {cartCount}
            </span>
          </Link>
          <button
            aria-label="Menu"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="mb-8 flex items-center justify-between">
              <Link
                href="/"
                className="text-xl font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                ECCENTRIK
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-6">
              <SearchInput
                variant="page"
                onClose={() => setIsMenuOpen(false)}
              />
            </div>

            <nav className="flex flex-col space-y-6">
              {[...navigationItems, { href: "/account", label: "Account" }].map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-6">
                <Button
                  className="w-full"
                  onClick={() => setIsMenuOpen(false)}
                  asChild
                >
                  <Link href="/new-arrivals">Shop Now</Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
