import Link from "next/link"
import HeroCarousel from "@/components/hero-carousel"
import ProductRow from "@/components/product-row"
import { categories, featuredProducts, bestSellers, spiritualProducts } from "@/lib/data"
import { Leaf, ShieldCheck, Truck, Heart } from "lucide-react"

export default function Home() {
  return (
    <>
      <section className="relative">
        <HeroCarousel />
      </section>

      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">100% Organic</h3>
              <p className="text-sm text-muted-foreground">
                All our products are certified organic, sustainably sourced, and free from harmful chemicals.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-muted-foreground">
                We rigorously test all products to ensure they meet our high standards for quality and purity.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Free Shipping</h3>
              <p className="text-sm text-muted-foreground">
                Enjoy free carbon-neutral shipping on all orders over $50 throughout the continental US.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Giving Back</h3>
              <p className="text-sm text-muted-foreground">
                We donate 5% of our profits to environmental conservation and sustainable farming initiatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 space-y-16">
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/products" className="text-primary hover:underline text-lg">
              View All
            </Link>
          </div>
          <ProductRow products={featuredProducts} />
        </section>

        <section className="pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Traditional Items</h2>
            <Link href="/products" className="text-primary hover:underline text-lg">
              View All
            </Link>
          </div>
          <ProductRow products={bestSellers} />
        </section>

        <section className="pt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Spiritual Essentials</h2>
            <Link href="/products" className="text-primary hover:underline text-lg">
              View All
            </Link>
          </div>
          <ProductRow products={spiritualProducts} />
        </section>

        <section className="bg-secondary/30 py-12 rounded-lg">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.map((category) => (
                <div key={category.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-4 text-center">{category.name}</h3>
                  <div className="aspect-square relative mb-4">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="rounded-md object-cover w-full h-full"
                    />
                  </div>
                  <Link href={`/products`} className="text-primary text-sm hover:underline flex justify-center items-center">
                    Shop now
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary/10 rounded-lg p-8 my-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Organic Community</h2>
              <p className="mb-6 text-muted-foreground">
                Subscribe to our newsletter for exclusive offers, new product announcements, seasonal recipes, and
                sustainable living tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Subscribe
                </button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <img
                src="/placeholder.svg?height=200&width=300"
                alt="Organic farming"
                className="rounded-lg max-w-full h-auto"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
