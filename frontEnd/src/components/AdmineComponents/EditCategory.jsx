import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axiosClient from "@/api/axiosClient";

export default function EditCategory() {
  const { id } = useParams();  // Get category ID from the URL
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const navigate = useNavigate();  // Hook for navigation

  useEffect(() => {
    // Fetch the category details when the component mounts
    const fetchCategory = async () => {
      try {
        const response = await axiosClient.get(`/categories/${id}`);
        setFormData(response.data);  // Set the form data with the fetched category details
      } catch (err) {
        console.error("Error fetching category", err);
      }
    };
    fetchCategory();
  }, [id]);  // Only re-run the effect when the ID changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(`/categories/${id}`, formData);  // Send the updated data
      navigate('/admin/categories');  // Navigate back to the categories page after update
    } catch (err) {
      console.error("Error updating category", err);
    }
  };
console.log(formData);  // Log the form data before sending it

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Edit Category</h2>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter category name"
          required
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter category description"
          required
          className="mt-1"
        />
      </div>
      <div className="flex justify-end space-x-2 pt-2">
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
}
