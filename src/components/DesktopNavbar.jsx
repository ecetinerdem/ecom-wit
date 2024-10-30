import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getGravatarUrl } from '../utils/gravatarUtil';
import { logoutUserThunk } from '../store/actions/authActions';
import { fetchCategories } from '../store/actions/productActions';
import { toast } from 'react-toastify';

const DesktopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const cartDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  const dispatch = useDispatch();
  const history = useHistory();

  // Get user from Redux store
  const user = useSelector((state) => state.client.user);
  // Get categories from Redux store
  const categories = useSelector((state) => state.products.categories);
  // Get cart from Redux store
  const cart = useSelector((state) => state.shoppingCart.cart);
  // Calculate total quantity
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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

  // Separate categories by gender
  const womenCategories = categories.filter(cat => cat.gender === 'k');
  const menCategories = categories.filter(cat => cat.gender === 'e');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleShop = () => setIsShopOpen(!isShopOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  // Get Gravatar URL using our utility
  const gravatarUrl = user?.email ? getGravatarUrl(user.email) : null;

  // Handler for image load errors
  const handleImageError = () => {
    setImageError(true);
  };

  const handleLogout = async () => {
    try {
      const result = await dispatch(logoutUserThunk());
      if (result.success) {
        toast.success('Logged out successfully');
        history.push('/login');
      } else {
        toast.error('Logout failed');
      }
    } catch (error) {
      toast.error('An error occurred during logout');
    }
  };

  // Cart Dropdown JSX
  const renderCartDropdown = () => (
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

      {isCartHovered && cart.length > 0 && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-md shadow-lg z-50 border border-gray-200">
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
            
            <div className="max-h-[400px] overflow-y-auto">
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
            </div>

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

      {isCartHovered && cart.length === 0 && (
        <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 border border-gray-200">
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
  );

  return (
    <>
      <div className='h-14 flex justify-around bg-[#252B42] text-white text-[0.7rem]'>
      <div className='flex items-center gap-4 ml-[-80px]'>
          <div className='font-montserrat font-semibold text-[0.8rem]'>
            <i className='fa-solid fa-phone fa-lg mr-2'></i>(225) 555-0118
          </div>
          <div className='font-montserrat font-semibold text-[0.8rem]'>
            <i className='fa-regular fa-envelope fa-lg mr-2'></i>michella@rivera@example.com
          </div>
        </div>
        <div className='flex items-center text-[0.9rem] font-semibold mr-4'>
          <p>Follow Us and get a chance to win 80% off</p>
        </div>
        <div className='flex items-center gap-4 ml-32'>
          <p className='text-[0.8rem] font-semibold'>Follow us :</p>
          <i className='fa-brands fa-instagram fa-lg'></i>
          <i className='fa-brands fa-youtube fa-lg'></i>
          <i className='fa-brands fa-facebook fa-lg'></i>
          <i className='fa-brands fa-twitter fa-lg'></i>
        </div>
      </div>
      <nav className='bg-white p-4 shadow-md'>
        <div className='flex justify-between items-center'>
          <div className='text-xl font-bold ml-8'>
            <Link to='/'>Bandage</Link>
          </div>
          <div className='mr-32'>
            {isMenuOpen && (
              <div className='mt-4 space-y-2 sm:flex sm:space-y-0 sm:space-x-4'>
                <Link to='/' className='block py-2 text-[#737373] font-bold hover:text-gray-900'>
                  Home
                </Link>
                <div className='relative'>
                  <div className='flex items-center'>
                    <Link to='/shop' className='py-2 text-[#737373] font-bold hover:text-gray-900'>
                      Shop
                    </Link>
                    <button onClick={toggleShop} className='ml-1 focus:outline-none'>
                      <svg
                        className={`h-4 w-4 transform transition-transform duration-200 ${
                          isShopOpen ? 'rotate-180' : ''
                        }`}
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                    </button>
                  </div>
                  {isShopOpen && (
                    <div className='absolute left-0 mt-2 w-96 bg-white border border-gray-200 rounded-md shadow-lg z-50'>
                      <div className='flex gap-4'>
                        <div className='w-1/2 py-1 px-2'>
                          <p className='px-2 py-2 text-sm font-bold text-gray-700 mb-4'>Women</p>
                          {womenCategories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/shop/k/${category.code.split(':')[1]}`}
                              className='block px-2 mb-4 text-sm font-semibold text-[#737373] hover:bg-gray-100'
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                        <div className='w-1/2 py-1 px-2 border-gray-200'>
                          <p className='px-2 py-2 text-sm font-bold text-gray-700 mb-4'>Men</p>
                          {menCategories.map((category) => (
                            <Link
                              key={category.id}
                              to={`/shop/e/${category.code.split(':')[1]}`}
                              className='block px-2 mb-4 text-sm font-semibold text-[#737373] hover:bg-gray-100'
                            >
                              {category.title}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <Link to='/about' className='block py-2 text-[#737373] font-bold hover:text-gray-900'>
                  About
                </Link>
                <Link to='/team' className='block py-2 text-[#737373] font-bold hover:text-gray-900'>
                  Team
                </Link>
                <Link to='/contact' className='block py-2 text-[#737373] font-bold hover:text-gray-900'>
                  Contact
                </Link>
              </div>
            )}
          </div>
          <div className='flex items-center gap-6 mr-4 text-[#23A6F0]'>
            {user?.name ? (
              <div className='flex items-center gap-4 relative' ref={userDropdownRef}>
                {!imageError && gravatarUrl ? (
                  <img
                    src={gravatarUrl}
                    alt={`${user.name}'s avatar`}
                    className='w-8 h-8 rounded-full object-cover'
                    onError={handleImageError}
                  />
                ) : (
                  <div className='w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center'>
                    <span className='text-gray-600 text-sm font-bold'>
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <span className='font-bold text-[#737373]'>{user.name}</span>
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
                      onClick={() => setIsUserDropdownOpen(false)}
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
                                <Link to='/login'>
                  <i className='fa-regular fa-user mr-2'></i>
                  <span className='font-bold'>Login</span>
                </Link>{' '}
                /{' '}
                <Link to='/signup' className='font-bold'>
                  Register
                </Link>
              </div>
            )}
            <i className='fa-solid fa-magnifying-glass'></i>
            {renderCartDropdown()}
            <i className='fa-regular fa-heart'></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default DesktopNavbar;