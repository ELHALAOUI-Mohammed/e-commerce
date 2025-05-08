import axiosClient from "@/api/axiosClient";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCategory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({ name: "", description: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/categories/${id}`);
      console.log("Category fetched:", res.data);
      setCategory({
        name: res.data.name || "",
        description: res.data.description || "",
      });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    console.log("Category to update:", category);

    axiosClient
      .put(`/categories/${id}`, category)
      .then(() => {
        navigate("/admin/categories");
      })
      .catch((err) => {
        if (err.response && err.response.status === 422) {
          setErrors(err.response.data.errors);
        } else {
          alert("Unexpected error occurred.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-6 max-w-lg mx-auto bg-white shadow rounded"
    >
      <h1 className="text-2xl font-bold">Edit Category</h1>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Name</label>
        <input
          value={category.name}
          onChange={(e) => setCategory({ ...category, name: e.target.value })}
          placeholder="Category Name"
          className="w-full border p-2 rounded"
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name[0]}</p>}
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={category.description}
          onChange={(e) =>
            setCategory({ ...category, description: e.target.value })
          }
          placeholder="Optional description"
          className="w-full border p-2 rounded"
          rows={4}
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded ${
          loading ? "cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
  </form>
);
}
