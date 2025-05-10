import React, { useState, useEffect } from "react";
import axiosClient from "@/api/axiosClient";
import { useAuth } from "@/context/AuthContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AiOutlineClear } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SearchBar from "@/components/PublicConponents/SearchBar";
import SortBy from "@/components/PublicConponents/SortBy";
import Cardd from "@/components/PublicConponents/Cardd";
import LoadingScreen from "@/components/LoadingComponents/Loading";
import { ProductLoading } from "@/components/LoadingComponents/ProductLoading";
import { MdClear } from "react-icons/md"
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosClient.get(`/categories`);
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/filtered-products`, {
          params: {
            page: currentPage,
            category_id: selectedCategory,
            search: query,
            sort: sortBy,
          },
        });
        setProducts(data.data);
        setLastPage(data.last_page);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(debounceTimer);
  }, [currentPage, selectedCategory, query, sortBy]);



  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Products</h1>
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {/* Category Filter */}
<div className="flex items-center gap-2 mb-6 w-full">
 

  {/* Categories Carousel (scrollable) */}
  <Carousel
    opts={{
      align: "start",
      dragFree: true,
    }}
    className="w-[calc(100%-40px)]" // Adjust width to account for clear button
  >
    <CarouselContent className="-ml-1">
      {categories.map((cat) => (
        <CarouselItem key={cat.id} className="basis-auto pl-1">
          <Button
            variant={selectedCategory === cat.id ? "default" : "outline"}
            size="sm"
            className="rounded-full whitespace-nowrap"
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentPage(1);
            }}
          >
            {cat.name}
          </Button>
        </CarouselItem>
      ))}
    </CarouselContent>
  </Carousel>

   {selectedCategory && (
    <div className="flex-shrink-0 animate-in fade-in slide-in-from-left-4 duration-200">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full bg-background hover:bg-accent group transition-all"
              onClick={() => {
                setSelectedCategory(null);
                setCurrentPage(1);
              }}
            >
              <AiOutlineClear className="h-4 w-4 text-muted-foreground group-hover:text-destructive group-hover:rotate-360 transition-all duration-600" />
              <span className="sr-only">Clear filter</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="text-xs font-medium">
            <p>Clear filter</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )}
</div>

      {/* Sort */}
      <div className="flex justify-end mb-6">
        <SortBy setSortBy={setSortBy} sortBy={sortBy}/>
      </div>

      {/* Loading state */}
      {loading ? (
        <ProductLoading/>
      ) : products.length > 0 ? (
        <>
          {/* Product Grid */}
          <div className="min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {products.map((product) => (
              <Cardd key={product?.id} product={product} />
            ))}
          </div>
          </div>

          {/* Pagination */}
      <div className="flex justify-center mt-8">
  <Pagination>
    <PaginationContent className="flex-wrap gap-1">
      {/* Previous Button */}
      {currentPage > 1 && (
        <PaginationItem>
          <PaginationPrevious 
            className="h-10 w-10 rounded-lg border border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
            onClick={() => setCurrentPage(currentPage - 1)}
          />
        </PaginationItem>
      )}

      {/* Page Numbers */}
      {Array.from({ length: Math.min(5, lastPage) }, (_, i) => {
        // Show first, last, and surrounding pages
        let pageNum;
        if (lastPage <= 5) {
          pageNum = i + 1;
        } else if (currentPage <= 3) {
          pageNum = i + 1;
        } else if (currentPage >= lastPage - 2) {
          pageNum = lastPage - 4 + i;
        } else {
          pageNum = currentPage - 2 + i;
        }

        return (
          <PaginationItem key={pageNum}>
            <PaginationLink
              className={`h-10 w-10 rounded-lg border transition-colors ${
                currentPage === pageNum
                  ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                  : 'border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800'
              }`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </PaginationLink>
          </PaginationItem>
        );
      })}

      {/* Ellipsis for many pages */}
      {lastPage > 5 && currentPage < lastPage - 2 && (
        <PaginationItem>
          <span className="h-10 w-10 flex items-center justify-center">...</span>
        </PaginationItem>
      )}

      {/* Last Page */}
      {lastPage > 5 && currentPage < lastPage - 2 && (
        <PaginationItem>
          <PaginationLink
            className={`h-10 w-10 rounded-lg border transition-colors ${
              currentPage === lastPage
                ? 'bg-primary text-primary-foreground border-primary hover:bg-primary/90'
                : 'border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800'
            }`}
            onClick={() => setCurrentPage(lastPage)}
          >
            {lastPage}
          </PaginationLink>
        </PaginationItem>
      )}

      {/* Next Button */}
      {currentPage < lastPage && (
        <PaginationItem>
          <PaginationNext
            className="h-10 w-10 rounded-lg border border-gray-200 hover:bg-gray-100 dark:border-gray-800 dark:hover:bg-gray-800"
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        </PaginationItem>
      )}
    </PaginationContent>
  </Pagination>
</div>
        </>
      ) : (
 <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
  <div className="mx-auto max-w-md space-y-4">
    {/* Icon */}
    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-8 w-8 text-gray-400 dark:text-gray-500"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12h8" />
      </svg>
    </div>

    {/* Text */}
    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
      No products available
    </h3>
    <p className="text-gray-500 dark:text-gray-400">
      We couldn't find any products matching your criteria.
    </p>


  </div>
</div>
      )}
 </div>
);
}
