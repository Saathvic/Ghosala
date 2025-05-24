"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductImageGalleryProps {
  images: string[]
}

export default function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0)

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <div className="space-y-3 md:space-y-4">
      <div className="relative aspect-square border rounded-lg overflow-hidden bg-white">
        <Image
          src={images[currentImage] || "/placeholder.svg"}
          alt="Product image"
          fill
          className="object-contain p-4"
          priority
        />

        {images.length > 1 && (
          <>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-1 md:left-2 top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={prevImage}
            >
              <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-1 md:right-2 top-1/2 -translate-y-1/2 h-7 w-7 md:h-8 md:w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
              onClick={nextImage}
            >
              <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </>
        )}

        <Button
          variant="outline"
          size="icon"
          className="absolute bottom-2 right-2 h-7 w-7 md:h-8 md:w-8 rounded-full bg-white/80 hover:bg-white shadow-sm"
        >
          <ZoomIn className="h-3 w-3 md:h-4 md:w-4" />
        </Button>
      </div>

      {images.length > 1 && (
        <div className="flex gap-1 md:gap-2 overflow-x-auto pb-1 md:pb-2 scrollbar-thin scrollbar-thumb-gray-300">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative w-14 h-14 md:w-16 md:h-16 border rounded-md overflow-hidden flex-shrink-0 ${
                index === currentImage ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setCurrentImage(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
