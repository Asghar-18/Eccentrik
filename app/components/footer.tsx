import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-lg font-bold">ECCENTRIK</h3>
            <p className="text-sm text-neutral-600">We do it better.</p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/new-arrivals" className="text-neutral-600 hover:text-black">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/polos" className="text-neutral-600 hover:text-black">
                  Polos
                </Link>
              </li>
              <li>
                <Link href="/tees" className="text-neutral-600 hover:text-black">
                  Tees
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="text-neutral-600 hover:text-black">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-neutral-600 hover:text-black">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-neutral-600 hover:text-black">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-neutral-600 hover:text-black">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-neutral-600 hover:text-black">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase">Help</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="text-neutral-600 hover:text-black">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-neutral-600 hover:text-black">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-neutral-600 hover:text-black">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-neutral-600 hover:text-black">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-neutral-200 pt-8 md:flex-row">
          <p className="mb-4 text-sm text-neutral-600 md:mb-0">
            © {new Date().getFullYear()} Eccentrik. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="https://instagram.com" aria-label="Instagram" className="text-neutral-600 hover:text-black">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="https://facebook.com" aria-label="Facebook" className="text-neutral-600 hover:text-black">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="https://twitter.com" aria-label="Twitter" className="text-neutral-600 hover:text-black">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
