  import axiosClient from "@/api/axiosClient";
  import { useEffect, useState } from "react";
  import { useParams, useNavigate, useLocation } from "react-router-dom";

  export default function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const passedProduct = location.state?.product;

    const [product, setProduct] = useState({
      name: passedProduct?.name || "",
      price: passedProduct?.price?.toString() || "",
      stock: passedProduct?.stock?.toString() || "",
      category_id: passedProduct?.category_id?.toString() || ""
    });

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(!passedProduct);

    useEffect(() => {
      if (!passedProduct) {
        axiosClient.get(`/products/${id}`).then(({ data }) => {
          setProduct({
            name: data.name || "",
            price: data.price?.toString() || "",
            stock: data.stock?.toString() || "",
            category_id: data.category_id?.toString() || "",
          });
          setLoading(false);
        });
      } else {
        setLoading(false);
      }

      axiosClient.get("/categories").then(({ data }) => setCategories(data));
    }, [id, passedProduct]);

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!product.name || !product.price || !product.stock || !product.category_id) {
        alert("Please fill in all fields.");
        return;
      }

      const updatedProduct = {
        name: product.name.trim(),
        price: parseFloat(product.price),
        stock: parseInt(product.stock),
        category_id: parseInt(product.category_id),
      };

      if (
        !updatedProduct.name ||
        isNaN(updatedProduct.price) ||
        isNaN(updatedProduct.stock) ||
        isNaN(updatedProduct.category_id)
      ) {
        alert("Invalid input values.");
        return;
      }

      console.log("Submitting product:", updatedProduct);

      axiosClient
        .put(`/products/${id}`, updatedProduct, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
        .then(() => navigate("/admin/products"))
        .catch((err) => {
          const errorMsg = err.response?.data?.errors;
          console.error("Validation Errors:", errorMsg);
          alert("Error: " + JSON.stringify(errorMsg));
        });
    };

    if (loading) {
      return <div className="text-center py-6 text-gray-500">Loading product...</div>;
    }

    return (
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 max-w-md mx-auto bg-white rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>

        <div className="space-y-2">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            id="productName"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            id="productPrice"
            type="number"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
            Stock
          </label>
          <input
            id="productStock"
            type="number"
            value={product.stock}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="productCategory"
            value={product.category_id}
            onChange={(e) => setProduct({ ...product, category_id: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    );
  }
