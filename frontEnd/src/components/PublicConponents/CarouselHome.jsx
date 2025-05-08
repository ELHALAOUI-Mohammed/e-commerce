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

const CarouselHome = ({ title, items, loading }) => {
    return (
      <div className="container mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
      <Carousel opts={{ align: "start" }} className="w-full relative group">
        <CarouselContent>
          {!loading ? items.map(item => (
            <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-2">
                <Card className="shadow-lg rounded-xl overflow-hidden transition-all duration-200 hover:shadow-xl">
                  <CardContent className="flex flex-col items-center p-5">
                    <img
                      src="/image.png"
                      alt="Product Image"
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
              </div>
            </CarouselItem>
          )) : <HomeLoading/>}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50" />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-50" />
      </Carousel>
    </div>
    );
};

export default CarouselHome;
