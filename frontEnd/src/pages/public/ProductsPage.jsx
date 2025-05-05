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
import { MdClear } from "react-icons/md";
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
      <div className="flex">
        <div className="flex gap-4 mb-6 overflow-x-auto ml-5 pl-2">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setCurrentPage(1);
              }}
              className={`flex flex-col items-center p-3 border rounded-3xl cursor-pointer min-w-[80px] ${
                selectedCategory === cat.id ? "bg-gray-200" : "bg-white"
              } hover:bg-gray-100`}
            >
              <p className="text-xs text-center">{cat.name}</p>
            </div>
          ))}
        </div>

        {selectedCategory && (
          <div className="pl-5 pt-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setCurrentPage(1);
                    }}
                  >
                    <MdClear />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear filter</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>

      {/* Sort */}
      <div className="flex justify-end mb-6">
        <SortBy setSortBy={setSortBy} />
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
              <PaginationContent>
                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationPrevious onClick={() => setCurrentPage(currentPage - 1)} />
                  </PaginationItem>
                )}

                {Array.from({ length: lastPage }, (_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {currentPage < lastPage && (
                  <PaginationItem>
                    <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg">No products available</p>
        </div>
      )}
    </div>
  );
}
