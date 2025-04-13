"use client";
import slides from "@/data/slides";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function SlidesCarousel() {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <Carousel className="relative w-full" opts={{ align: "start" }}>
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="pb-2 pt-2 md:pr-5 pl-5">
              <div className="relative w-full min-h-[300px] sm:min-h-[300px] flex flex-col sm:flex-row items-center justify-between p-6 rounded-lg overflow-hidden gap-4 bg-black text-white">
                <div className="z-10 space-y-2 sm:space-y-3 text-center sm:text-left flex-1">
                  <h3 className="text-sm flex items-center justify-center sm:justify-start gap-1">
                    
                    {slide.title}
                  </h3>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {slide.discount}
                  </h2>
                  <Link
                    href="/shop"
                    className="inline-block text-white border border-white px-4 py-1.5 rounded hover:bg-white hover:text-black transition"
                  >
                    Shop Now →
                  </Link>
                </div>

                <div className="w-[150px] sm:w-[200px] flex-shrink-0">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={200}
                    height={200}
                    className="w-full h-[150px] sm:h-[200px] object-contain"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute top-1/2 -translate-y-1/2 -left-8 z-20 bg-white text-black hover:bg-gray-200 hidden sm:flex" />
        <CarouselNext className="absolute top-1/2 -translate-y-1/2 -right-8 z-20 bg-white text-black hover:bg-gray-200 hidden sm:flex" />
      </Carousel>
    </div>
  );
}
