import React, { useState, useEffect } from "react";
import CategoryCard from "@/components/PublicConponents/CategoryCard";
import { Skeleton } from "@/components/ui/skeleton";
import axiosClient from "@/api/axiosClient";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          axiosClient.get("/products"),
          axiosClient.get("/categories"),
        ]);

        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
        {[...Array(4)].map((_, idx) => (
          <Skeleton key={idx} className="h-40 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-gray-600">Browse all available categories and discover products</p>
      </div>

      {/* Category Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => {
          const categoryProducts = products.filter(
            (product) => product.category_id === category.id
          );
          const firstImage = categoryProducts.length > 0
            ? categoryProducts[0].imageUrl
            : "https://via.placeholder.com/150";

          return (
            <CategoryCard
              key={category.id}
              category={category}
              productCount={categoryProducts.length}
              imageUrl={firstImage}
            />
          );
        })}
      </div>
    </div>
  );
}
