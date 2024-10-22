import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const DesktopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isShopOpen, setIsShopOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleShop = () => {
    setIsShopOpen(!isShopOpen);
  };

  const categories = ['Bags', 'Belts', 'Cosmetics', 'Accessories', 'Hats'];

  return (
    <>
      <div className='h-14 flex justify-around bg-[#252B42] text-white text-[0.7rem]'>
        <div className='flex items-center gap-4 ml-[-80px]'>
          <div className='font-montserrat font-semibold text-[0.8rem]'>
            <i className="fa-solid fa-phone fa-lg mr-2"></i>(225) 555-0118
          </div>
          <div className='font-montserrat font-semibold text-[0.8rem]'>
            <i className="fa-regular fa-envelope fa-lg mr-2"></i>michella@rivera@example.com
          </div>
        </div>
        <div className='flex items-center text-[0.9rem] font-semibold mr-4'>
          <p>Follow Us and get a chance to win 80% off</p>
        </div>
        <div className='flex items-center gap-4 ml-32'>
          <p className='text-[0.8rem] font-semibold'>Follow us :</p>
          <i className="fa-brands fa-instagram fa-lg"></i>
          <i className="fa-brands fa-youtube fa-lg"></i>
          <i className="fa-brands fa-facebook fa-lg"></i>
          <i className="fa-brands fa-twitter fa-lg"></i>
        </div>
      </div>
      <nav className="bg-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold ml-8">
            <Link to="/">Bandage</Link> {/* Link to homepage */}
          </div>
          <div className='mr-32'>
            {isMenuOpen && (
              <div className="mt-4 space-y-2 sm:flex sm:space-y-0 sm:space-x-4">
                <Link to="/" className="block py-2 text-[#737373] font-bold hover:text-gray-900">Home</Link>
                <div className="relative">
                  <div className="flex items-center">
                    {/* Link the text "Shop" to the shop route */}
                    <Link to="/shop" className="py-2 text-[#737373] font-bold hover:text-gray-900 focus:outline-none">
                      Shop
                    </Link>
                    {/* Separate toggle for the SVG */}
                    <button 
                      onClick={toggleShop} 
                      className="ml-1 focus:outline-none"
                    >
                      <svg
                        className={`h-4 w-4 transform transition-transform duration-200 ${isShopOpen ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  {isShopOpen && (
                    <div className="absolute left-0 mt-2 w-96 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="flex gap-4">
                        <div className="w-1/2 py-1 px-2">
                          <p className="px-2 py-2 text-sm font-bold text-gray-700 mb-4">Kadin</p>
                          {categories.map((category, index) => (
                            <Link 
                              key={`women-${index}`} 
                              to="/shop" // Direct shop items
                              className="block px-2 mb-4 text-sm font-semibold text-[#737373] hover:bg-gray-100"
                            >
                              {category}
                            </Link>
                          ))}
                        </div>
                        <div className="w-1/2 py-1 px-2 border-gray-200">
                          <p className="px-2 py-2 text-sm font-bold text-gray-700 mb-4">Erkek</p>
                          {categories.map((category, index) => (
                            <Link 
                              key={`men-${index}`} 
                              to="/shop" // Direct shop items
                              className="block px-2 mb-4 text-sm font-semibold text-[#737373] hover:bg-gray-100"
                            >
                              {category}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Link to="/about" className="block py-2 text-[#737373] font-bold hover:text-gray-900">About</Link>
                <Link to="/team" className="block py-2 text-[#737373] font-bold hover:text-gray-900">Team</Link>
                <Link to="/contact" className="block py-2 text-[#737373] font-bold hover:text-gray-900">Contact</Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-6 mr-4 text-[#23A6F0]">
            <div className='flex gap-4'>
              <Link to="/login" className=''><i className="fa-regular fa-user mr-2"></i> <span className='font-bold'>Login</span></Link> / 
              <Link to="/signup" className='font-bold'> Register</Link>
            </div>

            <i className="fa-solid fa-magnifying-glass"></i>
            <i className="fa-solid fa-cart-shopping"></i>
            <i className="fa-regular fa-heart"></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DesktopNavbar;
