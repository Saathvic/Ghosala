"use client"

import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, Trash2, Leaf, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { formatCurrency } from "@/lib/currency"

export default function CartPage() {
  const { items = [], total = 0, removeItem, updateQuantity } = useCart()
  const subtotal = total
  const shipping = 0 // Free shipping
  const tax = Math.round(subtotal * 0.07) // 7% tax
  const orderTotal = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-8 md:py-12 px-4 bg-white border rounded-lg shadow-sm">
          <div className="flex justify-center mb-3 md:mb-4">
            <ShoppingBag className="h-12 w-12 md:h-16 md:w-16 text-gray-300" />
          </div>
          <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-4">Your cart is empty</h2>
          <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button className="text-sm md:text-base py-2 h-auto">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
              <div className="px-3 py-3 md:p-4 bg-secondary/50 border-b">
                <div className="grid grid-cols-12 gap-2 md:gap-4">
                  <div className="col-span-6 md:col-span-6">
                    <span className="font-medium text-sm md:text-base">Product</span>
                  </div>
                  <div className="col-span-2 text-center hidden sm:block">
                    <span className="font-medium text-sm md:text-base">Price</span>
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <span className="font-medium text-sm md:text-base">Qty</span>
                  </div>
                  <div className="col-span-3 sm:col-span-2 text-right">
                    <span className="font-medium text-sm md:text-base">Total</span>
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-2 py-3 md:p-4">
                    <div className="grid grid-cols-12 gap-2 md:gap-4 items-center">
                      <div className="col-span-6 md:col-span-6">
                        <div className="flex items-center gap-2 md:gap-4">
                          <div className="w-14 h-14 md:w-16 md:h-16 relative flex-shrink-0 border rounded-md p-1">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div className="overflow-hidden">
                            <h3 className="font-medium text-xs sm:text-sm md:text-base truncate">{item.name}</h3>
                            <div className="text-xs md:text-sm text-gray-500 mt-1 hidden sm:block">
                              {item.variant && `${item.variant.name}: ${item.variant.value}`}
                            </div>
                            <div className="text-xs md:text-sm text-primary font-medium mt-1 sm:hidden">
                              {formatCurrency(item.price)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center hidden sm:block">
                        <span className="text-sm md:text-base">{formatCurrency(item.price)}</span>
                      </div>
                      <div className="col-span-3 sm:col-span-2">
                        <div className="flex items-center justify-center border rounded-md mx-auto w-20 md:w-24">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 md:h-8 md:w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-6 md:w-8 text-center text-sm md:text-base">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 md:h-8 md:w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-3 sm:col-span-2 text-right">
                        <div className="flex items-center justify-end gap-1 md:gap-2">
                          <span className="font-medium text-xs md:text-base whitespace-nowrap">{formatCurrency(item.price * item.quantity)}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-7 w-7 md:h-8 md:w-8 text-gray-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input type="text" placeholder="Promo code" className="w-full border rounded-md py-2 px-3 pr-20 text-sm md:text-base" />
                  <Button className="absolute right-0 top-0 bottom-0 rounded-l-none text-xs md:text-sm">Apply</Button>
                </div>
              </div>
              <Link href="/products" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full text-xs md:text-sm">Continue Shopping</Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-3 md:p-4">
              <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Order Summary</h2>

              <div className="space-y-2 md:space-y-3 text-xs md:text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-sm md:text-base pt-1">
                  <span>Total</span>
                  <span>{formatCurrency(orderTotal)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full mt-4 md:mt-6 text-sm md:text-base py-2 h-auto">Proceed to Checkout</Button>
              </Link>

              <div className="mt-3 md:mt-4 p-2 md:p-3 bg-secondary/50 rounded-lg">
                <div className="flex items-center gap-2 text-primary font-medium text-xs md:text-sm">
                  <Leaf className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                  <span>Eco-friendly packaging</span>
                </div>
                <p className="mt-1 text-muted-foreground text-xs md:text-sm">
                  All orders are shipped in recyclable or biodegradable packaging to minimize environmental impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
