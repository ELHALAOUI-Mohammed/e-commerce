import { useEffect, useState } from 'react';
import axiosClient from '@/api/axiosClient';
import CategoryForm from './CategoryForm';
import { Link, useNavigate } from 'react-router-dom';

export default function CategoriesTable() {
    const [categories, setCategories] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await axiosClient.get('/categories');
            setCategories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCategory = async (id) => {
        if (confirm('Delete category?')) {
            await axiosClient.delete(`/categories/${id}`);
            fetchCategories();
        }
    };

    const handleEdit = (category) => {
        setSelectedCategory(category);
        setShowForm(true);
    };

    const handleAdd = () => {
        setSelectedCategory(null);
        setShowForm(true);
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setSelectedCategory(null);
        fetchCategories();
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <button className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <Link to="/admin/categories/add">Add Category</Link>
            </button>

            {showForm && (
                <CategoryForm
                    category={selectedCategory}
                    onSuccess={handleFormSuccess}
                    onCancel={() => setShowForm(false)}
                />
            )}

            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Description</th>
                        {/* <th className="py-2 px-4 border-b">Products Count</th> */}
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category.id} className="hover:bg-gray-100">
                             <td className="py-2 px-4 border-b">{category.id}</td>
                            <td className="py-2 px-4 border-b">{category.name}</td>
                            <td className="py-2 px-4 border-b">{category.description}</td>
                            {/* <td className="py-2 px-4 border-b">{categoryProducts.length}</td> */}
                            <td className="py-2 px-4 border-b">
                                <button 
                                    className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                    onClick={() => handleEdit(category)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    onClick={() => deleteCategory(category.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
