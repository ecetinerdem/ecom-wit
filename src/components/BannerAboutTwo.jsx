import React from 'react';
import productThree from '../assets/images/productThree.jpeg';

const BannerAboutTwo = () => {
  return (
    <div className="bg-[#2A7CC7] flex flex-col lg:flex-row lg:items-center lg:h-[calc(100vh-64px)]">
      {/* Main container with mobile-first and large screen layout */}
      
      {/* First div (text content) */}
      <div className="flex justify-center items-center w-full lg:w-2/3 py-12 lg:py-0">
        <div className="text-center lg:text-left max-w-xs lg:max-w-md px-6 lg:px-0 py-6">
          <h5 className="text-white text-sm lg:text-base font-semibold">WORK WITH US</h5>
          <h2 className="text-white text-2xl lg:text-4xl font-bold mt-4">Now Let’s Grow Yours</h2>
          <p className="text-white text-sm lg:text-base mt-4">
            The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th.
          </p>
          <button className="mt-6 px-6 py-2 text-[#2A7CC7] bg-white font-semibold rounded-lg">
            Contact Us
          </button>
        </div>
      </div>

      {/* Second div (image) - hidden on mobile */}
      <div className="hidden lg:flex w-1/3 justify-center items-center h-full">
        <img 
          src={productThree} // replace this with the actual image path
          alt="About Banner"
          className="object-cover h-full"
        />
      </div>
    </div>
  );
};

export default BannerAboutTwo;
