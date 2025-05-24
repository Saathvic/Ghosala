"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, ShoppingCart } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
  quantity?: number
  className?: string
  showIcon?: boolean
}

export default function AddToCartButton({ 
  product, 
  quantity = 1, 
  className = "", 
  showIcon = true 
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()
  
  const handleAddToCart = () => {
    setIsAdding(true)
    
    // Simulate a brief loading state
    setTimeout(() => {
      addItem(product, quantity)
      setIsAdding(false)
      setJustAdded(true)
      
      // Reset the "just added" state after 2 seconds
      setTimeout(() => setJustAdded(false), 2000)
    }, 300)
  }
    return (
    <Button 
      className={`${className} flex items-center justify-center text-xs md:text-sm h-9`}
      onClick={handleAddToCart}
      disabled={isAdding || justAdded}
    >
      {justAdded ? (
        <>
          <Check className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
          <span className="hidden xs:inline">Added to Cart!</span>
          <span className="xs:hidden">Added!</span>
        </>
      ) : isAdding ? (
        <>
          <div className="h-3 w-3 md:h-4 md:w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-1 md:mr-2" />
          <span className="hidden xs:inline">Adding...</span>
          <span className="xs:hidden">Adding</span>
        </>
      ) : (
        <>
          {showIcon && <ShoppingCart className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />}
          <span>Add to Cart</span>
        </>
      )}
    </Button>
  )
}
