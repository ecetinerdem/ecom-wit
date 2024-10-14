import React from 'react';

const Card = ({ categoryImages }) => {
  return (
    <div className="w-full min-h-screen bg-white flex justify-center items-start overflow-x-hidden">
      <div className="w-[85%] flex flex-col">
        <div className='flex flex-col flex-wrap items-center mb-8'>
            <h3 className='font-montserrat text-[#252B42] font-bold text-lg'>EDITOR'S PICK</h3>
            <p className='text-[#737373] text-xs'>Problems trying to reolve</p>
            <p className='text-[#737373] text-xs'>the conflict between</p>
        </div>
        {/* First column */}
        <div 
          className="h-[50vh] border border-gray-300 mb-4 bg-cover bg-center"
          style={{ backgroundImage: `url(${categoryImages[0].image})` }}
        >
          <div className="w-full h-full bg-black bg-opacity-30 flex items-end p-4">
            <button className="bg-white text-black py-2 px-12 font-bold">
              {categoryImages[0].alt}
            </button>
          </div>
        </div>

        {/* Second column */}
        <div 
          className="h-[50vh] border border-gray-300 mb-4 bg-cover bg-center"
          style={{ backgroundImage: `url(${categoryImages[1].image})` }}
        >
          <div className="w-full h-full bg-black bg-opacity-30 flex items-end p-4">
            <button className="bg-white text-black py-2 px-8 font-bold">
              {categoryImages[1].alt}
            </button>
          </div>
        </div>

        {/* Third column with two rows */}
        <div className="h-[50vh] flex flex-col">
          {/* First row of the third column */}
          <div 
            className="flex-1 border border-gray-300 mb-4 bg-cover bg-center"
            style={{ backgroundImage: `url(${categoryImages[2].image})` }}
          >
            <div className="w-full h-full bg-black bg-opacity-30 flex items-end p-4">
              <button className="bg-white text-black py-2 px-6 font-bold">
                {categoryImages[2].alt}
              </button>
            </div>
          </div>

          {/* Second row of the third column */}
          <div 
            className="flex-1 border border-gray-300 bg-cover bg-center"
            style={{ backgroundImage: `url(${categoryImages[3].image})` }}
          >
            <div className="w-full h-full bg-black bg-opacity-30 flex items-end p-4">
              <button className="bg-white text-black py-2 px-10 font-bold">
                {categoryImages[3].alt}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;