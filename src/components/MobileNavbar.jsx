import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGravatarUrl } from '../utils/gravatarUtil';
import { logoutUserThunk } from '../store/actions/authActions';
import { toast } from 'react-toastify';

const MobileNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const cartDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  // Get user from Redux store
  const user = useSelector((state) => state.client.user);
  // Get cart from Redux store
  const cart = useSelector((state) => state.shoppingCart.cart);
  // Calculate total quantity
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isCartHovered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartHovered]);

  // Handle click outside for cart dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartDropdownRef.current && !cartDropdownRef.current.contains(event.target)) {
        setIsCartHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle click outside for user dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Get Gravatar URL using our utility
  const gravatarUrl = user?.email ? getGravatarUrl(user.email, 100) : null;

  // Handler for image load errors
  const handleImageError = () => {
    setImageError(true);
  };

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUserThunk());
      if (result.success) {
        toast.success('Logged out successfully');
        setIsMenuOpen(false);
        history.push('/login');
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      toast.error('An error occurred during logout');
    }
  };

  const UserSection = () => (
    user?.name ? (
      <div className="flex items-center gap-2 relative" ref={userDropdownRef}>
        {!imageError && gravatarUrl ? (
          <img
            src={gravatarUrl}
            alt={`${user.name}'s avatar`}
            className="w-8 h-8 rounded-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-600 text-sm font-bold">
              {user.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <span className="font-semibold text-[#737373]">{user.name}</span>
        <button onClick={toggleUserDropdown} className='focus:outline-none'>
          <svg className="h-5 w-5 text-[#23A6F0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isUserDropdownOpen && (
          <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 top-full'>
            <Link 
              to="/order-history" 
              className='block px-4 py-2 text-sm text-[#23A6F0] font-semibold hover:bg-gray-100'
              onClick={() => {
                setIsUserDropdownOpen(false);
                setIsMenuOpen(false);
              }}
            >
              Order History
            </Link>
            <button 
              onClick={() => {
                handleLogout();
                setIsUserDropdownOpen(false);
              }}
              className='block w-full text-left px-4 py-2 text-sm text-[#23A6F0] font-semibold hover:bg-gray-100'
            >
              Logout
            </button>
          </div>
        )}
      </div>
    ) : (
      <div className='flex gap-4'>
        <Link to="/login">
          <i className="fa-regular fa-user mr-2"></i>
        </Link>
      </div>
    )
  );
  return (
    <nav className="bg-white p-4 shadow-md">
      {/* Navbar Header (always visible) */}
      <div className="flex justify-between items-center">
        <div className="text-xl font-bold">
          <Link to="/">Bandage</Link>
        </div>
        <div className="flex items-center space-x-4">
          <UserSection />
          <i className="fa-solid fa-magnifying-glass"></i>
          
          {/* Shopping Cart Icon with Dropdown */}
          <div className="relative" ref={cartDropdownRef}>
            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartHovered(!isCartHovered)}
            >
              <i className='fa-solid fa-cart-shopping'></i>
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E74040] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {totalQuantity}
                </span>
              )}
            </div>

            {/* Cart Dropdown */}
            {isCartHovered && cart.length > 0 && (
              <div className="fixed inset-x-0 top-[60px] mx-4 bg-white rounded-md shadow-lg z-50 border border-gray-200 max-h-[calc(100vh-80px)] overflow-y-auto">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Shopping Cart</h3>
                    <button 
                      onClick={() => setIsCartHovered(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                  
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 mb-4 pb-4 border-b">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-600 text-sm">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-[#23A6F0] font-semibold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between font-semibold mb-4">
                      <span>Total:</span>
                      <span>
                        ${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Link 
                        to="/cart" 
                        className="bg-[#23A6F0] text-white py-2 px-4 rounded text-center hover:bg-[#1a7ab3]"
                        onClick={() => setIsCartHovered(false)}
                      >
                        View Cart
                      </Link>
                      <Link 
                        to="/checkout" 
                        className="bg-[#2DC071] text-white py-2 px-4 rounded text-center hover:bg-[#26A861]"
                        onClick={() => setIsCartHovered(false)}
                      >
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty Cart Message */}
            {isCartHovered && cart.length === 0 && (
              <div className="fixed inset-x-0 top-[60px] mx-4 bg-white rounded-md shadow-lg z-50 border border-gray-200">
                <div className="p-4 text-center">
                  <p className="text-gray-500">Your cart is empty</p>
                  <Link 
                    to="/shop" 
                    className="text-[#23A6F0] hover:text-[#1a7ab3] mt-2 inline-block"
                    onClick={() => setIsCartHovered(false)}
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </div>

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
                <Link to="/">Bandage</Link>
              </div>
              <div className="flex items-center space-x-4">
                <UserSection />
                <i className="fa-solid fa-magnifying-glass"></i>
                <div className="relative">
                  <i className='fa-solid fa-cart-shopping'></i>
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#E74040] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {totalQuantity}
                    </span>
                  )}
                </div>
                <button onClick={toggleMenu} className="focus:outline-none">
                  <i className="fa-solid fa-bars"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-6 text-center font-semibold text-4xl mt-8">
            <Link to="/" className="block py-2 text-[#737373] hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block py-2 text-[#737373] hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/shop" className="block py-2 text-[#737373] hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/team" className="block py-2 text-[#737373] hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Team</Link>
            <Link to="/contact" className="block py-2 text-[#737373] hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Contact</Link>
          </div>
          
          {/* Social Icons */}
          <div className="flex flex-col items-center gap-4 mt-8 text-[#23A6F0]">
            {!user?.name && (
              <div className='flex gap-4'>
                <Link to="/login" className='' onClick={() => setIsMenuOpen(false)}>
                  <i className="fa-regular fa-user fa-2xl mr-2"></i>
                  <span className='font-normal text-2xl'>Login</span>
                </Link>
                <span className='font-normal text-2xl'>/</span>
                <Link to="/signup" className='font-normal text-2xl' onClick={() => setIsMenuOpen(false)}>Register</Link>
              </div>
            )}
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