"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Search, Menu, User, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { useCart } from "@/contexts/cart-context"

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const { itemCount = 0 } = useCart()

  // Function to determine if a path is active
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold text-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Leaf className="h-5 w-5 text-primary" />
                    <span>Ghosala</span>
                  </Link>
                  <div className="border-b my-2" />
                  <Link href="/" 
                    className={`py-2 hover:text-primary ${isActive('/') ? 'text-primary font-semibold' : ''}`} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/products" 
                    className={`py-2 hover:text-primary ${isActive('/products') ? 'text-primary font-semibold' : ''}`} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link 
                    href="/analytics" 
                    className={`py-2 hover:text-primary ${isActive('/analytics') ? 'text-primary font-semibold' : ''}`} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Analytics
                  </Link>
                  <Link 
                    href="/cart" 
                    className={`py-2 hover:text-primary ${isActive('/cart') ? 'text-primary font-semibold' : ''}`} 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Cart
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">Ghosala</span>
            </Link>
          </div>

          <div className="flex-1 max-w-xl hidden md:flex relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input className="w-full pl-10" placeholder="Search products..." />
            <Button className="ml-2">Search</Button>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart" className="flex items-center gap-1">
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              </div>
              <span className="hidden md:inline font-semibold">Cart</span>
            </Link>
          </div>
        </div>

        <div className="mt-2 md:hidden relative flex">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input className="w-full pl-10" placeholder="Search products..." />
          <Button size="sm" className="ml-2">Search</Button>
        </div>

        <nav className="hidden md:flex items-center gap-8 mt-4">
          <Link 
            href="/" 
            className={`text-sm hover:text-primary font-medium relative ${isActive('/') ? 'text-primary font-bold' : ''}`}
          >
            Home
            {isActive('/') && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary"></span>}
          </Link>
          <Link 
            href="/products" 
            className={`text-sm hover:text-primary font-medium relative ${isActive('/products') ? 'text-primary font-bold' : ''}`}
          >
            Products
            {isActive('/products') && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary"></span>}
          </Link>
          <Link 
            href="/analytics" 
            className={`text-sm hover:text-primary font-medium relative ${isActive('/analytics') ? 'text-primary font-bold' : ''}`}
          >
            Analytics
            {isActive('/analytics') && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary"></span>}
          </Link>
          <Link 
            href="/cart" 
            className={`text-sm hover:text-primary font-medium relative ${isActive('/cart') ? 'text-primary font-bold' : ''}`}
          >
            Cart
            {isActive('/cart') && <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-primary"></span>}
          </Link>
        </nav>
      </div>
    </header>
  )
}
