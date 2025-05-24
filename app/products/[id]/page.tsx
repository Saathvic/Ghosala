"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import ProductImageGallery from "@/components/product-image-gallery";
import QuantitySection from "@/components/quantity-section";
import ProductCard from "@/components/product-card";
import RatingStars from "@/components/rating-stars";
import { formatCurrency } from "@/lib/currency";
import { getProductById } from "@/lib/data";
import type { Product } from "@/lib/types";

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  useEffect(() => {
    if (params.id) {
      // Make sure we're using a string ID and handle potential Array case
      const productId = Array.isArray(params.id) ? params.id[0] : params.id;
      const productData = getProductById(productId);
      console.log("Product data fetched:", productId, productData);
      setProduct(productData);
    }
  }, [params.id]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Loading Product...</h1>
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-32 w-32 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>
        <Link href="/products" className="mt-6 inline-block">
          <Button>Back to All Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 md:mb-6 text-xs md:text-sm overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="text-gray-500 hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-gray-500 flex-shrink-0" />
        <Link href="/products" className="text-gray-500 hover:text-primary">
          Products
        </Link>
        <ChevronRight className="h-3 w-3 md:h-4 md:w-4 text-gray-500 flex-shrink-0" />
        <span className="font-medium">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - Product Images */}
        <div>
          <ProductImageGallery images={product.images} />
        </div>

        {/* Right Column - Product Info */}
        <div>
          <div className="mb-4">
            {product.badge && (
              <span className="inline-block bg-primary text-white text-xs px-2 py-1 rounded-full mb-2">
                {product.badge}
              </span>
            )}
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center">
                <RatingStars rating={product.rating} />
                <span className="ml-2 text-sm text-gray-500">
                  ({product.reviewCount} reviews)
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-500 line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 mb-6">
            {product.longDescription || product.description}
          </p>

          {/* Add to Cart Section */}
          <QuantitySection product={product} />

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Key Features</h2>
              <ul className="space-y-2">
                {product.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Specifications</h2>
              <div className="grid grid-cols-1 gap-3">
                {product.specifications.map(
                  (spec: { name: string; value: string }, index: number) => (
                    <div key={index} className="flex border-b pb-2">
                      <span className="font-medium w-1/3">{spec.name}</span>
                      <span className="w-2/3">{spec.value}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Benefits</h2>
              <ul className="space-y-2">
                {product.benefits.map((benefit: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Usage */}
          {product.usage && product.usage.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Recommended Uses</h2>
              <ul className="space-y-2">
                {product.usage.map((use: string, index: number) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
