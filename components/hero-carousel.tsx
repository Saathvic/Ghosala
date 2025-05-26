"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { heroSlides } from "@/lib/data"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, []) // Adding dependency here would cause the interval to reset when slide changes

  return (
    <div className="relative w-full" aria-label="Product carousel" role="region">
      <div className="overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0 relative" aria-hidden={index !== currentSlide}>
              <div className="aspect-[16/9] md:aspect-[21/9] w-full relative">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={`${slide.title} - ${slide.description}`}
                  fill
                  className="object-cover"
                  priority={index === 0 || index === 1}
                  sizes="(max-width: 768px) 100vw, 100vw"
                  onError={(e) => {
                    console.error(`Failed to load image: ${slide.image}`);
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
              </div>
              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-lg text-white">
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg">{slide.title}</h2>
                    <p className="text-xs sm:text-sm md:text-base mb-2 md:mb-4 drop-shadow-lg">{slide.description}</p>
                    <Link href={slide.link}>
                      <Button className="bg-primary hover:bg-primary/90 text-xs sm:text-sm md:text-base py-1 md:py-2">Shop Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md h-8 w-8 sm:h-10 sm:w-10"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md h-8 w-8 sm:h-10 sm:w-10"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2 bg-black/20 px-2 py-1 md:px-3 md:py-2 rounded-full">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"} transition-all`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
