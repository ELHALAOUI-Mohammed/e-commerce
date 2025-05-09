import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axiosClient from "@/api/axiosClient";
import { useNavigate } from "react-router-dom";

export default function CategoryForm({ onSubmitSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const navigate = useNavigate();  // Using the useNavigate hook

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
      await axiosClient.post('/categories', formData);
      if (onSubmitSuccess) onSubmitSuccess();
      navigate('/admin/categories');  // Navigate after successful submission
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add a New Category</h2>
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
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
