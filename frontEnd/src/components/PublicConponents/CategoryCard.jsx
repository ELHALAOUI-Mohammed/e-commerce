import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoryCard({ category, productCount, imageUrl }) {
    

  return (
    <Card className="cursor-pointer hover:shadow-lg transition">
      <CardHeader>
        <img
          src={imageUrl || `/category.png`} 
          alt={category.name}
          className="w-full h-32 object-cover rounded-lg"
        />
      </CardHeader>
      <CardContent className="text-center"> 
        <CardTitle className="text-lg">{category.name}</CardTitle>
        <p className="text-sm text-gray-500">{productCount} produits</p>
      </CardContent>
    </Card>
  );
}
