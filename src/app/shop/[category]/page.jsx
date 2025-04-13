"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { getFilteredProducts } from "@/lib/getProducts";
import ProductCard from "@/components/ProductCard";
import Filters from "@/components/Filters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

const PRODUCTS_PER_PAGE = 4;

function CategoryContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const category = params.category || "All";
  const maxPrice = Number(searchParams.get("maxPrice")) || 5000;

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await getFilteredProducts(category, maxPrice);
      setProducts(result);
      setPage(1); // сброс страницы при фильтрации
    };

    fetchProducts();
  }, [category, maxPrice]);

  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row">
      <div className="w-full md:w-1/4 md:pr-6">
        <Filters currentCategory={category} />
      </div>

      <div className="flex flex-col w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination className="mt-10">
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage((prev) => prev - 1)}
                  />
                </PaginationItem>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={page === index + 1}
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setPage((prev) => prev + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <CategoryContent />
    </Suspense>
  );
}
