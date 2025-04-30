import { FaTshirt, FaShoePrints, FaHatCowboy, FaBelt } from 'react-icons/fa';
import React from 'react';

export const categories = [
  { id: 1, name: 'Clothing', icon: <FaTshirt /> },
  { id: 2, name: 'Footwear', icon: <FaShoePrints /> },
  { id: 3, name: 'Accessories', icon: <FaHatCowboy /> },
  { id: 4, name: 'Belts', icon: <FaBelt /> },
];

const CategoryCard = ({ category, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(category.name)}
      className="flex flex-col items-center justify-center p-4 border rounded-md shadow-sm hover:bg-gray-100 cursor-pointer w-24"
    >
      <p className="text-sm text-center">{category.name}</p>
    </div>
  );
};

export default CategoryCard;
