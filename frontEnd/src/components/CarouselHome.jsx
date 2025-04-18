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
                                <Card>
                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                        <h2 className="text-lg font-semibold">{item.name}</h2>
                                        {item.price && <p className="text-gray-600">${item.price}</p>}
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
