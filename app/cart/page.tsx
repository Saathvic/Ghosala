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
        <div className="text-center py-12 bg-white border rounded-lg shadow-sm">
          <div className="flex justify-center mb-4">
            <ShoppingBag className="h-16 w-16 text-gray-300" />
          </div>
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border rounded-lg overflow-hidden shadow-sm">
              <div className="p-4 bg-secondary/50 border-b">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <span className="font-medium">Product</span>
                  </div>
                  <div className="col-span-2 text-center hidden sm:block">
                    <span className="font-medium">Price</span>
                  </div>
                  <div className="col-span-2 text-center">
                    <span className="font-medium">Quantity</span>
                  </div>
                  <div className="col-span-4 sm:col-span-2 text-right">
                    <span className="font-medium">Total</span>
                  </div>
                </div>
              </div>

              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 relative flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-sm sm:text-base">{item.name}</h3>
                            <div className="text-sm text-gray-500 mt-1 hidden sm:block">
                              {item.variant && `${item.variant.name}: ${item.variant.value}`}
                            </div>
                            <div className="text-sm text-primary font-medium mt-1 sm:hidden">
                              {formatCurrency(item.price)}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 text-center hidden sm:block">
                        <span>{formatCurrency(item.price)}</span>
                      </div>
                      <div className="col-span-2">
                        <div className="flex items-center justify-center border rounded-md mx-auto w-24">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="col-span-4 sm:col-span-2 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <span className="font-medium">{formatCurrency(item.price * item.quantity)}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-gray-500"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <div className="flex-1">
                <div className="relative">
                  <input type="text" placeholder="Promo code" className="w-full border rounded-md py-2 px-3 pr-20" />
                  <Button className="absolute right-0 top-0 bottom-0 rounded-l-none">Apply</Button>
                </div>
              </div>
              <Link href="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border rounded-lg p-4">
              <h2 className="text-base md:text-lg font-semibold mb-4">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>{formatCurrency(orderTotal)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full mt-6">Proceed to Checkout</Button>
              </Link>

              <div className="mt-4 p-3 bg-secondary/50 rounded-lg text-sm">
                <div className="flex items-center gap-2 text-primary font-medium">
                  <Leaf className="h-4 w-4" />
                  <span>Eco-friendly packaging</span>
                </div>
                <p className="mt-1 text-muted-foreground">
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
