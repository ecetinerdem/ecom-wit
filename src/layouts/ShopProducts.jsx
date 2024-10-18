import React, { useState } from 'react';
import ProductOne from '../assets/images/productOne.jpeg';
import ProductTwo from '../assets/images/productTwo.jpeg';
import ProductThree from '../assets/images/productThree.jpeg';
import ProductFour from '../assets/images/productFour.jpeg';
import ProductFive from '../assets/images/productFive.jpeg';
import ProductSix from '../assets/images/productSix.jpeg';
import ProductSeven from '../assets/images/productSeven.jpeg';
import ProductEight from '../assets/images/productEight.jpeg';
import ProductNine from '../assets/images/productNine.jpeg';
import ProductTen from '../assets/images/productTen.jpeg';
import ProductEleven from '../assets/images/productEleven.jpeg';
import ProductTwelve from '../assets/images/productTwelve.jpeg';
import ProductThirteen from '../assets/images/productThirteen.jpeg';
import ProductFourteen from '../assets/images/productFourteen.jpeg';
import ProductFifteen from '../assets/images/productFifteen.jpeg';
import ProductSixteen from '../assets/images/productSixteen.jpeg';

const products = [
  { id: 1, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductOne, colors: ['#1E90FF', '#2E8B57', '#D2691E', '#2F4F4F'] },
  { id: 2, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductTwo, colors: ['#FF4500', '#32CD32', '#4682B4', '#8B0000'] },
  { id: 3, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductThree, colors: ['#FFD700', '#FF6347', '#4682B4', '#8A2BE2'] },
  { id: 4, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductFour, colors: ['#1E90FF', '#FF6347', '#2E8B57', '#FFD700'] },
  { id: 5, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductFive, colors: ['#2E8B57', '#4682B4', '#FFD700', '#8A2BE2'] },
  { id: 6, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductSix, colors: ['#32CD32', '#FF4500', '#FFD700', '#4682B4'] },
  { id: 7, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductSeven, colors: ['#D2691E', '#8B0000', '#4682B4', '#FFD700'] },
  { id: 8, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductEight, colors: ['#FF4500', '#FFD700', '#4682B4', '#32CD32'] },
  { id: 9, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductNine, colors: ['#1E90FF', '#2E8B57', '#D2691E', '#2F4F4F'] },
  { id: 10, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductTen, colors: ['#FF4500', '#32CD32', '#4682B4', '#8B0000'] },
  { id: 11, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductEleven, colors: ['#FFD700', '#FF6347', '#4682B4', '#8A2BE2'] },
  { id: 12, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductTwelve, colors: ['#1E90FF', '#FF6347', '#2E8B57', '#FFD700'] },
  { id: 13, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductThirteen, colors: ['#2E8B57', '#4682B4', '#FFD700', '#8A2BE2'] },
  { id: 14, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductFourteen, colors: ['#32CD32', '#FF4500', '#FFD700', '#4682B4'] },
  { id: 15, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductFifteen, colors: ['#D2691E', '#8B0000', '#4682B4', '#FFD700'] },
  { id: 16, title: 'Graphic Design', department: 'English Department', price: 16.48, salePrice: 6.48, imageUrl: ProductSixteen, colors: ['#FF4500', '#FFD700', '#4682B4', '#32CD32'] },
];

const ShopProducts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full mt-20  flex flex-col justify-center items-center mb-16">
      {/* Parent div */}
      <div className="w-[85%] mx-auto mt-8 md:mt-8">
        {/* Grid for the products */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="">
              <img 
                src={product.imageUrl} 
                alt={product.title} 
                className="w-full h-98 object-cover mb-4 md:h-85" 
              />
              <h3 className="text-lg font-bold text-center">{product.title}</h3>
              <p className="text-sm text-[#BDBDBD] text-center">{product.department}</p>
              <div className="mt-2 flex justify-center gap-2">
                <span className="line-through text-[#BDBDBD]">${product.price} </span>
                <span className="text-[#23856D]"> ${product.salePrice}</span>
              </div>
              {/* Color options */}
              <div className="mt-4 flex justify-center space-x-2">
                {product.colors.map((color, index) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: color }}
                  ></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-8 shadow-md">
        <div className="flex">
          <button 
            onClick={() => paginate(1)} 
            className="px-4 py-4 text-sm font-medium text-[#23A6F0] bg-white border border-[#E9E9E9] rounded-l-sm hover:bg-gray-100"
          >
            First
          </button>
          {[1, 2].map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`px-4 py-4 text-sm font-medium border-t border-b border-[#E9E9E9] ${
                currentPage === number
                  ? 'text-white bg-[#23A6F0]'
                  : 'text-[#23A6F0] bg-white hover:bg-gray-100'
              } ${number === 1 ? 'border-l' : 'border-l-0'} ${number === 2 ? 'border-r' : 'border-r-0'}`}
            >
              {number}
            </button>
          ))}
          <button 
            onClick={() => paginate(2)} 
            className="px-4 py-4 text-sm font-medium text-[#23A6F0] bg-white border border-[#E9E9E9] rounded-r-sm hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;