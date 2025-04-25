import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/header"
import Footer from "./components/footer"
import { CartProvider } from "./context/cart-context"
import { Toaster } from "@/components/ui/sonner"



const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ECCENTRIK | We do it better",
  description: "ECCENTRIK - We do it better. Shop our latest collection of clothing and accessories.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>          
            <Header />
            {children}
            <Footer />
            <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
