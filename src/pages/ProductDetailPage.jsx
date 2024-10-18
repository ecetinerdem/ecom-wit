import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../data/productsData';

const ProductDetailPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const product = products.find((p) => p.id === parseInt(id)); // Find the matching product

  if (!product) {
    return <p>Product not found!</p>;
  }

  return (
    <div className="w-full mt-4 flex flex-col justify-center items-center">
      <img 
        src={product.imageUrl} 
        alt={product.title} 
        className="w-full h-98 object-cover mb-4 md:h-85" 
      />
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-xl">{product.department}</p>
      <div className="flex justify-center gap-4 mt-4">
        <span className="line-through text-[#BDBDBD]">${product.price}</span>
        <span className="text-[#23856D]">${product.salePrice}</span>
      </div>
      {/* Color options */}
      <div className="mt-4 flex justify-center space-x-2">
        {product.colors.map((color, index) => (
          <div
            key={index}
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
