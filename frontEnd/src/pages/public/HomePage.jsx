// Homepage.jsx
import React, { useEffect, useState } from 'react';
import CarouselHome from '../../components/PublicConponents/CarouselHome'; // Adjust the path as necessary
import ImageDisplay from '../../components/PublicConponents/ImageDisplay';
import Hero from '@/components/PublicConponents/Hero';
import axiosClient from '@/api/axiosClient';

const Homepage = () => {
    const [newestProducts, setNewestProducts] = useState([]);
    const [cheapestProducts, setCheapestProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const newestResponse = await axiosClient.get('/products/newest');
                const cheapestResponse = await axiosClient.get('/products/cheapest');
                const response = await axiosClient.get('/categories/top');
                
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
