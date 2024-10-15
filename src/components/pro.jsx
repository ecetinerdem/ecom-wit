import React from 'react';
import ProductOne from '../assets/images/productOne.jpeg';
import ProductTwo from '../assets/images/productTwo.jpeg';
import ProductThree from '../assets/images/productThree.jpeg';
import ProductFour from '../assets/images/productFour.jpeg';
import ProductFive from '../assets/images/productFive.jpeg';
import ProductSix from '../assets/images/productSix.jpeg';
import ProductSeven from '../assets/images/productSeven.jpeg';
import ProductEight from '../assets/images/productEight.jpeg';

const products = [
  { id: 1, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductOne, colors: ['#1E90FF', '#2E8B57', '#D2691E', '#2F4F4F'] },
  { id: 2, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductTwo, colors: ['#FF4500', '#32CD32', '#4682B4', '#8B0000'] },
  { id: 3, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductThree, colors: ['#FFD700', '#FF6347', '#4682B4', '#8A2BE2'] },
  { id: 4, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductFour, colors: ['#1E90FF', '#FF6347', '#2E8B57', '#FFD700'] },
  { id: 5, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductFive, colors: ['#2E8B57', '#4682B4', '#FFD700', '#8A2BE2'] },
  { id: 6, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductSix, colors: ['#32CD32', '#FF4500', '#FFD700', '#4682B4'] },
  { id: 7, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductSeven, colors: ['#D2691E', '#8B0000', '#4682B4', '#FFD700'] },
  { id: 8, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductEight, colors: ['#FF4500', '#FFD700', '#4682B4', '#32CD32'] },
];

const Products = () => {
  return (
    <div className="w-full">
      {/* Parent div */}
      <div className="w-[85%] mx-auto mt-6 md:mt-8">
        {/* Grid for the products */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="border p-6">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-96 object-cover mb-4 md:h-80" 
              />
              <h3 className="text-lg font-bold text-center">{product.title}</h3>
              <p className="text-sm text-gray-600 text-center">{product.department}</p>
              <div className="mt-2 flex justify-center">
                <span className="line-through text-gray-500">${product.price}</span>
                <span className="text-green-600">${product.salePrice}</span>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
