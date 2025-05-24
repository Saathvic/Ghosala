export interface Product {
  id: string
  name: string
  description: string
  longDescription: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  images: string[]
  badge?: string
  features: string[]
  specifications: { name: string; value: string }[]
  category: string
  inStock: boolean
  benefits?: string[]
  usage?: string[]
  stockQuantity: number
  certifications?: string[]
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  variant?: {
    name: string
    value: string
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
}

export interface HeroSlide {
  title: string
  description: string
  image: string
  link: string
}
