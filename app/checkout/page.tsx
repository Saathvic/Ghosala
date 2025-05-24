"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { products } from "@/lib/data"
import { useSearchParams } from 'next/navigation'
import { useCart } from "@/contexts/cart-context"
import { formatCurrency } from "@/lib/currency"

export default function CheckoutPage() {
  // Real implementation in CheckoutContent component
  return <CheckoutContent />
}

// Separate component for implementation
function CheckoutContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')
  const { items: cartItems } = useCart()
  
  // Create a modified cart items array that includes direct "Buy Now" products
  let checkoutItems = [...cartItems]
  
  // If productId is provided, add that product to checkout
  if (productId) {
    const buyNowProduct = products.find(p => p.id === productId)
    const quantity = parseInt(searchParams.get('quantity') || '1', 10)
    
    if (buyNowProduct) {
      // Add as a direct purchase item
      checkoutItems = [{
        id: buyNowProduct.id,
        name: buyNowProduct.name,
        price: buyNowProduct.price,
        image: buyNowProduct.images[0],
        quantity: quantity
      }]
    }
  }
  
  const subtotal = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const tax = subtotal * 0.07 // 7% tax
  const total = subtotal + shipping + tax

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="text-gray-500 hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-gray-500 flex-shrink-0" />
        <Link href="/cart" className="text-gray-500 hover:text-primary">
          Cart
        </Link>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-gray-500 flex-shrink-0" />
        <span className="font-medium">Checkout</span>
      </div>

      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" className="mt-1" />
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address2">Apartment, suite, etc. (optional)</Label>
                  <Input id="address2" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input id="city" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="state">State / Province</Label>
                  <Input id="state" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP / Postal Code</Label>
                  <Input id="zip" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" className="mt-1" defaultValue="United States" />
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Method</h2>
              <RadioGroup defaultValue="standard">
                <div className="flex items-center justify-between border rounded-md p-3 mb-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="font-medium">
                      Standard Shipping
                    </Label>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">Free</div>
                    <div className="text-sm text-gray-500">3-5 business days</div>
                  </div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-3 mb-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="express" id="express" />
                    <Label htmlFor="express" className="font-medium">
                      Express Shipping
                    </Label>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹499</div>
                    <div className="text-sm text-gray-500">1-2 business days</div>
                  </div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="carbon" id="carbon" />
                    <Label htmlFor="carbon" className="font-medium flex items-center gap-1">
                      <Leaf className="h-4 w-4 text-primary" />
                      <span>Carbon-Neutral Shipping</span>
                    </Label>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹249</div>
                    <div className="text-sm text-gray-500">4-6 business days</div>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="bg-white border rounded-lg p-6">
              <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
              <RadioGroup defaultValue="credit">
                <div className="flex items-center justify-between border rounded-md p-3 mb-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit" className="font-medium">
                      Credit Card
                    </Label>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-3 mb-2">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="paypal" id="paypal" />
                    <Label htmlFor="paypal" className="font-medium">
                      PayPal
                    </Label>
                  </div>
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                </div>
                <div className="flex items-center justify-between border rounded-md p-3">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="apple" id="apple" />
                    <Label htmlFor="apple" className="font-medium">
                      Apple Pay
                    </Label>
                  </div>
                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                </div>
              </RadioGroup>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="expiry">Expiration Date</Label>
                  <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" className="mt-1" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="nameOnCard">Name on Card</Label>
                  <Input id="nameOnCard" className="mt-1" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-4 md:p-6 sticky top-6">
            <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">Order Summary</h2>

            <div className="max-h-60 md:max-h-80 overflow-y-auto mb-3 md:mb-4">
              {checkoutItems.map((item) => (
                <div key={item.id} className="flex gap-3 md:gap-4 py-2 md:py-3 border-b">
                  <div className="relative w-12 h-12 md:w-16 md:h-16 flex-shrink-0">
                    <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {item.quantity}
                    </div>
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs md:text-sm font-medium truncate">{item.name}</h3>
                    {item.variant && (
                      <div className="text-xs text-gray-500">
                        {item.variant.name}: {item.variant.value}
                      </div>
                    )}
                    <div className="text-xs md:text-sm mt-1">{formatCurrency(item.price)}</div>
                  </div>
                </div>
              ))}
            </div>

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
                <span>{formatCurrency(Math.round(tax))}</span>
              </div>

              <Separator />

              <div className="flex justify-between font-semibold text-base">
                <span>Total</span>
                <span>{formatCurrency(Math.round(total))}</span>
              </div>
            </div>

            <Button className="w-full mt-6">Place Order</Button>

            <div className="mt-4 text-xs text-gray-500">
              <p>
                By placing your order, you agree to our{" "}
                <Link href="#" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="mt-4 p-3 bg-secondary/50 rounded-lg text-xs">
              <div className="flex items-center gap-1 text-primary font-medium">
                <Leaf className="h-3 w-3" />
                <span>Sustainable Shopping</span>
              </div>
              <p className="mt-1 text-muted-foreground">
                Your purchase supports organic farming and sustainable practices. Thank you for making a difference!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
