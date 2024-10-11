import React, { useState } from 'react';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Bandage</div>
        <div>
        {isMenuOpen && (
        <div className="mt-4 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
          <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Home</a>
          <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Product</a>
          <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Pricing</a>
          <a href="#" className="block py-2 text-gray-600 hover:text-gray-900">Contact</a>
        </div>
      )}
        </div>
        <div className="flex items-center space-x-4">
            <i className="fa-regular fa-user"></i>
            <i className="fa-solid fa-magnifying-glass"></i>
            <i className="fa-solid fa-cart-shopping"></i>
            <button onClick={toggleMenu} className="focus:outline-none">
                <i className="fa-solid fa-bars sm:hidden"></i>
            </button>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbar;