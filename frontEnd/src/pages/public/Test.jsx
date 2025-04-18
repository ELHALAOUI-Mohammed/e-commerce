// // src/components/Test.jsx

// import React, { useRef } from 'react';

// const Test = () => {
//     // Expanded sample data for demonstration
//     const newestProducts = [
//         { id: 1, name: 'Product 1', img: 'https://via.placeholder.com/150' },
//         { id: 2, name: 'Product 2', img: 'https://via.placeholder.com/150' },
//         { id: 3, name: 'Product 3', img: 'https://via.placeholder.com/150' },
//         { id: 4, name: 'Product 4', img: 'https://via.placeholder.com/150' },
//         { id: 5, name: 'Product 5', img: 'https://via.placeholder.com/150' },
//         { id: 6, name: 'Product 6', img: 'https://via.placeholder.com/150' },
//         { id: 7, name: 'Product 7', img: 'https://via.placeholder.com/150' },
//         { id: 8, name: 'Product 8', img: 'https://via.placeholder.com/150' },
//         { id: 9, name: 'Product 9', img: 'https://via.placeholder.com/150' },
//         { id: 10, name: 'Product 10', img: 'https://via.placeholder.com/150' },
//     ];

//     const categories = [
//         { id: 1, name: 'Category 1' },
//         { id: 2, name: 'Category 2' },
//         { id: 3, name: 'Category 3' },
//         { id: 4, name: 'Category 4' },
//         { id: 5, name: 'Category 5' },
//         { id: 6, name: 'Category 6' },
//         { id: 7, name: 'Category 7' },
//         { id: 8, name: 'Category 8' },
//     ];

//     const cheapestProducts = [
//         { id: 1, name: 'Cheap Product 1', img: 'https://via.placeholder.com/150' },
//         { id: 2, name: 'Cheap Product 2', img: 'https://via.placeholder.com/150' },
//         { id: 3, name: 'Cheap Product 3', img: 'https://via.placeholder.com/150' },
//         { id: 4, name: 'Cheap Product 4', img: 'https://via.placeholder.com/150' },
//         { id: 5, name: 'Cheap Product 5', img: 'https://via.placeholder.com/150' },
//         { id: 6, name: 'Cheap Product 6', img: 'https://via.placeholder.com/150' },
//         { id: 7, name: 'Cheap Product 7', img: 'https://via.placeholder.com/150' },
//         { id: 8, name: 'Cheap Product 8', img: 'https://via.placeholder.com/150' },
//         { id: 9, name: 'Cheap Product 9', img: 'https://via.placeholder.com/150' },
//         { id: 10, name: 'Cheap Product 10', img: 'https://via.placeholder.com/150' },
//     ];

//     // Refs for scrolling
//     const newestRef = useRef(null);
//     const categoriesRef = useRef(null);
//     const cheapestRef = useRef(null);

//     const scroll = (ref, direction) => {
//         const scrollAmount = 300; // Change this value for more or less scroll
//         if (ref.current) {
//             ref.current.scrollBy({
//                 top: 0,
//                 left: direction === 'left' ? -scrollAmount : scrollAmount,
//                 behavior: 'smooth',
//             });
//         }
//     };

//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">Newest Products</h2>
//             <div className="flex items-center space-x-2">
//                 <button onClick={() => scroll(newestRef, 'left')} className="bg-gray-300 p-2 rounded">←</button>
//                 <div ref={newestRef} className="flex overflow-x-scroll space-x-4 scrollbar-hide">
//                     {newestProducts.map(product => (
//                         <div key={product.id} className="min-w-[150px] bg-white rounded shadow p-2">
//                             <img src={product.img} alt={product.name} className="w-full h-32 object-cover rounded" />
//                             <h3 className="text-center">{product.name}</h3>
//                         </div>
//                     ))}
//                 </div>
//                 <button onClick={() => scroll(newestRef, 'right')} className="bg-gray-300 p-2 rounded">→</button>
//             </div>

//             <h2 className="text-2xl font-bold mb-4 mt-8">Categories</h2>
//             <div className="flex items-center space-x-2">
//                 <button onClick={() => scroll(categoriesRef, 'left')} className="bg-gray-300 p-2 rounded">←</button>
//                 <div ref={categoriesRef} className="flex overflow-x-scroll space-x-4 scrollbar-hide">
//                     {categories.map(category => (
//                         <div key={category.id} className="min-w-[100px] bg-white rounded shadow p-2">
//                             <h3 className="text-center">{category.name}</h3>
//                         </div>
//                     ))}
//                 </div>
//                 <button onClick={() => scroll(categoriesRef, 'right')} className="bg-gray-300 p-2 rounded">→</button>
//             </div>

//             <h2 className="text-2xl font-bold mb-4 mt-8">Cheapest Products</h2>
//             <div className="flex items-center space-x-2">
//                 <button onClick={() => scroll(cheapestRef, 'left')} className="bg-gray-300 p-2 rounded">←</button>
//                 <div ref={cheapestRef} className="flex overflow-x-scroll space-x-4 scrollbar-hide">
//                     {cheapestProducts.map(product => (
//                         <div key={product.id} className="min-w-[150px] bg-white rounded shadow p-2">
//                             <img src={product.img} alt={product.name} className="w-full h-32 object-cover rounded" />
//                             <h3 className="text-center">{product.name}</h3>
//                         </div>
//                     ))}
//                 </div>
//                 <button onClick={() => scroll(cheapestRef, 'right')} className="bg-gray-300 p-2 rounded">→</button>
//             </div>
//         </div>
//     );
// };

// export default Homepage;
