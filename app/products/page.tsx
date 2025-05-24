"use client"

import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product-card"
import ProductCardSkeleton from "@/components/product-card-skeleton"
import { products, categories } from "@/lib/data"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"

export default function ProductsPage() {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState("featured")
  const [priceFilters, setPriceFilters] = useState({
    'price-1': false,
    'price-2': false,
    'price-3': false,
    'price-4': false
  })
  const [certificationFilters, setCertificationFilters] = useState({
    'cert-1': false,
    'cert-2': false,
    'cert-3': false,
    'cert-4': false,
    'cert-5': false
  })

  const filteredProducts = selectedCategory
    ? products.filter(p => p.category === selectedCategory)
    : products

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  const handlePriceFilterChange = (filterId: string) => {
    setPriceFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId as keyof typeof prev]
    }))
  }

  const handleCertificationFilterChange = (filterId: string) => {
    setCertificationFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId as keyof typeof prev]
    }))
  }

  const FilterSidebar = () => (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white p-4 border rounded-lg">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold">Categories</h3>
          <Button variant="link" size="sm" className="text-xs md:hidden" onClick={() => setIsFiltersOpen(false)}>Close</Button>
        </div>
        <ul className="space-y-2 text-sm">
          {categories.map((category) => (
            <li key={category.id}>
              <Link href={`/products?category=${category.slug}`} className="hover:text-primary flex justify-between items-center">
                <span>{category.name}</span>
                {/* Placeholder for count, can be dynamic later */}
                {/* <span className="text-xs text-gray-400">({products.filter(p => p.category === category.name).length})</span> */}
              </Link>
            </li>
          ))}
           <li>
            <Link href="/products" className="hover:text-primary font-semibold">
              All Products
            </Link>
          </li>
        </ul>

        <div className="mt-6">
          <h3 className="font-semibold mb-3">Price Range</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="price-1" 
                className="mr-2" 
                checked={priceFilters['price-1']}
                onChange={() => handlePriceFilterChange('price-1')}
              />
              <label htmlFor="price-1" className="text-sm">
                ₹500 to ₹650
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="price-2" 
                className="mr-2" 
                checked={priceFilters['price-2']}
                onChange={() => handlePriceFilterChange('price-2')}
              />
              <label htmlFor="price-2" className="text-sm">
                ₹650 to ₹750
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="price-3" 
                className="mr-2" 
                checked={priceFilters['price-3']}
                onChange={() => handlePriceFilterChange('price-3')}
              />
              <label htmlFor="price-3" className="text-sm">
                ₹750 to ₹850
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="price-4" 
                className="mr-2" 
                checked={priceFilters['price-4']}
                onChange={() => handlePriceFilterChange('price-4')}
              />
              <label htmlFor="price-4" className="text-sm">
                ₹850 & Above
              </label>
              </div>
            </div>
          </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-3">Certifications</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="cert-1" 
                className="mr-2" 
                checked={certificationFilters['cert-1']}
                onChange={() => handleCertificationFilterChange('cert-1')}
              />
              <label htmlFor="cert-1" className="text-sm">
                USDA Organic
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="cert-2" 
                className="mr-2" 
                checked={certificationFilters['cert-2']}
                onChange={() => handleCertificationFilterChange('cert-2')}
              />
              <label htmlFor="cert-2" className="text-sm">
                Non-GMO Project
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="cert-3" 
                className="mr-2" 
                checked={certificationFilters['cert-3']}
                onChange={() => handleCertificationFilterChange('cert-3')}
              />
              <label htmlFor="cert-3" className="text-sm">
                Fair Trade
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="cert-4" 
                className="mr-2" 
                checked={certificationFilters['cert-4']}
                onChange={() => handleCertificationFilterChange('cert-4')}
              />
              <label htmlFor="cert-4" className="text-sm">
                B Corp
              </label>
            </div>
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="cert-5" 
                className="mr-2" 
                checked={certificationFilters['cert-5']}
                onChange={() => handleCertificationFilterChange('cert-5')}
              />
              <label htmlFor="cert-5" className="text-sm">
                Cruelty Free
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold mb-3">Customer Rating</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="rating-4" className="mr-2" onChange={() => {}} />
              <label htmlFor="rating-4" className="text-sm">
                4★ & Above
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="rating-3" className="mr-2" onChange={() => {}} />
              <label htmlFor="rating-3" className="text-sm">
                3★ & Above
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="rating-2" className="mr-2" onChange={() => {}} />
              <label htmlFor="rating-2" className="text-sm">
                2★ & Above
              </label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="rating-1" className="mr-2" onChange={() => {}} />
              <label htmlFor="rating-1" className="text-sm">
                1★ & Above
              </label>
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-6 text-sm" onClick={() => {
          setPriceFilters({
            'price-1': false,
            'price-2': false,
            'price-3': false,
            'price-4': false
          });
          setCertificationFilters({
            'cert-1': false,
            'cert-2': false,
            'cert-3': false,
            'cert-4': false,
            'cert-5': false
          });
          setSelectedCategory(null);
        }}>
          Clear Filters
        </Button>
        </div>
      </aside>
    );

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="flex items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="text-gray-500 hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-gray-500 flex-shrink-0" />
        <span className="font-medium">All Products</span>
      </div>

      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* Mobile Filter Button & Sheet */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">All Products</h1>
          <Sheet open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <FilterSidebar />
            </SheetContent>
          </Sheet>
        </div>
        
        {/* Desktop Filter Sidebar */}
        <div className="hidden md:block">
          <FilterSidebar />
        </div>

        <div className="flex-1">
          <div className="hidden md:flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Sort by:</span>
              <select 
                className="text-sm border rounded-md p-1"
                value={sortBy}
                onChange={(e) => {
                  const value = e.target.value;
                  switch(value) {
                    case "Price: Low to High":
                      setSortBy("price-low");
                      break;
                    case "Price: High to Low":
                      setSortBy("price-high");
                      break;
                    case "Customer Rating":
                      setSortBy("rating");
                      break;
                    default:
                      setSortBy("featured");
                  }
                }}
              >
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
                <option>Newest Arrivals</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center">
            <Button variant="outline" className="mx-1" onClick={() => {/* Pagination logic will go here */}}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button variant="outline" className="mx-1" onClick={() => {/* Pagination logic will go here */}}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
