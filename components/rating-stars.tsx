import { Star } from "lucide-react"

interface RatingStarsProps {
  rating: number
  max?: number
}

export default function RatingStars({ rating, max = 5 }: RatingStarsProps) {
  return (
    <div className="flex">
      {[...Array(max)].map((_, i) => {
        const filled = i < Math.floor(rating)
        const halfFilled = i === Math.floor(rating) && rating % 1 >= 0.5

        return (
          <Star
            key={i}
            className={`h-4 w-4 ${
              filled
                ? "fill-yellow-400 text-yellow-400"
                : halfFilled
                  ? "fill-yellow-400 text-yellow-400 half-star"
                  : "fill-muted stroke-muted-foreground"
            }`}
          />
        )
      })}
    </div>
  )
}
