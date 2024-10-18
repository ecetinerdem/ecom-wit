import React from 'react';
import faBrandOne from '../assets/images/faBrandOne.png';
import faBrandTwo from '../assets/images/faBrandTwo.png';
import faBrandThree from '../assets/images/faBrandThree.png';
import faBrandFour from '../assets/images/faBrandFour.png';
import faBrandFive from '../assets/images/faBrandFive.png';
import faBrandSix from '../assets/images/faBrandSix.png';

function Brands() {
  return (
    <div className="flex flex-col justify-center items-center md:flex-row md:justify-evenly gap-10 bg-gray-200 py-12"> {/* color choice due to not matching footer from shop page and homepage! */}
      <img src={faBrandOne} alt="Brand One" className="h-10 md:h-11 max-w-xs object-contain" />
      <img src={faBrandTwo} alt="Brand Two" className="h-16 md:h-12 max-w-xs object-contain" />
      <img src={faBrandThree} alt="Brand Three" className="h-16 md:h-12 max-w-xs object-contain" />
      <img src={faBrandFour} alt="Brand Four" className="h-12 md:h-11 max-w-xs object-contain" />
      <img src={faBrandFive} alt="Brand Five" className="h-14 md:h-11 max-w-xs object-contain" />
      <img src={faBrandSix} alt="Brand Six" className="h-20 md:h-11 max-w-xs object-contain" />
    </div>
  );
}

export default Brands;
