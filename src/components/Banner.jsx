import React from 'react';
import banner from '../assets/images/banner.png';

const Banner = () => {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex flex-col md:flex-row md:gap-4">
        <div className="order-2 md:order-1 md:w-1/2 flex justify-center md:justify-start">
          <div className="w-full max-w-xl md:max-w-none">
            <img
              src={banner}
              alt="Product"
              className="w-[90%] h-auto object-cover md:w-full" 
            />
          </div>
        </div>
        <div className="order-1 md:order-2 md:w-1/2 p-6 flex flex-col justify-center items-center md:items-start">
          <p className="text-sm text-gray-500 mb-2 text-center md:text-left">SUMMER 2024</p>
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Part of the Neural Universe</h2>
          <p className="text-gray-600 mb-6 text-center md:text-left">
            We know how large objects will act, but things on a small scale.
          </p>
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
            <button className="bg-blue-400 md:bg-green-500 text-white px-4 py-2 rounded">
              BUY NOW
            </button>
            <button className="border border-blue-400 md:border-green-500 text-blue-400 md:text-green-500 px-4 py-2 rounded">
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
