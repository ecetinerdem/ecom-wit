import React from 'react';
import heroImage from '../assets/images/hero.jpeg';
import shopCardOne from '../assets/images/shopCardOne.jpeg';
import shopCardTwo from '../assets/images/shopCardTwo.jpeg';
import shopCardThree from '../assets/images/shopCardThree.jpeg';
import shopCardFour from '../assets/images/shopCardFour.jpeg';

const shopItems = [
  { id: 1, title: 'CLOTHS', items: 5, image: shopCardOne },
  { id: 2, title: 'CLOTHS', items: 5, image: heroImage },
  { id: 3, title: 'CLOTHS', items: 5, image: shopCardTwo },
  { id: 4, title: 'CLOTHS', items: 5, image: shopCardThree },
  { id: 5, title: 'CLOTHS', items: 5, image: shopCardFour },
];

const ShopCards = () => {
  return (
    <div className="container mx-auto px-4 md:px-24 mt-4 bg-[#FAFAFA] pb-8">
      <div className='flex flex-col md:flex-row md:justify-between text-center'>
      <h4 className="text-3xl font-bold mb-4">Shop</h4>
      <div className='flex text-center justify-center  gap-2 md:flex-row'>
      <h6 className='text-[#252B42] font-bold'>Home</h6>
      <h6 className='text-[#BDBDBD] font-bold'>&gt;</h6>
      <h6 className='text-[#BDBDBD] font-bold'>Shop</h6>
      </div>

      </div>
      <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center"> {/*TODO:Cards needs to be closer*/}
        {shopItems.map((item) => (
          <div key={item.id} className="w-full md:w-1/3 lg:w-1/4 xl:w-1/5 md:px-1 mb-4">
            <div className="relative w-4/5 md:w-10/12 mx-auto pb-[80%] md:pb-[70%]">
              <div className="absolute inset-0 bg-gray-200 overflow-hidden shadow-md">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center">
                  <h2 className="text-white text-lg font-bold text-center">{item.title}</h2>
                  <p className="text-white text-sm text-center">{item.items} Items</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCards;