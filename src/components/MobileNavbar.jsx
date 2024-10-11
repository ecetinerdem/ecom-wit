import React, { useState } from 'react';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      {/* Navbar Header (always visible) */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">Bandage</div>
        <div className="flex items-center space-x-4">
          <i className="fa-regular fa-user"></i>
          <i className="fa-solid fa-magnifying-glass"></i>
          <i className="fa-solid fa-cart-shopping"></i>
          <button onClick={toggleMenu} className="focus:outline-none">
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>
      </div>

      {/* Full-screen menu overlay when menu is open */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col justify-center items-center z-10">
          {/* Keep the Navbar header visible */}
          <div className="absolute top-4 left-0 right-0 px-4">
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold">Bandage</div>
              <div className="flex items-center space-x-4">
                <i className="fa-regular fa-user"></i>
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-solid fa-cart-shopping"></i>
                <button onClick={toggleMenu} className="focus:outline-none">
                  <i className="fa-solid fa-bars"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-6 text-center font-semibold text-4xl mt-8">
            <a href="#" className="block py-2 text-[#737373] hover:text-gray-900">Home</a>
            <a href="#" className="block py-2 text-[#737373] hover:text-gray-900">Product</a>
            <a href="#" className="block py-2 text-[#737373] hover:text-gray-900">Pricing</a>
            <a href="#" className="block py-2 text-[#737373] hover:text-gray-900">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
