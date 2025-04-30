// Homepage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CarouselHome from '../../components/PublicConponents/CarouselHome'; // Adjust the path as necessary
import ImageDisplay from '../../components/PublicConponents/ImageDisplay';
import Hero from '@/components/PublicConponents/Hero';

const Homepage = () => {
    const [newestProducts, setNewestProducts] = useState([]);
    const [cheapestProducts, setCheapestProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const newestResponse = await axios.get('http://localhost:8000/api/products/newest');
                const cheapestResponse = await axios.get('http://localhost:8000/api/products/cheapest');
                const response = await axios.get('http://localhost:8000/api/categories/top');
                
                setCategories(response.data);
                setNewestProducts(newestResponse.data);
                setCheapestProducts(cheapestResponse.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg font-semibold">Loading...</div>
            </div>
        );
    }

    return (
        <div>
            <Hero/>
            
            <CarouselHome 
                title="Newest Products" 
                items={newestProducts} 
                
            />
            <CarouselHome 
                title="Categories" 
                items={categories} 
            />
            <CarouselHome 
                title="Cheapest Products" 
                items={cheapestProducts} 
            />
        </div>
    );
};

export default Homepage;
