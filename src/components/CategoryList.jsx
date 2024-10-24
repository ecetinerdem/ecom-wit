import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../store/actions/productActions'; // Import your thunk action

const CategoryList = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.categories);

  // Fetch categories when the component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // Get top 5 categories based on rating
  const topCategories = [...categories]
    .sort((a, b) => b.rating - a.rating) // Sort by rating
    .slice(0, 5); // Get top 5 categories

  return (
    <div className="container mx-auto px-4 md:px-24 mt-4 bg-[#FAFAFA] pb-8">
      <div className="flex flex-col md:flex-row md:justify-between text-center">
        <h4 className="text-3xl font-bold mb-4">Shop</h4>
        <div className="flex text-center justify-center gap-2 md:flex-row">
          <h6 className="text-[#252B42] font-bold">Home</h6>
          <h6 className="text-[#BDBDBD] font-bold">&gt;</h6>
          <h6 className="text-[#BDBDBD] font-bold">Shop</h6>
        </div>
      </div>
      
      {/* Top 5 categories */}
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center">
        {topCategories.map((category) => (
          <div key={category.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 md:px-1 mb-4">
            <div className="relative w-4/5 md:w-10/12 mx-auto pb-[80%] md:pb-[70%]">
              <div className="absolute inset-0 bg-gray-200 overflow-hidden shadow-md">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center">
                  <Link to={`/shop/${category.gender}/${category.code.split(':')[1]}`}>
                    <h2 className="text-white text-lg font-bold text-center">{category.title}</h2>
                  </Link>
                  <p className="text-white text-sm text-center">Rating: {category.rating}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
