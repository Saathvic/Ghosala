import type { Product, CartItem, Category, HeroSlide } from "./types"

export const heroSlides: HeroSlide[] = [
  {
    title: "Traditional Cow Products",
    description: "Discover our range of traditional cow-based products",
    image: "/images/Untitled design (4).png",
    link: "/products",
  },
  {
    title: "Eco-Friendly Traditional Items",
    description: "Sustainable and traditional products for your home",
    image: "/images/Untitled design (5).png",
    link: "/products",
  },
  {
    title: "Spiritual Products",
    description: "Sacred items for your spiritual practices",
    image: "/images/Untitled design (6).png",
    link: "/products",
  },
  {
    title: "Pure Organic Ghee",
    description: "Traditional A2 cow ghee made using the ancient Bilona method",
    image: "/images/ghee.png",
    link: "/products/p2",
  },
  {
    title: "Panchakavya Sambrani",
    description: "Traditional incense for purification and aromatherapy",
    image: "/images/sambrani.png",
    link: "/products/p4",
  },
]

export const categories: Category[] = [
  {
    id: "cat1",
    name: "Spiritual Products",
    slug: "spiritual-products",
    image: "/images/pancharatna.png",
  },
  {
    id: "cat2",
    name: "Garden Supplies",
    slug: "garden-supplies",
    image: "/images/cow-dung.jpg",
  },
  {
    id: "cat3",
    name: "Groceries",
    slug: "groceries",
    image: "/images/ghee.webp",
  },
  {
    id: "cat4",
    name: "Health Products",
    slug: "health-products",
    image: "/images/sambrani.webp",
  }
]

export const products: Product[] = [
  {
    id: "p1",
    name: "Cow Dung Cakes",
    description: "Organic cow dung cakes for various uses including traditional ceremonies and gardening.",
    longDescription: "Our premium cow dung cakes are handcrafted from pure, organic cow dung sourced from our traditional goshala. Each cake is sun-dried to perfection, ensuring optimal burning quality and minimal smoke. Perfect for traditional Hindu ceremonies, havans, and eco-friendly gardening. These cakes are made without any chemical additives and come from cows that are treated with love and care.",
    price: 699,
    originalPrice: 799,
    rating: 4.5,
    reviewCount: 150,
    images: ["/images/cow-dung.jpg"],
    badge: "Eco-friendly",
    features: ["100% Organic", "Sun-dried", "Multipurpose", "Chemical-free", "Traditional Process"],
    specifications: [
      { name: "Material", value: "Pure Cow Dung" },
      { name: "Quantity", value: "12 pieces per pack" },
      { name: "Size", value: "5-6 inches diameter" },
      { name: "Drying Method", value: "Natural Sun-dried" },
      { name: "Best for", value: "Havans, Ceremonies, Gardening" }
    ],
    category: "Garden Supplies",
    inStock: true,
    stockQuantity: 50, // Added stockQuantity
  },
  {
    id: "p2",
    name: "Organic Ghee",
    description: "Pure and organic ghee made from A2 cow milk, perfect for cooking and religious ceremonies.",
    longDescription: "Experience the richness of traditional A2 cow ghee, carefully prepared using the ancient Bilona method. Our ghee is sourced from grass-fed indigenous cows and is rich in vitamins A, D, E, and K. The slow-cooking process ensures maximum retention of nutrients and a rich, aromatic flavor that enhances both your cooking and spiritual practices.",
    price: 699,
    originalPrice: 799,
    rating: 4.9,
    reviewCount: 300,
    images: ["/images/ghee.webp"],
    badge: "Premium",
    features: ["100% A2 Milk", "Grass-fed Cows", "Traditional Bilona Method", "Rich in Vitamins", "No Preservatives"],
    specifications: [
      { name: "Weight", value: "500g" },
      { name: "Shelf Life", value: "12 months" },
      { name: "Storage", value: "Cool, dry place" },
      { name: "Packaging", value: "Glass jar" },
      { name: "Type", value: "A2 Cow Ghee" }
    ],
    category: "Groceries",
    inStock: true,
    benefits: [
      "Rich in healthy fats",
      "High smoke point for cooking",
      "Aids digestion",
      "Suitable for lactose intolerant people",
      "Enhances immunity"
    ],
    usage: [
      "Traditional cooking",
      "Religious ceremonies",
      "Daily consumption"
    ],
    stockQuantity: 30, // Added stockQuantity
  },
  {
    id: "p3",
    name: "Panchakavya Vilakku",
    description: "Traditional lamp made from cow products for auspicious occasions and daily prayers.",
    longDescription: "Our Panchakavya Vilakku is a traditional lamp handcrafted from the five sacred products of the cow (Panchagavya). Lighting this lamp is believed to purify the environment, dispel negativity, and bring peace and prosperity. Ideal for daily puja, rituals, and festive occasions. It is eco-friendly and embodies ancient traditions.",
    price: 699,
    originalPrice: 799,
    rating: 4.8,
    reviewCount: 200,
    images: ["/images/vilakku.jpg"],
    badge: "Traditional",
    features: ["Handmade", "Auspicious", "Natural", "Eco-friendly", "Purifying"],
    specifications: [
      { name: "Material", value: "Panchagavya" },
      { name: "Type", value: "Traditional Lamp" },
      { name: "Usage", value: "Puja, Rituals, Festivals" }
    ],
    category: "Spiritual Products",
    inStock: true,
    stockQuantity: 45,
  },
  {
    id: "p4",
    name: "Panchakavya Sambrani",
    description: "Traditional incense made from cow products for purification and aromatherapy.",
    longDescription: "Our Panchakavya Sambrani is a traditional incense made from a blend of five sacred cow products and natural herbs. When burned, it releases a fragrant smoke that purifies the air, creates a calming atmosphere, and is ideal for meditation, yoga, and aromatherapy. These sambrani cups are easy to use and provide a long-lasting, soothing fragrance.",
    price: 699,
    originalPrice: 799,
    rating: 4.3,
    reviewCount: 120,
    images: ["/images/sambrani.webp"],
    features: ["Natural", "Aromatic", "Purifying", "Calming"],
    specifications: [
      { name: "Quantity", value: "20 cups per pack" },
      { name: "Ingredients", value: "Panchagavya, Natural Herbs" }
    ],
    category: "Health Products",
    inStock: true,
    stockQuantity: 60,
  },
  {
    id: "p5",
    name: "Cow Dung Basmam",
    description: "Sacred ash for religious ceremonies and spiritual practices.",
    longDescription: "Pure and sacred Cow Dung Basmam (Vibuthi) prepared using traditional Vedic methods. This holy ash is derived from burning dried cow dung of indigenous cows in a sacred fire. It is highly revered for its spiritual significance, used for applying on the forehead (Tilak) and in various Hindu rituals to invoke divine blessings and protection.",
    price: 699,
    originalPrice: 799,
    rating: 4.6,
    reviewCount: 180,
    images: ["/images/basmam.jpg"], // Updated to correct image path
    badge: "Sacred",
    features: ["100% Pure", "Traditionally Prepared", "Vedic Method", "Sacred Ash"],
    specifications: [
      { name: "Source", value: "Indigenous Cow Dung" },
      { name: "Process", value: "Traditional Vedic Method" },
      { name: "Use", value: "Religious Ceremonies, Tilak, Purification" }
    ],
    category: "Spiritual Products",
    inStock: true,
    stockQuantity: 75,
  },
  {
    id: "p6",
    name: "PANCHARATNA VASTUGAL",
    description: "A collection of five auspicious items for rituals and ceremonies.",
    longDescription: "The Pancharatna Vastugal set includes five auspicious items traditionally used in Hindu rituals and ceremonies to invoke divine blessings and positive energies. This carefully curated collection is perfect for housewarmings, pujas, and other significant occasions. Each item is selected for its spiritual significance and quality.",
    price: 699,
    originalPrice: 799,
    rating: 4.4,
    reviewCount: 160,
    images: ["/images/pancharatna.png"],
    features: ["Auspicious", "Traditional", "Complete set", "Spiritually Significant"],
    specifications: [
      { name: "Items", value: "5 pieces" },
      { name: "Usage", value: "Rituals, Pujas, Housewarming" }
    ],
    category: "Spiritual Products",
    inStock: true,
    stockQuantity: 25,
  },
  {
    id: "p7",
    name: "SWARNA MAHAPERIYAVA KIT",
    description: "A special kit for devotees of Mahaperiyava, containing all essential items for worship.",
    longDescription: "The Swarna Mahaperiyava Kit is a comprehensive collection of sacred items dedicated to the worship of Kanchi Mahaperiyava. This thoughtfully assembled kit includes high-quality puja essentials, ensuring devotees have everything they need for their prayers and rituals. Ideal for personal use or as a reverent gift.",
    price: 699,
    originalPrice: 799,
    rating: 4.7,
    reviewCount: 220,
    images: ["/images/mahaperiyava.png"],
    badge: "Handcrafted",
    features: ["Decorative", "Symbolic", "Durable", "Complete Puja Kit", "For Devotees"],
    specifications: [
      { name: "Material", value: "Brass and other traditional materials" },
      { name: "Contents", value: "Multiple worship items, specific to Mahaperiyava puja" },
      { name: "Ideal for", value: "Devotees of Mahaperiyava, Puja, Gifting" }
    ],
    category: "Spiritual Products",
    inStock: true,
    stockQuantity: 20,
  }
]

// Create non-overlapping product groups for different sections
export const featuredProducts = products.slice(0, 3)
export const bestSellers = products.slice(3, 5)
export const spiritualProducts = products.slice(5, 7)

// Ensure we're only showing each product once on the home page
export const homePageProducts = products.slice(0, 4)

export const cartItems: CartItem[] = []

// Find a product by ID
export function getProductById(id: string): Product | null {
  return products.find(p => p.id === id) || null
}
