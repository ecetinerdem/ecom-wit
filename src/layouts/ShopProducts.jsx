import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { handlePageChange, fetchProducts, navigateToCategory, fetchCategories } from '../store/actions/productActions';

const ShopProducts = () => {
  const { gender, category } = useParams();
  const dispatch = useDispatch();
  const { 
    productList, 
    loading, 
    error,
    total,
    limit,
    offset,
    categories
  } = useSelector(state => state.products);

  const categoryId = useSelector(state => state.products.categoryId);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (gender && category) {
      const categoryObj = categories.find(
        cat => cat.gender === gender && cat.code.split(':')[1] === category
      );
      if (categoryObj) {
        dispatch(navigateToCategory(gender, category, categoryObj.id));
      }
    }
  }, [gender, category, categories, dispatch]);

  useEffect(() => {
    if (!gender && !category) {
      dispatch(fetchProducts());
    }
  }, [dispatch, gender, category]);

  // Enrich products with category information
  const enrichedProducts = productList.map(product => {
    const categoryInfo = categories.find(cat => cat.id === product.category_id);
    if (categoryInfo) {
      return {
        ...product,
        categoryGender: categoryInfo.gender,
        categoryCode: categoryInfo.code.split(':')[1]
      };
    }
    return product;
  });

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(total / limit);

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
      <div className="w-[85%] mx-auto mt-8 md:mt-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {enrichedProducts.map((product) => (
            <div 
              key={product.id} 
              className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
            >
              <Link 
                to={`/shop/${product.categoryGender || gender}/${product.categoryCode || category}/${product.name.toLowerCase().replace(/\s+/g, '-')}/${product.id}`}
              >
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
      {/* Pagination section remains the same */}
      <div className="flex justify-center mt-8 shadow-md">
        <div className="flex">
          <button 
            onClick={() => paginate(1)} 
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-[#23A6F0] disabled:opacity-50"
          >
            First
          </button>
          <button 
            onClick={() => paginate(currentPage - 1)} 
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm font-medium text-[#23A6F0] disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button 
            onClick={() => paginate(currentPage + 1)} 
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-[#23A6F0] disabled:opacity-50"
          >
            Next
          </button>
          <button 
            onClick={() => paginate(totalPages)} 
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm font-medium text-[#23A6F0] disabled:opacity-50"
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;