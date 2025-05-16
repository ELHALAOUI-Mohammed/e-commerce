// CategoryCarousel.jsx
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { HomeLoading } from '../LoadingComponents/HomeLoading';

const CategoryCarousel = ({ title, categories, loading }) => {
  const { user } = useAuth();

  const url = (id) =>
    user?.role === 'customer'
      ? `/customer/products?id=${id}`
      : `/products?id=${id}`;

  return (
   <div className="container mx-auto px-4 py-12">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
    {title}
  </h1>
  <Carousel opts={{ align: "start" }} className="w-full relative group">
    <CarouselContent className="-ml-1">
      {!loading ? (
        categories.map((category) => (
          <CarouselItem
            key={category.id}
            className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/5"
          >
            <div className="p-2">
              <Link to={url(category.id)}>
                <Card className="shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800">
                  <CardContent className="flex flex-col items-center p-4">
                    <div className="relative w-full h-40 overflow-hidden rounded-md mb-2">
                      <img
                        src={category.image || "/category.png"}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center line-clamp-2">
                      {category.name}
                    </h2>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CarouselItem>
        ))
      ) : (
        <HomeLoading/>
      )}
    </CarouselContent>
    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hidden group-hover:flex transition-opacity duration-300" />
    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hidden group-hover:flex transition-opacity duration-300" />
  </Carousel>
</div>
  );
};

export default CategoryCarousel;
