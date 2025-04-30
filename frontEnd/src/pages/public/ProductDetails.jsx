import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // ✅ Use from react-router-dom
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";

export default function ProductDetails() {
  const { id: productId } = useParams(); // ✅ Access route param directly

  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          fetch(`http://localhost:8000/api/products/${productId}`),
          fetch("http://localhost:8000/api/categories"),
        ]);

        const productData = await productRes.json();
        const categoriesData = await categoryRes.json();

        setProduct(productData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
      }
    };

    if (productId) fetchData();
  }, [productId]);

  const handleAddToCart = async () => {
    alert("Added to cart!");
  };

  const handleAddToFavorites = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product_id: product.id, user_id: 1 }),
      });

      if (!res.ok) throw new Error("Failed to add favorite");
      alert("Added to favorites!");
    } catch (err) {
      console.error(err);
    }
  };

  const getCategoryName = () => {
    const category = categories.find((cat) => cat.id === product?.category_id);
    return category ? category.name : "Unknown";
  };

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (!product) return <div className="p-4 text-center">Product not found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-2xl object-cover w-full"
        />


          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{product.name}</h2>
            <p className="text-muted-foreground">Category: {getCategoryName()}</p>
            <p className="text-xl font-semibold text-green-600">${product.price}</p>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-medium">
              Stock:{" "}
              {product.stock > 0 ? (
                <span className="text-green-600">In Stock</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>

            <div className="flex gap-4 pt-4">
              <Button onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline" onClick={handleAddToFavorites}>
                <Heart className="mr-2 h-4 w-4" /> Favorite
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
