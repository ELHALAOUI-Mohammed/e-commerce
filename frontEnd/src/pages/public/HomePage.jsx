import React, { useEffect, useState } from 'react';
import CarouselHome from '../../components/PublicConponents/CarouselHome';
import ImageDisplay from '../../components/PublicConponents/ImageDisplay';
import Hero from '@/components/PublicConponents/Hero';
import axiosClient from '@/api/axiosClient';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [newestProducts, setNewestProducts] = useState([]);
  const [cheapestProducts, setCheapestProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
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

  // Render functions
  const renderProductItem = (item) => (
    <div className="p-2">
      <Link to={`/product/${item.id}`}>
        <Card className="shadow-lg rounded-xl overflow-hidden hover:shadow-xl">
          <CardContent className="flex flex-col items-center p-5">
            <img
              src={item.image || "/image.png"}
              alt={item.name}
              className="w-full h-52 object-cover mb-4 rounded-lg"
            />
            <h2 className="text-lg font-semibold text-gray-800 text-center mb-2 line-clamp-2">
              {item.name}
            </h2>
            {item.price && (
              <p className="text-gray-700 text-center text-lg font-bold">
                ${item.price}
              </p>
            )}
          </CardContent>
        </Card>
      </Link>
    </div>
  );

  const renderCategoryItem = (item) => (
    <div className="p-2">
<Link to={`/products?id=${item.id}`}>
        <Card className="shadow-md rounded-xl overflow-hidden hover:shadow-lg">
          <CardContent className="flex flex-col items-center p-4">
            <img
              src={item.image || "/category.png"}
              alt={item.name}
              className="w-full h-40 object-cover mb-2 rounded-md"
            />
            <h2 className="text-lg font-semibold text-gray-800 text-center line-clamp-2">
              {item.name}
            </h2>
          </CardContent>
        </Card>
      </Link>
    </div>
  );

  return (
    <div>
      <Hero />

      <CarouselHome
        title="Newest Products"
        items={newestProducts}
        loading={loading}
        renderItem={renderProductItem}
      />
      <CarouselHome
        title="Categories"
        items={categories}
        loading={loading}
        renderItem={renderCategoryItem}
      />
      <CarouselHome
        title="Cheapest Products"
        items={cheapestProducts}
        loading={loading}
        renderItem={renderProductItem}
      />
    </div>
  );
};

export default Homepage;
