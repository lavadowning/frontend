import Image from "next/image";
import Link from "next/link";
import { Star, StarHalf } from "lucide-react";

export default function ProductCard({ product }) {
  const {
    id,
    documentId,
    name,
    category,
    price,
    rating,
    image,
    comments = [],
  } = product;

  const imageUrl = image?.url? `http://localhost:1337${image.url}` : "/placeholder.jpg";

  // Расчёт звёзд
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <Link
      href={`/${documentId}`}
      className="min-w-[250px] border rounded-lg p-4 shadow-sm block hover:shadow-md transition"
    >
      <div className="relative w-full h-48 sm:h-64 md:h-48 z-0">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="rounded object-contain"
        />
      </div>

      <p className="text-sm text-gray-500 mt-2">{category}</p>

      <h2 className="text-lg font-semibold mt-1">{name}</h2>

      <p className="text-xl font-bold text-red-500">${price}</p>

      {/* Рейтинг со звездами */}
      <div className="flex items-center mt-2">
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            className="w-4 h-4 fill-yellow-400 stroke-yellow-400"
          />
        ))}
        {hasHalfStar && (
          <StarHalf className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
        ))}
        <span className="text-black text-xs ml-2">({rating})</span>
      </div>
    </Link>
  );
}
