import ProductCard from "@/components/ProductCard";
import BenefitsSection from "@/components/Benefits";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SlidesCarousel from "@/components/SlidesCarousel";
import { getProducts } from "@/lib/getProducts";
import categories from "@/data/categories";
import Link from "next/link";
export default async function Home() {
  const data = await getProducts();
  const products = data.slice(0,8);

  return (
    <div className="p-2 sm:p-4 md:p-6 lg:p-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <SlidesCarousel />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <BenefitsSection />

        <div className="w-full flex justify-center max-h-1/6">
          <Carousel
            opts={{ align: "start" }}
            className="w-full max-w-3xl mx-auto"
          >
            <CarouselContent>
              {categories.map((category, index) => (
                <CarouselItem
                  key={index}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                >
                  <Link href={`/shop/${category}`} className="p-2">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center p-6">
                        <span className="text-base font-medium">
                          {category}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
