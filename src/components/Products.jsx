import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchCategories } from '../store/actions/productActions';

const Products = () => {
  const dispatch = useDispatch();
  const { productList, loading, error, categories } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

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

  if (!productList.length) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div>No products available.</div>
      </div>
    );
  }

  return (
    <div className="w-full mt-4 flex flex-col justify-center items-center mb-16">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="w-[85%] mx-auto mt-8 md:mt-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {enrichedProducts.map((product) => (
            <div 
              key={product.id} 
              className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
            >
              <Link 
                to={`/shop/${product.categoryGender}/${product.categoryCode}/${product.name.toLowerCase().replace(/\s+/g, '-')}/${product.id}`}
              >
                <img 
                  src={product.images[0]?.url}
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
                  <span className="ml-1 text-[#23856D]">{product.rating?.toFixed(1) || 'N/A'}</span>
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
    </div>
  );
};

export default Products;