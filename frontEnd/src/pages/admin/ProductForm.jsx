// src/components/ProductForm.js
import axiosClient from '@/api/axiosClient';
import React from 'react';
import { useForm } from 'react-hook-form';
// import axiosClient from '../axiosClient'; // assuming you created this file

const ProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // If you're sending a file, use FormData
      const formData = new FormData();
      for (const key in data) {
        formData.append(key, data[key]);
      }

      await axiosClient.post('/products/', formData);

      reset(); // Clear form on success
      alert('Product created successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Create a New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.name && <p className="text-red-500 text-sm">Name is required.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register('description', { required: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">Description is required.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            step="0.01"
            id="price"
            {...register('price', { required: true, min: 0 })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.price && <p className="text-red-500 text-sm">Valid price is required.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
          <input
            type="number"
            id="stock"
            {...register('stock', { required: true, min: 0 })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.stock && <p className="text-red-500 text-sm">Valid stock is required.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="imageUrl"
            {...register('imageUrl', { required: true })}
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.imageUrl && <p className="text-red-500 text-sm">Image is required.</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category ID</label>
          <input
            type="number"
            id="categoryId"
            {...register('category_id', { required: true })}
            defaultValue={36}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.categoryId && <p className="text-red-500 text-sm">Category ID is required.</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-500 transition duration-200"
        >
          Create Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
