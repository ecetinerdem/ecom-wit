import React from 'react';

import bigManImage from '../assets/images/bigMan.jpeg';
import bigWomanImage from '../assets/images/bigWoman.jpeg';
import kids from '../assets/images/kids.jpeg';
import accessories from '../assets/images/accessories.jpeg';

const CategoryCard = ({ imageUrl, label, isFullHeight }) => (
  <div className="flex justify-center mb-4 lg:flex-row">
    <div className={`relative w-[20rem] ${isFullHeight ? 'h-[70vh]' : 'h-64'}`}>
      <img 
        src={imageUrl} 
        alt={label} 
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-4 left-4 bg-white py-1 px-12">
        <span className="text-black text-xs font-bold uppercase">{label}</span>
      </div>
    </div>
  </div>
);

const MobileCategories = () => {
  return (
    <div className="">
      <h2 className="text-center text-xl font-bold mb-2">EDITOR'S PICK</h2>
      <p className="text-center text-sm text-gray-500 mb-10">
        Problems trying to resolve the conflict between
      </p>
      
      <div>
        <CategoryCard 
          imageUrl={bigManImage} 
          label="MEN" 
          isFullHeight={false}
        />
        <CategoryCard 
          imageUrl={bigWomanImage}  
          label="WOMEN" 
          isFullHeight={false}
        />
        <CategoryCard 
          imageUrl={accessories}  
          label="ACCESSORIES" 
          isFullHeight={false}
        />
        <CategoryCard 
          imageUrl={kids}  
          label="KIDS" 
          isFullHeight={false}
        />
      </div>
    </div>
  );
};

export default MobileCategories;
