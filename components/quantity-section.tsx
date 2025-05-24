"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShieldCheck } from "lucide-react"
import QuantitySelector from "@/components/quantity-selector"
import AddToCartButton from "@/components/add-to-cart-button"
import type { Product } from "@/lib/types"
import { formatCurrency } from "@/lib/currency"

interface QuantitySectionProps {
  product: Product
}

export default function QuantitySection({ product }: QuantitySectionProps) {
  const [quantity, setQuantity] = useState(1)

  return (    <div className="border rounded-lg p-3 md:p-4 bg-secondary/30">
      <div className="text-lg md:text-xl font-bold mb-2 text-primary">{formatCurrency(product.price)}</div>

      <div className="text-green-600 font-medium mb-3 md:mb-4 flex items-center gap-1 text-sm md:text-base">
        <ShieldCheck className="h-3 w-3 md:h-4 md:w-4" />
        <span>In Stock</span>
      </div>

      <div className="flex items-center mb-4 md:mb-6">
        <span className="mr-3 text-sm md:text-base">Qty:</span>
        <QuantitySelector defaultValue={1} onChange={setQuantity} />
      </div>

      <div className="space-y-3">
        <AddToCartButton 
          product={product} 
          quantity={quantity} 
          className="w-full" 
        />
        <Link href={`/checkout?productId=${product.id}&quantity=${quantity}`} className="block">
          <Button variant="outline" className="w-full bg-green-600 hover:bg-green-700 text-white">
            Buy Now
          </Button>
        </Link>
      </div>      <div className="mt-4 text-xs md:text-sm">
        <div className="flex items-start gap-2 mb-1 md:mb-2">
          <span className="font-medium">Ships from</span>
          <span>Ghosala.com</span>
        </div>
        <div className="flex items-start gap-2 mb-1 md:mb-2">
          <span className="font-medium">Sold by</span>
          <span>Ghosala LLC</span>
        </div>
        <div className="flex items-start gap-2">
          <span className="font-medium">Returns</span>
          <span>Eligible for Return, Refund or Replacement within 30 days</span>
        </div>
      </div>
    </div>
  )
}
