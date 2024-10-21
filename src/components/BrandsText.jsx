import React from 'react'
import faBrandOne from '../assets/images/faBrandOne.png';
import faBrandTwo from '../assets/images/faBrandTwo.png';
import faBrandThree from '../assets/images/faBrandThree.png';
import faBrandFour from '../assets/images/faBrandFour.png';
import faBrandFive from '../assets/images/faBrandFive.png';
import faBrandSix from '../assets/images/faBrandSix.png';

function BrandsText() {
  return (
    <div>
        <div className="flex flex-col items-center justify-center text-center pt-24 bg-gray-200">
            <h2 className="text-3xl font-bold text-[#252B42] mb-2">Big Brands Are Here</h2>
            <p className="text-[#737373] w-64 md:w-1/3">
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </p>
        </div>

        <div className="flex flex-col justify-center items-center md:flex-row md:justify-evenly md:gap-0 gap-10 bg-gray-200 py-24"> {/* color choice due to not matching footer from shop page and homepage! */}
            <img src={faBrandOne} alt="Brand One" className="h-10 md:h-12 max-w-xs object-contain" />
            <img src={faBrandTwo} alt="Brand Two" className="h-16 md:h-13 max-w-xs object-contain" />
            <img src={faBrandThree} alt="Brand Three" className="h-16 md:h-14 max-w-xs object-contain" />
            <img src={faBrandFour} alt="Brand Four" className="h-12 md:h-12 max-w-xs object-contain" />
            <img src={faBrandFive} alt="Brand Five" className="h-14 md:h-12 max-w-xs object-contain" />
            <img src={faBrandSix} alt="Brand Six" className="h-20 md:h-16 max-w-xs object-contain" />
        </div>
    </div>

  )
}

export default BrandsText