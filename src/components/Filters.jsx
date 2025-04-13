"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import categories from "@/data/categories";

export default function Filters({
  currentCategory,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [price, setPrice] = useState(5000);
  const [selectedCategory, setSelectedCategory] = useState(
    currentCategory || "All"
  );

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    router.push(value === "All" ? "/shop" : `/shop/${value}`);
  };

  useEffect(() => {
    const query =
      selectedCategory === "All"
        ? `/shop?maxPrice=${price}`
        : `/shop/${selectedCategory}?maxPrice=${price}`;
    router.push(query);
  }, [price]);

  const FilterUI = (
    <div>
      <h2 className="text-xl font-semibold mb-4">Filters</h2>

      {/* Категории */}
      <div className="border p-4 rounded mb-4">
        <h3 className="font-semibold mb-2">Categories</h3>
        <Select onValueChange={handleCategoryChange} value={selectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category, i) => (
              <SelectItem key={i} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Цена */}
      <div className="border p-4 rounded mb-4">
        <h3 className="font-semibold mb-2">Price</h3>
        <Slider
          defaultValue={[price]}
          max={5000}
          step={10}
          className="w-full"
          onValueChange={(value) => setPrice(value[0])}
        />
        <p className="text-sm text-gray-500 mt-2">Max price: ${price}</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Мобильный фильтр через Drawer */}
      <div className="md:hidden mb-4">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="w-full flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 py-2">{FilterUI}</div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Десктоп-фильтры */}
      <div className="hidden md:block">{FilterUI}</div>
    </>
  );
}
