// CarouselHome.jsx
import React from 'react';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from '@/components/ui/card';
// import LoadingScreen from '../LoadingComponents/Loading';
import { HomeLoading } from '../LoadingComponents/HomeLoading';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';




const CarouselHome = ({ title, items, loading }) => {
  const { user } = useAuth();
const url = (id) => user?.role === 'customer' 
        ? `/customer/product/${id}` 
        : `/product/${id}`;
    return (
 <div className="container mx-auto px-4 py-12">
  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{title}</h1>
  <Carousel 
    opts={{ align: "start" }} 
    className="w-full relative group"
  >
    <CarouselContent className="-ml-1">
      {!loading ? items.map(item => (
        <CarouselItem 
          key={item.id} 
          className="pl-1 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
        >
          <div className="p-1">
            <Link  to={url(item.id)}>
            <Card className="shadow-sm dark:shadow-none rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md dark:hover:bg-gray-800/50 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700">
              <CardContent className="flex flex-col items-center p-6">
                <div className="relative w-full aspect-square mb-4 overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
                  <img
                    src={item?.imageUrl  
  ? `http://localhost:8000${item?.imageUrl}` 
  : "/image.png"}
                    alt="Product Image"
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                  />
                  
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2 line-clamp-2">
                  {item.name}
                </h2>
                {item.price && (
                  <p className="text-gray-900 dark:text-white text-center text-lg font-bold">
                    ${item.price}
                  </p>
                )}
              </CardContent>
            </Card>
            </Link>
          </div>
        </CarouselItem>
      )) : <HomeLoading/>}
    </CarouselContent>
    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hidden group-hover:flex" />
    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 hidden group-hover:flex" />
  </Carousel>
</div>
    );
};

export default CarouselHome;
