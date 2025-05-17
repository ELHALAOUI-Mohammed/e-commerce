import React, { useEffect, useState } from 'react';
import CarouselHome from '../../components/PublicConponents/CarouselHome';
import CategoryCarousel from '../../components/PublicConponents/CategoryCarousel';
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

  return (
    <div>
      <Hero />
      <CategoryCarousel
        title="Parcourir par catégorie"
        categories={categories}
        loading={loading}
      />

      <CarouselHome
        title="Nouveaux produits"
        items={newestProducts}
        loading={loading}
      />

      <CarouselHome
        title="Produits les moins chers"
        items={cheapestProducts}
        loading={loading}
      />

    </div>
  );
};

export default Homepage;
