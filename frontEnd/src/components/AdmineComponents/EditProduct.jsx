import axiosClient from "@/api/axiosClient";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: ""
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axiosClient.get(`/products/${id}`).then(({ data }) => setProduct(data));
    axiosClient.get("/categories").then(({ data }) => setCategories(data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProduct = {
      name: product.name,
      price: parseFloat(product.price),
      stock: parseInt(product.stock),
      category_id: parseInt(product.category_id),
    };

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
        console.log("Validation Errors:", err.response?.data?.errors);
        alert("Error: " + JSON.stringify(err.response?.data?.errors));
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Product</h1>

      <div className="space-y-2">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          id="productName"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Enter product name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          id="productPrice"
          value={product.price}
          type="number"
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Enter price"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
          Stock
        </label>
        <input
          id="productStock"
          value={product.stock}
          type="number"
          onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          placeholder="Enter stock quantity"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Save Changes
      </button>
    </form>
  );
}
