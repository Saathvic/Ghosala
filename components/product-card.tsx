"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Leaf, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import RatingStars from "@/components/rating-stars"
import type { Product } from "@/lib/types"
import { useCart } from "@/contexts/cart-context"
import { formatCurrency } from "@/lib/currency"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsAdding(true)
    
    // Simulate a brief loading state
    setTimeout(() => {
      addItem(product)
      setIsAdding(false)
      setJustAdded(true)
      
      // Reset the "just added" state after 2 seconds
      setTimeout(() => setJustAdded(false), 2000)
    }, 300)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.location.href = `/checkout?productId=${product.id}`
  }

  return (
    <div
      className="group border rounded-lg overflow-hidden bg-white h-full flex flex-col shadow-sm hover:shadow-md transition-shadow"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.id}`} className="relative block">
        <div className="aspect-square relative overflow-hidden">
          <Image
            src={product.images[0] || '/placeholder.svg'}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-contain w-full h-full transition-transform group-hover:scale-105"
            onError={() => {
              console.log(`Image failed to load for product: ${product.id}`);
            }}
          />
        </div>

        {product.badge && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <Leaf className="h-3 w-3" />
            <span>{product.badge}</span>
          </div>
        )}

        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </Link>

      <div className="p-3 sm:p-4 flex-1 flex flex-col">
        <Link href={`/products/${product.id}`} className="flex-1">
          <div className="text-xs text-primary font-medium mb-1">{product.category}</div>
          <h3 className="font-medium line-clamp-2 mb-1 hover:text-primary transition-colors text-sm sm:text-base">{product.name}</h3>

          <div className="flex items-center gap-1 mb-2">
            <RatingStars rating={product.rating} />
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="font-bold text-lg text-primary">{formatCurrency(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{formatCurrency(product.originalPrice)}</span>
            )}
          </div>
        </Link>

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button 
            className="flex-1 gap-2 text-sm h-9"
            onClick={handleAddToCart}
            disabled={isAdding || justAdded}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4" />
                Added!
              </>
            ) : isAdding ? (
              <>
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Add to Cart</span>
                <span className="sm:hidden">Add</span>
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 text-sm h-9 bg-green-600 hover:bg-green-700 text-white border-green-600"
            onClick={handleBuyNow}
          >
            <span className="hidden sm:inline">Buy Now</span>
            <span className="sm:hidden">Buy</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
