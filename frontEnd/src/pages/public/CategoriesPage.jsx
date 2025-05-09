import React, { useState, useEffect } from "react";
import CategoryCard from "@/components/PublicConponents/CategoryCard";
import axiosClient from "@/api/axiosClient";
import { ProductLoading } from "@/components/LoadingComponents/ProductLoading";
import { Link } from "react-router-dom";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Categories</h1>
        <p className="text-gray-600">
          Browse all available categories and discover products
        </p>
      </div>

      {/* Category Cards */}
      {loading ? (
        <ProductLoading />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category_id === category.id
            );
            const firstImage =
              categoryProducts.length > 0
                ? categoryProducts[0].imageUrl
                : "https://via.placeholder.com/150";

            return (
              <Link to={`/products?id=${category.id}`}>
              <CategoryCard
                key={category.id}
                category={category}
                productCount={category.products_count}
                imageUrl={firstImage}
                />
                </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
