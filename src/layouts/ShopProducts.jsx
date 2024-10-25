import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handlePageChange, handleLimitChange, fetchProducts } from '../store/actions/productActions';
import { useEffect } from 'react';

const ShopProducts = () => {
  const dispatch = useDispatch();
  const { 
    productList, 
    loading, 
    error,
    total,
    limit,
    offset 
  } = useSelector(state => state.products);


  

// Inside component:
useEffect(() => {
  dispatch(fetchProducts());
}, [dispatch]);

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

  // Change page
  const paginate = (pageNumber) => {
    dispatch(handlePageChange(pageNumber));
  };

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#23A6F0]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="w-full mt-4 flex flex-col justify-center items-center mb-16">
      {/* Parent div */}
      <div className="w-[85%] mx-auto mt-8 md:mt-8">
        {/* Grid for the products */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {productList.map((product) => (
            <div key={product.id} className="">
              <Link to={`/products/${product.id}`}>
                <img 
                  src={product.images[0].url} 
                  alt={product.name} 
                  className="w-full h-98 object-cover mb-4 md:h-85" 
                />
                <h3 className="text-lg font-bold text-center">{product.name}</h3>
                <p className="text-sm text-[#BDBDBD] text-center truncate">
                  {product.description}
                </p>
                <div className="mt-2 flex justify-center gap-2">
                  <span className="text-[#23856D]">${product.price.toFixed(2)}</span>
                </div>
              </Link>
              {/* Rating and Stock */}
              <div className="mt-4 flex justify-center space-x-4">
                <div className="flex items-center">
                  <span className="text-sm text-[#BDBDBD]">Rating: </span>
                  <span className="ml-1 text-[#23856D]">{product.rating.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-[#BDBDBD]">Stock: </span>
                  <span className="ml-1 text-[#23856D]">{product.stock}</span>
                </div>
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
            disabled={currentPage === 1}
            className="px-4 py-4 text-sm font-medium text-[#23A6F0] bg-white border border-[#E9E9E9] rounded-l-sm hover:bg-gray-100 disabled:opacity-50"
          >
            First
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(Math.max(0, currentPage - 2), Math.min(totalPages, currentPage + 1))
            .map((number) => (
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
            onClick={() => paginate(totalPages)} 
            disabled={currentPage === totalPages}
            className="px-4 py-4 text-sm font-medium text-[#23A6F0] bg-white border border-[#E9E9E9] rounded-r-sm hover:bg-gray-100 disabled:opacity-50"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;