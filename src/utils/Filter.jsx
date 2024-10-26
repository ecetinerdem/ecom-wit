import React, { useState, useEffect } from 'react';
import { LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { handleSort, handleSearch, fetchProducts } from '../store/actions/productActions';

const FilterComponent = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const params = useParams();
  
  // Get current sort from Redux state
  const currentSort = useSelector(state => state.products.sort);
  
  // Local state for form inputs
  const [searchInput, setSearchInput] = useState('');
  const [sortOption, setSortOption] = useState('');
  
  // Get URL search params
  const searchParams = new URLSearchParams(location.search);
  
  useEffect(() => {
    // Initialize states from URL params
    setSearchInput(searchParams.get('filter') || '');
    setSortOption(searchParams.get('sort') || '');
    
    // If we have category in URL params, fetch products with that category
    if (params.categoryId) {
      dispatch(fetchProducts({ category: params.categoryId }));
    }
  }, [location.search, params.categoryId]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    
    // Update URL with all current parameters
    const currentParams = new URLSearchParams(location.search);
    
    if (searchInput) {
      currentParams.set('filter', searchInput);
    } else {
      currentParams.delete('filter');
    }
    
    if (sortOption) {
      currentParams.set('sort', sortOption);
    } else {
      currentParams.delete('sort');
    }
    
    // Update URL
    history.push({
      pathname: location.pathname,
      search: currentParams.toString()
    });
    
    // Dispatch actions
    if (searchInput) dispatch(handleSearch(searchInput));
    if (sortOption) dispatch(handleSort(sortOption));
  };

  // Helper function to get current sort value for select
  const getCurrentSortValue = () => {
    if (currentSort.field && currentSort.order) {
      return `${currentSort.field}:${currentSort.order}`;
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center justify-around space-y-4 p-4 md:flex-row md:space-y-0 md:space-x-6">
      {/* Results Count */}
      <div>
        <h6 className="text-[#737373] font-semibold">Showing all results</h6>
      </div>

      {/* View Options */}
      <div className="flex items-center gap-4">
        <span className="text-[#737373] font-semibold">Views:</span>
        <button className="p-2 bg-gray-200 rounded">
          <LayoutGrid className="h-5 w-5" />
        </button>
        <button className="p-2 bg-gray-200 rounded">
          <i className="fa-solid fa-list fa-md text-[#737373] font-semibold"></i>
        </button>
      </div>

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="flex items-center space-x-2">
        {/* Search Input */}
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search products..."
          className="p-2 border border-[#DDDDDD] text-[#737373] bg-[#F9F9F9] rounded"
        />
        
        {/* Sort Select */}
        <select
          value={sortOption || getCurrentSortValue()}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border border-[#DDDDDD] text-[#737373] bg-[#F9F9F9] rounded focus:border-[#DDDDDD] focus:outline-none cursor-pointer"
        >
          <option value="">Sort by...</option>
          <option value="price:asc">Price: Low to High</option>
          <option value="price:desc">Price: High to Low</option>
          <option value="rating:asc">Rating: Low to High</option>
          <option value="rating:desc">Rating: High to Low</option>
        </select>
        
        <Button 
          type="submit"
          size="default" 
          variant="default" 
          className="bg-[#23A6F0] text-white"
        >
          Filter
        </Button>
      </form>
    </div>
  );
};

export default FilterComponent;