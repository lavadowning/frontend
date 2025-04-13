import { getOneProduct, getRecentProducts } from "@/lib/getProducts";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import { Star, StarHalf } from "lucide-react";
import { Truck, Undo2 } from "lucide-react";
import AddToCartButton from "@/components/CartButton";
import { getStrapiMedia } from "@/lib/utils";
export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getOneProduct(id);
  const fullStars = Math.floor(product.rating);
  const hasHalfStar = product.rating % 1 >= 0.25 && product.rating % 1 < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const recentProducts = await getRecentProducts(product.category, product.id);
  const Products = recentProducts.slice(0, 4);
  const imageUrl = getStrapiMedia(product.image.url);
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col">
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Фото */}

        <div className="w-full h-[400px] relative">
          <Image
            src={imageUrl}
            alt={product.name}
            layout="fill"
            objectFit="contain"
            className="rounded"
          />
        </div>
        {/* Информация о товаре */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>

          {/* Рейтинг */}
          <div className="flex items-center gap-2 text-yellow-500">
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
            <span className="text-sm text-gray-500">({product.rating})</span>
          </div>

          {/* Цена */}
          <p className="text-2xl text-red-500 font-semibold">
            ${product.price}
          </p>

          {/* Описание */}
          <p className="text-gray-700">{product.description}</p>

          {/* Кнопка */}
          <div className="flex items-center space-x-4 mt-6">
            <AddToCartButton productId={id} />
          </div>

          {/* Информация о доставке */}
          <div className="mt-6 border p-4 rounded text-sm space-y-2">
            <div className="flex gap-2 font-medium">
              <Truck />
              <div>Free Delivery</div>
            </div>
            <div className="flex gap-2 font-medium">
              <Undo2 />
              <div>Return Delivery – Free 30 Days</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-4 items-center">
        <div className="font-medium pb-4">Recent products</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
