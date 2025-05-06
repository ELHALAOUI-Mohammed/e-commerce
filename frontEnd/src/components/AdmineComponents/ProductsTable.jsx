import { useEffect, useState } from 'react';
import axiosClient from '@/api/axiosClient';
import ProductForm from './ProductForm';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductsTable() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const response = await axiosClient.get('/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id) => {
        if (confirm('Are you sure?')) {
            await axiosClient.delete(`/products/${id}`);
            fetchProducts();
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedProduct(null);
        fetchProducts();
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Products</h2>
            <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link to="/admin/products/add">Add Product</Link>
            </button>

            {showForm && (
                <ProductForm
                    product={selectedProduct}
                    onSuccess={handleFormSuccess}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {loading ? (
                <p className="text-center">Loading...</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        <th className="py-2 px-4 border-b">Price</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                        <th className="py-2 px-4 border-b">Category </th>
                        <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{product.id}</td>
                            <td className="py-2 px-4 border-b">{product.name}</td>
                            <td className="py-2 px-4 border-b">{product.description}</td>
                            <td className="py-2 px-4 border-b">{product.price}</td>
                            <td className="py-2 px-4 border-b">{product.stock}</td>
                            <td className="py-2 px-4 border-b">{product.category?.name || 'No Category'}</td>
                                <td className="py-2 px-4 border-b">
                                    <button 
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                        onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        onClick={() => deleteProduct(product.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
