// Navbar.js
import React from 'react';
import MobileNavbar from '../components/MobileNavbar';
import DesktopNavbar from '../components/DesktopNavbar';

const Navbar = () => {
  return (
    <>
      {/* Show mobile navbar on small screens */}
      <div className="block md:hidden">
        <MobileNavbar />
      </div>

      {/* Show desktop navbar on medium and larger screens */}
      <div className="hidden md:block">
        <DesktopNavbar />
      </div>
    </>
  );
};

export default Navbar;



