import axios from 'axios';
import React, { useEffect, useState } from 'react';


const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/101'); // Replace with your endpoint
                setProduct(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    console.log(product.imageUrl);
    return (
        <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-10">
            <img
                src="x`/image.png" // Adjust path as needed
                alt={product.name}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <p className="text-lg font-semibold text-gray-800 mt-4">
                    Price: ${product.price}
                </p>
                <p className="text-gray-600 mt-2">Stock: {product.stock}</p>
                <p className="text-gray-600 mt-2">Category ID: {product.category_id}</p>
                <p className="text-gray-500 text-sm mt-2">
                    Created At: {new Date(product.created_at).toLocaleString()}
                </p>
                <p className="text-gray-500 text-sm">
                    Updated At: {new Date(product.updated_at).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default ProductPage;
