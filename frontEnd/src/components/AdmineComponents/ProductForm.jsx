import axiosClient from '@/api/axiosClient';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', price: '' });

    useEffect(() => {
        if (id) {
            axiosClient.get(`/products/${id}`).then(({ data }) => {
                setFormData({ name: data.name, price: data.price });
            });
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (id) {
            await axiosClient.put(`/products/${id}`, formData);
        } else {
            await axiosClient.post('/products', formData);
        }
        navigate('/admin/products');
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4">{id ? 'Edit Product' : 'Add Product'}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="productName"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter product name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
                        Price
                    </label>
                    <input
                        type="number"
                        id="productPrice"
                        value={formData.price}
                        onChange={e => setFormData({ ...formData, price: e.target.value })}
                        placeholder="Enter product price"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        {id ? 'Update' : 'Create'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/products')}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
