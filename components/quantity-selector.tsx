"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  defaultValue?: number
  min?: number
  max?: number
  onChange?: (value: number) => void
}

export default function QuantitySelector({
  defaultValue = 1,
  min = 1,
  max = 99,
  onChange
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(defaultValue)

  const incrementQuantity = () => {
    if (quantity < max) {
      const newValue = quantity + 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  const decrementQuantity = () => {
    if (quantity > min) {
      const newValue = quantity - 1
      setQuantity(newValue)
      onChange?.(newValue)
    }
  }

  return (
    <div className="flex items-center border rounded-md">
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={decrementQuantity}
        disabled={quantity <= min}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button 
        variant="ghost" 
        size="icon" 
        className="h-8 w-8" 
        onClick={incrementQuantity}
        disabled={quantity >= max}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  )
}
