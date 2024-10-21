import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white p-4 shadow-md">
      {/* Navbar Header (always visible) */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Bandage</Link> {/* Link to homepage */}
        </div>
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
              <div className="text-xl font-bold">
                <Link to="/">Bandage</Link> {/* Link to homepage */}
              </div>
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
            <Link to="/" className="block py-2 text-[#737373] hover:text-gray-900">Home</Link>
            <Link to="/about" className="block py-2 text-[#737373] hover:text-gray-900">About</Link>
            <Link to="/shop" className="block py-2 text-[#737373] hover:text-gray-900">Shop</Link>
            <Link to="/team" className="block py-2 text-[#737373] hover:text-gray-900">Team</Link>
            <Link to="/contact" className="block py-2 text-[#737373] hover:text-gray-900">Contact</Link>
          </div>
          {/* Social Icons */}
          <div className="flex flex-col items-center gap-4 mt-8 text-[#23A6F0]">
            <div className='flex gap-4'>
              <Link to="/login" className=''><i className="fa-regular fa-user fa-2xl mr-2"></i> <span className='font-normal text-2xl'>Login</span></Link> <span className='font-normal text-2xl'>/</span> 
              <Link to="/register" className='font-normal text-2xl'> Register</Link>
            </div>
            <div className='flex flex-col gap-16 mt-10'>
              <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
              <i className="fa-solid fa-cart-shopping fa-2xl"></i>
              <i className="fa-regular fa-heart fa-2xl"></i>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
