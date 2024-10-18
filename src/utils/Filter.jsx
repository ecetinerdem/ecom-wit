import React from 'react';
import { LayoutGrid } from 'lucide-react'; // Import the LayoutGrid from Lucide
import { Button } from '@/components/ui/button';


const FilterComponent = () => {
  return (
    <div className="flex flex-col items-center justify-around space-y-4 p-4 md:flex-row md:space-y-0 md:space-x-6">
      {/* First Div - Showing Results */}
      <div>
        <h6 className="text-[#737373] font-semibold">Showing all results</h6>
      </div>

      {/* Second Div - View Options with Icons */}
      <div className="flex items-center gap-4
      ">
        <span className="text-[#737373] font-semibold">Views:</span>
        <button className="p-2 bg-gray-200 rounded">
          {/* Lucide LayoutGrid Icon */}
          <LayoutGrid className="h-5 w-5" />
        </button>
        <button className="p-2 bg-gray-200 rounded">
          {/* Font Awesome List Icon */}
          <i className="fa-solid fa-list fa-md text-[#737373] font-semibold"></i>
        </button>
      </div>

      {/* Third Div - Dropdown and Filter Button */}
      <div className="flex items-center space-x-2">
        <select className="p-2 border border-[#DDDDDD] text-[#737373] bg-[#F9F9F9] rounded focus:border-[#DDDDDD] focus:outline-none cursor-pointer">
          <option>Popularity</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
        <Button size="default" variant="default" className=" bg-[#23A6F0] text-white ">Filter</Button>
      </div>
    </div>
  );
};

export default FilterComponent;
