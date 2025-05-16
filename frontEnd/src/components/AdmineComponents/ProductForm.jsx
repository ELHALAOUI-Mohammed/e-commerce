import axiosClient from '@/api/axiosClient';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        category_id: '',
    });

    const [imageFile, setImageFile] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axiosClient.get('/categories')
            .then(({ data }) => setCategories(data));

        if (id) {
            axiosClient.get(`/products/${id}`).then(({ data }) => {
                setFormData({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    category_id: data.category_id,
                });
            });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = new FormData();

        for (const key in formData) {
            payload.append(key, formData[key]);
        }

        if (imageFile) {
            payload.append('image', imageFile); // Laravel must accept 'image'
        }

        if (id) {
            await axiosClient.post(`/products/${id}?_method=PUT`, payload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        } else {
            await axiosClient.post('/products', payload, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
        }

        navigate('/admin/products');
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" encType='multipart/form-data'>
                <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Product' : 'Add Product'}</h2>

                {/* Name */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3"
                    />
                </div>

                {/* Description */}
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3"
                    />
                </div>

                {/* Price */}
                <div className="mb-4">
                    <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3"
                    />
                </div>

                {/* Stock */}
                <div className="mb-4">
                    <label htmlFor="stock" className="block text-gray-700 text-sm font-bold mb-2">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3"
                    />
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">Product Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={e => setImageFile(e.target.files[0])}
                        className="shadow border rounded w-full py-2 px-3"
                    />
                </div>

                {/* Category */}
                <div className="mb-4">
                    <label htmlFor="category_id" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3"
                    >
                        <option value="">-- Select Category --</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {id ? 'Update' : 'Create'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
