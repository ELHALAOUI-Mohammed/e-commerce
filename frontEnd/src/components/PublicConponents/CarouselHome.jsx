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

const CarouselHome = ({ title, items }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4">{title}</h1>
            <Carousel opts={{ align: "start" }} className="w-full">
                <CarouselContent>
                    {items.map(item => (
                        <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                            <Card className="shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                              <img
                                src="/image.png"
                                alt="Product Image"
                                className="w-full h-48 object-cover mb-4 rounded-md" // Image styling
                              />
                              <h2 className="text-lg font-semibold text-center mb-2">{item.name}</h2>
                              {item.price && (
                                <p className="text-gray-600 text-center text-lg font-medium">${item.price}</p>
                              )}
                             </CardContent>
                            </Card>

                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CarouselHome;
