import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '@/components/ui/button';


const Homepage = () => {
    const [newestProducts, setNewestProducts] = useState([]);
    const [cheapestProducts, setCheapestProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    

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

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">Newest Products</h1>
            <Slider {...sliderSettings} className='border border-black'>
                {newestProducts.map(product => (
                    <div key={product.id} className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-600">${product.price}</p>
                    </div>
                ))}
            </Slider>

            <h2 className="text-xl font-semibold mb-4 mt-8 text-center">Top Categories</h2>
            <Slider {...sliderSettings}>
                {categories.map(category => (
                    <div key={category.id} className="p-4 bg-gray-100 rounded hover:bg-gray-200 transition duration-200">
                        <h3 className="text-center">{category.name}</h3>
                    </div>
                ))}
            </Slider>

            <h1 className="text-2xl font-bold mb-4 mt-8">Cheapest Products</h1>
            <Slider {...sliderSettings}>
                {cheapestProducts.map(product => (
                    <div key={product.id} className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p className="text-gray-600">${product.price}</p>
                    </div>
                ))}
            </Slider>
            <Button variant=''>
                clock
            </Button>
        </div>
        
    );
};

export default Homepage;
