import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import products from '../data/productsData'; 

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
    <div className="w-full mt-4  flex flex-col justify-center items-center mb-16">
      {/* Parent div */}
      <div className="w-[85%] mx-auto mt-8 md:mt-8">
        {/* Grid for the products */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {currentProducts.map((product) => (
            <div key={product.id} className="">
              <Link to={`/products/${product.id}`}> {/* Link to product detail page */}
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
              </Link>
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
              } ${number === 1 ? 'border-l' : ''}`}
            >
              {number}
            </button>
          ))}
          <button 
            onClick={() => paginate(2)} 
            className="px-4 py-4 text-sm font-medium text-[#23A6F0] bg-white border border-[#E9E9E9] rounded-r-sm hover:bg-gray-100"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
